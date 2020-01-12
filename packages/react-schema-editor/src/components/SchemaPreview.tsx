import * as React from 'react'
import { ISchemaPreviewProps } from '../utils/types'
import {
  SchemaForm,
} from '@uform/react-schema-renderer'

export const SchemaPreview: React.FC<ISchemaPreviewProps> = ({ schema }) => {
  return <SchemaForm schema={schema}></SchemaForm>
}

SchemaPreview.displayName = 'SchemaPreview';
