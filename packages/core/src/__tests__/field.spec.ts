import { createForm } from '../'
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

test('validate/errors/warnings/successes/valid/invalid/validateStatus/queryFeedbacks', async () => {
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
  await field.validate()
  await field2.validate()
  expect(field.invalid).toBeTruthy()
  expect(field.errors.length).toEqual(1)
  expect(field2.invalid).toBeTruthy()
  expect(field2.errors.length).toEqual(3)
  await field.onInput('123')
  expect(field.successes).toEqual(['success'])
  await field.onInput('321')
  expect(field.warnings).toEqual(['warning'])
  await field.onInput('111')
  expect(field.errors).toEqual(['error'])
  await field.onBlur()
  expect(field.errors).toEqual(['The field value is a invalid url', 'error'])
  await field.onFocus()
  expect(field.errors).toEqual([
    'The field value is a invalid url',
    'The field value is not a valid date format',
    'error',
  ])
  field.setFeedback()
  expect(field.errors).toEqual([
    'The field value is a invalid url',
    'The field value is not a valid date format',
    'error',
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
  expect(field4.errors).toEqual([])
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

test('reset', async () => {
  const form = attach(
    createForm({
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
  const bb = attach(
    form.createField({
      name: 'bb',
      required: true,
    })
  )
  expect(aa.value).toEqual(123)
  expect(bb.value).toEqual(123)
  expect(form.values.aa).toEqual(123)
  expect(form.values.bb).toEqual(123)
  aa.onInput('xxxxx')
  expect(form.values.aa).toEqual('xxxxx')
  aa.reset()
  expect(aa.value).toEqual(123)
  expect(form.values.aa).toEqual(123)
  bb.onInput('xxxxx')
  expect(form.values.bb).toEqual('xxxxx')
  bb.reset()
  expect(bb.value).toBeUndefined()
  expect(form.values.bb).toBeUndefined()
  aa.reset({
    forceClear: true,
  })
  expect(aa.value).toBeUndefined()
  expect(form.values.aa).toBeUndefined()
  expect(aa.valid).toBeTruthy()
  await aa.reset({
    forceClear: true,
    validate: true,
  })
  expect(aa.valid).toBeFalsy()
})

test('match', () => {
  const form = attach(
    createForm({
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
  aa.setErrors(['error'])
  aa.setWarnings(['warning'])
  aa.setSuccesses(['success'])
  bb.setSuccesses(['success'])
  cc.setWarnings(['warning'])
  expect(aa.errors).toEqual(['error'])
  expect(aa.valid).toBeFalsy()
  expect(aa.warnings).toEqual(['warning'])
  expect(aa.successes).toEqual(['success'])
  expect(bb.validateStatus).toEqual('success')
  expect(cc.validateStatus).toEqual('warning')
  aa.setValidator('date')
  await aa.onInput('123')
  expect(aa.errors.length).toEqual(2)
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
