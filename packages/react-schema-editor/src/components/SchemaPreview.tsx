import * as React from 'react'
import { ISchemaPreviewProps } from '../utils/types'
import {
  SchemaForm,
  registerFormField,
  connect
} from '@uform/react-schema-renderer'

registerFormField(
  'string',
  connect()(({ value, onChange }) => {
    return <input value={value} onChange={onChange} />
  })
)

export const SchemaPreview: React.FC<ISchemaPreviewProps> = ({ schema }) => {
  return <SchemaForm schema={schema}></SchemaForm>
}
