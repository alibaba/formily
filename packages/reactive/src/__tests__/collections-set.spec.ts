import { observable, autorun, raw } from '..'

describe('Set', () => {
  test('should be a proper JS Set', () => {
    const set = observable(new Set())
    expect(set).toBeInstanceOf(Set)
    expect(raw(set)).toBeInstanceOf(Set)
  })

  test('should autorun mutations', () => {
    const handler = jest.fn()
    const set = observable(new Set())
    autorun(() => handler(set.has('value')))

    expect(handler).toBeCalledTimes(1)
    expect(handler).lastCalledWith(false)
    set.add('value')
    expect(handler).toBeCalledTimes(2)
    expect(handler).lastCalledWith(true)
    set.delete('value')
    expect(handler).toBeCalledTimes(3)
    expect(handler).lastCalledWith(false)
  })

  test('should autorun size mutations', () => {
    const handler = jest.fn()
    const set = observable(new Set())
    autorun(() => handler(set.size))

    expect(handler).toBeCalledTimes(1)
    expect(handler).lastCalledWith(0)
    set.add('value')
    set.add('value2')
    expect(handler).toBeCalledTimes(3)
    expect(handler).lastCalledWith(2)
    set.delete('value')
    expect(handler).toBeCalledTimes(4)
    expect(handler).lastCalledWith(1)
    set.clear()
    expect(handler).toBeCalledTimes(5)
    expect(handler).lastCalledWith(0)
  })

  test('should autorun for of iteration', () => {
    const handler = jest.fn()
    const set = observable(new Set<number>())
    autorun(() => {
      let sum = 0
      // eslint-disable-next-line no-unused-vars
      for (let num of set) {
        sum += num
      }
      handler(sum)
    })

    expect(handler).toBeCalledTimes(1)
    expect(handler).lastCalledWith(0)
    set.add(3)
    expect(handler).toBeCalledTimes(2)
    expect(handler).lastCalledWith(3)
    set.add(2)
    expect(handler).toBeCalledTimes(3)
    expect(handler).lastCalledWith(5)
    set.delete(3)
    expect(handler).toBeCalledTimes(4)
    expect(handler).lastCalledWith(2)
    set.clear()
    expect(handler).toBeCalledTimes(5)
    expect(handler).lastCalledWith(0)
  })

  test('should autorun forEach iteration', () => {
    const handler = jest.fn()
    const set = observable(new Set<number>())
    autorun(() => {
      let sum = 0
      set.forEach((num) => (sum += num))
      handler(sum)
    })

    expect(handler).toBeCalledTimes(1)
    expect(handler).lastCalledWith(0)
    set.add(3)
    expect(handler).toBeCalledTimes(2)
    expect(handler).lastCalledWith(3)
    set.add(2)
    expect(handler).toBeCalledTimes(3)
    expect(handler).lastCalledWith(5)
    set.delete(3)
    expect(handler).toBeCalledTimes(4)
    expect(handler).lastCalledWith(2)
    set.clear()
    expect(handler).toBeCalledTimes(5)
    expect(handler).lastCalledWith(0)
  })

  test('should autorun keys iteration', () => {
    const handler = jest.fn()
    const set = observable(new Set<number>())
    autorun(() => {
      let sum = 0
      for (let key of set.keys()) {
        sum += key
      }
      handler(sum)
    })

    expect(handler).toBeCalledTimes(1)
    expect(handler).lastCalledWith(0)
    set.add(3)
    expect(handler).toBeCalledTimes(2)
    expect(handler).lastCalledWith(3)
    set.add(2)
    expect(handler).toBeCalledTimes(3)
    expect(handler).lastCalledWith(5)
    set.delete(3)
    expect(handler).toBeCalledTimes(4)
    expect(handler).lastCalledWith(2)
    set.clear()
    expect(handler).toBeCalledTimes(5)
    expect(handler).lastCalledWith(0)
  })

  test('should autorun values iteration', () => {
    const handler = jest.fn()
    const set = observable(new Set<number>())
    autorun(() => {
      let sum = 0
      for (let num of set.values()) {
        sum += num
      }
      handler(sum)
    })

    expect(handler).toBeCalledTimes(1)
    expect(handler).lastCalledWith(0)
    set.add(3)
    expect(handler).toBeCalledTimes(2)
    expect(handler).lastCalledWith(3)
    set.add(2)
    expect(handler).toBeCalledTimes(3)
    expect(handler).lastCalledWith(5)
    set.delete(3)
    expect(handler).toBeCalledTimes(4)
    expect(handler).lastCalledWith(2)
    set.clear()
    expect(handler).toBeCalledTimes(5)
    expect(handler).lastCalledWith(0)
  })

  test('should autorun entries iteration', () => {
    const handler = jest.fn()
    const set = observable(new Set<number>())
    autorun(() => {
      let sum = 0
      // eslint-disable-next-line no-unused-vars
      for (let [, num] of set.entries()) {
        sum += num
      }
      handler(sum)
    })

    expect(handler).toBeCalledTimes(1)
    expect(handler).lastCalledWith(0)
    set.add(3)
    expect(handler).toBeCalledTimes(2)
    expect(handler).lastCalledWith(3)
    set.add(2)
    expect(handler).toBeCalledTimes(3)
    expect(handler).lastCalledWith(5)
    set.delete(3)
    expect(handler).toBeCalledTimes(4)
    expect(handler).lastCalledWith(2)
    set.clear()
    expect(handler).toBeCalledTimes(5)
    expect(handler).lastCalledWith(0)
  })

  test('should not autorun custom property mutations', () => {
    const handler = jest.fn()
    const set = observable(new Set())
    autorun(() => handler(set['customProp']))

    expect(handler).toBeCalledTimes(1)
    expect(handler).lastCalledWith(undefined)
    set['customProp'] = 'Hello World'
    expect(handler).toBeCalledTimes(1)
  })

  test('should not autorun non value changing mutations', () => {
    const handler = jest.fn()
    const set = observable(new Set())
    autorun(() => handler(set.has('value')))

    expect(handler).toBeCalledTimes(1)
    expect(handler).lastCalledWith(false)
    set.add('value')
    expect(handler).toBeCalledTimes(2)
    expect(handler).lastCalledWith(true)
    set.add('value')
    expect(handler).toBeCalledTimes(2)
    set.delete('value')
    expect(handler).toBeCalledTimes(3)
    expect(handler).lastCalledWith(false)
    set.delete('value')
    expect(handler).toBeCalledTimes(3)
    set.clear()
    expect(handler).toBeCalledTimes(3)
  })

  test('should not autorun raw data', () => {
    const handler = jest.fn()
    const set = observable(new Set())
    autorun(() => handler(raw(set).has('value')))

    expect(handler).toBeCalledTimes(1)
    expect(handler).lastCalledWith(false)
    set.add('value')
    expect(handler).toBeCalledTimes(1)
    set.delete('value')
    expect(handler).toBeCalledTimes(1)
  })

  test('should not autorun raw iterations', () => {
    const handler = jest.fn()
    const set = observable(new Set<number>())
    autorun(() => {
      let sum = 0
      // eslint-disable-next-line no-unused-vars
      for (let [, num] of raw(set).entries()) {
        sum += num
      }
      for (let key of raw(set).keys()) {
        sum += key
      }
      for (let num of raw(set).values()) {
        sum += num
      }
      raw(set).forEach((num) => {
        sum += num
      })
      // eslint-disable-next-line no-unused-vars
      for (let num of raw(set)) {
        sum += num
      }
      handler(sum)
    })

    expect(handler).toBeCalledTimes(1)
    expect(handler).lastCalledWith(0)
    set.add(2)
    set.add(3)
    expect(handler).toBeCalledTimes(1)
    set.delete(2)
    expect(handler).toBeCalledTimes(1)
  })

  test('should not be triggered by raw mutations', () => {
    const handler = jest.fn()
    const set = observable(new Set())
    autorun(() => handler(set.has('value')))

    expect(handler).toBeCalledTimes(1)
    expect(handler).lastCalledWith(false)
    raw(set).add('value')
    expect(handler).toBeCalledTimes(1)
    raw(set).delete('value')
    expect(handler).toBeCalledTimes(1)
    raw(set).clear()
    expect(handler).toBeCalledTimes(1)
  })

  test('should not autorun raw size mutations', () => {
    const handler = jest.fn()
    const set = observable(new Set())
    autorun(() => handler(raw(set).size))

    expect(handler).toBeCalledTimes(1)
    expect(handler).lastCalledWith(0)
    set.add('value')
    expect(handler).toBeCalledTimes(1)
  })

  test('should not be triggered by raw size mutations', () => {
    const handler = jest.fn()
    const set = observable(new Set())
    autorun(() => handler(set.size))

    expect(handler).toBeCalledTimes(1)
    expect(handler).lastCalledWith(0)
    raw(set).add('value')
    expect(handler).toBeCalledTimes(1)
  })
})
