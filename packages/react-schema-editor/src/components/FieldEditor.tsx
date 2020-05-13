import React from 'react'
import _ from 'lodash'
import { MinusOutlined, PlusOutlined } from '@ant-design/icons';
import { Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import { Button, Checkbox, Input, InputNumber, Select, AutoComplete } from 'antd';
import {
  getFieldTypeData,
  getInputTypeData,
  getXComponentData,
  getComponentPropsData,
  getComponentProps,
  getInputType,
  getDefaultValue,
  getPropertyValue,
  getExpressionValue,
  getRuleMessage,
  fieldTypeDisabled,
  getDefaultXProps,
  getDefaultXRules
} from '../utils/fieldEditorHelpers'
import { InputTypes, ComponentPropsTypes } from '../utils/types'

const FormItem = Form.Item
const SelectOption = Select.Option

const formItemLayout = {
  labelCol: { span: 24 },
  wrapperCol: { span: 24 }
}

const BLANK_PROPERTY_VALUE = ''

interface IFieldEditorProps {
  isRoot: boolean
  fieldKey: string
  onFieldKeyChange: (fieldKey: string) => void
  schema: any
  components?: any
  xProps?: any
  xRules?: any
  onChange: (schema: any) => void
}

interface IFormItemGroupProps extends Partial<IFieldEditorProps> {
  title: string
  propsKey: string
}

const FormItemGroup: React.FC<IFormItemGroupProps> = ({
  title,
  schema,
  components,
  propsKey,
  onChange
}) => {
  const componentName = schema[ComponentPropsTypes.X_COMPONENT]
  const inputTypeData = getInputTypeData()
  const componentPropsData = getComponentPropsData({
    schema,
    components,
    componentName,
    propsKey
  })

  const componentProps = getComponentProps({ schema, propsKey })

  const handleXComponentPropsValueChange = (value, property) => {
    let newSchema
    if (propsKey === ComponentPropsTypes.X_RULES) {
      const newRules = _.map(schema[propsKey], rule => {
        if (_.has(rule, property)) {
          return {
            ...rule,
            [property]: value
          }
        }
        return rule
      })
      newSchema = {
        ...schema,
        [propsKey]: newRules
      }
    } else {
      newSchema = {
        ...schema,
        [propsKey]: {
          ...schema[propsKey],
          [property]: value
        }
      }
    }
    onChange(newSchema)
  }

  const handleInputTypeChange = (value, property) => {
    let newSchema
    let defaultValue = getDefaultValue(value)

    if (propsKey === ComponentPropsTypes.X_RULES) {
      const newRules = _.map(schema[propsKey], rule => {
        if (_.has(rule, property)) {
          return {
            ...rule,
            [property]: defaultValue
          }
        }
        return rule
      })
      newSchema = {
        ...schema,
        [propsKey]: newRules
      }
    } else {
      newSchema = {
        ...schema,
        [propsKey]: {
          ...schema[propsKey],
          [property]: defaultValue
        }
      }
    }
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

  const handleRuleMessageChange = (value, property) => {
    const newRules = _.map(schema[propsKey], rule => {
      if (_.has(rule, property)) {
        return {
          ...rule,
          message: value
        }
      }
      return rule
    })

    onChange({
      ...schema,
      [ComponentPropsTypes.X_RULES]: newRules
    })
  }

  const handleMinusClick = property => {
    if (propsKey === ComponentPropsTypes.X_RULES) {
      const newRules = _.reduce(
        schema[propsKey],
        (result, rule) => {
          if (_.has(rule, property)) {
            return result
          }
          return _.concat(result, rule)
        },
        []
      )
      onChange({
        ...schema,
        [ComponentPropsTypes.X_RULES]: newRules
      })
    } else {
      onChange({
        ..._.omit(schema, `${propsKey}.${property}`)
      })
    }
  }

  const handlePlusClick = () => {
    if (propsKey === ComponentPropsTypes.X_RULES) {
      onChange({
        ...schema,
        [propsKey]: _.concat(schema[propsKey] || [], {
          [BLANK_PROPERTY_VALUE]: BLANK_PROPERTY_VALUE
        })
      })
    } else {
      onChange({
        ...schema,
        [propsKey]: {
          ...schema[propsKey],
          [BLANK_PROPERTY_VALUE]: BLANK_PROPERTY_VALUE
        }
      })
    }
  }

  return (
    <div className="field-group">
      <div className="field-group-title">{title}</div>
      {_.map(componentProps, (property, index) => {
        const value = getPropertyValue({ schema, propsKey, property })
        const inputType = getInputType(value)
        return (
          <div className="field-group-content" key={index}>
            <FormItem
              label={index === 0 ? '属性名' : null}
              {...formItemLayout}
              className="field-group-form-item auto-complete"
            >
              <AutoComplete
                placeholder="请选择属性"
                dataSource={_.map(
                  componentPropsData.options,
                  ({ value }) => value
                )}
                value={property}
                filterOption={(inputValue, option) =>
                  (option.props.children as string)
                    .toUpperCase()
                    .includes(inputValue.toUpperCase())
                }
                onChange={value => {
                  handlePropertyChange(value, property)
                }}
              />
            </FormItem>
            <FormItem
              label={index === 0 ? '输入方式' : ' '}
              {...formItemLayout}
              className="field-group-form-item"
            >
              <Select
                value={inputType}
                onChange={value => {
                  handleInputTypeChange(value, property)
                }}
              >
                {_.map(inputTypeData.options, ({ label, value }) => (
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
                      property
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
                  style={{ width: '100%' }}
                  value={value}
                  onChange={value => {
                    handleXComponentPropsValueChange(value, property)
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
                      property
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
                  key={getExpressionValue(value)}
                  placeholder="格式：{{}}/{}/[]，失去焦点生效"
                  defaultValue={getExpressionValue(value)}
                  onBlur={event => {
                    let value = event.target.value
                    try {
                      value = JSON.parse(value)
                    } catch (error) {}
                    handleXComponentPropsValueChange(value, property)
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
                <Input
                  value={getRuleMessage({ schema, property })}
                  onChange={event => {
                    handleRuleMessageChange(event.target.value, property)
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
                icon={<MinusOutlined />}
                size="small"
                onClick={() => {
                  handleMinusClick(property)
                }}
              />
            </FormItem>
          </div>
        );
      })}
      <Button
        disabled={_.includes(componentProps, BLANK_PROPERTY_VALUE)}
        type="primary"
        icon={<PlusOutlined />}
        size="small"
        onClick={handlePlusClick}
      />
    </div>
  );
}

const FieldEditor: React.FC<IFieldEditorProps> = ({
  isRoot,
  fieldKey,
  schema,
  components,
  onFieldKeyChange,
  onChange
}) => {
  // 如果节点类型不是 object 或者 array，则该节点为叶子节点
  const isLeafField = !['object', 'array'].includes(schema.type)
  const fieldTypeData = getFieldTypeData()

  const xComponentData = getXComponentData(components)

  return (
    <Form className="field-editor" layout="inline">
      <div className="field-group">
        <div className="field-group-title">字段</div>
        <div className="field-group-content">
          <FormItem
            label="fieldKey"
            {...formItemLayout}
            className="field-group-form-item"
          >
            <Input
              disabled={isRoot}
              value={fieldKey}
              onChange={event => {
                onFieldKeyChange(event.target.value)
              }}
            />
          </FormItem>
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
              // 如果当前节点不是叶子节点，而且拥有子元素，则该节点不能变更类型
              disabled={fieldTypeDisabled(schema)}
            >
              {_.map(fieldTypeData.options, ({ label, value }) => (
                <SelectOption value={value} key={value}>
                  {label}
                </SelectOption>
              ))}
            </Select>
          </FormItem>
          <FormItem
            label="组件"
            {...formItemLayout}
            className="field-group-form-item auto-complete"
          >
            <AutoComplete
              disabled={isRoot}
              dataSource={_.map(xComponentData.options, ({ value }) => value)}
              value={schema[ComponentPropsTypes.X_COMPONENT]}
              filterOption={(inputValue, option) =>
                (option.props.children as string)
                  .toUpperCase()
                  .includes(inputValue.toUpperCase())
              }
              onChange={value => {
                onChange({
                  ...schema,
                  [ComponentPropsTypes.X_COMPONENT]: value,
                  [ComponentPropsTypes.X_COMPONENT_PROPS]: {}
                })
              }}
            />
          </FormItem>
          <FormItem
            label="名称"
            {...formItemLayout}
            className="field-group-form-item"
          >
            <Input
              value={schema.title}
              onChange={event => {
                onChange({
                  ...schema,
                  title: event.target.value
                })
              }}
            />
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
      {isLeafField && (
        <FormItemGroup
          title="组件属性"
          components={components}
          propsKey={ComponentPropsTypes.X_COMPONENT_PROPS}
          schema={schema}
          onChange={onChange}
        />
      )}
      {isLeafField && (
        <FormItemGroup
          title="表单字段属性"
          components={components}
          propsKey={ComponentPropsTypes.X_PROPS}
          schema={schema}
          xProps={getDefaultXProps()}
          onChange={onChange}
        />
      )}

      {isLeafField && (
        <FormItemGroup
          title="校验规则"
          components={components}
          propsKey={ComponentPropsTypes.X_RULES}
          schema={schema}
          xRules={getDefaultXRules()}
          onChange={onChange}
        />
      )}
    </Form>
  )
}

export default FieldEditor
