import React from 'react'
import {
  IFieldStateProps,
  IVirtualFieldStateProps,
  IForm,
  IMutators,
  IFieldState,
  IFormValidateResult,
  IFormState
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
