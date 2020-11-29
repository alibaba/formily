import { Validator } from '@formily/validator'
import { FormPath } from '@formily/shared'
import {
  Form,
  Field,
  LifeCycle,
  ArrayField,
  VirtualField,
  ObjectField
} from './models'

export type AnyFunction = (...args: any[]) => any

export type JSXComponent =
  | keyof JSX.IntrinsicElements
  | React.JSXElementConstructor<any>

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
  ON_FORM_SUBMIT_SUCCESS = 'onFormSubmitSuccess',
  ON_FORM_SUBMIT_FAILED = 'onFormSubmitFailed',
  ON_FORM_VALUES_CHANGE = 'onFormValuesChange',
  ON_FORM_INITIAL_VALUES_CHANGE = 'onFormInitialValuesChange',
  ON_FORM_VALIDATE_START = 'onFormValidateStart',
  ON_FORM_VALIDATE_END = 'onFormValidateEnd',
  ON_FORM_INPUT_CHANGE = 'onFormInputChange',

  /**
   * Field LifeCycle
   **/

  ON_FIELD_INIT = 'onFieldInit',
  ON_FIELD_CHANGE = 'onFieldChange',
  ON_FIELD_INPUT_VALUE_CHANGE = 'onFieldInputValueChange',
  ON_FIELD_VALUE_CHANGE = 'onFieldValueChange',
  ON_FIELD_INITIAL_VALUE_CHANGE = 'onFieldInitialValueChange',
  ON_FIELD_VALIDATE_START = 'onFieldValidateStart',
  ON_FIELD_VALIDATE_END = 'onFieldValidateEnd',
  ON_FIELD_RESET = 'onFieldReset',
  ON_FIELD_MOUNT = 'onFieldMount',
  ON_FIELD_UNMOUNT = 'onFieldUnmount'
}

export type HeartSubscriber = ({
  type,
  payload
}: {
  type: string
  payload: any
}) => void

export interface IHeartProps<Context> {
  lifecycles?: LifeCycle[]
  context?: Context
}

export interface IFeedbackReducer {
  (
    informations: FeedbackInformation[],
    infomation: FeedbackInformation,
    index: number
  ): FeedbackInformation[]
}

export interface IFeedbackInformation {
  triggerType?: string
  type?: string
  code?: string
  path?: FormPathPattern
  messages?: FeedbackMessage
}

export type FeedbackInformation = {
  triggerType?: string
  type?: string
  code?: string
  path?: string
  messages?: FeedbackMessage
}

export type FeedbackMessage = any[]

export type FormRequests = {
  validate?: NodeJS.Timeout
}

export type FormFields = Record<string, GeneralField>

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
  | (((path: Array<string | number>) => boolean) & {
      path: FormPath
    })

export interface IFormState {
  displayName: string
  id: string
  initialized: boolean
  validating: boolean
  submitting: boolean
  modified: boolean
  pattern: FormPatternTypes
  values: any
  initialValues: any
  mounted: boolean
  unmounted: boolean
  valid: boolean
  invalid: boolean
  errors: FeedbackInformation[]
  successes: FeedbackInformation[]
  warnings: FeedbackInformation[]
}

export type IFormGraph = Record<string, IGeneralFieldState | IFormState>

export interface IFormProps {
  values?: {}
  initialValues?: {}
  pattern?: FormPatternTypes
  effects?: (form: Form) => void
  editable?: boolean
  validateFirst?: boolean
  middlewares?: IFieldMiddleware[]
}

export interface IFieldFactoryProps<
  D extends JSXComponent,
  C extends JSXComponent
> extends IFieldProps<D, C> {
  name: FormPathPattern
  basePath?: FormPathPattern
}

export interface IVirtualFieldFactoryProps<
  D extends JSXComponent,
  C extends JSXComponent
> extends IVirtualFieldProps<D, C> {
  name: FormPathPattern
  basePath?: FormPathPattern
}

export type FieldRequests = {
  validate?: NodeJS.Timeout
}

export type FieldCaches = {
  value?: any
  initialValue?: any
}

export type FieldDisplayTypes = 'none' | 'hidden' | 'visibility'

export type FieldPatternTypes =
  | 'editable'
  | 'readOnly'
  | 'disabled'
  | 'readPretty'

export type FieldValidator = Validator

export type FieldComponent<Component extends JSXComponent> =
  | [Component]
  | [Component, React.ComponentProps<Component>]
  | boolean
  | any[]

export type FieldDecorator<Decorator extends JSXComponent> =
  | [Decorator]
  | [Decorator, React.ComponentProps<Decorator>]
  | boolean
  | any[]

export interface IFieldProps<
  Decorator extends JSXComponent = any,
  Component extends JSXComponent = any
> {
  value?: any
  initialValue?: any
  required?: boolean
  display?: FieldDisplayTypes
  pattern?: FieldPatternTypes
  validator?: Validator
  decorator?: FieldDecorator<Decorator>
  component?: FieldComponent<Component>
}

export interface IVirtualFieldProps<
  Decorator extends JSXComponent = any,
  Component extends JSXComponent = any
> {
  display?: FieldDisplayTypes
  pattern?: FieldPatternTypes
  decorator?: FieldDecorator<Decorator>
  component?: FieldComponent<Component>
}

export interface IFieldResetOptions {
  forceClear?: boolean
  validate?: boolean
  clearInitialValue?: boolean
}

export interface IFieldState {
  displayName: string
  path: string
  display: FieldDisplayTypes
  pattern: FieldPatternTypes
  loading: boolean
  validating: boolean
  required: boolean
  modified: boolean
  active: boolean
  visited: boolean
  inputValue: any
  inputValues: any[]
  decorator: FieldDecorator<any>
  component: FieldComponent<any>
  warnings: FeedbackInformation[]
  errors: FeedbackInformation[]
  successes: FeedbackInformation[]
  value: any
  initialValue: any
}

export interface IVirtualFieldState {
  displayName: string
  path: string
  display: FieldDisplayTypes
  pattern: FieldPatternTypes
  decorator: FieldDecorator<any>
  component: FieldComponent<any>
}

export type IGeneralFieldState = IFieldState | IVirtualFieldState

export type GeneralField = Field | VirtualField | ArrayField | ObjectField

export interface IFieldMiddleware {
  (state: IGeneralFieldState, field: GeneralField): IGeneralFieldState
}

export interface ISpliceArrayStateProps {
  startIndex?: number
  deleteCount?: number
  insertCount?: number
}

export interface IExchangeArrayStateProps {
  fromIndex?: number
  toIndex?: number
}
