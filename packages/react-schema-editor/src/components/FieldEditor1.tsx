import {
  Button,
  Checkbox,
  Input,
  InputNumber,
  AutoComplete,
  Select
} from 'antd'
import React from 'react'
import { IFieldEditorProps, InputTypes } from '../utils/types'
import './FieldEditor.css'

const types = [
  { label: '字符串', value: 'string' },
  { label: '布尔值', value: 'boolean' },
  { label: '数字', value: 'number' },
  { label: '数组', value: 'array' },
  { label: '对象', value: 'object' }
]

const inputTypes = [
  { label: '字符串输入框', value: 'input' },
  { label: '数字输入框', value: 'numberPicker' },
  { label: '复选框', value: 'checkbox' },
  { label: '对象', value: 'textArea' }
]

const getInputTypeByValue = value => {
  const valueType = value.constructor.name.toLowerCase()
  switch (valueType) {
    case 'string':
      return InputTypes.INPUT
    case 'number':
      return InputTypes.NUMBER_PICKER
    case 'boolean':
      return InputTypes.CHECKBOX
    case 'array':
    case 'object':
      return InputTypes.TEXT_AREA
  }
}

const getComponentNames = components => {
  return components.map(({ name }) => name)
}

const getComponentByComponentName = (componentName: string, components) => {
  return components.find(({ name }) => name === componentName)
}

const getXComponentPropsByComponentName = (
  componentName: string,
  components
) => {
  const component = getComponentByComponentName(componentName, components)
  if (!component) {
    return []
  }
  return component['x-component-props']
}

export const FieldEditor: React.FC<IFieldEditorProps> = ({
  schema,
  components,
  xProps,
  xRules,
  onChange
}) => {
  const componentName = schema['x-component']
  const componentNames = getComponentNames(components)
  const xComponentProps = getXComponentPropsByComponentName(
    componentName,
    components
  )

  const handleChange = (property, value) => {
    onChange({
      ...schema,
      ...{
        [property]: value
      }
    })
  }

  return (
    <div className="field-editor">
      <div>
        <h3>字段</h3>
        <div className="field-group">
          <Input
            className="field-input"
            label="label"
            size="small"
            value={schema.title}
            onChange={value => {
              handleChange('title', value)
            }}
          />
          <Select
            className="field-input"
            label="类型"
            size="small"
            dataSource={types}
            value={schema.type}
            onChange={value => {
              handleChange('type', value)
            }}
          />
          <Select
            className="field-input"
            label="组件"
            size="small"
            dataSource={componentNames}
            style={{ width: 300 }}
            value={componentName}
            onChange={value => {
              handleChange('x-component', value)
            }}
          />
          <Input
            className="field-input"
            label="描述"
            size="small"
            value={schema.description}
            onChange={value => {
              handleChange('description', value)
            }}
          />
        </div>
      </div>

      <div>
        <h3>x-component-props</h3>
        {Object.keys(schema['x-component-props']).map((property, index) => {
          const value = schema['x-component-props'][property]
          const inputType = getInputTypeByValue(value)
          return (
            <div className="field-group" key={index}>
              <AutoComplete
                className="field-input"
                label="属性"
                size="small"
                dataSource={Object.keys(xComponentProps)}
                style={{ width: 150 }}
                value={property}
                onChange={value => {
                  const newXComponentProps = { ...schema['x-component-props'] }
                  delete newXComponentProps[property]
                  handleChange('x-component-props', {
                    ...newXComponentProps,
                    [value]: schema['x-component-props'][property]
                  })
                }}
              />
              <Select
                className="field-input"
                label="输入方式"
                size="small"
                dataSource={inputTypes}
                value={inputType}
                onChange={value => {}}
              />

              {inputType === InputTypes.INPUT && (
                <Input
                  className="field-input"
                  label="值"
                  size="small"
                  value={value}
                />
              )}

              {inputType === InputTypes.CHECKBOX && (
                <Checkbox className="field-input" label="值" value={value} />
              )}

              {inputType === InputTypes.NUMBER_PICKER && (
                <InputNumber className="field-input" value={value} />
              )}

              {inputType === InputTypes.TEXT_AREA && (
                <Input
                  className="field-input"
                  label="值"
                  size="small"
                  value={value}
                />
              )}

              <Button className="op-btn op-btn-delete" size="small">
                -
              </Button>
            </div>
          )
        })}

        <div>
          <Button
            className="op-btn op-btn-add"
            size="small"
            onClick={() => {
              handleChange('x-component-props', {
                ...schema['x-component-props'],
                ...{
                  '': ''
                }
              })
            }}
          >
            +
          </Button>
        </div>
      </div>

      <div>
        <h3>x-props</h3>
        {Object.keys(schema['x-props']).map(property => (
          <div className="field-group" key={property}>
            <AutoComplete
              className="field-input"
              label="属性"
              size="small"
              dataSource={Object.keys(xProps)}
              style={{ width: 150 }}
              value={property}
            />
            <Select
              className="field-input"
              label="类型"
              name="x-props-type"
              size="small"
              dataSource={types}
              value={schema['x-props'][property].constructor.name.toLowerCase()}
            />
            <Input
              className="field-input"
              label="值"
              name="x-props-value"
              size="small"
              value={schema['x-props'][property]}
            />
            <Button className="op-btn op-btn-delete" size="small">
              -
            </Button>
          </div>
        ))}

        <div>
          <Button
            className="op-btn op-btn-add"
            size="small"
            onClick={() => {
              handleChange('x-props', {
                ...schema['x-props'],
                ...{
                  '': ''
                }
              })
            }}
          >
            +
          </Button>
        </div>
      </div>

      <div>
        <h3>x-rules</h3>
        <div className="field-group">
          <Select
            className="field-input"
            label="属性"
            name="xRules"
            size="small"
            dataSource={xRules}
          />
          <Select
            className="field-input"
            label="类型"
            name="x-component-props-type"
            size="small"
            dataSource={types}
          />
          <Input
            className="field-input"
            label="值"
            name="x-component-props-value"
            size="small"
          />
        </div>
        <div>
          <Button className="op-btn op-btn-add" size="small">
            +
          </Button>
          <Button className="op-btn op-btn-delete" size="small">
            -
          </Button>
        </div>
      </div>
    </div>
  )
}
