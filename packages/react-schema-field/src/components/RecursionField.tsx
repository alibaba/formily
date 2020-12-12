import React, { useContext } from 'react'
import { ObjectField, ArrayField, Field, VoidField } from '@formily/react'
import {
  SchemaContext,
  SchemaRequiredContext,
  SchemaOptionsContext
} from '../shared'
import { useCompliedProps, useCompliedSchema } from '../hooks'
import { IRecursionFieldProps } from '../types'

export const RecursionField: React.FC<IRecursionFieldProps> = props => {
  const options = useContext(SchemaOptionsContext)
  const schema_ = useCompliedSchema(props.schema, options)
  const props_ = useCompliedProps(props.name, schema_, options)
  const render = () => {
    if (schema_.type === 'object') {
      return (
        <ObjectField {...props_} name={props.name} basePath={props.basePath}>
          {() =>
            schema_.mapProperties((schema, key) => {
              return <RecursionField schema={schema} key={key} name={key} />
            })
          }
        </ObjectField>
      )
    } else if (schema_.type === 'array') {
      return (
        <ArrayField {...props_} name={props.name} basePath={props.basePath} />
      )
    } else if (schema_.type === 'void') {
      return (
        <VoidField {...props_} name={props.name} basePath={props.basePath}>
          {() =>
            schema_.mapProperties((schema, key) => {
              return <RecursionField schema={schema} key={key} name={key} />
            })
          }
        </VoidField>
      )
    }
    return <Field {...props_} name={props.name} basePath={props.basePath} />
  }

  return (
    <SchemaContext.Provider value={schema_}>
      <SchemaRequiredContext.Provider value={schema_.required}>
        {render()}
      </SchemaRequiredContext.Provider>
    </SchemaContext.Provider>
  )
}
