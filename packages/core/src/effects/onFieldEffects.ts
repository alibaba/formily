import { FormPath, isFn, toArr } from '@formily/shared'
import { autorun, reaction, batch } from '@formily/reactive'
import { Form } from '../models'
import {
  LifeCycleTypes,
  FormPathPattern,
  GeneralField,
  DataField,
  IFieldState,
} from '../types'
import { createEffectHook, useEffectForm } from '../shared/effective'
import { onFormUnmount } from './onFormEffects'

function createFieldEffect<Result extends GeneralField = GeneralField>(
  type: LifeCycleTypes
) {
  return createEffectHook(
    type,
    (field: Result, form: Form) =>
      (
        pattern: FormPathPattern,
        callback: (field: Result, form: Form) => void
      ) => {
        if (
          FormPath.parse(pattern).matchAliasGroup(field.address, field.path)
        ) {
          batch(() => {
            callback(field, form)
          })
        }
      }
  )
}
const _onFieldInit = createFieldEffect(LifeCycleTypes.ON_FIELD_INIT)
export const onFieldMount = createFieldEffect(LifeCycleTypes.ON_FIELD_MOUNT)
export const onFieldUnmount = createFieldEffect(LifeCycleTypes.ON_FIELD_UNMOUNT)
export const onFieldValueChange = createFieldEffect<DataField>(
  LifeCycleTypes.ON_FIELD_VALUE_CHANGE
)
export const onFieldInitialValueChange = createFieldEffect<DataField>(
  LifeCycleTypes.ON_FIELD_INITIAL_VALUE_CHANGE
)
export const onFieldInputValueChange = createFieldEffect<DataField>(
  LifeCycleTypes.ON_FIELD_INPUT_VALUE_CHANGE
)
export const onFieldValidateStart = createFieldEffect<DataField>(
  LifeCycleTypes.ON_FIELD_VALIDATE_START
)
export const onFieldValidateEnd = createFieldEffect<DataField>(
  LifeCycleTypes.ON_FIELD_VALIDATE_END
)
export const onFieldValidating = createFieldEffect<DataField>(
  LifeCycleTypes.ON_FIELD_VALIDATING
)
export const onFieldValidateFailed = createFieldEffect<DataField>(
  LifeCycleTypes.ON_FIELD_VALIDATE_FAILED
)
export const onFieldValidateSuccess = createFieldEffect<DataField>(
  LifeCycleTypes.ON_FIELD_VALIDATE_SUCCESS
)
export const onFieldSubmit = createFieldEffect<DataField>(
  LifeCycleTypes.ON_FIELD_SUBMIT
)
export const onFieldSubmitStart = createFieldEffect<DataField>(
  LifeCycleTypes.ON_FIELD_SUBMIT_START
)
export const onFieldSubmitEnd = createFieldEffect<DataField>(
  LifeCycleTypes.ON_FIELD_SUBMIT_END
)
export const onFieldSubmitValidateStart = createFieldEffect<DataField>(
  LifeCycleTypes.ON_FIELD_SUBMIT_VALIDATE_START
)
export const onFieldSubmitValidateEnd = createFieldEffect<DataField>(
  LifeCycleTypes.ON_FIELD_SUBMIT_VALIDATE_END
)
export const onFieldSubmitSuccess = createFieldEffect<DataField>(
  LifeCycleTypes.ON_FIELD_SUBMIT_SUCCESS
)
export const onFieldSubmitFailed = createFieldEffect<DataField>(
  LifeCycleTypes.ON_FIELD_SUBMIT_FAILED
)
export const onFieldSubmitValidateSuccess = createFieldEffect<DataField>(
  LifeCycleTypes.ON_FIELD_SUBMIT_VALIDATE_SUCCESS
)
export const onFieldSubmitValidateFailed = createFieldEffect<DataField>(
  LifeCycleTypes.ON_FIELD_SUBMIT_VALIDATE_FAILED
)
export const onFieldReset = createFieldEffect<DataField>(
  LifeCycleTypes.ON_FIELD_RESET
)
export const onFieldLoading = createFieldEffect<DataField>(
  LifeCycleTypes.ON_FIELD_LOADING
)

export function onFieldInit(
  pattern: FormPathPattern,
  callback?: (field: GeneralField, form: Form) => void
) {
  const form = useEffectForm()
  const count = form.query(pattern).reduce((count, field) => {
    callback(field, form)
    return count + 1
  }, 0)
  if (count === 0) {
    _onFieldInit(pattern, callback)
  }
}

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
  onFormUnmount(() => {
    disposers.forEach((dispose) => {
      dispose()
    })
  })
}
export function onFieldChange(
  pattern: FormPathPattern,
  callback?: (field: GeneralField, form: Form) => void
): void
export function onFieldChange(
  pattern: FormPathPattern,
  watches: (keyof IFieldState)[],
  callback?: (field: GeneralField, form: Form) => void
): void
export function onFieldChange(
  pattern: FormPathPattern,
  watches: any,
  callback?: (field: GeneralField, form: Form) => void
): void {
  if (isFn(watches)) {
    callback = watches
    watches = ['value']
  } else {
    watches = watches || ['value']
  }
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

  onFormUnmount(() => {
    disposers.forEach((dispose) => {
      dispose()
    })
  })
}
