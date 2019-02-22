import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import { NumberPicker, Dialog } from '@alifd/next'

import { connect, registerFormFields } from './baseForm'
import merge from 'lodash.merge'

/**
 * 分割线
 */
export const Divider = styled.div`
  height: 1px;
  background: #1e2336;
  box-shadow: 0 1px 0 0 #313853;
`

/**
 * 头部title
 */
export const Header = styled(props => (
  <div className={props.className}>{props.children}</div>
))`
  padding-left: 16px;
  height: 74px;
  h2 {
    margin: 0;
    padding: 0;
    font-size: 14px;
    height: 40px;
    line-height: 45px;
    color: ${props => props.theme.whiteColor};
  }
  p {
    margin: 0;
    padding: 0;
    font-size: 12px;
    color: #9096ad;
  }
`

export const CustomIcon = styled(props => (
  <i
    className={props.className}
    style={{ backgroundImage: `url(${props.iconUrl})` }}
  />
))`
  display: inline-block;
  margin-right: 8px;
  vertical-align: -2px;
  width: ${props => props.width || '15'}px;
  height: ${props => props.height || '15'}px;
  background-repeat: no-repeat;
  background-position: center center;
  background-size: ${props => props.width || '15'}px
    ${props => props.height || '15'}px;
`

/**
 * 判断对象是否为空
 * @param {Object} obj 对象
 */
export const isEmptyObj = obj => {
  if (!obj) return true
  for (const i in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, i)) {
      return false
    }
  }
  return true
}

/**
 * 将enums数组格式化成[{value: xxx, label: xxx}]形式
 * @param {Array} enums 需要格式化的数组
 */
export const wrapEnums = enums =>
  enums.map(item =>
    typeof item === 'object'
      ? item
      : {
        value: item,
        label: item
      }
  )

/**
 * 初始化组件的属性默认值
 * @param {Array} propsList 属性数组
 * @param {Object} comp 组件数据
 */

/**
 * 根据组件id获取组件信息
 * @param {String} componentId 组件的id
 * @param {Array} schema 组件schema
 */
export const getCompDetailById = (componentId, schema = {}) => {
  const { properties = {} } = schema

  if (properties[componentId]) {
    return {
      ...properties[componentId],
      id: componentId
    }
  }

  if (!Object.keys(properties).length) {
    return {}
  } else {
    for (const key in properties) {
      if (Object.hasOwnProperty.call(properties, key)) {
        const childProps = properties[key].properties
        if (childProps && typeof childProps === 'object') {
          if (childProps[componentId]) {
            return {
              ...childProps[componentId],
              id: componentId
            }
          }
        }
      }
    }
    return {}
  }
}

/**
 * 补全回传的schema格式
 * @param {Object} schema
 * @param {Boolean} keepAll 保留所有字段
 */
export const wrapSubmitSchema = (schema, keepAll = false) => {
  if (!schema || typeof schema !== 'object') {
    return {
      type: 'object',
      properties: {}
    }
  }

  // 深拷贝一份
  const result = JSON.parse(JSON.stringify(schema))

  if (!schema.type) {
    result.type = 'object'
  }
  if (!schema.properties) {
    result.properties = {}
  }

  // 以__id__为主键转换一次数据
  const newProperties = {}
  const loop = (_newProperties, _properties) => {
    Object.keys(_properties).forEach(key => {
      const item = JSON.parse(JSON.stringify(_properties[key]))
      const newKey = item.__id__ || key
      if (!keepAll) {
        // 删除可视化配置产生的冗余字段
        Object.keys(item).forEach(itemKey => {
          if (
            [
              '__id__',
              'width',
              'height',
              'icon',
              'iconWidth',
              'iconHeight',
              'iconUrl',
              'id',
              'active',
              'placeholder'
            ].indexOf(itemKey) > -1 ||
            /^(x-props.)/gi.test(itemKey)
          ) {
            delete item[itemKey]
          }
        })
      }

      _newProperties[newKey] = JSON.parse(JSON.stringify(item))

      if (item.properties) {
        _newProperties[newKey].properties = {}
        loop(_newProperties[newKey].properties, item.properties)
      }
    })
  }

  loop(newProperties, result.properties)

  result.properties = newProperties

  return result
}

/**
 * 根据schema获取有顺序的properties
 * @param {Object} schema
 * @param {Boolean} needFormat 是否需要转换返回数组，默认是
 */
export const getOrderProperties = (schema = {}) => {
  const { properties = {} } = schema
  if (isEmptyObj(properties)) return []

  let newProperties = []

  Object.keys(properties).forEach(key => {
    const item = properties[key]
    const index = item['x-index']
    if (typeof index !== 'number') {
      newProperties.push({
        ...item,
        id: key,
        'x-index': newProperties.length
      })
    }
  })
  Object.keys(properties).forEach(key => {
    const item = properties[key]
    const index = item['x-index']
    if (typeof index === 'number') {
      if (!newProperties[index]) {
        newProperties[index > newProperties.length + 1 ? newProperties.length : index] = {
          ...item,
          id: key
        }
      } else {
        const _tempProperties = newProperties.slice(0, index)
        for (let i = index; i < newProperties.length; i++) {
          _tempProperties[i + 1] = {
            ...newProperties[i],
            'x-index': i + 1
          }
        }
        _tempProperties[index] = {
          ...item,
          id: key
        }
        newProperties = _tempProperties
      }
    }
  })

  return newProperties
}

export const initOrderProperties = (schema = {}) => {
  const newProperties = getOrderProperties(schema)
  const properties = {}
  newProperties.forEach(item => {
    const newItem = { ...item }
    if (newItem.active) {
      delete newItem.active
    }
    properties[item.id] = newItem
  })
  const newShema = {
    ...schema,
    properties
  }

  return newShema
}

export const flatObj = (obj = {}) => {
  // 深拷贝一份
  const result = JSON.parse(JSON.stringify(obj))
  const setValueByLoopObj = (_obj, arr, value) => {
    const _key = arr.shift()
    if (!arr.length) {
      if (value && typeof value === 'object') {
        const tempValue = _obj[_key] || {}
        _obj[_key] = merge({}, value, tempValue)
      } else {
        _obj[_key] = value
      }
    } else {
      _obj[_key] = _obj[_key] || {}
      setValueByLoopObj(_obj[_key], arr, value)
    }
  }
  Object.keys(obj).forEach(originKey => {
    const key = originKey.split('.')
    setValueByLoopObj(result, key, obj[originKey])
  })
  return result
}

// 校验schema id是否有重复的
export const checkRepeatId = (schema = {}) => {
  const result = {}
  const loop = _schema => {
    const temp = {}
    const { properties = {} } = _schema
    Object.keys(properties).forEach(propKey => {
      const item = properties[propKey]
      const key = item.__id__ ? item.__id__ : propKey
      if (!temp[key]) {
        temp[key] = item
      } else {
        result[key] = item
      }
      if (item.properties) {
        loop(item)
      }
    })
  }
  loop(schema)
  return !!Object.keys(result).length
}

/* eslint-disable */
const colsDetail = connect()(
  class ColsDetail extends React.Component {
    static propTypes = {
      value: PropTypes.arrayOf(PropTypes.any),
      onChange: PropTypes.func
    }

    handleChange = (idx, val) => {
      if (!val) {
        Dialog.alert('请确保列宽是有效整数')
        return false
      }
      const { onChange, value } = this.props
      let newValue = [...value]
      const diff = val - newValue[idx]

      if (diff >= newValue[newValue.length - 1]) {
        Dialog.alert('请确保4列宽度加起来等于24')
        return false
      }

      newValue = newValue.map((_val, i) => {
        if (i === idx) {
          return val
        }
        if (i === newValue.length - 1) {
          return _val - diff
        }
        if (i < idx) {
          return _val
        }
        return _val
      })

      onChange(newValue)
    }

    render() {
      const { value = [] } = this.props
      return value.map((item, idx) => (
        <NumberPicker
          key={idx}
          value={item}
          onChange={val => this.handleChange(idx, val)}
        />
      ))
    }
  }
)
/* eslint-enable */

registerFormFields({
  colsDetail
})
