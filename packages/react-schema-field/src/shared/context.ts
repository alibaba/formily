import { createContext } from 'react'
import { Schema } from '@formily/json-schema'
import { ISchemaFieldFactoryOptions } from '../types'

export const SchemaMarkupContext = createContext<Schema>(null)
export const SchemaContext = createContext<Schema>(null)
export const SchemaRequiredContext = createContext<Schema['required']>(null)
export const SchemaExpressionScopeContext = createContext<any>(null)
export const SchemaOptionsContext = createContext<ISchemaFieldFactoryOptions>(
  null
)
