import React from 'react'
import { IFieldProps } from '../type'
import { registerFormField } from '../shared/core'
import { each } from '../utils'

export default () =>
  registerFormField(
    'object',
    class ObjectField extends React.Component<IFieldProps> {
      public render() {
        return this.renderProperties()
      }
      private renderProperties() {
        const { renderField, getOrderProperties } = this.props
        const properties = getOrderProperties()
        const children = []
        each(properties, ({ key }: { key?: string } = {}) => {
          if (key) {
            children.push(renderField(key, true))
          }
        })
        return children
      }
    }
  )
