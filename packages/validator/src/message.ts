import {
  FormPath,
  each,
  globalThisPolyfill,
  merge as deepmerge,
  log
} from '@formily/shared'
import locales from './locale'

const getIn = FormPath.getIn

const self: any = globalThisPolyfill

export interface ILocaleMessages {
  [key: string]: string | ILocaleMessages
}

export interface ILocales {
  [lang: string]: ILocaleMessages
}

const getBrowserlanguage = () => {
  if (!self.navigator) {
    return 'en'
  }
  return self.navigator.browserlanguage || self.navigator.language || 'en'
}

const LOCALE = {
  messages: {},
  lang: getBrowserlanguage()
}

const getMatchLang = (lang: string) => {
  let find = LOCALE.lang
  each(LOCALE.messages, (messages: ILocaleMessages, key: string) => {
    if (key.indexOf(lang) > -1 || String(lang).indexOf(key) > -1) {
      find = key
      return false
    }
  })
  return find
}

export const setValidationLocale = (locale: ILocales) => {
  LOCALE.messages = deepmerge(LOCALE.messages, locale)
}

export const setLocale = setValidationLocale

export const setValidationLanguage = (lang: string) => {
  LOCALE.lang = lang
}

export const setLanguage = setValidationLanguage

export const getMessage = (path: string) => {
  const message = getIn(LOCALE.messages, `${getMatchLang(LOCALE.lang)}.${path}`)
  if (!message) {
    log.error(
      `field is not valid,but not found ${path} error message. Please set the language pack first through setValidationLocale`
    )
  }
  return message || 'Field is invalid'
}

setValidationLocale(locales)
