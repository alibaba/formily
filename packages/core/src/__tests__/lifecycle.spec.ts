import { LifeCycle } from '../models'

test('create lifecycle', () => {
  const handler1 = jest.fn()
  const handler2 = jest.fn()
  const c1 = new LifeCycle(handler1)
  const c2 = new LifeCycle({
    event: handler2,
  })
  c1.notify('event')
  c2.notify('event')
  expect(handler1).toBeCalledTimes(1)
  expect(handler2).toBeCalledTimes(1)
})
