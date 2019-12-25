import { JSONCondition } from '../shared/condition'
import {
  FormPath,
  FormEffectHooks,
  createFormActions,
  IFormActions,
  IFieldMergeState
} from '@uform/react'
import { isFn, isStr, isArr } from '@uform/shared'
import { ISchemaFormActions } from '../types'
import { compileObject } from './expression'
import { Schema } from './schema'

const pathExpRE = /\[\s*(?:([+-])\s*(\d+)?)?\s*\]/g

const transformTargetPath = (target: string, indexes: number[]) => {
  if (!isStr(target)) return target
  let index = 0
  const newTarget = target.replace(
    pathExpRE,
    (_: string, operator: string, delta: string) => {
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
    }
  )
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
    scope
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
  return linkages.map(params => {
    const newTarget = transformTargetPath(params.target, fieldIndexes)
    const targetState = getFieldState ? getFieldState(newTarget) : {}
    const fieldValue = fieldName.getIn(formState.values)
    const options = compileObject(params, {
      ...scope,
      $value: fieldValue,
      $self: fieldState || {},
      $form: formState || {},
      $target: targetState || {}
    })
    options.condition = JSONCondition.calculate(options.condition, fieldValue)
    options.target = newTarget
    return options
  })
}

export const useValueLinkageEffect = ({
  type,
  resolve,
  reject,
  scope
}: {
  type?: string
  resolve?: (params: any, actions: ISchemaFormActions) => void
  reject?: (params: any, actions: ISchemaFormActions) => void
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
        if (condition) resolve(options, actions)
      }
      if (isFn(reject)) {
        if (!condition) reject(options, actions)
      }
    })
  })
}
