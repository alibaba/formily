import React from 'react'
import { connect, registerFormField } from '@uform/react-schema-renderer'
import moment from 'moment'
import { DatePicker } from 'antd'
import {
  mapStyledProps,
  mapTextComponent,
  compose,
  isStr,
  isArr
} from '../shared'

const { RangePicker, WeekPicker, MonthPicker } = DatePicker

class YearPicker extends React.Component {
  public render() {
    return <DatePicker {...this.props} mode={'year'} />
  }
}

const transformMoment = (value, format = 'YYYY-MM-DD HH:mm:ss') => {
  if (value === "") return undefined
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
  'week',
  connect({
    getValueFromEvent(_, value) {
      return transformMoment(value, 'gggg-wo')
    },
    getProps: compose(
      mapStyledProps,
      props => {
        if (isStr(props.value) && props.value) {
          const parsed = props.value.match(/\D*(\d+)\D*(\d+)\D*/) || [
            '',
            '',
            ''
          ]
          props.value = moment(parsed[1], 'YYYY').add(parsed[2] - 1, 'weeks')
        }
        return props
      }
    ),
    getComponent: mapTextComponent
  })(WeekPicker)
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
