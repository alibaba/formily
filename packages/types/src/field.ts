import { IRuleDescription } from './rule'
import { ISchema } from './schema'
import { Path } from './path'
import { IFormPathMatcher } from './form'

export interface IField<V = any> {
  value: V
  valid: boolean
  dirty: boolean
  invalid: boolean
  visible: boolean
  display: boolean
  hiddenFromParent: boolean
  shownFromParent: boolean
  required: boolean
  editable: boolean
  loading: boolean
  errors: string[]
  effectErrors: string[]
  pristine: boolean
  initialValue: V
  name: string
  path: string[]
  props: ISchema
  rules: IRuleDescription[]
  dirtyType: string
  lastValidateValue: V
  notify: (forceUpdate?: boolean) => void
  changeEditable: (editable: boolean | ((name: string) => boolean)) => void
  match: (path: Path | IFormPathMatcher) => boolean
  initialize: (options: IFieldOptions) => void
  publishState: () => IFieldState
  onChange: (fn: () => void) => void
  updateState: (fn: (state: IFieldState) => void) => void
  destructor: () => void
  syncContextValue: () => void
  pathEqual: (path: Path | IFormPathMatcher) => boolean
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
