import { Rule } from './rule'
import { Dispatcher } from './effects'

type MayBeArray<V> = V | (V[])

export interface ISchema<V = any> {
  type?: string
  title?: string | JSX.Element
  description?: string | JSX.Element
  default?: MayBeArray<V>
  required?: boolean
  enum?: Array<{ label: string | JSX.Element; value: V } | string | number>
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
