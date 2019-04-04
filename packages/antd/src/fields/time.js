import { connect, registerFormField } from '@uform/react'
import moment from 'moment'
import { TimePicker } from 'antd'
import { mapStyledProps, mapTextComponent } from '../utils'

registerFormField(
  'time',
  connect({
    getValueFromEvent(_, value) {
      return value
    },
    getProps: props => {
      const { value, disabled = false, ...others } = props
      try {
        if (!disabled && value) {
          props.value = moment(value, 'HH:mm:ss')
        }
      } catch (e) {
        throw new Error(e)
      }
      mapStyledProps(props, others)
    },
    getComponent: mapTextComponent
  })(TimePicker)
)
