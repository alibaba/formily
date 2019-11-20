import React from 'react'
import {
  SchemaMarkupForm,
  SchemaMarkupField
} from '@uform/react-schema-renderer'
import { IAntdSchemaFormProps, IAntdSchemaFieldProps } from './types'
import './fields'
import './compat'
export * from '@uform/react-schema-renderer'
export * from './components'
export * from './types'
export { mapStyledProps, mapTextComponent } from './shared'
export const SchemaForm: React.FC<IAntdSchemaFormProps> = SchemaMarkupForm as any
export const Field: React.FC<IAntdSchemaFieldProps> = SchemaMarkupField
export default SchemaForm
