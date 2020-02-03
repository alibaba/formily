import { connect, registerFormField } from '@formily/react-schema-renderer'
import moment from 'moment'
import { TimePicker } from 'antd'
import { mapStyledProps, mapTextComponent } from '../shared'

registerFormField(
  'time',
  connect({
    getValueFromEvent(_, value) {
      return value
    },
    getProps: (props: any, fieldProps) => {
      const { value, disabled = false } = props
      try {
        if (!disabled && value) {
          props.value = moment(value, 'HH:mm:ss')
        }
      } catch (e) {
        throw new Error(e)
      }
      mapStyledProps(props, fieldProps)
    },
    getComponent: mapTextComponent
  })(TimePicker)
)
