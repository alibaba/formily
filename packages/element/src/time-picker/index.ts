import { getComponentByTag } from '../__builtins__/shared'
import { connect, mapProps } from '@formily/vue'

import type { TimePicker as ElTimePickerProps } from 'element-ui'
import { TimePicker as ElTimePicker } from 'element-ui'

export type TimePickerProps = ElTimePickerProps

const TransformElTimePicker = getComponentByTag<TimePickerProps>(ElTimePicker, {
  change: 'input',
})

export const TimePicker = connect(
  TransformElTimePicker,
  mapProps({ readOnly: 'readonly' })
)
