import { Field } from '../models/field'

test('computeState setValues', () => {
  const state = new Field()
  expect(state.getState().visible).toEqual(true)
  expect(state.getState().value).toEqual(undefined)
  //如果是隐藏状态，则禁止修改值
  state.setState(draft => {
    draft.visible = false
    draft.value = 123
    draft.initialValue = 456
  })
  expect(state.getState().unmounted).toEqual(false)
  expect(state.getState().visible).toEqual(false)
  expect(state.getState().value).toEqual(undefined)
  expect(state.getState().initialValue).toEqual(456)
  state.setState(draft => {
    draft.visible = true
    draft.unmounted = false
    draft.value = 123
    draft.initialValue = 456
  })
  expect(state.getState().visible).toEqual(true)
  expect(state.getState().unmounted).toEqual(false)
  expect(state.getState().value).toEqual(123)
  expect(state.getState().initialValue).toEqual(456)
  state.setState(draft => {
    draft.visible = true
    draft.unmounted = false
    draft.value = 123
    draft.initialValue = 456
  })
  expect(state.getState().unmounted).toEqual(false)
  expect(state.getState().visible).toEqual(true)
  expect(state.getState().value).toEqual(123)
  expect(state.getState().initialValue).toEqual(456)
})

test('computeState value and readValues', () => {
  const state = new Field()
  expect(state.getState().value).toEqual(undefined)
  expect(state.getState().values).toEqual([])
  expect(state.getState().initialized).toEqual(false)
  expect(state.getState().modified).toEqual(false)

  // modified depends on initialized and value change
  // invalid values and
  state.setState(draft => {
    draft.values = undefined
    draft.value = 123
    draft.initialized = true
  })

  expect(state.getState().value).toEqual(undefined)
  expect(state.getState().values).toEqual([undefined])
  expect(state.getState().initialized).toEqual(true)
  expect(state.getState().modified).toEqual(true)

  // valid values
  state.setState(draft => {
    draft.values = [1, 2, 3]
    draft.value = 456
  })
  expect(state.getState().modified).toEqual(true)
  expect(state.getState().value).toEqual(1)
  expect(state.getState().values).toEqual([1, 2, 3])
})

test('computeState editable', () => {
  const state = new Field()
  expect(state.getState().editable).toEqual(true)
  expect(state.getState().selfEditable).toEqual(undefined)
  expect(state.getState().formEditable).toEqual(undefined)

  // selfEditable
  state.setState(draft => {
    draft.editable = false
  })
  expect(state.getState().editable).toEqual(false)
  expect(state.getState().selfEditable).toEqual(false)
  expect(state.getState().formEditable).toEqual(undefined)

  // priority: selfEditable > formEditable > true
  const formEditable = () => true
  state.setState(draft => {
    draft.editable = undefined
    draft.formEditable = formEditable
  })
  expect(state.getState().editable).toEqual(true)
  expect(state.getState().selfEditable).toEqual(undefined)
  expect(state.getState().formEditable).toEqual(formEditable)

  // priority: selfEditable > formEditable > true
  state.setState(draft => {
    draft.editable = undefined
    draft.formEditable = undefined
  })
  expect(state.getState().editable).toEqual(true)
  expect(state.getState().selfEditable).toEqual(undefined)
  expect(state.getState().formEditable).toEqual(undefined)
})

test('computeState erors/warning', () => {
  const state = new Field()
  expect(state.getState().invalid).toEqual(false)
  expect(state.getState().valid).toEqual(true)
  expect(state.getState().errors).toEqual([])
  expect(state.getState().effectErrors).toEqual([])
  expect(state.getState().warnings).toEqual([])
  expect(state.getState().effectWarnings).toEqual([])
  expect(state.getState().ruleErrors).toEqual([])
  expect(state.getState().ruleWarnings).toEqual([])

  // invalid setting
  state.setState(draft => {
    draft.errors = ['', undefined, null]
    draft.warnings = ['', undefined, null]
    draft.ruleErrors = ['', undefined, null]
    draft.ruleWarnings = ['', undefined, null]
  })
  expect(state.getState().invalid).toEqual(false)
  expect(state.getState().valid).toEqual(true)
  expect(state.getState().errors).toEqual([])
  expect(state.getState().effectErrors).toEqual([])
  expect(state.getState().warnings).toEqual([])
  expect(state.getState().effectWarnings).toEqual([])
  expect(state.getState().ruleErrors).toEqual([])
  expect(state.getState().ruleWarnings).toEqual([])

  // errors = ruleErrors effectErrors
  // warnings = ruleWarnings warnings
  const errors = ['error1', 'error2']
  const warnings = ['warning1', 'warning2']
  const ruleErrors = ['ruleError1', 'ruleError2']
  const ruleWarnings = ['ruleWarning1', 'ruleWarning2']
  state.setState(draft => {
    draft.errors = errors
    draft.warnings = warnings
    draft.ruleErrors = ruleErrors
    draft.ruleWarnings = ruleWarnings
  })
  expect(state.getState().invalid).toEqual(true)
  expect(state.getState().valid).toEqual(false)
  expect(state.getState().errors).toEqual([...ruleErrors, ...errors])
  expect(state.getState().effectErrors).toEqual(errors)
  expect(state.getState().warnings).toEqual([...ruleWarnings, ...warnings])
  expect(state.getState().effectWarnings).toEqual(warnings)
  expect(state.getState().ruleErrors).toEqual(ruleErrors)
  expect(state.getState().ruleWarnings).toEqual(ruleWarnings)

  // 以下几种情况清理错误和警告信息
  // 1. 字段设置为不可编辑
  // 2. 字段隐藏
  // 3. 字段被卸载
  state.setState(draft => {
    draft.visible = false
  })
  expect(state.getState().invalid).toEqual(false)
  expect(state.getState().valid).toEqual(true)
  expect(state.getState().errors).toEqual([])
  expect(state.getState().effectErrors).toEqual([])
  expect(state.getState().warnings).toEqual([])
  expect(state.getState().effectWarnings).toEqual([])
  expect(state.getState().ruleErrors).toEqual(ruleErrors)
  expect(state.getState().ruleWarnings).toEqual(ruleWarnings)

  state.setState(draft => {
    draft.visible = true
  })

  expect(state.getState().invalid).toEqual(true)
  expect(state.getState().valid).toEqual(false)
  expect(state.getState().errors).toEqual(ruleErrors)
  expect(state.getState().effectErrors).toEqual([])
  expect(state.getState().warnings).toEqual(ruleWarnings)
  expect(state.getState().effectWarnings).toEqual([])
  expect(state.getState().ruleErrors).toEqual(ruleErrors)
  expect(state.getState().ruleWarnings).toEqual(ruleWarnings)

  state.setState(draft => {
    draft.unmounted = true
  })
  expect(state.getState().invalid).toEqual(false)
  expect(state.getState().valid).toEqual(true)
  expect(state.getState().errors).toEqual([])
  expect(state.getState().effectErrors).toEqual([])
  expect(state.getState().warnings).toEqual([])
  expect(state.getState().effectWarnings).toEqual([])
  expect(state.getState().ruleErrors).toEqual(ruleErrors)
  expect(state.getState().ruleWarnings).toEqual(ruleWarnings)

  state.setState(draft => {
    draft.unmounted = false
  })
  expect(state.getState().invalid).toEqual(true)
  expect(state.getState().valid).toEqual(false)
  expect(state.getState().errors).toEqual(ruleErrors)
  expect(state.getState().effectErrors).toEqual([])
  expect(state.getState().warnings).toEqual(ruleWarnings)
  expect(state.getState().effectWarnings).toEqual([])
  expect(state.getState().ruleErrors).toEqual(ruleErrors)
  expect(state.getState().ruleWarnings).toEqual(ruleWarnings)

  state.setState(draft => {
    draft.editable = false
  })
  expect(state.getState().invalid).toEqual(false)
  expect(state.getState().valid).toEqual(true)
  expect(state.getState().errors).toEqual([])
  expect(state.getState().effectErrors).toEqual([])
  expect(state.getState().warnings).toEqual([])
  expect(state.getState().effectWarnings).toEqual([])
  expect(state.getState().ruleErrors).toEqual(ruleErrors)
  expect(state.getState().ruleWarnings).toEqual(ruleWarnings)

  state.setState(draft => {
    draft.editable = false
  })
  expect(state.getState().invalid).toEqual(true)
  expect(state.getState().valid).toEqual(false)
  expect(state.getState().errors).toEqual(ruleErrors)
  expect(state.getState().effectErrors).toEqual([])
  expect(state.getState().warnings).toEqual(ruleWarnings)
  expect(state.getState().effectWarnings).toEqual([])
  expect(state.getState().ruleErrors).toEqual(ruleErrors)
  expect(state.getState().ruleWarnings).toEqual(ruleWarnings)
})

test('computeState comon', () => {
  // pristine depends on whether values to be equal initialvalues
  const state = new Field()
  expect(state.getState().pristine).toEqual(true)
  state.setState(draft => {
    draft.pristine = false
  })
  expect(state.getState().pristine).toEqual(false)
  state.setState(draft => {
    draft.value = { change: true }
  })
  expect(state.getState().value).toEqual({ change: true })
  expect(state.getState().pristine).toEqual(false)

  // loading depends on validating
  expect(state.getState().loading).toEqual(false)
  state.setState(draft => {
    draft.validating = true
  })
  expect(state.getState().validating).toEqual(true)
  expect(state.getState().loading).toEqual(true)

  // cannot set invalid props
  expect(state.getState().props).toEqual({})
  state.setState(draft => {
    draft.props = { hello: 'world' }
  })
  expect(state.getState().props).toEqual({ hello: 'world' })
  state.setState(draft => {
    draft.props = undefined
  })
  expect(state.getState().props).toEqual({})

  // mounted and unmounted
  expect(state.getState().mounted).toEqual(false)
  expect(state.getState().unmounted).toEqual(false)
  state.setState(draft => {
    draft.mounted = true
  })
  expect(state.getState().mounted).toEqual(true)
  expect(state.getState().unmounted).toEqual(false)
  state.setState(draft => {
    draft.unmounted = true
  })
  expect(state.getState().mounted).toEqual(false)
  expect(state.getState().unmounted).toEqual(true)
})

test('subscribe/unsubscribe', () => {
  const state = new Field()
  const cb = jest.fn()
  const idx = state.subscribe(cb)
  const paylaod = state.getState()
  state.notify(paylaod)
  expect(cb).toBeCalledTimes(1)
  expect(cb).toBeCalledWith(paylaod)
  state.unsubscribe(idx)
  state.notify(paylaod)
  expect(cb).toBeCalledTimes(1)
  expect(cb).toBeCalledWith(paylaod)
})

test('getState', () => {
  const state = new Field()
  const cb = jest.fn()
  state.getState(cb)
  expect(cb).toBeCalledTimes(1)
  expect(cb).toBeCalledWith(state.state)
  const syncState = state.getState()
  expect(syncState).toEqual(state.state)

  state.factory.getState = () => null
  state.getState(cb)
  expect(cb).toBeCalledTimes(2)
  expect(cb).toBeCalledWith(null)
})
test('setState', () => {
  const state = new Field()
  const susCb = jest.fn()
  state.subscribe(susCb)
  const cb1 = draft => {
    draft.value = { change: true }
  }
  const cb2 = draft => {
    draft.value = { withNotify: true }
  }
  const cb3 = draft => {
    draft.value = { withBatching: true }
  }
  const cb4 = draft => {
    draft.value = { ...draft.value, withBatching2: true }
  }
  const prevState1 = state.getState()
  expect(prevState1.value).toEqual(undefined)

  // 默认 slient = false, 触发notify 通知UI更新
  state.setState(cb1)
  expect(state.getState().value).toEqual({ change: true })
  expect(state.getState()).toEqual({
    ...prevState1,
    pristine: false,
    modified: true,
    value: { change: true },
    values: [{ change: true }]
  })
  expect(susCb).toBeCalledTimes(1)
  expect(susCb).toBeCalledWith({
    ...prevState1,
    pristine: false,
    modified: true,
    value: { change: true },
    values: [{ change: true }]
  })

  // slient = true 不触发notify
  const prevState2 = state.getState()
  expect(prevState2.value.withNotify).toEqual(undefined)
  state.setState(cb2, true)
  expect(state.getState().value.withNotify).toEqual(true)
  expect(state.getState()).toEqual({
    ...prevState2,
    value: { withNotify: true },
    values: [{ withNotify: true }]
  })
  expect(susCb).toBeCalledTimes(1)

  // batching 相当于slient = true
  const prevState3 = state.getState()
  expect(prevState3.value.withBatching).toEqual(undefined)
  expect(prevState3.value.withBatching2).toEqual(undefined)
  state.batch(() => {
    state.setState(cb3)
    state.setState(cb4)
  })

  expect(state.getState().value.withBatching).toEqual(true)
  expect(state.getState().value.withBatching2).toEqual(true)
  expect(state.getState()).toEqual({
    ...prevState3,
    value: { withBatching: true, withBatching2: true },
    values: [{ withBatching: true, withBatching2: true }]
  })
  // 这次notify是由batch批处理结束调用的
  expect(susCb).toBeCalledTimes(2)
  expect(susCb).toBeCalledWith({
    ...prevState3,
    value: { withBatching: true, withBatching2: true },
    values: [{ withBatching: true, withBatching2: true }]
  })
})
test('getSourceState', () => {
  const state = new Field()
  const cb = jest.fn()
  state.getSourceState(cb)
  expect(cb).toBeCalledTimes(1)
  expect(cb).toBeCalledWith(state.state)
  const syncState = state.getSourceState()
  expect(syncState).toEqual(state.state)

  state.factory.getState = () => null
  state.getSourceState(cb)
  expect(cb).toBeCalledTimes(2)
  expect(cb).toBeCalledWith(state.state)
})

test('setSourceState', () => {
  const state = new Field()
  const cb1 = draft => (draft.change = true)
  const prevState1 = state.getSourceState()
  expect(prevState1.change).toEqual(undefined)

  state.setSourceState(cb1)
  expect(state.getSourceState()).toEqual({ ...prevState1, change: true })
})

test('isDirty', () => {
  const state = new Field()
  expect(state.dirtyCount).toEqual(0)
  expect(state.isDirty()).toEqual(false)
  state.dirtyCount = 1
  expect(state.isDirty()).toEqual(true)
  state.dirtyCount = 0
  expect(state.isDirty()).toEqual(false)
  state.dirtys = { validating: true }
  expect(state.isDirty()).toEqual(false)
  expect(state.isDirty('validating')).toEqual(true)
})
