import { observable, reaction, autorun } from '../'
import { batch } from '../batch'
import { define } from '../model'

test('autorun', () => {
  const obs = observable({
    aa: {
      bb: 123,
    },
  })
  const handler = jest.fn()
  const dispose = autorun(() => {
    handler(obs.aa.bb)
  })
  obs.aa.bb = 123
  expect(handler).toBeCalledTimes(1)
  obs.aa.bb = 111
  expect(handler).toBeCalledTimes(2)
  dispose()
  obs.aa.bb = 222
  expect(handler).toBeCalledTimes(2)
})

test('reaction', () => {
  const obs = observable({
    aa: {
      bb: 123,
    },
  })
  const handler = jest.fn()
  const dispose = reaction(() => {
    return obs.aa.bb
  }, handler)
  obs.aa.bb = 123
  expect(handler).toBeCalledTimes(0)
  obs.aa.bb = 111
  expect(handler).toBeCalledTimes(1)
  dispose()
  obs.aa.bb = 222
  expect(handler).toBeCalledTimes(1)
})

test('reaction dirty check', () => {
  const obs: any = {
    aa: 123,
  }
  define(obs, {
    aa: observable.ref,
  })
  const handler = jest.fn()
  reaction(() => {
    return obs.aa
  }, handler)
  batch(() => {
    obs.aa = 123
    obs.aa = 123
  })

  expect(handler).toBeCalledTimes(0)
})

test('action in reaction', () => {})
