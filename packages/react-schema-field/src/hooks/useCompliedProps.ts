import { useContext } from 'react'
import { runInAction } from 'mobx'
import { ISchema, complieExpression } from '@formily/json-schema'
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
import { SchemaExpressionScopeContext, SchemaRequiredContext } from '../shared'
import { ISchemaFieldFactoryOptions, ISchemaFieldUpdateRequest } from '../types'

const getValidatorBySchema = (
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

const getFieldDataSourceBySchema = (schema: ISchema) => {
  if (isArr(schema['enum'])) {
    return schema['enum'].map(item => {
      if (typeof item === 'object') {
        return item
      } else {
        return {
          label: item,
          value: item
        }
      }
    })
  }
}

const getFieldPropsBySchema = (
  schema: ISchema,
  options: ISchemaFieldFactoryOptions
) => {
  return {
    validator: getValidatorBySchema(schema),
    dataSource: getFieldDataSourceBySchema(schema),
    required: isBool(schema.required) ? schema.required : undefined,
    initialValue: schema.default,
    title: schema.title,
    description: schema.description,
    display: schema['x-display'],
    pattern: schema['x-pattern'],
    decorator: [
      options?.components?.[schema['x-decorator']],
      schema['x-decorator-props']
    ],
    component: [
      options?.components?.[schema['x-component']],
      schema['x-component-props']
    ]
  }
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

const useSchemaFieldReactions = (
  schema: ISchema,
  options: ISchemaFieldFactoryOptions
) => {
  const scope = useContext(SchemaExpressionScopeContext)

  const setSchemaFieldState = (
    field: Formily.Core.Types.GeneralField,
    request: ISchemaFieldUpdateRequest,
    complie: (expression: any) => any
  ) => {
    runInAction(() => {
      if (request.state) {
        field.setState(complie(request.state))
      }
      if (request.schema) {
        field.setState(getFieldPropsBySchema(complie(request.schema), options))
      }
      if (isStr(request.run)) {
        complie(`async function(){${request.run}}`)()
      }
    })
  }

  const parseDependencies = (
    field: Formily.Core.Models.Field,
    dependencies: string[]
  ) => {
    if (isArr(dependencies)) {
      return dependencies.map(pattern => {
        const [target, path] = String(pattern).split(/\s*#\s*/)
        return field
          .query(target)
          .all.get(field => (path ? FormPath.getIn(field, path) : field))
      })
    }
    return []
  }

  return (field: Formily.Core.Models.Field) => {
    const reactions = schema['x-reactions']
    if (isArr(reactions)) {
      reactions.forEach(reaction => {
        if (!reaction) return
        const complie = (expression: any) => {
          return complieExpression(expression, {
            ...options.scope,
            ...scope,
            get $value() {
              return field.value
            },
            get $form() {
              return field.form
            },
            get $self() {
              return field
            },
            get $dependencies() {
              return parseDependencies(field, reaction.dependencies)
            },
            get $deps() {
              return parseDependencies(field, reaction.dependencies)
            }
          })
        }
        if (complie(reaction.when)) {
          setSchemaFieldState(field, reaction.fullfill, complie)
        } else {
          setSchemaFieldState(field, reaction.otherwise, complie)
        }
      })
    }
  }
}

export const useCompliedProps = (
  name: string,
  schema: ISchema,
  options: ISchemaFieldFactoryOptions
): Formily.React.Types.IFieldProps<any, any, any> => {
  const required = useSchemaFieldRequired(name, schema)
  const reactions = useSchemaFieldReactions(schema, options)
  const props = getFieldPropsBySchema(schema, options)
  return {
    ...props,
    required,
    reactions: [reactions],
    name: name
  }
}
