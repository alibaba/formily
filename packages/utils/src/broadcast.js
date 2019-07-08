import { each } from './array'
import { isFn } from './types'

export class Broadcast {
  entries = []
  buffer = []

  subscribe(subscriber, subscription) {
    if (!isFn(subscriber)) return () => {}
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
        let notification
        if ((notification = filter(payload, subscription))) {
          subscriber(notification)
        }
      } else {
        subscriber(payload, subscription)
      }
    })
  }

  notify(payload, filter) {
    if (this.length === 0) {
      this.buffer.push({ payload, filter })
      return
    }
    each(this.entries, ({ subscriber, subscription }) => {
      if (isFn(filter)) {
        let notification
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
