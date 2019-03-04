import React, { Component } from 'react'
import { connect, registerFormFields } from '../../../utils/baseForm'
import DefaultValueEditor from '../editors/fieldAttrEditors/defaultValueEditor/index'

class defaultValueCascader extends Component {
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
      <DefaultValueEditor
        store={fieldStore}
        value={value}
        onChange={this.handleFieldAttrChange()}
        UI={UI}
      />
    )
  }
}

registerFormFields({
  defaultValueCascader: connect()(defaultValueCascader)
})

export default () => {}
