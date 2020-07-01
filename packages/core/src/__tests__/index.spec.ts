import { isEqual } from '@formily/shared'
import {
  createForm,
  LifeCycleTypes,
  FormLifeCycle,
  FormPath,
  registerValidationFormats,
  registerValidationRules,
  registerValidationMTEngine
} from '../index'
import { createFormInternals } from '../internals'
import { createFormExternals } from '../externals'
import { ValidateDescription, ValidatePatternRules } from '@formily/validator'

// mock datasource
const testValues = { aa: 111, bb: 222 }
const testValues2 = { aa: '123', bb: '321' }
const changeValues = { aa: 'change aa', bb: 'change bb' }
const resetInitValues = {
  aa: {
    bb: [{ aa: 123 }, { aa: 321 }]
  }
}
const deepValues = {
  a: {
    b: { c: { d: { e: 1 } } },
    c: {
      e: 2
    }
  },
  b: {
    c: 3
  }
}

const sleep = (d = 1000) =>
  new Promise(resolve => {
    setTimeout(() => {
      resolve()
    }, d)
  })

describe('createForm', () => {
  test('values', () => {
    const form = createForm({
      values: testValues
    })
    expect(form.getFormState(state => state.values)).toEqual(testValues)
    expect(form.getFormState(state => state.initialized)).toEqual(true)
    expect(form.getFormGraph()).toMatchSnapshot()
  })

  test('initialValues on init', () => {
    const form = createForm({
      initialValues: testValues
    })
    const aa = form.registerField({ path: 'aa' })
    const bb = form.registerField({ path: 'bb' })
    expect(form.getFormState(state => state.values)).toEqual(testValues)
    expect(form.getFormState(state => state.initialValues)).toEqual(testValues)
    expect(form.getFormState(state => state.initialized)).toEqual(true)
    expect(aa.getState(state => state.value)).toEqual(testValues.aa)
    expect(bb.getState(state => state.value)).toEqual(testValues.bb)
    expect(form.getFormGraph()).toMatchSnapshot()
  })

  test('merge values and initialValues', () => {
    const form = createForm({
      values: { a: 1, b: 2 },
      initialValues: { a: 'x', b: 'y' }
    })
    expect(form.getFormState(state => state.values)).toEqual({ a: 1, b: 2 })
    expect(form.getFormGraph()).toMatchSnapshot()
  })

  test('initialValues after init', () => {
    const form = createForm()
    const aa = form.registerField({ path: 'aa' })
    const bb = form.registerField({ path: 'bb' })
    form.setFormState(state => {
      state.initialValues = testValues
    })
    expect(form.getFormState(state => state.values)).toEqual(testValues)
    expect(form.getFormState(state => state.initialValues)).toEqual(testValues)
    expect(form.getFormState(state => state.initialized)).toEqual(true)
    expect(aa.getState(state => state.value)).toEqual(testValues.aa)
    expect(bb.getState(state => state.value)).toEqual(testValues.bb)
    expect(form.getFormGraph()).toMatchSnapshot()
  })

  test('initialValues then change field visible after init', () => {
    const form = createForm()
    const aa = form.registerField({ path: 'aa' })
    const bb = form.registerField({ path: 'bb' })
    expect(form.getFormState(state => state.initialized)).toEqual(true)
    aa.setState(state => (state.visible = false))
    form.setFormState(state => {
      state.initialValues = testValues
    })
    aa.setState(state => (state.visible = true))
    expect(form.getFormState(state => state.initialValues)).toEqual(testValues)
    expect(aa.getState(state => state.value)).toEqual(testValues.aa)
    expect(bb.getState(state => state.value)).toEqual(testValues.bb)
    expect(form.getFormState(state => state.values)).toEqual(testValues)

    expect(form.getFormGraph()).toMatchSnapshot()
  })

  test('initialValue', () => {
    const form = createForm({
      initialValues: testValues
    })
    expect(form.getFormState(state => state.values)).toEqual(testValues)
    expect(form.getFormState(state => state.initialValues)).toEqual(testValues)
    expect(form.getFormState(state => state.initialized)).toEqual(true)
    expect(form.getFormGraph()).toMatchSnapshot()
  })

  test('invalid initialValue will not trigger validate', async () => {
    const form = createForm()
    const field = form.registerField({
      name: 'aa',
      rules: [
        {
          required: true
        }
      ]
    })
    const mutators = form.createMutators(field)
    field.subscribe(() => {
      mutators.validate({ throwErrors: false })
    })
    form.setFormState(state => {
      state.initialValues = {
        aa: null
      }
    })
    field.getState() //手动同步状态，如果在React场景下，会在重新渲染的时候同步
    await sleep(10)
    expect(field.getState(state => state.errors).length).toEqual(0)
  })

  test('lifecycles', () => {
    const onFormInit = jest.fn()
    const onFieldInit = jest.fn()
    const onFieldChange = jest.fn()
    const form = createForm({
      initialValues: testValues,
      lifecycles: [
        new FormLifeCycle(LifeCycleTypes.ON_FORM_INIT, onFormInit),
        new FormLifeCycle(LifeCycleTypes.ON_FIELD_INIT, onFieldInit),
        new FormLifeCycle(LifeCycleTypes.ON_FIELD_CHANGE, onFieldChange)
      ]
    })

    const aa = form.registerField({ path: 'aa', value: testValues2.aa })
    const bb = form.registerField({ path: 'bb', value: testValues2.bb })

    // registerField will trigger ON_FIELD_CHANGE(because of initialized changed)
    expect(onFormInit).toBeCalledTimes(1)
    expect(onFieldInit).toBeCalledTimes(2)
    expect(onFieldChange).toBeCalledTimes(2)
    expect(form.getFormState(state => state.values)).toEqual(testValues2)

    // change field's value
    aa.setState(state => (state.value = changeValues.aa))
    bb.setState(state => (state.value = changeValues.bb))
    expect(onFieldChange).toBeCalledTimes(4)
    expect(form.getFormState(state => state.values)).toEqual(changeValues)
    expect(aa.getState(state => state.value)).toEqual(changeValues.aa)
    expect(bb.getState(state => state.value)).toEqual(changeValues.bb)
    expect(form.getFormGraph()).toMatchSnapshot()
  })
})

describe('graph', () => {
  test('getFormGraph', () => {
    const form = createForm({
      initialValues: testValues
    })

    form.registerField({ path: 'aa', value: changeValues.aa })
    form.registerField({ path: 'bb', value: changeValues.bb })
    expect(form.getFormGraph()).toMatchSnapshot()
  })

  test('setFormGraph', () => {
    const form = createForm({
      initialValues: testValues
    })

    form.registerField({ path: 'aa', value: changeValues.aa })
    form.registerField({ path: 'bb', value: changeValues.bb })
    const snapshot = form.getFormGraph()
    form.setFieldState('aa', state => (state.visible = false))
    expect(form.getFormGraph()).toMatchSnapshot()

    // change graph or you can also call it 'time travel'
    form.setFormGraph(snapshot)
    expect(form.getFormGraph()).toEqual(snapshot)
  })
})

describe('submit', () => {
  test('onSubmit', async () => {
    const onSubmitContructor = jest.fn()
    const onSubmitFn = jest.fn()
    const changeSubmitPayload = values => ({ hello: 'world' })
    const form1 = createForm({ onSubmit: onSubmitContructor })
    const form2 = createForm()

    expect(onSubmitContructor).toBeCalledTimes(0)
    expect(onSubmitContructor).toBeCalledTimes(0)
    await form1.submit()
    await form2.submit()
    expect(onSubmitContructor).toBeCalledTimes(1)
    expect(onSubmitFn).toBeCalledTimes(0)

    // priority: onSubmitFn > onSubmitContructor
    await form1.submit(onSubmitFn)
    await form2.submit(onSubmitFn)
    expect(onSubmitContructor).toBeCalledTimes(1)
    expect(onSubmitFn).toBeCalledTimes(2)
    const result = await form2.submit(changeSubmitPayload)
    expect(result).toEqual({
      values: {},
      validated: {
        errors: [],
        warnings: []
      },
      payload: { hello: 'world' }
    })
  })

  test('submitResult', async () => {
    const sunmitFailed = jest.fn()
    const form = createForm()
    form.registerField({
      path: 'a',
      rules: [
        value => {
          return value === undefined
            ? { type: 'error', message: 'a is required' }
            : null
        }
      ]
    })
    form.registerField({
      path: 'b',
      rules: [
        value => {
          return value === undefined
            ? { type: 'warning', message: 'b is required' }
            : null
        }
      ]
    })

    // error failed
    try {
      await form.submit()
    } catch (errors) {
      sunmitFailed()
      expect(errors).toEqual([
        { path: 'a', name: 'a', messages: ['a is required'] }
      ])
    }

    // warning pass
    form.setFieldValue('a', 1)
    let validated
    try {
      const result = await form.submit()
      validated = result.validated
    } catch (errors) {
      sunmitFailed()
    }

    expect(validated.warnings).toEqual([
      { path: 'b', name: 'b', messages: ['b is required'] }
    ])
    expect(validated.errors).toEqual([])
    expect(sunmitFailed).toHaveBeenCalledTimes(1)
  })

  test('repeat submit', async () => {
    const form = createForm()
    const result1 = form.submit()
    const result2 = form.submit()
    // reuse before result
    expect(result1).toEqual(result2)
  })

  test('basic', async () => {
    const onSubmitStart = jest.fn()
    const onSubmitEnd = jest.fn()
    const form = createForm({
      lifecycles: [
        new FormLifeCycle(LifeCycleTypes.ON_FORM_SUBMIT_START, onSubmitStart),
        new FormLifeCycle(LifeCycleTypes.ON_FORM_SUBMIT_END, onSubmitEnd)
      ],
      onSubmit: () => {
        expect(form.getFormState(state => state.submitting)).toEqual(true)
      }
    })
    expect(form.getFormState(state => state.submitting)).toEqual(false)
    expect(onSubmitStart).toBeCalledTimes(0)
    expect(onSubmitEnd).toBeCalledTimes(0)
    await form.submit()
    expect(form.getFormState(state => state.submitting)).toEqual(false)
    expect(onSubmitStart).toBeCalledTimes(1)
    expect(onSubmitEnd).toBeCalledTimes(1)
  })
})

describe('reset', () => {
  test('reset selector', async () => {
    const form = createForm({
      values: { a: 1, b: 2, c: 3 }
    })

    form.registerField({ path: 'a' })
    form.registerField({ path: 'b' })
    form.registerField({ path: 'c' })

    await form.reset({ selector: 'a' })
    expect(form.getFormState(state => state.values)).toEqual({
      a: undefined,
      b: 2,
      c: 3
    })
  })

  test('validate follow reset ', async () => {
    const form = createForm({
      values: {}
    })

    form.registerField({
      path: 'a',
      rules: [{ required: true, message: 'reset validate msg' }]
    })

    await form.reset()
    await form.validate('', { throwErrors: false })
    const errors = form.getFormState(state => state.errors)
    expect(errors).toEqual([
      { path: 'a', name: 'a', messages: ['reset validate msg'] }
    ])
  })

  test('array reset forceclear', async () => {
    const form = createForm({
      initialValues: resetInitValues
    })

    form.registerField({ path: 'aa' })
    form.registerField({ path: 'aa.bb' })
    form.registerField({ path: 'aa.bb.0' })
    form.registerField({ path: 'aa.bb.1' })
    form.registerField({ path: 'aa.bb.0.aa' })
    form.registerField({ path: 'aa.bb.1.aa' })
    expect(form.getFormGraph()).toMatchSnapshot()

    form.setFieldState('aa.bb.0.aa', state => {
      state.value = 'aa changed'
    })
    await form.reset({ forceClear: true })
    expect(form.getFormGraph()).toMatchSnapshot()
    expect(form.getFormState(state => state.values)).toEqual({ aa: {} })
    expect(form.getFormState(state => state.initialValues)).toEqual(
      resetInitValues
    )
  })

  test('array reset no forceclear(initial values)', async () => {
    const form = createForm({
      initialValues: resetInitValues
    })
    form.registerField({ path: 'aa' })
    form.registerField({ path: 'aa.bb' })
    form.registerField({ path: 'aa.bb.0' })
    form.registerField({ path: 'aa.bb.1' })
    form.registerField({ path: 'aa.bb.0.aa' })
    form.registerField({ path: 'aa.bb.1.aa' })
    expect(form.getFormGraph()).toMatchSnapshot()
    form.setFieldState('aa.bb.0.aa', state => {
      state.value = 'aa changed'
    })
    expect(form.getFormGraph()).toMatchSnapshot()
    await form.reset()
    expect(form.getFormGraph()).toMatchSnapshot()
    expect(form.getFormState(state => state.values)).toEqual(resetInitValues)
    expect(form.getFormState(state => state.initialValues)).toEqual(
      resetInitValues
    )
  })

  test('array reset no forceclear(values)', async () => {
    const form = createForm({
      values: resetInitValues
    })
    form.registerField({ path: 'aa' })
    form.registerField({ path: 'aa.bb' })
    form.registerField({ path: 'aa.bb.0' })
    form.registerField({ path: 'aa.bb.1' })
    form.registerField({ path: 'aa.bb.0.aa' })
    form.registerField({ path: 'aa.bb.1.aa' })
    expect(form.getFormGraph()).toMatchSnapshot()
    form.setFieldState('aa.bb.0.aa', state => {
      state.value = 'aa changed'
    })
    expect(form.getFormGraph()).toMatchSnapshot()
    await form.reset()
    expect(form.getFormGraph()).toMatchSnapshot()
    expect(form.getFormState(state => state.values)).toEqual({ aa: {} })
    expect(form.getFormState(state => state.initialValues)).toEqual({})
  })

  test('date reset', () => {
    const form = createForm({
      values: {},
      initialValues: {},
      onChange: values => {
        console.log(values)
      }
    })

    const aa = form.registerField({
      path: 'aa',
      initialValue: ''
    })

    aa.setState(state => {
      state.value = new Date()
    })

    form.reset()
    expect(form.getFormState(state => state.values.aa)).toBe('')
  })
})

describe('clearErrors', () => {
  test('basic', async () => {
    const form = createForm()
    const warnMsg = ['warning msg']
    const errMsg = ['error msg']
    form.registerField({
      path: 'b',
      rules: [
        v =>
          v === undefined
            ? { type: 'warning', message: 'warning msg' }
            : undefined
      ]
    }) // CustomValidator warning
    form.registerField({
      path: 'c',
      rules: [
        v =>
          v === undefined ? { type: 'error', message: 'error msg' } : undefined
      ]
    }) // CustomValidator error
    const result1 = await form.validate('', { throwErrors: false })
    expect(result1.warnings).toEqual([
      { path: 'b', name: 'b', messages: warnMsg }
    ])
    expect(result1.errors).toEqual([{ path: 'c', name: 'c', messages: errMsg }])

    form.clearErrors('b')
    expect(form.getFormState(state => state.warnings)).toEqual([])
    expect(form.getFormState(state => state.errors)).toEqual([
      { path: 'c', name: 'c', messages: errMsg }
    ])

    form.clearErrors('c')
    expect(form.getFormState(state => state.warnings)).toEqual([])
    expect(form.getFormState(state => state.errors)).toEqual([])

    const result2 = await form.validate('', { throwErrors: false })
    expect(result2.warnings).toEqual([
      { path: 'b', name: 'b', messages: warnMsg }
    ])
    expect(result2.errors).toEqual([{ path: 'c', name: 'c', messages: errMsg }])

    form.clearErrors()
    expect(form.getFormState(state => state.warnings)).toEqual([])
    expect(form.getFormState(state => state.errors)).toEqual([])
  })

  test('wildcard path', async () => {})

  test('effect', async () => {})
})

describe('validate', () => {
  test('empty', async () => {
    const form = createForm()
    const { warnings, errors } = await form.validate()
    expect(warnings).toEqual([])
    expect(errors).toEqual([])
  })

  // issue#543 增加dataPath
  test('onValidateFailed(dataPath)', async () => {
    const onValidateFailedTrigger = jest.fn()
    const onValidateFailed = ({ warnings, errors }) => {
      expect(warnings).toEqual([
        {
          path: 'NO_NAME_FIELDS_$1.foo.boo',
          name: 'foo.boo',
          messages: ['warning msg']
        }
      ])
      expect(errors).toEqual([
        {
          path: 'NO_NAME_FIELDS_$1.foo.bar',
          name: 'foo.bar',
          messages: ['error msg']
        }
      ])
      onValidateFailedTrigger()
    }
    const form = createForm({
      onValidateFailed
    })

    form.registerVirtualField({ path: 'NO_NAME_FIELDS_$1' })
    form.registerField({ path: 'NO_NAME_FIELDS_$1.foo' })
    form.registerField({
      path: 'NO_NAME_FIELDS_$1.foo.bar',
      rules: [() => ({ type: 'error', message: 'error msg' })]
    })
    form.registerField({
      path: 'NO_NAME_FIELDS_$1.foo.boo',
      rules: [() => ({ type: 'warning', message: 'warning msg' })]
    })

    try {
      await form.submit()
    } catch (e) {}
    expect(onValidateFailedTrigger).toBeCalledTimes(1)
  })

  test('onValidateFailed', async () => {
    const onValidateFailedTrigger = jest.fn()
    const onValidateFailed = ({ warnings, errors }) => {
      expect(warnings).toEqual([
        { path: 'b', name: 'b', messages: ['warning msg'] }
      ])
      expect(errors).toEqual([
        { path: 'c', name: 'c', messages: ['error msg'] }
      ])
      onValidateFailedTrigger()
    }
    const form = createForm({
      onValidateFailed
    })
    form.registerField({
      path: 'b',
      rules: [() => ({ type: 'warning', message: 'warning msg' })]
    }) // CustomValidator warning
    form.registerField({
      path: 'c',
      rules: [() => ({ type: 'error', message: 'error msg' })]
    }) // CustomValidator error
    try {
      await form.submit()
    } catch (e) {}
    expect(onValidateFailedTrigger).toBeCalledTimes(1)
  })

  test('validate basic', async () => {
    const onValidateStart = jest.fn()
    const onValidateEnd = jest.fn()
    const form = createForm({
      lifecycles: [
        new FormLifeCycle(
          LifeCycleTypes.ON_FORM_VALIDATE_START,
          onValidateStart
        ),
        new FormLifeCycle(LifeCycleTypes.ON_FORM_VALIDATE_END, onValidateEnd)
      ]
    })
    form.registerField({ path: 'a', rules: ['number'] }) // string
    form.registerField({
      path: 'b',
      rules: [() => ({ type: 'warning', message: 'warning msg' })]
    }) // CustomValidator warning
    form.registerField({
      path: 'c',
      rules: [() => ({ type: 'error', message: 'warning msg' })]
    }) // CustomValidator error
    form.registerField({ path: 'd', rules: [() => 'straight error msg'] }) // CustomValidator string
    form.registerField({
      path: 'e',
      rules: [{ required: true, message: 'desc msg' }]
    }) // ValidateDescription

    expect(onValidateStart).toBeCalledTimes(0)
    expect(onValidateEnd).toBeCalledTimes(0)
    expect(form.getFormState(state => state.validating)).toEqual(false)
    const validatePromise = form.validate()
    expect(form.getFormState(state => state.validating)).toEqual(true)
    expect(onValidateStart).toBeCalledTimes(1)
    validatePromise.catch(validated => {
      expect(form.getFormState(state => state.validating)).toEqual(false)
      expect(onValidateEnd).toBeCalledTimes(1)
      const { warnings, errors } = validated
      expect(warnings.length).toEqual(1)
      expect(errors.length).toEqual(3)
    })
  })

  test('path', async () => {
    const form = createForm()
    form.registerField({
      path: 'b',
      rules: [
        v =>
          v === undefined
            ? { type: 'warning', message: 'warning msg' }
            : undefined
      ]
    }) // CustomValidator warning
    form.registerField({
      path: 'c',
      rules: [
        v =>
          v === undefined ? { type: 'error', message: 'error msg' } : undefined
      ]
    }) // CustomValidator error
    const bResult = await form.validate('b', { throwErrors: false })
    expect(bResult.warnings).toEqual([
      { path: 'b', name: 'b', messages: ['warning msg'] }
    ])
    expect(bResult.errors).toEqual([])
    expect(form.getFieldState('b', state => state.warnings)).toEqual([
      'warning msg'
    ])

    expect(form.getFieldState('c', state => state.errors)).toEqual([])
    expect(form.getFormState(state => state.warnings)).toEqual([
      { path: 'b', name: 'b', messages: ['warning msg'] }
    ])
    expect(form.getFormState(state => state.errors)).toEqual([])

    const cResult = await form.validate('c', { throwErrors: false })
    expect(cResult.warnings).toEqual([])
    expect(cResult.errors).toEqual([
      { path: 'c', name: 'c', messages: ['error msg'] }
    ])

    expect(form.getFieldState('b', state => state.warnings)).toEqual([
      'warning msg'
    ])
    expect(form.getFieldState('c', state => state.errors)).toEqual([
      'error msg'
    ])
    expect(form.getFormState(state => state.warnings)).toEqual([
      { path: 'b', name: 'b', messages: ['warning msg'] }
    ])
    expect(form.getFormState(state => state.errors)).toEqual([
      { path: 'c', name: 'c', messages: ['error msg'] }
    ])

    form.setFieldValue('b', 1)
    form.setFieldValue('c', 1)
    const bResult2 = await form.validate('b')
    const cResult2 = await form.validate('c')
    expect(bResult2.warnings).toEqual([])
    expect(bResult2.errors).toEqual([])
    expect(cResult2.warnings).toEqual([])
    expect(cResult2.errors).toEqual([])
    expect(form.getFieldState('b', state => state.warnings)).toEqual([])
    expect(form.getFieldState('c', state => state.errors)).toEqual([])
    expect(form.getFormState(state => state.warnings)).toEqual([])
    expect(form.getFormState(state => state.errors)).toEqual([])
  })
})

describe('setFormState', () => {
  test('no callback', async () => {
    const form = createForm()
    const state = form.getFormState()
    form.setFormState()
    expect(form.getFormState()).toEqual(state)
  })

  test('set', async () => {
    const form = createForm()
    // pristine 依赖 draft.values === draft.initialValues
    // invalid 依赖 errors.length === 0
    // valid 是 invalid的取反
    // loading 取决于validating
    // mounted 和 unmounted 互为取反，先读mounted
    // errors, warnings 无法被设置，会从最新的state中获取
    form.registerField({
      path: 'b',
      rules: [
        v =>
          v === undefined
            ? { type: 'warning', message: 'warning msg' }
            : undefined
      ]
    }) // CustomValidator warning
    form.registerField({
      path: 'c',
      rules: [
        v =>
          v === undefined ? { type: 'error', message: 'error msg' } : undefined
      ]
    }) // CustomValidator error
    const values = { b: '2' }
    const initialValues = { a: '1' }
    const validating = true
    form.setFormState(state => {
      state.pristine = false
      state.valid = false
      state.invalid = false
      state.loading = false
      state.validating = validating
      state.submitting = true
      state.initialized = false
      state.editable = false
      state.values = values
      state.initialValues = initialValues
      state.mounted = true
      state.unmounted = true
      state.props = { hello: 'world' }
    })
    const { warnings, errors } = form.getFormState(({ warnings, errors }) => ({
      warnings,
      errors
    }))
    expect(form.getFormState()).toEqual({
      displayName: 'FormState',
      pristine: isEqual(values, initialValues),
      valid: true,
      invalid: false,
      loading: validating,
      validating: validating,
      submitting: true,
      initialized: false,
      modified: true,
      editable: false,
      errors,
      warnings,
      values: {
        a: '1',
        b: '2'
      },
      initialValues,
      mounted: true,
      unmounted: false,
      props: { hello: 'world' }
    })
  })

  test('set with slient', async () => {
    const fieldChange = jest.fn()
    const formChange = jest.fn()
    const form = createForm({
      lifecycles: [
        new FormLifeCycle(LifeCycleTypes.ON_FIELD_CHANGE, fieldChange),
        new FormLifeCycle(LifeCycleTypes.ON_FORM_CHANGE, formChange)
      ]
    })

    const a = form.registerField({ path: 'a' })

    form.setFormState(state => {
      state.values = { a: '1234' }
    })
    a.getState() //手动同步
    expect(form.getFormState(state => state.values)).toEqual({ a: '1234' })
    expect(fieldChange).toBeCalledTimes(1)
    expect(formChange).toBeCalledTimes(2)

    form.setFormState(state => (state.values = { a: '5678' }), true)
    a.getState() //手动同步
    expect(form.getFormState(state => state.values)).toEqual({ a: '5678' })
    expect(formChange).toBeCalledTimes(2)
    expect(fieldChange).toBeCalledTimes(1)
  })
})

describe('getFormState', () => {
  test('basic', async () => {
    const form = createForm()
    const state = form.getFormState()
    expect(state).toEqual(form.getFormState(state => state))
    expect(form.getFormState(state => state.pristine)).toEqual(state.pristine)
    expect(form.getFormState(state => state.valid)).toEqual(state.valid)
    expect(form.getFormState(state => state.invalid)).toEqual(state.invalid)
    expect(form.getFormState(state => state.loading)).toEqual(state.loading)
    expect(form.getFormState(state => state.validating)).toEqual(
      state.validating
    )
    expect(form.getFormState(state => state.submitting)).toEqual(
      state.submitting
    )
    expect(form.getFormState(state => state.initialized)).toEqual(
      state.initialized
    )
    expect(form.getFormState(state => state.editable)).toEqual(state.editable)
    expect(form.getFormState(state => state.errors)).toEqual(state.errors)
    expect(form.getFormState(state => state.warnings)).toEqual(state.warnings)
    expect(form.getFormState(state => state.values)).toEqual(state.values)
    expect(form.getFormState(state => state.initialValues)).toEqual(
      state.initialValues
    )
    expect(form.getFormState(state => state.mounted)).toEqual(state.mounted)
    expect(form.getFormState(state => state.unmounted)).toEqual(state.unmounted)
    expect(form.getFormState(state => state.props)).toEqual(state.props)
  })
})

describe('setFieldState', () => {
  test('no callback', async () => {
    const form = createForm()
    form.registerField({ path: 'a' })
    const state = form.getFieldState('a')
    form.setFieldState('a')
    expect(form.getFieldState('a')).toEqual(state)
  })

  test('set with slient', async () => {
    const fieldChange = jest.fn()
    const form = createForm({
      lifecycles: [
        new FormLifeCycle(LifeCycleTypes.ON_FIELD_CHANGE, fieldChange)
      ]
    })
    form.registerField({ path: 'a' })
    form.getFieldState('a')
    form.setFieldState('a', state => (state.value = '1234'))
    expect(form.getFieldState('a', state => state.value)).toEqual('1234')
    expect(fieldChange).toBeCalledTimes(2)

    form.setFieldState('a', state => (state.value = '5678'), true)
    expect(form.getFieldState('a', state => state.value)).toEqual('5678')
    expect(fieldChange).toBeCalledTimes(2)
  })

  test('validating and loading', () => {
    const form = createForm()
    form.registerField({
      path: 'a',
      rules: [
        v =>
          v === undefined
            ? { type: 'warning', message: 'warning msg' }
            : undefined,
        v =>
          v === undefined ? { type: 'error', message: 'error msg' } : undefined
      ]
    })
    expect(form.getFieldState('a', state => state.validating)).toEqual(false)
    expect(form.getFieldState('a', state => state.loading)).toEqual(false)
    form.setFieldState('a', state => (state.validating = true))
    expect(form.getFieldState('a', state => state.loading)).toEqual(true)
    form.setFieldState('a', state => (state.validating = false))
    expect(form.getFieldState('a', state => state.loading)).toEqual(false)
  })

  test('value, values and parseValues', () => {
    const form = createForm()
    form.registerField({ path: 'a' })
    expect(form.getFieldState('a', state => state.modified)).toEqual(false)
    expect(form.getFieldState('a', state => state.value)).toEqual(undefined)
    expect(form.getFieldState('a', state => state.values)).toEqual([undefined])
    const arr = [1, 2, 3]
    form.setFieldState('a', state => (state.value = arr))
    expect(form.getFieldState('a', state => state.modified)).toEqual(true)
    expect(form.getFieldState('a', state => state.value)).toEqual(arr)
    expect(form.getFieldState('a', state => state.values)).toEqual([arr])
    form.setFieldState('a', state => (state.values = ['e', 'context']))
    // values 第一个参数会是value, 处理onChange的多参数一般会和values[0]同步，这里value测试极端情况
    expect(form.getFieldState('a', state => state.value)).toEqual('e')
    expect(form.getFieldState('a', state => state.values)).toEqual([
      'e',
      'context'
    ])
    // visible为false或者已卸载的组件无法修改value
    form.setFieldState('a', state => (state.visible = false))
    form.setFieldState('a', state => (state.value = [4, 5, 6]))
    expect(form.getFieldState('a', state => state.value)).toEqual([4, 5, 6])
    form.setFieldState('a', state => {
      state.visible = true
      state.unmounted = true
    })
    form.setFieldState('a', state => (state.value = [4, 5, 6]))
    expect(form.getFieldState('a', state => state.value)).toEqual([4, 5, 6])
  })

  test('mount and unmount', () => {
    const form = createForm()
    form.registerField({ path: 'a' })
    expect(form.getFieldState('a', state => state.mounted)).toEqual(false)
    expect(form.getFieldState('a', state => state.unmounted)).toEqual(false)
    form.setFieldState('a', state => (state.mounted = true))
    expect(form.getFieldState('a', state => state.mounted)).toEqual(true)
    expect(form.getFieldState('a', state => state.unmounted)).toEqual(false)
  })

  test('rules, required and parseRules', () => {
    const form = createForm()
    form.registerField({ path: 'a' })
    expect(form.getFieldState('a', state => state.required)).toEqual(false)
    expect(form.getFieldState('a', state => state.rules)).toEqual([])
    form.setFieldState('a', state => (state.required = true))
    expect(form.getFieldState('a', state => state.required)).toEqual(true)
    const customValidator: ValidatePatternRules[] = [
      (v, _: ValidateDescription) =>
        v === undefined ? { type: 'warning', message: 'warning msg' } : null
    ]
    form.setFieldState('a', state => (state.rules = customValidator))
    const rules = form.getFieldState('a', state => state.rules)
    expect(rules).toEqual([...customValidator])
  })

  test('pristine', () => {
    // 无法被修改，依赖value和initialValue的差别
    const form = createForm()
    form.registerField({ path: 'a' })
    expect(form.getFieldState('a', state => state.pristine)).toEqual(true)
    form.setFieldState('a', state => (state.pristine = false))
    expect(form.getFieldState('a', state => state.pristine)).toEqual(false)
    form.setFieldState('a', state => (state.value = '1'))
    expect(form.getFieldState('a', state => state.pristine)).toEqual(false)
    form.setFieldState('a', state => (state.initialValue = '1'))
    expect(form.getFieldState('a', state => state.pristine)).toEqual(true)
  })

  test('invalid 和 valid', () => {
    // 无法被修改，依赖错误信息和告警信息
    const form = createForm()
    form.registerField({ path: 'a' })
    expect(form.getFieldState('a', state => state.invalid)).toEqual(false)
    expect(form.getFieldState('a', state => state.valid)).toEqual(true)
    form.setFieldState('a', state => (state.invalid = true))
    form.setFieldState('a', state => (state.valid = false))
    expect(form.getFieldState('a', state => state.invalid)).toEqual(false)
    expect(form.getFieldState('a', state => state.valid)).toEqual(true)
  })

  test('set errors and warnings', async () => {
    const form = createForm()
    const a = form.registerField({
      path: 'a',
      rules: [
        v =>
          v === undefined
            ? { type: 'warning', message: 'warning msg' }
            : undefined,
        v =>
          v === undefined ? { type: 'error', message: 'error msg' } : undefined
      ]
    })
    const state = form.getFieldState('a')
    expect(state.effectErrors).toEqual([])
    expect(state.effectWarnings).toEqual([])
    expect(state.ruleErrors).toEqual([])
    expect(state.ruleWarnings).toEqual([])

    const mutators = form.createMutators(a)
    const result = await mutators.validate({ throwErrors: false })
    expect(result.errors).toEqual([
      { path: 'a', name: 'a', messages: ['error msg'] }
    ])
    expect(result.warnings).toEqual([
      { path: 'a', name: 'a', messages: ['warning msg'] }
    ])

    // 校验后影响的是ruleErrors, ruleWarnings
    const state2 = form.getFieldState('a')
    expect(state2.effectErrors).toEqual([])
    expect(state2.effectWarnings).toEqual([])
    expect(state2.ruleErrors).toEqual(['error msg'])
    expect(state2.ruleWarnings).toEqual(['warning msg'])
    expect(state2.errors).toEqual(['error msg'])
    expect(state2.warnings).toEqual(['warning msg'])

    // effectError 和 effectWarnings 需要通过设置 errors 和 warning 进行设置
    // 看起来有问题，但是对于开发者并不透出effectErrors的概念，只让他感知这是errors
    // errors = effectErrors + ruleErrors
    // warnings = effectWarnings + ruleWarnings
    form.setFieldState('a', state => (state.errors = ['effect errors msg']))
    form.setFieldState('a', state => (state.warnings = ['effect warning msg']))
    const state3 = form.getFieldState('a')
    expect(state3.effectErrors).toEqual(['effect errors msg'])
    expect(state3.effectWarnings).toEqual(['effect warning msg'])
    expect(state3.errors).toEqual(['error msg', 'effect errors msg'])
    expect(state3.warnings).toEqual(['warning msg', 'effect warning msg'])

    // 不可编辑，清空所有错误和警告信息
    form.setFieldState('a', state => (state.editable = false))
    const state4 = form.getFieldState('a')
    expect(state4.effectErrors).toEqual([])
    expect(state4.effectWarnings).toEqual([])
    expect(state4.errors).toEqual([])
    expect(state4.warnings).toEqual([])
    form.setFieldState('a', state => (state.editable = true))

    // 隐藏，清空所有错误和警告信息
    await mutators.validate({ throwErrors: false })

    form.setFieldState('a', state => (state.errors = ['effect errors msg']))
    form.setFieldState('a', state => (state.warnings = ['effect warning msg']))
    form.setFieldState('a', state => (state.visible = false))
    const state6 = form.getFieldState('a')
    expect(state6.effectErrors).toEqual([])
    expect(state6.effectWarnings).toEqual([])
    expect(state6.errors).toEqual([])
    expect(state6.warnings).toEqual([])

    // 卸载组件，清空所有错误和警告信息
    await mutators.validate({ throwErrors: false })

    form.setFieldState('a', state => (state.errors = ['effect errors msg']))
    form.setFieldState('a', state => (state.warnings = ['effect warning msg']))
    const state7 = form.getFieldState('a')
    expect(state7.effectErrors).toEqual([])
    expect(state7.effectWarnings).toEqual([])
    expect(state7.errors).toEqual([])
    expect(state7.warnings).toEqual([])
  })

  test('set editable', async () => {
    const form = createForm()
    form.registerField({ path: 'a' })
    const state = form.getFieldState('a')

    // 初始化
    expect(state.editable).toEqual(true)
    expect(state.selfEditable).toEqual(undefined)
    expect(state.formEditable).toEqual(true)
    expect(form.getFieldState('a', state => state.editable)).toEqual(true)
    // 简单设置 (editable会影响selfEditable)
    form.setFieldState('a', state => (state.editable = false))
    expect(form.getFieldState('a', state => state.editable)).toEqual(false)
    expect(form.getFieldState('a', state => state.selfEditable)).toEqual(false)
    // 设置影响计算的值selfEditable
    form.setFieldState('a', state => (state.selfEditable = true))
    expect(form.getFieldState('a', state => state.editable)).toEqual(true)
    // 设置影响计算的值formEditable(selfEditable优先级高于formEditable)
    form.setFieldState('a', state => (state.selfEditable = false))
    form.setFieldState('a', state => (state.formEditable = true))
    expect(form.getFieldState('a', state => state.editable)).toEqual(false)
    // 支持函数(UI层传入)
    form.setFieldState('a', state => (state.formEditable = () => true))
    expect(form.getFieldState('a', state => state.editable)).toEqual(false)
    // editable会影响selfEditable, 设置顺序又因为 editable > selfEditable > formEditable
    // 前两者都无效时，最终返回formEditable的值
    form.setFieldState('a', state => (state.editable = false))
    form.setFieldState('a', state => (state.formEditable = () => false))
    expect(form.getFieldState('a', state => state.selfEditable)).toEqual(
      false
    )
    expect(form.getFieldState('a', state => state.editable)).toEqual(false)
  })

  test('set visible', async () => {
    const form = createForm()
    form.registerVirtualField({ path: 'a' })
    form.registerField({ path: 'a.a1', visible: false })
    form.registerField({ path: 'a.a2' })

    form.setFieldState('a', state => (state.visible = false))
    expect(form.getFieldState('a', state => state.visible)).toEqual(false)
    expect(form.getFieldState('a.a1', state => state.visible)).toEqual(false)
    expect(form.getFieldState('a.a2', state => state.visible)).toEqual(false)

    form.setFieldState('a', state => (state.visible = true))
    expect(form.getFieldState('a', state => state.visible)).toEqual(true)
    expect(form.getFieldState('a.a1', state => state.visible)).toEqual(false)
    expect(form.getFieldState('a.a2', state => state.visible)).toEqual(true)
  })

  test('set display', async () => {
    const form = createForm()
    form.registerField({ path: 'a' })
    form.registerField({ path: 'a.a1', display: false })
    form.registerField({ path: 'a.a2' })

    form.setFieldState('a', state => (state.display = false))
    expect(form.getFieldState('a', state => state.display)).toEqual(false)
    expect(form.getFieldState('a.a1', state => state.display)).toEqual(false)
    expect(form.getFieldState('a.a2', state => state.display)).toEqual(false)

    form.setFieldState('a', state => (state.display = true))
    expect(form.getFieldState('a', state => state.display)).toEqual(true)
    expect(form.getFieldState('a.a1', state => state.display)).toEqual(false)
    expect(form.getFieldState('a.a2', state => state.display)).toEqual(true)
  })
})

describe('getFieldState', () => {
  const form = createForm()
  form.registerField({ path: 'a' })
  const state = form.getFieldState('a')
  expect(state).toEqual(form.getFieldState('a', state => state))
  expect(form.getFieldState('a', state => state.name)).toEqual(state.name)
  expect(form.getFieldState('a', state => state.initialized)).toEqual(
    state.initialized
  )
  expect(form.getFieldState('a', state => state.pristine)).toEqual(
    state.pristine
  )
  expect(form.getFieldState('a', state => state.valid)).toEqual(state.valid)
  expect(form.getFieldState('a', state => state.touched)).toEqual(state.touched)
  expect(form.getFieldState('a', state => state.invalid)).toEqual(state.invalid)
  expect(form.getFieldState('a', state => state.visible)).toEqual(state.visible)
  expect(form.getFieldState('a', state => state.display)).toEqual(state.display)
  expect(form.getFieldState('a', state => state.editable)).toEqual(
    state.editable
  )
  expect(form.getFieldState('a', state => state.formEditable)).toEqual(
    state.formEditable
  )
  expect(form.getFieldState('a', state => state.loading)).toEqual(state.loading)
  expect(form.getFieldState('a', state => state.modified)).toEqual(
    state.modified
  )
  expect(form.getFieldState('a', state => state.active)).toEqual(state.active)
  expect(form.getFieldState('a', state => state.visited)).toEqual(state.visited)
  expect(form.getFieldState('a', state => state.validating)).toEqual(
    state.validating
  )
  expect(form.getFieldState('a', state => state.errors)).toEqual(state.errors)
  expect(form.getFieldState('a', state => state.values)).toEqual(state.values)
  expect(form.getFieldState('a', state => state.effectErrors)).toEqual(
    state.effectErrors
  )
  expect(form.getFieldState('a', state => state.warnings)).toEqual(
    state.warnings
  )
  expect(form.getFieldState('a', state => state.effectWarnings)).toEqual(
    state.effectWarnings
  )
  expect(form.getFieldState('a', state => state.value)).toEqual(state.value)
  expect(form.getFieldState('a', state => state.initialValue)).toEqual(
    state.initialValue
  )
  expect(form.getFieldState('a', state => state.rules)).toEqual(state.rules)
  expect(form.getFieldState('a', state => state.required)).toEqual(
    state.required
  )
  expect(form.getFieldState('a', state => state.mounted)).toEqual(state.mounted)
  expect(form.getFieldState('a', state => state.unmounted)).toEqual(
    state.unmounted
  )
  expect(form.getFieldState('a', state => state.props)).toEqual(state.props)
})

describe('setFieldValue', () => {
  const form = createForm()
  form.registerField({ path: 'a' })
  form.setFieldValue('a')
  expect(form.getFieldValue('a')).toEqual(undefined)
  expect(form.getFieldState('a', state => state.value)).toEqual(undefined)
  expect(form.getFormState(state => state.values)).toEqual({ a: undefined })
  form.setFieldValue('a', 1)
  expect(form.getFieldValue('a')).toEqual(1)
  expect(form.getFieldState('a', state => state.value)).toEqual(1)
  expect(form.getFormState(state => state.values)).toEqual({ a: 1 })
})

describe('getFieldValue', () => {
  test('normal path', async () => {
    const form = createForm({ values: deepValues })
    form.registerField({ path: 'a' })
    form.registerField({ path: 'a.b' })
    form.registerField({ path: 'a.b.c' })
    form.registerField({ path: 'a.b.c.d' })
    form.registerField({ path: 'a.b.c.d.e' })

    expect(form.getFieldValue('a')).toEqual(deepValues.a)
    expect(form.getFieldValue('a.b')).toEqual(deepValues.a.b)
    expect(form.getFieldValue('a.b.c')).toEqual(deepValues.a.b.c)
    expect(form.getFieldValue('a.b.c.d')).toEqual(deepValues.a.b.c.d)
    expect(form.getFieldValue('a.b.c.d.e')).toEqual(deepValues.a.b.c.d.e)
  })

  test('virtual path', async () => {
    const form = createForm({ values: deepValues })
    form.registerField({ path: 'a' })
    form.registerVirtualField({ path: 'a.b' })
    form.registerField({ path: 'a.b.c' })
    form.registerVirtualField({ path: 'a.b.c.d' })
    form.registerField({ path: 'a.b.c.d.e' })

    expect(form.getFieldValue('a')).toEqual(deepValues.a)
    expect(form.getFieldValue('a.b')).toEqual(undefined)
    expect(form.getFieldValue('a.b.c')).toEqual(deepValues.a.c)
    expect(form.getFieldValue('a.b.c.d')).toEqual(undefined)
    expect(form.getFieldValue('a.b.c.d.e')).toEqual(deepValues.a.c.e)
  })

  test('virtual path(head)', async () => {
    const form = createForm({ values: deepValues })
    form.registerVirtualField({ path: 'a' })
    form.registerField({ path: 'a.b' })
    form.registerField({ path: 'a.b.c' })

    expect(form.getFieldValue('a')).toEqual(undefined)
    expect(form.getFieldValue('a.b')).toEqual(deepValues.b)
    expect(form.getFieldValue('a.b.c')).toEqual(deepValues.b.c)
  })
})

describe('registerField', () => {
  test('basic', async () => {
    const form = createForm({ values: { a: 1 } })
    form.registerField({ path: 'a' })
    form.registerField({ path: 'b' })
    form.registerField({ path: 'c' })
    form.registerField({ path: 'd', editable: false })
    form.registerField({ path: 'e', editable: true })
    expect(form.getFieldValue('a')).toEqual(1)
    expect(form.getFieldValue('b')).toEqual(undefined)
    expect(form.getFieldState('a', state => state.values)).toEqual([1])
    expect(form.getFieldState('b', state => state.values)).toEqual([undefined])
    expect(form.getFieldState('c', state => state.editable)).toEqual(true)
    expect(form.getFieldState('d', state => state.editable)).toEqual(false)
    expect(form.getFieldState('e', state => state.editable)).toEqual(true)
  })

  test('merge', async () => {
    const form = createForm({ values: { a: 1, b: 2, c: 3, d: 4 } })
    form.registerField({ path: 'a' })
    form.registerField({ path: 'b', value: 'x' })
    form.registerField({ path: 'c', initialValue: 'y' })
    form.registerField({ path: 'd', initialValue: 'z', value: 's' })
    expect(form.getFieldValue('a')).toEqual(1)
    expect(form.getFieldValue('b')).toEqual('x')
    expect(form.getFieldValue('c')).toEqual(3) // false, 得到y
    expect(form.getFieldValue('d')).toEqual('s')
  })
})

describe('registerVirtualField', () => {
  test('basic', async () => {
    const vprops = { hello: 'world' }
    const form = createForm({ values: { a: 1 } })
    form.registerVirtualField({ path: 'a' })
    form.registerVirtualField({ path: 'b' })
    form.registerVirtualField({ path: 'c', props: vprops })
    expect(form.getFieldValue('a')).toEqual(undefined)
    expect(form.getFieldState('a', state => state.values)).toEqual(undefined) // 不存在这个属性
    expect(form.getFieldState('c', state => state.props)).toEqual(vprops)
    expect(form.getFieldState('b', state => state.display)).toEqual(true)
    expect(form.getFieldState('b', state => state.visible)).toEqual(true)
    form.setFieldState('b', state => (state.display = false))
    expect(form.getFieldState('b', state => state.display)).toEqual(false)
    form.setFieldState('b', state => (state.visible = false))
    expect(form.getFieldState('b', state => state.visible)).toEqual(false)
  })
})

describe('createMutators', () => {
  const arr = ['a', 'b']
  test('change', async () => {
    const form = createForm()
    const a = form.registerField({ path: 'a' })
    const mutators = form.createMutators(a)
    expect(
      form.getFieldState('a', state => ({
        values: state.values,
        value: state.value
      }))
    ).toEqual({
      value: undefined,
      values: [undefined]
    })
    mutators.change(1, 2, 3, 4)
    expect(
      form.getFieldState('a', state => ({
        values: state.values,
        value: state.value
      }))
    ).toEqual({
      value: 1,
      values: [1, 2, 3, 4]
    })
  })

  test('focus', async () => {
    const form = createForm()
    const a = form.registerField({ path: 'a' })
    const mutators = form.createMutators(a)
    expect(form.getFormGraph()).toMatchSnapshot()
    expect(
      form.getFieldState('a', state => ({
        active: state.active,
        visited: state.visited
      }))
    ).toEqual({
      active: false,
      visited: false
    })
    mutators.focus()
    expect(form.getFormGraph()).toMatchSnapshot()
    expect(
      form.getFieldState('a', state => ({
        active: state.active,
        visited: state.visited
      }))
    ).toEqual({
      active: true,
      visited: false
    })
    mutators.blur()
    expect(
      form.getFieldState('a', state => ({
        active: state.active,
        visited: state.visited
      }))
    ).toEqual({
      active: false,
      visited: true
    })
  })

  test('blur', async () => {
    const form = createForm()
    const a = form.registerField({ path: 'a' })
    const mutators = form.createMutators(a)
    expect(form.getFormGraph()).toMatchSnapshot()
    expect(
      form.getFieldState('a', state => ({
        active: state.active,
        visited: state.visited
      }))
    ).toEqual({
      active: false,
      visited: false
    })
    mutators.focus()
    mutators.blur()
    expect(form.getFormGraph()).toMatchSnapshot()
    expect(
      form.getFieldState('a', state => ({
        active: state.active,
        visited: state.visited
      }))
    ).toEqual({
      active: false,
      visited: true
    })
  })

  test('push', async () => {
    const form = createForm()
    const mm = form.registerField({ path: 'mm', value: [] })
    const mutators = form.createMutators(mm)
    expect(form.getFieldValue('mm')).toEqual([])
    mutators.push({})
    expect(form.getFieldValue('mm')).toEqual([{}])
  })

  test('pop', async () => {
    const form = createForm()
    const mm = form.registerField({ path: 'mm', value: [{}] })
    const mutators = form.createMutators(mm)
    expect(form.getFieldValue('mm')).toEqual([{}])
    mutators.pop()
    expect(form.getFieldValue('mm')).toEqual([])
  })

  test('insert', async () => {
    const form = createForm()
    const mm = form.registerField({ path: 'mm', value: arr })
    const mutators = form.createMutators(mm)
    expect(form.getFieldValue('mm')).toEqual(arr)
    mutators.insert(1, 'x')
    expect(form.getFieldValue('mm')).toEqual(['a', 'x', 'b'])
  })

  test('remove', async () => {
    const form = createForm()
    const mm = form.registerField({ path: 'mm', value: arr })
    const mutators = form.createMutators(mm)
    expect(form.getFieldValue('mm')).toEqual(arr)
    mutators.remove(1)
    expect(form.getFieldValue('mm')).toEqual(arr.slice(0, 1))
  })

  test('remove object key', async () => {
    const form = createForm()
    const initialValue = { username: '1234' }
    const user = form.registerField({ path: 'user', initialValue })
    form.registerField({ path: 'user.username' })
    const mutators = form.createMutators(user)
    expect(form.getFieldValue('user')).toEqual(initialValue)
    mutators.remove('username')
    expect(form.getFieldValue('user')).toEqual({})
  })

  test('exist', async () => {
    const form = createForm()
    const mm = form.registerField({ path: 'mm', value: arr })
    const mutators = form.createMutators(mm)
    expect(mutators.exist(1)).toEqual(true)
  })

  test('shift', async () => {
    const form = createForm()
    const mm = form.registerField({ path: 'mm', value: arr })
    const mutators = form.createMutators(mm)
    expect(form.getFieldValue('mm')).toEqual(arr)
    mutators.shift()
    expect(form.getFieldValue('mm')).toEqual(arr.slice(1))
  })

  test('unshift', async () => {
    const form = createForm()
    const mm = form.registerField({ path: 'mm', value: arr })
    const mutators = form.createMutators(mm)
    expect(form.getFieldValue('mm')).toEqual(arr)
    mutators.unshift('x')
    expect(form.getFieldValue('mm')).toEqual(['x', ...arr])
  })

  test('move', async () => {
    const form = createForm()
    const mm = form.registerField({ path: 'mm', value: arr })
    const mutators = form.createMutators(mm)
    expect(form.getFieldValue('mm')).toEqual(arr)
    mutators.move(0, 1)
    expect(form.getFieldValue('mm')).toEqual(arr.reverse())
  })

  test('validate', async () => {
    const form = createForm()
    const mm = form.registerField({
      path: 'mm',
      rules: [
        v =>
          v === undefined
            ? { type: 'warning', message: 'warning msg' }
            : undefined
      ]
    })
    const mutators = form.createMutators(mm)
    const result = await mutators.validate()
    expect(result.errors).toEqual([])
    expect(result.warnings).toEqual([
      { path: 'mm', name: 'mm', messages: ['warning msg'] }
    ])
    mutators.change(1)
    const result2 = await mutators.validate()
    expect(result2.errors).toEqual([])
    expect(result2.warnings).toEqual([])
  })
})

describe('transformDataPath', () => {
  test('normal path', async () => {
    const internals = createFormInternals()
    const form = createFormExternals(internals)
    form.registerField({ path: 'a' })
    form.registerField({ path: 'a.b' })
    form.registerField({ path: 'a.b.c' })
    form.registerField({ path: 'a.b.c.d' })
    form.registerField({ path: 'a.b.c.d.e' })

    expect(internals.getDataPath(new FormPath('a')).toString()).toEqual('a')
    expect(internals.getDataPath(new FormPath('a.b')).toString()).toEqual('a.b')
    expect(internals.getDataPath(new FormPath('a.b.c')).toString()).toEqual(
      'a.b.c'
    )
    expect(internals.getDataPath(new FormPath('a.b.c.d')).toString()).toEqual(
      'a.b.c.d'
    )
    expect(internals.getDataPath(new FormPath('a.b.c.d.e')).toString()).toEqual(
      'a.b.c.d.e'
    )
  })

  test('virtual path', async () => {
    const internals = createFormInternals()
    const form = createFormExternals(internals)
    form.registerField({ path: 'a' })
    form.registerVirtualField({ path: 'a.b' })
    form.registerField({ path: 'a.b.c' })
    form.registerVirtualField({ path: 'a.b.c.d' })
    form.registerField({ path: 'a.b.c.d.e' })

    expect(internals.getDataPath(new FormPath('a')).toString()).toEqual('a')
    expect(internals.getDataPath(new FormPath('a.b')).toString()).toEqual('a.b')
    expect(internals.getDataPath(new FormPath('a.b.c')).toString()).toEqual(
      'a.c'
    )
    expect(internals.getDataPath(new FormPath('a.b.c.d')).toString()).toEqual(
      'a.c.d'
    )
    expect(internals.getDataPath(new FormPath('a.b.c.d.e')).toString()).toEqual(
      'a.c.e'
    )
  })

  test('virtual path(head)', async () => {
    const internals = createFormInternals()
    const form = createFormExternals(internals)
    form.registerVirtualField({ path: 'a' })
    form.registerField({ path: 'a.b' })
    form.registerField({ path: 'a.b.c' })

    expect(internals.getDataPath(new FormPath('a')).toString()).toEqual('a')
    expect(internals.getDataPath(new FormPath('a.b')).toString()).toEqual('b')
    expect(internals.getDataPath(new FormPath('a.b.c')).toString()).toEqual(
      'b.c'
    )
  })
})

describe('major sences', () => {
  test('dynamic remove with intialValues', async () => {
    const form = createForm({
      initialValues: {
        aa: [
          { aa: 123, bb: 321 },
          { aa: 345, bb: 678 }
        ]
      }
    })
    const aa = form.registerField({ path: 'aa', dataType: 'array' })
    form.registerField({ path: 'aa.0' })
    form.registerField({ path: 'aa.0.aa' })
    form.registerField({ path: 'aa.0.bb' })
    const last1 = form.registerField({ path: 'aa.1' })
    const last2 = form.registerField({ path: 'aa.1.aa' })
    const last3 = form.registerField({ path: 'aa.1.bb' })
    form.setFieldState('aa.1.aa', state => {
      state.value = 'change aa'
    })
    const mutators = form.createMutators(aa)
    const snapshot = form.getFormGraph()
    expect(snapshot).toMatchSnapshot()
    mutators.remove(0)
    last1.setState(state => {
      state.unmounted = true
    })
    last2.setState(state => {
      state.unmounted = true
    })
    last3.setState(state => {
      state.unmounted = true
    })
    expect(form.getFormGraph()).toMatchSnapshot()
    form.setFormGraph(snapshot)
    expect(form.getFormGraph()).toMatchSnapshot()
  })

  test('nested dynamic remove', () => {
    const form = createForm()
    const aa = form.registerField({
      path: 'aa',
      value: [{}, {}],
      dataType: 'array'
    })
    form.registerField({ path: 'aa.0' })
    form.registerField({ path: 'aa.0.aa' })
    form.registerField({ path: 'aa.0.bb' })
    const last1 = form.registerField({ path: 'aa.1' })
    const last2 = form.registerField({ path: 'aa.1.aa' })
    const last3 = form.registerField({ path: 'aa.1.bb' })
    form.setFieldState('aa.1.aa', state => {
      state.value = 'change aa'
    })

    const mutators = form.createMutators(aa)
    const snapshot = form.getFormGraph()
    expect(snapshot).toMatchSnapshot()
    mutators.remove(0)
    last1.setState(state => {
      state.unmounted = true
    })
    last2.setState(state => {
      state.unmounted = true
    })
    last3.setState(state => {
      state.unmounted = true
    })
    expect(form.getFormGraph()).toMatchSnapshot()
    form.setFormGraph(snapshot)
    expect(form.getFormGraph()).toMatchSnapshot()
    expect(form.getFormGraph()).toEqual(snapshot)
  })

  test('nested visible', async () => {
    const form = createForm()
    form.registerField({ path: 'aa', value: {} })
    form.registerField({ path: 'aa.bb', initialValue: 123 })
    form.registerField({ path: 'aa.cc', initialValue: 222 })
    form.setFieldState('aa', state => (state.visible = false))
    expect(form.getFormState(state => state.values)).toEqual({})

    expect(form.getFormGraph()).toMatchSnapshot()
    form.setFieldState('aa.bb', state => (state.value = '123'))
    expect(form.getFormGraph()).toMatchSnapshot()

    form.setFieldState('aa', state => (state.visible = true))
    await sleep(10)
    expect(form.getFieldValue('aa')).toEqual({ bb: '123', cc: 222 })
    expect(form.getFormState(state => state.values)).toEqual({
      aa: { bb: '123', cc: 222 }
    })
    expect(form.getFormGraph()).toMatchSnapshot()
  })

  test('visible onChange', async () => {
    const onChangeHandler = jest.fn()
    const form = createForm({
      initialValues: {
        aa: 123
      },
      onChange: onChangeHandler
    })
    form.registerField({
      name: 'aa'
    })
    form.setFormState(state => {
      state.mounted = true
    })
    form.setFieldState('aa', state => {
      state.visible = false
    })
    await sleep(10)
    expect(onChangeHandler).toBeCalledTimes(1)
  })

  test('deep nested visible(root)', () => {
    const form = createForm()
    form.registerField({ path: 'aa', value: {} })
    form.registerField({ path: 'aa.bb' })
    form.registerField({ path: 'aa.bb.cc', value: 123 })
    form.setFieldState('aa', state => (state.visible = false))
    expect(form.getFormGraph()).toMatchSnapshot()
    expect(form.getFormState(state => state.values)).toEqual({})
  })

  test('deep nested visible(middle part)', () => {
    const form = createForm()
    form.registerField({ path: 'aa', value: {} })
    form.registerField({ path: 'aa.bb' })
    form.registerField({ path: 'aa.bb.cc', value: 123 })
    form.setFieldState('aa.bb', state => (state.visible = false))
    expect(form.getFormGraph()).toMatchSnapshot()
    expect(form.getFormState(state => state.values)).toEqual({ aa: {} })
  })

  test('deep nested visible with VirtualField', () => {
    const form = createForm()
    form.registerField({ path: 'aa', value: {} })
    form.registerVirtualField({ path: 'aa.bb' })
    form.registerField({ path: 'aa.bb.cc', value: 123 })
    form.setFieldState('aa', state => {
      state.visible = false
    })
    expect(form.getFormGraph()).toMatchSnapshot()
  })
})

describe('validator', () => {
  test('registerValidationFormats', async () => {
    registerValidationFormats({
      number: /^[+-]?\d+(\.\d+)?$/
    })

    const form = createForm({
      values: {},
      initialValues: {},
      onChange: values => {
        // console.log(values)
      }
    })

    const aa = form.registerField({
      path: 'aa',
      rules: [
        {
          format: 'number',
          message: 'This field is not a number.'
        }
      ]
    })

    aa.setState(state => {
      state.value = 'hello world'
    })

    await form.validate('', { throwErrors: false })

    form.getFormState(state =>
      expect(state.errors).toEqual([
        {
          path: 'aa',
          name: 'aa',
          messages: ['This field is not a number.']
        }
      ])
    )
  })

  test('registerValidationRules', async () => {
    registerValidationRules({
      custom: value => {
        return value === '123' ? 'This field can not be 123' : ''
      }
    })

    const form = createForm({
      values: {},
      initialValues: {},
      onChange: values => {
        //  console.log(values)
      }
    })

    const aa = form.registerField({
      path: 'aa',
      rules: [
        {
          custom: true
        }
      ]
    })

    aa.setState(state => {
      state.value = '123'
    })

    await form.validate('', { throwErrors: false })

    form.getFormState(state =>
      expect(state.errors).toEqual([
        {
          path: 'aa',
          name: 'aa',
          messages: ['This field can not be 123']
        }
      ])
    )
  })

  test('registerValidationMTEngine', async () => {
    registerValidationMTEngine((message, context) => {
      return message.replace(/\{\{\s*([\w.]+)\s*\}\}/g, (_, $0) => {
        return FormPath.getIn(context, $0)
      })
    })

    const form = createForm({
      values: {},
      initialValues: {},
      onChange: values => {
        // console.log(values)
      }
    })

    const aa = form.registerField({
      path: 'aa',
      rules: [
        {
          validator(value) {
            return value === 123
              ? 'This field can not be 123 {{scope.outerVariable}}'
              : ''
          },
          scope: {
            outerVariable: 'addonAfter'
          }
        }
      ]
    })

    aa.setState(state => {
      state.value = 123
    })

    await form.validate('', { throwErrors: false })

    form.getFormState(state =>
      expect(state.errors).toEqual([
        {
          path: 'aa',
          name: 'aa',
          messages: ['This field can not be 123 addonAfter']
        }
      ])
    )
  })
})
