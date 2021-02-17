import {
  isEmpty,
  isValid,
  stringLength,
  isStr,
  isArr,
  isFn,
  toArr,
  isBool,
  isNum,
} from '@formily/shared'
import { getValidateFormats } from './registry'
import { IValidatorRules, IRegistryRules } from './types'

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

const RULES: IRegistryRules = {
  format(value: any, rule: IValidatorRules) {
    if (!isValid(value)) return ''
    return !new RegExp(getValidateFormats(rule.format) || '').test(value)
      ? rule.message
      : ''
  },
  required(value: any, rule: IValidatorRules) {
    if (rule.required === false) return ''
    return isValidateEmpty(value) ? rule.message : ''
  },
  max(value: any, rule: IValidatorRules) {
    if (!isValid(value)) return ''
    const length = isNum(value) ? value : getLength(value)
    const max = Number(rule.max)
    return length > max ? rule.message : ''
  },
  maximum(value: any, rule: IValidatorRules) {
    if (!isValid(value)) return ''
    const length = isNum(value) ? value : getLength(value)
    const max = Number(rule.maximum)
    return length > max ? rule.message : ''
  },
  exclusiveMaximum(value: any, rule: IValidatorRules) {
    if (!isValid(value)) return ''
    const length = isNum(value) ? value : getLength(value)
    const max = Number(rule.exclusiveMaximum)
    return length >= max ? rule.message : ''
  },
  minimum(value: any, rule: IValidatorRules) {
    if (!isValid(value)) return ''
    const length = isNum(value) ? value : getLength(value)
    const min = Number(rule.minimum)
    return length < min ? rule.message : ''
  },
  exclusiveMinimum(value: any, rule: IValidatorRules) {
    if (!isValid(value)) return ''
    const length = isNum(value) ? value : getLength(value)
    const min = Number(rule.exclusiveMinimum)
    return length <= min ? rule.message : ''
  },
  len(value: any, rule: IValidatorRules) {
    if (!isValid(value)) return ''
    const length = getLength(value)
    const len = Number(rule.len)
    return length !== len ? rule.message : ''
  },
  min(value: any, rule: IValidatorRules) {
    if (!isValid(value)) return ''
    const length = isNum(value) ? value : getLength(value)
    const min = Number(rule.min)
    return length < min ? rule.message : ''
  },
  pattern(value: any, rule: IValidatorRules) {
    if (!isValid(value)) return ''
    return !new RegExp(rule.pattern).test(value) ? rule.message : ''
  },
  async validator(value: any, rule: IValidatorRules, context: any) {
    if (isFn(rule.validator)) {
      const response = await Promise.resolve(
        rule.validator(value, rule, context)
      )
      if (isBool(response)) {
        return !response ? rule.message : ''
      } else {
        return response
      }
    }
    /* istanbul ignore next */
    throw new Error("The rule's validator property must be a function.")
  },
  whitespace(value: any, rule: IValidatorRules) {
    if (!isValid(value)) return ''
    if (rule.whitespace) {
      return /^\s+$/.test(value) ? rule.message : ''
    }
  },
  enum(value: any, rule: IValidatorRules) {
    if (!isValid(value)) return ''
    const enums = toArr(rule.enum)
    return enums.indexOf(value) === -1 ? rule.message : ''
  },
}

export default RULES
