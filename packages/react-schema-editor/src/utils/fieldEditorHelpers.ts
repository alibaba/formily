import _ from 'lodash'
import { InputTypes, ComponentPropsTypes } from './types'

// 组件取值类型
export const getFieldTypeData = () => {
  const options = [
    { label: '字符串', value: 'string' },
    { label: '布尔值', value: 'boolean' },
    { label: '数字', value: 'number' },
    { label: '数组', value: 'array' },
    { label: '对象', value: 'object' }
  ]
  return {
    options,
    defaultValue: _.get(options, '[0].value')
  }
}

// 属性配置输入方式
export const getInputTypeData = () => {
  const options = [
    { label: '字符串输入框', value: InputTypes.INPUT },
    { label: '数字输入框', value: InputTypes.NUMBER_PICKER },
    { label: '复选框', value: InputTypes.CHECKBOX },
    { label: '表达式', value: InputTypes.TEXT_AREA }
  ]
  return {
    options,
    defaultValue: _.get(options, '[0].value')
  }
}

// 表单字段属性（对应 FormItem 的配置属性）
export const getDefaultXProps = () => {
  return {
    colon: {},
    extra: {},
    hasFeedback: {},
    help: {},
    htmlFor: {},
    label: {},
    labelCol: {},
    labelAlign: {},
    required: {},
    validateStatus: {},
    wrapperCol: {}
  }
}

// 校验规则属性
export const getDefaultXRules = () => {
  return {
    enum: {},
    len: {},
    max: {},
    min: {},
    pattern: {},
    required: {},
    transform: {},
    type: {},
    validator: {},
    whitespace: {}
  }
}

// 数组转换成 Select 组件识别的数据结构
const convertKeysToSelectData = keys => {
  const options = keys.map(value => ({
    label: value,
    value
  }))
  return {
    options,
    defaultValue: _.get(options, '[0].value')
  }
}

// 提取所有组件的组件名
export const getXComponentData = components => {
  return convertKeysToSelectData(_.map(components, ({ name }) => name))
}

export const getRemainingKeys = (allKeys, usedKeys) => {
  return _.reduce(
    allKeys,
    (result, key) => {
      if (!usedKeys.includes(key)) {
        result.push(key)
      }
      return result
    },
    []
  )
}

export const getComponentXRules = schema => {
  return _.reduce(
    schema[ComponentPropsTypes.X_RULES],
    (result, current) => {
      return _.concat(result, _.keys(_.omit(current, 'message')))
    },
    []
  )
}

export const getComponentPropsData = ({
  schema,
  components,
  componentName,
  propsKey
}) => {
  const component = _.find(components, { name: componentName })

  let allKeys
  let usedKeys
  switch (propsKey) {
    case ComponentPropsTypes.X_COMPONENT_PROPS: {
      allKeys = _.keys(_.get(component, propsKey))
      usedKeys = _.keys(schema[propsKey])
      break
    }
    case ComponentPropsTypes.X_PROPS: {
      allKeys = _.keys(getDefaultXProps())
      usedKeys = _.keys(schema[propsKey])
      break
    }
    case ComponentPropsTypes.X_RULES: {
      allKeys = _.keys(getDefaultXRules())
      usedKeys = getComponentXRules(schema)
      break
    }
  }

  const remainingKeys = getRemainingKeys(allKeys, usedKeys)

  return convertKeysToSelectData(remainingKeys)
}

export const getComponentProps = ({ schema, propsKey }) => {
  if (propsKey === ComponentPropsTypes.X_RULES) {
    return getComponentXRules(schema)
  } else {
    return _.keys(schema[propsKey])
  }
}

export const getPropertyValue = ({ schema, propsKey, property }) => {
  if (propsKey === ComponentPropsTypes.X_RULES) {
    const rule = _.find(schema[propsKey], rule => _.has(rule, property))
    return _.get(rule, property)
  } else {
    return _.get(schema, `${propsKey}.${property}`)
  }
}

export const getRuleMessage = ({ schema, property }) => {
  const rule = _.find(schema[ComponentPropsTypes.X_RULES], rule =>
    _.has(rule, property)
  )
  return _.get(rule, 'message')
}

const isExpression = value => {
  return /^{{(.*)}}$/.test(value)
}

export const getExpressionValue = value => {
  if (_.isObject(value)) {
    return JSON.stringify(value)
  }
  return value
}

// 根据用户选择的输入类型，为属性赋初始值
export const getDefaultValue = inputType => {
  switch (inputType) {
    case InputTypes.INPUT: {
      return ''
    }
    case InputTypes.NUMBER_PICKER: {
      return 0
    }
    case InputTypes.CHECKBOX: {
      return false
    }
    case InputTypes.TEXT_AREA: {
      return null
    }
    default:
      return null
  }
}

// 根据属性的值反推输入类型
export const getInputType = value => {
  if (typeof value === 'object' || isExpression(value)) {
    return InputTypes.TEXT_AREA
  }
  switch (typeof value) {
    case 'string':
      return InputTypes.INPUT
    case 'number':
      return InputTypes.NUMBER_PICKER
    case 'boolean':
      return InputTypes.CHECKBOX
  }
}

export const fieldTypeDisabled = schema => {
  if (schema.type === 'object' && !_.isEmpty(schema.properties)) {
    return true
  }
  if (schema.type === 'array' && !_.isEmpty(schema.items)) {
    return true
  }
  return false
}
