import moment from 'moment'
import { connect, mapProps, mapReadPretty } from '@formily/react'
import { TimePicker as AntdTimePicker } from 'antd'
import { TimePickerProps, TimeRangePickerProps } from 'antd/lib/time-picker'
import { PreviewText } from '../preview-text'
import { formatMomentValue } from '../shared'

type FormilyTimePickerProps<PickerProps> = Exclude<
  PickerProps,
  'value' | 'onChange'
> & {
  value: string
  onChange: (value: string | string[]) => void
}

type ComposedTimePicker = React.FC<TimePickerProps> & {
  RangePicker?: React.FC<TimeRangePickerProps>
}

const mapTimeFormat = function() {
  return (props: FormilyTimePickerProps<TimePickerProps>): TimePickerProps => {
    const format = props['format'] || 'HH:mm:ss'
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

export const TimePicker: ComposedTimePicker = connect(
  AntdTimePicker,
  mapProps(mapTimeFormat()),
  mapReadPretty(PreviewText.TimePicker)
)

TimePicker.RangePicker = connect(
  AntdTimePicker.RangePicker,
  mapProps(mapTimeFormat()),
  mapReadPretty(PreviewText.TimeRangePicker)
)

export default TimePicker
