import React, { Component, useContext } from 'react'
import { createPortal } from 'react-dom'

import { SchemaFormProps } from '../type'
import { createHOC, schemaIs, clone, filterSchemaPropertiesAndReactChildren } from '../utils'
import { MarkupContext } from '../shared/context'

let nonameId = 0

const getRadomName = () => {
  return `UFORM_NO_NAME_FIELD_$${nonameId++}`
}

export const SchemaField = (props, context) => {
  const parent = useContext(MarkupContext)
  if (schemaIs(parent, 'object')) {
    let name = props.name || getRadomName()
    parent.properties = parent.properties || {}
    parent.properties[name] = clone(props, filterSchemaPropertiesAndReactChildren)
    return (
      <MarkupContext.Provider value={parent.properties[name]}>
        {props.children}
      </MarkupContext.Provider>
    )
  } else if (schemaIs(parent, 'array')) {
    parent.items = clone(props, filterSchemaPropertiesAndReactChildren)
    return <MarkupContext.Provider value={parent.items}>{props.children}</MarkupContext.Provider>
  } else {
    return props.children || <React.Fragment />
  }
}

export const SchemaMarkup = createHOC((options, SchemaForm) => {
  return class extends Component<SchemaFormProps> {
    static displayName = 'SchemaMarkupParser'

    portalRoot = document.createElement('div')

    render() {
      let { children, initialValues, defaultValue, value, schema, ...others } = this.props

      let alreadyHasSchema = false
      if (schema) {
        alreadyHasSchema = true
      } else {
        schema = { type: 'object' }
      }

      nonameId = 0

      return (
        <React.Fragment>
          {!alreadyHasSchema &&
            createPortal(
              <MarkupContext.Provider value={schema}>{children}</MarkupContext.Provider>,
              this.portalRoot
            )}
          <SchemaForm
            {...others}
            defaultValue={value || defaultValue}
            value={value}
            initialValues={initialValues}
            schema={schema}
          >
            {children}
          </SchemaForm>
        </React.Fragment>
      )
    }
  }
})
