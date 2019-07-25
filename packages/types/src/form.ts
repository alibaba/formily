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

// 通过 createActions 或者 createAsyncActions 创建出来的 actions 接口
export interface IFormActions {
  setFieldState: (
    name: Path | IFormPathMatcher,
    callback?: (fieldState: IFieldState) => void
  ) => Promise<any>
  getFieldState: (
    name: Path | IFormPathMatcher,
    callback: (fieldState: IFieldState) => any
  ) => any
  getFormState: (callback: (fieldState: IFormState) => any) => any
  setFormState: (callback: (fieldState: IFormState) => any) => Promise<any>
  getSchema: (path: Path) => object
  reset: (forceClear: boolean) => void
  submit: () => Promise<any>
  validate: () => Promise<any>
  dispatch: (type: string, payload: any) => void
}

export interface IFormPathMatcher {
  (payload: IField | Path | { fieldState: IFieldState }): boolean
  hasWildcard: boolean
  pattern: string
}
