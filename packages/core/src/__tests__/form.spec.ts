import { createForm } from '../'
import { onFieldValueChange } from '../effects'
import { attach } from './shared'

const sleep = (duration = 100) =>
  new Promise((resolve) => {
    setTimeout(resolve, duration)
  })

test('create form', () => {
  const form = attach(createForm())
  expect(form).not.toBeUndefined()
})

test('createField/createArrayField/createObjectField/createVoidField', () => {
  const form = attach(createForm())
  const normal = attach(
    form.createField({
      name: 'normal',
      basePath: 'parent',
    })
  )
  const array_ = attach(
    form.createArrayField({ name: 'array', basePath: 'parent' })
  )
  const object_ = attach(
    form.createObjectField({ name: 'object', basePath: 'parent' })
  )
  const void_ = attach(
    form.createVoidField({ name: 'void', basePath: 'parent' })
  )
  const children_ = attach(
    form.createField({ name: 'children', basePath: 'parent.void' })
  )
  expect(normal).not.toBeUndefined()
  expect(array_).not.toBeUndefined()
  expect(object_).not.toBeUndefined()
  expect(void_).not.toBeUndefined()
  expect(normal.address.toString()).toEqual('parent.normal')
  expect(normal.path.toString()).toEqual('parent.normal')
  expect(array_.address.toString()).toEqual('parent.array')
  expect(array_.path.toString()).toEqual('parent.array')
  expect(object_.address.toString()).toEqual('parent.object')
  expect(object_.path.toString()).toEqual('parent.object')
  expect(void_.address.toString()).toEqual('parent.void')
  expect(void_.path.toString()).toEqual('parent.void')
  expect(children_.address.toString()).toEqual('parent.void.children')
  expect(children_.path.toString()).toEqual('parent.children')
})

test('setValues/setInitialValues', () => {
  const form = attach(createForm())
  form.setValues({
    aa: 123,
    cc: {
      kk: 321,
    },
  })
  const field = attach(
    form.createField({
      name: 'cc.mm',
      initialValue: 'ooo',
    })
  )
  const field2 = attach(
    form.createField({
      name: 'cc.pp',
      initialValue: 'www',
    })
  )
  expect(form.values.aa).toEqual(123)
  expect(form.values.cc.kk).toEqual(321)
  expect(form.values.cc.mm).toEqual('ooo')
  expect(form.initialValues.cc.mm).toEqual('ooo')
  expect(form.values.cc.pp).toEqual('www')
  expect(form.initialValues.cc.pp).toEqual('www')
  expect(field.value).toEqual('ooo')
  expect(field2.value).toEqual('www')
  form.setInitialValues({
    bb: '123',
    cc: {
      dd: 'xxx',
      pp: 'www2',
    },
  })
  expect(form.values.aa).toEqual(123)
  expect(form.values.bb).toEqual('123')
  expect(form.values.cc.kk).toEqual(321)
  expect(form.values.cc.dd).toEqual('xxx')
  expect(form.initialValues.bb).toEqual('123')
  expect(form.initialValues.cc.kk).toBeUndefined()
  expect(form.initialValues.cc.dd).toEqual('xxx')
  expect(form.values.cc.mm).toEqual('ooo')
  expect(form.initialValues.cc.mm).toEqual('ooo')
  expect(field.value).toEqual('ooo')
  expect(form.values.cc.pp).toEqual('www2')
  expect(form.initialValues.cc.pp).toEqual('www2')
  expect(field2.value).toEqual('www2')
})

test('setSubmitting/setValidating', async () => {
  const form = attach(createForm())
  form.setSubmitting(true)
  expect(form.submitting).toBeFalsy()
  await sleep()
  expect(form.submitting).toBeTruthy()
  form.setSubmitting(false)
  expect(form.submitting).toBeFalsy()
  form.setValidating(true)
  expect(form.validating).toBeFalsy()
  await sleep()
  expect(form.validating).toBeTruthy()
  form.setValidating(false)
  expect(form.validating).toBeFalsy()
})

test('setEffects/removeEffects', () => {
  const form = attach(createForm())
  const valueChange = jest.fn()
  form.addEffects('e1', () => {
    onFieldValueChange('aa', valueChange)
  })
  const field = attach(
    form.createField({
      name: 'aa',
    })
  )
  field.setValue('123')
  expect(valueChange).toBeCalledTimes(1)
  form.removeEffects('e1')
  field.setValue('321')
  expect(valueChange).toBeCalledTimes(1)
  form.addEffects('e2', () => {
    onFieldValueChange('aa', valueChange)
  })
  field.setValue('444')
  expect(valueChange).toBeCalledTimes(2)
})

test('query', () => {})

test('queryFeedbacks', () => {})

test('notify/subscribe/unsubscribe', () => {})

test('setState/getState/setFormState/getFormState/setFieldState/getFieldState', () => {})

test('validate/valid/invalid/errors/warnings/successes/clearErrors/clearWarnings/clearSuccesses', () => {})

test('setPattern/pattern/editable/readOnly/disabled/readPretty', () => {})

test('submit', () => {})

test('reset', () => {})
