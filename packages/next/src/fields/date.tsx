import { connect, registerFormField } from '@uform/react'
import { DatePicker } from '@alifd/next'
import { mapStyledProps, mapTextComponent } from '../utils'

const { RangePicker, MonthPicker, YearPicker } = DatePicker

const transformMoment = (value, format = 'YYYY-MM-DD HH:mm:ss') => {
  return value && value.format ? value.format(format) : value
}

registerFormField(
  'date',
  connect({
    getValueFromEvent(value) {
      const props = this.props || {}
      return transformMoment(
        value,
        props.showTime ? 'YYYY-MM-DD HH:mm:ss' : 'YYYY-MM-DD'
      )
    },
    getProps: mapStyledProps,
    getComponent: mapTextComponent
  })(DatePicker)
)

registerFormField(
  'daterange',
  connect({
    getValueFromEvent([startDate, endDate]) {
      const props = this.props || {}
      const format = props.showTime ? 'YYYY-MM-DD HH:mm:ss' : 'YYYY-MM-DD'
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
