import { Rule } from './rule'
import { Dispatcher } from './effects'

type MayBeArray<V> = V | (V[])

export interface ISchema<V = any> {
  type?: string
  title?: string
  description?: string
  default?: MayBeArray<V>
  required?: boolean
  enum?: Array<{ label: string; value: V } | string | number>
  enumNames?: string[]
  properties?: {
    [key: string]: ISchema
  }
  items?: ISchema
  minItems?: number
  maxItems?: number
  ['x-props']?: { [name: string]: any }
  ['x-index']?: number
  ['x-rules']?: Rule
  ['x-component']?: string
  ['x-effect']?: (
    dispatch: Dispatcher,
    option?: object
  ) => { [key: string]: any }
}
