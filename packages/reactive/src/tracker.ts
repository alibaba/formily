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

    const updateKey = tracker._boundary.get(tracker._updateTarget)
    if (updateKey && updateKey === tracker._updateKey) return

    if (ReactionStack.indexOf(this.track) === -1) {
      releaseBindingReactions(this.track)
      try {
        batchStart()
        ReactionStack.push(this.track)
        this.results = tracker()
      } finally {
        ReactionStack.pop()
        if (tracker._updateKey) {
          tracker._boundary.set(tracker._updateTarget, tracker._updateKey)
        }
        batchEnd()
        this.track._boundary.clear()
      }
    }
    return this.results
  }

  dispose = () => {
    disposeBindingReactions(this.track)
  }
}
