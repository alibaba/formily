import React, { useContext, Fragment } from 'react'
import { Field, VirtualField, IFieldState } from '@formily/react'
import { FormPath, isFn, isStr, isEqual, isValid } from '@formily/shared'
import {
  ISchemaFieldProps,
  ISchemaFieldComponentProps,
  ISchemaVirtualFieldComponentProps
} from '../types'
import { Schema } from '../shared/schema'
import SchemaContext, {
  FormComponentsContext,
  FormExpressionScopeContext
} from '../shared/context'
import { compileObject } from '../shared/expression'

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
  const fieldSchema = props.schema || formSchema.get(path)
  const formRegistry = useContext(FormComponentsContext)
  const expressionScope = useContext(FormExpressionScopeContext)
  const ErrorTipPathStr = path.toString()
  if (!fieldSchema) {
    throw new Error(`Can not found schema node by ${ErrorTipPathStr}.`)
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
        props={compileObject(
          fieldSchema.getSelfProps(),
          expressionScope,
          (key: string) => key == 'x-linkages'
        )}
        dataType={fieldSchema.type}
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
      <VirtualField
        path={path}
        props={compileObject(
          fieldSchema.getSelfProps(),
          expressionScope,
          (key: string) => key == 'x-linkages'
        )}
      >
        {({ state, form }) => {
          const props: ISchemaVirtualFieldComponentProps = {
            ...state,
            schema: new Schema(fieldSchema).merge(state.props),
            form,
            renderField,
            children: fieldSchema.mapProperties(
              (schema: Schema, key: string) => {
                return (
                  <SchemaField
                    schema={schema}
                    key={key}
                    path={path.concat(key)}
                  />
                )
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
        return (
          <SchemaField
            schema={schema}
            key={childPath.toString()}
            path={childPath}
          />
        )
      }
    )
    if (path.length == 0 || props.onlyRenderProperties) {
      return <Fragment>{properties}</Fragment>
    }
    return renderFieldDelegate(props => {
      const renderComponent = () => {
        if (!formRegistry.formItemComponent) {
          console.error(`[Formily Error]: Can not found any component.Its key is ${ErrorTipPathStr}.`)
          return null
        }
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
          if (!isStr(stateComponent)){
            console.error(`[Formily Error]: Can not found any form component <${stateComponent}>.Its key is ${ErrorTipPathStr}.`)
              return null
          }
          const renderComponent = (): React.ReactElement => {
            if (!formRegistry.fields[stateComponent]) {
              console.error(`[Formily Error]: Can not found the field component <${stateComponent}>.Its key is ${ErrorTipPathStr}.`)
              return null
            }
            return React.createElement(
              formRegistry.formItemComponent,
              props,
              React.createElement(formRegistry.fields[stateComponent], props)
            )
          }
          if (isFn(schemaRenderer)) {
            return schemaRenderer({ ...props, renderComponent })
          }
          return renderComponent()
        })
      } else if (formRegistry.virtualFields[initialComponent]) {
        return renderVirtualFieldDelegate(props => {
          const stateComponent =
            props.schema.getExtendsComponent() || props.schema.type
          if (!isStr(stateComponent)){
            console.error(`[Formily Error]: Can not found any virtual form component <${stateComponent}>.Its key is ${ErrorTipPathStr}.`)
            return null
          }
          const renderComponent = () => {
            if (!formRegistry.virtualFields[stateComponent]) {
              console.error(`[Formily Error]: Can not found the virtual field component <${stateComponent}>.Its key is ${ErrorTipPathStr}.`)
              return null
            }
            return React.createElement(
              formRegistry.virtualFields[stateComponent],
              props
            )
          }

          if (isFn(schemaRenderer)) {
            return schemaRenderer({ ...props, renderComponent })
          }
          return renderComponent()
        })
      } else {
        console.error(`[Formily Error]: Can not found the field component <${initialComponent}>.Its key is ${ErrorTipPathStr}.`)
        return null
      }
    } else {
      console.error(`[Formily Error]: Can not found the field component <${initialComponent}>.Its key is ${ErrorTipPathStr}.`)
      return null
    }
  }
}
