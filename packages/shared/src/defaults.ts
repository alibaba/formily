import { each } from './array'
import { isValid } from './isEmpty'
import { isPlainObj, isArr, getType } from './types'
import { BigData } from './big-data'
const isUnNormalObject = (value: any) => {
  if (value?._owner || value?.$$typeof) {
    return true
  }
  if (value?._isAMomentObject || value?._isJSONSchemaObject) {
    return true
  }
  if (value?.toJS || value?.toJSON) {
    return true
  }
}

const isPlainValue = (val: any) => {
  if (isUnNormalObject(val)) {
    return false
  }
  if (BigData.isBigData(val)) {
    return false
  }
  return isPlainObj(val) || isArr(val)
}

/**
 *
 * @param defaults
 * @param targets
 */
export const defaults = (defaults_: any, targets: any) => {
  if (
    getType(defaults_) !== getType(targets) ||
    !isPlainValue(defaults_) ||
    !isPlainValue(targets)
  ) {
    return isValid(targets) ? targets : defaults_
  } else {
    const results = isPlainObj(defaults_) ? {} : []
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
