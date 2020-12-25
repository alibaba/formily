import { isStr, isArr, Subscribable, each } from '@formily/shared'
import { LifeCycle } from './LifeCycle'
import { IHeartProps } from '../types'
export class Heart<Payload = any, Context = any> extends Subscribable {
  private lifecycles: LifeCycle<Payload>[] = []

  private outerLifecycles: {
    [key: string]: LifeCycle<Payload>[]
  } = {}

  private context: Context

  constructor({ lifecycles, context }: IHeartProps<Context> = {}) {
    super()
    this.lifecycles = this.buildLifeCycles(lifecycles || [])
    this.context = context
  }

  buildLifeCycles = (lifecycles: LifeCycle[]) => {
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

  addLifeCycles = (id: string, lifecycles: LifeCycle[] = []) => {
    this.outerLifecycles[id] = this.buildLifeCycles(lifecycles)
  }

  removeLifeCycles = (id: string) => {
    delete this.outerLifecycles[id]
  }

  setLifeCycles = (lifecycles: LifeCycle[] = []) => {
    this.lifecycles = this.buildLifeCycles(lifecycles || [])
  }

  publish = <P, C>(type: any, payload: P, context?: C) => {
    if (isStr(type)) {
      this.lifecycles.forEach((lifecycle) => {
        lifecycle.notify(type, payload, context || this.context)
      })
      each(this.outerLifecycles, (lifecycles) => {
        lifecycles.forEach((lifecycle) => {
          lifecycle.notify(type, payload, context || this.context)
        })
      })
      this.notify({
        type,
        payload,
      })
    }
  }

  clear = () => {
    this.lifecycles = []
    this.unsubscribe()
  }
}
