import React from 'react'
import { connect, registerFormFields } from '../../../utils/baseForm'
import DataSourceEditor from '../editors/fieldAttrEditors/dataSourceEditor'

class Component extends React.Component {
  constructor(props) {
    super(props)
    this.handleFieldAttrChange = this.handleFieldAttrChange.bind(this)
  }

  handleFieldAttrChange() {
    return v => {
      const { onChange } = this.props
      onChange(v)
    }
  }

  render() {
    const { fieldStore = {}, value, UI } = this.props

    return (
      <div
        style={{
          marginBottom: 20
        }}
      >
        <DataSourceEditor
          UI={UI}
          fieldStore={fieldStore}
          value={value}
          onChange={this.handleFieldAttrChange()}
        />
      </div>
    )
  }
}

registerFormFields({
  dataSourceEditor: connect()(Component)
})

export default () => {}
