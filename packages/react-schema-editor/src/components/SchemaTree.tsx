import React from 'react'
import { ISchemaTreeProps } from '../utils/types'
import { FieldEditor } from './FieldEditor'

export const SchemaTree: React.FC<ISchemaTreeProps> = ({
  schema,
  onChange
}) => {
  return (
    <div>
      <FieldEditor></FieldEditor>
      <FieldEditor></FieldEditor>
      <FieldEditor>
        <FieldEditor>
          <FieldEditor></FieldEditor>
        </FieldEditor>
        <FieldEditor></FieldEditor>
      </FieldEditor>
    </div>
  )
}
