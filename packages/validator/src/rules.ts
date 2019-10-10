import { getMessage } from './message'
import {
  isEmpty,
  stringLength,
  isStr,
  isFn,
  toArr,
  isBool
} from '@uform/shared'
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
    return isValidateEmpty(value) ? getMessage('required') : ''
  },
  max(value: any, rule: ValidateDescription) {
    const length = getLength(value)
    const max = Number(rule.max)
    return length > max ? getMessage('max') : ''
  },
  maximum(value: any, rule: ValidateDescription) {
    return Number(value) > Number(rule.maximum) ? getMessage('maximum') : ''
  },
  exclusiveMaximum(value: any, rule: ValidateDescription) {
    return Number(value) >= Number(rule.maximum)
      ? getMessage('exclusiveMaximum')
      : ''
  },
  minimum(value: any, rule: ValidateDescription) {
    return Number(value) < Number(rule.minimum) ? getMessage('minimum') : ''
  },
  exclusiveMinimum(value: any, rule: ValidateDescription) {
    return Number(value) <= Number(rule.minimum)
      ? getMessage('exclusiveMinimum')
      : ''
  },
  len(value: any, rule: ValidateDescription) {
    const length = getLength(value)
    const len = Number(rule.len)
    return length !== len ? getMessage('len') : ''
  },
  min(value: any, rule: ValidateDescription) {
    const length = getLength(value)
    const min = Number(rule.len)
    return length < min ? getMessage('min') : ''
  },
  pattern(value: any, rule: ValidateDescription) {
    return !new RegExp(rule.pattern).test(value)
      ? rule.message || getMessage('pattern')
      : ''
  },
  async validator(value: any, rule: ValidateDescription) {
    if (isFn(rule.validator)) {
      const response = await Promise.resolve(rule.validator(value, rule))
      if (isBool(response)) {
        return response ? rule.message : ''
      } else {
        return response
      }
    }
    throw new Error("The rule's validator property must be a function.")
  },
  whitespace(value: any, rule: ValidateDescription) {
    if (rule.whitespace) {
      return /^\s+$/.test(value) || value === '' ? getMessage('whitespace') : ''
    }
  },
  enum(value: any, rule: ValidateDescription) {
    const enums = toArr(rule.enum)
    return enums.indexOf(value) === -1 ? getMessage('enum') : ''
  }
}
