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
})
