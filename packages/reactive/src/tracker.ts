import { ReactionStack } from './environment'
import { isFn } from './checkers'
import { Reaction } from './types'
import {
  batchEnd,
  batchStart,
  disposeBindingReactions,
  releaseBindingReactions,
  untrackEnd,
  untrackStart,
} from './reaction'

export class Tracker {
  private results: any
  constructor(
    scheduler?: (reaction: Reaction) => void,
    name = 'TrackerReaction'
  ) {
    this.track._scheduler = scheduler
    this.track._name = name
  }

  track: Reaction = (tracker: Reaction) => {
    if (!isFn(tracker)) return this.results
    if (ReactionStack.indexOf(this.track) === -1) {
      releaseBindingReactions(this.track)
      try {
        ReactionStack.push(this.track)
        batchStart()
        this.results = tracker()
      } finally {
        batchEnd()
        ReactionStack.pop()
      }
    } else {
      try {
        untrackStart()
        this.results = tracker()
      } finally {
        untrackEnd()
      }
    }
    return this.results
  }

  dispose = () => {
    disposeBindingReactions(this.track)
  }
}
