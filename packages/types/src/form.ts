import { Subject } from 'rxjs/internal/Subject'
import { Path } from './path'
import { IFieldState, IField } from './field'
import { ISchema } from './schema'
import { IEffects } from './effects'

export interface IFormPayload {
  formState: IFormState
}

export interface IFieldPayload {
  fieldState: IFieldState
  formState: IFormState
}

export interface IFieldError {
  name: string
  errors: string[]
}

export interface IFormState {
  values: any // 表单数据
  initialValues: any // 初始化数据
  valid: boolean // 是否合法
  invalid: boolean // 是否不合法
  errors: IFieldError[] // 错误提示集合
  pristine: boolean // 是否是原始态
  dirty: boolean // 是否存在变化
}

export interface ISubscribers {
  [eventName: string]: Subject<any>
}

export interface IFormOptions {
  editable: boolean | ((nam: string) => boolean)
  effects: IEffects
  defaultValue?: object
  values?: object
  initialValues?: object
  schema: ISchema | {}
  subscribes: ISubscribers
  onFormChange: (payload: IFormPayload) => void
  onFieldChange: (payload: IFieldPayload) => void
  onValidateFailed: (fieldErrors: IFieldError[]) => void
  onFormWillInit?: (form: any) => void
  onReset: (payload: IFormPayload) => void
  onSubmit: (values: any) => Promise<any> | void
  traverse?: (schema: ISchema) => ISchema
}

type TUnionType<T> = T | Promise<T>

// 通过 createActions 或者 createAsyncActions 创建出来的 actions 接口
export interface IFormActions {
  setFieldState: (
    name: Path | IFormPathMatcher,
    callback?: (fieldState: IFieldState) => void
  ) => TUnionType<void>
  getFieldState: (
    name: Path | IFormPathMatcher,
    callback?: (fieldState: IFieldState) => void
  ) => TUnionType<IFieldState | void>
  getFormState: (
    callback?: (fieldState: IFormState) => void
  ) => TUnionType<IFormState | void>
  setFormState: (callback: (fieldState: IFormState) => void) => TUnionType<void>
  getSchema: (path: Path) => TUnionType<ISchema>
  reset: (
    forceClear?: boolean | { forceClear?: boolean; validate?: boolean },
    validate?: boolean
  ) => TUnionType<void>
  submit: () => TUnionType<IFormState>
  validate: () => TUnionType<IFormState | IFormState['errors']>
  dispatch: <T = any>(type: string, payload: T) => TUnionType<void>
}

export interface IAsyncFormActions {
  setFieldState: (
    name: Path | IFormPathMatcher,
    callback?: (fieldState: IFieldState) => void
  ) => Promise<void>
  getFieldState: (
    name: Path | IFormPathMatcher,
    callback?: (fieldState: IFieldState) => void
  ) => Promise<IFieldState | void>
  getFormState: (
    callback?: (fieldState: IFormState) => void
  ) => Promise<IFormState | void>
  setFormState: (callback: (fieldState: IFormState) => void) => Promise<void>
  getSchema: (path: Path) => Promise<ISchema>
  reset: (
    forceClear?: boolean | { forceClear?: boolean; validate?: boolean },
    validate?: boolean
  ) => Promise<void>
  submit: () => Promise<IFormState>
  validate: () => Promise<IFormState | IFormState['errors']>
  dispatch: <T = any>(type: string, payload: T) => Promise<void>
}

export interface IFormPathMatcher {
  (payload: IField | Path | { fieldState: IFieldState }): boolean
  hasWildcard: boolean
  pattern: string
}

// next & antd 需要用到的
export enum LabelAlign {
  TOP = 'top',
  INSET = 'inset',
  LEFT = 'left'
}

export enum LabelTextAlign {
  LEFT = 'left',
  RIGHT = 'right'
}

export enum Size {
  LARGE = 'large',
  MEDIUM = 'medium',
  SMALL = 'small'
}

export interface IFormItemGridProps {
  name?: string
  help?: React.ReactNode
  extra?: React.ReactNode
  description?: string
  title?: string
  cols?: any
}

export interface IFormSharedProps {
  labelCol: object | number
  wrapperCol: object | number
  autoAddColon: boolean
  size: Size
  inline: boolean
  labelAlign: LabelAlign
  labelTextAlign: LabelTextAlign
  className: string
  style: React.CSSProperties
  prefix: string
  maxTipsNum: number
}

export interface IFormProps extends IFormSharedProps {
  layout: string
  children: React.ReactNode
  component: string
  onValidateFailed: () => void
}

export interface IFormItemProps extends IFormSharedProps {
  id: string
  required: boolean
  label: React.ReactNode
  extra: React.ReactNode
  validateState: any
  isTableColItem: boolean
  help: React.ReactNode
  noMinHeight: boolean
  children: React.ReactElement
  type: string
  schema: ISchema
}
