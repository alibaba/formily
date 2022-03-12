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
  isEqual,
  each,
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

const extendSameRules = (
  rules: IRegistryRules,
  names: Record<string, string>
) => {
  each(names, (realName, name) => {
    rules[name] = (value, rule, ...args) =>
      rules[realName](value, { ...rule, [realName]: rule[name] }, ...args)
  })
}

const RULES: IRegistryRules = {
  format(value, rule) {
    if (isValidateEmpty(value)) return ''
    if (rule.format) {
      const format = getValidateFormats(rule.format)
      if (format) {
        return !new RegExp(format).test(value) ? rule.message : ''
      }
    }
    return ''
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
  min(value, rule) {
    if (isValidateEmpty(value)) return ''
    const length = isNum(value) ? value : getLength(value)
    const min = Number(rule.min)
    return length < min ? rule.message : ''
  },
  exclusiveMaximum(value, rule) {
    if (isValidateEmpty(value)) return ''
    const length = isNum(value) ? value : getLength(value)
    const max = Number(rule.exclusiveMaximum)
    return length >= max ? rule.message : ''
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
  const(value, rule) {
    if (isValidateEmpty(value)) return ''
    return rule.const !== value ? rule.message : ''
  },
  multipleOf(value, rule) {
    if (isValidateEmpty(value)) return ''
    return Number(value) % Number(rule.multipleOf) !== 0 ? rule.message : ''
  },
  uniqueItems(value, rule) {
    if (isValidateEmpty(value)) return ''
    value = toArr(value)
    return value.some((item: any, index: number) => {
      for (let i = 0; i < value.length; i++) {
        if (i !== index && !isEqual(value[i], item)) {
          return false
        }
      }
      return true
    })
      ? ''
      : rule.message
  },
  maxProperties(value, rule) {
    if (isValidateEmpty(value)) return ''
    return Object.keys(value || {}).length <= Number(rule.maxProperties)
      ? ''
      : rule.message
  },
  minProperties(value, rule) {
    if (isValidateEmpty(value)) return ''
    return Object.keys(value || {}).length >= Number(rule.minProperties)
      ? ''
      : rule.message
  },
}

extendSameRules(RULES, {
  maximum: 'max',
  minimum: 'min',
  maxItems: 'max',
  minItems: 'min',
  maxLength: 'max',
  minLength: 'min',
})

export default RULES
