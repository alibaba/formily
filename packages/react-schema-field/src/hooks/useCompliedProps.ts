import { useContext } from 'react'
import { runInAction } from 'mobx'
import { ISchema, SchemaKey, Schema } from '@formily/json-schema'
import {
  isBool,
  isArr,
  isStr,
  FormPath,
  isValid,
  toArr,
  isEqual,
  each,
  isFn,
} from '@formily/shared'
import { getValidateLocale } from '@formily/validator'
import { SchemaExpressionScopeContext, SchemaRequiredContext } from '../shared'
import {
  ISchemaFieldFactoryOptions,
  ISchemaFieldUpdateRequest,
  ISchemaTransformerOptions,
} from '../types'

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
      },
    })
  }
  if (isValid(schema.multipleOf)) {
    rules.push({
      validator: (value: any) => {
        return value % schema.multipleOf === 0
          ? ''
          : getValidateLocale('schema.multipleOf')
      },
    })
  }
  if (isValid(schema.maxProperties)) {
    rules.push({
      validator: (value: any) => {
        return Object.keys(value || {}).length <= schema.maxProperties
          ? ''
          : getValidateLocale('schema.maxProperties')
      },
    })
  }
  if (isValid(schema.minProperties)) {
    rules.push({
      validator: (value: any) => {
        return Object.keys(value || {}).length >= schema.minProperties
          ? ''
          : getValidateLocale('schema.minProperties')
      },
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
      },
    })
  }

  if (isValid(schema['x-validator'])) {
    rules = rules.concat(schema['x-validator'])
  }
  if (rules.length) return rules
}

const getFieldDataSourceBySchema = (schema: ISchema) => {
  if (isArr(schema['enum'])) {
    return schema['enum'].map((item) => {
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
}

const getFieldInternalPropsBySchema = (
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
    disabled: schema['x-disabled'],
    editable: schema['x-editable'],
    readOnly: isValid(schema['x-read-only'])
      ? schema['x-read-only']
      : schema['readOnly'],
    readPretty: schema['x-read-pretty'],
    visible: schema['x-visible'],
    hidden: schema['x-hidden'],
    display: schema['x-display'],
    pattern: schema['x-pattern'],
    decorator: [
      schema['x-decorator'] &&
        FormPath.getIn(options?.components, schema['x-decorator']),
      schema['x-decorator-props'],
    ],
    component: [
      schema['x-component'] &&
        FormPath.getIn(options?.components, schema['x-component']),
      schema['x-component-props'],
    ],
  }
}

const patchState = (state: any, target: any) => {
  each(target, (value, key) => {
    if (key === 'component') {
      state[key] = [
        value?.[0] ? value[0] : state?.component?.[0],
        {
          ...state?.component?.[1],
          ...value?.[1],
        },
      ]
    } else if (key === 'decorator') {
      state[key] = [
        value?.[0] ? value[0] : state?.decorator?.[0],
        {
          ...state?.decorator?.[1],
          ...value?.[1],
        },
      ]
    } else if (isValid(value)) {
      state[key] = value
    }
  })
}

const getSchemaFieldRequired = (
  schema: ISchema,
  name: SchemaKey,
  required: ISchema['required']
) => {
  if (isBool(schema.required)) {
    return schema.required
  }
  if (isStr(required)) {
    if (FormPath.parse(required).match(name)) {
      return true
    }
  }
  if (isArr(required)) {
    if (required.some((parent) => FormPath.parse(parent).match(name))) {
      return true
    }
  }
}

const getSchemaFieldReactions = (
  schema: ISchema,
  options: ISchemaFieldFactoryOptions
) => {
  const setSchemaFieldState = (
    field: Formily.Core.Types.GeneralField,
    request: ISchemaFieldUpdateRequest,
    complie: (expression: any) => any
  ) => {
    if (!request) return
    runInAction(() => {
      if (request.state) {
        field.setState((state) => patchState(state, complie(request.state)))
      }
      if (request.schema) {
        field.setState((state) =>
          patchState(
            state,
            getFieldInternalPropsBySchema(complie(request.schema), options)
          )
        )
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
      return dependencies.map((pattern) => {
        const [target, path] = String(pattern).split(/\s*#\s*/)
        return field
          .query(target)
          .take((field) => FormPath.getIn(field, path || 'value'))
      })
    }
    return []
  }

  return (field: Formily.Core.Models.Field) => {
    const reactions = schema['x-reactions']
    if (isArr(reactions)) {
      reactions.forEach((reaction) => {
        if (!reaction) return
        if (isFn(reaction)) {
          return reaction(field)
        }
        const $self = field
        const $form = field.form
        const $deps = parseDependencies(field, reaction.dependencies)
        const $dependencies = $deps
        const scope = {
          ...options.scope,
          $form,
          $self,
          $deps,
          $dependencies,
        }
        const when = Schema.complie(reaction?.when, scope)
        const complie = (expression: any) => {
          return Schema.complie(expression, scope)
        }
        if (when) {
          if (reaction.target) {
            field.query(reaction.target).forEach((field) => {
              setSchemaFieldState(field, reaction.fullfill, complie)
            })
          } else {
            setSchemaFieldState(field, reaction.fullfill, complie)
          }
        } else {
          if (reaction.target) {
            field.query(reaction.target).forEach((field) => {
              setSchemaFieldState(field, reaction.otherwise, complie)
            })
          } else {
            setSchemaFieldState(field, reaction.otherwise, complie)
          }
        }
      })
    }
  }
}

export const transformSchemaToFieldProps = (
  name: SchemaKey,
  schema: ISchema,
  options: ISchemaTransformerOptions
) => {
  const required = getSchemaFieldRequired(schema, name, options.required)
  const reactions = getSchemaFieldReactions(schema, options)
  const props = getFieldInternalPropsBySchema(schema, options)
  return {
    ...props,
    required,
    name,
    reactions: [reactions],
  }
}

export const useCompliedProps = (
  name: SchemaKey,
  schema: ISchema,
  options: ISchemaFieldFactoryOptions
) => {
  const required = useContext(SchemaRequiredContext)
  const contextScope = useContext(SchemaExpressionScopeContext)
  return transformSchemaToFieldProps(name, schema, {
    ...options,
    required,
    scope: {
      ...options.scope,
      ...contextScope,
    },
  }) as Formily.React.Types.IFieldProps<any, any, any>
}
