import React, { useContext, Fragment } from 'react'
import { Field, VirtualField, IFieldState } from '@uform/react'
import { FormPath, isFn, isStr, isEqual, isValid } from '@uform/shared'
import {
  ISchemaFieldProps,
  ISchemaFieldComponentProps,
  ISchemaVirtualFieldComponentProps
} from '../types'
import { Schema } from '../shared/schema'
import SchemaContext, { FormComponentsContext } from '../shared/context'

const computeSchemaState = (draft: IFieldState, prevState: IFieldState) => {
  const schema = new Schema(draft.props)
  const prevSchema = new Schema(prevState.props)
  const currentRequired = schema.getExtendsRequired()
  const prevRequired = prevSchema.getExtendsRequired()
  const currentRules = schema.getExtendsRules()
  const prevRules = prevSchema.getExtendsRules()
  const currentEditable = schema.getExtendsEditable()
  const prevEditable = prevSchema.getExtendsEditable()
  if (isValid(currentRequired) && !isEqual(currentRequired, prevRequired)) {
    draft.required = currentRequired
  }
  if (isValid(currentRules) && !isEqual(currentRules, prevRules)) {
    draft.rules = currentRules
  }
  if (isValid(currentEditable) && !isEqual(currentEditable, prevEditable)) {
    draft.selfEditable = currentEditable
  }
}

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
  const initialComponent = schemaComponent || schemaType
  const renderField = (
    addtionKey: string | number,
    reactKey?: string | number
  ) => {
    return <SchemaField key={reactKey} path={path.concat(addtionKey)} />
  }
  const renderFieldDelegate = (
    callback: (props: ISchemaFieldComponentProps) => React.ReactElement
  ) => {
    return (
      <Field
        path={path}
        initialValue={fieldSchema.default}
        props={fieldSchema.getSelfProps()}
        triggerType={fieldSchema.getExtendsTriggerType()}
        editable={fieldSchema.getExtendsEditable()}
        visible={fieldSchema.getExtendsVisible()}
        display={fieldSchema.getExtendsDisplay()}
        required={fieldSchema.getExtendsRequired()}
        rules={fieldSchema.getExtendsRules()}
        computeState={computeSchemaState}
      >
        {({ state, mutators, form }) => {
          const props: ISchemaFieldComponentProps = {
            ...state,
            schema: new Schema(fieldSchema).merge(state.props),
            form,
            mutators,
            renderField
          }
          return callback(props)
        }}
      </Field>
    )
  }

  const renderVirtualFieldDelegate = (
    callback: (props: ISchemaVirtualFieldComponentProps) => React.ReactElement
  ) => {
    return (
      <VirtualField path={path} props={fieldSchema.getSelfProps()}>
        {({ state, form }) => {
          const props: ISchemaVirtualFieldComponentProps = {
            ...state,
            schema: new Schema(fieldSchema).merge(state.props),
            form,
            renderField,
            children: fieldSchema.mapProperties(
              (schema: Schema, key: string) => {
                return <SchemaField key={key} path={path.concat(key)} />
              }
            )
          }

          return callback(props)
        }}
      </VirtualField>
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
    return renderFieldDelegate(props => {
      const renderComponent = () => {
        return React.createElement(
          formRegistry.formItemComponent,
          props,
          properties
        )
      }
      if (isFn(schemaRenderer)) {
        return schemaRenderer({ ...props, renderComponent })
      }
      return renderComponent()
    })
  } else {
    if (isStr(initialComponent)) {
      if (formRegistry.fields[initialComponent]) {
        return renderFieldDelegate(props => {
          const stateComponent =
            props.schema.getExtendsComponent() || props.schema.type
          if (!isStr(stateComponent))
            throw new Error('Can not found any form components.')
          const renderComponent = (): React.ReactElement =>
            React.createElement(
              formRegistry.formItemComponent,
              props,
              React.createElement(formRegistry.fields[stateComponent], props)
            )
          if (isFn(schemaRenderer)) {
            return schemaRenderer({ ...props, renderComponent })
          }
          return renderComponent()
        })
      } else if (formRegistry.virtualFields[initialComponent]) {
        return renderVirtualFieldDelegate(props => {
          const stateComponent =
            props.schema.getExtendsComponent() || props.schema.type
          if (!isStr(stateComponent))
            throw new Error('Can not found any form components.')
          const renderComponent = () =>
            React.createElement(
              formRegistry.virtualFields[stateComponent],
              props
            )

          if (isFn(schemaRenderer)) {
            return schemaRenderer({ ...props, renderComponent })
          }
          return renderComponent()
        })
      }
    } else {
      throw new Error(`Can not found any form components.`)
    }
  }
}
