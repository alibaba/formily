import { connect } from '@formily/react-schema-renderer'
import { DatePicker } from '@alifd/meet'
import { mapStyledProps, mapTextComponent } from '../shared'

const transformMoment = (value, format = 'YYYY-MM-DD HH:mm:ss') => {
  return value && value.format ? value.format(format) : value
}

export const DatePickers = connect({
  getProps: mapStyledProps,
  getValueFromEvent(value) {
    return transformMoment(value, 'HH:mm:ss')
  },
  getComponent: mapTextComponent
})(DatePicker)




