import { useContext } from 'react'
import { ISchema } from '@formily/json-schema'
import {
  isBool,
  isArr,
  isStr,
  FormPath,
  isValid,
  toArr,
  isEqual
} from '@formily/shared'
import { getValidateLocale } from '@formily/validator'
import { SchemaRequiredContext } from '../shared'
import { ISchemaFieldFactoryOptions } from '../types'

const useSchemaFieldValidator = (
  schema: ISchema
): Formily.Core.Types.FieldValidator => {
  let rules = []
  if (schema.format) {
    rules.push({ format: schema.format })
  }
  if (isValid(schema.maxItems)) {
    rules.push({ max: schema.maxItems })
  }
  if (isValid(schema.minItems)) {
    rules.push({ min: schema.minItems })
  }
  if (isValid(schema.maxLength)) {
    rules.push({ max: schema.maxLength })
  }
  if (isValid(schema.minLength)) {
    rules.push({ min: schema.minLength })
  }
  if (isValid(schema.maximum)) {
    rules.push({ maximum: schema.maximum })
  }
  if (isValid(schema.minimum)) {
    rules.push({ minimum: schema.minimum })
  }
  if (isValid(schema.exclusiveMaximum)) {
    rules.push({ exclusiveMaximum: schema.exclusiveMaximum })
  }
  if (isValid(schema.exclusiveMinimum)) {
    rules.push({ exclusiveMinimum: schema.exclusiveMinimum })
  }
  if (isValid(schema.pattern)) {
    rules.push({ pattern: schema.pattern })
  }
  if (isValid(schema.const)) {
    rules.push({
      validator: (value: any) => {
        return value === schema.const ? '' : getValidateLocale('schema.const')
      }
    })
  }
  if (isValid(schema.multipleOf)) {
    rules.push({
      validator: (value: any) => {
        return value % schema.multipleOf === 0
          ? ''
          : getValidateLocale('schema.multipleOf')
      }
    })
  }
  if (isValid(schema.maxProperties)) {
    rules.push({
      validator: (value: any) => {
        return Object.keys(value || {}).length <= schema.maxProperties
          ? ''
          : getValidateLocale('schema.maxProperties')
      }
    })
  }
  if (isValid(schema.minProperties)) {
    rules.push({
      validator: (value: any) => {
        return Object.keys(value || {}).length >= schema.minProperties
          ? ''
          : getValidateLocale('schema.minProperties')
      }
    })
  }
  if (isValid(schema.uniqueItems) && schema.uniqueItems) {
    rules.push({
      validator: (value: any) => {
        value = toArr(value)
        return value.some((item: any, index: number) => {
          for (let start = index; start < value.length; start++) {
            if (isEqual(value[start], item)) {
              return false
            }
          }
        })
          ? getValidateLocale('schema.uniqueItems')
          : ''
      }
    })
  }

  if (isValid(schema['x-validator'])) {
    rules = rules.concat(schema['x-validator'])
  }
  return rules
}

const useSchemaFieldRequired = (name: string, schema: ISchema) => {
  const required = useContext(SchemaRequiredContext)
  if (isBool(schema.required)) {
    return schema.required
  }
  if (isStr(required)) {
    if (FormPath.parse(required).match(name)) {
      return true
    }
  }
  if (isArr(required)) {
    if (required.some(parent => FormPath.parse(parent).match(name))) {
      return true
    }
  }
}

export const useCompliedProps = (
  name: string,
  schema: ISchema,
  options: ISchemaFieldFactoryOptions
) => {
  const required = useSchemaFieldRequired(name, schema)
  const validator = useSchemaFieldValidator(schema)
  return {
    required,
    validator,
    name: name,
    initialValue: schema.default,
    title: schema.title,
    description: schema.description,
    display: schema['x-display'],
    pattern: schema['x-pattern'],
    decorator: [
      options?.decorators?.[schema['x-decorator']],
      schema['x-decorator-props']
    ],
    component: [
      options?.components?.[schema['x-component']],
      {
        ...schema['x-component-props'],
        dataSource: schema['enum']
          ? schema['enum']
          : schema?.['x-component-props']?.['dataSource']
      }
    ]
  }
}
