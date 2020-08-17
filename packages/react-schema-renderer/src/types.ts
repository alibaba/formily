import React from 'react'
import { FormPathPattern } from '@formily/shared'
import {
  IFieldState,
  IVirtualFieldState,
  IMutators,
  IFormProps,
  IForm,
  IFormActions,
  IFormAsyncActions,
  IFormEffect
} from '@formily/react'
import { ValidatePatternRules } from '@formily/validator'
import { Schema } from './shared/schema'
export * from '@formily/react'

declare global {
  namespace FormilyCore {
    // eslint-disable-next-line
    export interface FieldProps extends ISchema {}
    // eslint-disable-next-line
    export interface VirtualFieldProps extends ISchema {}
  }
}

export interface ISchemaFieldProps {
  path?: FormPathPattern
  schema?: Schema
  onlyRenderProperties?: boolean
}

export type ComponentWithStyleComponent<
  ComponentProps
> = React.JSXElementConstructor<ComponentProps> & {
  styledComponentId?: string
  displayName?: string
}

export interface ISchemaFieldComponentProps extends IFieldState {
  schema: Schema
  mutators: IMutators
  form: IForm
  renderField: (
    addtionKey: string | number,
    reactKey?: string | number
  ) => React.ReactElement
}

export type ISchemaFieldContextProps = Partial<ISchemaFieldComponentProps>

export interface ISchemaVirtualFieldComponentProps extends IVirtualFieldState {
  schema: Schema
  form: IForm
  children: React.ReactElement[]
  renderField: (
    addtionKey: string | number,
    reactKey?: string | number
  ) => React.ReactElement
}

export type IVirtualBoxProps<Props> = Props & {
  name?: string
  visible?: boolean
  display?: boolean
}

export interface ISchemaFieldWrapper<Props = any> {
  (Traget: ISchemaFieldComponent):
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

export type ISchemaLinkageHandler = (
  spec: any,
  context: any
) => IFormEffect<any, ISchemaFormActions>

export interface ISchemaFormRegistry {
  fields: {
    [key: string]: ISchemaFieldComponent
  }
  virtualFields: {
    [key: string]: ISchemaVirtualFieldComponent
  }
  wrappers?: ISchemaFieldWrapper[]
  formItemComponent: React.JSXElementConstructor<any>
  formComponent: string | React.JSXElementConstructor<any>
}

export type SchemaMessage = React.ReactNode

export interface ISchema {
  /** base json schema spec**/
  title?: SchemaMessage
  description?: SchemaMessage
  default?: any
  readOnly?: boolean
  writeOnly?: boolean
  type?: 'string' | 'object' | 'array' | 'number' | 'boolean' | string
  enum?: Array<
    | string
    | number
    | { label: SchemaMessage; value: any; [key: string]: any }
    | { key: any; title: SchemaMessage; [key: string]: any }
  >
  const?: any
  multipleOf?: number
  maximum?: number
  exclusiveMaximum?: number
  minimum?: number
  exclusiveMinimum?: number
  maxLength?: number
  minLength?: number
  pattern?: string | RegExp
  maxItems?: number
  minItems?: number
  uniqueItems?: boolean
  maxProperties?: number
  minProperties?: number
  required?: string[] | boolean | string
  format?: string
  /** nested json schema spec **/
  properties?: {
    [key: string]: ISchema
  }
  items?: ISchema | ISchema[]
  additionalItems?: ISchema
  patternProperties?: {
    [key: string]: ISchema
  }
  additionalProperties?: ISchema
  /** extend json schema specs */
  editable?: boolean
  visible?: boolean | string
  display?: boolean | string
  triggerType?: 'onBlur' | 'onChange'
  ['x-props']?: { [name: string]: any }
  ['x-index']?: number
  ['x-rules']?: ValidatePatternRules
  ['x-linkages']?: Array<{
    target: FormPathPattern
    type: string
    [key: string]: any
  }>
  ['x-mega-props']?: { [name: string]: any }
  ['x-item-props']?: { [name: string]: any }
  ['x-component']?: string
  ['x-component-props']?: { [name: string]: any }
  ['x-render']?: <T = ISchemaFieldComponentProps>(
    props: T & {
      renderComponent: () => React.ReactElement
    }
  ) => React.ReactElement
  ['x-effect']?: (
    dispatch: (type: string, payload: any) => void,
    option?: object
  ) => { [key: string]: any }
}

export interface ISchemaFormProps<
  Value = any,
  DefaultValue = any,
  FormEffectPayload = any,
  FormActions = ISchemaFormActions | ISchemaFormAsyncActions
> extends IFormProps<Value, DefaultValue, FormEffectPayload, FormActions> {
  schema?: ISchema
  fields?: ISchemaFormRegistry['fields']
  components?: {
    [key: string]: React.JSXElementConstructor<any>
  }
  virtualFields?: ISchemaFormRegistry['virtualFields']
  formComponent?: ISchemaFormRegistry['formComponent']
  formItemComponent?: ISchemaFormRegistry['formItemComponent']
  expressionScope?: { [key: string]: any }
}

export interface IMarkupSchemaFieldProps extends ISchema {
  name?: string
}

export type MergedFieldComponentProps = Partial<
  ISchemaFieldComponentProps & ISchemaVirtualFieldComponentProps
>

export interface IConnectOptions {
  valueName?: string
  eventName?: string
  defaultProps?: {}
  getValueFromEvent?: (event?: any, value?: any) => any
  getProps?: (
    componentProps: {},
    fieldProps: MergedFieldComponentProps
  ) => {} | void
  getComponent?: (
    Target: any,
    componentProps: {},
    fieldProps: MergedFieldComponentProps
  ) => React.JSXElementConstructor<any>
}

export interface IConnectProps {
  [key: string]: any
}

export interface ISchemaFormActions extends IFormActions {
  getSchema(): Schema
  getFormSchema(): Schema
}

export interface ISchemaFormAsyncActions extends IFormAsyncActions {
  getSchema(): Promise<Schema>
  getFormSchema(): Promise<Schema>
}

export type MixinConnectedComponent<T extends string> = React.FC<
  ISchemaFieldComponentProps
> &
  {
    [key in T]: React.FC<ISchemaFieldComponentProps>
  }
