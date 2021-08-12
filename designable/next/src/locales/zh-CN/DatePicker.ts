import type { ISettingsLocale } from '../types'

const CommonDatePickerLocale: ISettingsLocale = {
  format: {
    title: '格式',
    placeholder: 'YYYY-MM-DD',
  },
  showTime: '使用时间控件',
  resetTime: '选择时重置时间',
}
export const DatePicker: ISettingsLocale = {
  ...CommonDatePickerLocale,
}

DatePicker.RangePicker = {
  ...CommonDatePickerLocale,
  type: {
    title: '类型',
    dataSource: ['日', '月', '年'],
  },
}
