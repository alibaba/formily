import { ObservableListener, Reaction, ReactionsMap } from './types'
import { DataNode } from './datatree'

export const ProxyRaw = new WeakMap()
export const RawProxy = new WeakMap()
export const RawShallowProxy = new WeakMap()
export const RawNode = new WeakMap<object, DataNode>()
export const RawReactionsMap = new WeakMap<object, ReactionsMap>()

export const ReactionStack: Reaction[] = []
export const BatchCount = { value: 0 }
export const UntrackCount = { value: 0 }
export const BatchScope = { value: false }
export const PendingReactions = new Set<Reaction>()
export const PendingScopeReactions = new Set<Reaction>()
export const MakeObservableSymbol = Symbol('MakeObservableSymbol')
export const ObserverListeners = new Set<ObservableListener>()
