import React, { Component } from 'react'
import { Switch } from '@alifd/next'
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
    return (
      <DefaultValueGenerator
        flag='switch'
        ds={ds}
        {...this.props}
        customEditor={{
          specify: <Switch style={{ marginLeft: 20 }} />
        }}
      />
    )
  }
}

export default Editor
