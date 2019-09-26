import { createForm, LifeCycleTypes, FormLifeCycle, FormPath } from '../index'

// mock datasource
const testValues = { aa: 111, bb: 222 }
const testValues2 = { aa: '123', bb: '321' }
const changeValues = { aa: 'change aa', bb: 'change bb' }
const resetInitValues = {
  aa: {
    bb: [{ aa: 123 }, { aa: 321 }]
  }
}


describe('createForm', () => {
  test('values', () => {
    const form = createForm({
      values: testValues
    })
    expect(form.getFormState(state => state.values)).toEqual(testValues)
    expect(form.getFormState(state => state.pristine)).toEqual(false)
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
    expect(form.getFormState(state => state.pristine)).toEqual(true)
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
    expect(form.getFormState(state => state.pristine)).toEqual(true)
    expect(form.getFormState(state => state.initialized)).toEqual(true)
    expect(aa.getState(state => state.value)).toEqual(testValues.aa)
    expect(bb.getState(state => state.value)).toEqual(testValues.bb)
    expect(form.getFormGraph()).toMatchSnapshot()
  })

  test('initialValue', () => {
    const form = createForm({
      initialValues: testValues
    })
    expect(form.getFormState(state => state.values)).toEqual(testValues)
    expect(form.getFormState(state => state.initialValues)).toEqual(testValues)
    expect(form.getFormState(state => state.pristine)).toEqual(true)
    expect(form.getFormState(state => state.initialized)).toEqual(true)
    expect(form.getFormGraph()).toMatchSnapshot()
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
    aa.setState(state => state.value = changeValues.aa)
    bb.setState(state => state.value = changeValues.bb)
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
    form.setFieldState('aa', state => state.visible = false)
    expect(form.getFormGraph()).toMatchSnapshot()

    // change graph or you can also call it 'time travel'
    form.setFormGraph(snapshot)
    expect(form.getFormGraph()).toEqual(snapshot)
  })
})

describe('submit', () => {
  test('onSubmit', async() => {
    const onSubmitContructor = jest.fn()
    const onSubmitFn = jest.fn()
    const changeSubmitPayload = (values) => ({ hello: 'world' })
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
    expect(result).toEqual({ validated: {
      errors: [],
      warnings: [],
    }, payload: { hello: 'world'} })
  })

  test('submitResult', async () => {
    const sunmitFailed = jest.fn()
    const form = createForm()    
    form.registerField({ path: 'a', rules: [(value) => {
      return value === undefined ? { type: 'error', message: 'a is required' } : null
    }] })
    form.registerField({ path: 'b', rules: [(value) => {
      return value === undefined ? { type: 'warning', message: 'b is required' } : null
    }] })

    // error failed
    try {
      await form.submit()
    } catch (errors) {
      sunmitFailed()
      expect(errors).toEqual([{ path: 'a', messages: ['a is required']}])
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

    expect(validated.warnings).toEqual([{ path: 'b', messages: ['b is required'] }])
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
        new FormLifeCycle(LifeCycleTypes.ON_FORM_SUBMIT_END, onSubmitEnd),
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
    expect(form.getFormState(state => state.values)).toEqual({ aa: { bb: [] } })
    expect(form.getFormState(state => state.initialValues)).toEqual(resetInitValues)
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
    expect(form.getFormState(state => state.initialValues)).toEqual(resetInitValues)
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
    expect(form.getFormState(state => state.values)).toEqual({ aa: { bb: [] }})
    expect(form.getFormState(state => state.initialValues)).toEqual({})
  })
})

describe('clearErrors', () => {
  test('basic', async () => {
    const form = createForm()
    const warnMsg = ['warning msg']
    const errMsg = ['error msg']
    form.registerField({ path: 'b', rules: [(v) => v === undefined ? ({ type: 'warning', message: 'warning msg' }) : undefined] }) // CustomValidator warning
    form.registerField({ path: 'c', rules: [(v) => v === undefined ? ({ type: 'error', message: 'error msg' }) : undefined] }) // CustomValidator error
    const result1 = await form.validate()
    expect(result1.warnings).toEqual([{ path: 'b', messages: warnMsg }])
    expect(result1.errors).toEqual([{ path: 'c', messages: errMsg}])      

    form.clearErrors('b')
    expect(form.getFormState(state => state.warnings)).toEqual([])
    expect(form.getFormState(state => state.errors)).toEqual([{ path: 'c', messages: errMsg}])

    form.clearErrors('c')
    expect(form.getFormState(state => state.warnings)).toEqual([])
    expect(form.getFormState(state => state.errors)).toEqual([])

    const result2 = await form.validate()
    expect(result2.warnings).toEqual([{ path: 'b', messages: warnMsg }])
    expect(result2.errors).toEqual([{ path: 'c', messages: errMsg}])      

    form.clearErrors('')
    expect(form.getFormState(state => state.warnings)).toEqual([])
    expect(form.getFormState(state => state.errors)).toEqual([])
  })

  test('wildcard path', async () => {

  })

  test('effect', async () => {

  })
})

describe('validate', () => {
  test('empty', async () => {
    const form = createForm()
    const { warnings, errors } = await form.validate()
    expect(warnings).toEqual([])
    expect(errors).toEqual([])
  })

  test('onValidateFailed', async () => {
    const onValidateFailedTrigger = jest.fn()
    const onValidateFailed = ({ warnings, errors }) => {
      expect(warnings).toEqual([{ path: 'b', messages: ['warning msg'] }])
      expect(errors).toEqual([{ path: 'c', messages: ['error msg']}])      
      onValidateFailedTrigger();
    };
    const form = createForm({
      onValidateFailed
    })
    form.registerField({ path: 'b', rules: [() => ({ type: 'warning', message: 'warning msg' })] }) // CustomValidator warning
    form.registerField({ path: 'c', rules: [() => ({ type: 'error', message: 'error msg' })] }) // CustomValidator error
    await form.validate()
    expect(onValidateFailedTrigger).toBeCalledTimes(1)
  })

  test('validate basic', async () => {
    const onValidateStart = jest.fn()
    const onValidateEnd = jest.fn()
    const form = createForm({
      lifecycles: [
        new FormLifeCycle(LifeCycleTypes.ON_FORM_VALIDATE_START, onValidateStart),
        new FormLifeCycle(LifeCycleTypes.ON_FORM_VALIDATE_END, onValidateEnd),
      ],
    })
    form.registerField({ path: 'a', rules: ['number'] }) // string
    form.registerField({ path: 'b', rules: [() => ({ type: 'warning', message: 'warning msg' })] }) // CustomValidator warning
    form.registerField({ path: 'c', rules: [() => ({ type: 'error', message: 'warning msg' })] }) // CustomValidator error
    form.registerField({ path: 'd', rules: [() => 'straight error msg'] }) // CustomValidator string
    form.registerField({ path: 'e', rules: [{ required: true, message: 'desc msg' }] }) // ValidateDescription

    expect(onValidateStart).toBeCalledTimes(0)
    expect(onValidateEnd).toBeCalledTimes(0)
    expect(form.getFormState(state => state.validating)).toEqual(false)
    const validatePromise = form.validate()
    expect(form.getFormState(state => state.validating)).toEqual(true)
    expect(onValidateStart).toBeCalledTimes(1)
    validatePromise.then((validated) => {
      expect(form.getFormState(state => state.validating)).toEqual(false)
      expect(onValidateEnd).toBeCalledTimes(1)
      const { warnings, errors } = validated;
      expect(warnings.length).toEqual(1)
      expect(errors.length).toEqual(4)
    })
  })

  test('path', async () => {
    const form = createForm()
    form.registerField({ path: 'b', rules: [(v) => v === undefined ? ({ type: 'warning', message: 'warning msg' }) : undefined] }) // CustomValidator warning
    form.registerField({ path: 'c', rules: [(v) => v === undefined ? ({ type: 'error', message: 'error msg' }) : undefined] }) // CustomValidator error
    const bResult = await form.validate('b')
    expect(bResult.warnings).toEqual([{ path: 'b', messages: ['warning msg'] }])
    expect(bResult.errors).toEqual([])      
    expect(form.getFieldState('b', state => state.warnings)).toEqual(['warning msg'])
    expect(form.getFieldState('c', state => state.errors)).toEqual([])
    expect(form.getFormState(state => state.warnings)).toEqual([{ path: 'b', messages: ['warning msg'] }])
    expect(form.getFormState(state => state.errors)).toEqual([])

    const cResult = await form.validate('c')
    expect(cResult.warnings).toEqual([])
    expect(cResult.errors).toEqual([{ path: 'c', messages: ['error msg']}])
    expect(form.getFieldState('b', state => state.warnings)).toEqual(['warning msg'])
    expect(form.getFieldState('c', state => state.errors)).toEqual(['error msg'])
    expect(form.getFormState(state => state.warnings)).toEqual([{ path: 'b', messages: ['warning msg'] }])
    expect(form.getFormState(state => state.errors)).toEqual([{ path: 'c', messages: ['error msg']}])

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
  //todo
})

describe('getFormState', () => {
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

describe('setFieldValue', () => {
  //todo
})

describe('getFieldValue', () => {
  //todo
})

describe('registerField', () => {
  test('basic', async () => {
    const form = createForm({ values: { a: 1 } })
    form.registerField({ path: 'a' })
    form.registerField({ path: 'b' })
    expect(form.getFieldValue('a')).toEqual(1)
    expect(form.getFieldValue('b')).toEqual(undefined)
    expect(form.getFieldState('a', state => state.values)).toEqual([1])
    expect(form.getFieldState('b', state => state.values)).toEqual([undefined])
  })

  test('merge', async () => {
    const form = createForm({ values: { a: 1, b: 2, c: 3, d: 4 }})
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
  //todo
})

describe('createMutators', () => {
  const arr = ['a', 'b']
  test('change', async () => {
    const form = createForm()
    form.registerField({ path: 'a' })
    const mutators = form.createMutators('a')
    expect(form.getFieldState('a', (state => ({ values: state.values, value: state.value })))).toEqual({
      value: undefined,
      values: [undefined],
    })
    mutators.change(1,2,3,4)
    expect(form.getFieldState('a', (state => ({ values: state.values, value: state.value })))).toEqual({
      value: 1,
      values: [1,2,3,4],
    })
  })

  test('focus', async () => {
    const form = createForm()
    form.registerField({ path: 'a' })
    const mutators = form.createMutators('a')
    expect(form.getFormGraph()).toMatchSnapshot()
    expect(form.getFieldState('a', (state => ({ active: state.active, visited: state.visited })))).toEqual({
      active: false,
      visited: false,
    })
    mutators.focus()
    expect(form.getFormGraph()).toMatchSnapshot()
    expect(form.getFieldState('a', (state => ({ active: state.active, visited: state.visited })))).toEqual({
      active: true,
      visited: true,
    })
  })

  test('blur', async () => {
    const form = createForm()
    form.registerField({ path: 'a' })
    const mutators = form.createMutators('a')
    expect(form.getFormGraph()).toMatchSnapshot()
    expect(form.getFieldState('a', (state => ({ active: state.active, visited: state.visited })))).toEqual({
      active: false,
      visited: false,
    })
    mutators.focus()
    mutators.blur()
    expect(form.getFormGraph()).toMatchSnapshot()
    expect(form.getFieldState('a', (state => ({ active: state.active, visited: state.visited })))).toEqual({
      active: false,
      visited: true,
    })
  })

  test('push', async () => {
    const form = createForm()
    form.registerField({ path: 'mm', value: [] })
    const mutators = form.createMutators('mm')
    expect(form.getFieldValue('mm')).toEqual([])
    mutators.push({})
    expect(form.getFieldValue('mm')).toEqual([{}])
  })

  test('pop', async () => {
    const form = createForm()
    form.registerField({ path: 'mm', value: [{}] })
    const mutators = form.createMutators('mm')
    expect(form.getFieldValue('mm')).toEqual([{}])
    mutators.pop()
    expect(form.getFieldValue('mm')).toEqual([])
  })

  test('insert', async () => {
    const form = createForm()
    form.registerField({ path: 'mm', value: arr })
    const mutators = form.createMutators('mm')
    expect(form.getFieldValue('mm')).toEqual(arr)
    mutators.insert(1, 'x')
    expect(form.getFieldValue('mm')).toEqual(['a','x','b'])
  })

  test('remove', async () => {
    const form = createForm()
    form.registerField({ path: 'mm', value: arr })
    const mutators = form.createMutators('mm')
    expect(form.getFieldValue('mm')).toEqual(arr)
    mutators.remove(1)
    expect(form.getFieldValue('mm')).toEqual(arr.slice(0, 1))
  })

  test('exist', async () => {
    const form = createForm()
    form.registerField({ path: 'mm', value: arr })
    const mutators = form.createMutators('mm')
    expect(mutators.exist(1)).toEqual(true)
  })

  test('shift', async () => {
    const form = createForm()
    form.registerField({ path: 'mm', value: arr })
    const mutators = form.createMutators('mm')
    expect(form.getFieldValue('mm')).toEqual(arr)
    mutators.shift()
    expect(form.getFieldValue('mm')).toEqual(arr.slice(1))
  })

  test('unshift', async () => {
    const form = createForm()
    form.registerField({ path: 'mm', value: arr })
    const mutators = form.createMutators('mm')
    expect(form.getFieldValue('mm')).toEqual(arr)
    mutators.unshift('x')
    expect(form.getFieldValue('mm')).toEqual(['x', ...arr])
  })

  test('move', async () => {
    const form = createForm()
    form.registerField({ path: 'mm', value: arr })
    const mutators = form.createMutators('mm')
    expect(form.getFieldValue('mm')).toEqual(arr)
    mutators.move(0, 1)
    expect(form.getFieldValue('mm')).toEqual(arr.reverse())
  })

  test('validate', async () => {
    const form = createForm()
    form.registerField({ path: 'mm', rules: [(v) => v === undefined ? ({ type: 'warning', message: 'warning msg' }) : undefined] })
    const mutators = form.createMutators('mm')
    const result = await mutators.validate()
    expect(result.errors).toEqual([])
    expect(result.warnings).toEqual([{ path: 'mm', messages: ['warning msg'] }])
    mutators.change(1)
    const result2 = await mutators.validate()
    expect(result2.errors).toEqual([])
    expect(result2.warnings).toEqual([])
  })
})

describe('transformDataPath', () => {
  test('normal path', async () => {
    const form = createForm()
    form.registerField({ path: 'a' })
    form.registerField({ path: 'a.b' })
    form.registerField({ path: 'a.b.c' })
    form.registerField({ path: 'a.b.c.d' })
    form.registerField({ path: 'a.b.c.d.e' })

    expect(form.unsafe_do_not_use_transform_data_path(new FormPath('a')).toString()).toEqual('a')
    expect(form.unsafe_do_not_use_transform_data_path(new FormPath('a.b')).toString()).toEqual('a.b')
    expect(form.unsafe_do_not_use_transform_data_path(new FormPath('a.b.c')).toString()).toEqual('a.b.c')
    expect(form.unsafe_do_not_use_transform_data_path(new FormPath('a.b.c.d')).toString()).toEqual('a.b.c.d')
    expect(form.unsafe_do_not_use_transform_data_path(new FormPath('a.b.c.d.e')).toString()).toEqual('a.b.c.d.e')
  })

  test('virtual path', async () => {
    const form = createForm()
    form.registerField({ path: 'a' })
    form.registerVirtualField({ path: 'a.b' })
    form.registerField({ path: 'a.b.c' })
    form.registerVirtualField({ path: 'a.b.c.d' })
    form.registerField({ path: 'a.b.c.d.e' })

    expect(form.unsafe_do_not_use_transform_data_path(new FormPath('a')).toString()).toEqual('a')
    expect(form.unsafe_do_not_use_transform_data_path(new FormPath('a.b')).toString()).toEqual('a')
    expect(form.unsafe_do_not_use_transform_data_path(new FormPath('a.b.c')).toString()).toEqual('a.c')
    expect(form.unsafe_do_not_use_transform_data_path(new FormPath('a.b.c.d')).toString()).toEqual('a.c')
    expect(form.unsafe_do_not_use_transform_data_path(new FormPath('a.b.c.d.e')).toString()).toEqual('a.c.e')
  })

  test('virtual path(head)', async () => {
    const form = createForm()
    form.registerVirtualField({ path: 'a' })
    form.registerField({ path: 'a.b' })
    form.registerField({ path: 'a.b.c' })

    expect(form.unsafe_do_not_use_transform_data_path(new FormPath('a')).toString()).toEqual('')
    expect(form.unsafe_do_not_use_transform_data_path(new FormPath('a.b')).toString()).toEqual('b')
    expect(form.unsafe_do_not_use_transform_data_path(new FormPath('a.b.c')).toString()).toEqual('b.c')
  })
})

describe('major sences', () => {
  test('dynamic remove with intialValues', async () => {
    const form = createForm({
      initialValues: {
        aa: [{ aa: 123, bb: 321 }, { aa: 345, bb: 678 }]
      }
    })
    form.registerField({ path: 'aa' })
    form.registerField({ path: 'aa.0' })
    form.registerField({ path: 'aa.0.aa' })
    form.registerField({ path: 'aa.0.bb' })
    form.registerField({ path: 'aa.1' })
    form.registerField({ path: 'aa.1.aa' })
    form.registerField({ path: 'aa.1.bb' })
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
    form.registerField({ path: 'aa', value: [] })
    form.registerField({ path: 'aa.0' })
    form.registerField({ path: 'aa.0.aa' })
    form.registerField({ path: 'aa.0.bb' })
    form.registerField({ path: 'aa.1' })
    form.registerField({ path: 'aa.1.aa' })
    form.registerField({ path: 'aa.1.bb' })
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
    form.registerField({ path: 'aa', value: {} })
    form.registerField({ path: 'aa.bb', initialValue: 123 })
    form.registerField({ path: 'aa.cc', initialValue: 222 })
    form.setFieldState('aa', state => state.visible = false)
    expect(form.getFormState(state => state.values)).toEqual({})
    
    expect(form.getFormGraph()).toMatchSnapshot()
    form.setFieldState('aa.bb', state => state.value = '123')
    expect(form.getFormGraph()).toMatchSnapshot()

    form.setFieldState('aa', state => state.visible = true)
    expect(form.getFormGraph()).toMatchSnapshot()
  })

  test('deep nested visible(root)', () => {
    const form = createForm()
    form.registerField({ path: 'aa', value: {} })
    form.registerField({ path: 'aa.bb' })
    form.registerField({ path: 'aa.bb.cc', value: 123 })
    form.setFieldState('aa', state => state.visible = false)
    expect(form.getFormGraph()).toMatchSnapshot()
    expect(form.getFormState(state => state.values)).toEqual({})
  })

  test('deep nested visible(middle part)', () => {
    const form = createForm()
    form.registerField({ path: 'aa', value: {} })
    form.registerField({ path: 'aa.bb' })
    form.registerField({ path: 'aa.bb.cc', value: 123 })
    form.setFieldState('aa.bb', state => state.visible = false)
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
