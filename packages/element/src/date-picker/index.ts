import { getComponentByTag } from '../__builtins__/shared'
import { connect, mapProps } from '@formily/vue'

import type { DatePicker as ElDatePickerProps } from 'element-ui'
import { DatePicker as ElDatePicker } from 'element-ui'

export type DatePickerProps = ElDatePickerProps

const TransformElDatePicker = getComponentByTag<DatePickerProps>(ElDatePicker, {
  change: 'input',
})

export const DatePicker = connect(
  TransformElDatePicker,
  mapProps({ readOnly: 'readonly' })
)
