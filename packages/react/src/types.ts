import React from 'react'
import {
  IFieldStateProps,
  IVirtualFieldStateProps,
  IForm,
  IMutators,
  IFieldState,
  IFormValidateResult
} from '@uform/core'
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
  children?: React.ReactChildren | ((form: IForm) => React.ReactChildren)
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
  children?: React.ReactChildren | ((api: IFieldApi) => React.ReactChildren)
}

export interface IVirtualFieldProps extends IVirtualFieldStateProps {
  children?:
    | React.ReactChildren
    | ((api: IVirtualFieldApi) => React.ReactChildren)
}

export interface IFormSpyProps {
  selector?: string[] | string
  children?:
    | React.ReactChildren
    | ((api: IForm, type: string) => React.ReactChildren)
}

export interface IFieldHook {
  state: IFieldState
  props: {}
  mutators: IMutators
}
