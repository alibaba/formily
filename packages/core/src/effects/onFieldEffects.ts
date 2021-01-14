import { FormPath, isFn, toArr } from '@formily/shared'
import { autorun, reaction, runInAction } from 'mobx'
import { Form, Field } from '../models'
import {
  LifeCycleTypes,
  FormPathPattern,
  GeneralField,
  IFieldState,
} from '../types'
import { createEffect } from '../shared'
import { onFormUnMount } from './onFormEffects'

function createFieldEffect(type: LifeCycleTypes) {
  return createEffect(
    type,
    (field: Field, form: Form) => (
      pattern: FormPathPattern,
      callback: (field: GeneralField, form: Form) => void
    ) => {
      if (isFn(callback)) {
        if (
          FormPath.parse(pattern).matchAliasGroup(field.address, field.path)
        ) {
          runInAction(() => {
            callback(field, form)
          })
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
export const onFieldValidateFailed = createFieldEffect(
  LifeCycleTypes.ON_FIELD_VALIDATE_FAILED
)
export const onFieldValidateSuccess = createFieldEffect(
  LifeCycleTypes.ON_FIELD_VALIDATE_SUCCESS
)
export function onFieldReact(
  pattern: FormPathPattern,
  callback?: (field: GeneralField, form: Form) => void
) {
  const disposers = []
  onFieldInit(pattern, (field, form) => {
    disposers.push(
      autorun(() => {
        if (isFn(callback)) callback(field, form)
      })
    )
  })
  onFormUnMount(() => {
    disposers.forEach((dispose) => {
      dispose()
    })
  })
}

export function onFieldChange(
  pattern: FormPathPattern,
  watches: (keyof IFieldState)[] = ['value'],
  callback?: (field: GeneralField, form: Form) => void
) {
  const disposers = []
  onFieldInit(pattern, (field, form) => {
    if (isFn(callback)) callback(field, form)
    disposers.push(
      reaction(
        () => {
          return toArr(watches).map((key) => {
            return field[key]
          })
        },
        () => {
          if (isFn(callback)) callback(field, form)
        }
      )
    )
  })
  onFormUnMount(() => {
    disposers.forEach((dispose) => {
      dispose()
    })
  })
}
