import { isFn } from '../utils'

export default (value, rule, values, name) => {
  if (isFn(rule.validator)) {
    return rule.validator(value, rule, values, name)
  }
}
