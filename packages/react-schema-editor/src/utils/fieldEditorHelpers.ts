import _ from 'lodash'
import { InputTypes, ComponentPropsTypes } from './types'

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

export const getXComponentData = components => {
  return convertKeysToSelectData(_.keys(components))
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
  xProps,
  xRules,
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
      allKeys = _.keys(xProps)
      usedKeys = _.keys(schema[propsKey])
      break
    }
    case ComponentPropsTypes.X_RULES: {
      allKeys = _.keys(xRules)
      usedKeys = getComponentXRules(schema)
      break
    }
  }

  const remainingKeys = getRemainingKeys(allKeys, usedKeys)

  return convertKeysToSelectData(remainingKeys)
}

export const getComponentPropsValue = ({ schema, propsKey }) => {
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

export const getInputType = value => {
  debugger
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
