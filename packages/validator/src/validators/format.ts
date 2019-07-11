import { format } from '../utils'
import { getMessage } from '../message'
import { patternValidate } from './pattern'
import { IRuleDescription } from '@uform/types'
import RegExpPatterns from './regexp'

const PatternKeys = Object.keys(RegExpPatterns)

const batchValidate = (
  value: any,
  rule: IRuleDescription,
  values: any,
  name: string
) => {
  for (let i = 0; i < PatternKeys.length; i++) {
    if (PatternKeys[i] === rule.format) {
      return patternValidate(
        RegExpPatterns[PatternKeys[i]],
        value,
        format(rule.message || getMessage(rule.format), name, value)
      )
    }
  }
}

export default (
  value: any,
  rule: IRuleDescription,
  values: any,
  name: string
) => {
  return batchValidate(value, rule, values, name)
}
