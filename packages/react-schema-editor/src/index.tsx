import React from 'react'
import { Button, Icon, Row, Col } from 'antd'
import { jsonToSchema } from './utils'
import { SchemaTree } from './components/SchemaTree'
import { SchemaCode } from './components/SchemaCode'
import json from './utils/schema'
import 'antd/dist/antd.css'

const components = [
  {
    name: 'Input',
    'x-component-props': {
      value: {},
      disabled: {},
      onChange: {}
    }
  },
  {
    name: 'Switch',
    'x-component-props': {
      checked: {},
      disabled: {},
      onChange: {}
    }
  }
]

export const SchemaEditor: React.FC = () => {
  const initialSchema = jsonToSchema(json)
  const [schema, setSchema] = React.useState(initialSchema)

  return (
    <div className="schema-editor">
      <div className="schema-menus">
        <Button type="primary">快速生成</Button>
        <Button className="schema-preview-btn">
          <Icon type="success"></Icon>预览
        </Button>
      </div>
      <Row className="schema-editor-main">
        <Col span={18} className="schema-col schema-tree splitter">
          <SchemaTree
            schema={schema}
            onChange={setSchema}
            components={components}
          ></SchemaTree>
        </Col>
        <Col span={6} className="schema-col schema-code">
          <SchemaCode schema={schema} onChange={setSchema}></SchemaCode>
        </Col>
      </Row>
    </div>
  )
}
