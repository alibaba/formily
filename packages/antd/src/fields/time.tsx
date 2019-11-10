import { connect, registerFormField } from '@uform/react'
import moment from 'moment'
import { TimePicker } from 'antd'
import { mapStyledProps, mapTextComponent } from '../utils'

registerFormField(
  'time',
  connect({
    getValueFromEvent(_, value) {
      return value ? value : null
    },
    getProps: (props, fieldProps) => {
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
