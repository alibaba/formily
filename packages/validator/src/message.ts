import { getIn, each, globalThisPolyfill } from './utils'
import locales from './locale'

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

export const setLocale = (locale: ILocales) => {
  Object.assign(LOCALE.messages, locale)
}

export const setLanguage = (lang: string) => {
  LOCALE.lang = lang
}

export const getMessage = (path: string) => {
  return (
    getIn(LOCALE.messages, `${getMatchLang(LOCALE.lang)}.${path}`) ||
    'field is not valid,but not found error message.'
  )
}

setLocale(locales)
