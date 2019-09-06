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
    expect(form.getFormState(state => state.pristine)).toEqual(false)
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
        editable: true,
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
        props: {}
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
        editable: true,
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
        props: {}
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
    mutators.remove(0)
    expect(form.getFormGraph()).toEqual({
      '': {
        pristine: false,
        valid: true,
        invalid: false,
        loading: false,
        validating: false,
        initialized: true,
        submitting: false,
        editable: true,
        errors: [],
        warnings: [],
        values: { aa: [{ aa: 'change aa', bb: 678 }] },
        initialValues: { aa: [{ aa: 123, bb: 321 }, { aa: 345, bb: 678 }] },
        mounted: false,
        unmounted: false,
        props: {}
      },
      aa: {
        name: 'aa',
        initialized: true,
        pristine: false,
        valid: true,
        touched: false,
        invalid: false,
        visible: true,
        display: true,
        editable: true,
        loading: false,
        validating: false,
        errors: [],
        values: [[{ aa: 'change aa', bb: 678 }]],
        effectErrors: [],
        warnings: [],
        effectWarnings: [],
        value: [{ aa: 'change aa', bb: 678 }],
        initialValue: [{ aa: 123, bb: 321 }, { aa: 345, bb: 678 }],
        rules: [],
        required: false,
        mounted: false,
        unmounted: false,
        props: {}
      },
      'aa.0': {
        name: 'aa.0',
        initialized: true,
        pristine: false,
        valid: true,
        touched: false,
        invalid: false,
        visible: true,
        display: true,
        editable: true,
        loading: false,
        validating: false,
        errors: [],
        values: [{ aa: 'change aa', bb: 678 }],
        effectErrors: [],
        warnings: [],
        effectWarnings: [],
        value: { aa: 'change aa', bb: 678 },
        initialValue: { aa: 123, bb: 321 },
        rules: [],
        required: false,
        mounted: false,
        unmounted: false,
        props: {}
      },
      'aa.0.aa': {
        name: 'aa.0.aa',
        initialized: true,
        pristine: false,
        valid: true,
        touched: false,
        invalid: false,
        visible: true,
        display: true,
        editable: true,
        loading: false,
        validating: false,
        errors: [],
        values: ['change aa'],
        effectErrors: [],
        warnings: [],
        effectWarnings: [],
        value: 'change aa',
        initialValue: 123,
        rules: [],
        required: false,
        mounted: false,
        unmounted: false,
        props: {}
      },
      'aa.0.bb': {
        name: 'aa.0.bb',
        initialized: true,
        pristine: false,
        valid: true,
        touched: false,
        invalid: false,
        visible: true,
        display: true,
        editable: true,
        loading: false,
        validating: false,
        errors: [],
        values: [678],
        effectErrors: [],
        warnings: [],
        effectWarnings: [],
        value: 678,
        initialValue: 321,
        rules: [],
        required: false,
        mounted: false,
        unmounted: false,
        props: {}
      }
    })
  })

  test('nested dynamic remove', () => {
    const form = createForm()
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
    expect(form.getFormGraph()).toEqual({
      '': {
        pristine: false,
        valid: true,
        invalid: false,
        loading: false,
        validating: false,
        initialized: true,
        submitting: false,
        editable: true,
        errors: [],
        warnings: [],
        values: {
          aa: [
            undefined,
            {
              aa: 'change aa'
            }
          ]
        },
        initialValues: {},
        mounted: false,
        unmounted: false,
        props: {}
      },
      aa: {
        name: 'aa',
        initialized: true,
        pristine: false,
        editable: true,
        valid: true,
        touched: false,
        invalid: false,
        visible: true,
        display: true,
        loading: false,
        validating: false,
        errors: [],
        values: [
          [
            undefined,
            {
              aa: 'change aa'
            }
          ]
        ],
        effectErrors: [],
        warnings: [],
        effectWarnings: [],
        value: [
          undefined,
          {
            aa: 'change aa'
          }
        ],
        initialValue: undefined,
        rules: [],
        required: false,
        mounted: false,
        unmounted: false,
        props: {}
      },
      'aa.0': {
        name: 'aa.0',
        initialized: true,
        pristine: true,
        editable: true,
        initialValue: undefined,
        valid: true,
        touched: false,
        invalid: false,
        visible: true,
        display: true,
        loading: false,
        validating: false,
        errors: [],
        values: [],
        value: undefined,
        effectErrors: [],
        warnings: [],
        effectWarnings: [],
        rules: [],
        required: false,
        mounted: false,
        unmounted: false,
        props: {}
      },
      'aa.0.aa': {
        name: 'aa.0.aa',
        initialized: true,
        pristine: true,
        editable: true,
        initialValue: undefined,
        valid: true,
        touched: false,
        invalid: false,
        visible: true,
        display: true,
        loading: false,
        validating: false,
        errors: [],
        values: [],
        value: undefined,
        effectErrors: [],
        warnings: [],
        effectWarnings: [],
        rules: [],
        required: false,
        mounted: false,
        unmounted: false,
        props: {}
      },
      'aa.0.bb': {
        name: 'aa.0.bb',
        initialized: true,
        pristine: true,
        editable: true,
        initialValue: undefined,
        valid: true,
        touched: false,
        invalid: false,
        visible: true,
        display: true,
        loading: false,
        validating: false,
        errors: [],
        values: [],
        value: undefined,
        effectErrors: [],
        warnings: [],
        effectWarnings: [],
        rules: [],
        required: false,
        mounted: false,
        unmounted: false,
        props: {}
      },
      'aa.1': {
        name: 'aa.1',
        initialized: true,
        pristine: false,
        valid: true,
        touched: false,
        invalid: false,
        visible: true,
        display: true,
        loading: false,
        editable: true,
        validating: false,
        errors: [],
        values: [
          {
            aa: 'change aa'
          }
        ],
        effectErrors: [],
        initialValue: undefined,
        warnings: [],
        effectWarnings: [],
        value: {
          aa: 'change aa'
        },
        rules: [],
        required: false,
        mounted: false,
        unmounted: false,
        props: {}
      },
      'aa.1.aa': {
        name: 'aa.1.aa',
        initialized: true,
        pristine: false,
        valid: true,
        touched: false,
        invalid: false,
        visible: true,
        editable: true,
        display: true,
        loading: false,
        validating: false,
        errors: [],
        values: ['change aa'],
        initialValue: undefined,
        effectErrors: [],
        warnings: [],
        effectWarnings: [],
        value: 'change aa',
        rules: [],
        required: false,
        mounted: false,
        unmounted: false,
        props: {}
      },
      'aa.1.bb': {
        name: 'aa.1.bb',
        initialized: true,
        pristine: true,
        valid: true,
        touched: false,
        invalid: false,
        visible: true,
        display: true,
        editable: true,
        loading: false,
        validating: false,
        errors: [],
        values: [],
        initialValue: undefined,
        effectErrors: [],
        warnings: [],
        effectWarnings: [],
        rules: [],
        required: false,
        mounted: false,
        unmounted: false,
        props: {}
      }
    })
    const mutators = form.createMutators('aa')
    mutators.remove(0)
    expect(form.getFormGraph()).toEqual({
      '': {
        pristine: false,
        valid: true,
        invalid: false,
        loading: false,
        validating: false,
        initialized: true,
        submitting: false,
        editable: true,
        errors: [],
        warnings: [],
        values: { aa: [{ aa: 'change aa', bb: undefined }] },
        initialValues: {},
        mounted: false,
        unmounted: false,
        props: {}
      },
      aa: {
        name: 'aa',
        initialized: true,
        pristine: false,
        valid: true,
        touched: false,
        invalid: false,
        visible: true,
        display: true,
        editable: true,
        loading: false,
        validating: false,
        errors: [],
        values: [[{ aa: 'change aa', bb: undefined }]],
        effectErrors: [],
        warnings: [],
        effectWarnings: [],
        value: [{ aa: 'change aa', bb: undefined }],
        initialValue: undefined,
        rules: [],
        required: false,
        mounted: false,
        unmounted: false,
        props: {}
      },
      'aa.0': {
        name: 'aa.0',
        initialized: true,
        pristine: false,
        valid: true,
        touched: false,
        invalid: false,
        visible: true,
        display: true,
        editable: true,
        loading: false,
        validating: false,
        errors: [],
        values: [{ aa: 'change aa' }],
        effectErrors: [],
        warnings: [],
        effectWarnings: [],
        value: { aa: 'change aa' },
        initialValue: undefined,
        rules: [],
        required: false,
        mounted: false,
        unmounted: false,
        props: {}
      },
      'aa.0.aa': {
        name: 'aa.0.aa',
        initialized: true,
        pristine: false,
        valid: true,
        touched: false,
        invalid: false,
        visible: true,
        display: true,
        editable: true,
        loading: false,
        validating: false,
        errors: [],
        values: ['change aa'],
        effectErrors: [],
        warnings: [],
        effectWarnings: [],
        value: 'change aa',
        initialValue: undefined,
        rules: [],
        required: false,
        mounted: false,
        unmounted: false,
        props: {}
      },
      'aa.0.bb': {
        name: 'aa.0.bb',
        initialized: true,
        pristine: true,
        valid: true,
        touched: false,
        invalid: false,
        visible: true,
        display: true,
        editable: true,
        loading: false,
        validating: false,
        errors: [],
        values: [],
        effectErrors: [],
        warnings: [],
        effectWarnings: [],
        value: undefined,
        initialValue: undefined,
        rules: [],
        required: false,
        mounted: false,
        unmounted: false,
        props: {}
      }
    })
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
    expect(form.getFormGraph()).toEqual({
      '': {
        pristine: false,
        valid: true,
        invalid: false,
        loading: false,
        validating: false,
        initialized: true,
        submitting: false,
        editable: true,
        errors: [],
        warnings: [],
        values: {},
        initialValues: { aa: { bb: 123, cc: 222 } },
        mounted: false,
        unmounted: false,
        props: {}
      },
      aa: {
        name: 'aa',
        initialized: true,
        pristine: false,
        valid: true,
        touched: false,
        invalid: false,
        visible: false,
        display: true,
        editable: true,
        loading: false,
        validating: false,
        errors: [],
        values: [{ bb: 123, cc: 222 }],
        effectErrors: [],
        warnings: [],
        effectWarnings: [],
        value: { bb: 123, cc: 222 },
        initialValue: { bb: 123, cc: 222 },
        rules: [],
        required: false,
        mounted: false,
        unmounted: false,
        props: {}
      },
      'aa.bb': {
        name: 'aa.bb',
        initialized: true,
        pristine: true,
        valid: true,
        touched: false,
        invalid: false,
        visible: false,
        display: true,
        editable: true,
        loading: false,
        validating: false,
        errors: [],
        values: [123],
        effectErrors: [],
        warnings: [],
        effectWarnings: [],
        value: 123,
        initialValue: 123,
        rules: [],
        required: false,
        mounted: false,
        unmounted: false,
        props: {}
      },
      'aa.cc': {
        name: 'aa.cc',
        initialized: true,
        pristine: true,
        valid: true,
        touched: false,
        invalid: false,
        visible: false,
        display: true,
        editable: true,
        loading: false,
        validating: false,
        errors: [],
        values: [222],
        effectErrors: [],
        warnings: [],
        effectWarnings: [],
        value: 222,
        initialValue: 222,
        rules: [],
        required: false,
        mounted: false,
        unmounted: false,
        props: {}
      }
    })

    form.setFieldState('aa.bb', state => {
      state.value = '123'
    })

    expect(form.getFormGraph()).toEqual({
      '': {
        pristine: false,
        valid: true,
        invalid: false,
        loading: false,
        validating: false,
        initialized: true,
        submitting: false,
        editable: true,
        errors: [],
        warnings: [],
        values: {},
        initialValues: { aa: { bb: 123, cc: 222 } },
        mounted: false,
        unmounted: false,
        props: {}
      },
      aa: {
        name: 'aa',
        initialized: true,
        pristine: false,
        valid: true,
        touched: false,
        invalid: false,
        visible: false,
        display: true,
        editable: true,
        loading: false,
        validating: false,
        errors: [],
        values: [{ bb: 123, cc: 222 }],
        effectErrors: [],
        warnings: [],
        effectWarnings: [],
        value: { bb: 123, cc: 222 },
        initialValue: { bb: 123, cc: 222 },
        rules: [],
        required: false,
        mounted: false,
        unmounted: false,
        props: {}
      },
      'aa.bb': {
        name: 'aa.bb',
        initialized: true,
        pristine: true,
        valid: true,
        touched: false,
        invalid: false,
        visible: false,
        display: true,
        editable: true,
        loading: false,
        validating: false,
        errors: [],
        values: [123],
        effectErrors: [],
        warnings: [],
        effectWarnings: [],
        value: 123,
        initialValue: 123,
        rules: [],
        required: false,
        mounted: false,
        unmounted: false,
        props: {}
      },
      'aa.cc': {
        name: 'aa.cc',
        initialized: true,
        pristine: true,
        valid: true,
        touched: false,
        invalid: false,
        visible: false,
        display: true,
        editable: true,
        loading: false,
        validating: false,
        errors: [],
        values: [222],
        effectErrors: [],
        warnings: [],
        effectWarnings: [],
        value: 222,
        initialValue: 222,
        rules: [],
        required: false,
        mounted: false,
        unmounted: false,
        props: {}
      }
    })

    form.setFieldState('aa', state => {
      state.visible = true
    })
    expect(form.getFormGraph()).toEqual({
      '': {
        pristine: false,
        valid: true,
        invalid: false,
        loading: false,
        validating: false,
        initialized: true,
        submitting: false,
        editable: true,
        errors: [],
        warnings: [],
        values: { aa: { bb: 123, cc: 222 } },
        initialValues: { aa: { bb: 123, cc: 222 } },
        mounted: false,
        unmounted: false,
        props: {}
      },
      aa: {
        name: 'aa',
        initialized: true,
        pristine: false,
        valid: true,
        touched: false,
        invalid: false,
        visible: true,
        display: true,
        editable: true,
        loading: false,
        validating: false,
        errors: [],
        values: [{ bb: 123, cc: 222 }],
        effectErrors: [],
        warnings: [],
        effectWarnings: [],
        value: { bb: 123, cc: 222 },
        initialValue: { bb: 123, cc: 222 },
        rules: [],
        required: false,
        mounted: false,
        unmounted: false,
        props: {}
      },
      'aa.bb': {
        name: 'aa.bb',
        initialized: true,
        pristine: true,
        valid: true,
        touched: false,
        invalid: false,
        visible: true,
        display: true,
        editable: true,
        loading: false,
        validating: false,
        errors: [],
        values: [123],
        effectErrors: [],
        warnings: [],
        effectWarnings: [],
        value: 123,
        initialValue: 123,
        rules: [],
        required: false,
        mounted: false,
        unmounted: false,
        props: {}
      },
      'aa.cc': {
        name: 'aa.cc',
        initialized: true,
        pristine: true,
        valid: true,
        touched: false,
        invalid: false,
        visible: true,
        display: true,
        editable: true,
        loading: false,
        validating: false,
        errors: [],
        values: [222],
        effectErrors: [],
        warnings: [],
        effectWarnings: [],
        value: 222,
        initialValue: 222,
        rules: [],
        required: false,
        mounted: false,
        unmounted: false,
        props: {}
      }
    })
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
    expect(form.getFormGraph()).toEqual({
      '': {
        pristine: false,
        valid: true,
        invalid: false,
        loading: false,
        validating: false,
        initialized: true,
        submitting: false,
        editable: true,
        errors: [],
        warnings: [],
        values: {},
        initialValues: {},
        mounted: false,
        unmounted: false,
        props: {}
      },
      aa: {
        name: 'aa',
        initialized: true,
        pristine: false,
        valid: true,
        touched: false,
        invalid: false,
        visible: false,
        display: true,
        editable: true,
        loading: false,
        validating: false,
        errors: [],
        values: [{ bb: { cc: 123 } }],
        effectErrors: [],
        warnings: [],
        effectWarnings: [],
        value: { bb: { cc: 123 } },
        initialValue: undefined,
        rules: [],
        required: false,
        mounted: false,
        unmounted: false,
        props: {}
      },
      'aa.bb': {
        name: 'aa.bb',
        initialized: true,
        pristine: false,
        valid: true,
        touched: false,
        invalid: false,
        visible: false,
        display: true,
        editable: true,
        loading: false,
        validating: false,
        errors: [],
        values: [{ cc: 123 }],
        effectErrors: [],
        warnings: [],
        effectWarnings: [],
        value: { cc: 123 },
        initialValue: undefined,
        rules: [],
        required: false,
        mounted: false,
        unmounted: false,
        props: {}
      },
      'aa.bb.cc': {
        name: 'aa.bb.cc',
        initialized: true,
        pristine: true,
        valid: true,
        touched: false,
        invalid: false,
        visible: false,
        display: true,
        editable: true,
        loading: false,
        validating: false,
        errors: [],
        values: [123],
        effectErrors: [],
        warnings: [],
        effectWarnings: [],
        value: 123,
        initialValue: undefined,
        rules: [],
        required: false,
        mounted: false,
        unmounted: false,
        props: {}
      }
    })
  })
})
