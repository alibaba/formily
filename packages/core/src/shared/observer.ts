import {
  observe,
  isObservableMap,
  isObservableObject,
  isObservableArray,
  values,
  entries,
  reaction,
} from 'mobx'
import { IMobxChange, IMobxDisposer, IMobxEntry } from '../types'

function buildPath(entry: IMobxEntry | undefined, name: string) {
  /* istanbul ignore next */
  if (!entry) return name ? [].concat(name) : []
  const res: string[] = []
  while (entry.parent) {
    res.push(entry.path)
    entry = entry.parent
  }
  const path = res.reverse()
  return name ? path.concat(name) : path
}

function isRecursivelyObservable(thing: any) {
  return (
    isObservableObject(thing) ||
    isObservableArray(thing) ||
    isObservableMap(thing)
  )
}

/**
 * Given an object, deeply observes the given object.
 * It is like `observe` from mobx, but applied recursively, including all future children.
 *
 * Note that the given object cannot ever contain cycles and should be a tree.
 *
 * As benefit: path and root will be provided in the callback, so the signature of the listener is
 * (change, path, root) => void
 *
 * The returned disposer can be invoked to clean up the listener
 *
 * deepObserve cannot be used on computed values.
 *
 * @example
 * const disposer = deepObserve(target, (change, path) => {
 *    console.dir(change)
 * })
 */
export function observer<T = any>(
  getTarget: () => T,
  listener: (change: IMobxChange, path: string[], root: T) => void
): IMobxDisposer {
  const entrySet = new WeakMap<any, IMobxEntry>()

  const genericListener = (path: string) => (change: IMobxChange) => {
    const entry = entrySet.get(change.object)!
    processChange(change, entry)
    listener(change, buildPath(entry, path || change['name']), getTarget())
  }

  function processChange(change: IMobxChange, parent: IMobxEntry) {
    switch (change.type) {
      // Object changes
      case 'add': // also for map
        observeRecursively(change.newValue, parent, change.name)
        break
      case 'update': // also for array and map
        unobserveRecursively(change.oldValue)
        observeRecursively(
          change.newValue,
          parent,
          (change as any).name || '' + (change as any).index
        )
        break
      case 'remove': // object
      case 'delete': // map
        unobserveRecursively(change.oldValue)
        break
      // Array changes
      case 'splice':
        change.removed.map(unobserveRecursively)
        change.added.forEach((value, idx) =>
          observeRecursively(value, parent, '' + (change.index + idx))
        )
        // update paths
        for (
          let i = change.index + change.addedCount;
          i < change.object.length;
          i++
        ) {
          if (isRecursivelyObservable(change.object[i])) {
            const entry = entrySet.get(change.object[i])
            /* istanbul ignore next */
            if (entry) entry.path = '' + i
          }
        }
        break
    }
  }

  function observeRecursively(
    thing: any,
    parent: IMobxEntry | undefined,
    path: string
  ) {
    if (isRecursivelyObservable(thing)) {
      /* istanbul ignore next */
      const entry = entrySet.get(thing)
      /* istanbul ignore next */
      if (entry) {
        /* istanbul ignore next */
        if (entry.parent !== parent || entry.path !== path)
          // MWE: this constraint is artificial, and this tool could be made to work with cycles,
          // but it increases administration complexity, has tricky edge cases and the meaning of 'path'
          // would become less clear. So doesn't seem to be needed for now
          /* istanbul ignore next */
          throw new Error(
            `The same observable object cannot appear twice in the same tree,` +
              ` trying to assign it to '${buildPath(parent, path).join(
                '.'
              )}',` +
              ` but it already exists at '${buildPath(entry.parent, path).join(
                '.'
              )}'`
          )
      } else {
        const entry = {
          parent,
          path,
          dispose: observe(thing, genericListener(path)),
        }
        entrySet.set(thing, entry)
        entries(thing).forEach(([key, value]) =>
          observeRecursively(value, entry, key)
        )
      }
    }
  }

  function unobserveRecursively(thing: any) {
    /* istanbul ignore next */
    if (isRecursivelyObservable(thing)) {
      const entry = entrySet.get(thing)
      if (!entry) return
      entrySet.delete(thing)
      entry.dispose()
      values(thing).forEach(unobserveRecursively)
    }
  }

  observeRecursively(getTarget(), undefined, '')

  const dispose = reaction(
    () => {
      return getTarget()
    },
    (value, oldValue) => {
      unobserveRecursively(oldValue)
      observeRecursively(value, undefined, '')
      listener(
        {
          type: 'update',
          name: '',
          newValue: value,
          oldValue,
        } as any,
        [],
        value
      )
    }
  )
  /* istanbul ignore next */
  return () => {
    dispose()
    unobserveRecursively(getTarget())
  }
}
