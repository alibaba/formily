import * as React from 'react'
import { ISchemaPreviewProps } from '../utils/types'
import {
  SchemaForm,
  registerFormField,
  connect
} from '@uform/react-schema-renderer'

import {Input} from 'antd';

export const SchemaPreview: React.FC<ISchemaPreviewProps> = ({ schema }) => {
  const displayName = 'SchemaPreview';
  return <SchemaForm schema={schema} fields={[{'Input': Input}]}></SchemaForm>
}
