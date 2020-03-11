import { BigData } from './big-data'

function defaultIsMergeableObject(value: any) {
  return isNonNullObject(value) && !isSpecial(value)
}

function isNonNullObject(value: any) {
  return !!value && typeof value === 'object'
}

function isSpecial(value: any) {
  const stringValue = Object.prototype.toString.call(value)

  return (
    stringValue === '[object RegExp]' ||
    stringValue === '[object Date]' ||
    isReactElement(value)
  )
}

// see https://github.com/facebook/react/blob/b5ac963fb791d1298e7f396236383bc955f916c1/src/isomorphic/classic/element/ReactElement.js#L21-L25
const canUseSymbol = typeof Symbol === 'function' && Symbol.for
const REACT_ELEMENT_TYPE = canUseSymbol ? Symbol.for('react.element') : 0xeac7

function isReactElement(value) {
  return value.$$typeof === REACT_ELEMENT_TYPE
}

function emptyTarget(val: any) {
  return Array.isArray(val) ? [] : {}
}

function cloneUnlessOtherwiseSpecified(value: any, options: Options) {
  if (options.clone !== false && options.isMergeableObject(value)) {
    if (BigData.isBigData(value)) {
      return BigData.clone(value)
    } else {
      return deepmerge(emptyTarget(value), value, options)
    }
  }
  return value
}

function defaultArrayMerge(target: any, source: any, options: Options) {
  return target.concat(source).map(function(element) {
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
    ? Object.getOwnPropertySymbols(target).filter(function(symbol) {
        return target.propertyIsEnumerable(symbol)
      })
    : []
}

function getKeys(target: any) {
  return Object.keys(target).concat(getEnumerableOwnPropertySymbols(target))
}

function propertyIsOnObject(object: any, property: any) {
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
  const destination = options.assign ? target : {}

  if (!options.assign && options.isMergeableObject(target)) {
    getKeys(target).forEach(function(key) {
      destination[key] = cloneUnlessOtherwiseSpecified(target[key], options)
    })
  }
  getKeys(source).forEach(function(key) {
    if (propertyIsUnsafe(target, key)) {
      return
    }
    if (
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
}

function deepmerge<T>(x: Partial<T>, y: Partial<T>, options?: Options): T
function deepmerge<T1, T2>(
  x: Partial<T1>,
  y: Partial<T2>,
  options?: Options
): T1 & T2
function deepmerge(target: any, source: any, options: any) {
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
function deepmergeAll(objects: object[], options?: Options): object
function deepmergeAll<T>(objects: Partial<T>[], options?: Options): T
function deepmergeAll(array: any, options: any) {
  if (!Array.isArray(array)) {
    throw new Error('first argument should be an array')
  }

  return array.reduce(function(prev, next) {
    return deepmerge(prev, next, options)
  }, {})
}

deepmerge.all = deepmergeAll

export const merge = deepmerge
