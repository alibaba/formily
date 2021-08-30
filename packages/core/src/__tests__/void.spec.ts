import { createForm } from '../'
import { attach } from './shared'

test('create void field', () => {
  const form = attach(createForm())
  const field = attach(
    form.createVoidField({
      name: 'void',
    })
  )
  field.destroy()
})

test('create void field props', () => {
  const form = attach(createForm())
  const field1 = attach(
    form.createVoidField({
      name: 'field1',
      title: 'Field 1',
      description: 'This is Field 1',
    })
  )
  expect(field1.title).toEqual('Field 1')
  expect(field1.description).toEqual('This is Field 1')
  const field2 = attach(
    form.createVoidField({
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
    form.createVoidField({
      name: 'field3',
      readOnly: true,
      visible: false,
    })
  )
  expect(field3.pattern).toEqual('readOnly')
  expect(field3.readOnly).toBeTruthy()
  expect(field3.display).toEqual('none')
  expect(field3.visible).toBeFalsy()
})

test('setComponent/setComponentProps', () => {
  const form = attach(createForm())
  const field = attach(
    form.createVoidField({
      name: 'aa',
    })
  )
  const component = () => null
  field.setComponent(component, { props: 123 })
  expect(field.component[0]).toEqual(component)
  expect(field.component[1]).toEqual({ props: 123 })
  field.setComponentProps({
    hello: 'world',
  })
  expect(field.component[1]).toEqual({ props: 123, hello: 'world' })
})

test('setTitle/setDescription', () => {
  const form = attach(createForm())
  const aa = attach(
    form.createVoidField({
      name: 'aa',
    })
  )
  aa.setTitle('AAA')
  aa.setDescription('This is AAA')
  expect(aa.title).toEqual('AAA')
  expect(aa.description).toEqual('This is AAA')
})

test('setComponent/setComponentProps', () => {
  const component = () => null
  const form = attach(createForm())
  const field = attach(
    form.createVoidField({
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
    form.createVoidField({
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

test('setState/getState', () => {
  const form = attach(createForm())
  const aa = attach(
    form.createVoidField({
      name: 'aa',
    })
  )
  const state = aa.getState()
  aa.setState((state) => {
    state.title = 'AAA'
  })
  expect(aa.title).toEqual('AAA')
  aa.setState(state)
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
  expect(aa.parent).toBeUndefined()
})

test('nested display/pattern', () => {
  const form = attach(createForm())
  attach(
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
  const void2_ = attach(
    form.createVoidField({
      name: 'void',
      basePath: 'object.void.0',
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
      basePath: 'object.void',
    })
  )
  void_.setPattern('readPretty')
  expect(void_.pattern).toEqual('readPretty')
  expect(aaa.pattern).toEqual('readPretty')
  expect(bbb.pattern).toEqual('readPretty')
  void_.setPattern('readOnly')
  expect(void_.pattern).toEqual('readOnly')
  expect(aaa.pattern).toEqual('readOnly')
  expect(bbb.pattern).toEqual('readOnly')
  void_.setPattern('disabled')
  expect(void_.pattern).toEqual('disabled')
  expect(aaa.pattern).toEqual('disabled')
  expect(bbb.pattern).toEqual('disabled')
  void_.setPattern()
  expect(void_.pattern).toEqual('editable')
  expect(aaa.pattern).toEqual('editable')
  expect(bbb.pattern).toEqual('editable')

  void_.setDisplay('hidden')
  expect(void_.display).toEqual('hidden')
  expect(aaa.display).toEqual('hidden')
  expect(bbb.display).toEqual('hidden')
  void_.setDisplay('none')
  expect(void_.display).toEqual('none')
  expect(aaa.display).toEqual('none')
  expect(bbb.display).toEqual('none')
  void_.setDisplay()
  expect(void_.display).toEqual('visible')
  expect(aaa.display).toEqual('visible')
  expect(bbb.display).toEqual('visible')
  void_.onUnmount()
  expect(void2_.parent === void_).toBeTruthy()
})

test('reactions', async () => {
  const form = attach(createForm())
  const aa = attach(
    form.createField({
      name: 'aa',
    })
  )
  const bb = attach(
    form.createVoidField({
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
  form.setDisplay(null)
  form.setPattern(null)
  const field = attach(
    form.createVoidField({
      name: 'xxx',
    })
  )
  expect(field.display).toEqual('visible')
  expect(field.pattern).toEqual('editable')
})
