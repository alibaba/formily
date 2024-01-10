import { observable, observe } from '../'

test('deep observe', () => {
  const obs = observable<any>({
    aa: {
      bb: {
        cc: [11, 22, 33],
      },
    },
    ee: observable([]),
  })
  const handler = jest.fn()
  observe(obs, handler)
  obs.dd = 123
  obs.aa.bb.cc.push(44)
  expect(obs.aa.bb.cc).toEqual([11, 22, 33, 44])
  expect(handler).toHaveBeenCalledTimes(2)
  delete obs.aa
  expect(handler).toHaveBeenCalledTimes(3)

  // Are these expected behaviors?
  obs.ee.push(11)
  expect(handler).toHaveBeenCalledTimes(3)
  obs.ee = []
  expect(handler).toHaveBeenCalledTimes(4)
  obs.ee.push(11)
  expect(handler).toHaveBeenCalledTimes(5)
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

test('array delete', () => {
  const array = observable([{ value: 1 }, { value: 2 }])

  const fn = jest.fn()

  const dispose = observe(array, (change) => {
    if (change.type === 'set' && change.key === 'value') {
      fn(change.path?.join('.'))
    }
  })

  array[0].value = 3
  expect(fn.mock.calls[0][0]).toBe('0.value')

  array.splice(0, 1)

  array[0].value = 3
  expect(fn.mock.calls[1][0]).toBe('0.value')

  dispose()
})

test('observe dynamic tree', () => {
  const handler = jest.fn()
  const tree = observable<any>({})
  const childTree = observable({})
  tree.children = childTree
  observe(tree, handler)
  tree.children.aa = 123
  expect(handler).toBeCalledTimes(1)
})

test('invalid target', () => {
  expect(() => observe(function () {})).toThrowError()
})
