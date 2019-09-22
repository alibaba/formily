import React, { Fragment, createContext, useContext, useRef } from 'react'
import { createPortal } from 'react-dom'
import { registerVirtualBox } from './SchemaField'
import { SchemaForm } from './SchemaForm'
import { Schema } from '../shared/schema'
import { ISchemaFormProps, IMarkupSchemaFieldProps } from '../types'

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
  const ref = useRef<HTMLElement>(null)
  let alreadyHasSchema = false
  let finalSchema: Schema
  if (props.schema) {
    alreadyHasSchema = true
    finalSchema = new Schema(props.schema)
  } else {
    finalSchema = new Schema({ type: 'object' })
  }
  ref.current = ref.current || document.createElement('div')
  env.nonameId = 0
  return (
    <Fragment>
      {!alreadyHasSchema &&
        createPortal(
          <MarkupContext.Provider value={finalSchema}>
            {props.children}
          </MarkupContext.Provider>,
          ref.current
        )}
      <SchemaForm {...props} schema={finalSchema} />
    </Fragment>
  )
}

SchemaMarkupForm.displayName = 'SchemaMarkupForm'

export function createVirtualBox<T>(
  key: string,
  component?: React.JSXElementConstructor<any>
) {
  registerVirtualBox(key, component ? component : () => <Fragment />)
  const VirtualBox: React.FC<T> = ({ children, ...props }) => {
    return (
      <SchemaMarkupField type="object" x-component={key} x-props={props}>
        {children}
      </SchemaMarkupField>
    )
  }
  return VirtualBox
}
