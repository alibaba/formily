import { each } from './array'
import { isFn } from '@uform/types'

type Subscriber<N> = (notification: N) => void

type Filter<P, S> = (payload: P, subscription: S) => any

export class Broadcast<P, S, N> {
  private entries = []
  private buffer = []
  private length: number

  subscribe(subscriber: Subscriber<N>, subscription: any) {
    if (!isFn(subscriber)) return () => { }
    let index = this.entries.length
    this.entries.push({
      subscriber,
      subscription
    })
    this.flushBuffer(this.entries[index])
    return () => {
      this.entries.splice(index, 1)
    }
  }

  unsubscribe() {
    this.entries.length = 0
    this.buffer.length = 0
  }

  flushBuffer({ subscriber, subscription }) {
    each(this.buffer, ({ payload, filter }) => {
      if (isFn(filter)) {
        let notification: N
        if ((notification = filter(payload, subscription))) {
          subscriber(notification)
        }
      } else {
        subscriber(payload, subscription)
      }
    })
  }

  notify(payload: P, filter: Filter<P, S>) {
    if (this.length === 0) {
      this.buffer.push({ payload, filter })
      return
    }
    each(this.entries, ({ subscriber, subscription }) => {
      if (isFn(filter)) {
        let notification: N
        if ((notification = filter(payload, subscription))) {
          subscriber(notification)
        }
      } else {
        subscriber(payload, subscription)
      }
    })
    this.buffer.length = 0
  }
}
