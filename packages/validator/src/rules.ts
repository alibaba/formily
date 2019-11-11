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

const getRuleMessage = (rule: any, type: string) => {
  if (isFn(rule.validator) || Object.keys(rule).length > 2) {
    return getMessage(type)
  } else {
    return rule.message || getMessage(type)
  }
}

export default {
  required(value: any, rule: ValidateDescription) {
    if (rule.required === false) return ''
    return isValidateEmpty(value) ? getRuleMessage(rule, 'required') : ''
  },
  max(value: any, rule: ValidateDescription) {
    const length = getLength(value)
    const max = Number(rule.max)
    return length > max ? getRuleMessage(rule, 'max') : ''
  },
  maximum(value: any, rule: ValidateDescription) {
    return Number(value) > Number(rule.maximum) ? getMessage('maximum') : ''
  },
  exclusiveMaximum(value: any, rule: ValidateDescription) {
    return Number(value) >= Number(rule.maximum)
      ? getRuleMessage(rule, 'exclusiveMaximum')
      : ''
  },
  minimum(value: any, rule: ValidateDescription) {
    return Number(value) < Number(rule.minimum)
      ? getRuleMessage(rule, 'minimum')
      : ''
  },
  exclusiveMinimum(value: any, rule: ValidateDescription) {
    return Number(value) <= Number(rule.minimum)
      ? getRuleMessage(rule, 'exclusiveMinimum')
      : ''
  },
  len(value: any, rule: ValidateDescription) {
    const length = getLength(value)
    const len = Number(rule.len)
    return length !== len ? getRuleMessage(rule, 'len') : ''
  },
  min(value: any, rule: ValidateDescription) {
    const length = getLength(value)
    const min = Number(rule.len)
    return length < min ? getRuleMessage(rule, 'min') : ''
  },
  pattern(value: any, rule: ValidateDescription) {
    return !new RegExp(rule.pattern).test(value)
      ? getRuleMessage(rule, 'pattern')
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
      return /^\s+$/.test(value) || value === ''
        ? getRuleMessage(rule, 'whitespace')
        : ''
    }
  },
  enum(value: any, rule: ValidateDescription) {
    const enums = toArr(rule.enum)
    return enums.indexOf(value) === -1 ? getRuleMessage(rule, 'enum') : ''
  }
}
