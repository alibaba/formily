import { isFn, isStr, isObj, each } from '@formily/shared'


export enum LifeCycleTypes {
  /**
   * Form LifeCycle
   **/

  ON_FORM_WILL_INIT = 'onFormWillInit',
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
  ON_FORM_ON_SUBMIT_SUCCESS = 'onFormOnSubmitSuccess',
  ON_FORM_ON_SUBMIT_FAILED = 'onFormOnSubmitFailed',
  ON_FORM_VALUES_CHANGE = 'onFormValuesChange',
  ON_FORM_INITIAL_VALUES_CHANGE = 'onFormInitialValuesChange',
  ON_FORM_VALIDATE_START = 'onFormValidateStart',
  ON_FORM_VALIDATE_END = 'onFormValidateEnd',
  ON_FORM_INPUT_CHANGE = 'onFormInputChange',
  ON_FORM_HOST_RENDER = 'onFormHostRender',
  /**
   * FormGraph LifeCycle
   **/
  ON_FORM_GRAPH_CHANGE = 'onFormGraphChange',

  /**
   * Field LifeCycle
   **/

  ON_FIELD_WILL_INIT = 'onFieldWillInit',
  ON_FIELD_INIT = 'onFieldInit',
  ON_FIELD_CHANGE = 'onFieldChange',
  ON_FIELD_INPUT_CHANGE = 'onFieldInputChange',
  ON_FIELD_VALUE_CHANGE = 'onFieldValueChange',
  ON_FIELD_INITIAL_VALUE_CHANGE = 'onFieldInitialValueChange',
  ON_FIELD_VALIDATE_START = 'onFieldValidateStart',
  ON_FIELD_VALIDATE_END = 'onFieldValidateEnd',
  ON_FIELD_MOUNT = 'onFieldMount',
  ON_FIELD_UNMOUNT = 'onFieldUnmount'
}

export type FormLifeCycleHandler<T> = (payload: T, context: any) => void

export type FormLifeCyclePayload<T> = (
  params: {
    type: string
    payload: T
  },
  context: any
) => void

export class FormLifeCycle<Payload = any> {
  private listener: FormLifeCyclePayload<Payload>

  constructor(handler: FormLifeCycleHandler<Payload>)
  constructor(type: string, handler: FormLifeCycleHandler<Payload>)
  constructor(handlerMap: { [key: string]: FormLifeCycleHandler<Payload> })
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
