import { ReactionStack } from './environment'
import { Reaction } from './types'
import {
  batchEnd,
  batchStart,
  disposeBindingReactions,
  releaseBindingReactions,
} from './reaction'
import { isFn } from '@formily/shared'

export class Tracker {
  private results: any
  constructor(
    scheduler?: (reaction: Reaction) => void,
    name = 'TrackerReaction'
  ) {
    this.track._scheduler = scheduler
    this.track._name = name
  }

  track: Reaction = (runner: Reaction) => {
    if (ReactionStack.indexOf(this.track) === -1) {
      releaseBindingReactions(this.track)
      try {
        ReactionStack.push(this.track)
        batchStart()
        if (isFn(runner)) {
          this.results = runner()
        }
      } finally {
        batchEnd()
        ReactionStack.pop()
      }
    }
    return this.results
  }

  dispose = () => {
    disposeBindingReactions(this.track)
  }
}
