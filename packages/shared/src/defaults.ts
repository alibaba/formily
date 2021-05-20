import { each } from './array'
import { isEmpty, isValid } from './isEmpty'
import { getType, isArr } from './checkers'

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

const isEnumableObject = (val: any) => {
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
    !isEnumableObject(defaults_) ||
    !isEnumableObject(targets)
  ) {
    return !isEmpty(targets) ? targets : defaults_
  } else {
    const results = isArr(defaults_) ? [] : {}
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
