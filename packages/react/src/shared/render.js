import React from 'react'
import { StateField } from '../state/field'
import { registerFieldRenderer } from './core'
import { isFn } from '../utils'

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
