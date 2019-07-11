import { isFn } from '@uform/types'
import { each } from './array'

type Subscriber<N> = (notification: N) => void

type Filter<P, S> = (payload: P, subscription: S) => any

const noop = () => undefined

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface IBroadcast extends Broadcast<any, any, any> {}

export class Broadcast<P, S, N> {
  private entries = []
  private buffer = []
  private length: number

  public subscribe(subscriber: Subscriber<N>, subscription?: any) {
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

  public unsubscribe() {
    this.entries.length = 0
    this.buffer.length = 0
  }

  public flushBuffer({ subscriber, subscription }) {
    each(this.buffer, ({ payload, filter }) => {
      if (isFn(filter)) {
        const notification = filter(payload, subscription)
        if (notification !== undefined) {
          subscriber(notification)
        }
      } else {
        subscriber(payload, subscription)
      }
    })
  }

  public notify(payload: P, filter?: Filter<P, S>) {
    if (this.length === 0) {
      this.buffer.push({ payload, filter })
      return
    }
    each(this.entries, ({ subscriber, subscription }) => {
      if (isFn(filter)) {
        const notification = filter(payload, subscription)
        if (notification !== undefined) {
          subscriber(notification)
        }
      } else {
        subscriber(payload, subscription)
      }
    })
    this.buffer.length = 0
  }
}
