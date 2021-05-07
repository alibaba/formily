import { getProxyRaw, getRawNode, setRawNode } from './environment'
import { isObservable, isSupportObservable } from './externals'
import { IVisitor } from './types'

const concat = (array: any[], target: any) => {
  const arr = []
  for (let i = 0; i < array.length; i++) {
    arr.push(array[i])
  }
  arr.push(target)
  return arr
}

export const buildTreeNode = ({
  target,
  value,
  key,
  traverse,
  shallow,
}: IVisitor) => {
  const parentRaw = target
  const raw = getProxyRaw(value) || value
  const parentNode = getRawNode(parentRaw)
  const currentNode = getRawNode(raw)
  if (currentNode?.isConnected) return currentNode
  if (parentNode) {
    return setRawNode(value, (node) => {
      node.path = concat(parentNode.path, key)
      node.parent = parentNode
      node.shallow = shallow || parentNode.shallow
      node.traverse = traverse || parentNode.traverse
      node.isConnected = true
    })
  } else {
    setRawNode(value, (node) => {
      node.shallow = shallow
      node.traverse = traverse
      node.isConnected = true
    })
  }
}

export const traverseIn = (target: any, key: PropertyKey, value: any) => {
  if (isObservable(value)) return value
  const parent = getProxyRaw(target) || target
  const raw = getProxyRaw(value) || value
  const parentNode = getRawNode(parent)
  const node = getRawNode(raw)
  if (parentNode) {
    if (!isSupportObservable(value) || node?.isTraversed) return value
    const path = parentNode.path.concat(key as any)
    const shallow = parentNode.shallow
    if (!node) {
      setRawNode(raw, (node) => {
        node.path = path
        node.parent = parentNode
        node.shallow = parentNode.shallow
        node.traverse = parentNode.traverse
        node.isConnected = true
        node.isTraversed = true
      })
    } else {
      node.isTraversed = true
    }
    return parentNode.traverse({ target, key, value, path, shallow })
  }
  return value
}
