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
  if (!description) return {}
  let rules: IValidatorRules = {}
  if (isStr(description)) {
    rules.format = description
  } else if (isFn(description)) {
    rules.validator = description
  } else {
    rules = Object.assign(rules, description)
  }
  return rules
}

export const parseValidatorDescriptions = <Context = any>(
  validator: Validator<Context>
): IValidatorRules[] => {
  if (!validator) return []
  const array = isArr(validator) ? validator : [validator]
  return array.map((description) => {
    return parseValidatorDescription(description)
  })
}

export const parseValidatorRules = (
  rules: IValidatorRules = {}
): ValidatorParsedFunction[] => {
  const getRulesKeys = (): string[] => {
    const keys = []
    if ('required' in rules) {
      keys.push('required')
    }
    for (let key in rules) {
      if (key === 'required' || key === 'validator') continue
      keys.push(key)
    }
    if ('validator' in rules) {
      keys.push('validator')
    }
    return keys
  }
  const getContext = (context: any, value: any) => {
    return {
      ...rules,
      ...context,
      value,
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
              Object.assign(context_, scope)
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
  return getRulesKeys().reduce((buf, key) => {
    const callback = getValidateRules(key)
    if (callback) {
      const validator = createValidate(callback, getRuleMessage(rules, key))
      return buf.concat(validator)
    }
    return buf
  }, [])
}

export const parseValidator = <Context = any>(
  validator: Validator<Context>,
  options: IValidatorOptions = {}
) => {
  if (!validator) return []
  const array = isArr(validator) ? validator : [validator]
  return array.reduce<ValidatorParsedFunction<Context>[]>(
    (buf, description) => {
      const rules = parseValidatorDescription(description)
      const triggerType = rules.triggerType ?? 'onInput'
      if (options?.triggerType && options.triggerType !== triggerType)
        return buf
      return rules ? buf.concat(parseValidatorRules(rules)) : buf
    },
    []
  )
}
