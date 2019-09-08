import React from 'react'
import {
  IFieldStateProps,
  IVFieldStateProps,
  IForm,
  IMutators,
  IFieldState
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
  children?: React.ReactChildren | ((form: IForm) => React.ReactChildren)
  useDirty?: boolean
  validateFirst?: boolean
}

export interface IFieldApi {
  state: IFieldState
  props: {}
  mutators: IMutators
}

export interface IVFieldApi {
  state: IFieldState
  props: {}
}

export interface IFieldProps extends IFieldStateProps {
  triggerType?: 'onChange' | 'onBlur'
  getValueFromEvent?: (...args: any[]) => any
  children?: React.ReactChildren | ((api: IFieldApi) => React.ReactChildren)
}

export interface IVFieldProps extends IVFieldStateProps {
  children?: React.ReactChildren | ((api: IVFieldApi) => React.ReactChildren)
}
