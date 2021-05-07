import { observable, observe } from '../'
import { ProxyRaw, RawNode } from '../environment'

const getObservers = (target: any) => {
  return RawNode.get(ProxyRaw.get(target))?.observers
}

const getDeepObservers = (target: any) => {
  return RawNode.get(ProxyRaw.get(target))?.deepObservers
}

test('deep observe', () => {
  const obs = observable<any>({
    aa: {
      bb: {
        cc: [11, 22, 33],
      },
    },
  })
  const handler = jest.fn()
  observe(obs, handler)
  obs.dd = 123
  obs.aa.bb.cc.push(44)
  expect(obs.aa.bb.cc).toEqual([11, 22, 33, 44])
  expect(handler).toHaveBeenCalledTimes(2)
  delete obs.aa
  expect(handler).toHaveBeenCalledTimes(3)
})

test('shallow observe', () => {
  const obs = observable<any>({
    aa: {
      bb: {
        cc: [11, 22, 33],
      },
    },
  })
  const handler = jest.fn()
  observe(obs, handler, false)
  obs.dd = 123
  obs.aa.bb.cc.push(44)
  expect(obs.aa.bb.cc).toEqual([11, 22, 33, 44])
  expect(handler).toHaveBeenCalledTimes(1)
  delete obs.aa
  expect(handler).toHaveBeenCalledTimes(2)
})

test('auto dispose observe', () => {
  const obs = observable<any>({
    aa: {
      bb: {
        cc: [11, 22, 33],
      },
    },
  })
  const handler = jest.fn()
  observe(obs, handler)
  observe(obs.aa, handler)
  observe(obs.aa.bb, handler)
  expect(getDeepObservers(obs.aa).length).toEqual(1)
  expect(getDeepObservers(obs.aa.bb).length).toEqual(1)
  obs.aa.bb = { kk: 'mm' }
  expect(getDeepObservers(obs.aa.bb).length).toEqual(1)
  expect(getDeepObservers(obs.aa).length).toEqual(1)
  expect(getObservers(obs.aa).length).toEqual(0)
  expect(handler).toBeCalledTimes(3)
  observe(obs.aa, handler)
  expect(getObservers(obs.aa).length).toEqual(0)
  expect(getDeepObservers(obs.aa).length).toEqual(2)
  delete obs.aa
})

test('root replace observe', () => {
  const obs = observable<any>({
    aa: {
      bb: {
        cc: [11, 22, 33],
      },
    },
  })
  const handler1 = jest.fn()
  const handler = jest.fn()
  observe(obs, handler1)
  observe(obs.aa, handler)
  obs.aa = {
    mm: 123,
  }
  expect(handler1).toBeCalledTimes(1)
  expect(handler).toBeCalledTimes(1)
  obs.aa = {
    bb: {
      cc: [11, 22, 33],
    },
  }
  obs.aa.bb.cc.push(44)
  expect(handler1).toBeCalledTimes(3)
  expect(handler).toBeCalledTimes(3)
})

test('dispose observe', () => {
  const obs = observable<any>({
    aa: {
      bb: {
        cc: [11, 22, 33],
      },
    },
  })
  const handler = jest.fn()
  const dispose = observe(obs, handler)
  obs.kk = 123
  expect(handler).toBeCalledTimes(1)
  dispose()
  obs.aa = 123
  expect(handler).toBeCalledTimes(1)
})

test('dispose observe', () => {
  const obs = observable<any>({
    aa: {
      bb: {
        cc: [11, 22, 33],
      },
    },
  })
  const handler = jest.fn()
  const dispose = observe(obs.aa, handler)
  obs.kk = 111
  expect(handler).toBeCalledTimes(0)
  obs.aa = { mm: 222 }
  expect(handler).toBeCalledTimes(1)
  obs.aa = { mm: 222 }
  expect(handler).toBeCalledTimes(2)
  obs.aa = { mm: '111' }
  expect(handler).toBeCalledTimes(3)
  obs.aa = { mm: 333 }
  expect(handler).toBeCalledTimes(4)
  dispose()
  obs.aa = { mm: 444 }
  expect(handler).toBeCalledTimes(4)
})
