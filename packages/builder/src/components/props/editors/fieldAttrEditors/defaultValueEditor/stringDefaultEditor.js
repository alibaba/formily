import React, { Component } from 'react'
import DefaultValueGenerator from './defaultValueGenerator'

const ds = [
  {
    label: '手动输入',
    value: 'specify'
  },
  {
    label: '从url获取',
    value: 'url'
  }
]

class Editor extends Component {
  render() {
    const { UI } = this.props

    return (
      <DefaultValueGenerator
        flag="string"
        ds={ds}
        {...this.props}
        customEditor={{
          specify: (
            <UI.Input
              placeholder="请输入默认值"
              style={{
                verticalAlign: 'top'
              }}
            />
          )
        }}
      />
    )
  }
}

export default Editor
