import { connect } from '@formily/react-schema-renderer'
import { TimePicker as NextTimePicker } from '@alifd/next'
import { mapStyledProps, mapTextComponent } from '../shared'

const transformMoment = (value, format) => {
  return value && value.format ? value.format(format) : value
}

export const TimePicker = connect({
  getProps: mapStyledProps,
  getValueFromEvent(value) {
    const format = this.props.format || 'HH:mm:ss'
    return transformMoment(value, format)
  },
  getComponent: mapTextComponent
})(NextTimePicker)

export default TimePicker