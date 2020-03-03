import React from 'react'
import {
  IFieldStateProps,
  IVirtualFieldStateProps,
  IForm,
  IMutators,
  IFieldState,
  IFormValidateResult,
  IFormState,
  IFormResetOptions,
  IFormSubmitResult,
  FormHeartSubscriber,
  IFormGraph,
  IField,
  IVirtualFieldState,
  IVirtualField
} from '@formily/core'
import { FormPathPattern } from '@formily/shared'
import { Observable } from 'rxjs/internal/Observable'
export * from '@formily/core'

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

export interface IFieldStateUIProps extends IFieldStateProps {
  triggerType?: 'onChange' | 'onBlur'
  getValueFromEvent?: (...args: any[]) => any
  children?: React.ReactElement | ((api: IFieldAPI) => React.ReactElement)
}

export interface IVirtualFieldProps extends IVirtualFieldStateProps {
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
  selector?: string[] | string
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
  selector?: string[] | string
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

export interface IFormActions {
  submit(
    onSubmit?: (values: IFormState['values']) => void | Promise<any>
  ): Promise<IFormSubmitResult>
  reset(options?: IFormResetOptions): void
  hasChanged(target: any, path: FormPathPattern): boolean
  validate(path?: FormPathPattern, options?: {}): Promise<IFormValidateResult>
  setFormState(callback?: (state: IFormState) => any): void
  getFormState(callback?: (state: IFormState) => any): any
  clearErrors: (pattern?: FormPathPattern) => void
  setFieldState(
    path: FormPathPattern,
    callback?: (state: IFieldState) => void
  ): void
  getFieldState(
    path: FormPathPattern,
    callback?: (state: IFieldState) => any
  ): any
  getFormGraph(): IFormGraph
  setFormGraph(graph: IFormGraph): void
  subscribe(callback?: FormHeartSubscriber): number
  unsubscribe(id: number): void
  isHostRendering: () => boolean
  batchUpdate: (callback?: () => void) => void
  notify: <T>(type: string, payload?: T) => void
  dispatch: <T>(type: string, payload?: T) => void
  setFieldValue(path?: FormPathPattern, value?: any): void
  getFieldValue(path?: FormPathPattern): any
  setFieldInitialValue(path?: FormPathPattern, value?: any): void
  getFieldInitialValue(path?: FormPathPattern): any
}

export interface IFormAsyncActions {
  submit(
    onSubmit?: (values: IFormState['values']) => void | Promise<any>
  ): Promise<IFormSubmitResult>
  reset(options?: IFormResetOptions): Promise<void>
  hasChanged(target: any, path: FormPathPattern): Promise<boolean>
  clearErrors: (pattern?: FormPathPattern) => Promise<void>
  validate(path?: FormPathPattern, options?: {}): Promise<IFormValidateResult>
  setFormState(callback?: (state: IFormState) => any): Promise<void>
  getFormState(callback?: (state: IFormState) => any): Promise<any>
  setFieldState(
    path: FormPathPattern,
    callback?: (state: IFieldState) => void
  ): Promise<void>
  getFieldState(
    path: FormPathPattern,
    callback?: (state: IFieldState) => any
  ): Promise<any>
  getFormGraph(): Promise<IFormGraph>
  setFormGraph(graph: IFormGraph): Promise<void>
  subscribe(callback?: FormHeartSubscriber): Promise<number>
  unsubscribe(id: number): Promise<void>
  notify: <T>(type: string, payload: T) => Promise<void>
  isHostRendering: () => boolean
  batchUpdate: (callback?: () => void) => void
  dispatch: <T>(type: string, payload: T) => void
  setFieldValue(path?: FormPathPattern, value?: any): Promise<void>
  getFieldValue(path?: FormPathPattern): Promise<any>
  setFieldInitialValue(path?: FormPathPattern, value?: any): Promise<void>
  getFieldInitialValue(path?: FormPathPattern): Promise<any>
}

export interface IEffectProviderAPI<TActions = any, TContext = any> {
  waitFor: <TPayload = any>(
    type: string,
    filter: (payload: TPayload) => boolean
  ) => Promise<TPayload>
  triggerTo: <TPayload = any>(
    type: string,
    payload: TPayload
  ) => Promise<TPayload>
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
