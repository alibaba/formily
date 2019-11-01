import {
  each,
  reduce,
  map,
  isFn,
  FormPath,
  FormPathPattern,
  Subscribable
} from '@uform/shared'
import {
  FormGraphNodeRef,
  FormGraphMatcher,
  FormGraphEacher,
  FormGraphProps
} from '../types'

export class FormGraph<NodeType = any> extends Subscribable<{
  type: string
  payload: FormGraphNodeRef
}> {
  private refrences: {
    [key in string]: FormGraphNodeRef
  }

  private nodes: {
    [key in string]: NodeType
  }

  private buffer: {
    path: FormPath
    ref: FormGraphNodeRef
    latestParent?: {
      ref: FormGraphNodeRef
      path: FormPath
    }
  }[]

  private matchStrategy: FormGraphProps['matchStrategy']

  constructor(props: FormGraphProps = {}) {
    super()
    this.refrences = {}
    this.nodes = {}
    this.buffer = []
    this.matchStrategy = props.matchStrategy
  }

  /**
   * 模糊匹配API
   * @param path
   * @param matcher
   */
  select(path: FormPathPattern, eacher?: FormGraphMatcher<NodeType>) {
    const pattern = FormPath.parse(path)
    if (!eacher) {
      const node = this.get(pattern)
      if (node) {
        return node
      }
    }
    for (let name in this.nodes) {
      const node = this.nodes[name]
      if (
        isFn(this.matchStrategy)
          ? this.matchStrategy(pattern, node)
          : pattern.match(name)
      ) {
        if (isFn(eacher)) {
          const result = eacher(node, FormPath.parse(name))
          if (result === false) {
            return node
          }
        } else {
          return node
        }
      }
    }
  }

  get(path: FormPathPattern) {
    return this.nodes[FormPath.getPath(path).toString()]
  }

  selectParent(path: FormPathPattern) {
    const selfPath = FormPath.getPath(path)
    const parentPath = FormPath.getPath(path).parent()
    if (selfPath.toString() === parentPath.toString()) return undefined

    return this.get(parentPath)
  }

  selectChildren(path: FormPathPattern) {
    const ref = this.refrences[FormPath.getPath(path).toString()]
    if (ref && ref.children) {
      return reduce(
        ref.children,
        (buf, path) => {
          return buf.concat(this.get(path)).concat(this.selectChildren(path))
        },
        []
      )
    }
    return []
  }

  exist(path: FormPathPattern) {
    return !!this.get(FormPath.getPath(path))
  }

  /**
   * 递归遍历所有children
   * 支持模糊匹配
   */
  eachChildren(eacher: FormGraphEacher<NodeType>, recursion?: boolean): void
  eachChildren(
    path: FormPathPattern,
    eacher: FormGraphEacher<NodeType>,
    recursion?: boolean
  ): void
  eachChildren(
    path: FormPathPattern,
    selector: FormPathPattern,
    eacher: FormGraphEacher<NodeType>,
    recursion?: boolean
  ): void
  eachChildren(
    path: any,
    selector: any = true,
    eacher: any = true,
    recursion: any = true
  ) {
    if (isFn(path)) {
      recursion = selector
      eacher = path
      path = ''
      selector = '*'
    }
    if (isFn(selector)) {
      recursion = eacher
      eacher = selector
      selector = '*'
    }

    const ref = this.refrences[FormPath.getPath(path).toString()]
    if (ref && ref.children) {
      return each(ref.children, path => {
        if (isFn(eacher)) {
          const node = this.get(path)
          if (
            node &&
            (isFn(this.matchStrategy)
              ? this.matchStrategy(selector, node)
              : FormPath.parse(selector).match(path))
          ) {
            eacher(node, path)
            if (recursion) {
              this.eachChildren(path, selector, eacher, recursion)
            }
          }
        }
      })
    }
  }

  /**
   * 递归遍历所有parent
   */
  eachParent(path: FormPathPattern, eacher: FormGraphEacher<NodeType>) {
    const selfPath = FormPath.getPath(path)
    const ref = this.refrences[selfPath.toString()]
    if (isFn(eacher)) {
      eacher(this.get(selfPath), selfPath)
      if (ref.parent) {
        this.eachParent(ref.parent.path, eacher)
      }
    }
  }

  getLatestParent(path: FormPathPattern) {
    const selfPath = FormPath.getPath(path)
    const parentPath = FormPath.getPath(path).parent()

    if (selfPath.toString() === parentPath.toString()) return undefined
    if (this.refrences[parentPath.toString()])
      return { ref: this.refrences[parentPath.toString()], path: FormPath.getPath(parentPath.toString()) }
    return this.getLatestParent(parentPath)
  }

  map(mapper: (node: NodeType) => any) {
    return map(this.nodes, mapper)
  }

  reduce<T>(
    reducer: (buffer: T, node: NodeType, key: string) => T,
    initial: T
  ) {
    return reduce(this.nodes, reducer, initial)
  }

  appendNode(path: FormPathPattern, node: NodeType) {
    const selfPath = FormPath.getPath(path)
    const parentPath = selfPath.parent()
    const parentRef = this.refrences[parentPath.toString()]
    const selfRef: FormGraphNodeRef = {
      path: selfPath,
      children: []
    }
    if (this.get(selfPath)) return
    this.nodes[selfPath.toString()] = node
    this.refrences[selfPath.toString()] = selfRef
    if (parentRef) {
      parentRef.children.push(selfPath)
      selfRef.parent = parentRef
    } else {
      const latestParent = this.getLatestParent(selfPath)
      if (latestParent) {
        latestParent.ref.children.push(selfPath)
        selfRef.parent = latestParent.ref
        this.buffer.push({
          path: selfPath,
          ref: selfRef,
          latestParent: latestParent
        })
      }
    }
    this.buffer.forEach(({ path, ref, latestParent }, index) => {
      if (
        path.parent().match(selfPath) ||
        (selfPath.includes(latestParent.path) &&
          path.includes(selfPath) &&
          selfPath.toString() !== path.toString())
      ) {
        selfRef.children.push(path)
        ref.parent = selfRef
        latestParent.ref.children.splice(
          latestParent.ref.children.indexOf(path),
          1
        )
        this.buffer.splice(index, 1)
      }
    })
    this.notify({
      type: 'GRAPH_NODE_DID_MOUNT',
      payload: selfRef
    })
  }

  remove(path: FormPathPattern) {
    const selfPath = FormPath.getPath(path)
    const selfRef = this.refrences[selfPath.toString()]
    if (!selfRef) return
    this.notify({
      type: 'GRAPH_NODE_WILL_UNMOUNT',
      payload: selfRef
    })
    if (selfRef.children) {
      selfRef.children.forEach(path => {
        this.remove(path)
      })
    }
    this.buffer = this.buffer.filter(({ ref }) => {
      return selfRef !== ref
    })
    delete this.nodes[selfPath.toString()]
    delete this.refrences[selfPath.toString()]
    if (selfRef.parent) {
      selfRef.parent.children.forEach((path, index) => {
        if (path.match(selfPath)) {
          selfRef.parent.children.splice(index, 0)
        }
      })
    }
  }

  replace(path: FormPathPattern, node: NodeType) {
    const selfPath = FormPath.getPath(path)
    const selfRef = this.refrences[selfPath.toString()]
    if (!selfRef) return
    this.notify({
      type: 'GRAPH_NODE_WILL_UNMOUNT',
      payload: selfRef
    })
    this.nodes[selfPath.toString()] = node
    this.notify({
      type: 'GRAPH_NODE_DID_MOUNT',
      payload: selfRef
    })
  }
}
