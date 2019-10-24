import React, { useContext, Fragment } from 'react'
import { Field, VirtualField } from '@uform/react'
import { FormPath, isFn, isStr } from '@uform/shared'
import {
  ISchemaFieldProps,
  ISchemaFieldComponentProps,
  ISchemaVirtualFieldComponentProps
} from '../types'
import { Schema } from '../shared/schema'
import SchemaContext, { FormComponentsContext } from '../shared/context'

export const SchemaField: React.FunctionComponent<ISchemaFieldProps> = (
  props: ISchemaFieldProps
) => {
  const path = FormPath.parse(props.path)
  const formSchema = useContext(SchemaContext)
  const fieldSchema = formSchema.get(path)
  const formRegistry = useContext(FormComponentsContext)
  if (!fieldSchema) {
    throw new Error(`Can not found schema node by ${path.toString()}.`)
  }
  if (!formRegistry) {
    throw new Error(`Can not found any form components.`)
  }
  const schemaType = fieldSchema.type
  const schemaComponent = fieldSchema.getExtendsComponent()
  const schemaRenderer = fieldSchema.getExtendsRenderer()
  const finalComponentName = schemaComponent || schemaType
  const renderField = (
    addtionKey: string | number,
    reactKey?: string | number
  ) => {
    return <SchemaField key={reactKey} path={path.concat(addtionKey)} />
  }
  const renderChildren = (
    callback: (props: ISchemaFieldComponentProps) => React.ReactElement
  ) => {
    return (
      <Field
        path={path}
        initialValue={fieldSchema.default}
        props={fieldSchema.getSelfProps()}
        triggerType={fieldSchema.getExtendsTriggerType()}
        editable={fieldSchema.getExtendsEditable()}
        required={fieldSchema.getExtendsRequired()}
        rules={fieldSchema.getExtendsRules()}
      >
        {({ state, mutators, form }) => {
          const props: ISchemaFieldComponentProps = {
            ...state,
            schema: fieldSchema,
            form,
            mutators,
            renderField
          }
          return callback(props)
        }}
      </Field>
    )
  }
  if (fieldSchema.isObject() && !schemaComponent) {
    const properties = fieldSchema.mapProperties(
      (schema: Schema, key: string) => {
        const childPath = path.concat(key)
        return <SchemaField key={childPath.toString()} path={childPath} />
      }
    )
    if (path.length == 0) {
      return <Fragment>{properties}</Fragment>
    }
    return renderChildren(props => {
      return React.createElement(
        formRegistry.formItemComponent,
        props,
        properties
      )
    })
  } else {
    if (isFn(finalComponentName)) {
      return renderChildren(props => {
        return React.createElement(
          formRegistry.formItemComponent,
          props,
          React.createElement(finalComponentName, props)
        )
      })
    } else if (isStr(finalComponentName)) {
      if (formRegistry.fields[finalComponentName]) {
        return renderChildren(props => {
          const renderComponent = (): React.ReactElement =>
            React.createElement(
              formRegistry.formItemComponent,
              props,
              React.createElement(
                formRegistry.fields[finalComponentName],
                props
              )
            )
          if (isFn(schemaRenderer)) {
            return schemaRenderer({ ...props, renderComponent })
          }
          return renderComponent()
        })
      } else if (formRegistry.virtualFields[finalComponentName]) {
        return (
          <VirtualField path={path} props={fieldSchema.getSelfProps()}>
            {({ state, form }) => {
              const props: ISchemaVirtualFieldComponentProps = {
                ...state,
                schema: fieldSchema,
                form,
                renderField,
                children: fieldSchema.mapProperties(
                  (schema: Schema, key: string) => {
                    const childPath = path.concat(key)
                    return (
                      <SchemaField
                        key={childPath.toString()}
                        path={childPath}
                      />
                    )
                  }
                )
              }
              const renderComponent = () =>
                React.createElement(
                  formRegistry.virtualFields[finalComponentName],
                  props
                )
              if (isFn(schemaRenderer)) {
                return schemaRenderer({ ...props, renderComponent })
              }
              return renderComponent()
            }}
          </VirtualField>
        )
      } else {
        throw new Error(
          `Can not found any custom component in ${path.toString()}.`
        )
      }
    }
  }
}
