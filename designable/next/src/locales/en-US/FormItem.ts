import { FormLayout } from './FormLayout'
import type { ISettingsLocale } from '../types'

export const FormItem: ISettingsLocale = {
  ...FormLayout,
  addonBefore: 'Prefix',
  addonAfter: 'Suffix',
  tooltip: 'Tips',
  asterisk: 'Asterisk',
  gridSpan: 'Grid cross column',
}
