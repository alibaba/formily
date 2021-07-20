import type { Vue2Component } from './vue2'
import type { Vue3Component } from './vue3'
import {
  Form,
  IFieldFactoryProps,
  IVoidFieldFactoryProps,
  GeneralField,
  Field,
  ObjectField,
  FormPatternTypes,
  FieldDisplayTypes,
  FieldValidator,
} from '@formily/core'
import type { FormPathPattern } from '@formily/shared'
import type { ISchema, Schema, SchemaKey } from '@formily/json-schema'
import type { DefineComponent as DefineVue3Component } from '@type-helper/vue3'

export type DefineComponent<Props = Record<string, any>> =
  DefineVue3Component<Props>

export type VueComponent<Props = Record<string, any>> =
  | Vue2Component<Props>
  | Vue3Component<Props>
  | Props
export type VueComponentOptionsWithProps = {
  props: unknown
}
export type VueComponentProps<T extends VueComponent> =
  T extends VueComponentOptionsWithProps ? T['props'] : T

export interface IProviderProps {
  form: Form
}

export type IFieldProps<
  D extends VueComponent = VueComponent,
  C extends VueComponent = VueComponent
> = IFieldFactoryProps<D, C>

export type IVoidFieldProps<
  D extends VueComponent = VueComponent,
  C extends VueComponent = VueComponent
> = IVoidFieldFactoryProps<D, C>

export type IArrayFieldProps = IFieldProps
export type IObjectFieldProps = IFieldProps

export interface IReactiveFieldProps {
  field: GeneralField
}

export interface IComponentMapper<T extends VueComponent = any> {
  (target: T): VueComponent
}

export type IStateMapper<Props> =
  | {
      [key in keyof Field]?: keyof Props | boolean
    }
  | ((props: Props, field: GeneralField) => Props)

export type SchemaVueComponents = Record<string, VueComponent>

export interface ISchemaFieldVueFactoryOptions<
  Components extends SchemaVueComponents = any
> {
  components?: Components
  scope?: any
}

export interface ISchemaFieldProps<
  Decorator extends VueComponent = VueComponent,
  Component extends VueComponent = VueComponent,
  InnerField = ObjectField<Decorator, Component>
> extends Omit<IFieldFactoryProps<Decorator, Component, InnerField>, 'name'> {
  schema?: ISchema
  components?: {
    [key: string]: VueComponent
  }
  scope?: any
  name?: SchemaKey
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

export type KeyOfComponents<T> = keyof T

export type ComponentPath<
  T,
  Key extends KeyOfComponents<T> = KeyOfComponents<T>
> = Key extends string ? Key : never

export type ComponentPropsByPathValue<
  T extends SchemaVueComponents,
  P extends ComponentPath<T>
> = P extends keyof T ? VueComponentProps<T[P]> : never

export type ISchemaMarkupFieldProps<
  Components extends SchemaVueComponents = SchemaVueComponents,
  Decorator extends ComponentPath<Components> = ComponentPath<Components>,
  Component extends ComponentPath<Components> = ComponentPath<Components>
> = ISchema<
  Decorator,
  Component,
  ComponentPropsByPathValue<Components, Decorator>,
  ComponentPropsByPathValue<Components, Component>,
  FormPatternTypes,
  FieldDisplayTypes,
  FieldValidator,
  string,
  GeneralField
>

export type ISchemaTypeFieldProps<
  Components extends SchemaVueComponents = SchemaVueComponents,
  Decorator extends ComponentPath<Components> = ComponentPath<Components>,
  Component extends ComponentPath<Components> = ComponentPath<Components>
> = Omit<ISchemaMarkupFieldProps<Components, Decorator, Component>, 'type'>
