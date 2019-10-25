import React from 'react'
// import MonacoEditor from 'react-monaco-editor'
import { ISchemaCodeProps } from '../utils/types'

export const SchemaCode: React.FC<ISchemaCodeProps> = ({
  schema,
  onChange
}) => {
  if (typeof schema === 'object') {
    schema = JSON.stringify(schema, null, '\t')
  }

  return (
    <div>
      {/* <MonacoEditor
        width="500"
        height="500"
        language="json"
        theme="vs-dark"
        value={schema}
      /> */}
    </div>
  )
}
