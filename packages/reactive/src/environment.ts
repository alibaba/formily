import { ObservableListener, Reaction, ReactionsMap } from './types'
import { ArraySet } from './array'
import { DataNode } from './tree'

export const ProxyRaw = new WeakMap()
export const RawProxy = new WeakMap()
export const RawShallowProxy = new WeakMap()
export const RawNode = new WeakMap<object, DataNode>()
export const RawReactionsMap = new WeakMap<object, ReactionsMap>()

export const ReactionStack: Reaction[] = []
export const BatchCount = { value: 0 }
export const UntrackCount = { value: 0 }
export const BatchScope = { value: false }
export const DependencyCollected = { value: false }
export const PendingReactions = new ArraySet<Reaction>()
export const PendingScopeReactions = new ArraySet<Reaction>()
export const BatchEndpoints = new ArraySet<() => void>()
export const ObserverListeners = new ArraySet<ObservableListener>()
export const MakeObModelSymbol = Symbol('MakeObModelSymbol')
export const ObModelSymbol = Symbol('ObModelSymbol')
export const ObModelNodeSymbol = Symbol('ObModelNodeSymbol')
