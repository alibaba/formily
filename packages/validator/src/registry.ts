import {
  FormPath,
  each,
  globalThisPolyfill,
  merge as deepmerge,
  isFn,
  isStr
} from '@formily/shared'
import { ValidatorFunctionResponse, ValidatorFunction } from './types'

export interface IRegistryLocaleMessages {
  [key: string]: string | IRegistryLocaleMessages
}

export interface IRegistryLocales {
  [language: string]: IRegistryLocaleMessages
}

export interface IRegistryRules<Context = any> {
  [key: string]: ValidatorFunction<Context>
}

export interface IRegistryFormats {
  [key: string]: string | RegExp
}

const getIn = FormPath.getIn

const self: any = globalThisPolyfill

const getBrowserlanguage = () => {
  /* istanbul ignore next */ 
  if (!self.navigator) {
    return 'en'
  }
  return self.navigator.browserlanguage || self.navigator.language || 'en'
}

const registry = {
  locales: {
    messages: {},
    langugage: getBrowserlanguage()
  },
  formats: {},
  rules: {},
  template: null
}

const getISOCode = (langugage: string) => {
  let isoCode = registry.locales.langugage
  each(
    registry.locales.messages,
    (messages: IRegistryLocaleMessages, key: string) => {
      if (key.indexOf(langugage) > -1 || String(langugage).indexOf(key) > -1) {
        isoCode = key
        return false
      }
    }
  )
  return isoCode
}

export const setValidateLanguage = (lang: string) => {
  registry.locales.langugage = lang
}

export const getValidateLanguage = () => registry.locales.langugage

export const getValidateLocale = (path: string) => {
  const message = getIn(
    registry.locales.messages,
    `${getISOCode(registry.locales.langugage)}.${path}`
  )
  return message || 'Field is invalid'
}

export const getValidateMessageTemplateEngine = () => registry.template

export const getValidateFormats = (key?: string) =>
  key ? registry.formats[key] : registry.formats

export const getValidateRules = <T>(
  key?: T
): T extends string
  ? ValidatorFunction
  : { [key: string]: ValidatorFunction } =>
  key ? registry.rules[key as any] : registry.rules

export const registerValidateLocale = (locale: IRegistryLocales) => {
  registry.locales.messages = deepmerge(registry.locales.messages, locale)
}

export const registerValidateRules = (rules: IRegistryRules) => {
  each(rules, (rule, key) => {
    if (isFn(rule)) {
      registry.rules[key] = rule
    }
  })
}

export const registerValidateFormats = (formats: IRegistryFormats) => {
  each(formats, (pattern, key) => {
    if (isStr(pattern) || pattern instanceof RegExp) {
      registry.formats[key] = new RegExp(pattern)
    }
  })
}

export const registerValidateMessageTemplateEnigne = (
  template: (message: ValidatorFunctionResponse, context: any) => any
) => {
  registry.template = template
}
