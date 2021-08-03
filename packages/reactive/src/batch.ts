import {
  batchStart,
  batchEnd,
  batchScopeStart,
  batchScopeEnd,
} from './reaction'
import { createBoundaryAnnotation } from './internals'
import { IAction } from './types'

export const batch: IAction = createBoundaryAnnotation(batchStart, batchEnd)
batch.scope = createBoundaryAnnotation(batchScopeStart, batchScopeEnd)
