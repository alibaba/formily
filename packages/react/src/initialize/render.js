import React from 'react'
import { StateField } from '../state/field'
import { registerFieldRenderer } from '../shared/core'
import { isFn } from '../utils'

export default () =>
  registerFieldRenderer(
    StateField()(
      class extends React.Component {
        static displayName = 'FieldXRenderer'
        render() {
          if (isFn(this.props.schema['x-render'])) {
            return this.props.schema['x-render'](this.props)
          }
          return <React.Fragment />
        }
      }
    )
  )
