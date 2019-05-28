import { each, toArr } from './array'
import { getIn, setIn } from './accessor'
import { isFn } from './types'
import { isEmpty } from './isEmpty'
const numberRE = /^\d+$/
const VIRTUAL_BOXES = {}

export const getSchemaNodeFromPath = (schema, path) => {
  let res = schema
  let suc = 0
  path = toArr(path)
  for (let i = 0; i < path.length; i++) {
    var key = path[i]
    if (res && !isEmpty(res.properties)) {
      res = res.properties[key]
      suc++
    } else if (res && !isEmpty(res.items) && numberRE.test(key)) {
      res = res.items
      suc++
    }
  }
  return suc === path.length ? res : undefined
}

export const schemaIs = (schema, type) => {
  return schema && schema.type === type
}

export const isVirtualBox = name => {
  return !!VIRTUAL_BOXES[name]
}

export const registerVirtualboxFlag = name => {
  VIRTUAL_BOXES[name] = true
}

const isVirtualBoxSchema = schema => {
  return isVirtualBox(schema['type']) || isVirtualBox(schema['x-component'])
}

const schemaTraverse = (schema, callback, path = [], schemaPath = []) => {
  if (schema) {
    if (isVirtualBoxSchema(schema)) {
      path = path.slice(0, path.length - 1)
    }
    callback(schema, { path, schemaPath })
    if (schemaIs(schema, 'object') || schema.properties) {
      each(schema.properties, (schema, key) => {
        schemaTraverse(
          schema,
          callback,
          path.concat(key),
          schemaPath.concat(key)
        )
      })
    } else if (schemaIs(schema, 'array') || schema.items) {
      if (schema.items) {
        callback(
          schema.items,
          index => {
            schemaTraverse(
              schema.items,
              callback,
              path.concat(index),
              schemaPath.concat(index)
            )
          },
          path
        )
      }
    }
  }
}

export const caculateSchemaInitialValues = (
  schema,
  initialValues,
  callback
) => {
  initialValues = initialValues || schema.default || {}
  schemaTraverse(schema, (schema, $path, parentPath) => {
    const defaultValue = schema.default
    if (isFn($path) && parentPath) {
      each(toArr(getIn(initialValues, parentPath)), function(value, index) {
        $path(index)
      })
    } else if ($path) {
      const isVirtualBox = isVirtualBoxSchema(schema)
      const name = isVirtualBox
        ? $path.schemaPath.join('.')
        : $path.path.join('.')
      const path = isVirtualBox ? $path.schemaPath : $path.path
      const schemaPath = $path.schemaPath
      const initialValue = getIn(initialValues, name)
      let value = !isEmpty(initialValue) ? initialValue : defaultValue
      if (!isEmpty(value)) {
        setIn(initialValues, name, value)
      }
      if (isFn(callback)) {
        const _path = {
          name,
          path,
          schemaPath
        }
        callback(_path, schema, value)
      }
    }
  })
  return initialValues
}
