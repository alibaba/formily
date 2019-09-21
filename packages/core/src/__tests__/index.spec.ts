import { createForm, LifeCycleTypes, FormLifeCycle, FormPath } from '../index'

// mock datasource
const testValues = { aa: 111, bb: 222 }
const testValues2 = { aa: '123', bb: '321' }
const changeValues = { aa: 'change aa', bb: 'change bb' }
const resetInitValues = {
  aa: {
    bb: [{ aa: 123 }, { aa: 321 }]
  }
};


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
    // expect(form.getFormGraph()).toMatchSnapshot()
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
  //todo
})

describe('reset', () => {
  test('array reset forceclear', () => {
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
    form.reset({ forceClear: true })
    expect(form.getFormGraph()).toMatchSnapshot()
    expect(form.getFormState(state => state.values)).toEqual({ aa: { bb: [] } })
    expect(form.getFormState(state => state.initialValues)).toEqual(resetInitValues)
  })

  test('array reset no forceclear(initial values)', () => {
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
    form.reset()
    expect(form.getFormGraph()).toMatchSnapshot()
    expect(form.getFormState(state => state.values)).toEqual(resetInitValues)
    expect(form.getFormState(state => state.initialValues)).toEqual(resetInitValues)
  })

  test('array reset no forceclear(values)', () => {
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
    form.reset()
    expect(form.getFormGraph()).toMatchSnapshot()
    expect(form.getFormState(state => state.values)).toEqual({ aa: { bb: [] }})
    expect(form.getFormState(state => state.initialValues)).toEqual({})
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
    expect(form.getFieldValue('a')).toEqual(1)
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
  const arr = ['a', 'b'];
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
    console.log('arr==>', arr);
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
