import { isFn, Subscriber, Subscription } from './types'
import { each } from './array'

export class Subscribable<Payload = any> {
  subscribers: {
    index?: number
    [key: number]: Subscriber<Payload>
  } = {
    index: 0
  }

  subscription: Subscription<Payload>

  subscribe = (callback?: Subscriber<Payload>): number => {
    if (isFn(callback)) {
      const index: number = this.subscribers.index + 1
      this.subscribers[index] = callback
      this.subscribers.index++
      return index
    }
  }

  unsubscribe = (index: number) => {
    if (this.subscribers[index]) {
      delete this.subscribers[index]
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
    each(this.subscribers, (callback: any) => {
      if (isFn(callback)) callback(filter(payload))
    })
  }
}
