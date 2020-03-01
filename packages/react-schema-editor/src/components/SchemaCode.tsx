import React from 'react'
import {Tooltip} from 'antd';
import {DownloadOutlined, CopyOutlined} from '@ant-design/icons';
import MonacoEditor from 'react-monaco-editor'
import { ISchemaCodeProps } from '../utils/types'
import {copySchema, downloadSchema} from '../utils/schemaTools'

export const SchemaCode: React.FC<ISchemaCodeProps> = ({
  schema,
  onChange
}) => {

  if (typeof schema === 'object') {
    schema = JSON.stringify(schema, null, '\t')
  }

  const styles = {
    icon: {
      fontSize: '20px',
      color: '#fff',
      paddingRight: '10px'
    }
  };

  const ToolBar = () => {
    return (
      <div style={{ height: '30px', lineHeight: '30px', padding: '3px 30px', textAlign: 'right', background: '#1890ff' }}>
        <Tooltip placement="left" title="复制协议">
          <CopyOutlined onClick={() => {copySchema(schema)}} style={styles.icon} />
        </Tooltip>
        <Tooltip placement="left" title="下载协议">
          <DownloadOutlined onClick={()=> {downloadSchema(schema)}} style={styles.icon} />
        </Tooltip>
      </div>
  )};

  return (
    <div>
      <ToolBar></ToolBar>
      <MonacoEditor
        height={500}
        language="json"
        theme="vs-dark"
        onChange={(schema) => onChange(schema)}
        value={schema}
      />
    </div>

  )
}
