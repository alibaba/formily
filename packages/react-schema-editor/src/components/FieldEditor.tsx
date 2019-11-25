import React from 'react'
import _ from 'lodash'
import { Form, Button, Checkbox, Input, InputNumber, Select } from 'antd'
import {
  getFieldTypeData,
  getInputTypeData,
  getXComponentData,
  getComponentPropsData,
  getComponentPropsValue,
  getInputType,
  getPropertyValue,
  getRuleMessage
} from '../utils/fieldEditorHelpers'
import { InputTypes, ComponentPropsTypes } from '../utils/types'
import './FieldEditor.css'

const FormItem = Form.Item
const SelectOption = Select.Option

const formItemLayout = {
  labelCol: { span: 24 },
  wrapperCol: { span: 24 }
}

const BLANK_PROPERTY_VALUE = ''

interface IFieldEditorProps {
  schema: any
  components: any
  xProps: any
  xRules: any
  onChange: (schema: any) => void
}

interface IFormItemGroupProps extends Partial<IFieldEditorProps> {
  title: string
  propsKey: string
}

const FormItemGroup: React.FC<IFormItemGroupProps> = ({
  title,
  schema,
  xProps,
  xRules,
  components,
  propsKey,
  onChange
}) => {
  const componentName = schema[ComponentPropsTypes.X_COMPONENT]
  const inputTypeData = getInputTypeData()
  const componentPropsData = getComponentPropsData({
    schema,
    xProps,
    xRules,
    components,
    componentName,
    propsKey
  })

  const componentPropsValue = getComponentPropsValue({ schema, propsKey })

  const handleXComponentPropsValueChange = (
    value,
    property,
    schema,
    propsKey
  ) => {
    const newSchema = { ...schema }
    _.set(newSchema, `${propsKey}.${property}`, value)
    onChange(newSchema)
  }

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
    _.set(newSchema, `${propsKey}.${property}`, defaultValue)
    onChange(newSchema)
  }

  const handlePropertyChange = (value, property) => {
    let newComponentProps
    if (propsKey === ComponentPropsTypes.X_RULES) {
      newComponentProps = _.map(schema[propsKey], rule => {
        if (_.has(rule, property)) {
          return {
            ..._.omit(rule, property),
            [value]: rule[property]
          }
        }
        return rule
      })
    } else {
      newComponentProps = {}
      _.map(schema[propsKey], (v, k) => {
        if (k === property) {
          newComponentProps[value] = v
        } else if (k !== value) {
          newComponentProps[k] = v
        }
      })
    }

    onChange({
      ...schema,
      [propsKey]: newComponentProps
    })
  }

  const handleMinusClick = property => {
    onChange({
      ..._.omit(schema, `${propsKey}.${property}`)
    })
  }

  const handlePlusClick = () => {
    onChange({
      ...schema,
      [propsKey]: {
        ...schema[propsKey],
        [componentPropsData.defaultValue]: BLANK_PROPERTY_VALUE
      }
    })
  }

  return (
    <div className="field-group">
      <div className="field-group-title">{title}</div>
      {_.map(componentPropsValue, (property, index) => {
        const value = getPropertyValue({ schema, propsKey, property })
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
                notFoundContent="没有其他选项了"
                value={property}
                onChange={value => {
                  handlePropertyChange(value, property)
                }}
              >
                {componentPropsData.options.map(({ label, value }) => (
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
                  handleInputTypeChange(value, property, schema, propsKey)
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
                      propsKey
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
                      propsKey
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
                      propsKey
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
                      propsKey
                    )
                  }}
                />
              </FormItem>
            )}
            {propsKey === ComponentPropsTypes.X_RULES && (
              <FormItem
                label={index === 0 ? '错误提示' : null}
                {...formItemLayout}
                className="field-group-form-item"
              >
                <Input value={getRuleMessage({ schema, property })} />
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
                  handleMinusClick(property)
                }}
              />
            </FormItem>
          </div>
        )
      })}
      <Button
        type="primary"
        icon="plus"
        size="small"
        disabled={componentPropsData.options.length < 1}
        onClick={handlePlusClick}
      />
    </div>
  )
}

const FieldEditor: React.FC<IFieldEditorProps> = ({
  schema,
  components,
  xProps,
  xRules,
  onChange
}) => {
  const fieldTypeData = getFieldTypeData()

  const xComponentData = getXComponentData(components)

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
              value={schema[ComponentPropsTypes.X_COMPONENT]}
              onChange={value => {
                onChange({
                  ...schema,
                  [ComponentPropsTypes.X_COMPONENT]: value,
                  [ComponentPropsTypes.X_COMPONENT_PROPS]: {}
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
      <FormItemGroup
        title="组件属性"
        components={components}
        propsKey={ComponentPropsTypes.X_COMPONENT_PROPS}
        schema={schema}
        onChange={onChange}
      />
      <FormItemGroup
        title="表单字段属性"
        components={components}
        propsKey={ComponentPropsTypes.X_PROPS}
        schema={schema}
        xProps={xProps}
        onChange={onChange}
      />
      <FormItemGroup
        title="校验规则"
        components={components}
        propsKey={ComponentPropsTypes.X_RULES}
        schema={schema}
        xRules={xRules}
        onChange={onChange}
      />
    </Form>
  )
}

export default Form.create()(FieldEditor)
