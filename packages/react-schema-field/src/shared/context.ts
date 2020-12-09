import { createContext } from 'react'
import { Schema } from '@formily/json-schema'

export const SchemaMarkupContext = createContext<Schema>(null)
export const SchemaContext = createContext<Schema>(null)
export const SchemaRequiredContext = createContext<Schema['required']>(null)
export const SchemaExpressionScopeContext = createContext<any>(null)
