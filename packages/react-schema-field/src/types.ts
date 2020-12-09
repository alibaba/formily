import '@formily/react'
import { ISchema, Schema } from '@formily/json-schema'
export type JSXComponent =
  | keyof JSX.IntrinsicElements
  | React.JSXElementConstructor<any>

export type SchemaComponents = Record<string, JSXComponent>

export type SchemaDecorators = Record<string, JSXComponent>

export interface ISchemaFieldFactoryOptions<
  Decorators extends SchemaDecorators = any,
  Components extends SchemaComponents = any
> {
  components?: Components
  decorators?: Decorators
  scope?: any
}

export interface ISchemaFieldProps<
  Decorator extends JSXComponent = any,
  Component extends JSXComponent = any,
  InnerField = Formily.Core.Models.ObjectField<Decorator, Component>
>
  extends Omit<
    Formily.Core.Types.IFieldFactoryProps<Decorator, Component, InnerField>,
    'name'
  > {
  schema?: ISchema
  scope?: any
  name?: string
  children?: React.ReactNode
}

export interface IRecusionFieldProps {
  schema: Schema
  name: string
}

export interface ISchemaMarkupFieldProps<
  Decorators extends SchemaDecorators,
  Components extends SchemaComponents,
  Decorator extends keyof Decorators,
  Component extends keyof Components
>
  extends ISchema<
    Decorator,
    Component,
    React.ComponentProps<Decorators[Decorator]>,
    React.ComponentProps<Components[Component]>,
    Formily.Core.Types.FormPatternTypes,
    Formily.Core.Types.FieldDisplayTypes,
    Formily.Core.Types.FieldValidator,
    React.ReactNode
  > {
  name: string
  children?: React.ReactNode
}
