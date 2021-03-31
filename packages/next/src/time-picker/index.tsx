import moment from 'moment'
import { connect, mapProps, mapReadPretty } from '@formily/react'
import { TimePicker as NextTimePicker } from '@alifd/next'
import { TimePickerProps } from '@alifd/next/lib/time-picker'
import { PreviewText } from '../preview-text'
import {
  formatMomentValue,
  momentable,
  mapSize,
  mapStatus,
} from '../__builtins__'

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

export const TimePicker: React.FC<TimePickerProps> = connect(
  NextTimePicker,
  mapProps(mapTimeFormat(), mapSize, mapStatus),
  mapReadPretty(PreviewText.TimePicker)
)

export default TimePicker
