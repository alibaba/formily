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

export interface IRawNode {
  path?: ObservablePath
  parent?: IRawNode
  observers?: ObservableListener[]
  deepObservers?: ObservableListener[]
}

export interface IVisitor<Value = any, Target = any> {
  target?: Target
  key?: PropertyKey
  value?: Value
}

export type Annotation = (...args: any[]) => any

export type Annotations<T = any> = {
  [key in keyof T]?: Annotation
}

export type ObservableListener = (operation: IOperation) => void

export type ObservablePath = Array<string | number>

export type Reaction = ((...args: any[]) => any) & {
  _name?: string
  _isComputed?: boolean
  _dirty?: boolean
  _context?: any
  _property?: PropertyKey
  _computedsSet?: Set<Reaction>
  _reactionsSet?: Set<ReactionsMap>
  _scheduler?: (reaction: Reaction) => void
}

export type ReactionsMap = Map<PropertyKey, Set<Reaction>>

export interface IReactionOptions<T> {
  name?: string
  equals?: (oldValue: T, newValue: T) => boolean
}
