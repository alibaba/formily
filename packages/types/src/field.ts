import { IRuleDescription } from './rule'
import { ISchema } from './schema'
import { Path } from './path'
import { IFormPathMatcher } from './form'
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
  dirtyType: string
  lastValidateValue: any
  notify: (forceUpdate?: boolean) => void
  changeEditable: (editable: boolean | ((name: string) => boolean)) => void
  match: (path: Path | IFormPathMatcher) => boolean
  initialize: (options: IFieldOptions) => void
  publishState: () => IFieldState
  onChange: (fn: () => void) => void
  updateState: (fn: (state: IFieldState) => void) => void
  destructor: () => void
}

export interface IFieldOptions {
  path: Path
  name?: string
  props: any
  value?: any
  initialValue?: any
  onChange?: (...args: any[]) => void
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
