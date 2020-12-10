import React, { useContext, Fragment } from 'react'
import { isSchemaObject, Schema } from '@formily/json-schema'
import { ObjectField, ArrayField, Field, VoidField } from '@formily/react'
import {
  render,
  SchemaContext,
  SchemaMarkupContext,
  SchemaRequiredContext,
  SchemaExpressionScopeContext
} from './shared'
import { useCompliedProps, useCompliedSchema } from './hooks'
import {
  JSXComponent,
  ISchemaFieldFactoryOptions,
  SchemaComponents,
  ISchemaFieldProps,
  ISchemaMarkupFieldProps,
  IRecusionFieldProps
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
  function RecusionField(props: IRecusionFieldProps) {
    const schema_ = useCompliedSchema(props.schema, options)
    const props_ = useCompliedProps(props.name, schema_, options)
    const render = () => {
      if (schema_.type === 'object') {
        return (
          <ObjectField {...props_} name={props.name}>
            {() =>
              schema_.mapProperties((schema, key) => {
                return <RecusionField schema={schema} key={key} name={key} />
              })
            }
          </ObjectField>
        )
      } else if (schema_.type === 'array') {
        return <ArrayField {...props_} name={props.name} />
      } else if (schema_.type === 'void') {
        return (
          <VoidField {...props_} name={props.name}>
            {() =>
              schema_.mapProperties((schema, key) => {
                return <RecusionField schema={schema} key={key} name={key} />
              })
            }
          </VoidField>
        )
      }
      return <Field {...props_} name={props.name} />
    }

    return (
      <SchemaContext.Provider value={schema_}>
        <SchemaRequiredContext.Provider value={schema_.required}>
          {render()}
        </SchemaRequiredContext.Provider>
      </SchemaContext.Provider>
    )
  }

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
          <RecusionField schema={schema} name={props.name} />
        </SchemaExpressionScopeContext.Provider>
      )
    }

    return (
      <Fragment>
        {renderMarkup()}
        {renderChildren()}
      </Fragment>
    )
  }

  function MarkupField<
    Decorator extends keyof Components,
    Component extends keyof Components
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
