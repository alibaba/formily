import {
  batchStart,
  batchEnd,
  batchScopeStart,
  batchScopeEnd,
} from './reaction'
import { BatchEndpoints, BatchCount } from './environment'
import { createBoundaryAnnotation } from './internals'
import { IBatch } from './types'
import { isFn } from './checkers'

export const batch: IBatch = createBoundaryAnnotation(batchStart, batchEnd)
batch.scope = createBoundaryAnnotation(batchScopeStart, batchScopeEnd)
batch.endpoint = (callback?: () => void) => {
  if (!isFn(callback)) return
  if (BatchCount.value === 0) {
    callback()
  } else {
    BatchEndpoints.add(callback)
  }
}
