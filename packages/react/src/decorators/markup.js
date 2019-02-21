import React, { Component, useContext } from 'react'
import {
  createHOC,
  schemaIs,
  clone,
  filterSchemaPropertiesAndReactChildren
} from '../utils'
import { MarkupContext } from '../shared/context'

let nonameId = 0

const getRadomName = () => {
  return `RS_UFORM_NO_NAME_$${nonameId++}`
}

export const SchemaField = (props, context) => {
  const parent = useContext(MarkupContext)
  if (schemaIs(parent, 'object')) {
    let name = props.name || getRadomName()
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
  return class extends Component {
    static displayName = 'SchemaMarkupParser'
    render() {
      let {
        children,
        initialValues,
        defaultValue,
        value,
        schema,
        ...others
      } = this.props
      schema = schema || { type: 'object' }

      nonameId = 0
      return (
        <React.Fragment>
          <template>
            <MarkupContext.Provider value={schema}>
              {children}
            </MarkupContext.Provider>
          </template>
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
