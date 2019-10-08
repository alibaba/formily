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
  if (fieldSchema.isObject() && !schemaComponent) {
    return (
      <Fragment>
        {fieldSchema.mapProperties((schema: Schema, key: string) => {
          const childPath = path.concat(key)
          return <SchemaField key={childPath.toString()} path={childPath} />
        })}
      </Fragment>
    )
  } else {
    if (isFn(finalComponentName)) {
      return (
        <Field
          path={path}
          initialValue={fieldSchema.default}
          props={fieldSchema.getSelfProps()}
          editable={fieldSchema.getExtendsEditable()}
          required={fieldSchema.getExtendsRequired()}
          rules={fieldSchema.getExtendsRules()}
        >
          {({ state, mutators, form }) => {
            const props: ISchemaFieldComponentProps = {
              ...state,
              schema: fieldSchema,
              path,
              form,
              mutators,
              renderField
            }
            return React.createElement(
              formRegistry.formItemComponent,
              props,
              React.createElement(finalComponentName, props)
            )
          }}
        </Field>
      )
    } else if (isStr(finalComponentName)) {
      if (formRegistry.fields[finalComponentName]) {
        return (
          <Field
            path={path}
            initialValue={fieldSchema.default}
            props={fieldSchema.getSelfProps()}
            editable={fieldSchema.getExtendsEditable()}
            required={fieldSchema.getExtendsRequired()}
            rules={fieldSchema.getExtendsRules()}
          >
            {({ state, mutators, form }) => {
              const props: ISchemaFieldComponentProps = {
                ...state,
                schema: fieldSchema,
                path,
                form,
                mutators,
                renderField
              }
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
            }}
          </Field>
        )
      } else if (formRegistry.virtualFields[finalComponentName]) {
        return (
          <VirtualField path={path} props={fieldSchema.getSelfProps()}>
            {({ state, form }) => {
              const props: ISchemaVirtualFieldComponentProps = {
                ...state,
                schema: fieldSchema,
                path,
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
