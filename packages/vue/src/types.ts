import Vue, { ComponentOptions, Component } from 'vue'
import { SetupContext } from 'vue-demi'
import { FormPathPattern } from '@formily/shared'
import { ISchema, Schema, SchemaKey } from '@formily/json-schema'

export type VueComponent = ComponentOptions<Vue> | Component

export type VueComponentProps<T extends VueComponent = ComponentOptions<Vue>> = T extends Vue ? Exclude<T, keyof Vue> : (T extends ComponentOptions<Vue> ? T['props'] : Record<string, any>)

export interface ObservableComponentOptions <T extends VueComponent = VueComponent> {
  observableSetup?: (collect: (data: Record<string, any>) => any, props: VueComponentProps<T>, context: SetupContext) => any
  [key: string]: any
}

export interface IProviderProps {
  form: Formily.Core.Models.Form
}

export type IFieldProps<
  D extends VueComponent,
  C extends VueComponent
> = Formily.Core.Types.IFieldFactoryProps<D, C>

export type IVoidFieldProps<
  D extends VueComponent,
  C extends VueComponent
> = Formily.Core.Types.IVoidFieldFactoryProps<D, C>

export interface IComponentMapper<T extends VueComponent = any> {
  (target: T): VueComponent
}

export type IStateMapper<Props> =
  | {
      [key in keyof Formily.Core.Models.Field]?: keyof Props | boolean
    }
  | ((props: Props, field: Formily.Core.Types.GeneralField) => Props)


export type SchemaComponents = Record<string, VueComponent>

export interface ISchemaFieldFactoryOptions<
  Components extends SchemaComponents = any
> {
  components?: Components
  scope?: any
}

export interface ISchemaFieldProps<
  Decorator extends VueComponent = any,
  Component extends VueComponent = any,
  InnerField = Formily.Core.Models.ObjectField<Decorator, Component>
> extends Omit<
    Formily.Core.Types.IFieldFactoryProps<Decorator, Component, InnerField>,
    'name'
  > {
  schema?: ISchema
  scope?: any
  name?: SchemaKey
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

export type KeyOfComponents<T> = keyof T

export type ComponentPath<
  T,
  Key extends KeyOfComponents<T> = KeyOfComponents<T>
> = Key extends string
  ? Key
  : never

export type ComponentPropsByPathValue<
  T extends SchemaComponents,
  P extends ComponentPath<T>
> = P extends keyof T
  ? VueComponentProps<T[P]>
  : never

export type ISchemaMarkupFieldProps<
  Components extends SchemaComponents,
  Decorator extends ComponentPath<Components>,
  Component extends ComponentPath<Components>
> = ISchema<
    Decorator,
    Component,
    ComponentPropsByPathValue<Components, Decorator>,
    ComponentPropsByPathValue<Components, Component>,
    Formily.Core.Types.FormPatternTypes,
    Formily.Core.Types.FieldDisplayTypes,
    Formily.Core.Types.FieldValidator,
    React.ReactNode,
    Formily.Core.Types.GeneralField
  >

export type ISchemaTypeFieldProps<
  Components extends SchemaComponents,
  Decorator extends ComponentPath<Components>,
  Component extends ComponentPath<Components>
> = Omit<ISchemaMarkupFieldProps<Components, Decorator, Component>, 'type'>

export interface ISchemaTransformerOptions extends ISchemaFieldFactoryOptions {
  required?: ISchema['required']
}
