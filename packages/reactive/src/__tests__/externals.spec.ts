import { isObservable, isSupportObservable, markObservable, markRaw, observable, toJS } from ".."

test('is support observable', () => {
  const obs = observable<any>({ aa: 111 })
  expect(isSupportObservable(obs)).toBeFalsy()
  expect(isSupportObservable(null)).toBeFalsy()
  expect(isSupportObservable([])).toBeTruthy()
  expect(isSupportObservable({})).toBeTruthy()
  expect(isSupportObservable({ $$typeof: {}, _owner: {} })).toBeFalsy()
  expect(isSupportObservable({ _isAMomentObject: {} })).toBeFalsy()
  expect(isSupportObservable({ _isJSONSchemaObject: {} })).toBeFalsy()
  expect(isSupportObservable({ toJS: () => {} })).toBeFalsy()
  expect(isSupportObservable({ toJSON: () => {} })).toBeFalsy()
  expect(isSupportObservable(new Map())).toBeTruthy()
  expect(isSupportObservable(new WeakMap())).toBeTruthy()
  expect(isSupportObservable(new Set())).toBeTruthy()
  expect(isSupportObservable(new WeakSet())).toBeTruthy()
})

describe('mark operation', () => {
  test('plain object should be observable', () => {
    const obs = observable<any>({ aa: 111 })
    expect(isObservable(obs)).toBeTruthy()
  })

  test('class instance should be observable', () => {
    class Class {}
    const obs = observable<any>(new Class())
    const obs2 = observable<any>(new Class())
    expect(isObservable(obs)).toBeTruthy()
    expect(isObservable(obs2)).toBeTruthy()
  })

  test('object with toJS function should NOT be observable', () => {
    const obs = observable<any>({ aa: 111, toJS: () => {} })
    expect(isObservable(obs)).toBeFalsy()
  })

  test('plain object marked as raw should NOT be observable', () => {
    const obs = observable<any>(markRaw({ aa: 111 }))
    expect(isObservable(obs)).toBeFalsy()
  })

  test('class marked as raw instance should NOT be observable', () => {
    class Class {}
    markRaw(Class)
    const obs = observable<any>(new Class())
    const obs2 = observable<any>(new Class())
    expect(isObservable(obs)).toBeFalsy()
    expect(isObservable(obs2)).toBeFalsy()
  })

  test('object with toJS function marked as observable should be observable', () => {
    const obs = observable<any>(markObservable({ aa: 111, toJS: () => {} }))
    expect(isObservable(obs)).toBeTruthy()
  })

  test('plain object marked as raw and observable should NOT be observable', () => {
    const obs = observable<any>(markRaw(markObservable({ aa: 111 })))
    expect(isObservable(obs)).toBeFalsy()
  })

  test('plain object marked as observable and raw should NOT be observable', () => {
    const obs = observable<any>(markObservable(markRaw({ aa: 111 })))
    expect(isObservable(obs)).toBeFalsy()
  })
})

test('recursive references tojs', () => {
  const obj: any = { aa: 111 }
  obj.obj = obj
  const obs = observable<any>(obj)
  obs.obs = obs
  expect(toJS(obs)).toBeTruthy()
})
