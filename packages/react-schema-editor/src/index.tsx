import React, { useState } from 'react'
import { Radio, Tabs } from 'antd'
import * as fp from 'lodash/fp'
import _ from 'lodash'
import { SchemaTree } from './components/SchemaTree'
import FieldEditor from './components/FieldEditor'
import { SchemaCode } from './components/SchemaCode'
import JsonDialog from './components/JsonDialog'
// import { SchemaPreview } from './components/SchemaPreview'
import { ComponentTypes } from './utils/types'
import {
  getDefaultComponentType,
  getComponentsByComponentType
} from './utils/schemaHelpers'
import 'antd/dist/antd.css'
import './main.scss'

export const SchemaEditor: React.FC<{
  className?: string
  schema: any
  showAntdComponents: boolean
  showFusionComponents: boolean
  customComponents: []
  onChange: (schema: any) => void
}> = ({
  className,
  schema,
  showAntdComponents = true,
  showFusionComponents = true,
  customComponents = [],
  onChange
}) => {
  const [componentType, setComponentType] = useState(
    getDefaultComponentType({ showAntdComponents, showFusionComponents })
  )
  const [selectedPath, setSelectedPath] = useState(null)

  const selectedPaths = (selectedPath && selectedPath.split('.')) || []
  const fieldKey =
    selectedPaths.length > 0 && selectedPaths[selectedPaths.length - 1]

  const handleTypeChange = e => {
    setComponentType(e.target.value)
  }

  const handleTreeSelect = path => {
    setSelectedPath(path)
  }

  const handleCodeChange = () => {}

  const handleSchemaChange = (schema: string) => {
    onChange(schema)
  }

  const isRoot = selectedPath === 'root'

  const selectedSchema =
    selectedPath && (isRoot ? schema : fp.get(selectedPath, schema))

  return (
    <div className={`schema-editor ${className}`}>
      <div className="schema-menus">
        <JsonDialog onChange={handleSchemaChange} />
        {(showAntdComponents || showFusionComponents) && (
          <span className="select-component-type">
            选择组件类型：
            <Radio.Group
              onChange={handleTypeChange}
              defaultValue={componentType}
            >
              {showAntdComponents && (
                <Radio value={ComponentTypes.ANTD}>Ant Design组件</Radio>
              )}
              {showFusionComponents && (
                <Radio value={ComponentTypes.FUSION}>Fusion Design组件</Radio>
              )}
            </Radio.Group>
          </span>
        )}
      </div>
      <div className="schema-editor-main">
        <div className="schema-tree">
          <SchemaTree
            schema={schema}
            onChange={onChange}
            onSelect={handleTreeSelect}
          />
        </div>
        <div className="schema-tabs">
          <Tabs type="card">
            <Tabs.TabPane tab="属性编辑" key="1">
              {selectedSchema ? (
                <FieldEditor
                  components={getComponentsByComponentType({
                    componentType,
                    customComponents
                  })}
                  isRoot={isRoot}
                  fieldKey={fieldKey}
                  onFieldKeyChange={value => {
                    const newSchema = _.cloneDeep(schema)
                    // 新增 key
                    const selectedPathPrev = selectedPaths
                      .slice(0, selectedPaths.length - 1)
                      .join('.')
                    const newSelectPath = selectedPathPrev + '.' + value
                    _.set(newSchema, newSelectPath, _.cloneDeep(selectedSchema))
                    // 移除旧 key
                    _.unset(newSchema, selectedPath)

                    onChange(newSchema)
                    setSelectedPath(newSelectPath)
                  }}
                  schema={selectedSchema}
                  onChange={value => {
                    if (isRoot) {
                      onChange(value)
                    } else {
                      const newSchema = _.cloneDeep(schema)
                      _.set(newSchema, selectedPath, value)
                      onChange(newSchema)
                    }
                  }}
                />
              ) : (
                <div className="field-editor-holder">👈请先选择左侧树节点</div>
              )}
            </Tabs.TabPane>
            <Tabs.TabPane tab="Schema源码" key="2">
              <SchemaCode
                schema={schema}
                onChange={handleCodeChange}
              ></SchemaCode>
            </Tabs.TabPane>
            <Tabs.TabPane tab="预览" key="3">
              开发中，敬请期待...
              {/* <SchemaPreview schema={schema}></SchemaPreview> */}
            </Tabs.TabPane>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
