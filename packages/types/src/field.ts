import { IRuleDescription } from './rule'
import { ISchema } from './schema'

export interface IField {
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
  props: ISchema
  rules: IRuleDescription[]
  notify: (forceUpdate?: boolean) => void
  __lastValidateValue: any
}

export interface IFieldState {
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
  props: ISchema
  rules: IRuleDescription[]
}

export interface IFieldMap {
  [name: string]: IField
}
