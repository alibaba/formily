import _ from 'lodash'
import { InputTypes } from './types'

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

export const getXComponentData = components => {
  const options = (components || []).map(({ name }) => ({
    label: name,
    value: name
  }))

  return {
    options,
    defaultValue: _.get(options, '[0].value')
  }
}

export const getXComponentPropsData = (components, componentName) => {
  const component = _.find(components, { name: componentName })
  const options = _.keys(_.get(component, 'x-component-props')).map(key => ({
    label: key,
    value: key
  }))
  return {
    options,
    defaultValue: _.get(options, '[0].value')
  }
}

const isExpression = value => {
  return /^{{(.*)}}$/.test(value)
}

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
