import React, { createContext } from 'react'
import { Form, GeneralField } from '@formily/core'
import { Schema } from '@formily/json-schema'
import { ISchemaFieldReactFactoryOptions } from '../types'

const createContextCleaner = <T>(...contexts: React.Context<T>[]) => {
  return ({ children }) => {
    return contexts.reduce((buf, ctx) => {
      return React.createElement(ctx.Provider, { value: undefined }, buf)
    }, children)
  }
}

export const FormContext = createContext<Form>(null)
export const FieldContext = createContext<GeneralField>(null)
export const SchemaMarkupContext = createContext<Schema>(null)
export const SchemaContext = createContext<Schema>(null)
export const SchemaExpressionScopeContext = createContext<any>(null)
export const SchemaOptionsContext =
  createContext<ISchemaFieldReactFactoryOptions>(null)

export const ContextCleaner = createContextCleaner(
  FieldContext,
  SchemaMarkupContext,
  SchemaContext,
  SchemaExpressionScopeContext,
  SchemaOptionsContext
)
