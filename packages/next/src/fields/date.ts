import { connect, registerFormField } from '@formily/react-schema-renderer'
import { DatePicker } from '@alifd/next'
import { mapStyledProps, mapTextComponent } from '../shared'

const { RangePicker, MonthPicker, YearPicker } = DatePicker

const transformMoment = (value, format = 'YYYY-MM-DD HH:mm:ss') => {
  return value && value.format ? value.format(format) : value
}

// showTime可以是非单纯的布尔值，里面还可以设置时间的format
const getFormatFromProps = (props) => {
  if (props.showTime) {
    if (typeof props.showTime === 'boolean') {
      return 'YYYY-MM-DD HH:mm:ss';
    } else if ('format' in props.showTime) {
      return `YYYY-MM-DD ${props.showTime.format}`;
    }
  } else {
    return 'YYYY-MM-DD'
  }
}

registerFormField(
  'date',
  connect({
    getValueFromEvent(value) {
      const props = this.getExtendsComponentProps()
      return transformMoment(value, getFormatFromProps(props))
    },
    getProps: mapStyledProps,
    getComponent: mapTextComponent
  })(DatePicker)
)

registerFormField(
  'daterange',
  connect({
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
  })(RangePicker)
)

registerFormField(
  'month',
  connect({
    getValueFromEvent(value) {
      return transformMoment(value)
    },
    getProps: mapStyledProps,
    getComponent: mapTextComponent
  })(MonthPicker)
)

registerFormField(
  'year',
  connect({
    getValueFromEvent(value) {
      return transformMoment(value)
    },
    getProps: mapStyledProps,
    getComponent: mapTextComponent
  })(YearPicker)
)
