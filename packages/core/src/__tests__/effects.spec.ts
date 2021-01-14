import {
  createForm,
  onFieldChange,
  onFieldInit,
  onFieldInitialValueChange,
  onFieldInputValueChange,
  onFieldMount,
  onFieldReact,
  onFieldUnMount,
  onFieldValidateEnd,
  onFieldValidateStart,
  onFieldValueChange,
  onFormInit,
  onFormInitialValuesChange,
  onFormInputChange,
  onFormMount,
  onFormReact,
  onFormReset,
  onFormSubmit,
  onFormSubmitEnd,
  onFormSubmitFailed,
  onFormSubmitStart,
  onFormSubmitSuccess,
  onFormSubmitValidateFailed,
  onFormSubmitValidateStart,
  onFormSubmitValidateSuccess,
  onFormSubmitValidateEnd,
  onFormUnMount,
  onFormValidateEnd,
  onFormValidateStart,
  onFormValidateFailed,
  onFormValidateSuccess,
  onFormValuesChange,
} from '../'
import { attach } from './shared'

test('onFormInit/onFormMount/onFormUnmount', () => {
  const mount = jest.fn()
  const init = jest.fn()
  const unmount = jest.fn()
  const form = attach(
    createForm({
      effects() {
        onFormInit(init)
        onFormMount(mount)
        onFormUnMount(unmount)
      },
    })
  )
  expect(init).toBeCalled()
  expect(mount).toBeCalled()
  expect(unmount).not.toBeCalled()
  form.onUnmount()
  expect(unmount).toBeCalled()
})

test('onFormValuesChange/onFormInitialValuesChange', () => {
  const valuesChange = jest.fn()
  const initialValuesChange = jest.fn()
  const form = attach(
    createForm({
      effects() {
        onFormValuesChange(valuesChange)
        onFormInitialValuesChange(initialValuesChange)
      },
    })
  )
  expect(valuesChange).not.toBeCalled()
  expect(initialValuesChange).not.toBeCalled()
  form.setValues({
    aa: '123',
  })
  expect(form.values.aa).toEqual('123')
  expect(valuesChange).toBeCalled()
  form.setInitialValues({
    aa: '321',
    bb: '123',
  })
  expect(form.values.aa).toEqual('123')
  expect(form.values.bb).toEqual('123')
  expect(initialValuesChange).toBeCalled()
})

test('onFormInputChange', () => {
  const inputChange = jest.fn()
  const valuesChange = jest.fn()
  const form = attach(
    createForm({
      effects() {
        onFormValuesChange(valuesChange)
        onFormInputChange(inputChange)
      },
    })
  )
  const field = attach(
    form.createField({
      name: 'aa',
    })
  )
  expect(inputChange).not.toBeCalled()
  expect(valuesChange).not.toBeCalled()
  field.setValue('123')
  expect(inputChange).not.toBeCalled()
  expect(valuesChange).toBeCalledTimes(1)
  field.onInput('123')
  expect(inputChange).toBeCalled()
  expect(valuesChange).toBeCalledTimes(1)
  field.onInput('321')
  expect(inputChange).toBeCalledTimes(2)
  expect(valuesChange).toBeCalledTimes(2)
})

test('onFormReact', () => {
  const react = jest.fn()
  const form = attach(
    createForm({
      effects() {
        onFormReact((form) => {
          if (form.values.aa) {
            react()
          }
        })
      },
    })
  )
  expect(react).not.toBeCalled()
  form.setValues({ aa: 123 })
  expect(react).toBeCalled()
})

test('onFormReset', async () => {
  const reset = jest.fn()
  const form = attach(
    createForm({
      initialValues: {
        aa: 123,
      },
      effects() {
        onFormReset(reset)
      },
    })
  )

  const field = attach(
    form.createField({
      name: 'aa',
    })
  )

  field.setValue('xxxx')

  expect(field.value).toEqual('xxxx')
  expect(form.values.aa).toEqual('xxxx')
  expect(reset).not.toBeCalled()
  await form.reset()
  expect(field.value).toEqual(123)
  expect(form.values.aa).toEqual(123)
  expect(reset).toBeCalled()
})

test('onFormSubmit', async () => {
  const submit = jest.fn()
  const submitStart = jest.fn()
  const submitEnd = jest.fn()
  const submitSuccess = jest.fn()
  const submitFailed = jest.fn()
  const submitValidateStart = jest.fn()
  const submitValidateFailed = jest.fn()
  const submitValidateSuccess = jest.fn()
  const submitValidateEnd = jest.fn()
  const form = attach(
    createForm({
      effects() {
        onFormSubmitStart(submitStart)
        onFormSubmit(submit)
        onFormSubmitEnd(submitEnd)
        onFormSubmitFailed(submitFailed)
        onFormSubmitSuccess(submitSuccess)
        onFormSubmitValidateStart(submitValidateStart)
        onFormSubmitValidateFailed(submitValidateFailed)
        onFormSubmitValidateSuccess(submitValidateSuccess)
        onFormSubmitValidateEnd(submitValidateEnd)
      },
    })
  )

  const field = attach(
    form.createField({
      name: 'aa',
      required: true,
    })
  )
  try {
    await form.submit()
  } catch {}
  expect(submitStart).toBeCalled()
  expect(submit).toBeCalled()
  expect(submitEnd).toBeCalled()
  expect(submitSuccess).not.toBeCalled()
  expect(submitFailed).toBeCalled()
  expect(submitValidateStart).toBeCalled()
  expect(submitValidateFailed).toBeCalled()
  expect(submitValidateSuccess).not.toBeCalled()
  expect(submitValidateEnd).toBeCalled()
  field.onInput('123')
  try {
    await form.submit()
  } catch (e) {}
  expect(submitStart).toBeCalledTimes(2)
  expect(submit).toBeCalledTimes(2)
  expect(submitEnd).toBeCalledTimes(2)
  expect(submitSuccess).toBeCalledTimes(1)
  expect(submitFailed).toBeCalledTimes(1)
  expect(submitValidateStart).toBeCalledTimes(2)
  expect(submitValidateFailed).toBeCalledTimes(1)
  expect(submitValidateSuccess).toBeCalledTimes(1)
  expect(submitValidateEnd).toBeCalledTimes(2)
})

test('onFormValidate', async () => {
  const validateStart = jest.fn()
  const validateEnd = jest.fn()
  const validateFailed = jest.fn()
  const validateSuccess = jest.fn()
  const form = attach(
    createForm({
      effects() {
        onFormValidateStart(validateStart)
        onFormValidateEnd(validateEnd)
        onFormValidateFailed(validateFailed)
        onFormValidateSuccess(validateSuccess)
      },
    })
  )
  const field = attach(
    form.createField({
      name: 'aa',
      required: true,
    })
  )
  try {
    await form.validate()
  } catch {}
  expect(validateStart).toBeCalled()
  expect(validateEnd).toBeCalled()
  expect(validateFailed).toBeCalled()
  expect(validateSuccess).not.toBeCalled()
  field.onInput('123')
  try {
    await form.validate()
  } catch {}
  expect(validateStart).toBeCalledTimes(2)
  expect(validateEnd).toBeCalledTimes(2)
  expect(validateFailed).toBeCalledTimes(1)
  expect(validateSuccess).toBeCalledTimes(1)
})
