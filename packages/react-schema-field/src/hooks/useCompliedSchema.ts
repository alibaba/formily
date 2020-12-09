import { useContext } from 'react'
import { Schema } from '@formily/json-schema'
import { SchemaExpressionScopeContext } from '../shared'
import { ISchemaFieldFactoryOptions } from '../types'

export const useCompliedSchema = (
  schema: Schema,
  options: ISchemaFieldFactoryOptions
): Schema => {
  const scope = useContext(SchemaExpressionScopeContext)
  return schema.complie({
    ...options.scope,
    ...scope
  })
}
