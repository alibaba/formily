/* istanbul ignore file */
import { untracked, autorun, observable } from '@formily/reactive'
import {
  isArr,
  isStr,
  isValid,
  toArr,
  each,
  isFn,
  isPlainObj,
  reduce,
} from '@formily/shared'
import { Schema } from './schema'
import {
  ISchema,
  ISchemaTransformerOptions,
  IFieldStateSetterOptions,
  SchemaReaction,
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
  IFieldFactoryProps,
  Field,
} from '@formily/core'
import { patchCompile, patchSchemaCompile, shallowCompile } from './compiler'

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

const DefaultFieldEffects = ['onFieldInit', 'onFieldValueChange']

const getDependencyValue = (
  field: Field,
  pattern: string,
  property?: string
) => {
  const [target, path] = String(pattern).split(/\s*#\s*/)
  return field.query(target).getIn(path || property || 'value')
}

const getDependencies = (
  field: Field,
  dependencies:
    | Array<string | { name?: string; source?: string; property?: string }>
    | object
) => {
  if (isArr(dependencies)) {
    const results = []
    dependencies.forEach((pattern) => {
      if (isStr(pattern)) {
        results.push(getDependencyValue(field, pattern))
      } else if (isPlainObj(pattern)) {
        if (pattern.name && pattern.source) {
          results[pattern.name] = getDependencyValue(
            field,
            pattern.source,
            pattern.property
          )
        }
      }
    })
    return results
  } else if (isPlainObj(dependencies)) {
    return reduce(
      dependencies,
      (buf, pattern, key) => {
        buf[key] = getDependencyValue(field, pattern)
        return buf
      },
      {}
    )
  }
  return []
}

const setSchemaFieldState = (
  options: IFieldStateSetterOptions,
  demand = false
) => {
  const { request, target, field, scope } = options || {}
  if (!request) return
  if (target) {
    if (request.state) {
      field.form.setFieldState(target, (state) =>
        patchCompile(state, request.state, {
          ...scope,
          $target: state,
        })
      )
    }
    if (request.schema) {
      field.form.setFieldState(target, (state) =>
        patchSchemaCompile(
          state,
          request.schema,
          {
            ...scope,
            $target: state,
          },
          demand
        )
      )
    }
  } else {
    if (request.state) {
      field.setState((state) => patchCompile(state, request.state, scope))
    }
    if (request.schema) {
      field.setState((state) =>
        patchSchemaCompile(state, request.schema, scope, demand)
      )
    }
  }
}

const getBaseScope = (field: Field, options: ISchemaTransformerOptions) => {
  const $observable = (target: any, deps?: any[]) =>
    autorun.memo(() => observable(target), deps)
  const $props = (props: any) => field.setComponentProps(props)
  const $effect = autorun.effect
  const $memo = autorun.memo
  const $self = field
  const $form = field.form
  const $values = field.form.values
  return {
    ...options.scope,
    $form,
    $self,
    $observable,
    $effect,
    $memo,
    $props,
    $values,
  }
}

const getBaseReactions =
  (schema: ISchema, options: ISchemaTransformerOptions) => (field: Field) => {
    setSchemaFieldState(
      {
        field,
        request: { schema },
        scope: getBaseScope(field, options),
      },
      true
    )
  }

const getUserReactions =
  (schema: ISchema, options: ISchemaTransformerOptions) => (field: Field) => {
    const reactions: SchemaReaction[] = toArr(schema['x-reactions'])
    const baseScope = getBaseScope(field, options)
    reactions.forEach((unCompiled) => {
      const reaction = shallowCompile(unCompiled, baseScope)
      if (!reaction) return
      if (isFn(reaction)) {
        return reaction(field)
      }
      const { when, fulfill, otherwise, target, effects } = reaction
      const run = () => {
        const $deps = getDependencies(field, reaction.dependencies)
        const $dependencies = $deps
        const scope = {
          ...baseScope,
          $target: null,
          $deps,
          $dependencies,
        }
        const compiledWhen = shallowCompile(when, scope)
        const condition = isValid(compiledWhen) ? compiledWhen : true
        const request = condition ? fulfill : otherwise
        const runner = condition ? fulfill?.run : otherwise?.run
        setSchemaFieldState({
          field,
          target,
          request,
          scope,
        })
        if (isStr(runner)) {
          shallowCompile(`{{function(){${runner}}}}`, scope)()
        }
      }

      if (target) {
        reaction.effects = effects?.length ? effects : DefaultFieldEffects
      }
      if (reaction.effects) {
        untracked(() => {
          each(reaction.effects, (type) => {
            if (FieldEffects[type]) {
              FieldEffects[type](field.address, run)
            }
          })
        })
      } else {
        run()
      }
    })
  }

export const transformFieldProps = (
  schema: Schema,
  options: ISchemaTransformerOptions
): IFieldFactoryProps<any, any> => {
  return {
    name: schema.name,
    reactions: [
      getBaseReactions(schema, options),
      getUserReactions(schema, options),
    ],
  }
}
