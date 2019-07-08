import React from 'react'
import { IFieldProps } from '../type'
import { registerFieldRenderer } from '../shared/core'
import { isFn } from '../utils'

export default () =>
  registerFieldRenderer(
    class extends React.Component<IFieldProps> {
      public static displayName = 'FieldXRenderer'
      public render() {
        if (isFn(this.props.schema['x-render'])) {
          return this.props.schema['x-render'](this.props)
        }
        return <React.Fragment />
      }
    }
  )
