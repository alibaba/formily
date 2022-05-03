import moment from 'moment'
import { connect, mapProps, mapReadPretty } from '@formily/react'
import { TimePicker2 as NextTimePicker2 } from '@alifd/next'
import {
  TimePickerProps,
  RangePickerProps,
} from '@alifd/next/types/time-picker2'
import { PreviewText } from '../preview-text'
import {
  formatMomentValue,
  momentable,
  mapSize,
  mapStatus,
} from '../__builtins__'

type ComposedTimePicker = React.FC<React.PropsWithChildren<TimePickerProps>> & {
  RangePicker?: React.FC<React.PropsWithChildren<RangePickerProps>>
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

export const TimePicker2: ComposedTimePicker = connect(
  NextTimePicker2,
  mapProps(mapTimeFormat(), mapSize, mapStatus),
  mapReadPretty(PreviewText.TimePicker2)
)

TimePicker2.RangePicker = connect(
  NextTimePicker2.RangePicker,
  mapProps(mapTimeFormat(), mapSize, mapStatus),
  mapReadPretty(PreviewText.TimeRangePicker2)
)

export default TimePicker2
