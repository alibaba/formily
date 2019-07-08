import { format, isEmpty } from '../utils'
import { getMessage } from '../message'

export default (value, rule, values, name) => {
  if (rule.required) {
    return isEmpty(value)
      ? format(rule.message || getMessage('required'), name)
      : ''
  }
}
