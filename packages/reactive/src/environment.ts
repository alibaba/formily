import { INode, KeysReactions, Reaction } from './types'

export const ProxyRaw = new WeakMap()
export const RawProxy = new WeakMap()
export const RawNode = new WeakMap<object, INode>()
export const TargetKeysReactions = new WeakMap<object, KeysReactions>()
export const ReactionKeysReactions = new WeakMap<Reaction, Set<KeysReactions>>()
export const ReactionComputeds = new WeakMap<Reaction, Set<Reaction>>()
export const ReactionStack: Reaction[] = []
export const BatchCount = { value: 0 }
export const UntrackCount = { value: 0 }
export const BatchScope = { value: false }
export const PendingReactions = new Set<Reaction>()
export const PendingScopeReactions = new Set<Reaction>()
export const MakeObservableSymbol = Symbol('MakeObservableSymbol')
