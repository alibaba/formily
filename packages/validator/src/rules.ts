import { getMessage } from './message'
import {
  isEmpty,
  isValid,
  stringLength,
  isStr,
  isArr,
  isFn,
  toArr,
  isBool
} from '@formily/shared'
import { ValidateDescription, ValidateRulesMap } from './types'
const isValidateEmpty = (value: any) => {
  if (isArr(value)) {
    for (let i = 0; i < value.length; i++) {
      if (isValid(value[i])) return false
    }
    return true
  } else {
    return isEmpty(value)
  }
}

const getLength = (value: any) =>
  isStr(value) ? stringLength(value) : value ? value.length : 0

const intersection = (arr1: string[], arr2: string[]) => {
  return arr1.filter(key => arr2.includes(key))
}

const getRuleMessage = (rule: any, type: string, rules?: ValidateRulesMap) => {
  const allRuleKeys = Object.keys(rules || {})
  const currentRuleKeys = Object.keys(rule || {})
  if (
    isFn(rule.validator) ||
    intersection(currentRuleKeys, allRuleKeys).length > 2
  ) {
    if (rule.format) {
      return rule.message || getMessage(type)
    }
    return getMessage(type)
  } else {
    return rule.message || getMessage(type)
  }
}

export default {
  required(value: any, rule: ValidateDescription, rules: ValidateRulesMap) {
    if (rule.required === false) return ''
    return isValidateEmpty(value) ? getRuleMessage(rule, 'required', rules) : ''
  },
  max(value: any, rule: ValidateDescription, rules: ValidateRulesMap) {
    const length = getLength(value)
    const max = Number(rule.max)
    return length > max ? getRuleMessage(rule, 'max', rules) : ''
  },
  maximum(value: any, rule: ValidateDescription, rules: ValidateRulesMap) {
    return Number(value) > Number(rule.maximum)
      ? getRuleMessage(rule, 'maximum', rules)
      : ''
  },
  exclusiveMaximum(
    value: any,
    rule: ValidateDescription,
    rules: ValidateRulesMap
  ) {
    return Number(value) >= Number(rule.maximum)
      ? getRuleMessage(rule, 'exclusiveMaximum', rules)
      : ''
  },
  minimum(value: any, rule: ValidateDescription, rules: ValidateRulesMap) {
    return Number(value) < Number(rule.minimum)
      ? getRuleMessage(rule, 'minimum', rules)
      : ''
  },
  exclusiveMinimum(
    value: any,
    rule: ValidateDescription,
    rules: ValidateRulesMap
  ) {
    return Number(value) <= Number(rule.minimum)
      ? getRuleMessage(rule, 'exclusiveMinimum', rules)
      : ''
  },
  len(value: any, rule: ValidateDescription, rules: ValidateRulesMap) {
    const length = getLength(value)
    const len = Number(rule.len)
    return length !== len ? getRuleMessage(rule, 'len', rules) : ''
  },
  min(value: any, rule: ValidateDescription, rules: ValidateRulesMap) {
    const length = getLength(value)
    const min = Number(rule.min)
    return length < min ? getRuleMessage(rule, 'min', rules) : ''
  },
  pattern(value: any, rule: ValidateDescription, rules: ValidateRulesMap) {
    if (isValidateEmpty(value)) return ''
    return !new RegExp(rule.pattern).test(value)
      ? getRuleMessage(rule, 'pattern', rules)
      : ''
  },
  async validator(
    value: any,
    rule: ValidateDescription,
    rules: ValidateRulesMap
  ) {
    if (isFn(rule.validator)) {
      const response = await Promise.resolve(rule.validator(value, rule, rules))
      if (isBool(response)) {
        return response ? rule.message : ''
      } else {
        return response
      }
    }
    throw new Error("The rule's validator property must be a function.")
  },
  whitespace(value: any, rule: ValidateDescription, rules: ValidateRulesMap) {
    if (rule.whitespace) {
      return /^\s+$/.test(value)
        ? getRuleMessage(rule, 'whitespace', rules)
        : ''
    }
  },
  enum(value: any, rule: ValidateDescription, rules: ValidateRulesMap) {
    const enums = toArr(rule.enum)
    return enums.indexOf(value) === -1
      ? getRuleMessage(rule, 'enum', rules)
      : ''
  }
}
