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
  handleChange = v => {
    const { store } = this.props
    store.setAttr('default', v)
  }

  render() {
    const { store, UI } = this.props
    const { enums } = store

    return (
      <DefaultValueGenerator
        flag="array"
        ds={ds}
        {...this.props}
        customEditor={{
          specify: (
            <div>
              <UI.Checkbox.Group dataSource={enums || []} />
            </div>
          )
        }}
      />
    )
  }
}

export default Editor
