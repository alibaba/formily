import { isFn, isStr, isArr, isObj, each, Subscribable } from '@uform/shared'
import { FormLifeCyclePayload, FormLifeCycleHandler } from '../types'

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

export class FormHeart<Payload = any, Context = any> extends Subscribable {
  private lifecycles: FormLifeCycle<Payload>[]

  private context: Context

  constructor({
    lifecycles,
    context
  }: {
    lifecycles?: FormLifeCycle[]
    context?: Context
  }) {
    super()
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

  publish = <P, C>(type: any, payload: P, context?: C) => {
    if (isStr(type)) {
      this.lifecycles.forEach(lifecycle => {
        lifecycle.notify(type, payload, context || this.context)
      })
      this.notify({
        type,
        payload
      })
    }
  }
}
