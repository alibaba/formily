import '@formily/react'
import { ISchema, Schema } from '@formily/json-schema'
import { FormPathPattern } from '@formily/shared/lib'
export type JSXComponent =
  | keyof JSX.IntrinsicElements
  | React.JSXElementConstructor<any>

export type SchemaComponents = Record<string, JSXComponent>

export interface ISchemaFieldFactoryOptions<
  Components extends SchemaComponents = any
> {
  components?: Components
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

export interface ISchemaFieldUpdateRequest {
  state?: Formily.Core.Types.IFieldState
  schema?: ISchema
  run?: string
}

export interface IRecursionFieldProps {
  schema: Schema
  name?: string
  basePath?: FormPathPattern
}

export interface ISchemaMarkupFieldProps<
  Components extends SchemaComponents,
  Decorator extends keyof Components,
  Component extends keyof Components
>
  extends ISchema<
    Decorator,
    Component,
    React.ComponentProps<Components[Decorator]>,
    React.ComponentProps<Components[Component]>,
    Formily.Core.Types.FormPatternTypes,
    Formily.Core.Types.FieldDisplayTypes,
    Formily.Core.Types.FieldValidator,
    React.ReactNode
  > {
  name: string
  children?: React.ReactNode
}
