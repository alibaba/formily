import React from 'react'
import { connect, registerFormField } from '@uform/react'
import moment from 'moment'
import { DatePicker as AntDatePicker } from 'antd'
import {
  mapStyledProps,
  mapTextComponent,
  StateLoading,
  compose,
  isStr,
  isArr
} from '../utils'

const {
  RangePicker: AntRangePicker,
  MonthPicker: AntMonthPicker
} = AntDatePicker

class AntYearPicker extends React.Component {
  public render() {
    return <AntDatePicker {...this.props} mode={'year'} />
  }
}

const DatePicker = StateLoading(AntDatePicker)
const RangePicker = StateLoading(AntRangePicker)
const MonthPicker = StateLoading(AntMonthPicker)
const YearPicker = StateLoading(AntYearPicker)

const transformMoment = (value, format = 'YYYY-MM-DD HH:mm:ss') => {
  return value && value.format ? value.format(format) : value
}

const mapMomentValue = props => {
  const { value, showTime = false, disabled = false } = props
  try {
    if (!disabled) {
      if (isStr(value) && value) {
        props.value = moment(
          value,
          showTime ? 'YYYY-MM-DD HH:mm:ss' : 'YYYY-MM-DD'
        )
      } else if (isArr(value) && value.length) {
        props.value = value.map(
          item =>
            (item &&
              moment(item, showTime ? 'YYYY-MM-DD HH:mm:ss' : 'YYYY-MM-DD')) ||
            ''
        )
      }
    }
  } catch (e) {
    throw new Error(e)
  }
  return props
}

registerFormField(
  'date',
  connect({
    getValueFromEvent(_, value) {
      const props = this.props || {}
      return transformMoment(
        value,
        props.showTime ? 'YYYY-MM-DD HH:mm:ss' : 'YYYY-MM-DD'
      )
    },
    getProps: compose(
      mapStyledProps,
      mapMomentValue
    ),
    getComponent: mapTextComponent
  })(DatePicker)
)

registerFormField(
  'daterange',
  connect({
    getValueFromEvent(_, [startDate, endDate]) {
      const props = this.props || {}
      const format = props.showTime ? 'YYYY-MM-DD HH:mm:ss' : 'YYYY-MM-DD'
      return [
        transformMoment(startDate, format),
        transformMoment(endDate, format)
      ]
    },
    getProps: compose(
      mapStyledProps,
      mapMomentValue
    ),
    getComponent: mapTextComponent
  })(RangePicker)
)

registerFormField(
  'month',
  connect({
    getValueFromEvent(_, value) {
      return transformMoment(value)
    },
    getProps: compose(
      mapStyledProps,
      mapMomentValue
    ),
    getComponent: mapTextComponent
  })(MonthPicker)
)

registerFormField(
  'year',
  connect({
    getValueFromEvent(_, value) {
      return transformMoment(value)
    },
    getProps: compose(
      mapStyledProps,
      mapMomentValue
    ),
    getComponent: mapTextComponent
  })(YearPicker)
)
