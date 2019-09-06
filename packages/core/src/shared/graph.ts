import {
  each,
  reduce,
  map,
  isFn,
  FormPath,
  FormPathPattern
} from '@uform/shared'
import { FormGraphNodeRef, FormGraphMatcher, FormGraphEacher } from '../types'
/**
 * Form & Field 其实是属于一种图的关系，我们可以进一步抽象
 * 要求FormGraph是Immutable的，所以它可以很容易的支持时间旅行的能力
 * 临时存放，后面会放在@uform/shared中
 */

export class FormGraph<NodeType = any> {
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

  constructor() {
    this.refrences = {}
    this.nodes = {}
    this.buffer = []
  }

  select = (path: FormPathPattern, matcher?: FormGraphMatcher<NodeType>) => {
    const newPath = FormPath.getPath(path)
    if (newPath.isMatchPattern) {
      this.eachChildren([], (child: NodeType, childPath: FormPath) => {
        if (newPath.match(childPath)) {
          if (isFn(matcher)) {
            matcher(child, childPath)
          }
        }
      })
    } else {
      const matched = this.nodes[newPath]
      if (isFn(matcher) && matched) {
        matcher(matched, newPath)
      }
      return matched
    }
  }

  getNode = (path: FormPath | string) => {
    return this.nodes[path as string]
  }

  selectParent = (path: FormPathPattern) => {
    return this.getNode(FormPath.getPath(path).parent())
  }

  selectChildren = (path: FormPathPattern) => {
    const ref = this.refrences[FormPath.getPath(path)]
    if (ref && ref.children) {
      return reduce(
        ref.children,
        (buf, path) => {
          return buf
            .concat(this.getNode(path))
            .concat(this.selectChildren(path))
        },
        []
      )
    }
    return []
  }

  exist = (path: FormPathPattern) => {
    return !!this.getNode(FormPath.getPath(path))
  }

  /**
   * 递归遍历所有children
   */
  eachChildren = (
    path: FormPathPattern,
    eacher: FormGraphEacher<NodeType>,
    recursion: boolean = true
  ) => {
    const ref = this.refrences[FormPath.getPath(path)]
    if (ref && ref.children) {
      return each(ref.children, path => {
        if (isFn(eacher)) {
          const node = this.getNode(path)
          if (node) {
            eacher(node, path)
            if (recursion) this.eachChildren(path, eacher, recursion)
          }
        }
      })
    }
  }

  /**
   * 递归遍历所有parent
   */
  eachParent = (path: FormPathPattern, eacher: FormGraphEacher<NodeType>) => {
    const selfPath = FormPath.getPath(path)
    const ref = this.refrences[selfPath]
    if (isFn(eacher)) {
      eacher(this.getNode(selfPath), selfPath)
      if (ref.parent) {
        this.eachParent(ref.parent.path, eacher)
      }
    }
  }

  getLatestParent = (path: FormPathPattern) => {
    const selfPath = FormPath.getPath(path)
    const parentPath = FormPath.getPath(path).parent()
    if (selfPath.toString() === parentPath.toString()) return undefined
    if (this.refrences[parentPath])
      return { ref: this.refrences[parentPath], path: parentPath }
    return this.getLatestParent(parentPath)
  }

  map = (mapper: (node: NodeType) => any) => {
    return map(this.nodes, mapper)
  }

  reduce = <T>(
    reducer: (buffer: T, node: NodeType, key: string) => T,
    initial: T
  ) => {
    return reduce(this.nodes, reducer, initial)
  }

  appendNode = (path: FormPathPattern, node: NodeType) => {
    const selfPath = FormPath.getPath(path)
    const parentPath = selfPath.parent()
    const parentRef = this.refrences[parentPath]
    const selfRef: FormGraphNodeRef = {
      path: selfPath,
      children: []
    }
    if (this.getNode(selfPath)) return
    this.nodes[selfPath as string] = node
    this.refrences[selfPath] = selfRef
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
    this.buffer.forEach(({ path, ref, latestParent }) => {
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
      }
    })
  }

  remove = (path: FormPathPattern) => {
    const selfPath = FormPath.getPath(path)
    const selfRef = this.refrences[selfPath]
    if (selfRef.children) {
      selfRef.children.forEach(path => {
        this.remove(path)
      })
    }
    delete this.nodes[selfPath as string]
    delete this.refrences[selfPath]
    if (selfRef.parent) {
      selfRef.parent.children.forEach((path, index) => {
        if (path.match(selfPath)) {
          selfRef.parent.children.splice(index, 0)
        }
      })
    }
  }
}
