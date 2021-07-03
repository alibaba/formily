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
    this.track._scheduler = scheduler
    this.track._name = name
    this.track._boundary = 0
  }

  track: Reaction = (tracker: Reaction) => {
    if (!isFn(tracker)) return this.results
    if (this.track._boundary > 0) return
    if (ReactionStack.indexOf(this.track) === -1) {
      releaseBindingReactions(this.track)
      try {
        batchStart()
        ReactionStack.push(this.track)
        this.results = tracker()
      } finally {
        ReactionStack.pop()
        this.track._boundary++
        batchEnd()
        this.track._boundary = 0
      }
    }
    return this.results
  }

  dispose = () => {
    disposeBindingReactions(this.track)
  }
}
