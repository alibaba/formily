import { isArr, isFn, isEmpty } from '@formily/shared'
import moment from 'moment'

export const momentable = (value: any, format?: string) => {
  return Array.isArray(value)
    ? value.map((val) => moment(val, format))
    : value
    ? moment(value, format)
    : value
}

export const formatMomentValue = (
  value: any,
  format: any,
  placeholder?: string
): string | string[] => {
  const formatDate = (date: any, format: any, i = 0) => {
    if (!date) return placeholder
    const TIME_REG = /^(?:[01]\d|2[0-3]):[0-5]\d(:[0-5]\d)?$/
    let _format = format
    if (isArr(format)) {
      _format = format[i]
    }
    if (isFn(_format)) {
      return _format(date)
    }
    if (isEmpty(_format)) {
      return date
    }
    // moment '19:55:22' 下需要传入第二个参数
    if (TIME_REG.test(date)) {
      return moment(date, _format).format(_format)
    }
    return moment(date).format(_format)
  }
  if (isArr(value)) {
    return value.map((val, index) => {
      return formatDate(val, format, index)
    })
  } else {
    return value ? formatDate(value, format) : value || placeholder
  }
}
