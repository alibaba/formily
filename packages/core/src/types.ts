import { FormPath, FormPathPattern } from '@uform/shared'
import { ValidateArrayRules } from '@uform/validator'
import { FormLifeCycle } from './shared/lifecycle'
import { Draft } from 'immer'
import { Model } from './shared/model'

export type FormGraphNodeMap<T> = {
  [key in string]: T
}

export interface FormGraphVisitorOptions<T> {
  path: FormPath
  exsist: boolean
  append: (node: T) => void
}

export type FormGraph<T> = (
  node: T,
  options: FormGraphVisitorOptions<T>
) => void

export type FormGrpahJSONParser<T> = (json: {}) => T

export interface FormGraphNodeRef {
  parent?: FormGraphNodeRef
  path: FormPath
  children: FormPath[]
}

export type FormGraphMatcher<T> = (node: T, path: FormPath) => void

export type FormGraphEacher<T> = (node: T, path: FormPath) => void

export type FormLifeCyclePayload<T> = (
  params: {
    type: string
    payload: T
  },
  context: any
) => void

export type StateDirtyMap<P> = {
  [key in keyof P]?: boolean
}

export interface StateModel<P> {
  publishState?: (state: P) => P
  dirtyCheck?: (dirtys: StateDirtyMap<P>) => StateDirtyMap<P> | void
  computeState?: (state: Draft<P>) => Draft<P> | void
}

export interface StateModelProps<S> {
  [key: string]: any
  state?: S
  model?: any
}

export interface IStateModelFactory<S, P> {
  new (state: S, props: P): StateModel<S>
  defaultState?: S
  defaultProps?: P
  displayName?: string
}

export interface IFieldState {
  path: FormPath
  name: string
  initialized: boolean
  pristine: boolean
  valid: boolean
  touched: boolean
  invalid: boolean
  visible: boolean
  display: boolean
  editable: boolean
  loading: boolean
  validating: boolean
  errors: string[]
  values: any[]
  effectErrors: string[]
  warnings: string[]
  effectWarnings: string[]
  value: any
  initialValue: any
  rules: ValidateArrayRules[]
  required: boolean
  mounted: boolean
  unmounted: boolean
  props: {}
}
export type FieldStateDirtyMap = StateDirtyMap<IFieldState>

export interface IFieldStateProps {
  path: FormPathPattern
  value?: any
  values?: any[]
  initialValue?: any
  props?: {}
  rules?: ValidateArrayRules[]
  required?: boolean
  editable?: boolean
}

export interface IFieldProps extends IFieldStateProps {
  onChange?: (fieldState: Model) => void
}

export interface IVFieldProps extends IVFieldStateProps {
  onChange?: (fieldState: Model) => void
}

export interface IFormState {
  pristine: boolean
  valid: boolean
  invalid: boolean
  loading: boolean
  validating: boolean
  submitting: boolean
  initialized: boolean
  editable: boolean
  errors: string[]
  warnings: string[]
  values: {}
  initialValues: {}
  mounted: boolean
  unmounted: boolean
  props: {}
}

export type FormStateDirtyMap = StateDirtyMap<IFormState>

export interface IFormStateProps {
  initialValues?: {}
  values?: {}
  lifecycles?: FormLifeCycle[]
}

export type FormCreatorOptions = IFormStateProps & {
  useDirty?: boolean
  validateFirst?: boolean
}

export interface IVFieldState {
  path: FormPath
  name: string
  initialized: boolean
  visible: boolean
  display: boolean
  mounted: boolean
  unmounted: boolean
  props: {}
}
export type VFieldStateDirtyMap = StateDirtyMap<IFieldState>

export interface IVFieldStateProps {
  path: FormPathPattern
  props?: {}
}
