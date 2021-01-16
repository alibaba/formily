import { createForm } from '../'
import { onFieldValueChange } from '../effects'
import { attach } from './shared'
import { LifeCycleTypes } from '../types'

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

test('query', () => {
  const form = attach(createForm())
  attach(
    form.createObjectField({
      name: 'object',
    })
  )
  attach(
    form.createVoidField({
      name: 'void',
      basePath: 'object',
    })
  )
  attach(
    form.createField({
      name: 'normal',
      basePath: 'object.void',
    })
  )
  expect(form.query('object').get()).not.toBeUndefined()
  expect(form.query('object').object.get()).not.toBeUndefined()
  expect(form.query('object.void').void.get()).not.toBeUndefined()
  expect(form.query('object.void.normal').get()).not.toBeUndefined()
  expect(form.query('object.normal').get()).not.toBeUndefined()
  expect(
    form.query('object.*').all.getAll((field) => field.path.toString())
  ).toEqual(['object.void', 'object.normal'])
  expect(form.query('*').all.getAll((field) => field.path.toString())).toEqual([
    'object',
    'object.void',
    'object.normal',
  ])
})

test('notify/subscribe/unsubscribe', () => {
  const form = attach(createForm())
  const subscribe = jest.fn()
  form.subscribe(subscribe)
  expect(subscribe).toBeCalledTimes(0)
  form.setInitialValues({ aa: 123 })
  expect(subscribe).toBeCalledTimes(1)
  form.notify(LifeCycleTypes.ON_FORM_SUBMIT)
  expect(subscribe).toBeCalledTimes(2)
})

test('setState/getState/setFormState/getFormState/setFieldState/getFieldState', () => {
  const form = attach(createForm())
  const state = form.getState()
  form.setState((state) => {
    state.pattern = 'disabled'
    state.values = { aa: 123 }
  })
  expect(form.pattern).toEqual('disabled')
  expect(form.disabled).toBeTruthy()
  expect(form.values.aa).toEqual(123)
  form.setState(state)
  expect(form.pattern).toEqual('editable')
  expect(form.disabled).toBeFalsy()
  expect(form.values.aa).toBeUndefined()
  form.setFormState((state) => {
    state.pattern = 'readOnly'
    state.values = { bb: 321 }
  })
  expect(form.pattern).toEqual('readOnly')
  expect(form.disabled).toBeFalsy()
  expect(form.readOnly).toBeTruthy()
  expect(form.values.aa).toBeUndefined()
  expect(form.values.bb).toEqual(321)
  form.setFormState(state)
  expect(form.pattern).toEqual('editable')
  expect(form.disabled).toBeFalsy()
  expect(form.readOnly).toBeFalsy()
  expect(form.values.aa).toBeUndefined()
  expect(form.values.bb).toBeUndefined()
  attach(
    form.createField({
      name: 'aa',
    })
  )
  const fieldState = form.getFieldState('aa')
  form.setFieldState('aa', (state) => {
    state.title = 'AA'
    state.description = 'This is AA'
    state.value = '123'
  })
  expect(form.getFieldState('aa', (state) => state.title)).toEqual('AA')
  expect(form.getFieldState('aa', (state) => state.description)).toEqual(
    'This is AA'
  )
  expect(form.getFieldState('aa', (state) => state.value)).toEqual('123')
  form.setFieldState('aa', fieldState)
  expect(form.getFieldState('aa', (state) => state.title)).toBeUndefined()
  expect(form.getFieldState('aa', (state) => state.description)).toBeUndefined()
  expect(form.getFieldState('aa', (state) => state.value)).toBeUndefined()
})

test('validate/valid/invalid/errors/warnings/successes/clearErrors/clearWarnings/clearSuccesses/queryFeedbacks', async () => {
  const form = attach(createForm())
  const aa = attach(
    form.createField({
      name: 'aa',
      required: true,
      validator(value) {
        if (value == '123') {
          return {
            type: 'success',
            message: 'success',
          }
        } else if (value == '321') {
          return {
            type: 'warning',
            message: 'warning',
          }
        } else if (value == '111') {
          return 'error'
        }
      },
    })
  )
  const bb = attach(
    form.createField({
      name: 'bb',
      required: true,
    })
  )
  try {
    await form.validate()
  } catch {}
  expect(form.invalid).toBeTruthy()
  expect(form.valid).toBeFalsy()
  expect(form.errors).toEqual([
    {
      type: 'error',
      address: 'aa',
      path: 'aa',
      code: 'ValidateError',
      triggerType: 'onInput',
      messages: ['This field is required'],
    },
    {
      type: 'error',
      address: 'bb',
      path: 'bb',
      code: 'ValidateError',
      triggerType: 'onInput',
      messages: ['This field is required'],
    },
  ])
  await aa.onInput('123')
  expect(form.errors).toEqual([
    {
      type: 'error',
      address: 'bb',
      path: 'bb',
      code: 'ValidateError',
      triggerType: 'onInput',
      messages: ['This field is required'],
    },
  ])
  expect(form.successes).toEqual([
    {
      type: 'success',
      address: 'aa',
      path: 'aa',
      code: 'ValidateSuccess',
      triggerType: 'onInput',
      messages: ['success'],
    },
  ])
  await aa.onInput('321')
  expect(form.errors).toEqual([
    {
      type: 'error',
      address: 'bb',
      path: 'bb',
      code: 'ValidateError',
      triggerType: 'onInput',
      messages: ['This field is required'],
    },
  ])
  expect(form.warnings).toEqual([
    {
      type: 'warning',
      address: 'aa',
      path: 'aa',
      code: 'ValidateWarning',
      triggerType: 'onInput',
      messages: ['warning'],
    },
  ])
  await aa.onInput('111')
  expect(form.errors).toEqual([
    {
      type: 'error',
      address: 'aa',
      path: 'aa',
      code: 'ValidateError',
      triggerType: 'onInput',
      messages: ['error'],
    },
    {
      type: 'error',
      address: 'bb',
      path: 'bb',
      code: 'ValidateError',
      triggerType: 'onInput',
      messages: ['This field is required'],
    },
  ])
  await aa.onInput('yes')
  await bb.onInput('yes')
  await form.validate()
  expect(form.invalid).toBeFalsy()
  expect(form.valid).toBeTruthy()
  expect(form.errors).toEqual([])
  expect(form.successes).toEqual([])
  expect(form.warnings).toEqual([])
  await aa.onInput('')
  await bb.onInput('')
  try {
    await form.validate()
  } catch {}
  expect(form.errors).toEqual([
    {
      type: 'error',
      address: 'aa',
      path: 'aa',
      code: 'ValidateError',
      triggerType: 'onInput',
      messages: ['This field is required'],
    },
    {
      type: 'error',
      address: 'bb',
      path: 'bb',
      code: 'ValidateError',
      triggerType: 'onInput',
      messages: ['This field is required'],
    },
  ])
  form.clearErrors('aa')
  expect(form.errors).toEqual([
    {
      type: 'error',
      address: 'bb',
      path: 'bb',
      code: 'ValidateError',
      triggerType: 'onInput',
      messages: ['This field is required'],
    },
  ])
  form.clearErrors('*')
  expect(form.errors).toEqual([])
  await aa.onInput('123')
  expect(form.errors).toEqual([])
  expect(form.successes).toEqual([
    {
      type: 'success',
      address: 'aa',
      path: 'aa',
      code: 'ValidateSuccess',
      triggerType: 'onInput',
      messages: ['success'],
    },
  ])
  form.clearSuccesses('aa')
  expect(form.successes).toEqual([])
  await aa.onInput('321')
  expect(form.errors).toEqual([])
  expect(form.successes).toEqual([])
  expect(form.warnings).toEqual([
    {
      type: 'warning',
      address: 'aa',
      path: 'aa',
      code: 'ValidateWarning',
      triggerType: 'onInput',
      messages: ['warning'],
    },
  ])
  form.clearWarnings('*')
  expect(form.errors).toEqual([])
  expect(form.successes).toEqual([])
  expect(form.warnings).toEqual([])
  await aa.onInput('123')
  await bb.onInput('')
  expect(
    form.queryFeedbacks({
      type: 'error',
    }).length
  ).toEqual(1)
  expect(
    form.queryFeedbacks({
      type: 'success',
    }).length
  ).toEqual(1)
  expect(
    form.queryFeedbacks({
      code: 'ValidateError',
    }).length
  ).toEqual(1)
  expect(
    form.queryFeedbacks({
      code: 'ValidateSuccess',
    }).length
  ).toEqual(1)
  expect(
    form.queryFeedbacks({
      code: 'EffectError',
    }).length
  ).toEqual(0)
  expect(
    form.queryFeedbacks({
      code: 'EffectSuccess',
    }).length
  ).toEqual(0)
  expect(
    form.queryFeedbacks({
      path: 'aa',
    }).length
  ).toEqual(1)
  expect(
    form.queryFeedbacks({
      path: 'bb',
    }).length
  ).toEqual(1)
  expect(
    form.queryFeedbacks({
      address: 'aa',
    }).length
  ).toEqual(1)
  expect(
    form.queryFeedbacks({
      address: 'bb',
    }).length
  ).toEqual(1)
})

test('setPattern/pattern/editable/readOnly/disabled/readPretty', () => {})

test('setDisplay/display/visible/hidden', () => {})

test('submit', () => {})

test('reset', () => {})
