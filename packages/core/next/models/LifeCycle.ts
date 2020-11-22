import { isFn, isStr, isObj, each, FormPathPattern } from '@formily/shared'
import { FunctionComponent } from '../types'
import { Field } from './Field'

export const LIFE_CYCLE_ENV = {
  lifecycles: []
}

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
  ON_FORM_SUBMIT_SUCCESS = 'onFormOnSubmitSuccess',
  ON_FORM_SUBMIT_FAILED = 'onFormOnSubmitFailed',
  ON_FORM_VALUES_CHANGE = 'onFormValuesChange',
  ON_FORM_INITIAL_VALUES_CHANGE = 'onFormInitialValuesChange',
  ON_FORM_VALIDATE_START = 'onFormValidateStart',
  ON_FORM_VALIDATE_END = 'onFormValidateEnd',
  ON_FORM_INPUT_VALUES_CHANGE = 'onFormInputValuesChange',

  /**
   * Field LifeCycle
   **/

  ON_FIELD_INIT = 'onFieldInit',
  ON_FIELD_CHANGE = 'onFieldChange',
  ON_FIELD_INPUT_CHANGE = 'onFieldInputChange',
  ON_FIELD_VALUE_CHANGE = 'onFieldValueChange',
  ON_FIELD_INITIAL_VALUE_CHANGE = 'onFieldInitialValueChange',
  ON_FIELD_VALIDATE_START = 'onFieldValidateStart',
  ON_FIELD_VALIDATE_END = 'onFieldValidateEnd',
  ON_FIELD_RESET = 'onFieldReset',
  ON_FIELD_MOUNT = 'onFieldMount',
  ON_FIELD_UNMOUNT = 'onFieldUnmount'
}

export type LifeCycleHandler<T> = (payload: T, context: any) => void

export type LifeCyclePayload<T> = (
  params: {
    type: string
    payload: T
  },
  context: any
) => void

export class LifeCycle<Payload = any> {
  private listener: LifeCyclePayload<Payload>

  constructor(handler: LifeCycleHandler<Payload>)
  constructor(type: string, handler: LifeCycleHandler<Payload>)
  constructor(handlerMap: { [key: string]: LifeCycleHandler<Payload> })
  constructor(...params: any[]) {
    this.listener = this.buildListener(params)
  }
  buildListener(params: any[]) {
    return function(payload: { type: string; payload: Payload }, ctx: any) {
      for (let index = 0; index < params.length; index++) {
        let item = params[index]
        if (isFn(item)) {
          item.call(this, payload, ctx)
        } else if (isStr(item) && isFn(params[index + 1])) {
          if (item === payload.type) {
            params[index + 1].call(this, payload.payload, ctx)
          }
          index++
        } else if (isObj(item)) {
          each(item, (handler, type) => {
            if (isFn(handler) && isStr(type)) {
              if (type === payload.type) {
                handler.call(this, payload.payload, ctx)
                return false
              }
            }
          })
        }
      }
    }
  }

  notify = <Payload>(type: any, payload: Payload, ctx?: any) => {
    if (isStr(type)) {
      this.listener.call(ctx, { type, payload }, ctx)
    }
  }
}

export const createLifeCycle = <
  F extends (payload: any, ctx: any) => FunctionComponent
>(
  type: string,
  callback: F
) => {
  return (...args: Parameters<ReturnType<F>>) => {
    LIFE_CYCLE_ENV.lifecycles.push(
      new LifeCycle(type, (payload, ctx) => {
        if (isFn(callback)) {
          callback(payload, ctx)(...args)
        }
      })
    )
  }
}
