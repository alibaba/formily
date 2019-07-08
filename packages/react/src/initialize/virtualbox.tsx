import React from 'react'
import { IFieldProps } from '../type'
import { registerFormField } from '../shared/core'
import { registerVirtualboxFlag } from '../utils'

export default () => {
  registerVirtualboxFlag('slot')
  registerFormField(
    'slot',
    class extends React.Component<IFieldProps> {
      public static displayName = 'FormSlot'
      public render() {
        const { schema } = this.props
        return <React.Fragment>{schema.renderChildren}</React.Fragment>
      }
    }
  )
}
