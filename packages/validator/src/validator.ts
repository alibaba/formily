import { parseValidator } from './parser'
import { ValidateResult, Validator, IValidatorOptions } from './types'
import {
  registerValidateFormats,
  registerValidateLocale,
  registerValidateRules
} from './registry'
import locales from './locale'
import formats from './formats'
import rules from './rules'

registerValidateRules(rules)

registerValidateLocale(locales)

registerValidateFormats(formats)

export const validate = async <Context = any>(
  value: any,
  validator: Validator<Context>,
  options?: IValidatorOptions<Context>
): Promise<ValidateResult[]> => {
  const callbacks = parseValidator(validator, options)
  return callbacks.reduce(async (previous, validate) => {
    const feedbacks = await previous
    const result = await validate(value, options.context)
    if (options?.validateFirst) {
      if (result) {
        throw feedbacks.concat(result)
      }
    }
    return feedbacks.concat(result)
  }, Promise.resolve([]))
}
