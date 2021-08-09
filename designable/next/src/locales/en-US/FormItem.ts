import { FormLayout } from './FormLayout'
import type { ISettingsLocale } from '../types'

export const FormItem: ISettingsLocale = {
  ...FormLayout,
  addonBefore: '前缀',
  addonAfter: '后缀',
  tooltip: '提示',
  asterisk: '星号',
  gridSpan: '网格跨列',
}
