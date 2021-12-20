import { createContext } from 'react'
import { Schema } from './schema'
import { ISchemaFormRegistry, ISchemaFieldContextProps } from '../types'

export const FormComponentsContext = createContext<ISchemaFormRegistry>(null)

export const FormExpressionScopeContext = createContext<any>({})

export const SchemaFieldPropsContext = createContext<ISchemaFieldContextProps>(
  null
)

export const FormSchemaContext = createContext<Schema>(null)
