import { isFn, isStr, isArr, isObj, each, FormPath } from '@uform/shared'
import { FormLifeCyclePayload } from '../types'

type FormLifeCycleTypes<T = any> = {
  [key in string]: (
    | string
    | ((path: FormPath, handler: FormLifeCycleHandler<T>) => FormLifeCycle<T>))
}

type FormLifeCycleHandler<T> = (payload: T, context: any) => void

export class FormLifeCycle<Payload = any> {
  private listener: FormLifeCyclePayload<Payload>

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

export class FormHeart<Payload = any> {
  private lifecycles: FormLifeCycle<Payload>[]

  private context: any

  constructor({
    lifecycles,
    context
  }: {
    lifecycles?: FormLifeCycle[]
    context?: any
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

  notify = <Payload>(type: any, payload: Payload, context?: any) => {
    if (isStr(type)) {
      this.lifecycles.forEach(lifecycle => {
        lifecycle.notify(type, payload, context || this.context)
      })
    }
  }
}

export const createLifeCycleHandlers = <T>(types: FormLifeCycleTypes<T>) => {
  Object.keys(types).forEach(key => {
    if (!isFn(types[types[key] as string])) {
      types[types[key] as string] = function(path, handler) {
        if (isFn(path)) {
          handler = path
          path = '*'
        }
        path = FormPath.getPath(path)
        return new FormLifeCycle(types[key], handler)
      }
    }
  })
  return types
}

export const LifeCycleTypes = createLifeCycleHandlers({
  /**
   * Form LifeCycle
   **/

  ON_FORM_WILL_INIT: 'onFormWillInit',
  ON_FORM_INIT: 'onFormInit',
  ON_FORM_CHANGE: 'onFormChange', //ChangeType精准控制响应
  ON_FORM_MOUNT: 'onFormMount',
  ON_FORM_UNMOUNT: 'onFormUnmount',
  ON_FORM_SUBMIT: 'onFormSubmit',
  ON_FORM_RESET: 'onFormReset',

  /**
   * Field LifeCycle
   **/

  ON_FIELD_WILL_INIT: 'onFieldWillInit',
  ON_FIELD_INIT: 'onFieldInit',
  ON_FIELD_CHANGE: 'onFieldChange', //ChangeType精准控制响应
  ON_FIELD_VALUE_CHANGE: 'onFieldValueChange',
  ON_FIELD_INITIAL_VALUE_CHANGE: 'onFieldInitialValueChange',
  ON_FIELD_MOUNT: 'onFieldMount',
  ON_FIELD_UNMOUNT: 'onFieldUnmount'
})
