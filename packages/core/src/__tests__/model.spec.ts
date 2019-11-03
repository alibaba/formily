import { createStateModel } from '../shared/model'

const displayName = 'TEST'
const defaultState = { type: 'controller defaultState' }
const defaultProps = { type: 'controller defaultProps' }

class State {
    static displayName = displayName
    static defaultState = defaultState
    static defaultProps = defaultProps

    name: string
    state: any
    props: any

    constructor(state, props) {
        this.name = 'inner'
        this.state = state
        this.props = props
    }

    dirtyCheck(dirtys) {}
    computeState(state, prevState) {}
}
const StateModel = createStateModel(State)

test('createStateModel', () => {
  const params = { modelType: 'model defaultProps' }
  const state1 = new StateModel(params)
  // model properties
  expect(state1.state).toEqual({ displayName, ...defaultState })
  expect(state1.props).toEqual({ ...defaultProps, ...params })
  expect(state1.dirtys).toEqual({})
  expect(state1.persistDirtys).toEqual({})
  expect(state1.dirtyNum).toEqual(0)
  expect(state1.batching).toEqual(false)
  expect(state1.displayName).toEqual(displayName)
  expect(state1.controller).toEqual({
    state: { displayName, ...defaultState },
    props: { ...defaultProps, ...params },
    name: 'inner',
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
  test('batch with ', () => {
    const state = new StateModel({ useDirty: false })
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
    const state = new StateModel({ useDirty: false })
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
    const state = new StateModel({ useDirty: false })
    const susCb = jest.fn()
    state.subscribe(susCb)
    const cb1 = (draft) => draft.change = true
    const cb2 = (draft) => draft.withNotify = true
    const cb3 = (draft) => draft.withBatching = true
    const cb4 = (draft) => draft.withBatching2 = true
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
    expect(state.getState()).toEqual({ ...prevState3, withBatching: true, withBatching2: true })
    // 这次notify是由batch批处理结束调用的
    expect(susCb).toBeCalledTimes(2)
    expect(susCb).toBeCalledWith({ ...prevState3, withBatching: true, withBatching2: true })
  })
  test('getSourceState', () => {
    const state = new StateModel({ useDirty: false })
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
    const state = new StateModel({ useDirty: false })
    const cb1 = (draft) => draft.change = true
    const prevState1 = state.unsafe_getSourceState()
    expect(prevState1.change).toEqual(undefined)

    state.unsafe_setSourceState(cb1)
    expect(state.unsafe_getSourceState()).toEqual({ ...prevState1, change: true })
  })
  test('hasChanged', () => {
    const state = new StateModel({ useDirty: false })
    expect(state.dirtyNum).toEqual(0)
    expect(state.hasChanged()).toEqual(false)
    state.dirtyNum = 1
    expect(state.hasChanged()).toEqual(true)
    state.dirtyNum = 0
    expect(state.hasChanged()).toEqual(false)
    state.dirtys.change = true
    expect(state.hasChanged()).toEqual(false)
    expect(state.hasChanged('change')).toEqual(true)
  })
  test('getChanged', () => {
    const state = new StateModel({ useDirty: false })
    expect(state.getChanged()).toEqual({})
    state.dirtys.change = true
    expect(state.getChanged()).toEqual({ change: true })
    state.dirtys = { changeObj: true }
    expect(state.getChanged()).toEqual({ changeObj: true })
  })
  test('hasChangedInSequence', () => {
    const state = new StateModel({ useDirty: false })
    expect(state.hasChangedInSequence()).toEqual(false)
    state.persistDirtys.change = true
    expect(state.hasChangedInSequence()).toEqual(true)
    expect(state.hasChangedInSequence('change')).toEqual(true)
    state.persistDirtys.change = false
    expect(state.hasChangedInSequence()).toEqual(false)
    expect(state.hasChangedInSequence('change')).toEqual(false)
    state.persistDirtys = {}
    expect(state.hasChangedInSequence()).toEqual(false)
    state.persistDirtys = { change: true }
    expect(state.hasChangedInSequence()).toEqual(true)
    expect(state.hasChangedInSequence('change')).toEqual(true)
  })
  test('getChangedInSequence', () => {
    const state = new StateModel({ useDirty: false })
    expect(state.getChangedInSequence()).toEqual({})
    state.persistDirtys.change = true
    expect(state.getChangedInSequence()).toEqual({ change: true })
    state.persistDirtys = { changeObj: true }
    expect(state.getChangedInSequence()).toEqual({ changeObj: true })
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
  test('batch', () => {
    const state = new StateModel({ useDirty: true })
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
    const state = new StateModel({ useDirty: true })
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
    const state = new StateModel({ useDirty: true })
    const susCb = jest.fn()
    state.subscribe(susCb)
    const cb1 = (draft) => draft.change = true
    const cb2 = (draft) => draft.withNotify = true
    const cb3 = (draft) => draft.withBatching = true
    const cb4 = (draft) => draft.withBatching2 = true
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
    expect(state.getState()).toEqual({ ...prevState3, withBatching: true, withBatching2: true })
    // 这次notify是由batch批处理结束调用的
    expect(susCb).toBeCalledTimes(2)
    expect(susCb).toBeCalledWith({ ...prevState3, withBatching: true, withBatching2: true })
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
    const cb1 = (draft) => draft.change = true
    const prevState1 = state.unsafe_getSourceState()
    expect(prevState1.change).toEqual(undefined)

    state.unsafe_setSourceState(cb1)
    expect(state.unsafe_getSourceState()).toEqual({ ...prevState1, change: true })
  })
  test('hasChanged', () => {
    const state = new StateModel({ useDirty: true })
    expect(state.dirtyNum).toEqual(0)
    expect(state.hasChanged()).toEqual(false)
    state.dirtyNum = 1
    expect(state.hasChanged()).toEqual(true)
    state.dirtyNum = 0
    expect(state.hasChanged()).toEqual(false)
    state.dirtys.change = true
    expect(state.hasChanged()).toEqual(false)
    expect(state.hasChanged('change')).toEqual(true)
  })
  test('getChanged', () => {
    const state = new StateModel({ useDirty: true })
    expect(state.getChanged()).toEqual({})
    state.dirtys.change = true
    expect(state.getChanged()).toEqual({ change: true })
    state.dirtys = { changeObj: true }
    expect(state.getChanged()).toEqual({ changeObj: true })
  })
  test('hasChangedInSequence', () => {
    const state = new StateModel({ useDirty: true })
    expect(state.hasChangedInSequence()).toEqual(false)
    state.persistDirtys.change = true
    expect(state.hasChangedInSequence()).toEqual(true)
    expect(state.hasChangedInSequence('change')).toEqual(true)
    state.persistDirtys.change = false
    expect(state.hasChangedInSequence()).toEqual(false)
    expect(state.hasChangedInSequence('change')).toEqual(false)
    state.persistDirtys = {}
    expect(state.hasChangedInSequence()).toEqual(false)
    state.persistDirtys = { change: true }
    expect(state.hasChangedInSequence()).toEqual(true)
    expect(state.hasChangedInSequence('change')).toEqual(true)
  })
  test('getChangedInSequence', () => {
    const state = new StateModel({ useDirty: true })
    expect(state.getChangedInSequence()).toEqual({})
    state.persistDirtys.change = true
    expect(state.getChangedInSequence()).toEqual({ change: true })
    state.persistDirtys = { changeObj: true }
    expect(state.getChangedInSequence()).toEqual({ changeObj: true })
  })
})
