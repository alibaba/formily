import { isFn, isStr, isObj, each } from '@formily/shared'

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
