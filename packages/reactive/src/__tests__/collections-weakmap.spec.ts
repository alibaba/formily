import { observable, autorun, raw } from '..'

describe('WeakMap', () => {
  test('should be a proper JS WeakMap', () => {
    const weakMap = observable(new WeakMap())
    expect(weakMap).toBeInstanceOf(WeakMap)
    expect(raw(weakMap)).toBeInstanceOf(WeakMap)
  })

  test('should autorun mutations', () => {
    const handler = jest.fn()
    const key = {}
    const weakMap = observable(new WeakMap())
    autorun(() => handler(weakMap.get(key)))

    expect(handler).toBeCalledTimes(1)
    expect(handler).lastCalledWith(undefined)
    weakMap.set(key, 'value')
    expect(handler).toBeCalledTimes(2)
    expect(handler).lastCalledWith('value')
    weakMap.set(key, 'value2')
    expect(handler).toBeCalledTimes(3)
    expect(handler).lastCalledWith('value2')
    weakMap.delete(key)
    expect(handler).toBeCalledTimes(4)
    expect(handler).lastCalledWith(undefined)
  })

  test('should not autorun custom property mutations', () => {
    const handler = jest.fn()
    const weakMap = observable(new WeakMap())
    autorun(() => handler(weakMap['customProp']))

    expect(handler).toBeCalledTimes(1)
    expect(handler).lastCalledWith(undefined)
    weakMap['customProp'] = 'Hello World'
    expect(handler).toBeCalledTimes(1)
  })

  test('should not autorun non value changing mutations', () => {
    const handler = jest.fn()
    const key = {}
    const weakMap = observable(new WeakMap())
    autorun(() => handler(weakMap.get(key)))

    expect(handler).toBeCalledTimes(1)
    expect(handler).lastCalledWith(undefined)
    weakMap.set(key, 'value')
    expect(handler).toBeCalledTimes(2)
    expect(handler).lastCalledWith('value')
    weakMap.set(key, 'value')
    expect(handler).toBeCalledTimes(2)
    weakMap.delete(key)
    expect(handler).toBeCalledTimes(3)
    expect(handler).lastCalledWith(undefined)
    weakMap.delete(key)
    expect(handler).toBeCalledTimes(3)
  })

  test('should not autorun raw data', () => {
    const handler = jest.fn()
    const key = {}
    const weakMap = observable(new WeakMap())
    autorun(() => handler(raw(weakMap).get(key)))

    expect(handler).toBeCalledTimes(1)
    expect(handler).lastCalledWith(undefined)
    weakMap.set(key, 'Hello')
    expect(handler).toBeCalledTimes(1)
    weakMap.delete(key)
    expect(handler).toBeCalledTimes(1)
  })

  test('should not be triggered by raw mutations', () => {
    const handler = jest.fn()
    const key = {}
    const weakMap = observable(new WeakMap())
    autorun(() => handler(weakMap.get(key)))

    expect(handler).toBeCalledTimes(1)
    expect(handler).lastCalledWith(undefined)
    raw(weakMap).set(key, 'Hello')
    expect(handler).toBeCalledTimes(1)
    raw(weakMap).delete(key)
    expect(handler).toBeCalledTimes(1)
  })
})
