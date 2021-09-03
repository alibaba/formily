import React, { Fragment, useContext } from 'react'
import { isFn, isValid } from '@formily/shared'
import { GeneralField } from '@formily/core'
import { Schema } from '@formily/json-schema'
import {
  SchemaContext,
  SchemaOptionsContext,
  SchemaExpressionScopeContext,
} from '../shared'
import { IRecursionFieldProps } from '../types'
import { useField } from '../hooks'
import { ObjectField } from './ObjectField'
import { ArrayField } from './ArrayField'
import { Field } from './Field'
import { VoidField } from './VoidField'

export const RecursionField: React.FC<IRecursionFieldProps> = (props) => {
  const fieldSchema = new Schema(props.schema)
  const parent = useField()
  const options = useContext(SchemaOptionsContext)
  const currentScope = useContext(SchemaExpressionScopeContext)
  const fieldProps = fieldSchema.toFieldProps({
    ...options,
    get scope() {
      return {
        ...options.scope,
        ...currentScope,
      }
    },
  }) as any
  const getBasePath = () => {
    if (props.onlyRenderProperties) {
      return props.basePath || parent?.address.concat(props.name)
    }
    return props.basePath || parent?.address
  }
  const basePath = getBasePath()
  const renderProperties = (field?: GeneralField) => {
    if (props.onlyRenderSelf) return
    return (
      <Fragment>
        {fieldSchema.mapProperties((item, name, index) => {
          const base = field?.address || basePath
          let schema: Schema = item
          if (isFn(props.mapProperties)) {
            const mapped = props.mapProperties(item, name)
            if (mapped) {
              schema = mapped
            }
          }
          if (isFn(props.filterProperties)) {
            if (props.filterProperties(schema, name) === false) {
              return null
            }
          }
          return (
            <RecursionField
              schema={schema}
              key={`${index}-${name}`}
              name={name}
              basePath={base}
            />
          )
        })}
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
    return <Field {...fieldProps} name={props.name} basePath={basePath} />
  }

  if (!fieldSchema) return <Fragment />

  return (
    <SchemaContext.Provider value={fieldSchema}>
      {render()}
    </SchemaContext.Provider>
  )
}
