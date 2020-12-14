import React, { useContext, Fragment } from 'react'
import {
  ObjectField,
  ArrayField,
  Field,
  VoidField,
  useField
} from '@formily/react'
import {
  SchemaContext,
  SchemaRequiredContext,
  SchemaOptionsContext
} from '../shared'
import { useCompliedProps, useCompliedSchema } from '../hooks'
import { IRecursionFieldProps } from '../types'

export const RecursionField: React.FC<IRecursionFieldProps> = props => {
  const field = useField()
  const options = useContext(SchemaOptionsContext)
  const schema_ = useCompliedSchema(props.schema, options)
  const props_ = useCompliedProps(props.name, schema_, options)
  const basePath = props.basePath || field?.address
  const renderProperties = (field?: Formily.Core.Types.GeneralField) => {
    return (
      <Fragment>
        {schema_.mapProperties((schema, key) => {
          return (
            <RecursionField
              schema={schema}
              key={key}
              name={key}
              basePath={field?.address}
            />
          )
        })}
        {schema_['x-content']}
      </Fragment>
    )
  }

  const render = () => {
    if (!props.name) return renderProperties()
    if (schema_.type === 'object') {
      return (
        <ObjectField {...props_} name={props.name} basePath={basePath}>
          {renderProperties}
        </ObjectField>
      )
    } else if (schema_.type === 'array') {
      return <ArrayField {...props_} name={props.name} basePath={basePath} />
    } else if (schema_.type === 'void') {
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
