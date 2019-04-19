import { connect, registerFormField } from '@uform/react'
import { TimePicker } from '@alifd/next'
import { mapStyledProps, mapTextComponent } from '../utils'

const transformMoment = (value, format = 'YYYY-MM-DD HH:mm:ss') => {
  return value && value.format ? value.format(format) : value
}

registerFormField(
  'time',
  connect({
    getProps: mapStyledProps,
    getValueFromEvent(value) {
      return transformMoment(value, 'HH:mm:ss')
    },
    getComponent: mapTextComponent
  })(TimePicker)
)
