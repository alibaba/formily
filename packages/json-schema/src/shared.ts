import { isFn, isArr, toArr, FormPath } from '@formily/shared'
import { isObservable, untracked } from '@formily/reactive'
import { Schema } from './schema'

const REVA_ACTIONS_KEY = Symbol.for('__REVA_ACTIONS')

export const hasOwnProperty = Object.prototype.hasOwnProperty

export const SchemaNestedKeys = {
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

export const SchemaValidatorKeys = {
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
  path: any[],
  compiled: any
) => {
  untracked(() => {
    const isEnum = path[0] === 'enum' && isArr(compiled)
    const schemaMapKey = SchemaStateMap[path[0]]
    if (schemaMapKey) {
      FormPath.setIn(
        targetState,
        [schemaMapKey].concat(path.slice(1)),
        isEnum ? createDataSource(compiled) : compiled
      )
    } else {
      const isValidatorKey = SchemaValidatorKeys[path[0]]
      if (isValidatorKey) {
        targetState['setValidatorRule'](path[0], compiled)
      }
    }
  })
}
