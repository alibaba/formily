import { ISchema, Schema, SchemaKey } from '@formily/json-schema'
import { FormPathPattern } from '@formily/shared'

export type JSXComponent =
  | keyof JSX.IntrinsicElements
  | React.JSXElementConstructor<any>

export type IProviderProps = {
  form: Formily.Core.Models.Form
}

export interface IFormSpyProps {
  children?: (form: Formily.Core.Models.Form) => React.ReactChild
}

export interface IFieldProps<
  D extends JSXComponent,
  C extends JSXComponent,
  Field = Formily.Core.Models.Field
> extends Formily.Core.Types.IFieldFactoryProps<D, C> {
  children?:
    | ((field: Field, form: Formily.Core.Models.Form) => React.ReactChild)
    | React.ReactNode
  decorator?: [] | [D] | [D, React.ComponentProps<D>] | any[]
  component?: [] | [C] | [C, React.ComponentProps<C>] | any[]
}

export interface IVoidFieldProps<
  D extends JSXComponent,
  C extends JSXComponent,
  Field = Formily.Core.Models.VoidField
> extends Formily.Core.Types.IVoidFieldFactoryProps<D, C> {
  children?:
    | ((field: Field, form: Formily.Core.Models.Form) => React.ReactChild)
    | React.ReactNode
  decorator?: [] | [D] | [D, React.ComponentProps<D>] | any[]
  component?: [] | [C] | [C, React.ComponentProps<C>] | any[]
}

export interface IComponentMapper<T extends JSXComponent> {
  (target: T): JSXComponent
}

export type IStateMapper<Props> =
  | {
      [key in keyof Formily.Core.Models.Field]?: keyof Props | boolean
    }
  | ((props: Props, field: Formily.Core.Types.GeneralField) => Props)

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
> extends Omit<
    Formily.Core.Types.IFieldFactoryProps<Decorator, Component, InnerField>,
    'name'
  > {
  schema?: ISchema
  scope?: any
  name?: SchemaKey
  children?: React.ReactNode
}

export interface ISchemaFieldUpdateRequest {
  state?: Formily.Core.Types.IFieldState
  schema?: ISchema
  run?: string
}

export interface ISchemaMapper {
  (schema: Schema, name: SchemaKey): Schema
}

export interface ISchemaFilter {
  (schema: Schema, name: SchemaKey): boolean
}
export interface IRecursionFieldProps {
  schema: Schema
  name?: SchemaKey
  basePath?: FormPathPattern
  onlyRenderProperties?: boolean
  onlyRenderSelf?: boolean
  mapProperties?: ISchemaMapper
  filterProperties?: ISchemaFilter
}

export type ObjectKey = string | number | boolean | symbol

export type Path<T, Key extends keyof T = keyof T> = Key extends string
  ? T[Key] extends Record<string, any>
    ?
        | `${Key}.${Path<T[Key], Exclude<keyof T[Key], keyof Array<any>>> &
            string}`
        | `${Key}.${Exclude<keyof T[Key], keyof Array<any>> & string}`
        | Key
    : Key
  : never

export type PathValue<
  T,
  P extends Path<T>
> = P extends `${infer Key}.${infer Rest}`
  ? Key extends keyof T
    ? Rest extends Path<T[Key]>
      ? PathValue<T[Key], Rest>
      : never
    : never
  : P extends keyof T
  ? T[P]
  : never

export type KeyOfReactComponent<T> = Exclude<
  keyof T,
  'contextTypes' | 'displayName' | 'propTypes' | 'defaultProps'
>

export type ReactComponentPath<
  T,
  Key extends KeyOfReactComponent<T> = KeyOfReactComponent<T>
> = Key extends string
  ? T[Key] extends Record<string, any>
    ?
        | `${Key}.${Exclude<KeyOfReactComponent<T[Key]>, keyof Array<any>> &
            string}`
        | Key
    : Key
  : never

export type ReactComponentPropsByPathValue<
  T extends Record<string, any>,
  P extends ReactComponentPath<T>
> = P extends `${infer Key}.${infer Rest}`
  ? Key extends keyof T
    ? Rest extends ReactComponentPath<T[Key]>
      ? ReactComponentPropsByPathValue<T[Key], Rest>
      : never
    : never
  : P extends keyof T
  ? React.ComponentProps<T[P]>
  : never
export interface ISchemaMarkupFieldProps<
  Components extends SchemaComponents,
  Decorator extends ReactComponentPath<Components>,
  Component extends ReactComponentPath<Components>
> extends ISchema<
    Decorator,
    Component,
    ReactComponentPropsByPathValue<Components, Decorator>,
    ReactComponentPropsByPathValue<Components, Component>,
    Formily.Core.Types.FormPatternTypes,
    Formily.Core.Types.FieldDisplayTypes,
    Formily.Core.Types.FieldValidator,
    React.ReactNode,
    Formily.Core.Types.GeneralField
  > {
  children?: React.ReactNode
}

export type ISchemaTypeFieldProps<
  Components extends SchemaComponents,
  Decorator extends ReactComponentPath<Components>,
  Component extends ReactComponentPath<Components>
> = Omit<ISchemaMarkupFieldProps<Components, Decorator, Component>, 'type'>

export interface ISchemaTransformerOptions extends ISchemaFieldFactoryOptions {
  required?: ISchema['required']
}
