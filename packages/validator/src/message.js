import { getIn, each } from './utils'
import locales from './locale'

const self = this || global || window

const getBrowserlanguage = () => {
  if (!self.navigator) return 'en'
  return self.navigator.browserlanguage || self.navigator.language || 'en'
}

const LOCALE = {
  messages: {},
  lang: getBrowserlanguage()
}

const getMatchLang = lang => {
  let find = LOCALE.lang
  each(LOCALE.messages, (messages, key) => {
    if (key.indexOf(lang) > -1 || String(lang).indexOf(key) > -1) {
      find = key
      return false
    }
  })
  return find
}

export const setLocale = locale => {
  Object.assign(LOCALE.messages, locale)
}

export const setLanguage = lang => {
  LOCALE.lang = lang
}

export const getMessage = path => {
  return getIn(LOCALE.messages, `${getMatchLang(LOCALE.lang)}.${path}`)
}

setLocale(locales)
