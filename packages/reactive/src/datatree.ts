import { ProxyRaw, RawNode } from './environment'
import { ObservablePath, PropertyKey, IOperation } from './types'
import { concat } from './concat'

export class DataChange {
  path: ObservablePath
  key: PropertyKey
  type: string
  value: any
  oldValue: any
  constructor(operation: IOperation, node: DataNode) {
    this.key = operation.key
    this.type = operation.type
    this.value = operation.value
    this.oldValue = operation.oldValue
    this.path = concat(node.path, operation.key)
  }
}
export class DataNode {
  target: any

  key: PropertyKey

  constructor(target: any, key: PropertyKey) {
    this.target = target
    this.key = key
  }

  get path() {
    if (!this.parent) return this.key ? [this.key] : []
    return concat(this.parent.path, this.key)
  }

  get targetRaw() {
    return ProxyRaw.get(this.target) || this.target
  }

  get parent() {
    if (!this.target) return
    return RawNode.get(this.targetRaw)
  }

  isEqual(node: DataNode) {
    return node.targetRaw === this.targetRaw && node.key === this.key
  }

  contains(node: DataNode) {
    if (node === this) return true
    let parent = node.parent
    while (!!parent) {
      if (this.isEqual(parent)) return true
      parent = parent.parent
    }
    return false
  }
}

export const buildDataTree = (target: any, key: PropertyKey, value: any) => {
  const currentNode = RawNode.get(ProxyRaw.get(value) || value)
  if (currentNode) return currentNode
  RawNode.set(value, new DataNode(target, key))
}
