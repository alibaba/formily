import React, { useContext, Fragment } from 'react'
import { isSchemaObject, Schema } from '@formily/json-schema'
import { RecursionField } from './components'
import {
  render,
  SchemaMarkupContext,
  SchemaExpressionScopeContext,
  SchemaOptionsContext
} from './shared'
import {
  ReactComponentPath,
  JSXComponent,
  ISchemaFieldFactoryOptions,
  SchemaComponents,
  ISchemaFieldProps,
  ISchemaMarkupFieldProps
} from './types'

const env = {
  nonameId: 0
}

const getRandomName = () => {
  return `NO_NAME_FIELD_$${env.nonameId++}`
}

export function createSchemaField<Components extends SchemaComponents>(
  options: ISchemaFieldFactoryOptions<Components>
) {
  function SchemaField<
    Decorator extends JSXComponent,
    Component extends JSXComponent
  >(props: ISchemaFieldProps<Decorator, Component>) {
    const schema = isSchemaObject(props.schema)
      ? props.schema
      : new Schema({
          type: 'object',
          ...props.schema
        })

    const renderMarkup = () => {
      env.nonameId = 0
      return render(
        <SchemaMarkupContext.Provider value={schema}>
          {props.children}
        </SchemaMarkupContext.Provider>
      )
    }

    const renderChildren = () => {
      return (
        <SchemaExpressionScopeContext.Provider value={props.scope}>
          <RecursionField {...props} schema={schema} />
        </SchemaExpressionScopeContext.Provider>
      )
    }

    return (
      <SchemaOptionsContext.Provider value={options}>
        {renderMarkup()}
        {renderChildren()}
      </SchemaOptionsContext.Provider>
    )
  }

  function MarkupField<
    Decorator extends ReactComponentPath<Components>,
    Component extends ReactComponentPath<Components>
  >(props: ISchemaMarkupFieldProps<Components, Component, Decorator>) {
    const parent = useContext(SchemaMarkupContext)
    if (!parent) return <Fragment />
    if (parent.type === 'object' || parent.type === 'void') {
      const name = props.name || getRandomName()
      const schema = parent.addProperty(name, props)
      return (
        <SchemaMarkupContext.Provider value={schema}>
          {props.children}
        </SchemaMarkupContext.Provider>
      )
    } else if (parent.type === 'array') {
      const schema = parent.setItems(props)
      return (
        <SchemaMarkupContext.Provider
          value={Array.isArray(schema) ? schema[0] : schema}
        >
          {props.children}
        </SchemaMarkupContext.Provider>
      )
    } else {
      return (props.children as React.ReactElement) || <React.Fragment />
    }
  }

  MarkupField.displayName = 'SchemaMarkupField'
  SchemaField.displayName = 'SchemaField'
  SchemaField.Markup = MarkupField

  return SchemaField
}
