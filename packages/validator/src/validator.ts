import {
  ValidatorOptions,
  ValidateNodeMap,
  ValidatePatternRules,
  ValidateRules,
  ValidateFormatsMap,
  ValidateRulesMap,
  ValidateResponse,
  ValidateDescription,
  ValidateFieldOptions,
  ValidateCalculator,
  ValidateNode
} from './types'
import {
  isFn,
  isStr,
  isArr,
  isObj,
  each,
  FormPath,
  FormPathPattern
} from '@uform/shared'
import { getMessage } from './message'
import defaultFormats from './formats'
import defaultRules from './rules'

//校验规则集合
const ValidatorRules: ValidateRulesMap = {}

//校验格式集合
const ValidatorFormators: ValidateFormatsMap = {}

//模板引擎
const template = (message: ValidateResponse, context: any): string => {
  if (isStr(message)) {
    if (isFn(FormValidator.template)) {
      return FormValidator.template(message, context)
    }
    return message.replace(/\{\{\s*(\w+)\s*\}\}/g, (_, $0) => {
      return FormPath.getIn(context, $0)
    })
  } else if (isObj(message)) {
    return template(message.message, context)
  } else {
    return ''
  }
}

class FormValidator {
  private validateFirst: boolean
  private nodes: ValidateNodeMap

  constructor(options: ValidatorOptions = {}) {
    this.validateFirst = options.validateFirst
    this.nodes = {}
  }

  transformRules(rules: ValidatePatternRules) {
    if (isStr(rules)) {
      if (!ValidatorFormators[rules]) {
        throw new Error('Can not found validator pattern')
      }
      return [
        {
          pattern: ValidatorFormators[rules],
          message: getMessage(rules) || 'Can not found validator message.'
        }
      ]
    } else if (isFn(rules)) {
      return [
        {
          validator: rules
        }
      ]
    } else if (isArr(rules)) {
      return rules.reduce((buf, rule) => {
        return buf.concat(this.transformRules(rule))
      }, [])
    } else if (isObj(rules)) {
      if (rules.format) {
        if (!ValidatorFormators[rules.format]) {
          throw new Error('Can not found validator pattern')
        }
        rules.pattern = ValidatorFormators[rules.format]
      }
      return [rules]
    }
    return []
  }

  async internalValidate(
    value: any,
    rules: ValidateRules,
    options: ValidateFieldOptions = {}
  ): Promise<{
    errors: string[]
    warnings: string[]
  }> {
    const first =
      options.first !== undefined ? !!options.first : !!this.validateFirst
    const errors: string[] = []
    const warnings = []
    try {
      for (let i = 0; i < rules.length; i++) {
        const ruleObj = rules[i]
        for (let key in ruleObj) {
          if (ruleObj.hasOwnProperty(key) && ruleObj[key] !== undefined) {
            const rule = ValidatorRules[key]
            if (rule) {
              const payload = await rule(value, ruleObj)
              const message = template(payload, {
                ...ruleObj,
                value,
                key: options.key
              })
              if (isStr(payload)) {
                if (first) {
                  if (message) errors.push(message)
                  throw new Error(message)
                }
                if (message) errors.push(message)
              } else if (isObj(payload)) {
                if (payload.type === 'warning') {
                  if (message) warnings.push(message)
                } else {
                  if (first) {
                    if (message) errors.push(message)
                    throw new Error(message)
                  }
                  if (message) errors.push(message)
                }
              }
            }
          }
        }
      }
      return {
        errors,
        warnings
      }
    } catch (e) {
      return {
        errors,
        warnings
      }
    }
  }

  validateNodes(pattern: FormPath, options: ValidateFieldOptions) {
    const errors = []
    const warnings = []
    let promise = Promise.resolve({ errors, warnings })
    each<ValidateNodeMap, ValidateNode>(this.nodes, (validator, path) => {
      if (pattern.match(path)) {
        promise = promise.then(async ({ errors, warnings }) => {
          const result = await validator(options)
          return {
            errors: errors.concat(
              result.errors.map(message => {
                return {
                  path: path.toString(),
                  message
                }
              })
            ),
            warnings: warnings.concat(
              result.warnings.map(message => {
                return {
                  path: path.toString(),
                  message
                }
              })
            )
          }
        })
      }
    })
    return promise.catch(console.error) // eslint-disable-line
  }

  validate = (path?: FormPathPattern, options?: ValidateFieldOptions) => {
    const pattern = FormPath.getPath(path || '*')
    return this.validateNodes(pattern, options)
  }

  register = (path: FormPathPattern, calculator: ValidateCalculator) => {
    const newPath = FormPath.getPath(path)
    if (isFn(calculator) && !this.nodes[newPath]) {
      this.nodes[newPath] = (options: ValidateFieldOptions) => {
        return new Promise((resolve, reject) => {
          const validate = async (value: any, rules: ValidatePatternRules) => {
            const data = {
              ...options,
              key: newPath.toString()
            }
            return this.internalValidate(
              value,
              this.transformRules(rules),
              data
            ).then(
              payload => {
                resolve(payload)
                return payload
              },
              payload => {
                reject(payload)
                return Promise.reject(payload)
              }
            )
          }
          calculator(validate)
        })
      }
    }
  }

  static template: (
    message: ValidateResponse,
    data: ValidateDescription & { value: any; key: string }
  ) => string

  //注册通用规则
  static registerRules(rules: ValidateRulesMap) {
    each(rules, (rule, key) => {
      if (isFn(rule)) {
        ValidatorRules[key] = rule
      }
    })
  }
  /**
   * https://github.com/alibaba/uform/issues/215
   *
   * @static
   * @param {ValidateFormatsMap} formats
   * @memberof FormValidator
   */
  static registerFormats(formats: ValidateFormatsMap) {
    each(formats, (pattern, key) => {
      if (isStr(pattern) || pattern instanceof RegExp) {
        ValidatorFormators[key] = new RegExp(pattern)
      }
    })
  }

  //注册校验消息模板引擎
  static registerMTEngine = template => {
    if (isFn(template)) {
      FormValidator.template = template
    }
  }
}

FormValidator.registerFormats(defaultFormats)
FormValidator.registerRules(defaultRules)

export { FormValidator }
