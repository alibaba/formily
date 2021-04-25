import { untracked } from '@formily/reactive'
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
  isPlainObj,
  reduce,
  isEmpty,
  FormPathPattern,
} from '@formily/shared'
import { getValidateLocale } from '@formily/validator'
import { Schema } from './schema'
import {
  ISchema,
  ISchemaFieldFactoryOptions,
  ISchemaFieldUpdateRequest,
  SchemaReactions,
} from './types'
import {
  onFieldInit,
  onFieldMount,
  onFieldUnmount,
  onFieldValueChange,
  onFieldInputValueChange,
  onFieldInitialValueChange,
  onFieldValidateStart,
  onFieldValidateEnd,
  onFieldValidateFailed,
  onFieldValidateSuccess,
} from '@formily/core'
import { IFieldState } from '@formily/core/esm/types'

const FieldEffects = {
  onFieldInit,
  onFieldMount,
  onFieldUnmount,
  onFieldValueChange,
  onFieldInputValueChange,
  onFieldInitialValueChange,
  onFieldValidateStart,
  onFieldValidateEnd,
  onFieldValidateFailed,
  onFieldValidateSuccess,
}

const getValidatorBySchema = (
  schema: Schema
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
      validator: (
        value: any,
        rule: any,
        ctx: any,
        format: (message: string, scope: any) => string
      ) => {
        if (isEmpty(value)) return ''
        return value === schema.const
          ? ''
          : format(getValidateLocale('schema.const'), schema)
      },
    })
  }
  if (isValid(schema.multipleOf)) {
    rules.push({
      validator: (
        value: any,
        rule: any,
        ctx: any,
        format: (message: string, scope: any) => string
      ) => {
        if (isEmpty(value)) return ''
        return value % schema.multipleOf === 0
          ? ''
          : format(getValidateLocale('schema.multipleOf'), schema)
      },
    })
  }
  if (isValid(schema.maxProperties)) {
    rules.push({
      validator: (
        value: any,
        rule: any,
        ctx: any,
        format: (message: string, scope: any) => string
      ) => {
        if (isEmpty(value)) return ''
        return Object.keys(value || {}).length <= schema.maxProperties
          ? ''
          : format(getValidateLocale('schema.maxProperties'), schema)
      },
    })
  }
  if (isValid(schema.minProperties)) {
    rules.push({
      validator: (
        value: any,
        rule: any,
        ctx: any,
        format: (message: string, scope: any) => string
      ) => {
        if (isEmpty(value)) return ''
        return Object.keys(value || {}).length >= schema.minProperties
          ? ''
          : format(getValidateLocale('schema.minProperties'), schema)
      },
    })
  }
  if (isValid(schema.uniqueItems)) {
    rules.push({
      validator: (
        value: any,
        rule: any,
        ctx: any,
        format: (message: string, scope: any) => string
      ) => {
        value = toArr(value)
        return value.some((item: any, index: number) => {
          for (let start = index; start < value.length; start++) {
            if (isEqual(value[start], item)) {
              return false
            }
          }
        })
          ? format(getValidateLocale('schema.uniqueItems'), schema)
          : ''
      },
    })
  }

  if (isValid(schema['x-validator'])) {
    rules = rules.concat(schema['x-validator'])
  }
  if (rules.length) return rules
}

const getFieldDataSourceBySchema = (schema: Schema) => {
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

const omitInvalid = (target: any) => {
  return reduce(
    target,
    (buf, value, key) => {
      if (!isEmpty(value)) {
        buf[key] = value
      }
      return buf
    },
    {}
  )
}

const findComponent = (
  type: 'component' | 'decorator',
  path: Formily.Core.Types.FormPathPattern,
  options: ISchemaFieldFactoryOptions,
  state: IFieldState
) => {
  if (path) {
    const component =
      FormPath.getIn(options?.components, path) || state?.[type]?.[0]
    if (component) {
      return component
    }
    if (options?.components) {
      //Todo: need to use __DEV__ keyword
      console.error(
        `[Formily JSON Schema]: Cannot find the '${path}' component mapped by Schema.x-${type}`
      )
    }
  }
  return state?.[type]?.[0]
}

const getStateFromSchema = (
  schema: Schema,
  options: ISchemaFieldFactoryOptions,
  state?: IFieldState
) => {
  return omitInvalid({
    validator: getValidatorBySchema(schema),
    dataSource: getFieldDataSourceBySchema(schema),
    required: isBool(schema.required) ? schema.required : undefined,
    initialValue: schema.default,
    title: schema.title,
    description: schema.description,
    disabled: schema['x-disabled'],
    editable: isValid(schema['x-editable'])
      ? schema['x-editable']
      : schema['writeOnly'],
    readOnly: isValid(schema['x-read-only'])
      ? schema['x-read-only']
      : schema['readOnly'],
    readPretty: schema['x-read-pretty'],
    visible: schema['x-visible'],
    hidden: schema['x-hidden'],
    display: schema['x-display'],
    pattern: schema['x-pattern'],
    decorator: [
      findComponent('decorator', schema['x-decorator'], options, state),
      schema['x-decorator-props'] || state?.decorator?.[1],
    ],
    component: [
      findComponent('component', schema['x-component'], options, state),
      schema['x-component-props'] || state?.component?.[1],
    ],
  })
}

const patchState = (state: any, target: any) => {
  const patch = (target: any, path: string[]) => {
    if (isArr(target) || isPlainObj(target)) {
      each(target, (value, key) => {
        patch(value, path.concat(key))
      })
    } else {
      FormPath.setIn(state, path, target)
    }
  }
  untracked(() => {
    patch(target, [])
  })
  return state
}

const getSchemaFieldRequired = (schema: Schema) => {
  if (isBool(schema.required)) {
    return schema.required
  }
  let parent: Schema = schema.parent
  while (parent) {
    if (isStr(parent.required)) {
      if (FormPath.parse(parent.required).match(schema.name)) return true
    } else if (isArr(parent.required)) {
      if (
        parent.required.some((parent) =>
          FormPath.parse(parent).match(schema.name)
        )
      ) {
        return true
      }
    }
    parent = parent.parent
  }
  return undefined
}

const getSchemaFieldReactions = (
  schema: ISchema,
  options: ISchemaFieldFactoryOptions
) => {
  const setSchemaFieldState = (
    field: Formily.Core.Types.GeneralField,
    request: ISchemaFieldUpdateRequest,
    compile: (expression: any) => any
  ) => {
    if (!request) return
    if (request.state) {
      field.setState((state) => patchState(state, compile(request.state)))
    }
    if (request.schema) {
      field.setState((state) =>
        patchState(
          state,
          getStateFromSchema(
            patchState({}, compile(request.schema)),
            options,
            state
          )
        )
      )
    }
  }

  const setSchemaFieldStateByTarget = (
    form: Formily.Core.Models.Form,
    target: FormPathPattern,
    request: ISchemaFieldUpdateRequest,
    compile: (expression: any, state?: any) => any
  ) => {
    if (!request) return
    if (request.state) {
      form.setFieldState(target, (state) =>
        patchState(state, compile(request.state, state))
      )
    }
    if (request.schema) {
      form.setFieldState(target, (state) =>
        patchState(
          state,
          getStateFromSchema(
            patchState({}, compile(request.schema, state)),
            options,
            state
          )
        )
      )
    }
  }

  const queryDepdency = (field: Formily.Core.Models.Field, pattern: string) => {
    const [target, path] = String(pattern).split(/\s*#\s*/)
    return field.query(target).getIn(path || 'value')
  }

  const parseDependencies = (
    field: Formily.Core.Models.Field,
    dependencies: string[] | object
  ) => {
    if (isArr(dependencies)) {
      return dependencies.map((pattern) => queryDepdency(field, pattern))
    } else if (isPlainObj(dependencies)) {
      return reduce(
        dependencies,
        (buf, pattern, key) => {
          buf[key] = queryDepdency(field, pattern)
          return buf
        },
        {}
      )
    }
    return []
  }

  return (field: Formily.Core.Models.Field) => {
    const reactions: SchemaReactions = toArr(schema['x-reactions'])
    reactions.forEach((reaction) => {
      if (!reaction) return
      if (isFn(reaction)) {
        return reaction(field)
      }
      const run = () => {
        const $self = field
        const $form = field.form
        const $deps = parseDependencies(field, reaction.dependencies)
        const $dependencies = $deps
        const scope = {
          ...options.scope,
          $target: null,
          $form,
          $self,
          $deps,
          $dependencies,
        }
        const compile = (expression: any, target?: any) => {
          if (target) {
            scope.$target = target
          }
          return Schema.compile(expression, scope)
        }
        const when = Schema.compile(reaction?.when, scope)
        const condition = isValid(reaction?.when) ? when : true
        if (condition) {
          if (reaction.target) {
            setSchemaFieldStateByTarget(
              field.form,
              reaction.target,
              reaction.fulfill,
              compile
            )
          } else {
            setSchemaFieldState(field, reaction.fulfill, compile)
          }
          if (isStr(reaction.fulfill?.run)) {
            compile(`{{async function(){${reaction.fulfill?.run}}}}`)()
          }
        } else {
          if (reaction.target) {
            setSchemaFieldStateByTarget(
              field.form,
              reaction.target,
              reaction.otherwise,
              compile
            )
          } else {
            setSchemaFieldState(field, reaction.otherwise, compile)
          }
          if (isStr(reaction.otherwise?.run)) {
            compile(`{{async function(){${reaction.otherwise?.run}}}}`)()
          }
        }
      }
      if (reaction.target) {
        reaction.effects = reaction.effects?.length
          ? reaction.effects
          : ['onFieldInit', 'onFieldValueChange']
      }
      if (reaction.effects) {
        each(reaction.effects, (type) => {
          if (FieldEffects[type]) {
            untracked(() => {
              FieldEffects[type](field.address, run)
            })
          }
        })
      } else {
        run()
      }
    })
  }
}

export const transformSchemaToFieldProps = (
  schema: Schema,
  options: ISchemaFieldFactoryOptions
) => {
  const required = getSchemaFieldRequired(schema)
  const reactions = getSchemaFieldReactions(schema, options)
  const props = getStateFromSchema(schema, options)
  return {
    ...props,
    required,
    name: schema.name,
    reactions: [reactions],
  }
}
