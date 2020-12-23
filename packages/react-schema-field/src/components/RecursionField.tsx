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
  SchemaRequiredContext,
  SchemaOptionsContext,
} from '../shared'
import { useCompliedProps, useCompliedSchema } from '../hooks'
import { IRecursionFieldProps } from '../types'
import { isBool, isFn, isValid } from '@formily/shared'
import { Schema } from '@formily/json-schema'

export const RecursionField: React.FC<IRecursionFieldProps> = (props) => {
  const parent = useField()
  const options = useContext(SchemaOptionsContext)
  const schema_ = useCompliedSchema(props.schema, options)
  const props_ = useCompliedProps(props.name, schema_, options)
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
        {schema_.mapProperties((item, name, index) => {
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
        {schema_['x-content']}
      </Fragment>
    )
  }

  const render = () => {
    if (!isValid(props.name)) return renderProperties()
    if (schema_.type === 'object') {
      if (props.onlyRenderProperties) return renderProperties()
      return (
        <ObjectField {...props_} name={props.name} basePath={basePath}>
          {renderProperties}
        </ObjectField>
      )
    } else if (schema_.type === 'array') {
      return <ArrayField {...props_} name={props.name} basePath={basePath} />
    } else if (schema_.type === 'void') {
      if (props.onlyRenderProperties) return renderProperties()
      return (
        <VoidField {...props_} name={props.name} basePath={basePath}>
          {renderProperties}
        </VoidField>
      )
    }
    return (
      <Field {...props_} name={props.name} basePath={basePath}>
        {schema_['x-content']}
      </Field>
    )
  }

  return (
    <SchemaContext.Provider value={schema_}>
      <SchemaRequiredContext.Provider value={schema_.required}>
        {render()}
      </SchemaRequiredContext.Provider>
    </SchemaContext.Provider>
  )
}
