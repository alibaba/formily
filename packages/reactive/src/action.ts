import {
  batchStart,
  batchEnd,
  batchScopeStart,
  batchScopeEnd,
  untrackStart,
  untrackEnd,
} from './reaction'
import { createBoundaryAnnotation } from './internals'
import { IAction } from './types'

export const action: IAction = createBoundaryAnnotation(
  () => {
    batchStart()
    untrackStart()
  },
  () => {
    untrackEnd()
    batchEnd()
  }
)

action.scope = createBoundaryAnnotation(
  () => {
    batchScopeStart()
    untrackStart()
  },
  () => {
    untrackEnd()
    batchScopeEnd()
  }
)
