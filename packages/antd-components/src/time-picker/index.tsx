import { connect } from '@formily/react-schema-renderer'
import moment from 'moment'
import { TimePicker as AntdTimePicker } from 'antd'
import { mapStyledProps, mapTextComponent } from '../shared'

export const TimePicker = connect({
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
})(AntdTimePicker)

export default TimePicker
