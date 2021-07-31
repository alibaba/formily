import {
  FormPath,
  each,
  lowerCase,
  globalThisPolyfill,
  merge as deepmerge,
  isFn,
  isStr,
} from '@formily/shared'
import {
  ValidatorFunctionResponse,
  ValidatorFunction,
  IRegistryFormats,
  IRegistryLocaleMessages,
  IRegistryLocales,
  IRegistryRules,
} from './types'

const getIn = FormPath.getIn

const self: any = globalThisPolyfill

const defaultLanguage = 'en'

const getBrowserlanguage = () => {
  /* istanbul ignore next */
  if (!self.navigator) {
    return defaultLanguage
  }
  return (
    self.navigator.browserlanguage || self.navigator.language || defaultLanguage
  )
}

const registry = {
  locales: {
    messages: {},
    language: getBrowserlanguage(),
  },
  formats: {},
  rules: {},
  template: null,
}

const getISOCode = (language: string) => {
  let isoCode = registry.locales.language
  const lang = lowerCase(language)
  if (registry.locales.messages[language]) {
    return language
  }
  each(
    registry.locales.messages,
    (messages: IRegistryLocaleMessages, key: string) => {
      const target = lowerCase(key)
      if (target.indexOf(lang) > -1 || lang.indexOf(target) > -1) {
        isoCode = key
        return false
      }
    }
  )
  return isoCode
}

export const getValidateLocaleIOSCode = getISOCode

export const setValidateLanguage = (lang: string) => {
  registry.locales.language = lang || defaultLanguage
}

export const getValidateLanguage = () => registry.locales.language

export const getValidateLocale = (path: string) => {
  const message = getIn(
    registry.locales.messages,
    `${getISOCode(registry.locales.language)}.${path}`
  )
  return message || getValidateLocale('pattern')
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

export const registerValidateMessageTemplateEngine = (
  template: (message: ValidatorFunctionResponse, context: any) => any
) => {
  registry.template = template
}
