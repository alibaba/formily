import { isArr, isEmpty, isFn } from '@formily/shared'
import Moment from 'moment'

const moment = (date: any, format?: string) => {
  return Moment(date?.toDate ? date.toDate() : date, format)
}

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
    if (isArr(format)) {
      const _format = format[i]
      if (isFn(_format)) {
        return _format(date)
      }
      if (isEmpty(_format)) {
        return date
      }
      return moment(date).format(_format)
    } else {
      if (isFn(format)) {
        return format(date)
      }
      if (isEmpty(format)) {
        return date
      }
      return moment(date).format(format)
    }
  }
  if (isArr(value)) {
    return value.map((val, index) => {
      return formatDate(val, format, index)
    })
  } else {
    return value ? formatDate(value, format) : value || placeholder
  }
}
