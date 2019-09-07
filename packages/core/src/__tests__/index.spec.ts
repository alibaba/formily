import { createForm } from '../index'
import { FormLifeCycle, LifeCycleTypes } from '../shared/lifecycle'

describe('createForm', () => {
  test('values', () => {
    const form = createForm({
      values: {
        aa: 111,
        bb: 222
      }
    })
    expect(form.getFormState(state => state.values)).toEqual({
      aa: 111,
      bb: 222
    })
    expect(form.getFormState(state => state.pristine)).toEqual(false)
    expect(form.getFormState(state => state.initialized)).toEqual(true)
    expect(form.getFormGraph()).toMatchSnapshot()
  })

  test('initialValues on init', () => {
    const form = createForm({
      initialValues: {
        aa: 111,
        bb: 222
      }
    })
    const aa = form.registerField({
      path: 'aa'
    })

    const bb = form.registerField({
      path: 'bb'
    })
    expect(form.getFormState(state => state.values)).toEqual({
      aa: 111,
      bb: 222
    })
    expect(form.getFormState(state => state.initialValues)).toEqual({
      aa: 111,
      bb: 222
    })
    expect(form.getFormState(state => state.pristine)).toEqual(true)
    expect(form.getFormState(state => state.initialized)).toEqual(true)
    expect(aa.getState(state => state.value)).toEqual(111)
    expect(bb.getState(state => state.value)).toEqual(222)
    expect(form.getFormGraph()).toMatchSnapshot()
  })

  test('initialValues after init', () => {
    const form = createForm()
    const aa = form.registerField({
      path: 'aa'
    })

    const bb = form.registerField({
      path: 'bb'
    })
    form.setFormState(state => {
      state.initialValues = {
        aa: 111,
        bb: 222
      }
    })
    expect(form.getFormState(state => state.values)).toEqual({
      aa: 111,
      bb: 222
    })
    expect(form.getFormState(state => state.initialValues)).toEqual({
      aa: 111,
      bb: 222
    })
    expect(form.getFormState(state => state.pristine)).toEqual(true)
    expect(form.getFormState(state => state.initialized)).toEqual(true)
    expect(aa.getState(state => state.value)).toEqual(111)
    expect(bb.getState(state => state.value)).toEqual(222)
    expect(form.getFormGraph()).toMatchSnapshot()
  })

  test('initialValue', () => {
    const form = createForm({
      initialValues: {
        aa: 111,
        bb: 222
      }
    })
    expect(form.getFormState(state => state.values)).toEqual({
      aa: 111,
      bb: 222
    })
    expect(form.getFormState(state => state.initialValues)).toEqual({
      aa: 111,
      bb: 222
    })
    expect(form.getFormState(state => state.pristine)).toEqual(true)
    expect(form.getFormState(state => state.initialized)).toEqual(true)
    expect(form.getFormGraph()).toMatchSnapshot()
  })

  test('lifecycles', () => {
    const onFormInit = jest.fn()
    const onFieldInit = jest.fn()
    const onFieldChange = jest.fn()
    const form = createForm({
      initialValues: {
        aa: 111,
        bb: 222
      },
      lifecycles: [
        new FormLifeCycle(LifeCycleTypes.ON_FORM_INIT, onFormInit),
        new FormLifeCycle(LifeCycleTypes.ON_FIELD_INIT, onFieldInit),
        new FormLifeCycle(LifeCycleTypes.ON_FIELD_CHANGE, onFieldChange)
      ]
    })

    const aa = form.registerField({
      path: 'aa',
      value: '123'
    })

    const bb = form.registerField({
      path: 'bb',
      value: '321'
    })

    expect(onFormInit).toBeCalledTimes(1)
    expect(onFieldInit).toBeCalledTimes(2)
    expect(onFieldChange).toBeCalledTimes(2)
    expect(form.getFormState(state => state.values)).toEqual({
      aa: '123',
      bb: '321'
    })
    aa.setState(state => {
      state.value = 'change aa'
    })
    bb.setState(state => {
      state.value = 'change bb'
    })
    expect(onFieldChange).toBeCalledTimes(4)
    expect(form.getFormState(state => state.values)).toEqual({
      aa: 'change aa',
      bb: 'change bb'
    })
    expect(aa.getState(state => state.value)).toEqual('change aa')
    expect(bb.getState(state => state.value)).toEqual('change bb')
    expect(form.getFormGraph()).toMatchSnapshot()
  })
})

describe('graph', () => {
  test('getFormGraph', () => {
    const form = createForm({
      initialValues: {
        aa: '123',
        bb: '321'
      }
    })

    form.registerField({
      path: 'aa',
      value: 'hello aa'
    })

    form.registerField({
      path: 'bb',
      value: 'hello bb'
    })
    expect(form.getFormGraph()).toMatchSnapshot()
  })

  test('setFormGraph', () => {
    const form = createForm({
      initialValues: {
        aa: '123',
        bb: '321'
      }
    })

    form.registerField({
      path: 'aa',
      value: 'hello aa'
    })

    form.registerField({
      path: 'bb',
      value: 'hello bb'
    })
    const snapshot = form.getFormGraph()
    form.setFieldState('aa', state => {
      state.visible = false
    })
    expect(form.getFormGraph()).toMatchSnapshot()
    form.setFormGraph(snapshot)
    expect(form.getFormGraph()).toEqual(snapshot)
  })
})

describe('submit', () => {
  //todo
})

describe('reset', () => {
  test('array reset forceclear', () => {
    const form = createForm({
      initialValues: {
        aa: {
          bb: [{ aa: 123 }, { aa: 321 }]
        }
      }
    })
    form.registerField({
      path: 'aa'
    })
    form.registerField({
      path: 'aa.bb'
    })
    form.registerField({
      path: 'aa.bb.0'
    })
    form.registerField({
      path: 'aa.bb.1'
    })
    form.registerField({
      path: 'aa.bb.0.aa'
    })
    form.registerField({
      path: 'aa.bb.1.aa'
    })
    expect(form.getFormGraph()).toMatchSnapshot()
    form.setFieldState('aa.bb.0.aa', state => {
      state.value = 'aa changed'
    })
    form.reset({ forceClear: true })
    expect(form.getFormGraph()).toMatchSnapshot()
  })
  test('array reset no forceclear', () => {
    const form = createForm({
      initialValues: {
        aa: {
          bb: [{ aa: 123 }, { aa: 321 }]
        }
      }
    })
    form.registerField({
      path: 'aa'
    })
    form.registerField({
      path: 'aa.bb'
    })
    form.registerField({
      path: 'aa.bb.0'
    })
    form.registerField({
      path: 'aa.bb.1'
    })
    form.registerField({
      path: 'aa.bb.0.aa'
    })
    form.registerField({
      path: 'aa.bb.1.aa'
    })
    expect(form.getFormGraph()).toMatchSnapshot()
    form.setFieldState('aa.bb.0.aa', state => {
      state.value = 'aa changed'
    })
    expect(form.getFormGraph()).toMatchSnapshot()
    form.reset()
    expect(form.getFormGraph()).toMatchSnapshot()
  })
})

describe('validate', () => {
  //todo
})

describe('setState', () => {
  //todo
})

describe('getState', () => {
  //todo
})

describe('subscribe', () => {
  //todo
})

describe('unsubscribe', () => {
  //todo
})

describe('setFieldState', () => {
  //todo
})

describe('getFieldState', () => {
  //todo
})

describe('registerField', () => {
  //todo
})

describe('registerVField', () => {
  //todo
})

describe('createMutators', () => {
  //todo
})

describe('major sences', () => {
  test('dynamic remove with intialValues', async () => {
    const form = createForm({
      initialValues: {
        aa: [{ aa: 123, bb: 321 }, { aa: 345, bb: 678 }]
      }
    })
    form.registerField({
      path: 'aa'
    })
    form.registerField({
      path: 'aa.0'
    })
    form.registerField({
      path: 'aa.0.aa'
    })
    form.registerField({
      path: 'aa.0.bb'
    })
    form.registerField({
      path: 'aa.1'
    })
    form.registerField({
      path: 'aa.1.aa'
    })
    form.registerField({
      path: 'aa.1.bb'
    })
    form.setFieldState('aa.1.aa', state => {
      state.value = 'change aa'
    })
    const mutators = form.createMutators('aa')
    const snapshot = form.getFormGraph()
    expect(snapshot).toMatchSnapshot()
    mutators.remove(0)
    expect(form.getFormGraph()).toMatchSnapshot()
    form.setFormGraph(snapshot)
    expect(form.getFormGraph()).toMatchSnapshot()
  })

  test('nested dynamic remove', () => {
    const form = createForm({
      useDirty: true
    })
    form.registerField({
      path: 'aa',
      value: []
    })
    form.registerField({
      path: 'aa.0'
    })
    form.registerField({
      path: 'aa.0.aa'
    })
    form.registerField({
      path: 'aa.0.bb'
    })
    form.registerField({
      path: 'aa.1'
    })
    form.registerField({
      path: 'aa.1.aa'
    })
    form.registerField({
      path: 'aa.1.bb'
    })
    form.setFieldState('aa.1.aa', state => {
      state.value = 'change aa'
    })

    const mutators = form.createMutators('aa')
    const snapshot = form.getFormGraph()
    expect(snapshot).toMatchSnapshot()
    mutators.remove(0)
    expect(form.getFormGraph()).toMatchSnapshot()
    form.setFormGraph(snapshot)
    expect(form.getFormGraph()).toMatchSnapshot()
    expect(form.getFormGraph()).toEqual(snapshot)
  })

  test('nested visible', () => {
    const form = createForm()
    form.registerField({
      path: 'aa',
      value: {}
    })
    form.registerField({
      path: 'aa.bb',
      initialValue: 123
    })
    form.registerField({
      path: 'aa.cc',
      initialValue: 222
    })
    form.setFieldState('aa', state => {
      state.visible = false
    })
    expect(form.getFormState(state => state.values)).toEqual({})

    form.setFieldState('aa', state => {
      state.visible = false
    })
    expect(form.getFormGraph()).toMatchSnapshot()

    form.setFieldState('aa.bb', state => {
      state.value = '123'
    })

    expect(form.getFormGraph()).toMatchSnapshot()

    form.setFieldState('aa', state => {
      state.visible = true
    })
    expect(form.getFormGraph()).toMatchSnapshot()
  })

  test('deep nested visible', () => {
    const form = createForm()
    form.registerField({
      path: 'aa',
      value: {}
    })
    form.registerField({
      path: 'aa.bb'
    })
    form.registerField({
      path: 'aa.bb.cc',
      value: 123
    })
    form.setFieldState('aa', state => {
      state.visible = false
    })
    expect(form.getFormGraph()).toMatchSnapshot()
  })

  test('deep nested visible with VField', () => {
    const form = createForm()
    form.registerField({
      path: 'aa',
      value: {}
    })
    form.registerVField({
      path: 'aa.bb'
    })
    form.registerField({
      path: 'aa.bb.cc',
      value: 123
    })
    form.setFieldState('aa', state => {
      state.visible = false
    })
    expect(form.getFormGraph()).toMatchSnapshot()
  })
})
