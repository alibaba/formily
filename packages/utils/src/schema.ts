import { each, toArr } from './array'
import { getIn, setIn, Path } from './accessor'
import { isFn } from './types'
import { isEmpty } from './isEmpty'
const numberRE = /^\d+$/
const VIRTUAL_BOXES = {}

type traverseCallback = (schema: Schema, payload: any, path?: Path) => void

type PathInfo = {
  name: string
  path: string[]
  schemaPath: string[]
}

type Dispatcher = (eventName: string, payload: any) => void

type RuleDescription = {
  required?: boolean
  message?: string,
  pattern?: RegExp | string,
  validator?: RuleHandler
}

type RuleHandler = (value: any, rule: RuleDescription, values: object, name: string) => string | null

export type Schema = {
  type?: string
  title?: string
  description?: string
  default?: any
  required?: boolean
  enum?: Array<{ label: string, value: any } | string | number>
  properties?: {
    [key: string]: Schema
  }
  items?: Schema
  minItems?: number
  maxItems?: number
  ['x-props']: object
  ['x-index']: number
  ['x-rules']: RuleHandler | Array<RuleHandler | RuleDescription | string> | string | RuleDescription
  ['x-component']: string
  ['x-effect']: (dispatch: Dispatcher) => { [key: string]: any }
}

export const getSchemaNodeFromPath = (schema: Schema, path: Path) => {
  let res = schema
  let suc = 0
  path = toArr(path)
  for (let i = 0; i < path.length; i++) {
    var key = path[i]
    if (res && !isEmpty(res.properties)) {
      res = res.properties[key]
      suc++
    } else if (res && !isEmpty(res.items) && numberRE.test(key as string)) {
      res = res.items
      suc++
    }
  }
  return suc === path.length ? res : undefined
}

export const schemaIs = (schema: Schema, type: string) => {
  return schema && schema.type === type
}

export const isVirtualBox = (name: string) => {
  return !!VIRTUAL_BOXES[name]
}

export const registerVirtualboxFlag = (name: string) => {
  VIRTUAL_BOXES[name] = true
}

const isVirtualBoxSchema = (schema: Schema) => {
  return isVirtualBox(schema['type']) || isVirtualBox(schema['x-component'])
}

const schemaTraverse = (schema: Schema, callback: traverseCallback, path: Array<number | string> = [], schemaPath = []) => {
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
          path.concat(key as string),
          schemaPath.concat(key)
        )
      })
    } else if (schemaIs(schema, 'array') || schema.items) {
      if (schema.items) {
        callback(
          schema.items,
          (index: number | string) => {
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
  schema: Schema,
  initialValues: any,
  callback: (pathInfo: PathInfo, schema: Schema, value: any) => void
) => {
  initialValues = initialValues || schema.default || {}
  schemaTraverse(schema, (schema, $path, parentPath) => {
    const defaultValue = schema.default
    if (isFn($path) && parentPath) {
      each(toArr(getIn(initialValues, parentPath)), function (value, index) {
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
