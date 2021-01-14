import { isFn } from '@formily/shared'
import { autorun, runInAction } from 'mobx'
import { Form } from '../models'
import { LifeCycleTypes } from '../types'
import { createEffect } from '../shared'

function createFormEffect(type: LifeCycleTypes) {
  return createEffect(
    type,
    (form: Form) => (callback: (form: Form) => void) => {
      if (isFn(callback)) {
        runInAction(() => {
          callback(form)
        })
      }
    }
  )
}

export const onFormInit = createFormEffect(LifeCycleTypes.ON_FORM_INIT)
export const onFormMount = createFormEffect(LifeCycleTypes.ON_FORM_MOUNT)
export const onFormUnMount = createFormEffect(LifeCycleTypes.ON_FORM_UNMOUNT)
export const onFormValuesChange = createFormEffect(
  LifeCycleTypes.ON_FORM_VALUES_CHANGE
)
export const onFormInitialValuesChange = createFormEffect(
  LifeCycleTypes.ON_FORM_INITIAL_VALUES_CHANGE
)
export const onFormInputChange = createFormEffect(
  LifeCycleTypes.ON_FORM_INPUT_CHANGE
)
export const onFormSubmit = createFormEffect(LifeCycleTypes.ON_FORM_SUBMIT)
export const onFormReset = createFormEffect(LifeCycleTypes.ON_FORM_RESET)
export const onFormSubmitStart = createFormEffect(
  LifeCycleTypes.ON_FORM_SUBMIT_START
)
export const onFormSubmitEnd = createFormEffect(
  LifeCycleTypes.ON_FORM_SUBMIT_END
)
export const onFormSubmitSuccess = createFormEffect(
  LifeCycleTypes.ON_FORM_SUBMIT_SUCCESS
)
export const onFormSubmitFailed = createFormEffect(
  LifeCycleTypes.ON_FORM_SUBMIT_FAILED
)
export const onFormSubmitValidateStart = createFormEffect(
  LifeCycleTypes.ON_FORM_SUBMIT_VALIDATE_START
)
export const onFormSubmitValidateSuccess = createFormEffect(
  LifeCycleTypes.ON_FORM_SUBMIT_VALIDATE_SUCCESS
)
export const onFormSubmitValidateFailed = createFormEffect(
  LifeCycleTypes.ON_FORM_SUBMIT_VALIDATE_FAILED
)
export const onFormValidateStart = createFormEffect(
  LifeCycleTypes.ON_FORM_VALIDATE_START
)
export const onFormValidateEnd = createFormEffect(
  LifeCycleTypes.ON_FORM_VALIDATE_END
)
export function onFormReact(callback?: (form: Form) => void) {
  let dispose = null
  onFormInit((form) => {
    dispose = autorun(() => {
      callback(form)
    })
  })
  onFormUnMount(() => {
    if (dispose) dispose()
  })
}
