import { FormPath, isFn, isRegExp } from '@formily/shared'
import { Form } from '../models/Form'
import { LifeCycleTypes } from '../types'
import { createHook } from '../hook'
import { Field } from '../models/Field'
import { autorun, runInAction } from 'mobx'
import { onFormUnMount } from './form'

type PathPattern =
  | string
  | number
  | Array<string | number>
  | FormPath
  | (((path: Array<string | number>) => boolean) & {
      path: FormPath
    })

export const createFieldHook = (type: LifeCycleTypes) => {
  return createHook(
    type,
    (field: Field, form: Form) => (
      pattern: PathPattern | RegExp,
      callback: (field: Field, form: Form) => void
    ) => {
      if (isFn(callback)) {
        if (isRegExp(pattern)) {
          if (pattern.test(field.path?.toString())) {
            callback(field, form)
          }
        } else if (FormPath.parse(pattern).match(field.path)) {
          callback(field, form)
        }
      }
    }
  )
}
export const onFieldInit = createFieldHook(LifeCycleTypes.ON_FIELD_INIT)
export const onFieldMount = createFieldHook(LifeCycleTypes.ON_FIELD_MOUNT)
export const onFieldUnMount = createFieldHook(LifeCycleTypes.ON_FIELD_UNMOUNT)
export const onFieldValueChange = createFieldHook(
  LifeCycleTypes.ON_FIELD_VALUE_CHANGE
)
export const onFieldInitialValueChange = createFieldHook(
  LifeCycleTypes.ON_FIELD_INITIAL_VALUE_CHANGE
)
export const onFieldInputChange = createFieldHook(
  LifeCycleTypes.ON_FIELD_INPUT_CHANGE
)
export const onFieldValidateStart = createFieldHook(
  LifeCycleTypes.ON_FIELD_VALIDATE_START
)
export const onFieldValidateEnd = createFieldHook(
  LifeCycleTypes.ON_FIELD_VALIDATE_END
)

export const onFieldReact = (
  pattern: string | RegExp,
  callback?: (field: Field, form: Form) => void
) => {
  const disposers = []
  onFieldInit(pattern, (field, form) => {
    disposers.push(
      autorun(() => {
        runInAction(() => {
          callback(field, form)
        })
      })
    )
  })
  onFormUnMount(() => {
    disposers.forEach(dispose => {
      dispose()
    })
  })
}
