import {
  isObservable,
  isSupportObservable,
  markObservable,
  markRaw,
  observable,
  toJS,
} from '..'

test('is support observable', () => {
  const obs = observable<any>({ aa: 111 })
  class Class {}

  expect(isSupportObservable(obs)).toBe(true)
  expect(isSupportObservable(new Class())).toBe(true)
  expect(isSupportObservable(null)).toBe(false)
  expect(isSupportObservable([])).toBe(true)
  expect(isSupportObservable({})).toBe(true)
  expect(isSupportObservable({ $$typeof: {}, _owner: {} })).toBe(false)
  expect(isSupportObservable({ _isAMomentObject: {} })).toBe(false)
  expect(isSupportObservable({ _isJSONSchemaObject: {} })).toBe(false)
  expect(isSupportObservable({ toJS: () => {} })).toBe(false)
  expect(isSupportObservable({ toJSON: () => {} })).toBe(false)
  expect(isSupportObservable(new Map())).toBe(true)
  expect(isSupportObservable(new WeakMap())).toBe(true)
  expect(isSupportObservable(new Set())).toBe(true)
  expect(isSupportObservable(new WeakSet())).toBe(true)
})

describe('mark operation', () => {
  test('plain object should be observable', () => {
    const obs = observable<any>({ aa: 111 })
    expect(isObservable(obs)).toBe(true)
  })

  test('class instance should be observable', () => {
    class Class {}
    const obs = observable<any>(new Class())
    const obs2 = observable<any>(new Class())
    expect(isObservable(obs)).toBe(true)
    expect(isObservable(obs2)).toBe(true)
  })

  test('object with toJS function should NOT be observable', () => {
    const obs = observable<any>({ aa: 111, toJS: () => {} })
    expect(isObservable(obs)).toBe(false)
  })

  test('plain object marked as raw should NOT be observable', () => {
    const obs = observable<any>(markRaw({ aa: 111 }))
    expect(isObservable(obs)).toBe(false)
  })

  test('class marked as raw instance should NOT be observable', () => {
    class Class {}
    markRaw(Class)
    const obs = observable<any>(new Class())
    const obs2 = observable<any>(new Class())
    expect(isObservable(obs)).toBe(false)
    expect(isObservable(obs2)).toBe(false)
  })

  test('object with toJS function marked as observable should be observable', () => {
    const obs = observable<any>(markObservable({ aa: 111, toJS: () => {} }))
    expect(isObservable(obs)).toBe(true)
  })

  test('plain object marked as raw and observable should NOT be observable', () => {
    const obs = observable<any>(markRaw(markObservable({ aa: 111 })))
    expect(isObservable(obs)).toBe(false)
  })

  test('plain object marked as observable and raw should NOT be observable', () => {
    const obs = observable<any>(markObservable(markRaw({ aa: 111 })))
    expect(isObservable(obs)).toBe(false)
  })

  test('function marked as observable should NOT be observable', () => {
    const obs = observable<any>(markObservable(() => {}))
    expect(isObservable(obs)).toBe(false)
  })
})

test('recursive references tojs', () => {
  const obj: any = { aa: 111 }
  obj.obj = obj
  const obs = observable<any>(obj)
  obs.obs = obs
  expect(toJS(obs)).toBeTruthy()

  const arrObs = observable([{ aa: 1 }, { bb: 2 }, { cc: 3 }])
  expect(toJS(arrObs)).toEqual([{ aa: 1 }, { bb: 2 }, { cc: 3 }])
})
