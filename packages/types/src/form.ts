import { Path } from './path'
import { IFieldState, IField } from './field'
import { ISchema } from './schema'
import { Subject } from 'rxjs/internal/Subject'
import { IEffects } from './effects'
export interface IFormPayload { formState: IFormState }

export interface IFieldError {
  name: string,
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
  initialValues?: object
  onSubmit: (values: any) => Promise<any> | null
  onReset: (payload: IFormPayload) => void
  schema: ISchema | {}
  onFormChange: (payload: IFormPayload) => void
  onFieldChange: (fieldState: IFieldState, formState?: IFormState) => void
  onValidateFailed: (fieldErrors: IFieldError[]) => void
  onFormWillInit?: (form: any) => void
  editable: boolean | ((nam: string) => boolean)
  effects: IEffects
  subscribes: ISubscribers
}

export interface IFormActions {
  setFieldState: (name: Path | IFormPathMatcher, callback: (fieldState: IFieldState) => void) => Promise<any>,
  getFieldState: (name: Path | IFormPathMatcher, callback: (fieldState: IFieldState) => any) => any,
  getFormState: (callback: (fieldState: IFormState) => any) => any,
  setFormState: (callback: (fieldState: IFormState) => any) => Promise<any>
}

export interface IFormPathMatcher {
  (payload: IField | Path | { fieldState: IFieldState }): boolean
  hasWildcard: boolean
  string: string
}