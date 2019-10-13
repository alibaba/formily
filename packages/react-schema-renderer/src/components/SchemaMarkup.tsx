import React, { Fragment, createContext, useContext } from 'react'
import { registerVirtualBox } from '../shared/registry'
import { SchemaForm } from './SchemaForm'
import { Schema } from '../shared/schema'
import { render } from '../shared/virtual-render'
import {
  ISchemaFormProps,
  IMarkupSchemaFieldProps,
  ISchemaVirtualFieldComponentProps
} from '../types'

const env = {
  nonameId: 0
}

const MarkupContext = createContext<Schema>(null)

const getRadomName = () => {
  return `NO_NAME_FIELD_$${env.nonameId++}`
}

export const SchemaMarkupField: React.FC<IMarkupSchemaFieldProps> = ({
  name,
  children,
  ...props
}) => {
  const parentSchema = useContext(MarkupContext)
  if (!parentSchema) return <Fragment />
  if (parentSchema.isObject()) {
    const propName = name || getRadomName()
    const schema = parentSchema.setProperty(propName, props)
    return (
      <MarkupContext.Provider value={schema}>{children}</MarkupContext.Provider>
    )
  } else if (parentSchema.isArray()) {
    const schema = parentSchema.setArrayItems(props)
    return (
      <MarkupContext.Provider value={schema}>{children}</MarkupContext.Provider>
    )
  } else {
    return (children as React.ReactElement) || <React.Fragment />
  }
}

SchemaMarkupField.displayName = 'SchemaMarkupField'

export const SchemaMarkupForm: React.FC<ISchemaFormProps> = props => {
  let alreadyHasSchema = false
  let finalSchema: Schema
  if (props.schema) {
    alreadyHasSchema = true
    finalSchema = new Schema(props.schema)
  } else {
    finalSchema = new Schema({ type: 'object' })
  }
  env.nonameId = 0
  return (
    <Fragment>
      {!alreadyHasSchema &&
        render(
          <MarkupContext.Provider value={finalSchema}>
            {props.children}
          </MarkupContext.Provider>
        )}
      <SchemaForm {...props} schema={finalSchema} />
    </Fragment>
  )
}

SchemaMarkupForm.displayName = 'SchemaMarkupForm'

export function createVirtualBox<T = {}>(
  key: string,
  component?: React.JSXElementConstructor<T>
) {
  registerVirtualBox(
    key,
    component
      ? ({ props, children }) => {
          return React.createElement(component, {
            ...props['x-props'],
            ...props['x-component-props'],
            children
          })
        }
      : () => <Fragment />
  )
  const VirtualBox: React.FC<T & { name?: string }> = ({
    children,
    name,
    ...props
  }) => {
    return (
      <SchemaMarkupField
        type="object"
        name={name}
        x-component={key}
        x-props={props}
        x-component-props={props}
      >
        {children}
      </SchemaMarkupField>
    )
  }
  return VirtualBox
}

export function createControllerBox<T = {}>(
  key: string,
  component?: React.JSXElementConstructor<ISchemaVirtualFieldComponentProps>
) {
  registerVirtualBox(key, component ? component : () => <Fragment />)
  const VirtualBox: React.FC<T & { name?: string }> = ({
    children,
    name,
    ...props
  }) => {
    return (
      <SchemaMarkupField
        type="object"
        name={name}
        x-component={key}
        x-props={props}
        x-component-props={props}
      >
        {children}
      </SchemaMarkupField>
    )
  }
  return VirtualBox
}
