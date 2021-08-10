import type { ISettingsLocale } from '../types'

const CommonDatePickerLocale: ISettingsLocale = {
  format: {
    title: 'Format',
    placeholder: 'e.g. YYYY-MM-DD',
  },
  showTime: 'Show Time',
  resetTime: 'Reset time on selection',
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
