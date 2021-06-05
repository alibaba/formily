import { getComponentByTag } from '../shared'
import { connect, mapProps } from '@formily/vue'

import type { TimePicker as ElTimePickerProps } from 'element-ui'

export type TimePickerProps = ElTimePickerProps

const ElTimePicker = getComponentByTag<TimePickerProps>('el-time-picker', {
  change: 'input',
})

export const TimePicker = connect(
  ElTimePicker,
  mapProps({ readOnly: 'readonly' })
)
