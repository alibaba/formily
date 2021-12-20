import { JSONCondition } from '../shared/condition'
import {
  FormEffectHooks,
  createFormActions,
  IFormActions,
  IFieldMergeState
} from '@formily/react'
import { isFn, isStr, isArr, FormPathPattern, FormPath } from '@formily/shared'
import { ISchemaFormActions } from '../types'
import { complieExpression } from './expression'
import { Schema } from './schema'

const pathExpRE = /\[\s*(?:([+-])\s*(\d+)?)?\s*\]/g

const transformTargetPath = (
  target: FormPathPattern,
  indexes: number[],
  basePath: FormPath
) => {
  if (!isStr(target)) return target
  let index = 0
  const newTarget = target
    .replace(/^\s*(\.+)/, (_: string, $1: string) => {
      const depth = $1.length
      let path = basePath
      for (let i = 0; i < depth; i++) {
        path = path.parent()
      }
      return path.toString() + '.'
    })
    .replace(pathExpRE, (_: string, operator: string, delta: string) => {
      if (delta) {
        if (operator === '+') {
          return String(indexes[index++] + Number(delta))
        } else if (operator === '-') {
          return String(indexes[index++] - Number(delta))
        }
      } else {
        if (operator === '+') {
          return String(indexes[index++] + 1)
        } else if (operator === '-') {
          return String(indexes[index++] - 1)
        }
      }
      return String(indexes[index++])
    })
  pathExpRE.lastIndex = 0
  return newTarget
}

const getPathIndexes = (path: any): number[] => {
  return path.transform(/\d+/, (...args) => args.map(i => Number(i))) as any
}

export const parseLinkages = (
  fieldState: IFieldMergeState,
  {
    getFieldState,
    getFormState,
    scope: outerScope
  }: {
    getFieldState?: IFormActions['getFieldState']
    getFormState?: IFormActions['getFormState']
    scope?: () => any
  } = {}
) => {
  const schema = new Schema(fieldState.props)
  const linkages = schema.getExtendsLinkages()
  if (!isArr(linkages)) return []
  const fieldName = FormPath.parse(fieldState.name)
  const fieldIndexes = getPathIndexes(fieldName)
  const formState = getFormState ? getFormState() : {}
  return linkages.map(({ target, condition, scope, ...params }) => {
    const newTarget = transformTargetPath(target, fieldIndexes, fieldName)
    const targetState = getFieldState ? getFieldState(newTarget) : {}
    const fieldValue = fieldName.getIn(formState.values)
    const _scope = {
      ...outerScope,
      ...scope,
      $value: fieldValue,
      $self: fieldState || {},
      $form: formState || {},
      $target: targetState || {}
    }
    const options = params
    options.complie = (path: FormPathPattern = '', scope?: any) => {
      return complieExpression(FormPath.getIn(params, path), {
        ..._scope,
        ...scope
      })
    }
    if (condition !== undefined) {
      options.condition = JSONCondition.calculate(
        complieExpression(condition, _scope),
        fieldValue
      )
    }
    options.target = newTarget
    return options
  })
}

type LinkageParams = {
  type: string
  condition: any
  complie: (path: FormPathPattern, scope?: any) => any
  [key: string]: any
}

export const useValueLinkageEffect = ({
  type,
  resolve,
  reject,
  scope
}: {
  type?: string
  resolve?: (params: LinkageParams, actions: ISchemaFormActions) => void
  reject?: (params: LinkageParams, actions: ISchemaFormActions) => void
  scope?: any
} = {}) => {
  if (!type || !isFn(resolve)) return
  const actions = createFormActions()
  const { getFormState, getFieldState, hasChanged } = actions
  const { onFieldChange$ } = FormEffectHooks
  onFieldChange$('*').subscribe(fieldState => {
    if (
      !hasChanged(fieldState, 'value') &&
      !hasChanged(fieldState, 'initialized') &&
      !hasChanged(fieldState, 'visible')
    ) {
      return
    }
    const linkages = parseLinkages(fieldState, {
      getFieldState,
      getFormState,
      scope
    })
    linkages.forEach(options => {
      const { type: linkageType, condition } = options
      if (linkageType !== type) return
      if (isFn(resolve)) {
        if (condition === true || condition === undefined)
          resolve(options, actions)
      }
      if (isFn(reject)) {
        if (condition === false) reject(options, actions)
      }
    })
  })
}
