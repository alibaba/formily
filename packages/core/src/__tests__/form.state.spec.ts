import { FormState } from '../state/form'

test('computeState', () => {
  const state = new FormState({ useDirty: false })
  expect(state.getState()).toEqual({
    displayName: 'FormState',
    editable: undefined,
    pristine: true,
    valid: true,
    invalid: false,
    loading: false,
    validating: false,
    initialized: false,
    submitting: false,
    errors: [],
    warnings: [],
    values: {},
    initialValues: {},
    mounted: false,
    unmounted: false,
    props: {}
  })

  // can not set invalid errors, warnings
  state.setState(draft => {
    draft.errors = [undefined, null, '']
    draft.warnings = [undefined, null, '']
  })
  expect(state.getState().warnings).toEqual([])
  expect(state.getState().errors).toEqual([])

  // set errors will change invalid and valid
  expect(state.getState().invalid).toEqual(false)
  expect(state.getState().valid).toEqual(true)
  state.setState(draft => {
    draft.invalid = false
    draft.valid = true
  })
  expect(state.getState().invalid).toEqual(false)
  expect(state.getState().valid).toEqual(true)

  state.setState(draft => {
    draft.errors = ['sth wrong']
  })
  expect(state.getState().errors).toEqual(['sth wrong'])
  expect(state.getState().invalid).toEqual(true)
  expect(state.getState().valid).toEqual(false)

  // pristine depends on whether values to be equal initialvalues
  expect(state.getState().pristine).toEqual(true)
  state.setState(draft => {
    draft.pristine = false
  })
  expect(state.getState().pristine).toEqual(true)
  state.setState(draft => {
    draft.values = { change: true }
  })
  expect(state.getState().values).toEqual({ change: true })
  expect(state.getState().pristine).toEqual(false)

  // cannot set invalid props
  expect(state.getState().props).toEqual({})
  state.setState((draft) => {
    draft.props = { hello: 'world' }
  })
  expect(state.getState().props).toEqual({ hello: 'world' })
  state.setState((draft) => {
    draft.props = undefined
  })
  expect(state.getState().props).toEqual({ hello: 'world' })

  // loading depends on validating
  expect(state.getState().loading).toEqual(false)
  state.setState(draft => {
    draft.validating = true
  })
  expect(state.getState().validating).toEqual(true)
  expect(state.getState().loading).toEqual(true)

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
  const state = new FormState({ useDirty: false })
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
test('batch', () => {
  const state = new FormState({ useDirty: false })
  const cb = jest.fn()
  state.batch(cb)
  expect(cb).toBeCalledTimes(1)
  expect(cb).toBeCalledWith()
  // force run getState
  const susCb = jest.fn()
  state.subscribe(susCb)
  state.dirtyNum = 1
  state.batch(cb)
  expect(cb).toBeCalledTimes(2)
  expect(cb).toBeCalledWith()
  expect(susCb).toBeCalledTimes(1)
  expect(susCb).toBeCalledWith(state.state)
})
test('getState', () => {
  const state = new FormState({ useDirty: false })
  const cb = jest.fn()
  state.getState(cb)
  expect(cb).toBeCalledTimes(1)
  expect(cb).toBeCalledWith(state.state)
  const syncState = state.getState()
  expect(syncState).toEqual(state.state)

  state.controller.publishState = () => null
  state.getState(cb)
  expect(cb).toBeCalledTimes(2)
  expect(cb).toBeCalledWith(null)
})
test('setState', () => {
  const state = new FormState({ useDirty: false })
  const susCb = jest.fn()
  state.subscribe(susCb)
  const cb1 = (draft) => { draft.values = { change: true } }
  const cb2 = (draft) => { draft.values = { withNotify: true } }
  const cb3 = (draft) => { draft.values = { withBatching: true } }
  const cb4 = (draft) => { draft.values = { ...draft.values, withBatching2: true } }
  const prevState1 = state.getState()
  expect(prevState1.values.change).toEqual(undefined)

  // 默认 slient = false, 触发notify 通知UI更新
  state.setState(cb1)
  expect(state.getState().values.change).toEqual(true)
  expect(state.getState()).toEqual({ ...prevState1, pristine: false, values: { change: true } })
  expect(susCb).toBeCalledTimes(1)
  expect(susCb).toBeCalledWith({ ...prevState1, pristine: false, values: { change: true } })
  
  // slient = true 不触发notify
  const prevState2 = state.getState()
  expect(prevState2.values.withNotify).toEqual(undefined)
  state.setState(cb2, true)
  expect(state.getState().values.withNotify).toEqual(true)
  expect(state.getState()).toEqual({ ...prevState2, values: { withNotify: true }})
  expect(susCb).toBeCalledTimes(1)

  // batching 相当于slient = true
  const prevState3 = state.getState()
  expect(prevState3.values.withBatching).toEqual(undefined)
  expect(prevState3.values.withBatching2).toEqual(undefined)
  state.batch(() => {
    state.setState(cb3)
    state.setState(cb4)
  })

  expect(state.getState().values.withBatching).toEqual(true)
  expect(state.getState().values.withBatching2).toEqual(true)
  expect(state.getState()).toEqual({ ...prevState3, values: { withBatching: true, withBatching2: true } })
  // 这次notify是由batch批处理结束调用的
  expect(susCb).toBeCalledTimes(2)
  expect(susCb).toBeCalledWith({ ...prevState3, values: { withBatching: true, withBatching2: true } })
})
test('getSourceState', () => {
  const state = new FormState({ useDirty: false })
  const cb = jest.fn()
  state.unsafe_getSourceState(cb)
  expect(cb).toBeCalledTimes(1)
  expect(cb).toBeCalledWith(state.state)
  const syncState = state.unsafe_getSourceState()
  expect(syncState).toEqual(state.state)

  state.controller.publishState = () => null
  state.unsafe_getSourceState(cb)
  expect(cb).toBeCalledTimes(2)
  expect(cb).toBeCalledWith(state.state)
})
test('setSourceState', () => {
  const state = new FormState({ useDirty: false })
  const cb1 = (draft) => draft.change = true
  const prevState1 = state.unsafe_getSourceState()
  expect(prevState1.change).toEqual(undefined)

  state.unsafe_setSourceState(cb1)
  expect(state.unsafe_getSourceState()).toEqual({ ...prevState1, change: true })
})
test('hasChanged', () => {
  const state = new FormState({ useDirty: true })
  expect(state.dirtyNum).toEqual(0)
  expect(state.hasChanged()).toEqual(false)
  state.dirtyNum = 1
  expect(state.hasChanged()).toEqual(true)
  state.dirtyNum = 0
  expect(state.hasChanged()).toEqual(false)
  state.dirtys.validating = true
  expect(state.hasChanged()).toEqual(false)
  expect(state.hasChanged('validating')).toEqual(true)
})
test('getChanged', () => {
  const state = new FormState({ useDirty: true })
  expect(state.getChanged()).toEqual({})
  state.dirtys.validating = true
  expect(state.getChanged()).toEqual({ validating: true })
  state.dirtys = { values: true }
  expect(state.getChanged()).toEqual({ values: true })
})
test('hasChangedInSequence', () => {
  const state = new FormState({ useDirty: true })
  expect(state.hasChangedInSequence()).toEqual(false)
  state.persistDirtys.validating = true
  expect(state.hasChangedInSequence()).toEqual(true)
  expect(state.hasChangedInSequence('validating')).toEqual(true)
  state.persistDirtys.validating = false
  expect(state.hasChangedInSequence()).toEqual(false)
  expect(state.hasChangedInSequence('validating')).toEqual(false)
  state.persistDirtys = {}
  expect(state.hasChangedInSequence()).toEqual(false)
  state.persistDirtys = { validating: true }
  expect(state.hasChangedInSequence()).toEqual(true)
  expect(state.hasChangedInSequence('validating')).toEqual(true)
})
test('getChangedInSequence', () => {
  const state = new FormState({ useDirty: true })
  expect(state.getChangedInSequence()).toEqual({})
  state.persistDirtys.validating = true
  expect(state.getChangedInSequence()).toEqual({ validating: true })
  state.persistDirtys = { values: true }
  expect(state.getChangedInSequence()).toEqual({ values: true })
})
