import { Input, Select, Checkbox, Button, Icon } from 'antd'
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
        <Input className="field-input" name="key" size="small"></Input>
        <Input className="field-input" name="title" size="small"></Input>
        <Select
          className="field-input"
          size="small"
          dataSource={typeOptions}
        ></Select>
        <Select className="field-input" size="small"></Select>
        <Input className="field-input" name="description" size="small"></Input>
        <Checkbox className="field-input" name="required"></Checkbox>
      </div>
      <div className="props-group"></div>
      <div className="field-children">{children}</div>
    </div>
  )
}
