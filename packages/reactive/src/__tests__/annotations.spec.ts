import { observable, action, model } from '../'
import { autorun, reaction } from '../autorun'
import { observe } from '../observe'
import { isObservable } from '../externals'

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
  expect(isObservable(obs)).toBeTruthy()
  expect(isObservable(obs.aa)).toBeFalsy()
  expect(isObservable(obs.aa.bb)).toBeFalsy()
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
  expect(handler).toBeCalledWith(123)
  expect(handler).toBeCalledWith(123)
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
  expect(handler).toBeCalledWith([123, undefined], [undefined, undefined])
  expect(handler).toBeCalledWith([123, 321], [123, undefined])
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
  expect(handler).toBeCalledWith(false)
  expect(handler).toBeCalledTimes(1)
  obs.arr.push(1)
  expect(handler).toBeCalledWith(true)
  obs.arr = []
  expect(handler).toBeCalledWith(false)
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

test('computed reject circular reaction', () => {
  const computingFn = jest.fn()
  const computedFn = jest.fn()
  const obs = model({
    a: 0,
    b: 0,
    get c() {
      computingFn()
      return this.a + this.b
    },
  })
  expect(obs.c).toEqual(0)
  expect(computingFn).toBeCalledTimes(1)
  expect(computedFn).toBeCalledTimes(0)
  autorun(() => {
    computedFn()
    if (obs.c % 2) obs.a++
    else obs.b++
  })
  expect(obs.c).toEqual(1)
  expect(computingFn).toBeCalledTimes(2)
  expect(computedFn).toBeCalledTimes(1)
  obs.a++
  expect(obs.c).toEqual(3)
  expect(computingFn).toBeCalledTimes(4)
  expect(computedFn).toBeCalledTimes(2)
  obs.b++
  expect(obs.c).toEqual(5)
  expect(computingFn).toBeCalledTimes(6)
  expect(computedFn).toBeCalledTimes(3)
  obs.a++
  obs.b++
  expect(obs.c).toEqual(9)
  expect(computingFn).toBeCalledTimes(10) // 9 -> 10
  expect(computedFn).toBeCalledTimes(5)
})

test('computed with cache', () => {
  const computingFnB = jest.fn()
  const computedFnB = jest.fn()
  const computingFnC = jest.fn()
  const computedFnC = jest.fn()
  const obs = model({
    a: 0,
    get b() {
      computingFnB()
      return this.a
    },
    get c() {
      computingFnC()
      void this.a
      return 0
    },
  })
  expect(obs.b).toEqual(0)
  expect(computingFnB).toBeCalledTimes(1)
  expect(computedFnB).toBeCalledTimes(0)
  expect(obs.c).toEqual(0)
  expect(computingFnC).toBeCalledTimes(1)
  expect(computedFnC).toBeCalledTimes(0)
  obs.a++
  expect(obs.b).toEqual(1)
  expect(computingFnB).toBeCalledTimes(2)
  expect(computedFnB).toBeCalledTimes(0)
  expect(obs.c).toEqual(0)
  expect(computingFnC).toBeCalledTimes(2)
  expect(computedFnC).toBeCalledTimes(0)
  obs.a++
  obs.a++
  expect(obs.b).toEqual(3)
  expect(computingFnB).toBeCalledTimes(3)
  expect(computedFnB).toBeCalledTimes(0)
  expect(obs.c).toEqual(0)
  expect(computingFnC).toBeCalledTimes(3)
  expect(computedFnC).toBeCalledTimes(0)
  const disposeB = autorun(() => {
    computedFnB()
    void obs.b
  })
  const disposeC = autorun(() => {
    computedFnC()
    void obs.c
  })
  expect(obs.b).toEqual(3)
  expect(computingFnB).toBeCalledTimes(3)
  expect(computedFnB).toBeCalledTimes(1)
  expect(obs.c).toEqual(0)
  expect(computingFnC).toBeCalledTimes(3)
  expect(computedFnC).toBeCalledTimes(1)
  obs.a++
  expect(obs.b).toEqual(4)
  expect(computingFnB).toBeCalledTimes(4)
  expect(computedFnB).toBeCalledTimes(2)
  expect(obs.c).toEqual(0)
  expect(computingFnC).toBeCalledTimes(4)
  expect(computedFnC).toBeCalledTimes(1)
  obs.a++
  obs.a++
  expect(computingFnB).toBeCalledTimes(6)
  expect(computedFnB).toBeCalledTimes(4)
  expect(computingFnC).toBeCalledTimes(6)
  expect(computedFnC).toBeCalledTimes(1)
  expect(obs.b).toEqual(6)
  expect(computingFnB).toBeCalledTimes(6)
  expect(computedFnB).toBeCalledTimes(4)
  expect(obs.c).toEqual(0)
  expect(computingFnC).toBeCalledTimes(6)
  expect(computedFnC).toBeCalledTimes(1)
  disposeB()
  disposeC()
  expect(obs.b).toEqual(6)
  expect(computingFnB).toBeCalledTimes(7)
  expect(computedFnB).toBeCalledTimes(4)
  expect(obs.c).toEqual(0)
  expect(computingFnC).toBeCalledTimes(7)
  expect(computedFnC).toBeCalledTimes(1)
  obs.a++
  expect(obs.b).toEqual(7)
  expect(computingFnB).toBeCalledTimes(8)
  expect(computedFnB).toBeCalledTimes(4)
  expect(obs.c).toEqual(0)
  expect(computingFnC).toBeCalledTimes(8)
  expect(computedFnC).toBeCalledTimes(1)
  obs.a++
  obs.a++
  expect(computingFnB).toBeCalledTimes(8)
  expect(computedFnB).toBeCalledTimes(4)
  expect(computingFnC).toBeCalledTimes(8)
  expect(computedFnC).toBeCalledTimes(1)
  expect(obs.b).toEqual(9)
  expect(computingFnB).toBeCalledTimes(9)
  expect(computedFnB).toBeCalledTimes(4)
  expect(obs.c).toEqual(0)
  expect(computingFnC).toBeCalledTimes(9)
  expect(computedFnC).toBeCalledTimes(1)
})

test('computed with chain dependency', () => {
  const b = { ing: jest.fn(), ed: jest.fn() }
  const ba = { ing: jest.fn(), ed: jest.fn() }
  const bb = { ing: jest.fn(), ed: jest.fn() }
  const c = { ing: jest.fn(), ed: jest.fn() }
  const ca = { ing: jest.fn(), ed: jest.fn() }
  const cb = { ing: jest.fn(), ed: jest.fn() }

  const obs = model({
    a: 0,
    get b() {
      b.ing()
      return this.a
    },
    get ba() {
      ba.ing()
      return this.b
    },
    get bb() {
      bb.ing(this.b)
      return 0
    },
    get c() {
      c.ing(this.a)
      return 0
    },
    get ca() {
      ca.ing()
      return this.c
    },
    get cb() {
      cb.ing(this.c)
      return 0
    },
  })

  const expectValues = ({ b, ba, bb, c, ca, cb }) => {
    expect(obs.b).toEqual(b)
    expect(obs.ba).toEqual(ba)
    expect(obs.bb).toEqual(bb)
    expect(obs.c).toEqual(c)
    expect(obs.ca).toEqual(ca)
    expect(obs.cb).toEqual(cb)
  }

  const expectCalledTimes = ({
    b: [bing, bed],
    ba: [baing, baed],
    bb: [bbing, bbed],
    c: [cing, ced],
    ca: [caing, caed],
    cb: [cbing, cbed],
  }) => {
    expect(b.ing).toBeCalledTimes(bing)
    expect(b.ed).toBeCalledTimes(bed)
    expect(ba.ing).toBeCalledTimes(baing)
    expect(ba.ed).toBeCalledTimes(baed)
    expect(bb.ing).toBeCalledTimes(bbing)
    expect(bb.ed).toBeCalledTimes(bbed)
    expect(c.ing).toBeCalledTimes(cing)
    expect(c.ed).toBeCalledTimes(ced)
    expect(ca.ing).toBeCalledTimes(caing)
    expect(ca.ed).toBeCalledTimes(caed)
    expect(cb.ing).toBeCalledTimes(cbing)
    expect(cb.ed).toBeCalledTimes(cbed)
  }

  expectCalledTimes({
    b: [0, 0],
    ba: [0, 0],
    bb: [0, 0],
    c: [0, 0],
    ca: [0, 0],
    cb: [0, 0],
  })

  const disposers = [
    autorun(() => b.ed(obs.b)),
    autorun(() => ba.ed(obs.ba)),
    autorun(() => bb.ed(obs.bb)),
    autorun(() => c.ed(obs.c)),
    autorun(() => ca.ed(obs.ca)),
    autorun(() => cb.ed(obs.cb)),
  ]

  expectCalledTimes({
    b: [1, 1],
    ba: [1, 1],
    bb: [1, 1],
    c: [1, 1],
    ca: [1, 1],
    cb: [1, 1],
  })

  obs.a++

  expectCalledTimes({
    b: [2, 2],
    ba: [2, 2],
    bb: [2, 1],
    c: [2, 1],
    ca: [1, 1],
    cb: [1, 1],
  })

  expectValues({ b: 1, ba: 1, bb: 0, c: 0, ca: 0, cb: 0 })

  expectCalledTimes({
    b: [2, 2],
    ba: [2, 2],
    bb: [2, 1],
    c: [2, 1],
    ca: [1, 1],
    cb: [1, 1],
  })

  obs.a++
  obs.a++
  obs.a++

  expectCalledTimes({
    b: [5, 5],
    ba: [5, 5],
    bb: [5, 1],
    c: [5, 1],
    ca: [1, 1],
    cb: [1, 1],
  })

  expectValues({ b: 4, ba: 4, bb: 0, c: 0, ca: 0, cb: 0 })

  expectCalledTimes({
    b: [5, 5],
    ba: [5, 5],
    bb: [5, 1],
    c: [5, 1],
    ca: [1, 1],
    cb: [1, 1],
  })

  disposers.forEach((disposer) => disposer())

  expectCalledTimes({
    b: [5, 5],
    ba: [5, 5],
    bb: [5, 1],
    c: [5, 1],
    ca: [1, 1],
    cb: [1, 1],
  })

  expectValues({ b: 4, ba: 4, bb: 0, c: 0, ca: 0, cb: 0 })

  expectCalledTimes({
    b: [6, 5],
    ba: [6, 5],
    bb: [6, 1],
    c: [6, 1],
    ca: [2, 1],
    cb: [2, 1],
  })
})

test('computed switch autorun', () => {
  const ing = jest.fn()

  const obs = model({
    a: 0,
    get b() {
      ing()
      return this.a
    },
  })

  expect(obs.b).toEqual(0)
  expect(ing).toBeCalledTimes(1)
  obs.a++
  expect(obs.b).toEqual(1)
  expect(ing).toBeCalledTimes(2)
  obs.a++
  obs.a++
  obs.a++
  expect(obs.b).toEqual(4)
  expect(ing).toBeCalledTimes(3)

  autorun(() => obs.b)()

  expect(obs.b).toEqual(4)
  expect(ing).toBeCalledTimes(4)
  obs.a++
  expect(obs.b).toEqual(5)
  expect(ing).toBeCalledTimes(5)
  obs.a++
  obs.a++
  obs.a++
  expect(obs.b).toEqual(8)
  expect(ing).toBeCalledTimes(6)
  expect(obs.b).toEqual(8)
  expect(obs.b).toEqual(8)
  expect(obs.b).toEqual(8)
  expect(ing).toBeCalledTimes(6)

  autorun(() => obs.b)

  expect(obs.b).toEqual(8)
  expect(ing).toBeCalledTimes(6)
  obs.a++
  expect(obs.b).toEqual(9)
  expect(ing).toBeCalledTimes(7)
  obs.a++
  obs.a++
  obs.a++
  expect(obs.b).toEqual(12)
  expect(ing).toBeCalledTimes(10)
})
