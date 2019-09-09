import { FormPath, FormPathPattern } from '@uform/shared'
import { ValidateArrayRules } from '@uform/validator'
import { FormLifeCycle } from './shared/lifecycle'
import { Draft } from 'immer'
import { FieldState } from './state/field'
import { VFieldState } from './state/vfield'

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
  computeState?: (state: Draft<P>, preState?: P) => Draft<P> | void
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
  displayName: string
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
  modified: boolean
  active: boolean
  visited: boolean
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
  name?: string
  value?: any
  values?: any[]
  initialValue?: any
  props?: {}
  rules?: ValidateArrayRules[]
  required?: boolean
  editable?: boolean
  onChange?: (fieldState: IField) => void
}

export interface IFormState {
  pristine: boolean
  valid: boolean
  invalid: boolean
  loading: boolean
  validating: boolean
  submitting: boolean
  initialized: boolean
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

export interface IFormCreatorOptions extends IFormStateProps {
  useDirty?: boolean
  validateFirst?: boolean
  onSubmit?: (values: IFormState['values']) => void | Promise<any>
  onReset?: () => void
  onValidateFailed?: (validated: IFormValidateResult) => void
}

export interface IVFieldState {
  path: FormPath
  name: string
  displayName: string
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
  name?: string
  props?: {}
  onChange?: (fieldState: IVField) => void
}

export interface IFormValidateResult {
  errors: string[]
  warnings: string[]
}

export interface IFormSubmitResult {
  validated: IFormValidateResult
  payload: any
}

export interface IFormResetOptions {
  forceClear?: boolean
  validate?: boolean
}

export type IField = typeof FieldState.prototype

export type IVField = typeof VFieldState.prototype

export interface IFormGraph {
  [path: string]: IFormState | IFieldState | IVFieldState
}

export interface IMutators {
  change(...values: any[]): any
  focus(): void
  blur(): void
  push(value: any): any[]
  pop(): any[]
  insert(index: number, value: any): any[]
  remove(index: number | string): any
  unshift(value: any): any[]
  shift(): any[]
  move($from: number, $to: number): any
  validate(): void
}

export interface IForm {
  submit(
    onSubmit: (values: IFormState['values']) => void | Promise<any>
  ): Promise<IFormSubmitResult>
  reset(options: IFormResetOptions): void
  validate(path?: FormPathPattern, options?: {}): Promise<IFormValidateResult>
  setFormState(callback?: (state: IFormState) => any): void
  getFormState(callback?: (state: IFormState) => any): any
  subscribe(callback?: (state: IFormState) => void): void
  unsubscribe(callback?: (state: IFormState) => void): void
  setFieldState(
    path: FormPathPattern,
    callback?: (state: IFieldState) => void
  ): void
  getFieldState(
    path: FormPathPattern,
    callback?: (state: IFieldState) => any
  ): any
  registerField(props: IFieldStateProps): IField
  registerVField(props: IVFieldStateProps): IVField
  createMutators(path: FormPathPattern): IMutators
  getFormGraph(): IFormGraph
  setFormGraph(graph: IFormGraph): void
  notify: <T>(type: string, payload: T) => void
  setFieldValue(path?: FormPathPattern, value?: any): void
  getFieldValue(path?: FormPathPattern): any
  setFieldInitialValue(path?: FormPathPattern, value?: any): void
  getFieldInitialValue(path?: FormPathPattern): any
}
