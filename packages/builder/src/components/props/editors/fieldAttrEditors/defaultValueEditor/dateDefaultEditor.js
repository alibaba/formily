import React, { Component } from 'react'
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
  <props.UI.DatePicker
    {...props}
    onChange={(v, vStr) => {
      props.onChange(vStr)
    }}
    popupAlign={'tr br'}
    style={{
      verticalAlign: 'top',
      marginLeft: 10,
      maxWidth: 90
    }}
  />
)

class Editor extends Component {
  render() {
    const { UI } = this.props
    return (
      <DefaultValueGenerator
        flag="date"
        ds={ds}
        {...this.props}
        customEditor={{
          now: <div />,
          future: (
            <UI.NumberPicker
              addonAfter="天"
              inputWidth={75}
              style={{
                verticalAlign: 'top',
                marginLeft: 10
              }}
            />
          ),
          past: (
            <UI.NumberPicker
              addonAfter="天"
              inputWidth={75}
              style={{
                verticalAlign: 'top',
                marginLeft: 10
              }}
            />
          ),
          specify: <DatePickerDefault UI={UI} />
        }}
      />
    )
  }
}

export default Editor
