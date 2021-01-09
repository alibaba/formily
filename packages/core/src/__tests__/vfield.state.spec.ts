import { VirtualField } from '../models/virtual-field'

test('computeState', () => {
  const state = new VirtualField()
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
  expect(state.getState().props).toEqual({})
  state.setState((draft) => {
    draft.props = { hello: 'world' }
  })
  expect(state.getState().props).toEqual({ hello: 'world' })
  state.setState((draft) => {
    draft.props = undefined
  })
  expect(state.getState().props).toEqual({})
})


test('subscribe/unsubscribe', () => {
  const state = new VirtualField()
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
  const state = new VirtualField()
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
  const state = new VirtualField()
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
  const state = new VirtualField()
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
  const state = new VirtualField()
  const cb1 = (draft) => draft.change = true
  const prevState1 = state.getSourceState()
  expect(prevState1.change).toEqual(undefined)

  state.setSourceState(cb1)
  expect(state.getSourceState()).toEqual({ ...prevState1, change: true })
})
test('isDirty', () => {
  const state = new VirtualField()
  expect(state.dirtyCount).toEqual(0)
  expect(state.isDirty()).toEqual(false)
  state.dirtyCount = 1
  expect(state.isDirty()).toEqual(true)
  state.dirtyCount = 0
  expect(state.isDirty()).toEqual(false)
  state.dirtys = { visible : true }
  expect(state.isDirty()).toEqual(false)
  expect(state.isDirty('visible')).toEqual(true)
})
