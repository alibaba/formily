import { format, isEmpty } from '../utils'
import { getMessage } from '../message'
import { IRuleDescription } from '@uform/types'

export default (value: any, rule: IRuleDescription, values: any, name: string) => {
  if (rule.required) {
    return isEmpty(value)
      ? format(rule.message || getMessage('required'), name)
      : ''
  }
}
