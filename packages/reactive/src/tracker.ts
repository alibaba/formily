import { ReactionStack } from './environment'
import { isFn } from './checkers'
import { Reaction } from './types'
import {
  batchEnd,
  batchStart,
  disposeBindingReactions,
  releaseBindingReactions,
} from './reaction'

export class Tracker {
  private results: any
  constructor(
    scheduler?: (reaction: Reaction) => void,
    name = 'TrackerReaction'
  ) {
    this.track._scheduler = (callback) => {
      if (this.track._boundary.size === 0) this.dispose()
      if (isFn(callback)) scheduler(callback)
    }
    this.track._name = name
    this.track._boundary = new Map()
  }

  track: Reaction = (tracker: Reaction) => {
    if (!isFn(tracker)) return this.results

    const updateKey = this.track._boundary.get(this.track._updateTarget)
    if (updateKey && updateKey.has(this.track._updateKey)) return

    if (ReactionStack.indexOf(this.track) === -1) {
      releaseBindingReactions(this.track)
      try {
        batchStart()
        ReactionStack.push(this.track)
        this.results = tracker()
      } finally {
        ReactionStack.pop()

        const key = this.track._updateKey
        const target = this.track._updateTarget
        if (key) {
          const keys = this.track._boundary.get(target) || new Set([])
          keys.add(key)
          this.track._boundary.set(target, keys)
        }

        batchEnd()

        const keys = this.track._boundary.get(target)
        if (keys) {
          keys.delete(key)
        }
      }
    }
    return this.results
  }

  dispose = () => {
    disposeBindingReactions(this.track)
  }
}
