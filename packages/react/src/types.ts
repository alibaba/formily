import React from 'react'
import {
  IFieldRegistryProps,
  IVirtualFieldRegistryProps,
  IForm,
  IMutators,
  IFieldState,
  IFormValidateResult,
  IFormState,
  IField,
  IVirtualFieldState,
  IVirtualField
} from '@formily/core'
import { Observable } from 'rxjs/internal/Observable'
export * from '@formily/core'

type ILayoutLabelAlign = 'top' | 'left' | 'right'
export interface ILayoutProps {
  hasBorder?: boolean
  context?: any
  isRoot?: boolean
  isLayout?: boolean
  defaultSettings?: any
  children?: any
  full?: boolean
  layoutProps?: any
  className?: string
  label?: any
  required?: boolean
  labelAlign?: ILayoutLabelAlign
  inline?: boolean
  inset?: boolean
  autoRow?: boolean
  columns?: number
  flex?: boolean
  enableSafeWidth?: boolean
  labelWidth?: number | string
  wrapperWidth?: number | string
  labelCol?: number
  wrapperCol?: number
  addonBefore?: any
  addonAfter?: any
  description?: any
  gutter?: number | string
  span?: number
  grid?: boolean
  contextColumns?: number
  contextResponsive?: { lg?: number; m?: number; s?: number }
  responsive?: { lg?: number; m?: number; s?: number }
  size?: string
}

export type ILayoutItemProps = {
  span?: number
  full?: boolean
  labelAlign?: ILayoutLabelAlign
  inset?: boolean
  labelWidth?: number
  wrapperWidth?: number
  labelCol?: number
  wrapperCol?: number
}

export interface IFormEffect<Payload = any, Actions = any> {
  (
    selector: IFormExtendsEffectSelector<Payload, Actions>,
    actions: Actions
  ): void
}

export type IFieldMergeState = Partial<IFieldState> &
  Partial<IVirtualFieldState>

export interface IFormEffectSelector<Payload = any> {
  (
    type: string,
    matcher?: string | ((payload: Payload) => boolean)
  ): Observable<any>
}

export type IFormExtendsEffectSelector<
  Payload = any,
  Actions = any
> = IFormEffectSelector<Payload> & Actions

export interface IFormProps<
  Value = {},
  DefaultValue = {},
  FormEffectPayload = any,
  FormActions = any
> {
  value?: Value
  defaultValue?: DefaultValue
  initialValues?: DefaultValue
  actions?: FormActions
  effects?: IFormEffect<FormEffectPayload, FormActions>
  form?: IForm
  onChange?: (values: Value) => void
  onSubmit?: (values: Value) => void | Promise<Value>
  onReset?: () => void
  onValidateFailed?: (valideted: IFormValidateResult) => void
  children?:
    | React.ReactElement
    | React.ReactElement[]
    | ((form: IForm) => React.ReactElement)
  useDirty?: boolean
  editable?: boolean | ((name: string) => boolean)
  validateFirst?: boolean
}

export interface IFieldAPI {
  state: IFieldState
  form: IForm
  props: {}
  mutators: IMutators
}

export interface IVirtualFieldAPI {
  state: IFieldState
  form: IForm
  props: {}
}

export interface IFieldStateUIProps extends IFieldRegistryProps {
  triggerType?: 'onChange' | 'onBlur' | 'none'
  getValueFromEvent?: (...args: any[]) => any
  children?: React.ReactElement | ((api: IFieldAPI) => React.ReactElement)
}

export interface IVirtualFieldStateUIProps extends IVirtualFieldRegistryProps {
  children?:
    | React.ReactElement
    | ((api: IVirtualFieldAPI) => React.ReactElement)
}

export interface IFormSpyAPI {
  form: IForm
  type: string
  state: any
}

export interface IFormSpyProps {
  selector?: string | string[] | string[][]
  reducer?: (
    state: any,
    action: { type: string; payload: any },
    form: IForm
  ) => any
  initialState?: any
  children?: React.ReactElement | ((api: IFormSpyAPI) => React.ReactElement)
}

export interface IFormConsumerAPI {
  status: string
  state: IFormState
  submit: IForm['submit']
  reset: IForm['reset']
}

export interface IFormConsumerProps {
  selector?: string | string[] | string[][]
  children?:
    | React.ReactElement
    | ((api: IFormConsumerAPI) => React.ReactElement)
}

export interface IFieldHook {
  form: IForm
  field: IField
  state: IFieldState
  props: {}
  mutators: IMutators
}

export interface IVirtualFieldHook {
  form: IForm
  field: IVirtualField
  state: IFieldState
  props: {}
}

export interface ISpyHook {
  form: IForm
  state: any
  type: string
}

type OMitActions =
  | 'registerField'
  | 'registerVirtualField'
  | 'unsafe_do_not_use_transform_data_path'

export type IFormActions = Omit<IForm, OMitActions> & {
  dispatch?: (type: string, payload: any) => void
}

type WrapPromise<
  T extends {
    [key: string]: (...args: any) => any
  }
> = {
  [key in keyof T]: (...args: Parameters<T[key]>) => Promise<ReturnType<T[key]>>
}

export type IFormAsyncActions = WrapPromise<IFormActions>

export interface IEffectProviderAPI<TActions = any, TContext = any> {
  waitFor: <TPayload = any>(
    type: string,
    filter: (payload: TPayload) => boolean
  ) => Promise<TPayload>
  triggerTo: <TPayload = any>(type: string, payload: TPayload) => void
  applyMiddlewares: <TPayload = any>(
    type: string,
    payload: TPayload
  ) => Promise<TPayload>
  actions: TActions
  context?: TContext
}

export interface IEffectMiddlewareAPI<TActions = any, TContext = any> {
  waitFor: <TPayload = any>(
    type: string,
    filter: (payload: TPayload) => boolean
  ) => Promise<TPayload>
  actions: TActions
  context?: TContext
}

export interface IEffectProviderHandler<TActions = any, TContext = any> {
  (options: IEffectProviderAPI<TActions, TContext>): (
    $: (type: string) => Observable<any>,
    actions: TActions
  ) => void
}

export interface IEffectMiddleware<TActions = any, TContext = any> {
  (options: IEffectMiddlewareAPI<TActions, TContext>): {
    [key: string]: <TPayload = any>(
      payload: TPayload,
      next: (payload: any) => Promise<any>
    ) => Promise<any>
  }
}
