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
  shallow?: boolean
}

export interface IVisitor<Value = any, Target = any> {
  target?: Target
  key?: PropertyKey
  value?: Value
  path?: ObservablePath
  traverse?: ObservableTraverse
  shallow?: boolean
}

export type Annotation = (...args: any[]) => any

export type Annotations<T = any> = {
  [key in keyof T]?: Annotation
}

export type ObservableListener = (operation: IOperation) => void

export type ObservablePath = Array<string | number>

export type ObservableTraverse<Value = any, Target = any> = (
  visitor: IVisitor<Value, Target>
) => any

export type Reaction = ((...args: any[]) => any) & {
  _active?: boolean
  _context?: any
  _property?: PropertyKey
  _scheduler?: (reaction: Reaction) => void
}

export type KeysReactions = Map<PropertyKey, Set<Reaction>>
