import { Heart, LifeCycle } from '../models'

test('buildLifecycles', () => {
  const heart = new Heart({
    lifecycles: [{} as any, [{}], 123],
  })
  expect(heart.lifecycles.length).toEqual(0)
})

test('clear heart', () => {
  const handler = jest.fn()
  const heart = new Heart({
    lifecycles: [new LifeCycle('event', handler)],
  })
  heart.publish('event')
  expect(handler).toBeCalledTimes(1)
  heart.clear()
  heart.publish('event')
  expect(handler).toBeCalledTimes(1)
  heart.publish({})
})

test('set lifecycles', () => {
  const handler = jest.fn()
  const heart = new Heart()
  heart.setLifeCycles([new LifeCycle('event', handler)])
  heart.publish('event')
  expect(handler).toBeCalledTimes(1)
  heart.setLifeCycles()
})

test('add/remove lifecycle', () => {
  const handler = jest.fn()
  const heart = new Heart()
  heart.addLifeCycles('xxx', [new LifeCycle('event', handler)])
  heart.addLifeCycles('yyy')
  heart.publish('event')
  expect(handler).toBeCalledTimes(1)
  heart.removeLifeCycles('xxx')
  heart.publish('event')
  expect(handler).toBeCalledTimes(1)
})

test('add/clear lifecycle', () => {
  const handler = jest.fn()
  const heart = new Heart()
  heart.addLifeCycles('xxx', [new LifeCycle('event', handler)])
  heart.addLifeCycles('yyy')
  heart.publish('event')
  expect(handler).toBeCalledTimes(1)
  heart.clear()
  heart.publish('event')
  expect(handler).toBeCalledTimes(1)
})
