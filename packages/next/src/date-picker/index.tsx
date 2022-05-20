import moment from 'moment'
import { connect, mapProps, mapReadPretty } from '@formily/react'
import { DatePicker as NextDatePicker } from '@alifd/next'
import {
  DatePickerProps as NextDatePickerProps,
  MonthPickerProps,
  YearPickerProps,
  RangePickerProps,
} from '@alifd/next/lib/date-picker'
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

type ComposedDatePicker = React.FC<
  React.PropsWithChildren<NextDatePickerProps>
> & {
  RangePicker?: React.FC<React.PropsWithChildren<RangePickerProps>>
  MonthPicker?: React.FC<React.PropsWithChildren<MonthPickerProps>>
  YearPicker?: React.FC<React.PropsWithChildren<YearPickerProps>>
  WeekPicker?: React.FC<React.PropsWithChildren<NextDatePickerProps>>
}

const mapDateFormat = function (type?: 'month' | 'year' | 'week') {
  const getDefaultFormat = (props: DatePickerProps<NextDatePickerProps>) => {
    const _type = props['type'] || type
    if (_type === 'month') {
      return 'YYYY-MM'
    } else if (_type === 'year') {
      return 'YYYY'
    } else if (_type === 'week') {
      return 'YYYY-wo'
    }
    return 'YYYY-MM-DD'
  }

  return (props: any) => {
    const dateFormat = props['format'] || getDefaultFormat(props)

    let valueFormat = dateFormat
    if (props.showTime) {
      const timeFormat = props.showTime.format || 'HH:mm:ss'
      valueFormat = `${valueFormat} ${timeFormat}`
    }

    const onChange = props.onChange
    return {
      ...props,
      format: dateFormat,
      value: momentable(
        props.value,
        valueFormat === 'YYYY-wo' ? 'YYYY-w' : valueFormat
      ),
      onChange: (value: moment.Moment | moment.Moment[]) => {
        if (onChange) {
          onChange(formatMomentValue(value, valueFormat))
        }
      },
    }
  }
}

export const DatePicker: ComposedDatePicker = connect(
  NextDatePicker,
  mapProps(mapDateFormat(), mapSize, mapStatus),
  mapReadPretty(PreviewText.DatePicker)
)

DatePicker.RangePicker = connect(
  NextDatePicker.RangePicker,
  mapProps(mapDateFormat(), mapSize, mapStatus),
  mapReadPretty(PreviewText.DateRangePicker)
)

DatePicker.YearPicker = connect(
  NextDatePicker.YearPicker,
  mapProps(mapDateFormat('year'), mapSize, mapStatus),
  mapReadPretty(PreviewText.DatePicker)
)

DatePicker.MonthPicker = connect(
  NextDatePicker.MonthPicker,
  mapProps(mapDateFormat('month'), mapSize, mapStatus),
  mapReadPretty(PreviewText.DatePicker)
)

DatePicker.WeekPicker = connect(
  NextDatePicker.WeekPicker,
  mapProps(mapDateFormat('week'), mapSize, mapStatus),
  mapReadPretty(PreviewText.DatePicker)
)

export default DatePicker
