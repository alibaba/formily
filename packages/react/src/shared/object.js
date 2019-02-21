import React from 'react'
import { registerFormField } from './core'
import { each } from '../utils'

registerFormField(
  'object',
  class ObjectField extends React.Component {
    renderProperties() {
      const { renderField, getOrderProperties } = this.props
      const properties = getOrderProperties(this.props)
      const children = []
      each(properties, ({ key } = {}) => {
        key && children.push(renderField(key, true))
      })
      return children
    }

    render() {
      return this.renderProperties()
    }
  }
)
