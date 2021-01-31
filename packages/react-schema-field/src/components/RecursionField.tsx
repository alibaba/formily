import React, { Fragment, useContext } from 'react'
import {
  ObjectField,
  ArrayField,
  Field,
  VoidField,
  useField,
} from '@formily/react'
import {
  SchemaContext,
  SchemaOptionsContext,
  SchemaExpressionScopeContext,
} from '../shared'
import { IRecursionFieldProps } from '../types'
import { isBool, isFn, isValid } from '@formily/shared'
import { Schema } from '@formily/json-schema'

export const RecursionField: React.FC<IRecursionFieldProps> = (props) => {
  const parent = useField()
  const options = useContext(SchemaOptionsContext)
  const scope = useContext(SchemaExpressionScopeContext)
  const fieldSchema = props?.schema?.complie({
    ...options.scope,
    ...scope,
  })
  const fieldProps = props?.schema?.toFieldProps(options)
  const getBasePath = () => {
    if (props.onlyRenderProperties) {
      return props.basePath || parent?.address?.concat(props.name)
    }
    return props.basePath || parent?.address
  }
  const basePath = getBasePath()
  const renderProperties = (field?: Formily.Core.Types.GeneralField) => {
    if (props.onlyRenderSelf) return
    return (
      <Fragment>
        {fieldSchema.mapProperties((item, name, index) => {
          const base = field?.address || basePath
          let schema: Schema = item
          if (isFn(props.mapProperties)) {
            const mapped = props.mapProperties(item, name)
            if (!isBool(mapped)) {
              schema = mapped
            } else if (mapped === false) {
              return null
            }
          }
          return (
            <RecursionField
              schema={schema}
              key={index}
              name={name}
              basePath={base}
            />
          )
        })}
        {fieldSchema['x-content']}
      </Fragment>
    )
  }

  const render = () => {
    if (!isValid(props.name)) return renderProperties()
    if (fieldSchema.type === 'object') {
      if (props.onlyRenderProperties) return renderProperties()
      return (
        <ObjectField {...fieldProps} name={props.name} basePath={basePath}>
          {renderProperties}
        </ObjectField>
      )
    } else if (fieldSchema.type === 'array') {
      return (
        <ArrayField {...fieldProps} name={props.name} basePath={basePath} />
      )
    } else if (fieldSchema.type === 'void') {
      if (props.onlyRenderProperties) return renderProperties()
      return (
        <VoidField {...fieldProps} name={props.name} basePath={basePath}>
          {renderProperties}
        </VoidField>
      )
    }
    return (
      <Field {...fieldProps} name={props.name} basePath={basePath}>
        {fieldSchema['x-content']}
      </Field>
    )
  }

  return (
    <SchemaContext.Provider value={fieldSchema}>
      {render()}
    </SchemaContext.Provider>
  )
}
