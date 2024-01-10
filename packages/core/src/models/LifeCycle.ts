import { isFn, isStr, each } from '@formily/shared'
import { LifeCycleHandler, LifeCyclePayload } from '../types'

type LifeCycleParams<Payload> = Array<
  | string
  | LifeCycleHandler<Payload>
  | { [key: string]: LifeCycleHandler<Payload> }
>
export class LifeCycle<Payload = any> {
  private listener: LifeCyclePayload<Payload>

  constructor(...params: LifeCycleParams<Payload>) {
    this.listener = this.buildListener(params)
  }
  buildListener = (params: any[]) => {
    return function (payload: { type: string; payload: Payload }, ctx: any) {
      for (let index = 0; index < params.length; index++) {
        let item = params[index]
        if (isFn(item)) {
          item.call(this, payload, ctx)
        } else if (isStr(item) && isFn(params[index + 1])) {
          if (item === payload.type) {
            params[index + 1].call(this, payload.payload, ctx)
          }
          index++
        } else {
          each<any, any>(item, (handler, type) => {
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

  notify = <Payload>(type: any, payload?: Payload, ctx?: any) => {
    if (isStr(type)) {
      this.listener.call(ctx, { type, payload }, ctx)
    }
  }
}
