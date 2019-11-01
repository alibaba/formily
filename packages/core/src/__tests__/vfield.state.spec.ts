import { VirtualFieldState } from '../state/virtual-field'

test('computeState', () => {
  const state = new VirtualFieldState({ useDirty: false })
  state.setState((draft) => {
    draft.unmounted = true
  })
  expect(state.getState().mounted).toEqual(false)
  expect(state.getState().unmounted).toEqual(true)
  state.setState((draft) => {
    draft.mounted = true
  })
  expect(state.getState().mounted).toEqual(true)
  expect(state.getState().unmounted).toEqual(false)
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
})


test('subscribe/unsubscribe', () => {
  const state = new VirtualFieldState({ useDirty: false })
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
  const state = new VirtualFieldState({ useDirty: false })
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
  const state = new VirtualFieldState({ useDirty: false })
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
  const state = new VirtualFieldState({ useDirty: false })
  const susCb = jest.fn()
  state.subscribe(susCb)
  const cb1 = (draft) => { draft.visible = false }
  const cb2 = (draft) => { draft.display = false }
  const cb3 = (draft) => { draft.initialized = true }
  const cb4 = (draft) => { draft.mounted = true }
  const prevState1 = state.getState()
  expect(prevState1.visible).toEqual(true)

  // 默认 slient = false, 触发notify 通知UI更新
  state.setState(cb1)
  expect(state.getState().visible).toEqual(false)
  expect(state.getState()).toEqual({ ...prevState1, visible: false })
  expect(susCb).toBeCalledTimes(1)
  expect(susCb).toBeCalledWith({ ...prevState1, visible: false })
  
  // slient = true 不触发notify
  const prevState2 = state.getState()
  expect(prevState2.display).toEqual(true)
  state.setState(cb2, true)
  expect(state.getState().display).toEqual(false)
  expect(state.getState()).toEqual({ ...prevState2, display: false })
  expect(susCb).toBeCalledTimes(1)

  // batching 相当于slient = true
  const prevState3 = state.getState()
  expect(prevState3.initialized).toEqual(false)
  expect(prevState3.mounted).toEqual(false)
  state.batch(() => {
    state.setState(cb3)
    state.setState(cb4)
  })

  expect(state.getState().initialized).toEqual(true)
  expect(state.getState().mounted).toEqual(true)
  expect(state.getState()).toEqual({ ...prevState3, initialized: true, mounted: true })
  // 这次notify是由batch批处理结束调用的
  expect(susCb).toBeCalledTimes(2)
  expect(susCb).toBeCalledWith({ ...prevState3, initialized: true, mounted: true })
})
test('getSourceState', () => {
  const state = new VirtualFieldState({ useDirty: false })
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
  const state = new VirtualFieldState({ useDirty: false })
  const cb1 = (draft) => draft.change = true
  const prevState1 = state.unsafe_getSourceState()
  expect(prevState1.change).toEqual(undefined)

  state.unsafe_setSourceState(cb1)
  expect(state.unsafe_getSourceState()).toEqual({ ...prevState1, change: true })
})
test('hasChanged', () => {
  const state = new VirtualFieldState({ useDirty: true })
  expect(state.dirtyNum).toEqual(0)
  expect(state.hasChanged()).toEqual(false)
  state.dirtyNum = 1
  expect(state.hasChanged()).toEqual(true)
  state.dirtyNum = 0
  expect(state.hasChanged()).toEqual(false)
  state.dirtys.visible = true
  expect(state.hasChanged()).toEqual(false)
  expect(state.hasChanged('visible')).toEqual(true)
})
test('getChanged', () => {
  const state = new VirtualFieldState({ useDirty: true })
  expect(state.getChanged()).toEqual({})
  state.dirtys.visible = true
  expect(state.getChanged()).toEqual({ visible: true })
  state.dirtys = { display: true }
  expect(state.getChanged()).toEqual({ display: true })
})
test('hasChangedInSequence', () => {
  const state = new VirtualFieldState({ useDirty: true })
  expect(state.hasChangedInSequence()).toEqual(false)
  state.persistDirtys.visible = true
  expect(state.hasChangedInSequence()).toEqual(true)
  expect(state.hasChangedInSequence('visible')).toEqual(true)
  state.persistDirtys.visible = false
  expect(state.hasChangedInSequence()).toEqual(false)
  expect(state.hasChangedInSequence('visible')).toEqual(false)
  state.persistDirtys = {}
  expect(state.hasChangedInSequence()).toEqual(false)
  state.persistDirtys = { visible: true }
  expect(state.hasChangedInSequence()).toEqual(true)
  expect(state.hasChangedInSequence('visible')).toEqual(true)
})
test('getChangedInSequence', () => {
  const state = new VirtualFieldState({ useDirty: true })
  expect(state.getChangedInSequence()).toEqual({})
  state.persistDirtys.visible = true
  expect(state.getChangedInSequence()).toEqual({ visible: true })
  state.persistDirtys = { display: true }
  expect(state.getChangedInSequence()).toEqual({ display: true })
})