import type { ISettingsLocale } from '../types'

const CommonDatePickerLocale: ISettingsLocale = {
  format: {
    title: 'Format',
    placeholder: 'Such as yyyy-mm-dd',
  },
  showTime: 'Use time control',
  resetTime: 'Reset time on selection',
}
export const DatePicker: ISettingsLocale = {
  ...CommonDatePickerLocale,
}

DatePicker.RangePicker = {
  ...CommonDatePickerLocale,
  type: {
    title: 'Type',
    dataSource: ['Day', 'Month', 'Year'],
  },
}
