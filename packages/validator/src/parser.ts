import { isArr, isBool, isFn, isStr } from '@formily/shared'
import {
  ValidatorDescription,
  ValidatorFunction,
  ValidatorParsedFunction,
  Validator,
  ValidatorRules,
  isValidateResult,
  IValidatorOptions,
} from './types'
import { getValidateRules, getValidateLocale } from './registry'
import { render } from './template'

const intersection = (arr1: string[], arr2: string[]) => {
  return arr1.filter((key) => arr2.includes(key))
}

const getRuleMessage = (rule: ValidatorRules, type: string) => {
  const registryRuleKeys = Object.keys(getValidateRules() || {})
  const currentRuleKeys = Object.keys(rule || {})
  if (rule.format) {
    return rule.message || getValidateLocale(rule.format)
  }
  if (
    isFn(rule.validator) ||
    intersection(currentRuleKeys, registryRuleKeys).length > 2
  ) {
    return getValidateLocale(type)
  } else {
    return rule.message || getValidateLocale(type)
  }
}

export const parseValidatorDescription = (
  description: ValidatorDescription
): ValidatorRules => {
  let rules: ValidatorRules = {}
  if (isStr(description)) {
    rules.format = description
  } else if (isFn(description)) {
    rules.validator = description
  } else {
    rules = Object.assign(rules, description)
  }
  rules.triggerType = rules.triggerType || 'onInput'
  return rules
}

export const parseValidatorDescriptions = <Context = any>(
  validator: Validator<Context>
): ValidatorRules[] => {
  const array = isArr(validator) ? validator : [validator]
  return array.map((description) => {
    return parseValidatorDescription(description)
  })
}

export const parseValidatorRules = (
  rules: ValidatorRules
): ValidatorParsedFunction[] => {
  const rulesKeys = Object.keys(rules || {}).sort((key) =>
    key === 'validator' ? 1 : -1
  )
  const getContext = (context: any) => {
    return {
      ...rules,
      ...context,
    }
  }
  const createValidate = (
    callback: ValidatorFunction,
    message: string
  ) => async (value: any, context: any) => {
    const results = await callback(
      value,
      { ...rules, message },
      getContext(context)
    )
    if (isBool(results)) {
      if (!results) {
        return render(
          {
            type: 'error',
            message,
          },
          getContext(getContext(context))
        )
      }
      return
    } else if (results) {
      if (isValidateResult(results)) {
        return render(results, getContext(context))
      }
      return render(
        {
          type: 'error',
          message: results,
        },
        getContext(context)
      )
    }

    return {
      type: 'error',
      message: undefined,
    }
  }
  return rulesKeys.reduce((buf, key) => {
    const callback = getValidateRules(key)
    return callback
      ? buf.concat(createValidate(callback, getRuleMessage(rules, key)))
      : buf
  }, [])
}

export const parseValidator = <Context = any>(
  validator: Validator<Context>,
  options: IValidatorOptions = {}
) => {
  const array = isArr(validator) ? validator : [validator]
  const results: ValidatorParsedFunction<Context>[] = []
  return array.reduce((buf, description) => {
    const rules = parseValidatorDescription(description)
    if (options?.triggerType && options.triggerType !== rules.triggerType)
      return buf
    return rules ? buf.concat(parseValidatorRules(rules)) : buf
  }, results)
}
