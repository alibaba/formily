import { transformComponent } from '../__builtins__/shared'
import { connect, mapProps, mapReadPretty } from '@formily/vue'
import { PreviewText } from '../preview-text'
import type { TimePicker as ElTimePickerProps } from 'element-ui'
import { TimePicker as ElTimePicker } from 'element-ui'

export type TimePickerProps = ElTimePickerProps

const TransformElTimePicker = transformComponent<TimePickerProps>(
  ElTimePicker,
  {
    change: 'input',
  }
)

export const TimePicker = connect(
  TransformElTimePicker,
  mapProps({ readOnly: 'readonly' }),
  mapReadPretty(PreviewText.TimePicker)
)

export default TimePicker
