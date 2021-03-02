import { observable, batchable } from '../'
import { reaction } from '../autorun'
import { observe } from '../observe'
import { isObservable } from '../shared'

test('observable annotation', () => {
  const obs = observable<any>({
    aa: 111,
  })
  const handler = jest.fn()
  const handler1 = jest.fn()
  observe(obs, handler1)
  reaction(() => {
    handler(obs.aa)
  })
  obs.aa = { bb: { cc: 123 } }
  obs.aa.bb = 333
  expect(handler).toBeCalledTimes(2)
  expect(handler1).toBeCalledTimes(2)
})

test('shallow annotation', () => {
  const obs = observable.shallow({
    aa: 111,
  })
  const handler = jest.fn()
  const handler1 = jest.fn()
  observe(obs, handler1)
  reaction(() => {
    handler(obs.aa)
  })
  obs.aa = { bb: { cc: 123 } }
  expect(isObservable(obs)).toBeTruthy()
  expect(isObservable(obs.aa)).toBeFalsy()
  expect(isObservable(obs.aa.bb)).toBeFalsy()
  obs.aa.bb = 333
  obs.cc = 444
  expect(handler).toBeCalledTimes(2)
  expect(handler1).toBeCalledTimes(2)
})

test('box annotation', () => {
  const obs = observable.box(123)
  const handler = jest.fn()
  const handler1 = jest.fn()
  observe(obs, handler1)
  reaction(() => {
    handler(obs.get())
  })
  obs.set(333)
  expect(handler).toBeCalledWith(123)
  expect(handler).toBeCalledWith(333)
  expect(handler1).toBeCalledTimes(1)
})

test('ref annotation', () => {
  const obs = observable.ref(123)
  const handler = jest.fn()
  const handler1 = jest.fn()
  observe(obs, handler1)
  reaction(() => {
    handler(obs.value)
  })
  obs.value = 333
  expect(handler).toBeCalledWith(123)
  expect(handler).toBeCalledWith(333)
  expect(handler1).toBeCalledTimes(1)
})

test('action annotation', () => {
  const obs = observable<any>({})
  const setData = batchable(() => {
    obs.aa = 123
    obs.bb = 321
  })
  const handler = jest.fn()
  reaction(() => {
    handler([obs.aa, obs.bb])
  })
  setData()
  expect(handler).toBeCalledTimes(2)
})

test('no action annotation', () => {
  const obs = observable<any>({})
  const setData = () => {
    obs.aa = 123
    obs.bb = 321
  }
  const handler = jest.fn()
  reaction(() => {
    handler([obs.aa, obs.bb])
  })
  setData()
  expect(handler).toBeCalledTimes(3)
})
