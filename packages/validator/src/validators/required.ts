import { format, isEmpty } from '../utils'
import { getMessage } from '../message'
import { IRuleDescription } from '@uform/types'

const isValidateEmpty = (value: any) => {
  if (typeof value === 'object') {
    for (let key in value) {
      if (value.hasOwnProperty(key)) {
        if (!isValidateEmpty(value[key])) return false
      }
    }
    return true
  } else {
    return isEmpty(value)
  }
}

export default (
  value: any,
  rule: IRuleDescription,
  values: any,
  name: string
) => {
  if (rule.required) {
    return isValidateEmpty(value)
      ? format(rule.message || getMessage('required'), name)
      : ''
  }
}
