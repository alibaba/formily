import { getMessage } from './message'
import { isEmpty, stringLength, isStr, isFn, toArr } from '@uform/shared'
import { ValidateDescription } from './types'
const isValidateEmpty = (value: any) => {
  if (typeof value === 'object') {
    for (let key in value) {
      if (value.hasOwnProperty(key)) {
        if (!isValidateEmpty(value[key])) return false
      }
    }
    return true
  } else {
    return isEmpty(value)
  }
}

const getLength = (value: any) =>
  isStr(value) ? stringLength(value) : value ? value.length : 0

export default {
  required(value: any, rule: ValidateDescription) {
    return isValidateEmpty(value) ? rule.message || getMessage('required') : ''
  },
  max(value: any, rule: ValidateDescription) {
    const length = getLength(value)
    const max = Number(rule.max)
    return length > max ? rule.message || getMessage('max') : ''
  },
  len(value: any, rule: ValidateDescription) {
    const length = getLength(value)
    const len = Number(rule.len)
    return length !== len ? rule.message || getMessage('len') : ''
  },
  min(value: any, rule: ValidateDescription) {
    const length = getLength(value)
    const min = Number(rule.len)
    return length < min ? rule.message || getMessage('min') : ''
  },
  pattern(value: any, rule: ValidateDescription) {
    return !new RegExp(rule.pattern).test(value)
      ? rule.message || getMessage('pattern')
      : ''
  },
  validator(value: any, rule: ValidateDescription) {
    if (isFn(rule.validator)) {
      return rule.validator(value, rule)
    }
    throw new Error("The rule's validator property must be a function.")
  },
  whitespace(value: any, rule: ValidateDescription) {
    if (rule.whitespace) {
      return /^\s+$/.test(value) || value === ''
        ? rule.message || getMessage('whitespace')
        : ''
    }
  },
  enum(value: any, rule: ValidateDescription) {
    const enums = toArr(rule.enum)
    return enums.indexOf(value) === -1 ? rule.message || getMessage('enum') : ''
  }
}
