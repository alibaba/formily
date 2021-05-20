import { IRawNode, Reaction, ReactionsMap } from './types'

export const ProxyRaw = new WeakMap()
export const RawProxy = new WeakMap()
export const RawShallowProxy = new WeakMap()
export const RawNode = new WeakMap<object, IRawNode>()
export const RawReactionsMap = new WeakMap<object, ReactionsMap>()

export const ReactionStack: Reaction[] = []
export const BatchCount = { value: 0 }
export const UntrackCount = { value: 0 }
export const BatchScope = { value: false }
export const PendingReactions = new Set<Reaction>()
export const PendingScopeReactions = new Set<Reaction>()
export const MakeObservableSymbol = Symbol('MakeObservableSymbol')
