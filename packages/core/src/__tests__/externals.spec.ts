import { createForm } from '..'
import {
  isArrayField,
  isArrayFieldState,
  isDataField,
  isDataFieldState,
  isField,
  isFieldState,
  isForm,
  isFormState,
  isGeneralField,
  isGeneralFieldState,
  isObjectField,
  isObjectFieldState,
  isQuery,
  isVoidField,
  isVoidFieldState,
  createEffectHook,
} from '../shared/externals'
import { attach } from './shared'

test('type checkers', () => {
  const form = attach(createForm())
  const normal = attach(
    form.createField({
      name: 'normal',
    })
  )
  const array = attach(
    form.createArrayField({
      name: 'array',
    })
  )
  const object = attach(
    form.createObjectField({
      name: 'object',
    })
  )
  const void_ = attach(
    form.createVoidField({
      name: 'void',
    })
  )
  expect(isField(normal)).toBeTruthy()
  expect(isFieldState(normal.getState())).toBeTruthy()
  expect(isFieldState(null)).toBeFalsy()
  expect(isFieldState({})).toBeFalsy()
  expect(isFieldState(normal)).toBeFalsy()

  expect(isArrayField(array)).toBeTruthy()
  expect(isArrayFieldState(array.getState())).toBeTruthy()
  expect(isArrayFieldState(null)).toBeFalsy()
  expect(isArrayFieldState({})).toBeFalsy()
  expect(isArrayFieldState(array)).toBeFalsy()

  expect(isObjectField(object)).toBeTruthy()
  expect(isObjectFieldState(object.getState())).toBeTruthy()
  expect(isObjectFieldState(null)).toBeFalsy()
  expect(isObjectFieldState({})).toBeFalsy()
  expect(isObjectFieldState(object)).toBeFalsy()

  expect(isVoidField(void_)).toBeTruthy()
  expect(isVoidFieldState(void_.getState())).toBeTruthy()
  expect(isVoidFieldState(null)).toBeFalsy()
  expect(isVoidFieldState({})).toBeFalsy()
  expect(isVoidFieldState(void_)).toBeFalsy()

  expect(isDataField(void_)).toBeFalsy()
  expect(isDataFieldState(void_.getState())).toBeFalsy()

  expect(isDataField(normal)).toBeTruthy()
  expect(isDataFieldState(normal.getState())).toBeTruthy()
  expect(isGeneralField(normal)).toBeTruthy()
  expect(isGeneralField(array)).toBeTruthy()
  expect(isGeneralField(object)).toBeTruthy()
  expect(isGeneralField(void_)).toBeTruthy()

  expect(isGeneralFieldState(normal.getState())).toBeTruthy()
  expect(isGeneralFieldState(array.getState())).toBeTruthy()
  expect(isGeneralFieldState(object.getState())).toBeTruthy()
  expect(isGeneralFieldState(void_.getState())).toBeTruthy()
  expect(isGeneralFieldState(null)).toBeFalsy()
  expect(isGeneralFieldState({})).toBeFalsy()
  expect(isGeneralFieldState(void_)).toBeFalsy()

  expect(isForm(form)).toBeTruthy()
  expect(isFormState(form.getState())).toBeTruthy()
  expect(isFormState({})).toBeFalsy()
  expect(isFormState(form)).toBeFalsy()
  expect(isFormState(null)).toBeFalsy()
  expect(isQuery(form.query('*'))).toBeTruthy()
})

test('createEffectHook', () => {
  try {
    createEffectHook('xxx')()
  } catch {}
  const form = attach(
    createForm({
      effects() {
        createEffectHook('xxx')()
        createEffectHook('yyy', () => () => {})()
      },
    })
  )
  form.notify('xxx')
  form.notify('yyy')
})
