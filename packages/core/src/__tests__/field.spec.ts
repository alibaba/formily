import { autorun, batch, observable } from '@formily/reactive'
import { createForm, onFieldReact, isField } from '../'
import { DataField } from '../types'
import { attach, sleep } from './shared'

test('create field', () => {
  const form = attach(createForm())
  const field = attach(
    form.createField({
      name: 'normal',
    })
  )
  expect(field).not.toBeUndefined()
})

test('create field props', () => {
  const form = attach(createForm())
  const field1 = attach(
    form.createField({
      name: 'field1',
      title: 'Field 1',
      description: 'This is Field 1',
      required: true,
    })
  )
  expect(field1.title).toEqual('Field 1')
  expect(field1.description).toEqual('This is Field 1')
  expect(field1.required).toBeTruthy()
  expect(field1.validator).not.toBeUndefined()
  const field2 = attach(
    form.createField({
      name: 'field2',
      disabled: true,
      hidden: true,
    })
  )
  expect(field2.pattern).toEqual('disabled')
  expect(field2.disabled).toBeTruthy()
  expect(field2.display).toEqual('hidden')
  expect(field2.hidden).toBeTruthy()
  const field3 = attach(
    form.createField({
      name: 'field3',
      readOnly: true,
      visible: false,
    })
  )
  expect(field3.pattern).toEqual('readOnly')
  expect(field3.readOnly).toBeTruthy()
  expect(field3.display).toEqual('none')
  expect(field3.visible).toBeFalsy()
  const field4 = attach(
    form.createField({
      name: 'field4',
      value: 123,
    })
  )
  expect(field4.value).toEqual(123)
  expect(field4.initialValue).toBeUndefined()
  const field5 = attach(
    form.createField({
      name: 'field5',
      initialValue: 123,
    })
  )
  expect(field5.value).toEqual(123)
  expect(field5.initialValue).toEqual(123)
})

test('field display and value', () => {
  const form = attach(createForm())
  const objectField = attach(
    form.createObjectField({
      name: 'object',
    })
  )
  const arrayField = attach(
    form.createArrayField({
      name: 'array',
    })
  )
  const valueField = attach(
    form.createField({
      name: 'value',
    })
  )
  expect(objectField.value).toEqual({})
  expect(arrayField.value).toEqual([])
  expect(valueField.value).toBeUndefined()

  objectField.hidden = true
  arrayField.hidden = true
  valueField.hidden = true
  expect(objectField.value).toEqual({})
  expect(arrayField.value).toEqual([])
  expect(valueField.value).toBeUndefined()

  objectField.hidden = false
  arrayField.hidden = false
  valueField.hidden = false
  expect(objectField.value).toEqual({})
  expect(arrayField.value).toEqual([])
  expect(valueField.value).toBeUndefined()

  objectField.visible = false
  arrayField.visible = false
  valueField.visible = false
  expect(objectField.value).toBeUndefined()
  expect(arrayField.value).toBeUndefined()
  expect(valueField.value).toBeUndefined()

  objectField.visible = true
  arrayField.visible = true
  valueField.visible = true
  expect(objectField.value).toEqual({})
  expect(arrayField.value).toEqual([])
  expect(valueField.value).toBeUndefined()

  objectField.value = { value: '123' }
  arrayField.value = ['123']
  valueField.value = '123'
  expect(objectField.value).toEqual({ value: '123' })
  expect(arrayField.value).toEqual(['123'])
  expect(valueField.value).toEqual('123')

  objectField.hidden = true
  arrayField.hidden = true
  valueField.hidden = true
  expect(objectField.value).toEqual({ value: '123' })
  expect(arrayField.value).toEqual(['123'])
  expect(valueField.value).toEqual('123')

  objectField.hidden = false
  arrayField.hidden = false
  valueField.hidden = false
  expect(objectField.value).toEqual({ value: '123' })
  expect(arrayField.value).toEqual(['123'])
  expect(valueField.value).toEqual('123')

  objectField.visible = false
  arrayField.visible = false
  valueField.visible = false
  expect(objectField.value).toBeUndefined()
  expect(arrayField.value).toBeUndefined()
  expect(valueField.value).toBeUndefined()

  objectField.visible = true
  arrayField.visible = true
  valueField.visible = true
  expect(objectField.value).toEqual({ value: '123' })
  expect(arrayField.value).toEqual(['123'])
  expect(valueField.value).toEqual('123')
})

test('nested display/pattern', () => {
  const form = attach(createForm())
  const object_ = attach(
    form.createObjectField({
      name: 'object',
    })
  )
  const void_ = attach(
    form.createVoidField({
      name: 'void',
      basePath: 'object',
    })
  )
  const aaa = attach(
    form.createField({
      name: 'aaa',
      basePath: 'object.void',
    })
  )
  const bbb = attach(
    form.createField({
      name: 'bbb',
      basePath: 'object',
    })
  )
  const ddd = attach(
    form.createField({
      name: 'ddd',
    })
  )
  expect(ddd.visible).toBeTruthy()
  expect(ddd.editable).toBeTruthy()
  object_.setPattern('readPretty')
  expect(void_.pattern).toEqual('readPretty')
  expect(aaa.pattern).toEqual('readPretty')
  expect(bbb.pattern).toEqual('readPretty')
  object_.setPattern('readOnly')
  expect(void_.pattern).toEqual('readOnly')
  expect(aaa.pattern).toEqual('readOnly')
  expect(bbb.pattern).toEqual('readOnly')
  object_.setPattern('disabled')
  expect(void_.pattern).toEqual('disabled')
  expect(aaa.pattern).toEqual('disabled')
  expect(bbb.pattern).toEqual('disabled')
  object_.setPattern()
  expect(void_.pattern).toEqual('editable')
  expect(aaa.pattern).toEqual('editable')
  expect(bbb.pattern).toEqual('editable')

  object_.setDisplay('hidden')
  expect(void_.display).toEqual('hidden')
  expect(aaa.display).toEqual('hidden')
  expect(bbb.display).toEqual('hidden')
  object_.setDisplay('none')
  expect(void_.display).toEqual('none')
  expect(aaa.display).toEqual('none')
  expect(bbb.display).toEqual('none')
  object_.setDisplay()
  expect(void_.display).toEqual('visible')
  expect(aaa.display).toEqual('visible')
  expect(bbb.display).toEqual('visible')

  aaa.setValue('123')
  expect(aaa.value).toEqual('123')
  aaa.setDisplay('none')
  expect(aaa.value).toBeUndefined()
  aaa.setDisplay('visible')
  expect(aaa.value).toEqual('123')
  aaa.setValue('123')
  object_.setDisplay('none')
  expect(aaa.value).toBeUndefined()
  object_.setDisplay('visible')
  expect(aaa.value).toEqual('123')
})

test('setValue/setInitialValue', () => {
  const form = attach(createForm())
  const aaa = attach(
    form.createField({
      name: 'aaa',
    })
  )
  const bbb = attach(
    form.createField({
      name: 'bbb',
    })
  )
  aaa.setValue('123')
  expect(aaa.value).toEqual('123')
  expect(form.values.aaa).toEqual('123')
  bbb.setValue('123')
  expect(bbb.value).toEqual('123')
  expect(form.values.bbb).toEqual('123')
  const ccc = attach(
    form.createField({
      name: 'ccc',
    })
  )
  const ddd = attach(
    form.createField({
      name: 'ddd',
    })
  )
  ccc.setInitialValue('123')
  expect(ccc.value).toEqual('123')
  expect(ccc.initialValue).toEqual('123')
  expect(form.values.ccc).toEqual('123')
  ddd.setInitialValue('123')
  expect(ddd.value).toEqual('123')
  expect(ddd.initialValue).toEqual('123')
  expect(form.values.ddd).toEqual('123')
  ccc.setInitialValue('222')
  expect(ccc.value).toEqual('222')
  expect(ccc.initialValue).toEqual('222')
  expect(form.values.ccc).toEqual('222')
  ddd.setInitialValue('222')
  expect(ddd.value).toEqual('222')
  expect(ddd.initialValue).toEqual('222')
  expect(form.values.ddd).toEqual('222')
})

test('setLoading/setValidating', async () => {
  const form = attach(createForm())
  const field = attach(
    form.createField({
      name: 'aa',
    })
  )
  field.setLoading(true)
  expect(field.loading).toBeFalsy()
  await sleep()
  expect(field.loading).toBeTruthy()
  field.setLoading(false)
  field.setLoading(false)
  expect(field.loading).toBeFalsy()
  field.setValidating(true)
  expect(field.validating).toBeFalsy()
  await sleep()
  expect(field.validating).toBeTruthy()
  field.setValidating(false)
  expect(field.validating).toBeFalsy()
})

test('setComponent/setComponentProps', () => {
  const component = () => null
  const form = attach(createForm())
  const field = attach(
    form.createField({
      name: 'aa',
    })
  )

  field.setComponent(undefined, { props: 123 })
  field.setComponent(component)
  expect(field.component[0]).toEqual(component)
  expect(field.component[1]).toEqual({ props: 123 })
  field.setComponentProps({
    hello: 'world',
  })
  expect(field.component[1]).toEqual({ props: 123, hello: 'world' })
})

test('setDecorator/setDecoratorProps', () => {
  const component = () => null
  const form = attach(createForm())
  const field = attach(
    form.createField({
      name: 'aa',
    })
  )
  field.setDecorator(undefined, { props: 123 })
  field.setDecorator(component)
  expect(field.decorator[0]).toEqual(component)
  expect(field.decorator[1]).toEqual({ props: 123 })
  field.setDecoratorProps({
    hello: 'world',
  })
  expect(field.decorator[1]).toEqual({ props: 123, hello: 'world' })
})

test('reaction initialValue', () => {
  const form = attach(
    createForm({
      values: {
        aa: 123,
      },
    })
  )
  const aa = attach(
    form.createField({
      name: 'aa',
      reactions(field) {
        field.initialValue = 321
      },
    })
  )
  const bb = attach(
    form.createField({
      name: 'bb',
      value: 123,
      reactions(field) {
        field.initialValue = 321
      },
    })
  )
  expect(aa.value).toEqual(123)
  expect(bb.value).toEqual(123)
})

test('selfValidate/errors/warnings/successes/valid/invalid/validateStatus/queryFeedbacks', async () => {
  const form = attach(createForm())
  const field = attach(
    form.createField({
      name: 'aa',
      required: true,
      validateFirst: true,
      validator: [
        (value) => {
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
        {
          triggerType: 'onBlur',
          format: 'url',
        },
        {
          triggerType: 'onFocus',
          format: 'date',
        },
      ],
    })
  )
  const field2 = attach(
    form.createField({
      name: 'bb',
      required: true,
      value: '111',
      validator: [
        (value) => {
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
        {
          triggerType: 'onBlur',
          format: 'url',
        },
        {
          triggerType: 'onFocus',
          format: 'date',
        },
      ],
    })
  )
  const field3 = attach(
    form.createField({
      name: 'xxx',
    })
  )
  const field4 = attach(
    form.createField({
      name: 'ppp',
      required: true,
    })
  )
  try {
    await field.validate()
  } catch {}
  try {
    await field2.validate()
  } catch {}
  expect(field.invalid).toBeTruthy()
  expect(field.selfErrors.length).toEqual(1)
  expect(field2.invalid).toBeTruthy()
  expect(field2.selfErrors.length).toEqual(3)
  await field.onInput('123')
  expect(field.selfSuccesses).toEqual(['success'])
  await field.onInput('321')
  expect(field.selfWarnings).toEqual(['warning'])
  await field.onInput('111')
  expect(field.selfErrors).toEqual(['error'])
  await field.onBlur()
  expect(field.selfErrors).toEqual([
    'error',
    'The field value is a invalid url',
  ])
  await field.onFocus()
  expect(field.selfErrors).toEqual([
    'error',
    'The field value is a invalid url',
    'The field value is not a valid date format',
  ])
  field.setFeedback()
  expect(field.selfErrors).toEqual([
    'error',
    'The field value is a invalid url',
    'The field value is not a valid date format',
  ])
  expect(field3.feedbacks).toEqual([])
  field3.setFeedback()
  field3.setFeedback({ messages: null })
  field3.setFeedback({ messages: ['error'], code: 'EffectError' })
  field3.setFeedback({ messages: ['error2'], code: 'EffectError' })
  expect(field3.feedbacks).toEqual([
    { code: 'EffectError', messages: ['error2'] },
  ])
  expect(
    field3.queryFeedbacks({
      address: 'xxx',
    })
  ).toEqual([{ code: 'EffectError', messages: ['error2'] }])
  expect(
    field3.queryFeedbacks({
      address: 'yyy',
    })
  ).toEqual([])
  expect(
    field3.queryFeedbacks({
      path: 'yyy',
    })
  ).toEqual([])
  field3.setFeedback({ messages: null, code: 'EffectError' })
  field3.setFeedback({ messages: [], code: 'EffectError' })
  field4.setDisplay('none')
  await field4.validate()
  expect(field4.selfErrors).toEqual([])
})

test('setValidateRule', () => {
  const form = attach(createForm())
  const field1 = attach(
    form.createField({
      name: 'aa',
      validator: [{ required: true }],
    })
  )
  const field2 = attach(
    form.createField({
      name: 'bb',
      validator: 'phone',
    })
  )
  const field3 = attach(
    form.createField({
      name: 'cc',
      validator: 'phone',
    })
  )
  const field4 = attach(
    form.createField({
      name: 'dd',
      validator: { format: 'phone' },
    })
  )
  const field5 = attach(
    form.createField({
      name: 'ee',
      validator: [{ format: 'phone' }],
    })
  )
  const field6 = attach(
    form.createField({
      name: 'ff',
    })
  )
  field1.setValidatorRule('format', 'phone')
  field2.setValidatorRule('max', 3)
  field3.setValidatorRule('format', 'url')
  field4.setValidatorRule('min', 3)
  field5.setValidatorRule('min', 3)
  field6.setValidatorRule('min', 3)
  expect(field1.validator).toEqual([{ required: true }, { format: 'phone' }])
  expect(field2.validator).toEqual([{ format: 'phone' }, { max: 3 }])
  expect(field3.validator).toEqual([{ format: 'url' }])
  expect(field4.validator).toEqual([{ format: 'phone' }, { min: 3 }])
  expect(field5.validator).toEqual([{ format: 'phone' }, { min: 3 }])
  expect(field6.validator).toEqual([{ min: 3 }])
})

test('query', () => {
  const form = attach(createForm())
  const object_ = attach(
    form.createObjectField({
      name: 'object',
    })
  )
  const void_ = attach(
    form.createVoidField({
      name: 'void',
      basePath: 'object',
    })
  )
  const aaa = attach(
    form.createField({
      name: 'aaa',
      basePath: 'object.void',
    })
  )
  const bbb = attach(
    form.createField({
      name: 'bbb',
      basePath: 'object',
    })
  )
  expect(object_.query('object.void').take()).not.toBeUndefined()
  expect(object_.query('object.void.aaa').take()).not.toBeUndefined()
  expect(void_.query('.')).not.toBeUndefined()
  expect(void_.query('.bbb').take()).not.toBeUndefined()
  expect(aaa.query('.ccc').take()).toBeUndefined()
  expect(aaa.query('..').take()).not.toBeUndefined()
  expect(aaa.query('..bbb').take()).not.toBeUndefined()
  expect(bbb.query('.void').take()).not.toBeUndefined()
  expect(bbb.query('.void.aaa').take()).not.toBeUndefined()
  expect(bbb.query('.void.ccc').take()).toBeUndefined()
})

test('empty initialValue', () => {
  const form = attach(createForm())
  const aa = attach(
    form.createField({
      name: 'aa',
      initialValue: '',
    })
  )
  const bb = attach(
    form.createField({
      name: 'bb',
    })
  )
  expect(aa.value).toEqual('')
  expect(form.values.aa).toEqual('')
  expect(bb.value).toEqual(undefined)
  expect(form.values.bb).toEqual(undefined)
})

test('objectFieldWithInitialValue', async () => {
  const form = attach(
    createForm({
      initialValues: {
        obj: {
          a: 'a',
        },
      },
    })
  )
  attach(
    form.createObjectField({
      name: 'obj',
    })
  )
  const fieldObjA = attach(
    form.createField({
      name: 'obj.a',
    })
  )

  expect(fieldObjA.initialValue).toEqual('a')
  fieldObjA.value = 'aa'
  expect(fieldObjA.value).toEqual('aa')
  expect(fieldObjA.initialValue).toEqual('a')
})

test('initialValueWithArray', () => {
  const form = attach(createForm())
  const field = attach(
    form.createArrayField({
      name: 'aaa',
      initialValue: [1, 2],
    })
  )
  expect(field.initialValue).toEqual([1, 2])
  expect(field.value).toEqual([1, 2])
  expect(form.initialValues.aaa).toEqual([1, 2])
  expect(form.values.aaa).toEqual([1, 2])
})

test('resetObjectFieldWithInitialValue', async () => {
  const form = attach(createForm())
  attach(
    form.createObjectField({
      name: 'obj',
    })
  )
  const fieldObjA = attach(
    form.createField({
      name: 'obj.a',
      initialValue: 'a',
    })
  )

  fieldObjA.value = 'aa'
  expect(fieldObjA.value).toEqual('aa')
  await form.reset()
  expect(fieldObjA.value).toEqual('a')

  fieldObjA.value = 'aa'
  expect(fieldObjA.value).toEqual('aa')
  await form.reset()
  expect(fieldObjA.initialValue).toEqual('a')
  expect(fieldObjA.value).toEqual('a')
})

test('reset', async () => {
  const form = attach(
    createForm<any>({
      values: {
        bb: 123,
      },
      initialValues: {
        aa: 123,
        cc: null,
      },
    })
  )
  const aa = attach(
    form.createField({
      name: 'aa',
      required: true,
    })
  )
  const bb = attach(
    form.createField({
      name: 'bb',
      required: true,
    })
  )
  const cc = attach(
    form.createField({
      name: 'cc',
      required: true,
    })
  )
  const dd = attach(
    form.createField({
      name: 'dd',
      required: true,
    })
  )
  expect(aa.value).toEqual(123)
  expect(bb.value).toEqual(123)
  expect(cc.value).toEqual(null)
  expect(form.values.aa).toEqual(123)
  expect(form.values.bb).toEqual(123)
  expect(form.values.cc).toEqual(null)
  aa.onInput('xxxxx')
  expect(form.values.aa).toEqual('xxxxx')
  dd.onInput(null)
  expect(form.values.dd).toEqual(null)
  aa.reset()
  expect(aa.value).toEqual(123)
  expect(form.values.aa).toEqual(123)
  bb.onInput('xxxxx')
  expect(form.values.bb).toEqual('xxxxx')
  bb.reset()
  expect(bb.value).toBeUndefined()
  expect(form.values.bb).toBeUndefined()

  cc.onInput('xxxxx')
  expect(form.values.cc).toEqual('xxxxx')
  cc.reset()
  expect(cc.value).toBeNull()
  expect(form.values.cc).toBeNull()
  dd.reset()
  expect(dd.value).toBeUndefined()
  expect(form.values.dd).toBeUndefined()

  aa.reset({
    forceClear: true,
  })
  expect(aa.value).toBeUndefined()
  expect(form.values.aa).toBeUndefined()
  cc.reset({
    forceClear: true,
  })
  expect(cc.value).toBeUndefined()
  expect(form.values.cc).toBeUndefined()

  expect(aa.valid).toBeTruthy()
  await aa.reset({
    forceClear: true,
    validate: true,
  })
  expect(aa.valid).toBeFalsy()

  expect(cc.valid).toBeTruthy()
  await cc.reset({
    forceClear: true,
    validate: true,
  })
  expect(cc.valid).toBeFalsy()
})

test('match', () => {
  const form = attach(
    createForm<any>({
      values: {
        bb: 123,
      },
      initialValues: {
        aa: 123,
      },
    })
  )
  const aa = attach(
    form.createField({
      name: 'aa',
      required: true,
    })
  )
  expect(aa.match('aa')).toBeTruthy()
  expect(aa.match('*')).toBeTruthy()
  expect(aa.match('a~')).toBeTruthy()
  expect(aa.match('*(aa,bb)')).toBeTruthy()
})

test('setState/getState', () => {
  const form = attach(createForm())
  const aa = attach(
    form.createField({
      name: 'aa',
      required: true,
    })
  )
  const state = aa.getState()
  aa.setState((state) => {
    state.value = '123'
    state.title = 'AAA'
  })
  expect(aa.value).toEqual('123')
  expect(aa.title).toEqual('AAA')
  state['setState'] = () => {}
  aa.setState(state)
  expect(aa.value).toBeUndefined()
  expect(aa.title).toBeUndefined()
  aa.setState((state) => {
    state.hidden = false
  })
  expect(aa.display).toEqual('visible')
  aa.setState((state) => {
    state.visible = true
  })
  expect(aa.display).toEqual('visible')
  aa.setState((state) => {
    state.readOnly = false
  })
  expect(aa.pattern).toEqual('editable')
  aa.setState((state) => {
    state.disabled = false
  })
  expect(aa.pattern).toEqual('editable')
  aa.setState((state) => {
    state.editable = true
  })
  expect(aa.pattern).toEqual('editable')
  aa.setState((state) => {
    state.editable = false
  })
  expect(aa.pattern).toEqual('readPretty')
  aa.setState((state) => {
    state.readPretty = true
  })
  expect(aa.pattern).toEqual('readPretty')
  aa.setState((state) => {
    state.readPretty = false
  })
  expect(aa.pattern).toEqual('editable')
  form.setFieldState('bb', (state) => {
    state.value = 'bbb'
  })
  form.setFieldState('bb', (state) => {
    state.visible = false
  })
  const bb = attach(
    form.createField({
      name: 'bb',
    })
  )
  expect(bb.value).toEqual(undefined)
  expect(bb.visible).toBeFalsy()
  form.setFieldState('*', (state) => {
    state.value = '123'
  })
  const cc = attach(
    form.createField({
      name: 'cc',
    })
  )
  expect(aa.value).toEqual('123')
  expect(bb.value).toEqual('123')
  expect(cc.value).toEqual('123')
  form.setFieldState(form.query('cc'), (state) => {
    state.value = 'ccc'
  })
  expect(cc.value).toEqual('ccc')
  form.setFieldState(cc, (state) => {
    state.value = '123'
  })
  expect(cc.value).toEqual('123')
  expect(form.getFieldState(aa)).not.toBeUndefined()
  expect(form.getFieldState(form.query('aa'))).not.toBeUndefined()
})

test('setDataSource', () => {
  const form = attach(createForm())
  const aa = attach(
    form.createField({
      name: 'aa',
      required: true,
    })
  )
  aa.setDataSource([
    { label: 's1', value: 's1' },
    { label: 's2', value: 's2' },
  ])
  expect(aa.dataSource).toEqual([
    { label: 's1', value: 's1' },
    { label: 's2', value: 's2' },
  ])
})

test('setTitle/setDescription', () => {
  const form = attach(createForm())
  const aa = attach(
    form.createField({
      name: 'aa',
      required: true,
    })
  )
  aa.setTitle('AAA')
  aa.setDescription('This is AAA')
  expect(aa.title).toEqual('AAA')
  expect(aa.description).toEqual('This is AAA')
})

test('required/setRequired', () => {
  const form = attach(createForm())
  const aa = attach(
    form.createField({
      name: 'aa',
    })
  )
  aa.setRequired(true)
  expect(aa.required).toBeTruthy()
  aa.setRequired(false)
  expect(aa.required).toBeFalsy()
  const bb = attach(
    form.createField({
      name: 'bb',
      validator: {
        max: 3,
        required: true,
      },
    })
  )
  expect(bb.required).toBeTruthy()
  bb.setRequired(false)
  expect(bb.required).toBeFalsy()
  const cc = attach(
    form.createField({
      name: 'cc',
      validator: [
        'date',
        {
          max: 3,
        },
        {
          required: true,
        },
      ],
    })
  )
  expect(cc.required).toBeTruthy()
  cc.setRequired(false)
  expect(cc.required).toBeFalsy()
  const dd = attach(
    form.createField({
      name: 'dd',
      validator: {
        max: 3,
      },
    })
  )
  expect(dd.required).toBeFalsy()
  dd.setRequired(true)
  expect(dd.required).toBeTruthy()
})

test('setData/setContent', () => {
  const form = attach(createForm())
  const aa = attach(
    form.createField({
      name: 'aa',
      required: true,
    })
  )
  aa.setData('This is data')
  aa.setContent('This is Content')
  expect(aa.data).toEqual('This is data')
  expect(aa.content).toEqual('This is Content')
})

test('setData/setContent in void field', () => {
  const form = attach(createForm())
  const voidFeild = attach(
    form.createVoidField({
      name: 'voidFeild',
    })
  )
  voidFeild.setData('This is data')
  voidFeild.setContent('This is Content')
  expect(voidFeild.data).toEqual('This is data')
  expect(voidFeild.content).toEqual('This is Content')
})

test('setErrors/setWarnings/setSuccesses/setValidator', async () => {
  const form = attach(createForm())
  const aa = attach(
    form.createField({
      name: 'aa',
    })
  )
  const bb = attach(
    form.createField({
      name: 'bb',
    })
  )
  const cc = attach(
    form.createField({
      name: 'cc',
    })
  )
  const dd = attach(
    form.createField({
      name: 'dd',
      validator() {
        return new Promise(() => {})
      },
    })
  )
  aa.setSelfErrors(['error'])
  aa.setSelfWarnings(['warning'])
  aa.setSelfSuccesses(['success'])
  bb.setSelfSuccesses(['success'])
  cc.setSelfWarnings(['warning'])
  expect(aa.selfErrors).toEqual(['error'])
  expect(aa.valid).toBeFalsy()
  expect(aa.selfWarnings).toEqual(['warning'])
  expect(aa.selfSuccesses).toEqual(['success'])
  expect(bb.validateStatus).toEqual('success')
  expect(cc.validateStatus).toEqual('warning')
  aa.setValidator('date')
  await aa.onInput('123')
  expect(aa.selfErrors.length).toEqual(2)
  dd.onInput('123')
  await sleep()
  expect(dd.validateStatus).toEqual('validating')
})

test('reactions', async () => {
  const form = attach(createForm())
  const aa = attach(
    form.createField({
      name: 'aa',
    })
  )
  const bb = attach(
    form.createField({
      name: 'bb',
      reactions: [
        (field) => {
          const aa = field.query('aa')
          if (aa.get('value') === '123') {
            field.visible = false
          } else {
            field.visible = true
          }
          if (aa.get('inputValue') === '333') {
            field.editable = false
          } else if (aa.get('inputValue') === '444') {
            field.editable = true
          }
          if (aa.get('initialValue') === '555') {
            field.readOnly = true
          } else if (aa.get('initialValue') === '666') {
            field.readOnly = false
          }
        },
        null,
      ],
    })
  )
  expect(bb.visible).toBeTruthy()
  aa.setValue('123')
  expect(bb.visible).toBeFalsy()
  await aa.onInput('333')
  expect(bb.editable).toBeFalsy()
  await aa.onInput('444')
  expect(bb.editable).toBeTruthy()
  aa.setInitialValue('555')
  expect(bb.readOnly).toBeTruthy()
  aa.setInitialValue('666')
  expect(bb.readOnly).toBeFalsy()
  form.onUnmount()
})

test('fault tolerance', () => {
  const form = attach(createForm())
  const field = attach(
    form.createField({
      name: 'aa',
      value: 123,
    })
  )
  field.setDisplay('none')
  expect(field.value).toBeUndefined()
  field.setDisplay('visible')
  expect(field.value).toEqual(123)
  field.setDisplay('none')
  expect(field.value).toBeUndefined()
  field.setValue(321)
  expect(field.value).toEqual(321)
  field.setDisplay('visible')
  expect(field.value).toEqual(321)
  form.setDisplay(null)
  form.setPattern(null)
  const field2 = attach(
    form.createField({
      name: 'xxx',
    })
  )
  expect(field2.display).toEqual('visible')
  expect(field2.pattern).toEqual('editable')
})

test('initialValue', () => {
  const form = attach(createForm())
  const field = attach(
    form.createField({
      name: 'aaa',
      initialValue: 123,
    })
  )
  expect(form.values.aaa).toEqual(123)
  expect(form.initialValues.aaa).toEqual(123)
  expect(field.value).toEqual(123)
  expect(field.initialValue).toEqual(123)
})

test('array path calculation with none index', async () => {
  const form = attach(createForm())
  const array = attach(
    form.createArrayField({
      name: 'array',
    })
  )
  await array.push({})
  const input = attach(
    form.createField({
      name: '0.input',
      basePath: 'array',
    })
  )
  expect(input.path.toString()).toEqual('array.0.input')
})

test('array path calculation with none index and void nested', async () => {
  const form = attach(createForm())
  const array = attach(
    form.createArrayField({
      name: 'array',
    })
  )
  await array.push({})
  attach(
    form.createVoidField({
      name: '0.column',
      basePath: 'array',
    })
  )
  const input = attach(
    form.createField({
      name: 'input',
      basePath: 'array.0.column',
    })
  )
  expect(input.path.toString()).toEqual('array.0.input')
})

test('array path calculation with object index', async () => {
  const form = attach(createForm())
  const array = attach(
    form.createArrayField({
      name: 'array',
    })
  )
  await array.push({})
  attach(
    form.createObjectField({
      name: '0',
      basePath: 'array',
    })
  )
  const input = attach(
    form.createField({
      name: 'input',
      basePath: 'array.0',
    })
  )
  expect(input.path.toString()).toEqual('array.0.input')
})

test('array path calculation with void index', async () => {
  const form = attach(createForm())
  const array = attach(
    form.createArrayField({
      name: 'array',
    })
  )
  await array.push('')
  attach(
    form.createVoidField({
      name: '0',
      basePath: 'array',
    })
  )
  const input = attach(
    form.createField({
      name: 'input',
      basePath: 'array.0',
    })
  )
  expect(input.path.toString()).toEqual('array.0')
})

test('array path calculation with void index and void wrapper', async () => {
  const form = attach(createForm())
  attach(
    form.createVoidField({
      name: 'layout',
    })
  )
  const array_in_layout = attach(
    form.createArrayField({
      name: 'array_in_layout',
      basePath: 'layout',
    })
  )
  await array_in_layout.push('')
  attach(
    form.createVoidField({
      name: '0',
      basePath: 'layout.array_in_layout',
    })
  )
  const input = attach(
    form.createField({
      name: 'input',
      basePath: 'layout.array_in_layout.0',
    })
  )
  expect(input.path.toString()).toEqual('array_in_layout.0')
})

test('reaction in reaction', () => {
  const form = attach(createForm())
  const void_ = attach(
    form.createVoidField({
      name: 'void',
    })
  )
  attach(
    form.createField({
      name: 'field1',
      basePath: 'void',
      initialValue: 123,
    })
  )
  const field2 = attach(
    form.createField({
      name: 'field2',
      basePath: 'void',
      initialValue: 456,
      reactions: (field) => {
        const f1 = field.query('field1')
        if (f1.get('value') === 123) {
          field.display = 'visible'
        } else {
          field.display = 'none'
        }
      },
    })
  )
  void_.setDisplay('none')
  expect(field2.value).toEqual(undefined)
  expect(field2.display).toEqual('none')
})

test('nested fields hidden and selfValidate', async () => {
  const form = attach(createForm())
  const parent = attach(
    form.createVoidField({
      name: 'parent',
    })
  )
  attach(
    form.createField({
      name: 'aa',
      basePath: 'parent',
      required: true,
    })
  )
  attach(
    form.createField({
      name: 'bb',
      basePath: 'parent',
      required: true,
    })
  )
  try {
    await form.validate()
  } catch {}
  expect(form.invalid).toBeTruthy()
  parent.display = 'hidden'
  await form.validate()
  expect(form.invalid).toBeFalsy()
})

test('deep nested fields hidden and selfValidate', async () => {
  const form = attach(createForm())
  const parent1 = attach(
    form.createVoidField({
      name: 'parent1',
    })
  )
  const parent2 = attach(
    form.createVoidField({
      name: 'parent2',
      basePath: 'parent1',
    })
  )
  const aa = attach(
    form.createField({
      name: 'aa',
      basePath: 'parent1.parent2',
      required: true,
    })
  )
  const bb = attach(
    form.createField({
      name: 'bb',
      basePath: 'parent1.parent2',
      required: true,
    })
  )
  try {
    await form.validate()
  } catch {}
  expect(form.invalid).toBeTruthy()
  parent2.display = 'visible'
  parent1.display = 'hidden'
  expect(parent2.display).toEqual('hidden')
  expect(aa.display).toEqual('hidden')
  expect(bb.display).toEqual('hidden')
  await form.validate()
  expect(form.invalid).toBeFalsy()
})

test('deep nested fields hidden and selfValidate with middle hidden', async () => {
  const form = attach(createForm())
  const parent1 = attach(
    form.createVoidField({
      name: 'parent1',
    })
  )
  const parent2 = attach(
    form.createVoidField({
      name: 'parent2',
      basePath: 'parent1',
    })
  )
  const aa = attach(
    form.createField({
      name: 'aa',
      basePath: 'parent1.parent2',
      required: true,
    })
  )
  const bb = attach(
    form.createField({
      name: 'bb',
      basePath: 'parent1.parent2',
      required: true,
    })
  )
  try {
    await form.validate()
  } catch {}
  expect(form.invalid).toBeTruthy()
  parent2.display = 'hidden'
  parent1.display = 'none'
  expect(parent2.display).toEqual('hidden')
  expect(aa.display).toEqual('hidden')
  expect(bb.display).toEqual('hidden')
  await form.validate()
  expect(form.invalid).toBeFalsy()
})

test('fields unmount and selfValidate', async () => {
  const form = attach(createForm())
  const field = attach(
    form.createField({
      name: 'parent',
      required: true,
    })
  )
  try {
    await form.validate()
  } catch {}
  expect(form.invalid).toBeTruthy()
  field.onUnmount()
  try {
    await form.validate()
  } catch {}
  expect(form.invalid).toBeTruthy()
  form.clearFormGraph('parent')
  await form.validate()
  expect(form.invalid).toBeFalsy()
})

test('auto clean with ArrayField', () => {
  const form = attach(createForm())
  attach(
    form.createArrayField({
      name: 'array',
      initialValue: [{}, {}],
    })
  )
  attach(
    form.createField({
      name: '0.aa',
      basePath: 'array',
    })
  )
  attach(
    form.createField({
      name: '1.aa',
      basePath: 'array',
    })
  )
  const array1 = attach(
    form.createArrayField({
      name: 'array1',
      initialValue: [{}, {}],
    })
  )
  attach(
    form.createField({
      name: '0.aa',
      basePath: 'array1',
    })
  )
  attach(
    form.createField({
      name: '1.aa',
      basePath: 'array1',
    })
  )
  const array2 = attach(
    form.createArrayField({
      name: 'array2',
      initialValue: [{}, {}],
    })
  )
  attach(
    form.createField({
      name: '0.aa',
      basePath: 'array2',
    })
  )
  attach(
    form.createField({
      name: '1.aa',
      basePath: 'array2',
    })
  )
  expect(form.fields['array.1.aa']).not.toBeUndefined()
  expect(form.values.array).toEqual([{}, {}])
  form.setValues(
    {
      array: [{}],
    },
    'shallowMerge'
  )
  expect(form.values.array).toEqual([{}])
  expect(form.fields['array.1.aa']).toBeUndefined()
  expect(form.fields['array1.0.aa']).not.toBeUndefined()
  expect(form.fields['array1.1.aa']).not.toBeUndefined()
  expect(form.values.array1).toEqual([{}, {}])
  array1.setValue([])
  expect(form.fields['array1.0.aa']).toBeUndefined()
  expect(form.fields['array1.1.aa']).toBeUndefined()
  expect(form.fields['array2.0.aa']).not.toBeUndefined()
  expect(form.fields['array2.1.aa']).not.toBeUndefined()
  array2.setValue([])
  expect(form.fields['array2.0.aa']).toBeUndefined()
  expect(form.fields['array2.1.aa']).toBeUndefined()
})

test('auto clean with ObjectField', () => {
  const form = attach(createForm())
  attach(
    form.createObjectField({
      name: 'obj',
      initialValue: {
        aa: 'aa',
        bb: 'bb',
      },
    })
  )
  attach(
    form.createField({
      name: 'aa',
      basePath: 'obj',
    })
  )
  attach(
    form.createField({
      name: 'bb',
      basePath: 'obj',
    })
  )
  const obj1 = attach(
    form.createObjectField({
      name: 'obj1',
      initialValue: {
        aa: 'aa',
        bb: 'bb',
      },
    })
  )
  attach(
    form.createField({
      name: 'aa',
      basePath: 'obj1',
    })
  )
  attach(
    form.createField({
      name: 'bb',
      basePath: 'obj1',
    })
  )
  const obj2 = attach(
    form.createObjectField({
      name: 'obj2',
      initialValue: {
        aa: 'aa',
        bb: 'bb',
      },
    })
  )
  attach(
    form.createField({
      name: 'aa',
      basePath: 'obj2',
    })
  )
  attach(
    form.createField({
      name: 'bb',
      basePath: 'obj2',
    })
  )
  expect(form.fields['obj.aa']).not.toBeUndefined()
  expect(form.fields['obj.bb']).not.toBeUndefined()
  expect(form.values.obj).toEqual({ aa: 'aa', bb: 'bb' })
  form.setValues(
    {
      obj: {
        aa: '123',
      },
    },
    'shallowMerge'
  )
  expect(form.values.obj).toEqual({ aa: '123' })
  expect(form.fields['obj.aa']).not.toBeUndefined()
  expect(form.fields['obj.bb']).not.toBeUndefined()
  expect(form.fields['obj1.aa']).not.toBeUndefined()
  expect(form.fields['obj1.bb']).not.toBeUndefined()
  expect(form.values.obj1).toEqual({ aa: 'aa', bb: 'bb' })
  obj1.setValue({})
  expect(form.values.obj1).toEqual({})
  expect(form.fields['obj1.aa']).not.toBeUndefined()
  expect(form.fields['obj1.bb']).not.toBeUndefined()
  expect(form.fields['obj2.aa']).not.toBeUndefined()
  expect(form.fields['obj2.bb']).not.toBeUndefined()
  expect(form.values.obj2).toEqual({ aa: 'aa', bb: 'bb' })
  obj2.setValue({ aa: 'aa', bb: 'bb', cc: 'cc' })
  expect(form.fields['obj2.aa']).not.toBeUndefined()
  expect(form.fields['obj2.bb']).not.toBeUndefined()
  expect(form.fields['obj2.cc']).toBeUndefined()
  obj2.addProperty('cc', '123')
  attach(
    form.createField({
      name: 'cc',
      basePath: 'obj2',
    })
  )
  expect(form.fields['obj2.cc']).not.toBeUndefined()
  obj2.removeProperty('cc')
  expect(form.fields['obj2.cc']).toBeUndefined()
})

test('initial value with empty', () => {
  const form = attach(createForm())
  const array = attach(form.createField({ name: 'array', initialValue: '' }))
  expect(array.value).toEqual('')

  const beNull = attach(form.createField({ name: 'null', initialValue: null }))
  expect(beNull.value).toEqual(null)
})

test('field submit', async () => {
  const form = attach(
    createForm({
      initialValues: {
        aa: {
          cc: 'cc',
        },
        bb: 'bb',
      },
    })
  )
  const childForm = attach(
    form.createObjectField({
      name: 'aa',
    })
  )
  attach(
    form.createField({
      name: 'bb',
    })
  )
  attach(
    form.createField({
      name: 'cc',
      basePath: 'aa',
    })
  )
  const onSubmit = jest.fn()
  await childForm.submit(onSubmit)
  expect(onSubmit).toBeCalledWith({
    cc: 'cc',
  })
})

test('field submit with error', async () => {
  const form = attach(createForm())
  const childForm = attach(
    form.createObjectField({
      name: 'aa',
    })
  )
  attach(
    form.createField({
      name: 'bb',
      required: true,
    })
  )
  attach(
    form.createField({
      name: 'cc',
      basePath: 'aa',
      required: true,
    })
  )
  const onSubmit = jest.fn()
  try {
    await childForm.submit(onSubmit)
  } catch (e) {
    expect(e).not.toBeUndefined()
  }
  expect(onSubmit).toBeCalledTimes(0)
})

test('initial display with value', () => {
  const form = attach(createForm())
  const aa = attach(
    form.createField({
      name: 'aa',
      value: 123,
      visible: false,
    })
  )
  const bb = attach(
    form.createField({
      name: 'bb',
      value: 123,
      visible: true,
    })
  )
  const cc = attach(
    form.createField({
      name: 'cc',
      value: 123,
      hidden: true,
    })
  )
  expect(aa.value).toBeUndefined()
  expect(aa.visible).toBeFalsy()
  expect(bb.value).toEqual(123)
  expect(bb.visible).toBeTruthy()
  expect(cc.value).toEqual(123)
  expect(cc.hidden).toBeTruthy()
})

test('state depend field visible value', async () => {
  const form = attach(createForm())
  const aa = attach(
    form.createField({
      name: 'aa',
    })
  )
  const bb = attach(
    form.createField({
      name: 'bb',
      reactions(field) {
        field.visible = aa.value === '123'
      },
    })
  )
  const cc = attach(
    form.createField({
      name: 'cc',
      reactions(field) {
        field.visible = aa.value === '123'
        field.disabled = !bb.value
      },
    })
  )
  expect(bb.visible).toBeFalsy()
  expect(cc.visible).toBeFalsy()
  expect(cc.disabled).toBeTruthy()
  aa.value = '123'
  await sleep(10)
  expect(bb.visible).toBeTruthy()
  expect(cc.visible).toBeTruthy()
  expect(cc.disabled).toBeTruthy()
  bb.value = '321'
  await sleep(10)
  expect(bb.visible).toBeTruthy()
  expect(cc.visible).toBeTruthy()
  expect(cc.disabled).toBeFalsy()
  aa.value = ''
  await sleep(10)
  expect(bb.visible).toBeFalsy()
  expect(cc.visible).toBeFalsy()
  expect(cc.disabled).toBeTruthy()
  aa.value = '123'
  await sleep(10)
  expect(bb.visible).toBeTruthy()
  expect(cc.visible).toBeTruthy()
  expect(cc.disabled).toBeFalsy()
})

test('reactions initialValue and value', () => {
  const form = attach(
    createForm({
      values: {
        aa: {
          input: '111',
        },
      },
    })
  )
  attach(
    form.createObjectField({
      name: 'aa',
      reactions: [
        (field) => {
          field.initialValue = {}
          field.initialValue.input = 123
        },
      ],
    })
  )
  attach(
    form.createField({
      name: 'input',
      basePath: 'aa',
    })
  )
  expect(form.values.aa.input).toEqual('111')
})

test('field name is length in initialize', () => {
  const form = attach(createForm())
  const field = attach(
    form.createField({
      name: 'length',
      initialValue: 123,
    })
  )
  expect(field.value).toEqual(123)
})

test('field name is length in dynamic assign', () => {
  const form = attach(createForm())
  const field = attach(
    form.createField({
      name: 'length',
    })
  )
  field.initialValue = 123
  expect(field.value).toEqual(123)
})

test('nested field modified', async () => {
  const form = attach(createForm())
  const obj = attach(
    form.createObjectField({
      name: 'object',
    })
  )
  const child = attach(
    form.createField({
      name: 'child',
      basePath: 'object',
    })
  )
  await child.onInput()
  expect(child.modified).toBeTruthy()
  expect(child.selfModified).toBeTruthy()
  expect(obj.modified).toBeTruthy()
  expect(obj.selfModified).toBeFalsy()
  expect(form.modified).toBeTruthy()
  await obj.reset()
  expect(child.modified).toBeFalsy()
  expect(child.selfModified).toBeFalsy()
  expect(obj.modified).toBeFalsy()
  expect(obj.selfModified).toBeFalsy()
  expect(form.modified).toBeTruthy()
  await form.reset()
  expect(form.modified).toBeFalsy()
})

test('field setValidator repeat call', async () => {
  const form = attach(createForm())
  const field = attach(
    form.createField({
      name: 'normal',
    })
  )

  const validator1 = jest.fn(() => '')
  const validator2 = jest.fn(() => '')
  const validator3 = jest.fn(() => '')

  field.setValidator([validator1, validator2, validator3])

  await form.validate()
  expect(validator1).toBeCalledTimes(1)
})

test('custom validator to get ctx.field', async () => {
  const form = attach(createForm())
  let ctxField = null
  let ctxForm = null
  attach(
    form.createField({
      name: 'aaa',
      validator(value, rule, ctx) {
        ctxField = ctx.field
        ctxForm = ctx.form
        return ''
      },
    })
  )
  await form.submit()
  expect(!!ctxField).toBeTruthy()
  expect(!!ctxForm).toBeTruthy()
})

test('single direction linkage effect', async () => {
  const form = attach(createForm())

  const input1 = form.createField({
    name: 'input1',
    reactions: (field: DataField) => {
      if (!field.selfModified) {
        return
      }
      input2.value = field.value
    },
  })

  const input2 = form.createField({
    name: 'input2',
  })

  await input1.onInput('123')
  expect(input2.value).toBe('123')
  await input2.onInput('321')
  expect(input2.value).toBe('321')
})

test('path change will update computed value', () => {
  const form = attach(createForm())

  const input = form.createField({
    name: 'input',
  })

  const value = jest.fn()

  autorun(() => {
    value(input.value)
  })
  batch(() => {
    input.locate('select')
    input.value = '123'
  })
  expect(value).nthCalledWith(2, '123')
})

test('object field reset', async () => {
  const form = attach(createForm())

  attach(
    form.createObjectField({
      name: 'obj',
    })
  )

  const input = attach(
    form.createField({
      name: 'input',
      basePath: 'obj',
    })
  )

  await form.reset()
  form.setValues({
    obj: {
      input: '123',
    },
  })
  expect(input.value).toBe('123')
})

test('field visible default value should work', () => {
  const form = attach(
    createForm({
      effects(form) {
        onFieldReact('obj.input1', (field) => {
          field.pattern = 'disabled'
        })
        onFieldReact('obj', (field) => {
          field.visible = form.values.select !== 'none'
        })
        onFieldReact('obj.input1', (field) => {
          if (isField(field)) {
            field.initialValue = '123'
          }
        })
        onFieldReact('obj.input2', (field) => {
          if (isField(field)) {
            field.value = form.values.select
          }
        })
      },
    })
  )

  const select = attach(
    form.createField({
      name: 'select',
    })
  )

  attach(
    form.createObjectField({
      name: 'obj',
    })
  )

  attach(
    form.createField({
      name: 'input1',
      basePath: 'obj',
    })
  )

  attach(
    form.createField({
      name: 'input2',
      basePath: 'obj',
    })
  )

  select.value = 'none'
  expect(form.values.obj?.input1).toBeUndefined()
  select.value = 'visible'
  expect(form.values.obj.input1).toBe('123')
})

test('query value with sibling path syntax', () => {
  const form = attach(createForm())
  const fn = jest.fn()
  attach(
    form.createVoidField({
      name: 'void',
    })
  )
  attach(
    form.createObjectField({
      name: 'obj',
      basePath: 'void',
    })
  )
  attach(
    form.createField({
      name: 'input',
      basePath: 'void.obj',
      reactions: [
        (field) => {
          fn(
            field.query('.textarea').value(),
            field.query('.textarea').initialValue()
          )
        },
      ],
    })
  )
  const textarea = attach(
    form.createField({
      name: 'textarea',
      basePath: 'void.obj',
      initialValue: 'aaa',
    })
  )
  textarea.value = '123'
  expect(fn).toBeCalledWith('123', 'aaa')
})

test('relative query with void field', () => {
  const form = attach(createForm())
  attach(
    form.createVoidField({
      name: 'void',
    })
  )
  const aa = attach(
    form.createField({
      name: 'aa',
      basePath: 'void',
    })
  )
  attach(
    form.createVoidField({
      name: 'mm',
    })
  )
  const bb = attach(
    form.createField({
      name: 'bb',
      basePath: 'mm',
    })
  )

  expect(bb.query('.aa').take()).toBe(aa)
})

test('empty string or number or null value need rewrite default value', () => {
  const form = attach(
    createForm<any>({
      values: {
        aa: '',
        bb: 0,
        ee: null,
      },
    })
  )
  attach(
    form.createField({
      name: 'aa',
      initialValue: 'test',
    })
  )
  attach(
    form.createField({
      name: 'bb',
      initialValue: 123,
    })
  )
  attach(
    form.createField({
      name: 'cc',
      initialValue: 'test',
    })
  )
  attach(
    form.createField({
      name: 'dd',
      initialValue: 123,
    })
  )
  attach(
    form.createField({
      name: 'ee',
      initialValue: 'test',
    })
  )
  expect(form.values.aa).toEqual('')
  expect(form.values.bb).toEqual(0)
  expect(form.values.cc).toEqual('test')
  expect(form.values.dd).toEqual(123)
  expect(form.values.ee).toEqual(null)
})

test('destroy field need auto remove initialValues', () => {
  const form = attach(createForm<any>())
  const aa = attach(
    form.createField({
      name: 'aa',
      initialValue: 'test',
    })
  )
  expect(form.initialValues.aa).toEqual('test')
  expect(form.values.aa).toEqual('test')
  aa.destroy()
  expect(form.initialValues.aa).toBeUndefined()
  expect(form.values.aa).toBeUndefined()
})

test('validateFirst', async () => {
  const form = attach(
    createForm<any>({
      validateFirst: false,
    })
  )
  const aaValidate = jest.fn(() => 'aaError')
  const aa = attach(
    form.createField({
      name: 'aa',
      validateFirst: true,
      validator: [aaValidate, aaValidate],
    })
  )
  await aa.onInput('aa')
  const bbValidate = jest.fn(() => 'bbError')
  const bb = attach(
    form.createField({
      name: 'bb',
      validator: [bbValidate, bbValidate],
      validateFirst: false,
    })
  )
  await bb.onInput('bb')
  const ccValidate = jest.fn(() => 'ccError')
  const cc = attach(
    form.createField({
      name: 'cc',
      validator: [ccValidate, ccValidate],
    })
  )
  await cc.onInput('cc')

  expect(aaValidate).toBeCalledTimes(1)
  expect(bbValidate).toBeCalledTimes(2)
  expect(ccValidate).toBeCalledTimes(2)
})

test('reactions should not be triggered when field destroyed', () => {
  const form = attach(createForm<any>())
  const handler = jest.fn()
  const obs = observable({ bb: 123 })
  const aa = attach(
    form.createField({
      name: 'aa',
      initialValue: 'test',
      reactions() {
        handler(obs.bb)
      },
    })
  )
  obs.bb = 321
  aa.destroy()
  obs.bb = 111
  expect(handler).toBeCalledTimes(2)
})

test('parent readPretty will overwrite self disabled or readOnly', () => {
  const form = attach(
    createForm<any>({
      readPretty: true,
    })
  )
  const aa = attach(
    form.createField({
      name: 'aa',
      initialValue: 'test',
      disabled: true,
    })
  )
  const bb = attach(
    form.createField({
      name: 'bb',
      initialValue: 'test',
      editable: true,
    })
  )
  expect(aa.pattern).toBe('readPretty')
  expect(bb.pattern).toBe('editable')
})

test('conflict name for errors filter', async () => {
  const form = attach(createForm<any>())
  const aa = attach(
    form.createField({
      name: 'aa',
      required: true,
    })
  )
  const aa1 = attach(
    form.createField({
      name: 'aa1',
      required: true,
    })
  )

  await aa1.onInput('')
  expect(aa.invalid).toBe(false)
})

test('field destroyed can not be assign value', () => {
  const form = attach(createForm<any>())
  const aa = attach(
    form.createField({
      name: 'aa',
    })
  )
  aa.destroy()
  aa.initialValue = 222
  aa.value = 111
  expect(form.values).toEqual({})
  expect(form.initialValues).toEqual({})
})

test('onInput could pass value with target', async () => {
  const form = attach(createForm<any>())
  const aa = attach(
    form.createField({
      name: 'aa',
    })
  )
  await aa.onInput({
    target: '123',
  })
  expect(aa.value).toEqual({ target: '123' })
})

test('field destroyed or display none should not be assign value from patch initialValues', () => {
  const form = attach(createForm())
  const aa = attach(
    form.createField({
      name: 'aa',
      display: 'none',
    })
  )

  aa.initialValue = '123'

  expect(form.values).toEqual({})

  aa.display = 'visible'

  expect(aa.value).toBe('123')
  expect(form.values).toEqual({ aa: '123' })
})

test('onFieldReact with field destroyed', () => {
  const fn = jest.fn()
  const obs = observable<any>({ value: 123 })
  const form = attach(
    createForm({
      effects() {
        onFieldReact('aa', () => {
          fn(obs.value)
        })
      },
    })
  )
  const aa = attach(
    form.createField({
      name: 'aa',
    })
  )
  obs.value = '321'
  expect(fn).toBeCalledTimes(2)
  aa.destroy()
  obs.value = '111'
  expect(fn).toBeCalledTimes(2)
})

test('field actions', () => {
  const form = attach(createForm())
  const aa = attach(
    form.createField({
      name: 'aa',
    })
  )
  expect(aa.actions).toEqual({})
  aa.inject({
    test: () => 123,
  })
  expect(aa.invoke('test')).toEqual(123)
  aa.inject({
    test: () => 321,
  })
  expect(aa.invoke('test')).toEqual(321)
})
