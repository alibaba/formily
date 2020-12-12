import moment from 'moment'
import { connect, mapProps, mapReadPretty } from '@formily/react'
import { DatePicker as AntdDatePicker } from 'antd'
import { DatePickerProps, RangePickerProps } from 'antd/lib/date-picker'
import { PreviewText } from '../preview-text'
import { formatMomentValue } from '../shared'
type FormilyDatePickerProps<PickerProps> = Exclude<
  PickerProps,
  'value' | 'onChange'
> & {
  value: string
  onChange: (value: string | string[]) => void
}

type ComposedDatePicker = React.FC<DatePickerProps> & {
  RangePicker?: React.FC<RangePickerProps>
}

const mapDateFormat = function() {
  const getDefaultFormat = (props: FormilyDatePickerProps<DatePickerProps>) => {
    if (props['picker'] === 'month') {
      return 'YYYY-MM'
    } else if (props['picker'] === 'quarter') {
      return 'YYYY-\\QQ'
    } else if (props['picker'] === 'year') {
      return 'YYYY'
    } else if (props['picker'] === 'week') {
      return 'YYYY-wo'
    }
    return props['showTime'] ? 'YYYY-MM-DD HH:mm:ss' : 'YYYY-MM-DD'
  }

  return (props: FormilyDatePickerProps<DatePickerProps>): DatePickerProps => {
    const format = props['format'] || getDefaultFormat(props)
    return {
      ...props,
      format,
      value: moment(props.value),
      onChange: (value: moment.Moment | moment.Moment[]) => {
        if (props.onChange) {
          props.onChange(formatMomentValue(value, format))
        }
      }
    }
  }
}

export const DatePicker: ComposedDatePicker = connect(
  AntdDatePicker,
  mapProps(mapDateFormat()),
  mapReadPretty(PreviewText.DatePicker)
)

DatePicker.RangePicker = connect(
  AntdDatePicker.RangePicker,
  mapProps(mapDateFormat()),
  mapReadPretty(PreviewText.DateRangePicker)
)

export default DatePicker
