import { format } from '../utils'
import { getMessage } from '../message'
import { patternValidate } from './pattern'
import * as RegExpPatterns from './regexp'

const PatternKeys = Object.keys(RegExpPatterns)

const batchValidate = (value, rule, values, name) => {
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

export default (value, rule, values, name) => {
  return batchValidate(value, rule, values, name)
}
