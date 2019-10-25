import { Input, Select, Checkbox, Button, Icon } from '@alifd/next'
import React from 'react'

const typeOptions = [
  { label: '字符串', value: 'string' },
  { label: '布尔值', value: 'boolean' },
  { label: '数字', value: 'number' },
  { label: '数组', value: 'array' },
  { label: '对象', value: 'object' }
]

export const FieldEditor: React.FC = ({ children }) => {
  return (
    <div className="field-editor">
      <div className="field-operate">
        <Button className="op-btn op-btn-add" size="small">
          +
        </Button>
        <Button className="op-btn op-btn-delete" size="small">
          -
        </Button>
        <Button className="op-btn op-btn-delete" size="small">
          <Icon type="set" />
        </Button>
      </div>
      <div className="field-group">
        <Input
          className="field-input"
          label="key"
          name="key"
          size="small"
        ></Input>
        <Input
          className="field-input"
          label="title"
          name="title"
          size="small"
        ></Input>
        <Select
          className="field-input"
          label="type"
          name="type"
          size="small"
          dataSource={typeOptions}
        ></Select>
        <Select
          className="field-input"
          label="component"
          name="component"
          size="small"
        ></Select>
        <Input
          className="field-input"
          label="desc"
          name="description"
          size="small"
        ></Input>
        <Checkbox
          className="field-input"
          label="必填"
          name="required"
        ></Checkbox>
      </div>
      <div className="props-group"></div>
      <div className="field-children">{children}</div>
    </div>
  )
}
