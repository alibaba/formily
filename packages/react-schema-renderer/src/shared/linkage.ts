import { JSONCondition } from '../shared/condition'
import { FormPath, IFormEffect } from '@uform/react'
import { isFn, isStr } from '@uform/shared'
import { ISchemaFormActions } from '../types'
import { compileObject } from './expression'

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

export const presetLinkage = (
  resolve: (params: any, actions: ISchemaFormActions) => void,
  reject?: (params: any, actions: ISchemaFormActions) => void
) => (params: any, context: any): IFormEffect<any, ISchemaFormActions> => {
  return ($, actions) => {
    const { name, target, triggerType = 'onFieldChange' } = params
    const { hasChanged, getFormState, getFieldState } = actions
    $(triggerType, name).subscribe(fieldState => {
      const fieldName = FormPath.parse(fieldState.name)
      const fieldIndexes = getPathIndexes(fieldName)
      const formState = getFormState()
      const newTarget = transformTargetPath(target, fieldIndexes)
      const targetState = getFieldState(newTarget)
      const fieldValue = fieldName.getIn(formState.values)
      const options = compileObject(params, {
        ...context,
        $value: fieldValue,
        $self: fieldState || {},
        $form: formState || {},
        $target: targetState || {}
      })
      options.condition = JSONCondition.calculate(options.condition, fieldValue)
      options.target = newTarget
      if (
        hasChanged(fieldState, 'value') ||
        hasChanged(fieldState, 'initialized') ||
        hasChanged(fieldState, 'visible')
      ) {
        if (isFn(resolve)) {
          if (options.condition) resolve(options, actions)
        }
        if (isFn(reject)) {
          if (!options.condition) reject(options, actions)
        }
      }
    })
  }
}
