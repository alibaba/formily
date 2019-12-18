import React, { useState } from 'react'
import { Button, Row, Col, Radio } from 'antd'
import { SchemaTree } from './components/SchemaTree'
import { SchemaCode } from './components/SchemaCode'
import nextComponents from './utils/nextCompProps'
import antdComponents from './utils/antdCompProps'

import 'antd/dist/antd.css'

export const SchemaEditor: React.FC<{
  schema: any
  onChange: (schema: any) => void
}> = ({ schema, onChange }) => {
  const [componentType, setComponentType] = useState('antd');

  function handleTypeChange(e) {
    setComponentType(e.target.value);
  }

  return (
    <div className="schema-editor">
      <div className="schema-menus">
        <Button type="primary">快速生成</Button>
        {/* <Button className="schema-preview-btn">
          <Icon type="success"></Icon>预览
        </Button> */}
        <span className="select-component-type">
          选择组件类型：
          <Radio.Group onChange={handleTypeChange}>
            <Radio value="antd">Ant Design组件</Radio>
            <Radio value="fusion">Fusion Design组件</Radio>
          </Radio.Group>
        </span>

      </div>
      <Row className="schema-editor-main" style={{ minHeight: '350px' }}>
        <Col span={24} className="schema-col schema-tree splitter">
          <SchemaTree schema={schema} onChange={onChange} components={componentType === 'fusion' ? nextComponents : antdComponents}/>
        </Col>
        <Col
          className="schema-col schema-code"
          style={{ position: 'absolute', right: '0px', height: '100%' }}
        >
          <SchemaCode schema={schema} onChange={onChange}></SchemaCode>
        </Col>
      </Row>
    </div>
  )
}
