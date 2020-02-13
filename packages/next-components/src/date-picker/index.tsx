import { connect } from '@formily/react-schema-renderer'
import { DatePicker as NextDatePicker } from '@alifd/next'
import { mapStyledProps, mapTextComponent } from '../shared'

const transformMoment = (value, format = 'YYYY-MM-DD HH:mm:ss') => {
  return value && value.format ? value.format(format) : value
}

// showTime可以是非单纯的布尔值，里面还可以设置时间的format
const getFormatFromProps = props => {
  if (props.showTime) {
    if (typeof props.showTime === 'boolean') {
      return 'YYYY-MM-DD HH:mm:ss'
    } else if ('format' in props.showTime) {
      return `YYYY-MM-DD ${props.showTime.format}`
    }
  } else {
    return 'YYYY-MM-DD'
  }
}

export const DatePicker = connect({
  getValueFromEvent(value) {
    const props = this.getExtendsComponentProps()
    return transformMoment(value, getFormatFromProps(props))
  },
  getProps: mapStyledProps,
  getComponent: mapTextComponent
})(NextDatePicker)

DatePicker.RangePicker = connect({
  getValueFromEvent([startDate, endDate]) {
    const props = this.getExtendsComponentProps()
    const format = getFormatFromProps(props)
    return [
      transformMoment(startDate, format),
      transformMoment(endDate, format)
    ]
  },
  getProps: mapStyledProps,
  getComponent: mapTextComponent
})(NextDatePicker.RangePicker)

DatePicker.MonthPicker = connect({
  getValueFromEvent(value) {
    return transformMoment(value)
  },
  getProps: mapStyledProps,
  getComponent: mapTextComponent
})(NextDatePicker.MonthPicker)

DatePicker.YearPicker = connect({
  getValueFromEvent(value) {
    return transformMoment(value,'YYYY')
  },
  getProps: mapStyledProps,
  getComponent: mapTextComponent
})(NextDatePicker.YearPicker)

export default DatePicker