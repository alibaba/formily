import { isStr, isArr, Subscribable } from '@formily/shared'
import { LifeCycle } from './LifeCycle'

export type HeartSubscriber = ({
  type,
  payload
}: {
  type: string
  payload: any
}) => void

export interface IHeartProps<Context> {
  lifecycles?: LifeCycle[]
  context?: Context
}

export class Heart<Payload = any, Context = any> extends Subscribable {
  private lifecycles: LifeCycle<Payload>[]

  private context: Context

  constructor({ lifecycles, context }: IHeartProps<Context> = {}) {
    super()
    this.lifecycles = this.buildLifeCycles(lifecycles || [])
    this.context = context
  }

  buildLifeCycles(lifecycles: LifeCycle[]) {
    return lifecycles.reduce((buf, item) => {
      if (item instanceof LifeCycle) {
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
