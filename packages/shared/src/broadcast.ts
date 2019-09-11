import { each } from './array'
import { isFn } from './types'

type Subscriber<N> = (notification: N) => void

type Filter<P, S> = (payload: P, subscription: S) => any

const noop = () => undefined

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface IBroadcast extends Broadcast<any, any, any> {}

export class Broadcast<Payload = any, Subscription = {}, Notification = {}> {
  private entries = []
  private buffer = []
  private length: number
  private context: any

  public subscribe(subscriber: Subscriber<Notification>, subscription?: any) {
    if (!isFn(subscriber)) {
      return noop
    }
    const index = this.entries.length
    this.entries.push({
      subscriber,
      subscription
    })
    this.flushBuffer(this.entries[index])
    return () => {
      this.entries.splice(index, 1)
    }
  }

  public setContext(context?: any) {
    this.context = context
  }

  public getContext() {
    return this.context
  }

  public unsubscribe(subscriber?: Subscriber<Notification>) {
    if (subscriber) {
      this.entries = this.entries.filter(suber => {
        return suber.subscriber !== subscriber
      })
    } else {
      this.entries.length = 0
      this.buffer.length = 0
    }
  }

  public flushBuffer({ subscriber, subscription }) {
    each(this.buffer, ({ payload, filter }) => {
      if (isFn(filter)) {
        const notification = filter(payload, subscription)
        if (notification !== undefined) {
          subscriber.call(this.context, notification)
        }
      } else {
        subscriber.call(this.context, payload, subscription)
      }
    })
  }

  public notify(payload: Payload, filter?: Filter<Payload, Subscription>) {
    if (this.length === 0) {
      this.buffer.push({ payload, filter })
      return
    }
    each(this.entries, ({ subscriber, subscription }) => {
      if (isFn(filter)) {
        const notification = filter(payload, subscription)
        if (notification !== undefined) {
          subscriber.call(this.context, notification)
        }
      } else {
        subscriber.call(this.context, payload, subscription)
      }
    })
    this.buffer.length = 0
  }
}
