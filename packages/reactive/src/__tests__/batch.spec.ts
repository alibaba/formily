import { observable, action, batch, autorun } from '..'

test('batch', () => {
  const obs = observable({
    aa: {
      bb: 123,
    },
  })
  const handler = jest.fn()
  autorun(() => {
    handler(obs.aa.bb)
  })
  obs.aa.bb = 111
  obs.aa.bb = 222
  expect(handler).toBeCalledTimes(3)
  batch(() => {
    obs.aa.bb = 333
    obs.aa.bb = 444
  })
  batch(() => {})
  expect(handler).toBeCalledTimes(4)
})

test('action', () => {
  const obs = observable({
    aa: {
      bb: 123,
    },
  })
  const handler = jest.fn()
  const batch = action(() => {
    obs.aa.bb = 333
    obs.aa.bb = 444
  })
  autorun(() => {
    handler(obs.aa.bb)
  })
  obs.aa.bb = 111
  obs.aa.bb = 222
  expect(handler).toBeCalledTimes(3)
  batch()
  expect(handler).toBeCalledTimes(4)
})


test('batch scope', () => {
  const obs = observable<any>({})

  const handler = jest.fn()

  autorun(() => {
    handler(obs.aa, obs.bb, obs.cc, obs.dd)
  })

  batch(() => {
    batch.scope(() => {
      obs.aa = 123
    })
    batch.scope(() => {
      obs.cc = 'ccccc'
    })
    obs.bb = 321
    obs.dd = 'ddddd'
  })

  expect(handler).toBeCalledTimes(4)
})
