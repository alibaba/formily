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
  <props.UI.TimePicker
    onChange={(v, vStr) => {
      if (vStr) {
        props.onChange(vStr)
      } else {
        props.onChange(v.format('HH:mm:ss'))
      }
    }}
    style={{
      verticalAlign: 'top',
      marginLeft: 5
    }}
  />
)

class Editor extends Component {
  render() {
    const { UI } = this.props
    return (
      <DefaultValueGenerator
        flag="time"
        ds={ds}
        {...this.props}
        customEditor={{
          now: <div />,
          specify: <DatePickerDefault UI={UI} />
        }}
      />
    )
  }
}

export default Editor
