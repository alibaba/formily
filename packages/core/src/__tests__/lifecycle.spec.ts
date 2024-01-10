import { LifeCycle } from '../models'

test('create lifecycle', () => {
  const handler1 = jest.fn()
  const lifecycle1 = new LifeCycle(handler1)
  lifecycle1.notify('event1')
  expect(handler1).toBeCalledTimes(1)
  expect(handler1).toBeCalledWith(
    {
      type: 'event1',
      payload: undefined,
    },
    undefined
  )
  lifecycle1.notify('event11', 'payload1')
  expect(handler1).toBeCalledTimes(2)
  expect(handler1).toBeCalledWith(
    {
      type: 'event11',
      payload: 'payload1',
    },
    undefined
  )
  const context: any = {}
  lifecycle1.notify('event12', 'payload11', context)
  expect(handler1).toBeCalledTimes(3)
  expect(handler1).toBeCalledWith(
    {
      type: 'event12',
      payload: 'payload11',
    },
    context
  )

  const handler2 = jest.fn()
  const lifecycle2 = new LifeCycle('event2', handler2)
  lifecycle2.notify('event1')
  expect(handler2).not.toBeCalled()
  lifecycle2.notify('event2')
  expect(handler2).toBeCalledTimes(1)

  const handler31 = jest.fn()
  const handler32 = jest.fn()
  const lifecycle3 = new LifeCycle({
    event31: handler31,
    event32: handler32,
  })
  lifecycle3.notify('event3')
  expect(handler31).not.toBeCalled()
  expect(handler32).not.toBeCalled()
  lifecycle3.notify('event31')
  expect(handler31).toBeCalledTimes(1)
  expect(handler32).not.toBeCalled()
  lifecycle3.notify('event32')
  expect(handler31).toBeCalledTimes(1)
  expect(handler32).toBeCalledTimes(1)
})
