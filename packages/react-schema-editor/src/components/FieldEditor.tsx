import React from 'react'
import _ from 'lodash'
import { Form, Button, Checkbox, Input, InputNumber, Select } from 'antd'
import {
  getFieldTypeData,
  getInputTypeData,
  getXComponentData,
  getXComponentPropsData,
  getInputType
} from '../utils/fieldEditorHelpers'
import { InputTypes } from '../utils/types'
import './FieldEditor.css'

const FormItem = Form.Item
const SelectOption = Select.Option

const formItemLayout = {
  labelCol: { span: 24 },
  wrapperCol: { span: 24 }
}

const BLANK_PROPERTY_KEY = '-'
const BLANK_PROPERTY_VALUE = ''

const FieldEditor = ({ form, schema, components, onChange }) => {
  const componentName = schema['x-component']
  const fieldTypeData = getFieldTypeData()
  const inputTypeData = getInputTypeData()
  const xComponentData = getXComponentData(components)
  const xComponentPropsData = getXComponentPropsData(components, componentName)

  const handleInputTypeChange = (inputType, property, schema, propsKey) => {
    const newSchema = { ...schema }
    let defaultValue
    switch (inputType) {
      case InputTypes.INPUT: {
        defaultValue = ''
        break
      }
      case InputTypes.NUMBER_PICKER: {
        defaultValue = 0
        break
      }
      case InputTypes.CHECKBOX: {
        defaultValue = false
        break
      }
      case InputTypes.TEXT_AREA: {
        defaultValue = null
        break
      }
    }
    newSchema[propsKey][property] = defaultValue
    onChange(newSchema)
  }

  const handleXComponentPropsValueChange = (
    value,
    property,
    schema,
    propsKey
  ) => {
    const newSchema = { ...schema }
    newSchema[propsKey][property] = value
    onChange(newSchema)
  }

  return (
    <Form className="field-editor" layout="inline">
      <div className="field-group">
        <div className="field-group-title">字段</div>
        <div className="field-group-content">
          <FormItem
            label="类型"
            {...formItemLayout}
            className="field-group-form-item"
          >
            <Select
              value={schema.type}
              onChange={value => {
                onChange({
                  ...schema,
                  type: value
                })
              }}
            >
              {fieldTypeData.options.map(({ label, value }) => (
                <SelectOption value={value} key={value}>
                  {label}
                </SelectOption>
              ))}
            </Select>
          </FormItem>
          <FormItem
            label="组件"
            {...formItemLayout}
            className="field-group-form-item"
          >
            <Select
              value={schema['x-component']}
              onChange={value => {
                onChange({
                  ...schema,
                  'x-component': value,
                  'x-component-props': {}
                })
              }}
            >
              {xComponentData.options.map(({ label, value }) => (
                <SelectOption value={value} key={value}>
                  {label}
                </SelectOption>
              ))}
            </Select>
          </FormItem>
          <FormItem
            label="描述"
            {...formItemLayout}
            className="field-group-form-item"
          >
            <Input
              value={schema.description}
              onChange={event => {
                onChange({
                  ...schema,
                  description: event.target.value
                })
              }}
            />
          </FormItem>
        </div>
      </div>

      <div className="field-group">
        <div className="field-group-title">组件属性</div>
        {Object.keys(schema['x-component-props'] || []).map(
          (property, index) => {
            const value = schema['x-component-props'][property]
            const inputType = getInputType(value)
            return (
              <div className="field-group-content" key={index}>
                <FormItem
                  label={index === 0 ? '属性名' : null}
                  {...formItemLayout}
                  className="field-group-form-item"
                >
                  <Select
                    placeholder="请选择属性"
                    value={property}
                    onChange={value => {
                      const newXComponentProps = {}
                      _.map(schema['x-component-props'], (v, k) => {
                        if (k === property) {
                          if (property === BLANK_PROPERTY_KEY) {
                            delete newXComponentProps[value]
                          }
                          newXComponentProps[value] = v
                        } else {
                          newXComponentProps[k] = v
                        }
                      })

                      onChange({
                        ...schema,
                        'x-component-props': newXComponentProps
                      })
                    }}
                  >
                    {xComponentPropsData.options.map(({ label, value }) => (
                      <SelectOption value={value} key={value}>
                        {label}
                      </SelectOption>
                    ))}
                  </Select>
                </FormItem>
                <FormItem
                  label={index === 0 ? '输入方式' : null}
                  {...formItemLayout}
                  className="field-group-form-item"
                >
                  <Select
                    value={inputType}
                    onChange={value => {
                      handleInputTypeChange(
                        value,
                        property,
                        schema,
                        'x-component-props'
                      )
                    }}
                  >
                    {inputTypeData.options.map(({ label, value }) => (
                      <SelectOption value={value} key={value}>
                        {label}
                      </SelectOption>
                    ))}
                  </Select>
                </FormItem>
                {inputType === InputTypes.INPUT && (
                  <FormItem
                    label={index === 0 ? '属性值' : null}
                    {...formItemLayout}
                    className="field-group-form-item"
                  >
                    <Input
                      value={value}
                      onChange={event => {
                        handleXComponentPropsValueChange(
                          event.target.value,
                          property,
                          schema,
                          'x-component-props'
                        )
                      }}
                    />
                  </FormItem>
                )}
                {inputType === InputTypes.NUMBER_PICKER && (
                  <FormItem
                    label={index === 0 ? '属性值' : null}
                    {...formItemLayout}
                    className="field-group-form-item"
                  >
                    <InputNumber
                      value={value}
                      onChange={value => {
                        handleXComponentPropsValueChange(
                          value,
                          property,
                          schema,
                          'x-component-props'
                        )
                      }}
                    />
                  </FormItem>
                )}
                {inputType === InputTypes.CHECKBOX && (
                  <FormItem
                    label={index === 0 ? '属性值' : null}
                    {...formItemLayout}
                    className="field-group-form-item"
                  >
                    <Checkbox
                      checked={value}
                      onChange={event => {
                        handleXComponentPropsValueChange(
                          event.target.checked,
                          property,
                          schema,
                          'x-component-props'
                        )
                      }}
                    />
                  </FormItem>
                )}
                {inputType === InputTypes.TEXT_AREA && (
                  <FormItem
                    label={index === 0 ? '属性值' : null}
                    {...formItemLayout}
                    className="field-group-form-item"
                  >
                    <Input.TextArea
                      placeholder="{{}}/{}/[]"
                      // TODO, 这里暂时用 defaultValue
                      defaultValue={value}
                      onBlur={event => {
                        let value = event.target.value
                        try {
                          value = JSON.parse(value)
                        } catch (error) {}
                        handleXComponentPropsValueChange(
                          value,
                          property,
                          schema,
                          'x-component-props'
                        )
                      }}
                    />
                  </FormItem>
                )}
                <FormItem
                  label={index === 0 ? '操作' : null}
                  {...formItemLayout}
                  className="field-group-form-item"
                >
                  <Button
                    type="primary"
                    icon="minus"
                    size="small"
                    onClick={() => {
                      onChange({
                        ..._.omit(schema, `x-component-props.${property}`)
                      })
                    }}
                  />
                </FormItem>
              </div>
            )
          }
        )}
        <Button
          type="primary"
          icon="plus"
          size="small"
          onClick={() => {
            onChange({
              ...schema,
              'x-component-props': {
                ...schema['x-component-props'],
                [BLANK_PROPERTY_KEY]: BLANK_PROPERTY_VALUE
              }
            })
          }}
        />
      </div>
    </Form>
  )
}

export default Form.create()(FieldEditor)
