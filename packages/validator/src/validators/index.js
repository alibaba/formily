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

const batchInvoke = (...fns) => {
  return (...args) => {
    return fns.map(fn => Promise.resolve(fn(...args)))
  }
}

const batchValidate = (value, rule, values, name) => {
  return Promise.all(
    batchInvoke(
      formatValidate,
      requiredValidate,
      patternValidate,
      customValidate
    )(value, rule, values, name)
  )
}

export const validate = (value, rule, values, name) => {
  const newRule = isObj(rule)
    ? rule
    : isStr(rule)
      ? { format: rule }
      : isFn(rule)
        ? { validator: rule }
        : {}
  return batchValidate(value, newRule, values, name)
}
