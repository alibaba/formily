import { combineReducers } from 'redux'
import { getPropsByKey } from '../configs/supportConfigList'
import { defaultGlobalCfgValue } from '../configs/supportGlobalCfgList'
import { getOrderProperties, initOrderProperties } from '../utils/util'
import merge from 'lodash.merge'

const preview = (state = false, action) => {
  let newState
  const { data = {} } = action
  const _preview = data.preview || false
  switch (action.type) {
    case 'CHANGE_PREVIEW':
      newState = _preview
      return newState
    default:
      return state
  }
}

const codemode = (state = false, action) => {
  let newState
  const { data = {} } = action
  const _codemode = data.codemode || false
  switch (action.type) {
    case 'CHANGE_CODEMODE':
      newState = _codemode
      return newState
    default:
      return state
  }
}

const componentId = (state = '', action) => {
  let newState = state
  const { data = {} } = action
  const _componentId = data.componentId || ''
  // eslint-disable-next-line
  let { id, propsData = {}, comp = {}, key } = data

  switch (action.type) {
    case 'CHANGE_COMPONENT':
      newState = _componentId
      return newState
    default:
      return state
  }
}

const layoutId = (state = '', action) => {
  const { data = {} } = action
  const { id = '' } = data
  let newState = state

  switch (action.type) {
    case 'CHANGE_LAYOUTID':
      newState = id
      return newState
    default:
      return state
  }
}

const componentProps = (state = {}, action) => {
  const newState = Object.assign({}, state)
  const { data = {} } = action
  const { id, propsData = {}, comp = {} } = data

  switch (action.type) {
    case 'SHOW_COMPONENT_PROPS':
      if (id && !newState[id]) {
        newState[id] = getPropsByKey(comp.key).map(item => {
          const { name } = item
          return Object.assign(
            {},
            item,
            name === '__id__'
              ? {
                value: id
              }
              : {},
            comp[name]
              ? {
                value: comp[name]
              }
              : {}
          )
        })
      }
      return newState
    case 'DELETE_COMPONENT':
      if (id && newState[id]) {
        delete newState[id]
      }
      return newState
    case 'EDIT_COMPONENT_PROPS':
      if (id && newState[id]) {
        newState[id] = newState[id].map(item => {
          const { name } = item
          const value = propsData[name]
          return Object.assign(
            {},
            item,
            value !== undefined
              ? {
                value
              }
              : {}
          )
        })
      }
      return newState
    default:
      return state
  }
}

const gbConfig = (state = {}, action) => {
  let newState = {
    ...defaultGlobalCfgValue,
    ...state
  }
  const { data = {} } = action

  switch (action.type) {
    case 'CHANGE_GB_CONFIG':
      newState = Object.assign({}, newState, data)
      return newState
    default:
      return newState
  }
}

const initSchemaData = (state = {}, action) => {
  let newState = {
    ...state
  }
  const { data = {} } = action
  // eslint-disable-next-line
  const {
    component,
    id,
    propsData = {},
    existId = null,
    addType,
    containerId
  } = data

  switch (action.type) {
    case 'INIT_SCHEMA':
      // 自动生成z-index顺序
      const newSchema = initOrderProperties(data)
      newState = {
        ...newState,
        ...newSchema
      }
      return newState
    case 'CHANGE_COMPONENT_ORDER':
      const { targetId } = data
      let _tmpNewState = {
        ...newState
      }
      if (containerId) {
        _tmpNewState = newState.properties[containerId]
      }
      const propertiesList = getOrderProperties(_tmpNewState)
      const targetItem = propertiesList.find(_item => _item.id === targetId)
      let targetIdx = targetItem
        ? targetItem['x-index']
        : propertiesList[propertiesList.length - 1]['x-index']
      const sourceItem = propertiesList.find(_item => _item.id === id)
      const sourceIdx = sourceItem
        ? sourceItem['x-index']
        : propertiesList[0]['x-index']
      const len = propertiesList.length
      if (targetIdx < 0) {
        targetIdx = 0
      }
      propertiesList.splice(sourceIdx, 1)
      for (let i = 0; i < targetIdx; i++) {
        propertiesList[i] = {
          ...propertiesList[i],
          'x-index': i
        }
      }
      for (let i = len - 1; i > targetIdx; i--) {
        propertiesList[i] = {
          ...propertiesList[i - 1],
          'x-index': i
        }
      }
      propertiesList[targetIdx] = {
        ...sourceItem,
        'x-index': targetIdx
      }
      const _properties = {}
      propertiesList.forEach(item => {
        _properties[item.id] = item
      })

      if (containerId) {
        newState.properties[containerId].properties = _properties
      } else {
        newState.properties = _properties
      }
      return newState
    case 'ADD_COMPONENT':
      if (component.__key__ === 'layout') {
        // 判断是否布局组件特殊处理
        newState.properties[id] = {
          type: 'object',
          id,
          __id__: id,
          ...component.__key__data__,
          properties: {},
          'x-props': {
            ...component.__key__data__['x-props'],
            _extra: component
          }
        }
        return newState
      }

      const propertiesList1 =
        addType === 'layout'
          ? getOrderProperties(newState.properties[containerId])
          : getOrderProperties(newState)

      if (existId) {
        // 在特定的existId之前插入新的组件
        const propLen = propertiesList1.length
        const item = propertiesList1.find(_item => _item.id === existId)
        const idx = item['x-index']
        for (let i = propLen; i > idx; i--) {
          propertiesList1[i] = {
            ...propertiesList1[i - 1],
            'x-index': i
          }
        }
        propertiesList1[idx] = {
          ...component,
          id,
          'x-index': idx
        }
      } else {
        // 在最后插入新的组件
        propertiesList1[propertiesList1.length] = {
          ...component,
          id,
          'x-index': propertiesList1.length
        }
      }

      const _properties1 = {}
      propertiesList1.forEach(item => {
        _properties1[item.id] = {
          ...item,
          __id__: item.id
        }
      })

      if (addType === 'layout') {
        newState.properties[containerId].properties = _properties1
      } else {
        newState.properties = _properties1
      }

      return newState
    case 'EDIT_COMPONENT':
      const _data_ =
        containerId && containerId !== id
          ? state.properties[containerId].properties
          : state.properties
      Object.keys(_data_).forEach(compId => {
        if (compId) {
          _data_[compId] = merge(
            {},
            _data_[compId],
            id === null || compId === id
              ? {
                ...propsData
              }
              : {
                active: false
              }
          )

          // hack
          if (
            propsData['x-props'] &&
            propsData['x-props'].enum &&
            Array.isArray(propsData['x-props'].enum) &&
            (id === null || compId === id)
          ) {
            _data_[compId]['x-props'] = _data_[compId]['x-props'] || {}
            _data_[compId]['x-props'].enum = propsData['x-props'].enum
            _data_[compId].enum = propsData['x-props'].enum
          }
        }
      })
      return newState
    case 'DELETE_COMPONENT':
      const newProp = {
        ...newState.properties
      }

      Object.keys(newState.properties).forEach(_key => {
        if (_key === id) {
          delete newProp[_key]
        }
        if (
          newState.properties[_key].type === 'object' &&
          newState.properties[_key].properties
        ) {
          Object.keys(newState.properties[_key].properties).forEach(__key => {
            if (__key === id) {
              delete newState.properties[_key].properties[__key]
            }
          })
        }
      })

      const _propertiesList_ = getOrderProperties({
        properties: newProp
      }).filter(item => !!item)
      const _properties_ = {}
      _propertiesList_.forEach((item, idx) => {
        if (item && item.id) {
          _properties_[item.id] = {
            ...item,
            'x-index': idx
          }
        }
      })
      newState.properties = _properties_
      return newState
    default:
      return state
  }
}

export default combineReducers({
  componentId,
  preview,
  codemode,
  componentProps,
  gbConfig,
  initSchemaData,
  layoutId
})
