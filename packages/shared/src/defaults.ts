import { each } from './array'
import { isValid } from './isEmpty'
import { isPlainObj, isArr, getType } from './types'

const isPlainValue = (val: any) => isPlainObj(val) || isArr(val)

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
