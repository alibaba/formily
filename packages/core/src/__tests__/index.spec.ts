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
    expect(form.getFormState(state => state.pristine)).toEqual(true)
    expect(form.getFormState(state => state.initialized)).toEqual(true)
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
  })

  test('initialValues after init', () => {
    const form = createForm()
    const aa = form.registerField({
      path: 'aa'
    })

    const bb = form.registerField({
      path: 'bb'
    })
    form.setFormState(state=>{
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

    expect(form.getFormGraph()).toEqual({
      '': {
        pristine: true,
        valid: true,
        invalid: false,
        loading: false,
        validating: false,
        initialized: true,
        submitting: false,
        editable: true,
        errors: [],
        warnings: [],
        values: { aa: 'hello aa', bb: 'hello bb' },
        initialValues: { aa: '123', bb: '321' },
        mounted: false,
        unmounted: false,
        props: {}
      },
      aa: {
        name: 'aa',
        initialized: true,
        pristine: true,
        valid: true,
        touched: false,
        invalid: false,
        visible: true,
        display: true,
        editable: undefined,
        loading: false,
        validating: false,
        errors: [],
        values: ['hello aa'],
        effectErrors: [],
        warnings: [],
        effectWarnings: [],
        value: 'hello aa',
        initialValue: '123',
        rules: [],
        required: false,
        mounted: false,
        unmounted: false,
        props: undefined
      },
      bb: {
        name: 'bb',
        initialized: true,
        pristine: true,
        valid: true,
        touched: false,
        invalid: false,
        visible: true,
        display: true,
        editable: undefined,
        loading: false,
        validating: false,
        errors: [],
        values: ['hello bb'],
        effectErrors: [],
        warnings: [],
        effectWarnings: [],
        value: 'hello bb',
        initialValue: '321',
        rules: [],
        required: false,
        mounted: false,
        unmounted: false,
        props: undefined
      }
    })
  })

  test('setFormGraph', () => {})
})

describe('submit', () => {
  //todo
})

describe('reset', () => {
  //todo
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
