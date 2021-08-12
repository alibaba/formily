import type { ISettingsLocale } from '../types'

const CommonDatePickerLocale: ISettingsLocale = {
  format: {
    title: 'Format',
    placeholder: 'YYYY-MM-DD',
  },
  showTime: 'Show Time',
  resetTime: 'Reset On Select',
}
export const DatePicker: ISettingsLocale = {
  ...CommonDatePickerLocale,
}

DatePicker.RangePicker = {
  ...CommonDatePickerLocale,
  type: {
    title: 'Type',
    dataSource: ['Date', 'Month', 'Year'],
  },
}
