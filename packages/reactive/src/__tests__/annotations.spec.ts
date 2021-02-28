import { annotations } from '../'
import { reaction } from '../autorun'
import { observe } from '../observe'

test('observable annotation', () => {
  const obs = annotations.observable({
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
  const obs = annotations.shallow({
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
  obs.cc = 444
  expect(handler).toBeCalledTimes(2)
  expect(handler1).toBeCalledTimes(2)
})

test('box annotation', () => {
  const obs = annotations.box(123)
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
  const obs = annotations.ref(123)
  const handler = jest.fn()
  const handler1 = jest.fn()
  observe(obs, handler1)
  reaction(() => {
    handler(obs.current)
  })
  obs.current = 333
  expect(handler).toBeCalledWith(123)
  expect(handler).toBeCalledWith(333)
  expect(handler1).toBeCalledTimes(1)
})
