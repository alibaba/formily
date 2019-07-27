import { getOrderProperties, initOrderProperties } from '../utils/util'
import merge from 'lodash.merge'

export default (state = {}, action) => {
  let newState = {
    ...state
  }
  const { data = {} } = action
  const {
    component,
    id,
    targetId,
    propsData = {},
    existId = null,
    containerId = []
  } = data

  const loop = (obj, idArr = []) => {
    const _idArr = [...idArr]
    const _id = _idArr.shift()
    if (!_idArr.length) return obj.properties[_id]
    return loop(obj.properties[_id], _idArr)
  }

  const getProperties = (obj, idArr = []) => {
    const _idArr = [...idArr]
    const _id = _idArr.shift()
    if (!_idArr.length) return obj.properties
    return getProperties(obj.properties[_id], _idArr)
  }

  const setProperties = (obj, idArr = [], prop) => {
    const _idArr = [...idArr]
    if (!_idArr.length) {
      obj.properties = prop
    } else {
      const _id = _idArr.shift()
      setProperties(obj.properties[_id], _idArr, prop)
    }
  }

  const deleteItem = (obj, idArr = []) => {
    const _idArr = [...idArr]
    const _id = _idArr.shift()
    if (!_idArr.length) {
      delete obj.properties[_id]
    } else {
      deleteItem(obj.properties[_id], _idArr)
    }
  }

  switch (action.type) {
    case 'INIT_SCHEMA':
      // 自动生成z-index顺序
      const newSchema = initOrderProperties(data)
      newState = {
        ...newState,
        ...newSchema
      }
      return newState
    case 'MOVE_COMOPNENT':
      const sourceItem = loop(newState, [...id])
      const targetItem = loop(newState, [...targetId])

      deleteItem(newState, [...id])

      targetItem.properties[sourceItem.id] = sourceItem

      return newState
    case 'CHANGE_COMPONENT_ORDER':
      const _propertiesList = getOrderProperties(newState, [...containerId])
      const _sourceItem = loop(newState, [...id])
      const _targetItem = loop(newState, [...targetId])
      const targetIdx = _targetItem['x-index']
      const sourceIdx = _sourceItem['x-index']

      if (id.length !== targetId.length) {
        alert('目前只支持同级别组件的顺序替换')
        return newState
      }

      _propertiesList[targetIdx] = {
        ..._sourceItem,
        'x-index': targetIdx
      }
      _propertiesList[sourceIdx] = {
        ..._targetItem,
        'x-index': sourceIdx
      }

      const _properties11 = {}
      _propertiesList.forEach(item => {
        _properties11[item.id] = {
          ...item
        }
      })

      setProperties(newState, containerId, _properties11)

      return newState
    case 'ADD_COMPONENT':
      const propertiesList1 = getOrderProperties(newState, [...containerId])

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
          ...item
        }
      })

      setProperties(newState, containerId, _properties1)

      if (!newState.type) {
        newState.type = 'object'
      }

      return newState
    case 'EDIT_COMPONENT':
      const _data_ = getProperties(newState, id)
      const lastId = [...id].pop()

      Object.keys(_data_).forEach(compId => {
        if (compId) {
          _data_[compId] = merge(
            {},
            _data_[compId],
            id === null || compId === lastId
              ? {
                  active: true,
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
            (id === null || compId === lastId)
          ) {
            _data_[compId]['x-props'] = _data_[compId]['x-props'] || {}
            _data_[compId]['x-props'].enum = propsData['x-props'].enum
            _data_[compId].enum = propsData['x-props'].enum
          }
          if (
            propsData['x-props'] &&
            propsData['x-props'].requestOptions &&
            propsData['x-props'].requestOptions.data &&
            (id === null || compId === lastId)
          ) {
            _data_[compId]['x-props'].requestOptions =
              _data_[compId]['x-props'].requestOptions || {}
            _data_[compId]['x-props'].requestOptions.data =
              propsData['x-props'].requestOptions.data
          }
        }
      })
      return newState
    case 'DELETE_COMPONENT':
      deleteItem(newState, [...id])
      return newState
    default:
      return state
  }
}
