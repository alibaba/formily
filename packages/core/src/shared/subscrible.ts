import { isFn, each } from '@uform/shared'
import { Subscriber } from '../types'

export class Subscrible<Payload = any> {
  subscribers: Subscriber<Payload>[] = []

  subscribe = (callback?: Subscriber<Payload>) => {
    if (
      isFn(callback) &&
      !this.subscribers.some(fn => fn.toString() === callback.toString())
    ) {
      this.subscribers.push(callback)
    }
  }

  unsubscribe = (callback?: Subscriber<Payload>) => {
    if (isFn(callback)) {
      this.subscribers = this.subscribers.filter(fn => {
        return fn.toString() !== callback.toString()
      })
    } else {
      this.subscribers.length = 0
    }
  }

  notify = (payload?: Payload) => {
    each(this.subscribers, callback => callback(payload))
  }
}
