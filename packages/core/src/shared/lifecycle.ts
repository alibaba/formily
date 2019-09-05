import { isFn, isStr, isArr, isObj, each, FormPath } from '@uform/shared'
import { FormLifeCyclePayload } from '../types'

type FormLifeCycleHooks<T = any> = {
  [key in LifeCycleTypes]: ((
    path: FormPath,
    handler: FormLifeCycleHandler<T>
  ) => FormLifeCycle<T>)
}

type FormLifeCycleHandler<T> = (payload: T, context: any) => void

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

export class FormHeart<Payload = any, Context = any> {
  private lifecycles: FormLifeCycle<Payload>[]

  private context: Context

  constructor({
    lifecycles,
    context
  }: {
    lifecycles?: FormLifeCycle[]
    context?: Context
  }) {
    this.lifecycles = this.buildLifeCycles(lifecycles || [])
    this.context = context
  }

  buildLifeCycles(lifecycles: FormLifeCycle[]) {
    return lifecycles.reduce((buf, item) => {
      if (item instanceof FormLifeCycle) {
        return buf.concat(item)
      } else {
        if (typeof item === 'object') {
          this.context = item
          return buf
        } else if (isArr(item)) {
          return this.buildLifeCycles(item)
        }
        return buf
      }
    }, [])
  }

  notify = <P, C>(type: any, payload: P, context?: C) => {
    if (isStr(type)) {
      this.lifecycles.forEach(lifecycle => {
        lifecycle.notify(type, payload, context || this.context)
      })
    }
  }
}

const createLifeCycleHooks = <Payload = any>(): FormLifeCycleHooks<Payload> => {
  const result: Partial<FormLifeCycleHooks<Payload>> = {}
  Object.values(LifeCycleTypes).map((type: string) => {
    result[type] = function(handler: FormLifeCycleHandler<Payload>) {
      return new FormLifeCycle(type, handler)
    }
  })
  return result as FormLifeCycleHooks<Payload>
}

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
  ON_FORM_VALUES_CHANGE = 'onFormValuesChange',
  ON_FORM_INITIAL_VALUES_CHANGE = 'onFormInitialValueChange',

  /**
   * FormGraph LifeCycle
   **/
  ON_FORM_GRAPH_CHANGE = 'onFormGraphChange',

  /**
   * Field LifeCycle
   **/

  ON_FIELD_WILL_INIT = 'onFieldWillInit',
  ON_FIELD_INIT = 'onFieldInit',
  ON_FIELD_CHANGE = 'onFieldChange', //ChangeType精准控制响应
  ON_FIELD_VALUE_CHANGE = 'onFieldValueChange',
  ON_FIELD_INITIAL_VALUE_CHANGE = 'onFieldInitialValueChange',
  ON_FIELD_MOUNT = 'onFieldMount',
  ON_FIELD_UNMOUNT = 'onFieldUnmount'
}

export const LifeCycleHooks = createLifeCycleHooks()
