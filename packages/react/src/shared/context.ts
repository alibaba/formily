import { createContext } from 'react'
import { Schema } from '@formily/json-schema'
import { ISchemaFieldFactoryOptions } from '../types'

export const FormContext = createContext<Formily.Core.Models.Form>(null)
export const FieldContext = createContext<Formily.Core.Types.GeneralField>(null)
export const SchemaMarkupContext = createContext<Schema>(null)
export const SchemaContext = createContext<Schema>(null)
export const SchemaExpressionScopeContext = createContext<any>(null)
export const SchemaOptionsContext = createContext<ISchemaFieldFactoryOptions>(
  null
)
