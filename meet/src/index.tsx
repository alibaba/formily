import React from 'react'
import {
  SchemaMarkupForm,
  SchemaMarkupField
} from '@uform/react-schema-renderer'
import { INextSchemaFormProps, INextSchemaFieldProps } from './types'
import './fields'
import './compat'
export * from '@uform/react-schema-renderer'
export * from './components'
export * from './types'
export { mapStyledProps, mapTextComponent } from './shared'
export const SchemaForm: React.FC<INextSchemaFormProps> = SchemaMarkupForm as any
export const Field: React.FC<INextSchemaFieldProps> = SchemaMarkupField
export default SchemaForm
