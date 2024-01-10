import { createBoundaryFunction } from './internals'
import { untrackStart, untrackEnd } from './reaction'

export const untracked = createBoundaryFunction(untrackStart, untrackEnd)
