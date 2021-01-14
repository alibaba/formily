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
  onFormUnMount,
  onFormValidateEnd,
  onFormValidateStart,
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
