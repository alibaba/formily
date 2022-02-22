import { isValid, isEmpty } from './isEmpty'
import { isFn, isPlainObj } from './checkers'

function defaultIsMergeableObject(value: any) {
  return isNonNullObject(value) && !isSpecial(value)
}

function isNonNullObject(value: any) {
  return !!value && typeof value === 'object'
}

function isSpecial(value: any) {
  if ('$$typeof' in value && '_owner' in value) {
    return true
  }
  if (value['_isAMomentObject']) {
    return true
  }
  if (value['_isJSONSchemaObject']) {
    return true
  }
  if (isFn(value['toJS'])) {
    return true
  }
  if (isFn(value['toJSON'])) {
    return true
  }
  return !isPlainObj(value)
}

function emptyTarget(val: any) {
  return Array.isArray(val) ? [] : {}
}

function cloneUnlessOtherwiseSpecified(value: any, options: Options) {
  if (options.clone !== false && options.isMergeableObject(value)) {
    return deepmerge(emptyTarget(value), value, options)
  }
  return value
}

function defaultArrayMerge(target: any, source: any, options: Options) {
  return target.concat(source).map(function (element) {
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
function propertyIsUnsafe(target, key) {
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

export const merge = deepmerge
