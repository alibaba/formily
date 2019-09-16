import { FormPathPattern, FormPath } from '@uform/shared'
import { IFieldState, IVirtualFieldState, IMutators } from '@uform/react'
import { Schema } from './shared/schema'
export interface ISchemaFieldProps {
  path?: FormPathPattern
}

export type ComponentWithStyleComponent<ComponentProps> = React.ComponentType<
  ComponentProps
> & {
  styledComponentId?: string
}

export interface ISchemaFieldComponentProps extends IFieldState {
  schema: Schema
  mutators: IMutators
  path: FormPath
  renderField: (
    addtionKey: string | number,
    reactKey?: string | number
  ) => React.ReactElement
}
export interface ISchemaVirtualFieldComponentProps extends IVirtualFieldState {
  path: FormPath
  schema: Schema
  children: React.ReactElement[]
  renderField: (
    addtionKey: string | number,
    reactKey?: string | number
  ) => React.ReactElement
}

export interface ISchemaFieldWrapper<Props = any> {
  (Traget: ISchemaFieldComponent | ISchemaVirtualFieldComponent):
    | React.FC<Props>
    | React.ClassicComponent<Props>
}

export type ISchemaFieldComponent = ComponentWithStyleComponent<
  ISchemaFieldComponentProps
> & {
  __WRAPPERS__?: ISchemaFieldWrapper[]
}

export type ISchemaVirtualFieldComponent = ComponentWithStyleComponent<
  ISchemaVirtualFieldComponentProps
> & {
  __WRAPPERS__?: ISchemaFieldWrapper[]
}

export interface IFieldStore {
  fields: {
    [key: string]: ISchemaFieldComponent
  }
  virtualFields: {
    [key: string]: ISchemaVirtualFieldComponent
  }
  wrappers: ISchemaFieldWrapper[]
}
