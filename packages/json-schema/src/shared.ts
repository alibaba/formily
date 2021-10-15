import { isFn, each, isPlainObj, isArr, toArr, FormPath } from '@formily/shared'
import { isObservable, untracked } from '@formily/reactive'
import { Schema } from './schema'
import { ISchema } from './types'

const REVA_ACTIONS_KEY = Symbol.for('__REVA_ACTIONS')

export const SchemaNestedMap = {
  parent: true,
  root: true,
  properties: true,
  patternProperties: true,
  additionalProperties: true,
  items: true,
  additionalItems: true,
  'x-linkages': true,
  'x-reactions': true,
}

export const SchemaStateMap = {
  title: 'title',
  description: 'description',
  default: 'initialValue',
  enum: 'dataSource',
  readOnly: 'readOnly',
  writeOnly: 'editable',
  'x-content': 'content',
  'x-data': 'data',
  'x-value': 'value',
  'x-editable': 'editable',
  'x-disabled': 'disabled',
  'x-read-pretty': 'readPretty',
  'x-read-only': 'readOnly',
  'x-visible': 'visible',
  'x-hidden': 'hidden',
  'x-display': 'display',
  'x-pattern': 'pattern',
  'x-validator': 'validator',
  'x-decorator': 'decoratorType',
  'x-component': 'componentType',
  'x-decorator-props': 'decoratorProps',
  'x-component-props': 'componentProps',
}

export const SchemaValidatorMap = {
  required: true,
  format: true,
  maxItems: true,
  minItems: true,
  maxLength: true,
  minLength: true,
  maximum: true,
  minimum: true,
  exclusiveMaximum: true,
  exclusiveMinimum: true,
  pattern: true,
  const: true,
  multipleOf: true,
  maxProperties: true,
  minProperties: true,
  uniqueItems: true,
}

export const SchemaNormalKeys = Object.keys(SchemaStateMap)

export const SchemaValidatorKeys = Object.keys(SchemaValidatorMap)

export const hasOwnProperty = Object.prototype.hasOwnProperty

export const traverse = (
  target: any,
  visitor: (value: any, path: Array<string | number>) => void
) => {
  const seenObjects = []
  const root = target
  const traverse = (target: any, path = []) => {
    if (isPlainObj(target)) {
      const seenIndex = seenObjects.indexOf(target)
      if (seenIndex > -1) {
        return
      }
      const addIndex = seenObjects.length
      seenObjects.push(target)
      if (isNoNeedCompileObject(target) && root !== target) {
        visitor(target, path)
        return
      }
      each(target, (value, key) => {
        traverse(value, path.concat(key))
      })
      seenObjects.splice(addIndex, 1)
    } else {
      visitor(target, path)
    }
  }
  traverse(target)
}

export const traverseSchema = (
  schema: ISchema,
  visitor: (value: any, path: any[]) => void
) => {
  if (schema['x-validator'] !== undefined) {
    visitor(schema['x-validator'], ['x-validator'])
  }
  const seenObjects = []
  const root = schema
  const traverse = (target: any, path = []) => {
    if (
      path[0] === 'x-validator' ||
      path[0] === 'version' ||
      path[0] === '_isJSONSchemaObject'
    )
      return
    if (String(path[0]).indexOf('x-') == -1 && isFn(target)) return
    if (SchemaNestedMap[path[0]]) return
    if (isPlainObj(target)) {
      if (path[0] === 'default' || path[0] === 'x-value') {
        visitor(target, path)
        return
      }
      const seenIndex = seenObjects.indexOf(target)
      if (seenIndex > -1) {
        return
      }
      const addIndex = seenObjects.length
      seenObjects.push(target)
      if (isNoNeedCompileObject(target) && root !== target) {
        visitor(target, path)
        return
      }
      each(target, (value, key) => {
        traverse(value, path.concat(key))
      })
      seenObjects.splice(addIndex, 1)
    } else {
      visitor(target, path)
    }
  }
  traverse(schema)
}

export const isNoNeedCompileObject = (source: any) => {
  if ('$$typeof' in source && '_owner' in source) {
    return true
  }
  if (source['_isAMomentObject']) {
    return true
  }
  if (Schema.isSchemaInstance(source)) {
    return true
  }
  if (source[REVA_ACTIONS_KEY]) {
    return true
  }
  if (isFn(source['toJS'])) {
    return true
  }
  if (isFn(source['toJSON'])) {
    return true
  }
  if (isObservable(source)) {
    return true
  }
  return false
}

export const createDataSource = (source: any[]) => {
  return toArr(source).map((item) => {
    if (typeof item === 'object') {
      return item
    } else {
      return {
        label: item,
        value: item,
      }
    }
  })
}

export const patchStateFormSchema = (
  targetState: any,
  pattern: any[],
  compiled: any
) => {
  untracked(() => {
    const path = FormPath.parse(pattern)
    const segments = path.segments
    const key = segments[0]
    const isEnum = key === 'enum' && isArr(compiled)
    const schemaMapKey = SchemaStateMap[key]
    if (schemaMapKey) {
      FormPath.setIn(
        targetState,
        [schemaMapKey].concat(segments.slice(1)),
        isEnum ? createDataSource(compiled) : compiled
      )
    } else {
      const isValidatorKey = SchemaValidatorMap[key]
      if (isValidatorKey) {
        targetState['setValidatorRule']?.(key, compiled)
      }
    }
  })
}
