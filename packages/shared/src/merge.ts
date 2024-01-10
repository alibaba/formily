import { isFn, isPlainObj } from './checkers'
import { isEmpty, isValid } from './isEmpty'

function defaultIsMergeableObject(value: any) {
  return isNonNullObject(value) && !isSpecial(value)
}

function isNonNullObject(value: any) {
  // TODO: value !== null && typeof value === 'object'
  return Boolean(value) && typeof value === 'object'
}

function isSpecial(value: any) {
  // TODO: use isComplexObject()
  if ('$$typeof' in value && '_owner' in value) {
    return true
  }
  if (value._isAMomentObject) {
    return true
  }
  if (value._isJSONSchemaObject) {
    return true
  }
  if (isFn(value.toJS)) {
    return true
  }
  if (isFn(value.toJSON)) {
    return true
  }
  return !isPlainObj(value)
}

function emptyTarget(val: any) {
  return Array.isArray(val) ? [] : {}
}
// @ts-ignore
function cloneUnlessOtherwiseSpecified(value: any, options: Options) {
  if (options.clone !== false && options.isMergeableObject?.(value)) {
    return deepmerge(emptyTarget(value), value, options)
  }
  return value
}

function defaultArrayMerge(target: any, source: any, options: Options) {
  return target.concat(source).map(function (element: any) {
    return cloneUnlessOtherwiseSpecified(element, options)
  })
}

function getMergeFunction(key: string, options: Options) {
  if (!options.customMerge) {
    return deepmerge
  }
  const customMerge = options.customMerge(key)
  return typeof customMerge === 'function' ? customMerge : deepmerge
}

function getEnumerableOwnPropertySymbols(target: any): any {
  return Object.getOwnPropertySymbols
    ? Object.getOwnPropertySymbols(target).filter(function (symbol) {
        return target.propertyIsEnumerable(symbol)
      })
    : []
}

function getKeys(target: any) {
  if (!isValid(target)) return []
  return Object.keys(target).concat(getEnumerableOwnPropertySymbols(target))
}

function propertyIsOnObject(object: any, property: any) {
  /* istanbul ignore next */
  try {
    return property in object
  } catch (_) {
    return false
  }
}

// Protects from prototype poisoning and unexpected merging up the prototype chain.
function propertyIsUnsafe(target: any, key: PropertyKey) {
  return (
    propertyIsOnObject(target, key) && // Properties are safe to merge if they don't exist in the target yet,
    !(
      Object.hasOwnProperty.call(target, key) && // unsafe if they exist up the prototype chain,
      Object.propertyIsEnumerable.call(target, key)
    )
  ) // and also unsafe if they're nonenumerable.
}

function mergeObject(target: any, source: any, options: Options) {
  const destination = options.assign ? target || {} : {}
  if (!options.isMergeableObject(target)) return target
  if (!options.assign) {
    getKeys(target).forEach(function (key) {
      destination[key] = cloneUnlessOtherwiseSpecified(target[key], options)
    })
  }
  getKeys(source).forEach(function (key) {
    /* istanbul ignore next */
    if (propertyIsUnsafe(target, key)) {
      return
    }
    if (isEmpty(target[key])) {
      destination[key] = source[key]
    } else if (
      propertyIsOnObject(target, key) &&
      // @ts-ignore
      options.isMergeableObject(source[key])
    ) {
      destination[key] = getMergeFunction(key, options)(
        target[key],
        source[key],
        options
      )
    } else {
      destination[key] = cloneUnlessOtherwiseSpecified(source[key], options)
    }
  })
  return destination
}

interface Options {
  arrayMerge?(target: any[], source: any[], options?: Options): any[]
  clone?: boolean
  assign?: boolean
  customMerge?: (
    key: string,
    options?: Options
  ) => ((x: any, y: any) => any) | undefined
  isMergeableObject?(value: object): boolean
  cloneUnlessOtherwiseSpecified?: (value: any, options: Options) => any
}

// @ts-ignore
function deepmerge(target: any, source: any, options?: Options) {
  options = options || {}
  options.arrayMerge = options.arrayMerge || defaultArrayMerge
  options.isMergeableObject =
    options.isMergeableObject || defaultIsMergeableObject
  // cloneUnlessOtherwiseSpecified is added to `options` so that custom arrayMerge()
  // implementations can use it. The caller may not replace it.
  options.cloneUnlessOtherwiseSpecified = cloneUnlessOtherwiseSpecified

  const sourceIsArray = Array.isArray(source)
  const targetIsArray = Array.isArray(target)
  const sourceAndTargetTypesMatch = sourceIsArray === targetIsArray

  if (!sourceAndTargetTypesMatch) {
    return cloneUnlessOtherwiseSpecified(source, options)
  } else if (sourceIsArray) {
    return options.arrayMerge(target, source, options)
  } else {
    return mergeObject(target, source, options)
  }
}

export const lazyMerge = <T extends object | Function>(
  target: T,
  ...args: T[]
): any => {
  const _lazyMerge = <T extends object | Function>(
    target: T,
    source: T
  ): {} => {
    if (!isValid(source)) return target
    if (!isValid(target)) return source
    const isTargetObject = typeof target === 'object'
    const isSourceObject = typeof source === 'object'
    const isTargetFn = typeof target === 'function'
    const isSourceFn = typeof source === 'function'
    if (!isTargetObject && !isTargetFn) return source
    if (!isSourceObject && !isSourceFn) return target
    const getTarget = () => (isTargetFn ? target() : target)
    const getSource = () => (isSourceFn ? source() : source)
    const set = (_: object, key: PropertyKey, value: any) => {
      const source = getSource()
      const target = getTarget()
      if (key in source) {
        // @ts-ignore
        source[key] = value
      } else if (key in target) {
        // @ts-ignore
        target[key] = value
      } else {
        source[key] = value
      }
      return true
    }
    const get = (_: object, key: PropertyKey) => {
      const source = getSource()
      // @ts-ignore
      if (key in source) {
        return source[key]
      }
      // @ts-ignore
      return getTarget()[key]
    }
    const ownKeys = () => {
      const source = getSource()
      const target = getTarget()
      const keys = Object.keys(target)
      for (const key in source) {
        if (!(key in target)) {
          keys.push(key)
        }
      }
      return keys
    }
    const getOwnPropertyDescriptor = (_: object, key: PropertyKey) => ({
      value: get(_, key),
      enumerable: true,
      configurable: true,
    })
    const has = (_: object, key: PropertyKey) => {
      if (key in getSource() || key in getTarget()) return true
      return false
    }
    const getPrototypeOf = () => Object.getPrototypeOf({})
    return new Proxy(Object.create(null), {
      set,
      get,
      ownKeys,
      getPrototypeOf,
      getOwnPropertyDescriptor,
      has,
    }) as any
  }
  return args.reduce<{}>((buf, arg) => _lazyMerge(buf, arg), target)
}

export const merge = deepmerge
