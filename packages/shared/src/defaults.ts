import { each } from './array'
import { isEmpty, isValid } from './isEmpty'
import { getType, isArr, isPlainObj } from './checkers'

const isUnNormalObject = (value: any) => {
  if (value?._owner && value?.$$typeof) {
    return true
  }
  if (value?._isAMomentObject || value?._isJSONSchemaObject) {
    return true
  }
  if (value?.toJS || value?.toJSON) {
    return true
  }
}

const isEnumerableObject = (val: any) => {
  if (isUnNormalObject(val)) {
    return false
  }
  return typeof val === 'object'
}

/**
 *
 * @param defaults
 * @param targets
 */
export const defaults = (defaults_: any, targets: any) => {
  if (
    getType(defaults_) !== getType(targets) ||
    !isEnumerableObject(defaults_) ||
    !isEnumerableObject(targets)
  ) {
    return !isEmpty(targets) ? targets : defaults_
  } else {
    const results = isArr(defaults_)
      ? []
      : isPlainObj(defaults_)
      ? {}
      : defaults_
    each(targets, (value, key) => {
      results[key] = defaults(defaults_[key], value)
    })
    each(defaults_, (value, key) => {
      if (!isValid(results[key])) {
        results[key] = value
      }
    })
    return results
  }
}
