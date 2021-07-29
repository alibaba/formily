export * from './datatree'

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

export interface IEffectQueueItem {
  dispose?: void | Dispose
  deps?: any[]
}

export interface IMemoQueueItem {
  value?: any
  deps?: any[]
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

export type Dispose = () => void

export type Effect = () => void | Dispose

export type Reaction = ((...args: any[]) => any) & {
  _boundary?: number
  _name?: string
  _isComputed?: boolean
  _dirty?: boolean
  _context?: any
  _disposed?: boolean
  _property?: PropertyKey
  _computesSet?: Set<Reaction>
  _reactionsSet?: Set<ReactionsMap>
  _scheduler?: (reaction: Reaction) => void
  _memos?: {
    queue: IMemoQueueItem[]
    cursor: number
  }
  _effects?: {
    queue: IEffectQueueItem[]
    cursor: number
  }
}

export type ReactionsMap = Map<PropertyKey, Set<Reaction>>

export interface IReactionOptions<T> {
  name?: string
  equals?: (oldValue: T, newValue: T) => boolean
  fireImmediately?: boolean
}
