import { Reaction } from './types'

/**
 * work like arrayset but delete outdated reaction by _reactionId
 */
export class ReactionsArraySet<T extends Reaction> {
  valueSet: Set<T>
  reactionIdMap: Map<T, number>
  forEachIndex = 0
  constructor(value: T[] = []) {
    this.valueSet = new Set()
    this.reactionIdMap = new Map()
    value.forEach((item) => {
      this.add(item)
    })
  }

  add(item: T) {
    if (!this.has(item)) {
      this.valueSet.add(item)
      this.reactionIdMap.set(item, item._reactionId || 0)
    } else {
      this.reactionIdMap.set(item, item._reactionId || 0)
    }
  }

  has(item: T) {
    return this.valueSet.has(item)
  }

  update(item: T) {
    if (this.valueSet.has(item)) {
      this.reactionIdMap.set(item, item._reactionId || 0)
    }
  }

  delete(item: T) {
    const size = this.valueSet.size
    if (size === 0) return
    this.valueSet.delete(item)
    this.reactionIdMap.delete(item)
  }

  forEach(callback: (value: T) => void) {
    if (this.valueSet.size === 0) return
    for (const item of this.valueSet) {
      const reactionId = this.reactionIdMap.get(item)
      if (reactionId === item._reactionId) {
        callback(item)
      } else {
        this.delete(item)
      }
    }
  }

  batchDelete(callback: (value: T) => void) {
    if (this.valueSet.size === 0) return

    const list = []

    for (const item of this.valueSet) {
      const reactionId = this.reactionIdMap.get(item)
      if (reactionId === item._reactionId) {
        list.push(item)
      }
    }

    this.clear()

    for (let i = 0; i < list.length; i++) {
      callback(list[i])
    }

    if (this.valueSet.size > 0) {
      this.batchDelete(callback)
    }
  }

  clear() {
    this.valueSet.clear()
    this.reactionIdMap.clear()
  }
}
