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
import { IRegistryRules } from './types'

const isValidateEmpty = (value: any) => {
  if (isArr(value)) {
    for (let i = 0; i < value.length; i++) {
      if (isValid(value[i])) return false
    }
    return true
  } else {
    //compat to draft-js
    if (value?.getCurrentContent) {
      /* istanbul ignore next */
      return !value.getCurrentContent()?.hasText()
    }
    return isEmpty(value)
  }
}

const getLength = (value: any) =>
  isStr(value) ? stringLength(value) : value ? value.length : 0

const RULES: IRegistryRules = {
  format(value, rule) {
    if (isValidateEmpty(value)) return ''
    return !new RegExp(getValidateFormats(rule.format) || '').test(value)
      ? rule.message
      : ''
  },
  required(value, rule) {
    if (rule.required === false) return ''
    return isValidateEmpty(value) ? rule.message : ''
  },
  max(value, rule) {
    if (isValidateEmpty(value)) return ''
    const length = isNum(value) ? value : getLength(value)
    const max = Number(rule.max)
    return length > max ? rule.message : ''
  },
  maximum(value, rule) {
    if (isValidateEmpty(value)) return ''
    const length = isNum(value) ? value : getLength(value)
    const max = Number(rule.maximum)
    return length > max ? rule.message : ''
  },
  exclusiveMaximum(value, rule) {
    if (isValidateEmpty(value)) return ''
    const length = isNum(value) ? value : getLength(value)
    const max = Number(rule.exclusiveMaximum)
    return length >= max ? rule.message : ''
  },
  minimum(value, rule) {
    if (isValidateEmpty(value)) return ''
    const length = isNum(value) ? value : getLength(value)
    const min = Number(rule.minimum)
    return length < min ? rule.message : ''
  },
  exclusiveMinimum(value, rule) {
    if (isValidateEmpty(value)) return ''
    const length = isNum(value) ? value : getLength(value)
    const min = Number(rule.exclusiveMinimum)
    return length <= min ? rule.message : ''
  },
  len(value, rule) {
    if (isValidateEmpty(value)) return ''
    const length = getLength(value)
    const len = Number(rule.len)
    return length !== len ? rule.message : ''
  },
  min(value, rule) {
    if (isValidateEmpty(value)) return ''
    const length = isNum(value) ? value : getLength(value)
    const min = Number(rule.min)
    return length < min ? rule.message : ''
  },
  pattern(value, rule) {
    if (isValidateEmpty(value)) return ''
    return !new RegExp(rule.pattern).test(value) ? rule.message : ''
  },
  async validator(value, rule, context, format) {
    if (isFn(rule.validator)) {
      const response = await Promise.resolve(
        rule.validator(value, rule, context, format)
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
  whitespace(value, rule) {
    if (isValidateEmpty(value)) return ''
    if (rule.whitespace) {
      return /^\s+$/.test(value) ? rule.message : ''
    }
  },
  enum(value, rule) {
    if (isValidateEmpty(value)) return ''
    const enums = toArr(rule.enum)
    return enums.indexOf(value) === -1 ? rule.message : ''
  },
}

export default RULES
