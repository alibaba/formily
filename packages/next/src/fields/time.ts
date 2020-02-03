import { connect, registerFormField } from '@formily/react-schema-renderer'
import { TimePicker } from '@alifd/next'
import { mapStyledProps, mapTextComponent } from '../shared'

const transformMoment = (value, format) => {
  return value && value.format ? value.format(format) : value
}

registerFormField(
  'time',
  connect({
    getProps: mapStyledProps,
    getValueFromEvent(value) {
      const props = this.getExtendsComponentProps()
      const format = props.format || 'HH:mm:ss'
      return transformMoment(value, format)
    },
    getComponent: mapTextComponent
  })(TimePicker)
)
