import { IRuleDescription, Rule } from '@uform/types'
import { isObj, isStr, isFn } from '../utils'
import formatValidate from './format'
import requiredValidate from './required'
import patternValidate from './pattern'
import customValidate from './custom'
/*
 * rule : {
     format:"",
 *   required:true,
 *   message:"",
 *   pattern:"",
 *   validator(value,rule,callback,values){
 *   }
 * }
 *
**/

const batchInvoke = (...fns: Array<(...args: any[]) => void>) => {
  return (...args: any[]) => {
    return fns.map(fn => Promise.resolve(fn(...args)))
  }
}

const batchValidate = (
  value: any,
  rule: IRuleDescription,
  values: any,
  name: string
) => {
  return Promise.all(
    batchInvoke(
      formatValidate,
      requiredValidate,
      patternValidate,
      customValidate
    )(value, rule, values, name)
  )
}

export const validate = (value: any, rule: Rule, values: any, name: string) => {
  const newRule = isObj(rule)
    ? rule
    : isStr(rule)
    ? { format: rule }
    : isFn(rule)
    ? { validator: rule }
    : {}
  return batchValidate(value, newRule as IRuleDescription, values, name)
}
