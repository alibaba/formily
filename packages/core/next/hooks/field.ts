import {
  FormPath,
  FormPathPattern,
  isArr,
  isFn,
  isRegExp
} from '@formily/shared'
import { Form } from '../models/Form'
import { LifeCycleTypes } from '../types'
import { createHook } from '../hook'
import { Field } from '../models/Field'
import { deepObserve } from '../shared'

export const createFieldHook = (type: LifeCycleTypes) => {
  return createHook(
    type,
    (field: Field, form: Form) => (
      pattern: FormPathPattern | RegExp,
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
export function onFieldChange(
  pattern: FormPathPattern | RegExp,
  watches: string[],
  callback: (field: Field, form: Form) => void
): void
export function onFieldChange(
  pattern: FormPathPattern | RegExp,
  callback: (field: Field, form: Form) => void
): void
export function onFieldChange(
  pattern: FormPathPattern | RegExp,
  ...args: any[]
) {
  let callback = isFn(args[0]) ? args[0] : args[1]
  let watches = isArr(args[0]) ? args[0] : []
  onFieldInit(pattern, (field, form) => {
    if (isFn(callback)) {
      deepObserve(field, (change, path) => {
        if (watches.length) {
          if (watches.some(item => FormPath.parse(item).match(path))) {
            callback(field, form)
          }
        } else {
          callback(field, form)
        }
      })
    }
  })
}
