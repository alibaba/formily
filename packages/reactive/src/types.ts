import { ProxyRaw } from './environment'

export type PropertyKey = string | number | symbol

export type OperationType =
  | 'add'
  | 'delete'
  | 'clear'
  | 'set'
  | 'get'
  | 'iterate'
  | 'has'

export interface IOperation {
  target?: any
  oldTarget?: any
  key?: PropertyKey
  value?: any
  oldValue?: any
  type?: OperationType
  receiver?: any
}

export interface IChange {
  key?: PropertyKey
  path?: ObservablePath
  value?: any
  oldValue?: any
  type?: OperationType
}

export interface INode {
  traverse?: ObservableTraverse
  path?: ObservablePath
  parent?: INode
  observers?: Set<ObservableListener>
  deepObservers?: Set<ObservableListener>
}

export type ObservableListener = (operation: IOperation) => void

export type ObservablePath = Array<PropertyKey>

export type ObservableTraverse = (
  target: any,
  key: PropertyKey,
  value: any,
  path: ObservablePath
) => any

export const isObservable = (target: any) => {
  return ProxyRaw.has(target)
}

export type Reaction = (...args: any[]) => any

export type KeysReactions = Map<PropertyKey, Set<Reaction>>
