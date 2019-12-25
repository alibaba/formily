import React, {useState} from 'react'
import { Button, Radio, Tabs } from 'antd'
import * as fp from 'lodash/fp'
import _ from 'lodash'
import { SchemaTree } from './components/SchemaTree'
import FieldEditor from './components/FieldEditor'
import { SchemaCode } from './components/SchemaCode'
import { SchemaPreview } from './components/SchemaPreview'
import nextComponents from './utils/nextCompProps'
import antdComponents from './utils/antdCompProps'
import 'antd/dist/antd.css'
import './main.scss'

export const SchemaEditor: React.FC<{
  schema: any
  onChange: (schema: any) => void
}> = ({ schema, onChange }) => {
  const [componentType, setComponentType] = useState('antd');
  const [selectedPath, setSelectedPath] = React.useState(null);

  const handleTypeChange = (e) => {
    setComponentType(e.target.value);
  }

  const handleTreeSelect = (path) => {
    setSelectedPath(path)
  }

  const handleCodeChange = (code) => {
    console.log(code);
  }

  const selectedSchema =
  selectedPath &&
  (selectedPath === 'root' ? schema : fp.get(selectedPath, schema))
  return (
    <div className="schema-editor">
      <div className="schema-menus">
        <Button type="primary">快速生成</Button>
        <span className="select-component-type">
          选择组件类型：
          <Radio.Group onChange={handleTypeChange} defaultValue="antd">
            <Radio value="antd">Ant Design组件</Radio>
            <Radio value="fusion">Fusion Design组件</Radio>
          </Radio.Group>
        </span>
      </div>
      <div className="schema-editor-main">
        <div className="schema-tree">
          <SchemaTree schema={schema} onChange={onChange} onSelect ={handleTreeSelect} />
        </div>
        <div className="schema-tabs">
          <Tabs type="card">
            <Tabs.TabPane tab="属性编辑" key="1">
              {selectedSchema ? <FieldEditor
                  components={componentType === 'fusion' ? nextComponents : antdComponents}
                  fieldKey="fieldC"
                  onFieldKeyChange={value => {
                    console.log('onFieldKeyChange====', value)
                  }}
                  schema={selectedSchema}
                  onChange={value => {
                    const newSchema = _.clone(schema)
                    _.set(newSchema, selectedPath, value)
                    onChange(newSchema)
                  }}
              /> : <div className="field-editor-holder">👈请先选择左侧树节点</div>}
            </Tabs.TabPane>
            <Tabs.TabPane tab="Schema源码" key="2">
              <SchemaCode schema={schema} onChange={handleCodeChange}></SchemaCode>
            </Tabs.TabPane>
            <Tabs.TabPane tab="预览" key="3">
              <SchemaPreview schema={schema}></SchemaPreview>
            </Tabs.TabPane>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
