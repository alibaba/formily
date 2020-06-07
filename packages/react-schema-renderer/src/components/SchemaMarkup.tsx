import React, { Fragment, createContext, useContext } from 'react'
import { registerVirtualBox } from '../shared/registry'
import { SchemaForm } from './SchemaForm'
import { Schema } from '../shared/schema'
import { render } from '../shared/virtual-render'
import {
  ISchemaFormProps,
  IMarkupSchemaFieldProps,
  ISchemaVirtualFieldComponentProps,
  IVirtualBoxProps
} from '../types'

const env = {
  nonameId: 0
}

export const MarkupContext = createContext<Schema>(null)

const getRandomName = () => {
  return `NO_NAME_FIELD_$${env.nonameId++}`
}

export const SchemaMarkupField: React.FC<IMarkupSchemaFieldProps> = ({
  children,
  ...props
}) => {
  const parentSchema = useContext(MarkupContext)
  if (!parentSchema) return <Fragment />
  if (parentSchema.isObject()) {
    props.name = props.name || getRandomName()
    const schema = parentSchema.setProperty(props.name, props)
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
  component?: React.JSXElementConstructor<any>
) {
  registerVirtualBox(
    key,
    component
      ? ({ schema, children }) => {
          const props = schema.getExtendsComponentProps()
          return React.createElement(component, {
            children,
            ...props
          })
        }
      : () => <Fragment />
  )
  const VirtualBox: React.FC<IVirtualBoxProps<T>> = ({
    children,
    name,
    visible,
    display,
    ...props
  }) => {
    return (
      <SchemaMarkupField
        type="object"
        name={name}
        visible={visible}
        display={display}
        x-component={key}
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
  const VirtualBox: React.FC<IVirtualBoxProps<T>> = ({
    children,
    name,
    ...props
  }) => {
    return (
      <SchemaMarkupField
        type="object"
        name={name}
        x-component={key}
        x-component-props={props}
      >
        {children}
      </SchemaMarkupField>
    )
  }
  return VirtualBox
}

export const FormSlot: React.FC<{
  name?: string
  children?: React.ReactElement
}> = ({ name, children }) => {
  return (
    <SchemaMarkupField
      type="object"
      name={name}
      x-render={() => {
        return <Fragment>{children}</Fragment>
      }}
    />
  )
}
