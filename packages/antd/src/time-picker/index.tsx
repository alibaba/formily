import moment from 'moment'
import { connect, mapProps, mapReadPretty } from '@formily/react'
import { TimePicker as AntdTimePicker } from 'antd'
import {
  TimePickerProps as AntdTimePickerProps,
  TimeRangePickerProps,
} from 'antd/lib/time-picker'
import { PreviewText } from '../preview-text'
import { formatMomentValue, momentable } from '../__builtins__'

type ComposedTimePicker = React.FC<AntdTimePickerProps> & {
  RangePicker?: React.FC<TimeRangePickerProps>
}

const mapTimeFormat = function () {
  return (props: any) => {
    const format = props['format'] || 'HH:mm:ss'
    const onChange = props.onChange
    return {
      ...props,
      format,
      value: momentable(props.value, format),
      onChange: (value: moment.Moment | moment.Moment[]) => {
        if (onChange) {
          onChange(formatMomentValue(value, format))
        }
      },
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
