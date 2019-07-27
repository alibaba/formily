import React, { Component } from 'react'
import DefaultValueGenerator from './defaultValueGenerator'

const ds = [
  {
    label: '当前月',
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
    label: '固定月',
    value: 'specify'
  },
  {
    label: '从url获取',
    value: 'url'
  }
]

const MonthPickerDefault = props => {
  const { UI } = props
  const { MonthPicker } = UI.DatePicker
  return (
    <MonthPicker
      onChange={(v, vStr) => {
        props.onChange(vStr)
      }}
      style={{
        verticalAlign: 'top',
        marginLeft: 20
      }}
    />
  )
}

class Editor extends Component {
  render() {
    const { UI } = this.props
    return (
      <DefaultValueGenerator
        flag="month"
        ds={ds}
        {...this.props}
        customEditor={{
          now: <div />,
          future: (
            <UI.NumberPicker
              addonAfter="月"
              inputWidth={100}
              style={{
                verticalAlign: 'top',
                marginLeft: 20
              }}
            />
          ),
          past: (
            <UI.NumberPicker
              addonAfter="月"
              inputWidth={100}
              style={{
                verticalAlign: 'top',
                marginLeft: 20
              }}
            />
          ),
          specify: <MonthPickerDefault />
        }}
      />
    )
  }
}

export default Editor
