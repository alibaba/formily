import { parseValidator } from './parser'
import { IValidateResults, Validator, IValidatorOptions } from './types'
import {
  registerValidateFormats,
  registerValidateLocale,
  registerValidateRules,
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
): Promise<IValidateResults> => {
  const validates = parseValidator(validator, options)
  const results: IValidateResults = {
    error: [],
    success: [],
    warning: [],
  }
  for (let i = 0; i < validates.length; i++) {
    const result = await validates[i](value, options?.context)
    const { type, message } = result
    results[type] = results[type] || []
    if (message) {
      results[type].push(message)
      if (options?.validateFirst) break
    }
  }
  return results
}
