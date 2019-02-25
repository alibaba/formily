import React, { Component } from 'react'
import { NumberPicker, DatePicker } from '@alifd/next'
import DefaultValueGenerator from './defaultValueGenerator'

const ds = [
  {
    label: '当前日期',
    value: 'now'
  },
  {
    label: '未来',
    value: 'future'
  },
  {
    label: '过去',
    value: 'past'
  },
  {
    label: '固定日期',
    value: 'specify'
  },
  {
    label: '从url获取',
    value: 'url'
  }
]

const DatePickerDefault = props => (
  <DatePicker
    {...props}
    onChange={(v, vStr) => {
      props.onChange(vStr)
    }}
    style={{
      verticalAlign: 'top',
      marginLeft: 20
    }}
  />
)

class Editor extends Component {
  render() {
    return (
      <DefaultValueGenerator
        flag='date'
        ds={ds}
        {...this.props}
        customEditor={{
          now: <div />,
          future: (
            <NumberPicker
              addonAfter='天'
              inputWidth={100}
              style={{
                verticalAlign: 'top',
                marginLeft: 20
              }}
            />
          ),
          past: (
            <NumberPicker
              addonAfter='天'
              inputWidth={100}
              style={{
                verticalAlign: 'top',
                marginLeft: 20
              }}
            />
          ),
          specify: <DatePickerDefault />
        }}
      />
    )
  }
}

export default Editor
