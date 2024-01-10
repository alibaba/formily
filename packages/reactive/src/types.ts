import { ArraySet } from './array'

export * from './tree'

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
  _computesSet?: ArraySet<Reaction>
  _reactionsSet?: ArraySet<ReactionsMap>
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

export type ReactionsMap = Map<PropertyKey, ArraySet<Reaction>>

export interface IReactionOptions<T> {
  name?: string
  equals?: (oldValue: T, newValue: T) => boolean
  fireImmediately?: boolean
}

export type BindFunction<F = (...args: any[]) => any> = (
  callback?: F,
  context?: any
) => F

export type BoundaryFunction = <F extends (...args: any) => any>(
  fn?: F
) => ReturnType<F>

export interface IBoundable {
  bound?: <T extends (...args: any[]) => any>(callback: T, context?: any) => T //高阶绑定
}
export interface IAction extends IBoundable {
  <T>(callback?: () => T): T //原地action
  scope?: (<T>(callback?: () => T) => T) & IBoundable //原地局部action
}

export interface IBatch extends IAction {
  endpoint?: (callback?: () => void) => void
}
