import { FormPath, FormPathPattern, isFn } from '@formily/shared'
import {
  ValidatePatternRules,
  ValidateNodeResult,
  ValidateFieldOptions
} from '@formily/validator'
import { createForm } from './index'
import { FormLifeCycle } from './shared/lifecycle'
import { Draft } from 'immer'
import { Field } from './models/field'
import { VirtualField } from './models/virtual-field'
export * from '@formily/validator'

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
  ON_FORM_ON_SUBMIT_SUCCESS = 'onFormOnSubmitSuccess',
  ON_FORM_ON_SUBMIT_FAILED = 'onFormOnSubmitFailed',
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

export type FormGraphProps = {
  matchStrategy?: (
    pattern: FormPathPattern,
    nodePath: FormPathPattern
  ) => boolean
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
  dataPath?: FormPath
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

export type NormalRecord = { [key: string]: any }

export interface IModelSpec<
  State extends NormalRecord,
  Props extends NormalRecord
> {
  state?: Partial<State>
  props?: Props
  prevState?: Partial<State>
  getState?: (state?: State) => any
  beforeProduce?: () => void
  afterProduce?: () => void
  dirtyCheck?: (path: FormPathPattern, value: any, nextValue: any) => boolean
  produce?: (draft: Draft<State>, dirtys: StateDirtyMap<State>) => void
}

export interface IDirtyModelFactory<
  State extends NormalRecord,
  Props extends NormalRecord
> {
  new (props?: Props): IModelSpec<Partial<State>, Props>
  defaultProps?: Props
  displayName?: string
}

export interface IFieldState<FieldProps = any> {
  displayName: string
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
  inputed: boolean
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
  unmountRemoveValue: boolean
  props: FieldProps
  [key: string]: any
}

export type FieldStateDirtyMap = StateDirtyMap<IFieldState>

export interface IFieldStateProps {
  nodePath?: FormPathPattern
  dataPath?: FormPathPattern
  dataType?: string
  getEditable?: () => boolean | ((name: string) => boolean)
  getValue?: (name: FormPathPattern) => any
  getInitialValue?: (name: FormPathPattern) => any
  setValue?: (name: FormPathPattern, value: any) => void
  removeValue?: (name: FormPathPattern) => void
  setInitialValue?: (name: FormPathPattern, initialValue: any) => void
  supportUnmountClearStates?: (path: FormPathPattern) => boolean
  computeState?: (draft: IFieldState, prevState: IFieldState) => void
  unControlledValueChanged?: () => void
}

export interface IFieldRegistryProps<FieldProps = FormilyCore.FieldProps> {
  path?: FormPathPattern
  name?: FormPathPattern
  value?: any
  values?: any[]
  initialValue?: any
  props?: FieldProps
  rules?: ValidatePatternRules[] | ValidatePatternRules
  required?: boolean
  editable?: boolean
  unmountRemoveValue?: boolean
  visible?: boolean
  display?: boolean
  dataType?: string
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

export interface IFormState<FormProps = any> {
  valid: boolean
  invalid: boolean
  loading: boolean
  validating: boolean
  modified: boolean
  submitting: boolean
  initialized: boolean
  editable: boolean | ((name: string) => boolean)
  errors: Array<{
    path: string
    messages: string[]
  }>
  warnings: Array<{
    path: string
    messages: string[]
  }>
  values: any
  initialValues: any
  mounted: boolean
  unmounted: boolean
  props: FormProps
  [key: string]: any
}

export type FormStateDirtyMap = StateDirtyMap<IFormState>

export type IFormStateProps = {}

export interface IFormCreatorOptions {
  initialValues?: {}
  values?: {}
  lifecycles?: FormLifeCycle[]
  editable?: boolean | ((name: string) => boolean)
  validateFirst?: boolean
  onChange?: (values: IFormState['values']) => void
  onSubmit?: (values: IFormState['values']) => any | Promise<any>
  onReset?: () => void
  onValidateFailed?: (validated: IFormValidateResult) => void
}

export interface IVirtualFieldState<
  FieldProps = FormilyCore.VirtualFieldProps
> {
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

export interface IVirtualFieldStateProps {
  dataPath?: FormPathPattern
  nodePath?: FormPathPattern
  computeState?: (
    draft: IVirtualFieldState,
    prevState: IVirtualFieldState
  ) => void
}

export interface IVirtualFieldRegistryProps<FieldProps = any> {
  name?: FormPathPattern
  path?: FormPathPattern
  display?: boolean
  visible?: boolean
  computeState?: (
    draft: IVirtualFieldState,
    prevState: IVirtualFieldState
  ) => void
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

export type IMutators = ReturnType<IForm['createMutators']>

export type IField = InstanceType<typeof Field>

export type IVirtualField = InstanceType<typeof VirtualField>

export type IForm = ReturnType<typeof createForm>

export type IFormPlugin<
  Context extends { [key: string]: any } = any,
  Exports extends {
    [key: string]: (...args: any[]) => any
  } = any
> = (
  context: Context
) => {
  context?: {
    [key: string]: any
  }
  exports?: Exports
} | void

export type IFormPluginExports<P> = P extends (
  context: any
) => {
  context?: {
    [key: string]: any
  }
  exports?: infer P
} | void
  ? P
  : {}

export const isStateModel = (payload: any) => {
  return isFn(payload?.getState)
}
