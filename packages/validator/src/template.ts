import { isFn, isStr, FormPath } from '@formily/shared'
import { ValidateResult, ValidatorRules } from './types'
import { getValidateMessageTemplateEngine } from './registry'

export const render = (
  result: ValidateResult,
  rules: ValidatorRules
): ValidateResult => {
  const { message } = result
  if (isStr(result.message)) {
    const template = getValidateMessageTemplateEngine()
    if (isFn(template)) {
      result.message = template(message, rules)
    }
    result.message = result.message.replace(
      /\{\{\s*([\w.]+)\s*\}\}/g,
      (_, $0) => {
        return FormPath.getIn(rules, $0)
      }
    )
  }
  return result
}
