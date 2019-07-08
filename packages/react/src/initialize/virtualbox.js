import React from 'react'
import { registerFormField } from '../shared/core'
import { registerVirtualboxFlag } from '../utils'

export default () => {
  registerVirtualboxFlag('slot')
  registerFormField(
    'slot',
    class extends React.Component {
      static displayName = 'FormSlot'
      render() {
        const { schema } = this.props
        return <React.Fragment>{schema.renderChildren}</React.Fragment>
      }
    }
  )
}
