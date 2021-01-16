import { Validator, ValidatorTriggerType } from '@formily/validator'
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

export type JSXComponenntProps<P> = any

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
  ON_FORM_SUBMIT = 'onFormSubmit',
  ON_FORM_RESET = 'onFormReset',
  ON_FORM_SUBMIT_START = 'onFormSubmitStart',
  ON_FORM_SUBMIT_END = 'onFormSubmitEnd',
  ON_FORM_SUBMIT_VALIDATE_START = 'onFormSubmitValidateStart',
  ON_FORM_SUBMIT_VALIDATE_SUCCESS = 'onFormSubmitValidateSuccess',
  ON_FORM_SUBMIT_VALIDATE_FAILED = 'onFormSubmitValidateFailed',
  ON_FORM_SUBMIT_VALIDATE_END = 'onFormSubmitValidateEnd',
  ON_FORM_SUBMIT_SUCCESS = 'onFormSubmitSuccess',
  ON_FORM_SUBMIT_FAILED = 'onFormSubmitFailed',
  ON_FORM_VALUES_CHANGE = 'onFormValuesChange',
  ON_FORM_INITIAL_VALUES_CHANGE = 'onFormInitialValuesChange',
  ON_FORM_VALIDATE_START = 'onFormValidateStart',
  ON_FORM_VALIDATE_SUCCESS = 'onFormValidateSuccess',
  ON_FORM_VALIDATE_FAILED = 'onFormValidateFailed',
  ON_FORM_VALIDATE_END = 'onFormValidateEnd',
  ON_FORM_INPUT_CHANGE = 'onFormInputChange',

  ON_FORM_GRAPH_CHANGE = 'onFormGraphChange',

  /**
   * Field LifeCycle
   **/

  ON_FIELD_INIT = 'onFieldInit',
  ON_FIELD_INPUT_VALUE_CHANGE = 'onFieldInputValueChange',
  ON_FIELD_VALUE_CHANGE = 'onFieldValueChange',
  ON_FIELD_INITIAL_VALUE_CHANGE = 'onFieldInitialValueChange',
  ON_FIELD_VALIDATE_START = 'onFieldValidateStart',
  ON_FIELD_VALIDATE_SUCCESS = 'onFieldValidateSuccess',
  ON_FIELD_VALIDATE_FAILED = 'onFieldValidateFailed',
  ON_FIELD_VALIDATE_END = 'onFieldValidateEnd',
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
  payload?: T
}

export interface IHeartProps<Context> {
  lifecycles?: LifeCycle[]
  context?: Context
}

export type Feedback = {
  triggerType?: FieldFeedbackTriggerTypes
  type?: FieldFeedbackTypes
  code?: FieldFeedbackCodeTypes
  messages?: FeedbackMessage
}

export type FormFeedback = Feedback & {
  path?: FormPath
  address?: FormPath
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

export type FieldUpdate = {
  pattern: FormPath
  callbacks: ((...args: any[]) => any)[]
}

export type FormRequests = {
  validate?: NodeJS.Timeout
  submit?: NodeJS.Timeout
  updates?: FieldUpdate[]
  updateIndexes?: Record<string, number>
}

export type FormFields = Record<string, GeneralField>

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

export type IFieldState = NonFunctionProperties<
  OmitState<Field<any, any, string, string>>
>

export type IVoidFieldState = NonFunctionProperties<
  OmitState<VoidField<any, any, string>>
>

export type IFormState = NonFunctionProperties<
  OmitState<Form<{ [key: string]: any }>>
>

export type IFormGraph = Record<string, IGeneralFieldState | IFormState>

export interface IFormProps {
  values?: {}
  initialValues?: {}
  pattern?: FormPatternTypes
  effects?: (form: Form) => void
  editable?: boolean
  validateFirst?: boolean
}

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

export type FieldRequests = {
  validate?: NodeJS.Timeout
}

export type FieldCaches = {
  value?: any
  initialValue?: any
  feedbacks?: Feedback[]
}

export type FieldDisplayTypes = 'none' | 'hidden' | 'visible'

export type FieldPatternTypes =
  | 'editable'
  | 'readOnly'
  | 'disabled'
  | 'readPretty'

export type FieldValidator = Validator

export type FieldDataSource = {
  label?: string
  value?: string
  title?: string
  key?: string
  text?: string
  children?: FieldDataSource
  [key: string]: any
}[]

export type FieldComponent<Component extends JSXComponent> =
  | [Component]
  | [Component, JSXComponenntProps<Component>]
  | boolean
  | any[]

export type FieldDecorator<Decorator extends JSXComponent> =
  | [Decorator]
  | [Decorator, JSXComponenntProps<Decorator>]
  | boolean
  | any[]

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
  validator?: Validator
  decorator?: FieldDecorator<Decorator>
  component?: FieldComponent<Component>
  reactions?: FieldReaction[]
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
  reactions?: FieldReaction[]
}

export interface IFieldResetOptions {
  forceClear?: boolean
  validate?: boolean
  clearInitialValue?: boolean
}

export type IGeneralFieldState = IFieldState | IVoidFieldState

export type GeneralField = Field | VoidField | ArrayField | ObjectField
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
  (pattern: FieldMatchPattern): void
}

export interface IFieldStateGetter {
  <Getter extends (state: IFieldState) => any>(
    pattern: FieldMatchPattern,
    getter: Getter
  ): ReturnType<Getter>
  (pattern: FieldMatchPattern): IFieldState
}
