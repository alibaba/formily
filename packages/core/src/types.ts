import {
  IValidatorRules,
  Validator,
  ValidatorTriggerType,
} from '@formily/validator'
import { FormPath } from '@formily/shared'
import {
  Form,
  Field,
  LifeCycle,
  ArrayField,
  VoidField,
  ObjectField,
  Query,
} from './models'

export type NonFunctionPropertyNames<T> = {
  [K in keyof T]: T[K] extends (...args: any) => any ? never : K
}[keyof T]

export type NonFunctionProperties<T> = Pick<T, NonFunctionPropertyNames<T>>

export type AnyFunction = (...args: any[]) => any

export type JSXComponent = any

export type LifeCycleHandler<T> = (payload: T, context: any) => void

export type LifeCyclePayload<T> = (
  params: {
    type: string
    payload: T
  },
  context: any
) => void

export enum LifeCycleTypes {
  /**
   * Form LifeCycle
   **/

  ON_FORM_INIT = 'onFormInit',
  ON_FORM_MOUNT = 'onFormMount',
  ON_FORM_UNMOUNT = 'onFormUnmount',

  ON_FORM_INPUT_CHANGE = 'onFormInputChange',
  ON_FORM_VALUES_CHANGE = 'onFormValuesChange',
  ON_FORM_INITIAL_VALUES_CHANGE = 'onFormInitialValuesChange',

  ON_FORM_SUBMIT = 'onFormSubmit',
  ON_FORM_RESET = 'onFormReset',
  ON_FORM_SUBMIT_START = 'onFormSubmitStart',
  ON_FORM_SUBMITTING = 'onFormSubmitting',
  ON_FORM_SUBMIT_END = 'onFormSubmitEnd',
  ON_FORM_SUBMIT_VALIDATE_START = 'onFormSubmitValidateStart',
  ON_FORM_SUBMIT_VALIDATE_SUCCESS = 'onFormSubmitValidateSuccess',
  ON_FORM_SUBMIT_VALIDATE_FAILED = 'onFormSubmitValidateFailed',
  ON_FORM_SUBMIT_VALIDATE_END = 'onFormSubmitValidateEnd',
  ON_FORM_SUBMIT_SUCCESS = 'onFormSubmitSuccess',
  ON_FORM_SUBMIT_FAILED = 'onFormSubmitFailed',
  ON_FORM_VALIDATE_START = 'onFormValidateStart',
  ON_FORM_VALIDATING = 'onFormValidating',
  ON_FORM_VALIDATE_SUCCESS = 'onFormValidateSuccess',
  ON_FORM_VALIDATE_FAILED = 'onFormValidateFailed',
  ON_FORM_VALIDATE_END = 'onFormValidateEnd',

  ON_FORM_GRAPH_CHANGE = 'onFormGraphChange',
  ON_FORM_LOADING = 'onFormLoading',

  /**
   * Field LifeCycle
   **/

  ON_FIELD_INIT = 'onFieldInit',
  ON_FIELD_INPUT_VALUE_CHANGE = 'onFieldInputValueChange',
  ON_FIELD_VALUE_CHANGE = 'onFieldValueChange',
  ON_FIELD_INITIAL_VALUE_CHANGE = 'onFieldInitialValueChange',

  ON_FIELD_SUBMIT = 'onFieldSubmit',
  ON_FIELD_SUBMIT_START = 'onFieldSubmitStart',
  ON_FIELD_SUBMITTING = 'onFieldSubmitting',
  ON_FIELD_SUBMIT_END = 'onFieldSubmitEnd',
  ON_FIELD_SUBMIT_VALIDATE_START = 'onFieldSubmitValidateStart',
  ON_FIELD_SUBMIT_VALIDATE_SUCCESS = 'onFieldSubmitValidateSuccess',
  ON_FIELD_SUBMIT_VALIDATE_FAILED = 'onFieldSubmitValidateFailed',
  ON_FIELD_SUBMIT_VALIDATE_END = 'onFieldSubmitValidateEnd',
  ON_FIELD_SUBMIT_SUCCESS = 'onFieldSubmitSuccess',
  ON_FIELD_SUBMIT_FAILED = 'onFieldSubmitFailed',
  ON_FIELD_VALIDATE_START = 'onFieldValidateStart',
  ON_FIELD_VALIDATING = 'onFieldValidating',
  ON_FIELD_VALIDATE_SUCCESS = 'onFieldValidateSuccess',
  ON_FIELD_VALIDATE_FAILED = 'onFieldValidateFailed',
  ON_FIELD_VALIDATE_END = 'onFieldValidateEnd',

  ON_FIELD_LOADING = 'onFieldLoading',
  ON_FIELD_RESET = 'onFieldReset',
  ON_FIELD_MOUNT = 'onFieldMount',
  ON_FIELD_UNMOUNT = 'onFieldUnmount',
}

export type HeartSubscriber = ({
  type,
  payload,
}: {
  type: string
  payload: any
}) => void

export interface INodePatch<T> {
  type: 'remove' | 'update'
  address: string
  oldAddress?: string
  payload?: T
}

export interface IHeartProps<Context> {
  lifecycles?: LifeCycle[]
  context?: Context
}

export interface IFieldFeedback {
  triggerType?: FieldFeedbackTriggerTypes
  type?: FieldFeedbackTypes
  code?: FieldFeedbackCodeTypes
  messages?: FeedbackMessage
}

export type IFormFeedback = IFieldFeedback & {
  path?: string
  address?: string
}

export interface ISearchFeedback {
  triggerType?: FieldFeedbackTriggerTypes
  type?: FieldFeedbackTypes
  code?: FieldFeedbackCodeTypes
  address?: FormPathPattern
  path?: FormPathPattern
  messages?: FeedbackMessage
}

export type FeedbackMessage = any[]

export type IFieldUpdate = {
  pattern: FormPath
  callbacks: ((...args: any[]) => any)[]
}

export interface IFormRequests {
  validate?: NodeJS.Timeout
  submit?: NodeJS.Timeout
  loading?: NodeJS.Timeout
  updates?: IFieldUpdate[]
  updateIndexes?: Record<string, number>
}

export type IFormFields = Record<string, GeneralField>

export type FieldFeedbackTypes = 'error' | 'success' | 'warning'

export type FieldFeedbackTriggerTypes = ValidatorTriggerType

export type FieldFeedbackCodeTypes =
  | 'ValidateError'
  | 'ValidateSuccess'
  | 'ValidateWarning'
  | 'EffectError'
  | 'EffectSuccess'
  | 'EffectWarning'
  | (string & {})

export type FormPatternTypes =
  | 'editable'
  | 'readOnly'
  | 'disabled'
  | 'readPretty'
  | ({} & string)
export type FormDisplayTypes = 'none' | 'hidden' | 'visible' | ({} & string)

export type FormPathPattern =
  | string
  | number
  | Array<string | number>
  | FormPath
  | RegExp
  | (((address: Array<string | number>) => boolean) & {
      path: FormPath
    })

type OmitState<P> = Omit<
  P,
  | 'selfDisplay'
  | 'selfPattern'
  | 'originValues'
  | 'originInitialValues'
  | 'id'
  | 'address'
  | 'path'
  | 'lifecycles'
  | 'disposers'
  | 'requests'
  | 'fields'
  | 'graph'
  | 'heart'
  | 'indexes'
  | 'props'
  | 'displayName'
  | 'setState'
  | 'getState'
  | 'getFormGraph'
  | 'setFormGraph'
  | 'setFormState'
  | 'getFormState'
>

export type IFieldState = Partial<
  Pick<
    Field,
    NonFunctionPropertyNames<OmitState<Field<any, any, string, string>>>
  >
>

export type IVoidFieldState = Partial<
  Pick<
    VoidField,
    NonFunctionPropertyNames<OmitState<VoidField<any, any, string>>>
  >
>

export type IFormState<T extends Record<any, any> = any> = Pick<
  Form<T>,
  NonFunctionPropertyNames<OmitState<Form<{ [key: string]: any }>>>
>

export type IFormGraph = Record<string, IGeneralFieldState | IFormState>

export interface IFormProps<T extends object = any> {
  values?: Partial<T>
  initialValues?: Partial<T>
  pattern?: FormPatternTypes
  display?: FormDisplayTypes
  hidden?: boolean
  visible?: boolean
  editable?: boolean
  disabled?: boolean
  readOnly?: boolean
  readPretty?: boolean
  effects?: (form: Form<T>) => void
  validateFirst?: boolean
  designable?: boolean
}

export type IFormMergeStrategy =
  | 'overwrite'
  | 'merge'
  | 'deepMerge'
  | 'shallowMerge'

export interface IFieldFactoryProps<
  Decorator extends JSXComponent,
  Component extends JSXComponent,
  TextType = any,
  ValueType = any
> extends IFieldProps<Decorator, Component, TextType, ValueType> {
  name: FormPathPattern
  basePath?: FormPathPattern
}

export interface IVoidFieldFactoryProps<
  Decorator extends JSXComponent,
  Component extends JSXComponent,
  TextType = any
> extends IVoidFieldProps<Decorator, Component, TextType> {
  name: FormPathPattern
  basePath?: FormPathPattern
}

export interface IFieldRequests {
  validate?: NodeJS.Timeout
  submit?: NodeJS.Timeout
  loading?: NodeJS.Timeout
  batch?: () => void
}

export interface IFieldCaches {
  value?: any
  initialValue?: any
  inputting?: boolean
}

export type FieldDisplayTypes = 'none' | 'hidden' | 'visible' | ({} & string)

export type FieldPatternTypes =
  | 'editable'
  | 'readOnly'
  | 'disabled'
  | 'readPretty'
  | ({} & string)

export type FieldValidatorContext = IValidatorRules & {
  field?: Field
  form?: Form
  value?: any
}

export type FieldValidator = Validator<FieldValidatorContext>

export type FieldDataSource = {
  label?: any
  value?: any
  title?: any
  key?: any
  text?: any
  children?: FieldDataSource
  [key: string]: any
}[]

export type FieldComponent<
  Component extends JSXComponent,
  ComponentProps = any
> = [Component] | [Component, ComponentProps] | boolean | any[]

export type FieldDecorator<
  Decorator extends JSXComponent,
  ComponentProps = any
> = [Decorator] | [Decorator, ComponentProps] | boolean | any[]

export type FieldReaction = (field: Field) => void
export interface IFieldProps<
  Decorator extends JSXComponent = any,
  Component extends JSXComponent = any,
  TextType = any,
  ValueType = any
> {
  name: FormPathPattern
  basePath?: FormPathPattern
  title?: TextType
  description?: TextType
  value?: ValueType
  initialValue?: ValueType
  required?: boolean
  display?: FieldDisplayTypes
  pattern?: FieldPatternTypes
  hidden?: boolean
  visible?: boolean
  editable?: boolean
  disabled?: boolean
  readOnly?: boolean
  readPretty?: boolean
  dataSource?: FieldDataSource
  validateFirst?: boolean
  validator?: FieldValidator
  decorator?: FieldDecorator<Decorator>
  component?: FieldComponent<Component>
  reactions?: FieldReaction[] | FieldReaction
  content?: any
  data?: any
}

export interface IVoidFieldProps<
  Decorator extends JSXComponent = any,
  Component extends JSXComponent = any,
  TextType = any
> {
  name: FormPathPattern
  basePath?: FormPathPattern
  title?: TextType
  description?: TextType
  display?: FieldDisplayTypes
  pattern?: FieldPatternTypes
  hidden?: boolean
  visible?: boolean
  editable?: boolean
  disabled?: boolean
  readOnly?: boolean
  readPretty?: boolean
  decorator?: FieldDecorator<Decorator>
  component?: FieldComponent<Component>
  reactions?: FieldReaction[] | FieldReaction
  content?: any
  data?: any
}

export interface IFieldResetOptions {
  forceClear?: boolean
  validate?: boolean
}

export type IGeneralFieldState = IFieldState & IVoidFieldState

export type GeneralField = Field | VoidField | ArrayField | ObjectField

export type DataField = Field | ArrayField | ObjectField
export interface ISpliceArrayStateProps {
  startIndex?: number
  deleteCount?: number
  insertCount?: number
}

export interface IExchangeArrayStateProps {
  fromIndex?: number
  toIndex?: number
}

export interface IQueryProps {
  pattern: FormPathPattern
  base: FormPathPattern
  form: Form
}

export interface IModelSetter<P = any> {
  (setter: (state: P) => void): void
  (setter: Partial<P>): void
  (): void
}

export interface IModelGetter<P = any> {
  <Getter extends (state: P) => any>(getter: Getter): ReturnType<Getter>
  (): P
}

export type FieldMatchPattern = FormPathPattern | Query | GeneralField

export interface IFieldStateSetter {
  (pattern: FieldMatchPattern, setter: (state: IFieldState) => void): void
  (pattern: FieldMatchPattern, setter: Partial<IFieldState>): void
}

export interface IFieldStateGetter {
  <Getter extends (state: IGeneralFieldState) => any>(
    pattern: FieldMatchPattern,
    getter: Getter
  ): ReturnType<Getter>
  (pattern: FieldMatchPattern): IGeneralFieldState
}
