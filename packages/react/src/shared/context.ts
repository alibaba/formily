import React, { createContext } from 'react'
import { Schema } from '@formily/json-schema'
import { ISchemaFieldFactoryOptions } from '../types'

const createContextCleaner = <T>(...contexts: React.Context<T>[]) => {
  return ({ children }) => {
    return contexts.reduce((buf, ctx) => {
      return React.createElement(ctx.Provider, { value: undefined }, buf)
    }, children)
  }
}

export const FormContext = createContext<Formily.Core.Models.Form>(null)
export const FieldContext = createContext<Formily.Core.Types.GeneralField>(null)
export const SchemaMarkupContext = createContext<Schema>(null)
export const SchemaContext = createContext<Schema>(null)
export const SchemaExpressionScopeContext = createContext<any>(null)
export const SchemaOptionsContext = createContext<ISchemaFieldFactoryOptions>(
  null
)

export const ContextCleaner = createContextCleaner(
  FieldContext,
  SchemaMarkupContext,
  SchemaContext,
  SchemaExpressionScopeContext,
  SchemaOptionsContext
)
