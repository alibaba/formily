import { connect } from '@formily/react-schema-renderer'
import { DatePicker as MeetDatePicker } from '@alifd/meet'
import { mapStyledProps, mapTextComponent } from '../shared'

const transformMoment = (value, format = 'YYYY-MM-DD HH:mm:ss') => {
  return value && value.format ? value.format(format) : value
}

export const DatePicker = connect({
  getProps: mapStyledProps,
  getValueFromEvent(value) {
    return transformMoment(value, 'HH:mm:ss')
  },
  getComponent: mapTextComponent
})(MeetDatePicker)




