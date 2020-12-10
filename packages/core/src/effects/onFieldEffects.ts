import { FormPath, isFn, isRegExp } from '@formily/shared'
import { autorun } from 'mobx'
import { Form, Field } from '../models'
import { LifeCycleTypes, FormPathPattern, GeneralField } from '../types'
import { createEffect } from '../shared'
import { onFormUnMount } from './onFormEffects'

const createFieldEffect = (type: LifeCycleTypes) => {
  return createEffect(
    type,
    (field: Field, form: Form) => (
      pattern: FormPathPattern | RegExp,
      callback: (field: GeneralField, form: Form) => void
    ) => {
      if (isFn(callback)) {
        if (isRegExp(pattern)) {
          if (pattern.test(field.address?.toString())) {
            callback(field, form)
          }
        } else if (
          FormPath.parse(pattern).matchAliasGroup(field.address, field.path)
        ) {
          callback(field, form)
        }
      }
    }
  )
}
export const onFieldInit = createFieldEffect(LifeCycleTypes.ON_FIELD_INIT)
export const onFieldMount = createFieldEffect(LifeCycleTypes.ON_FIELD_MOUNT)
export const onFieldUnMount = createFieldEffect(LifeCycleTypes.ON_FIELD_UNMOUNT)
export const onFieldValueChange = createFieldEffect(
  LifeCycleTypes.ON_FIELD_VALUE_CHANGE
)
export const onFieldInitialValueChange = createFieldEffect(
  LifeCycleTypes.ON_FIELD_INITIAL_VALUE_CHANGE
)
export const onFieldInputValueChange = createFieldEffect(
  LifeCycleTypes.ON_FIELD_INPUT_VALUE_CHANGE
)
export const onFieldValidateStart = createFieldEffect(
  LifeCycleTypes.ON_FIELD_VALIDATE_START
)
export const onFieldValidateEnd = createFieldEffect(
  LifeCycleTypes.ON_FIELD_VALIDATE_END
)

export const onFieldReact = (
  pattern: FormPathPattern | RegExp,
  callback?: (field: GeneralField, form: Form) => void
) => {
  const disposers = []
  onFieldInit(pattern, (field, form) => {
    disposers.push(
      autorun(() => {
        callback(field, form)
      })
    )
  })
  onFormUnMount(() => {
    disposers.forEach(dispose => {
      dispose()
    })
  })
}
