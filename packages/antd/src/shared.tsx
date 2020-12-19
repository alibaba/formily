import { isArr, isFn } from '@formily/shared'

export const formatMomentValue = (
  value: any,
  format: any
): string | string[] => {
  const formatDate = (date: any, format: any, i = 0) => {
    if (!date) return
    if (isArr(format)) {
      const _format = format[i]
      if (isFn(_format)) {
        return _format(date)
      }
      return date?.format ? date.format(_format) : date
    } else {
      if (isFn(format)) {
        return format(date)
      }
      return date?.format ? date.format(format) : date
    }
  }
  if (isArr(value)) {
    return value.map((val, index) => {
      return formatDate(val, format, index)
    })
  } else {
    return formatDate(value, format)
  }
}
