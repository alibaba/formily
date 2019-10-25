import { isFn, each } from '@uform/shared'
import { Subscriber, Subscription } from '../types'

export class Subscrible<Payload = any> {
  subscribers: Subscriber<Payload>[] = []

  subscription: Subscription<Payload>
  
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
    if (this.subscription) {
      if (this.subscription && isFn(this.subscription.notify)) {
        if (this.subscription.notify.call(this, payload) === false) {
          return
        }
      }
    }
    const filter = (payload: Payload) => {
      if (this.subscription && isFn(this.subscription.filter)) {
        return this.subscription.filter.call(this, payload)
      }
      return payload
    }
    each(this.subscribers, callback => callback(filter(payload)))
  }
}
