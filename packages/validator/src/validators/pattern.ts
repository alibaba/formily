import { isRegExp, format, isFn, isEmpty } from '../utils'
import { getMessage } from '../message'
import { RuleDescription } from '@uform/types'

export const patternValidate = (pattern: string | RegExp | Function, value: any, message: string) => {
  if (isEmpty(value)) { return '' }
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

export default (value: any, rule: RuleDescription, values: any, name: string) => {
  if (rule.pattern) {
    return patternValidate(
      rule.pattern,
      value,
      format(rule.message || getMessage('pattern'), name, value, rule.pattern)
    )
  }
}
