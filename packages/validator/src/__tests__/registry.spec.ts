import { getValidateLocaleIOSCode } from '../'

test('getValidateLocaleIOSCode', () => {
  expect(getValidateLocaleIOSCode('zh-CN')).toEqual('zh-CN')
  expect(getValidateLocaleIOSCode('zh')).toEqual('zh')
  expect(getValidateLocaleIOSCode('ZH')).toEqual('zh')
  expect(getValidateLocaleIOSCode('cn')).toEqual('zh-CN')
  expect(getValidateLocaleIOSCode('en')).toEqual('en')
  expect(getValidateLocaleIOSCode('TW')).toEqual('zh-TW')
})
