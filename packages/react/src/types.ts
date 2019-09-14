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
  IFormGraph
} from '@uform/core'
import { FormPathPattern } from '@uform/shared'
import { Observable } from 'rxjs/internal/Observable'
export interface IFormEffect<T = any> {
  (selector: IFormEffectSelector<T>): void
}

export interface IFormEffectSelector<T = any> {
  (type: string, matcher?: string | ((payload: T) => boolean)): Observable<any>
}

export interface IFormProps {
  value?: {}
  initialValues?: {}
  actions?: {}
  effects?: IFormEffect
  onChange?: (values: any) => void
  onSubmit?: (values: any) => void | Promise<any>
  onReset?: () => void
  onValidateFailed?: (valideted: IFormValidateResult) => void
  children?: React.ReactElement | ((form: IForm) => React.ReactElement)
  useDirty?: boolean
  editable?: boolean
  validateFirst?: boolean
}

export interface IFieldApi {
  state: IFieldState
  props: {}
  mutators: IMutators
}

export interface IVirtualFieldApi {
  state: IFieldState
  props: {}
}

export interface IFieldProps extends IFieldStateProps {
  triggerType?: 'onChange' | 'onBlur'
  getValueFromEvent?: (...args: any[]) => any
  children?: React.ReactElement | ((api: IFieldApi) => React.ReactElement)
}

export interface IVirtualFieldProps extends IVirtualFieldStateProps {
  children?:
    | React.ReactElement
    | ((api: IVirtualFieldApi) => React.ReactElement)
}

export interface IFormSpyProps {
  selector?: string[] | string
  children?:
    | React.ReactElement
    | ((api: IForm, type: string) => React.ReactElement)
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
  state: IFieldState
  props: {}
  mutators: IMutators
}

export interface IFormActions {
  submit(
    onSubmit: (values: IFormState['values']) => void | Promise<any>
  ): Promise<IFormSubmitResult>
  reset(options?: IFormResetOptions): void
  validate(path?: FormPathPattern, options?: {}): Promise<IFormValidateResult>
  setFormState(callback?: (state: IFormState) => any): void
  getFormState(callback?: (state: IFormState) => any): any
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
  subscribe(callback?: FormHeartSubscriber): void
  unsubscribe(callback?: FormHeartSubscriber): void
  notify: <T>(type: string, payload: T) => void
  setFieldValue(path?: FormPathPattern, value?: any): void
  getFieldValue(path?: FormPathPattern): any
  setFieldInitialValue(path?: FormPathPattern, value?: any): void
  getFieldInitialValue(path?: FormPathPattern): any
}

export interface IFormAsyncActions {
  submit(
    onSubmit: (values: IFormState['values']) => void | Promise<any>
  ): Promise<IFormSubmitResult>
  reset(options?: IFormResetOptions): Promise<void>
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
  subscribe(callback?: FormHeartSubscriber): Promise<void>
  unsubscribe(callback?: FormHeartSubscriber): Promise<void>
  notify: <T>(type: string, payload: T) => Promise<void>
  setFieldValue(path?: FormPathPattern, value?: any): Promise<void>
  getFieldValue(path?: FormPathPattern): Promise<any>
  setFieldInitialValue(path?: FormPathPattern, value?: any): Promise<void>
  getFieldInitialValue(path?: FormPathPattern): Promise<any>
}
