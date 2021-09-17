import { transformComponent } from '../__builtins__/shared'
import { connect, mapProps, mapReadPretty } from '@formily/vue'

import type { DatePicker as ElDatePickerProps } from 'element-ui'
import { DatePicker as ElDatePicker } from 'element-ui'
import { PreviewText } from '../preview-text'

export type DatePickerProps = ElDatePickerProps

const TransformElDatePicker = transformComponent<DatePickerProps>(
  ElDatePicker,
  {
    change: 'input',
  }
)

const getDefaultFormat = (props, formatType = 'format') => {
  const type = props.type

  if (type === 'week' && formatType === 'format') {
    return 'yyyy-WW'
  } else if (type === 'month') {
    return 'yyyy-MM'
  } else if (type === 'year') {
    return 'yyyy'
  } else if (type === 'datetime' || type === 'datetimerange') {
    return 'yyyy-MM-dd HH:mm:ss'
  }

  return 'yyyy-MM-dd'
}

export const DatePicker = connect(
  TransformElDatePicker,
  mapProps({ readOnly: 'readonly' }, (props) => {
    return {
      ...props,
      format: props.format || getDefaultFormat(props),
      valueFormat: props.valueFormat || getDefaultFormat(props, 'valueFormat'),
    }
  }),
  mapReadPretty(PreviewText.DatePicker)
)

export default DatePicker
