import { Rule } from './rule'
import { Dispatcher } from './effects'

export interface ISchema {
  type?: string
  title?: string
  description?: string
  default?: unknown
  required?: boolean
  enum?: Array<{ label: string, value: unknown } | string | number>
  properties?: {
    [key: string]: ISchema
  }
  items?: ISchema
  minItems?: number
  maxItems?: number
  ['x-props']?: object
  ['x-index']?: number
  ['x-rules']?: Rule
  ['x-component']?: string
  ['x-effect']?: (dispatch: Dispatcher) => { [key: string]: any }
}
