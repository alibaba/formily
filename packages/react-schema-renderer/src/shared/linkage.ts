import { JSONCondition } from '../shared/condition'
import { FormPath, IFormEffect } from '@uform/react'
import { isFn } from '@uform/shared'
import { ISchemaFormActions } from '../types'
import { compileObject } from './expression'

export const presetLinkage = (
  resolve: (params: any, actions: ISchemaFormActions) => void,
  reject?: (params: any, actions: ISchemaFormActions) => void
) => (params: any, context: any): IFormEffect<any, ISchemaFormActions> => {
  return ($, actions) => {
    const { name, target, triggerType = 'onFieldChange' } = params
    const { hasChanged, getFormState, getFieldState } = actions
    $(triggerType, name).subscribe(fieldState => {
      const formState = getFormState()
      const targetState = getFieldState(target)
      const fieldValue = FormPath.parse(name).getIn(formState.values)
      const options = compileObject(params, {
        ...context,
        $value: fieldValue,
        $self: fieldState || {},
        $form: formState || {},
        $target: targetState || {}
      })
      options.condition = JSONCondition.calculate(options.condition, fieldValue)
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
