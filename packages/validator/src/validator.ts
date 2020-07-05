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
  ValidateNode,
  ValidateNodeResult,
  SyncValidateResponse
} from './types'
import {
  isFn,
  isStr,
  isArr,
  isObj,
  isValid,
  each,
  log,
  reduce,
  FormPath,
  FormPathPattern
} from '@formily/shared'
import { getMessage } from './message'
import defaultFormats from './formats'
import defaultRules from './rules'

//校验规则集合
const ValidatorRules: ValidateRulesMap = {}

//校验格式集合
const ValidatorFormators: ValidateFormatsMap = {}

//模板引擎
const template = (message: SyncValidateResponse, context: any): string => {
  if (isStr(message)) {
    if (isFn(FormValidator.template)) {
      return FormValidator.template(message, context)
    }
    return message.replace(/\{\{\s*([\w.]+)\s*\}\}/g, (_, $0) => {
      return FormPath.getIn(context, $0)
    })
  } else if (isObj(message) && !message['$$typeof'] && !message['_owner']) {
    return template(message.message, context)
  } else {
    return message as any
  }
}

class FormValidator {
  private validateFirst: boolean
  private nodes: ValidateNodeMap
  private matchStrategy: ValidatorOptions['matchStrategy']

  constructor(options: ValidatorOptions = {}) {
    this.validateFirst = options.validateFirst
    this.matchStrategy = options.matchStrategy
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
      return rules.reduce((buf: any, rule) => {
        return buf.concat(this.transformRules(rule))
      }, [])
    } else if (isObj(rules)) {
      if (rules.format) {
        if (!ValidatorFormators[rules.format]) {
          throw new Error('Can not found validator pattern')
        }
        rules.pattern = ValidatorFormators[rules.format]
        rules.message = rules.message || getMessage(rules.format)
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
    const first = isValid(options.first)
      ? !!options.first
      : !!this.validateFirst
    const errors: string[] = []
    const warnings = []
    try {
      for (let i = 0; i < rules.length; i++) {
        const ruleObj = rules[i]
        const keys = Object.keys(ruleObj).sort(key =>
          key === 'validator' ? 1 : -1
        )
        for (let l = 0; l < keys.length; l++) {
          const key = keys[l]
          if (ruleObj.hasOwnProperty(key) && isValid(ruleObj[key])) {
            const rule = ValidatorRules[key]
            if (rule) {
              const payload = await rule(value, ruleObj, ValidatorRules)
              const message = template(payload, {
                ...ruleObj,
                rule: ruleObj,
                value
              })
              if (
                isStr(payload) ||
                (payload['$$typeof'] && payload['_owner'])
              ) {
                if (first) {
                  if (message) {
                    errors.push(message)
                    throw new Error(message)
                  }
                }
                if (message) errors.push(message)
              } else if (isObj(payload)) {
                if (payload.type === 'warning') {
                  if (message) warnings.push(message)
                } else {
                  if (first) {
                    if (message) {
                      errors.push(message)
                      throw new Error(message)
                    }
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

  async validateNodes(
    pattern: FormPath,
    options: ValidateFieldOptions
  ): Promise<ValidateNodeResult> {
    let errors = []
    let warnings = []
    try {
      const nodeKey = pattern.toString()
      const node = this.nodes[nodeKey]
      const matchNodes = node ? { [nodeKey]: node } : this.nodes
      await Promise.all(
        reduce<ValidateNodeMap, ValidateNode>(
          matchNodes,
          (buf, validator, path) => {
            if (
              isFn(this.matchStrategy)
                ? this.matchStrategy(pattern, path)
                : pattern.match(path)
            ) {
              return buf.concat(
                validator(options).then(result => {
                  if (result.errors.length) {
                    errors = errors.concat({
                      path: path.toString(),
                      messages: result.errors
                    })
                  }
                  if (result.warnings.length) {
                    warnings = warnings.concat({
                      path: path.toString(),
                      messages: result.warnings
                    })
                  }
                })
              )
            }
            return buf
          },
          []
        )
      )
      return {
        errors,
        warnings
      }
    } catch (error) {
      log.error(error)
      return {
        errors,
        warnings
      }
    }
  }

  validate = (
    path?: FormPathPattern,
    options?: ValidateFieldOptions
  ): Promise<ValidateNodeResult> => {
    const pattern = FormPath.getPath(path || '*')
    return this.validateNodes(pattern, options)
  }

  register = (path: FormPathPattern, calculator: ValidateCalculator) => {
    const newPath = FormPath.getPath(path)
    this.nodes[newPath.toString()] = (options: ValidateFieldOptions) => {
      return new Promise((resolve, reject) => {
        let tmpResult: any
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
              tmpResult = payload
              return payload
            },
            payload => {
              tmpResult = payload
              return Promise.reject(payload)
            }
          )
        }
        Promise.resolve(calculator(validate)).then(
          () => {
            resolve(tmpResult)
          },
          () => {
            reject(tmpResult)
          }
        )
      })
    }
  }

  unregister = (path: FormPathPattern) => {
    const newPath = FormPath.getPath(path)
    delete this.nodes[newPath.toString()]
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
   * https://github.com/alibaba/formily/issues/215
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
