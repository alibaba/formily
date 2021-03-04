import { INode, KeysReactions, Reaction } from './types'

export const ProxyRaw = new WeakMap()
export const RawProxy = new WeakMap()
export const RawNode = new WeakMap<object, INode>()
export const TargetKeysReactions = new WeakMap<object, KeysReactions>()
export const ReactionKeysReactions = new WeakMap<Reaction, Set<KeysReactions>>()
export const ComputedReactions = new WeakMap<Reaction, boolean>()
export const ReactionStack: Reaction[] = []
export const BatchCount = { value: 0 }
export const Untracking = { value: false }
export const PendingReactions = new Set<Reaction>()
export const MakeObservableSymbol = Symbol('MakeObservableSymbol')
