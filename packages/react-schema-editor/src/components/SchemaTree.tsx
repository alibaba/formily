import React from 'react'
import { ISchemaTreeProps } from '../utils/types'
import { FieldEditor } from './FieldEditor'

export const SchemaTree: React.FC<ISchemaTreeProps> = ({
  schema,
  components,
  onChange
}) => {
  const xRules = ['required', 'pattern', 'validator']
  return (
    <div>
      <FieldEditor
        schema={schema.name}
        components={components}
        xRules={xRules}
        onChange={currentSchema => {
          console.log('currentSchema====', currentSchema);
          onChange({
            name: currentSchema
          })
        }}
      />
    </div>
  )
}
