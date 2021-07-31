import { isArr, isBool, isFn, isStr } from '@formily/shared'
import {
  ValidatorDescription,
  ValidatorFunction,
  ValidatorParsedFunction,
  Validator,
  IValidatorRules,
  isValidateResult,
  IValidatorOptions,
} from './types'
import { getValidateRules, getValidateLocale } from './registry'
import { render } from './template'

const getRuleMessage = (rule: IValidatorRules, type: string) => {
  if (rule.format) {
    return rule.message || getValidateLocale(rule.format)
  }
  return rule.message || getValidateLocale(type)
}

export const parseValidatorDescription = (
  description: ValidatorDescription
): IValidatorRules => {
  let rules: IValidatorRules = {}
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
): IValidatorRules[] => {
  const array = isArr(validator) ? validator : [validator]
  return array.map((description) => {
    return parseValidatorDescription(description)
  })
}

export const parseIValidatorRules = (
  rules: IValidatorRules
): ValidatorParsedFunction[] => {
  const rulesKeys = Object.keys(rules || {}).sort((key) =>
    key === 'validator' ? 1 : -1
  )
  const getContext = (context: any, value: any) => {
    return {
      value,
      ...rules,
      ...context,
    }
  }
  const createValidate =
    (callback: ValidatorFunction, message: string) =>
    async (value: any, context: any) => {
      const context_ = getContext(context, value)
      try {
        const results = await callback(
          value,
          { ...rules, message },
          context_,
          (message: string, scope: any) => {
            return render(
              {
                type: 'error',
                message,
              },
              { ...context_, ...scope }
            )?.message
          }
        )
        if (isBool(results)) {
          if (!results) {
            return render(
              {
                type: 'error',
                message,
              },
              context_
            )
          }
          return {
            type: 'error',
            message: undefined,
          }
        } else if (results) {
          if (isValidateResult(results)) {
            return render(results, context_)
          }
          return render(
            {
              type: 'error',
              message: results,
            },
            context_
          )
        }

        return {
          type: 'error',
          message: undefined,
        }
      } catch (e) {
        return {
          type: 'error',
          message: e?.message || e,
        }
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
    return rules ? buf.concat(parseIValidatorRules(rules)) : buf
  }, results)
}
