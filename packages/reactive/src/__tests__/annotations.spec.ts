import { observable, action, model } from '../'
import { autorun, reaction } from '../autorun'
import { observe } from '../observe'
import { isObservable } from '../externals'
import { untracked } from '../untracked'

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
  const obs = observable.shallow<any>({
    aa: 111,
  })
  const handler = jest.fn()
  const handler1 = jest.fn()
  observe(obs, handler1)
  reaction(() => {
    handler(obs.aa)
  })
  obs.aa = { bb: { cc: 123 } }
  expect(isObservable(obs)).toBe(true)
  expect(isObservable(obs.aa)).toBe(false)
  expect(isObservable(obs.aa.bb)).toBe(false)
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
  const boxValue = 333
  obs.set(boxValue)
  expect(handler1).toBeCalledTimes(1)
  expect(handler1.mock.calls[0][0]).toMatchObject({
    value: boxValue,
  })
  expect(handler).toBeCalledTimes(2)
  expect(handler.mock.calls[0][0]).toBe(123)
  expect(handler.mock.calls[1][0]).toBe(boxValue)
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
  expect(handler).nthCalledWith(1, 123)
  expect(handler).nthCalledWith(2, 333)
  expect(handler1).toBeCalledTimes(1)
})

test('action annotation', () => {
  const obs = observable<any>({})
  const setData = action.bound(() => {
    obs.aa = 123
    obs.bb = 321
  })
  const handler = jest.fn()
  reaction(() => {
    return [obs.aa, obs.bb]
  }, handler)
  setData()
  expect(handler).toBeCalledTimes(1)
  expect(handler).toBeCalledWith([123, 321], [undefined, undefined])
})

test('no action annotation', () => {
  const obs = observable<any>({})
  const setData = () => {
    obs.aa = 123
    obs.bb = 321
  }
  const handler = jest.fn()
  reaction(() => {
    return [obs.aa, obs.bb]
  }, handler)
  setData()
  expect(handler).toBeCalledTimes(2)
  expect(handler).nthCalledWith(1, [123, undefined], [undefined, undefined])
  expect(handler).nthCalledWith(2, [123, 321], [123, undefined])
})

test('computed annotation', () => {
  const obs = observable({
    aa: 11,
    bb: 22,
  })
  const handler = jest.fn(() => obs.aa + obs.bb)
  const runner1 = jest.fn()
  const runner2 = jest.fn()
  const runner3 = jest.fn()
  const compu = observable.computed(handler)
  expect(compu.value).toEqual(33)
  expect(handler).toBeCalledTimes(1)
  obs.aa = 22
  expect(handler).toBeCalledTimes(1)
  const dispose = autorun(() => {
    compu.value
    runner1()
  })
  const dispose2 = autorun(() => {
    compu.value
    runner2()
  })
  expect(compu.value).toEqual(44)
  expect(handler).toBeCalledTimes(2)
  obs.bb = 33
  expect(runner1).toBeCalledTimes(2)
  expect(runner2).toBeCalledTimes(2)
  expect(handler).toBeCalledTimes(3)
  expect(compu.value).toEqual(55)
  expect(handler).toBeCalledTimes(3)
  obs.aa = 11
  expect(runner1).toBeCalledTimes(3)
  expect(runner2).toBeCalledTimes(3)
  expect(handler).toBeCalledTimes(4)
  expect(compu.value).toEqual(44)
  expect(handler).toBeCalledTimes(4)
  dispose()
  obs.aa = 22
  expect(runner1).toBeCalledTimes(3)
  expect(runner2).toBeCalledTimes(4)
  expect(handler).toBeCalledTimes(5)
  expect(compu.value).toEqual(55)
  expect(handler).toBeCalledTimes(5)
  dispose2()
  obs.aa = 33
  expect(runner1).toBeCalledTimes(3)
  expect(runner2).toBeCalledTimes(4)
  expect(handler).toBeCalledTimes(5)
  expect(compu.value).toEqual(66)
  expect(handler).toBeCalledTimes(6)
  expect(compu.value).toEqual(66)
  expect(handler).toBeCalledTimes(6)
  autorun(() => {
    compu.value
    runner3()
  })
  expect(compu.value).toEqual(66)
  expect(handler).toBeCalledTimes(6)
  expect(compu.value).toEqual(66)
  expect(handler).toBeCalledTimes(6)
  obs.aa = 11
  expect(handler).toBeCalledTimes(7)
  expect(compu.value).toEqual(44)
  expect(handler).toBeCalledTimes(7)
})

test('computed chain annotation', () => {
  const obs = observable({
    aa: 11,
    bb: 22,
  })
  const handler = jest.fn(() => obs.aa + obs.bb)
  const compu1 = observable.computed(handler)
  const handler1 = jest.fn(() => compu1.value + 33)
  const compu2 = observable.computed(handler1)
  const dispose = autorun(() => {
    compu2.value
  })
  expect(handler).toBeCalledTimes(1)
  expect(handler1).toBeCalledTimes(1)
  expect(compu2.value).toEqual(66)
  expect(handler).toBeCalledTimes(1)
  expect(handler1).toBeCalledTimes(1)
  obs.aa = 22
  expect(handler).toBeCalledTimes(2)
  expect(handler1).toBeCalledTimes(2)
  expect(compu2.value).toEqual(77)
  expect(handler).toBeCalledTimes(2)
  expect(handler1).toBeCalledTimes(2)
  dispose()
  obs.aa = 11
  expect(handler).toBeCalledTimes(2)
  expect(handler1).toBeCalledTimes(2)
  expect(compu2.value).toEqual(66)
  expect(handler).toBeCalledTimes(3)
  expect(handler1).toBeCalledTimes(3)
})

test('computed with array length', () => {
  const obs = model({
    arr: [],
    get isEmpty() {
      return this.arr.length === 0
    },
    get isNotEmpty() {
      return !this.isEmpty
    },
  })
  const handler = jest.fn()
  autorun(() => {
    handler(obs.isEmpty)
    handler(obs.isNotEmpty)
  })
  expect(handler).toBeCalledTimes(2)
  obs.arr = ['1']
  obs.arr = []
  expect(handler).toBeCalledTimes(6)
})

test('computed with computed array length', () => {
  const obs = model({
    arr: [],
    get arr2() {
      return this.arr.map((item: number) => item + 1)
    },
    get isEmpty() {
      return this.arr2.length === 0
    },
    get isNotEmpty() {
      return !this.isEmpty
    },
  })
  const handler = jest.fn()
  const handler2 = jest.fn()
  autorun(() => {
    handler(obs.isNotEmpty)
    handler2(obs.arr2)
  })
  expect(handler).toBeCalledTimes(1)
  expect(handler).lastCalledWith(false)
  expect(handler2).toBeCalledTimes(1)
  expect(handler2.mock.calls[0][0]).toEqual([])
  obs.arr.push(1)
  expect(handler).lastCalledWith(true)
  expect(handler2.mock.calls[1][0]).toEqual([2])
  obs.arr = []
  expect(handler).lastCalledWith(false)
  expect(handler2.mock.calls[2][0]).toEqual([])
})

test('computed recollect dependencies', () => {
  const computed = jest.fn()
  const obs = model({
    aa: 'aaa',
    bb: 'bbb',
    cc: 'ccc',
    get compute() {
      computed()
      if (this.aa === 'aaa') {
        return this.bb
      }
      return this.cc
    },
  })
  const handler = jest.fn()
  autorun(() => {
    handler(obs.compute)
  })
  obs.aa = '111'
  obs.bb = '222'
  expect(computed).toBeCalledTimes(2)
})

test('computed no params', () => {
  observable.computed(null)
})

test('computed object params', () => {
  observable.computed({ get: () => {} })
})

test('computed no track get', () => {
  const obs = observable({ aa: 123 })
  const compu = observable.computed({ get: () => obs.aa })
  untracked(() => {
    expect(compu.value).toBe(123)
  })
})
