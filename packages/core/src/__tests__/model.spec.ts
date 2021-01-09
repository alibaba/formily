import { createModel } from '../shared/model'

const displayName = 'TEST'
const defaultState = { type: 'factory defaultState' }
const defaultProps = { type: 'factory defaultProps' }

class State {
  static displayName = displayName
  static defaultProps = defaultProps

  name: string
  props: any

  state = { ...defaultState }

  constructor(props) {
    this.name = 'inner'
    this.props = props
  }
}
const StateModel = createModel(State)

test('createStateModel', () => {
  const params = { modelType: 'model defaultProps' }
  const state1 = new StateModel(params)
  // model properties
  expect(state1.state).toEqual({ displayName, ...defaultState })
  expect(state1.props).toEqual({ ...defaultProps, ...params })
  expect(state1.dirtys).toEqual({})
  expect(state1.dirtyCount).toEqual(0)
  expect(state1.batching).toEqual(false)
  expect(state1.displayName).toEqual(displayName)
  expect(state1.factory).toEqual({
    state: { displayName, ...defaultState },
    props: { ...defaultProps, ...params },
    name: 'inner'
  })
})

describe('proxy model', () => {
  test('subscribe/unsubscribe', () => {
    const state = new StateModel({ useDirty: false })
    const cb = jest.fn()
    const idx = state.subscribe(cb)
    const paylaod = { hello: 'world' }
    state.notify(paylaod)
    expect(cb).toBeCalledTimes(1)
    expect(cb).toBeCalledWith(paylaod)
    state.unsubscribe(idx)
    state.notify(paylaod)
    expect(cb).toBeCalledTimes(1)
    expect(cb).toBeCalledWith(paylaod)
  })

  test('getState', () => {
    const state = new StateModel({ useDirty: false })
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
    const state = new StateModel({ useDirty: false })
    const susCb = jest.fn()
    state.subscribe(susCb)
    const cb1 = draft => (draft.change = true)
    const cb2 = draft => (draft.withNotify = true)
    const cb3 = draft => (draft.withBatching = true)
    const cb4 = draft => (draft.withBatching2 = true)
    const prevState1 = state.getState()
    expect(prevState1.change).toEqual(undefined)

    // 默认 slient = false, 触发notify 通知UI更新
    state.setState(cb1)
    expect(state.getState().change).toEqual(true)
    expect(state.getState()).toEqual({ ...prevState1, change: true })
    expect(susCb).toBeCalledTimes(1)
    expect(susCb).toBeCalledWith({ ...prevState1, change: true })

    // slient = true 不触发notify
    const prevState2 = state.getState()
    expect(prevState2.withNotify).toEqual(undefined)
    state.setState(cb2, true)
    expect(state.getState().withNotify).toEqual(true)
    expect(state.getState()).toEqual({ ...prevState2, withNotify: true })
    expect(susCb).toBeCalledTimes(1)

    // batching 相当于slient = true
    const prevState3 = state.getState()
    expect(prevState3.withBatching).toEqual(undefined)
    expect(prevState3.withBatching2).toEqual(undefined)
    state.batch(() => {
      state.setState(cb3)
      state.setState(cb4)
    })

    expect(state.getState().withBatching).toEqual(true)
    expect(state.getState().withBatching2).toEqual(true)
    expect(state.getState()).toEqual({
      ...prevState3,
      withBatching: true,
      withBatching2: true
    })
    // 这次notify是由batch批处理结束调用的
    expect(susCb).toBeCalledTimes(2)
    expect(susCb).toBeCalledWith({
      ...prevState3,
      withBatching: true,
      withBatching2: true
    })
  })
  test('getSourceState', () => {
    const state = new StateModel({ useDirty: false })
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
    const state = new StateModel({ useDirty: false })
    const cb1 = draft => (draft.change = true)
    const prevState1 = state.getSourceState()
    expect(prevState1.change).toEqual(undefined)

    state.setSourceState(cb1)
    expect(state.getSourceState()).toEqual({ ...prevState1, change: true })
  })
  test('isDirty', () => {
    const state = new StateModel({ useDirty: false })
    expect(state.dirtyCount).toEqual(0)
    expect(state.isDirty()).toEqual(false)
    state.dirtyCount = 1
    expect(state.isDirty()).toEqual(true)
    state.dirtyCount = 0
    expect(state.isDirty()).toEqual(false)
    state.dirtys = { change: true }
    expect(state.isDirty()).toEqual(false)
    expect(state.isDirty('change')).toEqual(true)
  })
})

describe('dirty model', () => {
  test('subscribe/unsubscribe', () => {
    const state = new StateModel({ useDirty: true })
    const cb = jest.fn()
    const idx = state.subscribe(cb)
    const paylaod = { hello: 'world' }
    state.notify(paylaod)
    expect(cb).toBeCalledTimes(1)
    expect(cb).toBeCalledWith(paylaod)
    state.unsubscribe(idx)
    state.notify(paylaod)
    expect(cb).toBeCalledTimes(1)
    expect(cb).toBeCalledWith(paylaod)
  })

  test('getState', () => {
    const state = new StateModel({ useDirty: true })
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
    const state = new StateModel({ useDirty: true })
    const susCb = jest.fn()
    state.subscribe(susCb)
    const cb1 = draft => (draft.change = true)
    const cb2 = draft => (draft.withNotify = true)
    const cb3 = draft => (draft.withBatching = true)
    const cb4 = draft => (draft.withBatching2 = true)
    const prevState1 = state.getState()
    expect(prevState1.change).toEqual(undefined)

    // 默认 slient = false, 触发notify 通知UI更新
    state.setState(cb1)
    expect(state.getState().change).toEqual(true)
    expect(state.getState()).toEqual({ ...prevState1, change: true })
    expect(susCb).toBeCalledTimes(1)
    expect(susCb).toBeCalledWith({ ...prevState1, change: true })

    // slient = true 不触发notify
    const prevState2 = state.getState()
    expect(prevState2.withNotify).toEqual(undefined)
    state.setState(cb2, true)
    expect(state.getState().withNotify).toEqual(true)
    expect(state.getState()).toEqual({ ...prevState2, withNotify: true })
    expect(susCb).toBeCalledTimes(1)

    // batching 相当于slient = true
    const prevState3 = state.getState()
    expect(prevState3.withBatching).toEqual(undefined)
    expect(prevState3.withBatching2).toEqual(undefined)
    state.batch(() => {
      state.setState(cb3)
      state.setState(cb4)
    })

    expect(state.getState().withBatching).toEqual(true)
    expect(state.getState().withBatching2).toEqual(true)
    expect(state.getState()).toEqual({
      ...prevState3,
      withBatching: true,
      withBatching2: true
    })
    // 这次notify是由batch批处理结束调用的
    expect(susCb).toBeCalledTimes(2)
    expect(susCb).toBeCalledWith({
      ...prevState3,
      withBatching: true,
      withBatching2: true
    })
  })
  test('getSourceState', () => {
    const state = new StateModel({ useDirty: true })
    const cb = jest.fn()
    state.getState(cb)
    expect(cb).toBeCalledTimes(1)
    expect(cb).toBeCalledWith(state.state)
    const syncState = state.getState()
    expect(syncState).toEqual(state.state)
  })
  test('setSourceState', () => {
    const state = new StateModel({ useDirty: true })
    const cb1 = draft => (draft.change = true)
    const prevState1 = state.getSourceState()
    expect(prevState1.change).toEqual(undefined)

    state.setSourceState(cb1)
    expect(state.getSourceState()).toEqual({ ...prevState1, change: true })
  })
  test('hasChanged', () => {
    const state = new StateModel({ useDirty: true })
    expect(state.dirtyCount).toEqual(0)
    expect(state.isDirty()).toEqual(false)
    state.dirtyCount = 1
    expect(state.isDirty()).toEqual(true)
    state.dirtyCount = 0
    expect(state.isDirty()).toEqual(false)
    state.dirtys = { change: true }
    expect(state.isDirty()).toEqual(false)
    expect(state.isDirty('change')).toEqual(true)
  })
})
