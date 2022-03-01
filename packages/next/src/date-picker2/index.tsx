import moment from 'moment'
import { connect, mapProps, mapReadPretty } from '@formily/react'
import { DatePicker2 as NextDatePicker } from '@alifd/next'
import {
  DatePickerProps as NextDatePickerProps,
  RangePickerProps,
} from '@alifd/next/lib/date-picker2'
import { PreviewText } from '../preview-text'
import {
  formatMomentValue,
  momentable,
  mapSize,
  mapStatus,
} from '../__builtins__'

type DatePickerProps<PickerProps> = Exclude<
  PickerProps,
  'value' | 'onChange'
> & {
  value: string
  onChange: (value: string | string[]) => void
}

type ComposedDatePicker = React.FC<NextDatePickerProps> & {
  RangePicker?: React.FC<RangePickerProps>
  MonthPicker?: React.FC<NextDatePickerProps>
  YearPicker?: React.FC<NextDatePickerProps>
  WeekPicker?: React.FC<NextDatePickerProps>
  QuarterPicker?: React.FC<NextDatePickerProps>
}

const mapDateFormat = function (type?: 'month' | 'year' | 'week' | 'quarter') {
  const getDefaultFormat = (props: DatePickerProps<NextDatePickerProps>) => {
    const _type = props['type'] || type
    if (_type === 'month') {
      return 'YYYY-MM'
    } else if (_type === 'quarter') {
      return 'YYYY-\\QQ'
    } else if (_type === 'year') {
      return 'YYYY'
    } else if (_type === 'week') {
      return 'YYYY-wo'
    }
    return props['showTime'] ? 'YYYY-MM-DD HH:mm:ss' : 'YYYY-MM-DD'
  }

  return (props: any) => {
    const format = props['format'] || getDefaultFormat(props)
    const onChange = props.onChange
    return {
      ...props,
      format,
      value: momentable(props.value, format === 'YYYY-wo' ? 'YYYY-w' : format),
      onChange: (value: moment.Moment | moment.Moment[]) => {
        if (onChange) {
          onChange(formatMomentValue(value, format))
        }
      },
    }
  }
}

export const DatePicker2: ComposedDatePicker = connect(
  NextDatePicker,
  mapProps(mapDateFormat(), mapSize, mapStatus),
  mapReadPretty(PreviewText.DatePicker)
)

DatePicker2.RangePicker = connect(
  NextDatePicker.RangePicker,
  mapProps(mapDateFormat(), mapSize, mapStatus),
  mapReadPretty(PreviewText.DateRangePicker)
)

DatePicker2.YearPicker = connect(
  NextDatePicker.YearPicker,
  mapProps(mapDateFormat('year'), mapSize, mapStatus),
  mapReadPretty(PreviewText.DatePicker)
)

DatePicker2.MonthPicker = connect(
  NextDatePicker.MonthPicker,
  mapProps(mapDateFormat('month'), mapSize, mapStatus),
  mapReadPretty(PreviewText.DatePicker)
)

DatePicker2.WeekPicker = connect(
  NextDatePicker.WeekPicker,
  mapProps(mapDateFormat('week'), mapSize, mapStatus),
  mapReadPretty(PreviewText.DatePicker)
)

DatePicker2.QuarterPicker = connect(
  NextDatePicker.QuarterPicker,
  mapProps(mapDateFormat('quarter'), mapSize, mapStatus),
  mapReadPretty(PreviewText.DatePicker)
)

export default DatePicker2
