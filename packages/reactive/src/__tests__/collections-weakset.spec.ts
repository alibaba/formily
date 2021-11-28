import { observable, autorun, raw } from '..'

describe('WeakSet', () => {
  test('should be a proper JS WeakSet', () => {
    const weakSet = observable(new WeakSet())
    expect(weakSet).toBeInstanceOf(WeakSet)
    expect(raw(weakSet)).toBeInstanceOf(WeakSet)
  })

  test('should autorun mutations', () => {
    const handler = jest.fn()
    const value = {}
    const weakSet = observable(new WeakSet())
    autorun(() => handler(weakSet.has(value)))

    expect(handler).toBeCalledTimes(1)
    expect(handler).lastCalledWith(false)
    weakSet.add(value)
    expect(handler).toBeCalledTimes(2)
    expect(handler).lastCalledWith(true)
    weakSet.delete(value)
    expect(handler).toBeCalledTimes(3)
    expect(handler).lastCalledWith(false)
  })

  test('should not autorun custom property mutations', () => {
    const handler = jest.fn()
    const weakSet = observable(new WeakSet())
    autorun(() => handler(weakSet['customProp']))

    expect(handler).toBeCalledTimes(1)
    expect(handler).lastCalledWith(undefined)
    weakSet['customProp'] = 'Hello World'
    expect(handler).toBeCalledTimes(1)
  })

  test('should not autorun non value changing mutations', () => {
    const handler = jest.fn()
    const value = {}
    const weakSet = observable(new WeakSet())
    autorun(() => handler(weakSet.has(value)))

    expect(handler).toBeCalledTimes(1)
    expect(handler).lastCalledWith(false)
    weakSet.add(value)
    expect(handler).toBeCalledTimes(2)
    expect(handler).lastCalledWith(true)
    weakSet.add(value)
    expect(handler).toBeCalledTimes(2)
    weakSet.delete(value)
    expect(handler).toBeCalledTimes(3)
    expect(handler).lastCalledWith(false)
    weakSet.delete(value)
    expect(handler).toBeCalledTimes(3)
  })

  test('should not autorun raw data', () => {
    const handler = jest.fn()
    const value = {}
    const weakSet = observable(new WeakSet())
    autorun(() => handler(raw(weakSet).has(value)))

    expect(handler).toBeCalledTimes(1)
    expect(handler).lastCalledWith(false)
    weakSet.add(value)
    expect(handler).toBeCalledTimes(1)
    weakSet.delete(value)
    expect(handler).toBeCalledTimes(1)
  })

  test('should not be triggered by raw mutations', () => {
    const handler = jest.fn()
    const value = {}
    const weakSet = observable(new WeakSet())
    autorun(() => handler(weakSet.has(value)))

    expect(handler).toBeCalledTimes(1)
    expect(handler).lastCalledWith(false)
    raw(weakSet).add(value)
    expect(handler).toBeCalledTimes(1)
    raw(weakSet).delete(value)
    expect(handler).toBeCalledTimes(1)
  })
})
