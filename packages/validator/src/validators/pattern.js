import { isRegExp, format, isFn, isEmpty } from '../utils'
import { getMessage } from '../message'

export const patternValidate = (pattern, value, message) => {
  if (isEmpty(value)) return ''
  if (isRegExp(pattern)) {
    pattern.lastIndex = 0
  }
  const valid = isFn(pattern)
    ? pattern(value)
    : isRegExp(pattern)
      ? pattern.test(String(value))
      : new RegExp(String(pattern)).test(String(value))
  return !valid ? message : ''
}

export default (value, rule, values, name) => {
  if (rule.pattern) {
    return patternValidate(
      rule.pattern,
      value,
      format(rule.message || getMessage('pattern'), name, value, rule.pattern)
    )
  }
}
