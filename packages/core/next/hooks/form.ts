import { isFn } from '@formily/shared'
import { Form } from '../models/Form'
import { LifeCycleTypes } from '../types'
import { createHook } from '../hook'
export const createFormHook = (type: LifeCycleTypes) => {
  return createHook(type, (form: Form) => (callback: (form: Form) => void) => {
    if (isFn(callback)) {
      callback(form)
    }
  })
}
export const onFormInit = createFormHook(LifeCycleTypes.ON_FORM_INIT)
export const onFormMount = createFormHook(LifeCycleTypes.ON_FORM_MOUNT)
export const onFormUnMount = createFormHook(LifeCycleTypes.ON_FORM_UNMOUNT)
export const onFormValuesChange = createFormHook(
  LifeCycleTypes.ON_FORM_VALUES_CHANGE
)
export const onFormInitialValuesChange = createFormHook(
  LifeCycleTypes.ON_FORM_INITIAL_VALUES_CHANGE
)
export const onFormInputChange = createFormHook(
  LifeCycleTypes.ON_FORM_INPUT_CHANGE
)
export const onFormSubmit = createFormHook(LifeCycleTypes.ON_FORM_SUBMIT)
export const onFormReset = createFormHook(LifeCycleTypes.ON_FORM_RESET)
export const onFormSubmitStart = createFormHook(
  LifeCycleTypes.ON_FORM_SUBMIT_START
)
export const onFormSubmitEnd = createFormHook(LifeCycleTypes.ON_FORM_SUBMIT_END)
export const onFormSubmitSuccess = createFormHook(
  LifeCycleTypes.ON_FORM_SUBMIT_SUCCESS
)
export const onFormSubmitFailed = createFormHook(
  LifeCycleTypes.ON_FORM_SUBMIT_FAILED
)
export const onFormSubmitValidateStart = createFormHook(
  LifeCycleTypes.ON_FORM_SUBMIT_VALIDATE_START
)
export const onFormSubmitValidateSuccess = createFormHook(
  LifeCycleTypes.ON_FORM_SUBMIT_VALIDATE_SUCCESS
)
export const onFormSubmitValidateFailed = createFormHook(
  LifeCycleTypes.ON_FORM_SUBMIT_VALIDATE_FAILED
)
export const onFormValidateStart = createFormHook(
  LifeCycleTypes.ON_FORM_VALIDATE_START
)
export const onFormValidateEnd = createFormHook(
  LifeCycleTypes.ON_FORM_VALIDATE_END
)
