import { FormPath, FormPathPattern, isFn, Subscribable } from '@formily/shared'
import {
  ValidatePatternRules,
  ValidateNodeResult,
  ValidateFieldOptions
} from '@formily/validator'
import { FormLifeCycle } from './shared/lifecycle'
import { Draft } from 'immer'

export type FormLifeCycleHandler<T> = (payload: T, context: any) => void

export type FormHeartSubscriber = ({
  type,
  payload
}: {
  type: string
  payload: any
}) => void

export enum LifeCycleTypes {
  /**
   * Form LifeCycle
   **/

  ON_FORM_WILL_INIT = 'onFormWillInit',
  ON_FORM_INIT = 'onFormInit',
  ON_FORM_CHANGE = 'onFormChange', //ChangeType精准控制响应
  ON_FORM_MOUNT = 'onFormMount',
  ON_FORM_UNMOUNT = 'onFormUnmount',
  ON_FORM_SUBMIT = 'onFormSubmit',
  ON_FORM_RESET = 'onFormReset',
  ON_FORM_SUBMIT_START = 'onFormSubmitStart',
  ON_FORM_SUBMIT_END = 'onFormSubmitEnd',
  ON_FORM_SUBMIT_VALIDATE_START = 'onFormSubmitValidateStart',
  ON_FORM_SUBMIT_VALIDATE_SUCCESS = 'onFormSubmitValidateSuccess',
  ON_FORM_SUBMIT_VALIDATE_FAILED = 'onFormSubmitValidateFailed',
  ON_FORM_VALUES_CHANGE = 'onFormValuesChange',
  ON_FORM_INITIAL_VALUES_CHANGE = 'onFormInitialValuesChange',
  ON_FORM_VALIDATE_START = 'onFormValidateStart',
  ON_FORM_VALIDATE_END = 'onFormValidateEnd',
  ON_FORM_INPUT_CHANGE = 'onFormInputChange',
  ON_FORM_HOST_RENDER = 'onFormHostRender',
  /**
   * FormGraph LifeCycle
   **/
  ON_FORM_GRAPH_CHANGE = 'onFormGraphChange',

  /**
   * Field LifeCycle
   **/

  ON_FIELD_WILL_INIT = 'onFieldWillInit',
  ON_FIELD_INIT = 'onFieldInit',
  ON_FIELD_CHANGE = 'onFieldChange',
  ON_FIELD_INPUT_CHANGE = 'onFieldInputChange',
  ON_FIELD_VALUE_CHANGE = 'onFieldValueChange',
  ON_FIELD_INITIAL_VALUE_CHANGE = 'onFieldInitialValueChange',
  ON_FIELD_VALIDATE_START = 'onFieldValidateStart',
  ON_FIELD_VALIDATE_END = 'onFieldValidateEnd',
  ON_FIELD_MOUNT = 'onFieldMount',
  ON_FIELD_UNMOUNT = 'onFieldUnmount'
}

export interface FormGraphProps {
  matchStrategy?: (pattern: FormPathPattern, field: any) => boolean
}

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

export interface FormGraphNodeRef {
  parent?: FormGraphNodeRef
  path: FormPath
  children: FormPath[]
}

export type FormGraphMatcher<T> = (node: T, path: FormPath) => void | boolean

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

export interface IStateModelFactory<S, P> {
  new (state: S, props: P): StateModel<S>
  defaultState?: S
  defaultProps?: P
  displayName?: string
}

export interface IStateModelProvider<S, P> {
  new (props: P): IModel<S, P>
}

export interface IFieldState<FieldProps = any> {
  displayName?: string
  dataType: string
  name: string
  path: string
  initialized: boolean
  pristine: boolean
  valid: boolean
  touched: boolean
  invalid: boolean
  visible: boolean
  display: boolean
  editable: boolean
  selfEditable: boolean
  formEditable: boolean | ((name: string) => boolean)
  loading: boolean
  modified: boolean
  active: boolean
  visited: boolean
  validating: boolean
  values: any[]
  errors: string[]
  effectErrors: string[]
  ruleErrors: string[]
  warnings: string[]
  effectWarnings: string[]
  ruleWarnings: string[]
  value: any
  visibleCacheValue: any
  initialValue: any
  rules: ValidatePatternRules[]
  required: boolean
  mounted: boolean
  unmounted: boolean
  props: FieldProps
  [key: string]: any
}

export type IFieldUserState<FieldProps = any> = Omit<
  IFieldState<FieldProps>,
  | 'errors'
  | 'effectErrors'
  | 'ruleErrors'
  | 'warnings'
  | 'effectWarnings'
  | 'ruleWarnings'
> & {
  errors: React.ReactNode | React.ReactNode[]
  warnings: React.ReactNode | React.ReactNode[]
}

export type FieldStateDirtyMap = StateDirtyMap<IFieldState>

export interface IFieldStateProps<FieldProps = any> {
  path?: FormPathPattern
  nodePath?: FormPathPattern
  dataPath?: FormPathPattern
  dataType?: string
  name?: string
  value?: any
  values?: any[]
  initialValue?: any
  props?: FieldProps
  rules?: ValidatePatternRules[] | ValidatePatternRules
  required?: boolean
  editable?: boolean
  visible?: boolean
  display?: boolean
  useDirty?: boolean
  computeState?: (draft: IFieldState, prevState: IFieldState) => void
}

export const isField = (target: any): target is IField =>
  target &&
  target.displayName === 'FieldState' &&
  isFn(target.getState) &&
  isFn(target.setState)

export const isFieldState = (target: any): target is IFieldState =>
  target && target.displayName === 'FieldState' && target.name && target.path

export const isFormState = (target: any): target is IFormState =>
  target && target.displayName === 'FormState'

export const isVirtualField = (target: any): target is IVirtualField =>
  target &&
  target.displayName === 'VirtualFieldState' &&
  isFn(target.getState) &&
  isFn(target.setState)

export const isVirtualFieldState = (
  target: any
): target is IVirtualFieldState =>
  target && target.displayName === 'VirtualFieldState'

export const isStateModel = (target: any): target is IModel =>
  target && isFn(target.getState)

export interface IFormState<FormProps = any> {
  pristine: boolean
  valid: boolean
  invalid: boolean
  loading: boolean
  validating: boolean
  modified: boolean
  submitting: boolean
  initialized: boolean
  editable: boolean | ((name: string) => boolean)
  errors: string[]
  warnings: string[]
  values: {}
  initialValues: {}
  mounted: boolean
  unmounted: boolean
  props: FormProps
  [key: string]: any
}

export type FormStateDirtyMap = StateDirtyMap<IFormState>

export interface IFormStateProps {
  initialValues?: {}
  values?: {}
  lifecycles?: FormLifeCycle[]
  useDirty?: boolean
  editable?: boolean | ((name: string) => boolean)
  validateFirst?: boolean
}

export interface IFormCreatorOptions extends IFormStateProps {
  onChange?: (values: IFormState['values']) => void
  onSubmit?: (values: IFormState['values']) => any | Promise<any>
  onReset?: () => void
  onValidateFailed?: (validated: IFormValidateResult) => void
}

export interface IVirtualFieldState<FieldProps = any> {
  name: string
  path: string
  displayName?: string
  initialized: boolean
  visible: boolean
  display: boolean
  mounted: boolean
  unmounted: boolean
  props: FieldProps
  [key: string]: any
}
export type VirtualFieldStateDirtyMap = StateDirtyMap<IFieldState>

export interface IVirtualFieldStateProps<FieldProps = any> {
  path?: FormPathPattern
  dataPath?: FormPathPattern
  nodePath?: FormPathPattern
  display?: boolean
  visible?: boolean
  useDirty?: boolean
  computeState?: (
    draft: IVirtualFieldState,
    prevState: IVirtualFieldState
  ) => void
  name?: string
  props?: FieldProps
}

export type IFormValidateResult = ValidateNodeResult

export interface IFormSubmitResult {
  values: any
  validated: IFormValidateResult
  payload: any
}

export interface IFormResetOptions {
  forceClear?: boolean
  validate?: boolean
  clearInitialValue?: boolean
  selector?: FormPathPattern
}

export interface IFormGraph {
  [path: string]: IFormState | IFieldState | IVirtualFieldState
}

export type IFormExtendedValidateFieldOptions = ValidateFieldOptions & {
  throwErrors?: boolean
  hostRendering?: boolean
}

export interface IMutators {
  change(...values: any[]): any
  focus(): void
  blur(): void
  push(value?: any): any[]
  pop(): any[]
  insert(index: number, value: any): any[]
  remove(index: number | string): any
  unshift(value: any): any[]
  shift(): any[]
  move($from: number, $to: number): any[]
  moveDown(index: number): any[]
  moveUp(index: number): any[]
  validate(
    opts?: IFormExtendedValidateFieldOptions
  ): Promise<IFormValidateResult>
  exist(index?: number | string): boolean
}

export interface IModel<S = {}, P = {}> extends Subscribable {
  state: S
  props: P
  displayName?: string
  dirtyNum: number
  dirtys: StateDirtyMap<S>
  prevState: S
  batching: boolean
  stackCount: number
  controller: StateModel<S>
  batch: (callback?: () => void) => void
  getState: (callback?: (state: S) => any) => any
  setState: (callback?: (state: S | Draft<S>) => void, silent?: boolean) => void
  getSourceState: (callback?: (state: S) => any) => any
  setSourceState: (callback?: (state: S) => void) => void
  watchProps: <T extends { [key: string]: any }>(
    props: T,
    keys: string[],
    callback: (
      changedProps: {
        [key: string]: any
      },
      props: T
    ) => void
  ) => void
  hasChanged: (path?: FormPathPattern) => boolean
  isDirty: (key?: string) => boolean
  getDirtyInfo: () => StateDirtyMap<S>
}

export type IField = IModel<IFieldState, IFieldStateProps>

export type IVirtualField = IModel<IVirtualFieldState, IVirtualFieldStateProps>

export type IFormInternal = IModel<IFormState, IFormStateProps>

export interface IForm {
  submit(
    onSubmit?: (values: IFormState['values']) => any | Promise<any>
  ): Promise<IFormSubmitResult>
  clearErrors: (pattern?: FormPathPattern) => void
  hasChanged(target: any, path: FormPathPattern): boolean
  reset(options?: IFormResetOptions): Promise<void | IFormValidateResult>
  validate(
    path?: FormPathPattern,
    options?: IFormExtendedValidateFieldOptions
  ): Promise<IFormValidateResult>
  setFormState(callback?: (state: IFormState) => any, silent?: boolean): void
  getFormState(callback?: (state: IFormState) => any): any
  setFieldState(
    path: FormPathPattern,
    callback?: (state: IFieldUserState) => void,
    silent?: boolean
  ): void
  getFieldState(
    path: FormPathPattern,
    callback?: (state: IFieldState) => any
  ): any
  unsafe_do_not_use_transform_data_path(path: FormPathPattern): FormPathPattern //eslint-disable-line
  registerField(props: IFieldStateProps): IField
  registerVirtualField(props: IVirtualFieldStateProps): IVirtualField
  createMutators(field: IField): IMutators
  getFormGraph(): IFormGraph
  setFormGraph(graph: IFormGraph): void
  subscribe(callback?: FormHeartSubscriber): number
  unsubscribe(id: number): void
  notify: <T>(type: string, payload?: T) => void
  isHostRendering: () => boolean
  hostUpdate: (callback?: () => any) => any
  setFieldValue(path?: FormPathPattern, value?: any): void
  getFieldValue(path?: FormPathPattern): any
  setFieldInitialValue(path?: FormPathPattern, value?: any): void
  getFieldInitialValue(path?: FormPathPattern): any
}
