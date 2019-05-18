import { RuleDescription } from './rule'
import { Schema } from './schema'

export interface Field {
  value: any
  valid: boolean
  dirty: boolean
  invalid: boolean
  visible: boolean
  required: boolean
  editable: boolean
  loading: boolean
  errors: string[]
  pristine: boolean
  initialValue: any
  name: string
  path: string[]
  props: Schema
  rules: RuleDescription[]
  notify: (forceUpdate?: boolean) => void
  __lastValidateValue: any
}


export type FieldState = {
  value: any
  valid: boolean
  invalid: boolean
  visible: boolean
  required: boolean
  editable: boolean
  loading: boolean
  errors: string[]
  pristine: boolean
  initialValue: any
  name: string
  path: string[]
  props: Schema
  rules: RuleDescription[]
}

export type FieldMap = {
  [name: string]: Field
}