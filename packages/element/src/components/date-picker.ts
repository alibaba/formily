import { getComponentByTag } from '../shared'
import { connect, mapProps } from '@formily/vue'

import type { DatePicker as ElDatePickerProps } from 'element-ui'

export type DatePickerProps = ElDatePickerProps

const ElDatePicker = getComponentByTag<DatePickerProps>('el-date-picker', {
  change: 'input',
})

export const DatePicker = connect(
  ElDatePicker,
  mapProps({ readOnly: 'readonly' })
)
