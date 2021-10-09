import {
  getValidateLocaleIOSCode,
  getLocaleByPath,
  getValidateLocale,
  setValidateLanguage,
} from '../'
import locale from '../locale'

test('getValidateLocaleIOSCode', () => {
  expect(getValidateLocaleIOSCode('zh-CN')).toEqual('zh-CN')
  expect(getValidateLocaleIOSCode('zh')).toEqual('zh')
  expect(getValidateLocaleIOSCode('ZH')).toEqual('zh')
  expect(getValidateLocaleIOSCode('cn')).toEqual('zh-CN')
  expect(getValidateLocaleIOSCode('en')).toEqual('en')
  expect(getValidateLocaleIOSCode('TW')).toEqual('zh-TW')
})

test('getLocaleByPath', () => {
  expect(getLocaleByPath('pattern', 'vi')).toEqual(locale.en.pattern)
  expect(getLocaleByPath('pattern')).toEqual(locale.en.pattern)
})

test('getValidateLocale', () => {
  setValidateLanguage('vi')
  expect(getValidateLocale('pattern')).toEqual(locale.en.pattern)
})
