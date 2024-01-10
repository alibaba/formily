// This file just converts types
import * as components from './components'

import type Vue from 'vue'
import type { VueConstructor } from 'vue'
import type {
  IVoidFieldProps,
  IArrayFieldProps,
  IObjectFieldProps,
  IFieldProps,
  IRecursionFieldProps,
  IProviderProps,
  ISchemaMarkupFieldProps,
  ISchemaFieldProps,
  ISchemaFieldVueFactoryOptions,
  ISchemaTypeFieldProps,
  SchemaVueComponents,
} from './types'

const {
  Field: _Field,
  ArrayField: _ArrayField,
  FormConsumer: _FormConsumer,
  FormProvider: _FormProvider,
  ObjectField: _ObjectField,
  RecursionField: _RecursionField,
  VoidField: _VoidField,
  createSchemaField: _createSchemaField,
} = components

type DefineComponent<Props> = Vue & VueConstructor & Props

type SchemaFieldComponents = {
  SchemaField: DefineComponent<Omit<ISchemaFieldProps, 'name' | 'components'>>
  SchemaMarkupField: DefineComponent<ISchemaMarkupFieldProps>
  SchemaStringField: DefineComponent<ISchemaTypeFieldProps>
  SchemaObjectField: DefineComponent<ISchemaTypeFieldProps>
  SchemaArrayField: DefineComponent<ISchemaTypeFieldProps>
  SchemaBooleanField: DefineComponent<ISchemaTypeFieldProps>
  SchemaDateField: DefineComponent<ISchemaTypeFieldProps>
  SchemaDateTimeField: DefineComponent<ISchemaTypeFieldProps>
  SchemaVoidField: DefineComponent<ISchemaTypeFieldProps>
  SchemaNumberField: DefineComponent<ISchemaTypeFieldProps>
}

type CreateSchemaField<
  Components extends SchemaVueComponents = SchemaVueComponents
> = (
  options: ISchemaFieldVueFactoryOptions<Components>
) => SchemaFieldComponents

const Field = _Field as unknown as DefineComponent<Omit<IFieldProps, 'name'>>
const ArrayField = _ArrayField as unknown as DefineComponent<
  Omit<IArrayFieldProps, 'name'>
>
const ObjectField = _ObjectField as unknown as DefineComponent<
  Omit<IObjectFieldProps, 'name'>
>
const VoidField = _VoidField as unknown as DefineComponent<
  Omit<IVoidFieldProps, 'name'>
>
const RecursionField = _RecursionField as unknown as DefineComponent<
  Omit<IRecursionFieldProps, 'name'>
>
const FormConsumer = _FormConsumer as unknown as DefineComponent<{}>
const FormProvider = _FormProvider as unknown as DefineComponent<IProviderProps>
const createSchemaField = _createSchemaField as unknown as CreateSchemaField

export {
  Field,
  ArrayField,
  ObjectField,
  VoidField,
  RecursionField,
  FormConsumer,
  FormProvider,
  createSchemaField,
}
