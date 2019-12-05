import React from 'react'
import { Button, Drawer } from '@alifd/next';
import MonacoEditor from 'react-monaco-editor'
import { ISchemaCodeProps } from '../utils/types'

const options = {
  selectOnLineNumbers: true
};

export const SchemaCode: React.FC<ISchemaCodeProps> = ({
  schema,
  onChange
}) => {
  const [show, setShow] = useState(false);
  if (typeof schema === 'object') {
    schema = JSON.stringify(schema, null, '\t')
  }

  return (
    <div>
      <MonacoEditor
        width="500"
        height="500"
        language="json"
        theme="vs-dark"
        options={options}
        value={schema}
      />
    </div>
  )
}
