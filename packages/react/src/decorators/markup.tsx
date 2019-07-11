import React, { Component, useContext } from 'react'
import { createPortal } from 'react-dom'

import { ISchemaFormProps } from '../type'
import {
  createHOC,
  schemaIs,
  clone,
  filterSchemaPropertiesAndReactChildren
} from '../utils'
import { MarkupContext } from '../shared/context'

let nonameId = 0

const getRadomName = () => {
  return `UFORM_NO_NAME_FIELD_$${nonameId++}`
}

export const SchemaField = props => {
  const parent = useContext(MarkupContext)
  if (schemaIs(parent, 'object')) {
    const name = props.name || getRadomName()
    parent.properties = parent.properties || {}
    parent.properties[name] = clone(
      props,
      filterSchemaPropertiesAndReactChildren
    )
    return (
      <MarkupContext.Provider value={parent.properties[name]}>
        {props.children}
      </MarkupContext.Provider>
    )
  } else if (schemaIs(parent, 'array')) {
    parent.items = clone(props, filterSchemaPropertiesAndReactChildren)
    return (
      <MarkupContext.Provider value={parent.items}>
        {props.children}
      </MarkupContext.Provider>
    )
  } else {
    return props.children || <React.Fragment />
  }
}

export const SchemaMarkup = createHOC((options, SchemaForm) => {
  return class extends Component<ISchemaFormProps> {
    public static displayName = 'SchemaMarkupParser'

    public portalRoot = document.createElement('div')

    public render() {
      const {
        children,
        initialValues,
        defaultValue,
        value,
        schema,
        ...others
      } = this.props

      let alreadyHasSchema = false
      let finalSchema = {}
      if (schema) {
        alreadyHasSchema = true
        finalSchema = schema
      } else {
        finalSchema = { type: 'object' }
      }

      nonameId = 0

      return (
        <React.Fragment>
          {!alreadyHasSchema &&
            // 只是为了去收集 schema 数据
            createPortal(
              <MarkupContext.Provider value={finalSchema}>
                {children}
              </MarkupContext.Provider>,
              this.portalRoot
            )}
          <SchemaForm
            {...others}
            defaultValue={defaultValue}
            value={value}
            initialValues={initialValues}
            schema={finalSchema}
          >
            {children}
          </SchemaForm>
        </React.Fragment>
      )
    }
  }
})
