import React, { Component } from 'react'
import DefaultValueGenerator from './defaultValueGenerator'

const ds = [
  {
    label: '当前时间',
    value: 'now'
  },
  {
    label: '固定时间',
    value: 'specify'
  },
  {
    label: '从url获取',
    value: 'url'
  }
]

const DatePickerDefault = props => (
  <props.UI.DatePicker
    showTime
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
        flag='time'
        ds={ds}
        {...this.props}
        customEditor={{
          now: <div />,
          specify: <DatePickerDefault />
        }}
      />
    )
  }
}

export default Editor
