import { observable, autorun, raw } from '..'

describe('Map', () => {
  test('should be a proper JS Map', () => {
    const map = observable(new Map())
    expect(map).toBeInstanceOf(Map)
    expect(raw(map)).toBeInstanceOf(Map)
  })

  test('should autorun mutations', () => {
    const handler = jest.fn()
    const map = observable(new Map())
    autorun(() => handler(map.get('key')))

    expect(handler).toBeCalledTimes(1)
    expect(handler).lastCalledWith(undefined)
    map.set('key', 'value')
    expect(handler).toBeCalledTimes(2)
    expect(handler).lastCalledWith('value')
    map.set('key', 'value2')
    expect(handler).toBeCalledTimes(3)
    expect(handler).lastCalledWith('value2')
    map.delete('key')
    expect(handler).toBeCalledTimes(4)
    expect(handler).lastCalledWith(undefined)
  })

  test('should autorun size mutations', () => {
    const handler = jest.fn()
    const map = observable(new Map())
    autorun(() => handler(map.size))

    expect(handler).toBeCalledTimes(1)
    expect(handler).lastCalledWith(0)
    map.set('key1', 'value')
    map.set('key2', 'value2')
    expect(handler).toBeCalledTimes(3)
    expect(handler).lastCalledWith(2)
    map.delete('key1')
    expect(handler).toBeCalledTimes(4)
    expect(handler).lastCalledWith(1)
    map.clear()
    expect(handler).toBeCalledTimes(5)
    expect(handler).lastCalledWith(0)
  })

  test('should autorun for of iteration', () => {
    const handler = jest.fn()
    const map = observable(new Map())
    autorun(() => {
      let sum = 0
      // eslint-disable-next-line no-unused-vars
      for (let [, num] of map) {
        sum += num
      }
      handler(sum)
    })

    expect(handler).toBeCalledTimes(1)
    expect(handler).lastCalledWith(0)
    map.set('key0', 3)
    expect(handler).toBeCalledTimes(2)
    expect(handler).lastCalledWith(3)
    map.set('key1', 2)
    expect(handler).toBeCalledTimes(3)
    expect(handler).lastCalledWith(5)
    map.delete('key0')
    expect(handler).toBeCalledTimes(4)
    expect(handler).lastCalledWith(2)
    map.clear()
    expect(handler).toBeCalledTimes(5)
    expect(handler).lastCalledWith(0)
  })

  test('should autorun forEach iteration', () => {
    const handler = jest.fn()
    const map = observable(new Map())
    autorun(() => {
      let sum = 0
      map.forEach((num) => (sum += num))
      handler(sum)
    })

    expect(handler).toBeCalledTimes(1)
    expect(handler).lastCalledWith(0)
    map.set('key0', 3)
    expect(handler).toBeCalledTimes(2)
    expect(handler).lastCalledWith(3)
    map.set('key1', 2)
    expect(handler).toBeCalledTimes(3)
    expect(handler).lastCalledWith(5)
    map.delete('key0')
    expect(handler).toBeCalledTimes(4)
    expect(handler).lastCalledWith(2)
    map.clear()
    expect(handler).toBeCalledTimes(5)
    expect(handler).lastCalledWith(0)
  })

  test('should autorun keys iteration', () => {
    const handler = jest.fn()
    const map = observable(new Map())
    autorun(() => {
      let sum = 0
      for (let key of map.keys()) {
        sum += key
      }
      handler(sum)
    })

    expect(handler).toBeCalledTimes(1)
    expect(handler).lastCalledWith(0)
    map.set(3, 3)
    expect(handler).toBeCalledTimes(2)
    expect(handler).lastCalledWith(3)
    map.set(2, 2)
    expect(handler).toBeCalledTimes(3)
    expect(handler).lastCalledWith(5)
    map.delete(3)
    expect(handler).toBeCalledTimes(4)
    expect(handler).lastCalledWith(2)
    map.clear()
    expect(handler).toBeCalledTimes(5)
    expect(handler).lastCalledWith(0)
  })

  test('should autorun values iteration', () => {
    const handler = jest.fn()
    const map = observable(new Map())
    autorun(() => {
      let sum = 0
      for (let num of map.values()) {
        sum += num
      }
      handler(sum)
    })

    expect(handler).toBeCalledTimes(1)
    expect(handler).lastCalledWith(0)
    map.set('key0', 3)
    expect(handler).toBeCalledTimes(2)
    expect(handler).lastCalledWith(3)
    map.set('key1', 2)
    expect(handler).toBeCalledTimes(3)
    expect(handler).lastCalledWith(5)
    map.delete('key0')
    expect(handler).toBeCalledTimes(4)
    expect(handler).lastCalledWith(2)
    map.clear()
    expect(handler).toBeCalledTimes(5)
    expect(handler).lastCalledWith(0)
  })

  test('should autorun entries iteration', () => {
    const handler = jest.fn()
    const map = observable(new Map())
    autorun(() => {
      let sum = 0
      // eslint-disable-next-line no-unused-vars
      for (let [, num] of map.entries()) {
        sum += num
      }
      handler(sum)
    })

    expect(handler).toBeCalledTimes(1)
    expect(handler).lastCalledWith(0)
    map.set('key0', 3)
    expect(handler).toBeCalledTimes(2)
    expect(handler).lastCalledWith(3)
    map.set('key1', 2)
    expect(handler).toBeCalledTimes(3)
    expect(handler).lastCalledWith(5)
    map.delete('key0')
    expect(handler).toBeCalledTimes(4)
    expect(handler).lastCalledWith(2)
    map.clear()
    expect(handler).toBeCalledTimes(5)
    expect(handler).lastCalledWith(0)
  })

  test('should be triggered by clearing', () => {
    const handler = jest.fn()
    const map = observable(new Map())
    autorun(() => handler(map.get('key')))

    expect(handler).toBeCalledTimes(1)
    expect(handler).lastCalledWith(undefined)
    map.set('key', 3)
    expect(handler).toBeCalledTimes(2)
    expect(handler).lastCalledWith(3)
    map.clear()
    expect(handler).toBeCalledTimes(3)
    expect(handler).lastCalledWith(undefined)
  })

  test('should not autorun custom property mutations', () => {
    const handler = jest.fn()
    const map = observable(new Map())
    autorun(() => handler(map['customProp']))

    expect(handler).toBeCalledTimes(1)
    expect(handler).lastCalledWith(undefined)
    map['customProp'] = 'Hello World'
    expect(handler).toBeCalledTimes(1)
  })

  test('should not autorun non value changing mutations', () => {
    const handler = jest.fn()
    const map = observable(new Map())
    autorun(() => handler(map.get('key')))

    expect(handler).toBeCalledTimes(1)
    expect(handler).lastCalledWith(undefined)
    map.set('key', 'value')
    expect(handler).toBeCalledTimes(2)
    expect(handler).lastCalledWith('value')
    map.set('key', 'value')
    expect(handler).toBeCalledTimes(2)
    map.delete('key')
    expect(handler).toBeCalledTimes(3)
    expect(handler).lastCalledWith(undefined)
    map.delete('key')
    expect(handler).toBeCalledTimes(3)
    map.clear()
    expect(handler).toBeCalledTimes(3)
  })

  test('should not autorun raw data', () => {
    const handler = jest.fn()
    const map = observable(new Map())
    autorun(() => handler(raw(map).get('key')))

    expect(handler).toBeCalledTimes(1)
    expect(handler).lastCalledWith(undefined)
    map.set('key', 'Hello')
    expect(handler).toBeCalledTimes(1)
    map.delete('key')
    expect(handler).toBeCalledTimes(1)
  })

  test('should not autorun raw iterations', () => {
    const handler = jest.fn()
    const map = observable(new Map())
    autorun(() => {
      let sum = 0
      // eslint-disable-next-line no-unused-vars
      for (let [, num] of raw(map).entries()) {
        sum += num
      }
      for (let key of raw(map).keys()) {
        sum += raw(map).get(key)
      }
      for (let num of raw(map).values()) {
        sum += num
      }
      raw(map).forEach((num) => {
        sum += num
      })
      // eslint-disable-next-line no-unused-vars
      for (let [, num] of raw(map)) {
        sum += num
      }
      handler(sum)
    })

    expect(handler).toBeCalledTimes(1)
    expect(handler).lastCalledWith(0)
    map.set('key1', 2)
    map.set('key2', 3)
    expect(handler).toBeCalledTimes(1)
    map.delete('key1')
    expect(handler).toBeCalledTimes(1)
  })

  test('should not be triggered by raw mutations', () => {
    const handler = jest.fn()
    const map = observable(new Map())
    autorun(() => handler(map.get('key')))

    expect(handler).toBeCalledTimes(1)
    expect(handler).lastCalledWith(undefined)
    raw(map).set('key', 'Hello')
    expect(handler).toBeCalledTimes(1)
    raw(map).delete('key')
    expect(handler).toBeCalledTimes(1)
    raw(map).clear()
    expect(handler).toBeCalledTimes(1)
  })

  test('should not autorun raw size mutations', () => {
    const handler = jest.fn()
    const map = observable(new Map())
    autorun(() => handler(raw(map).size))

    expect(handler).toBeCalledTimes(1)
    expect(handler).lastCalledWith(0)
    map.set('key', 'value')
    expect(handler).toBeCalledTimes(1)
  })

  test('should not be triggered by raw size mutations', () => {
    const handler = jest.fn()
    const map = observable(new Map())
    autorun(() => handler(map.size))

    expect(handler).toBeCalledTimes(1)
    expect(handler).lastCalledWith(0)
    raw(map).set('key', 'value')
    expect(handler).toBeCalledTimes(1)
  })

  test('should support objects as key', () => {
    const handler = jest.fn()
    const key = {}
    const map = observable(new Map())
    autorun(() => handler(map.get(key)))

    expect(handler).toBeCalledTimes(1)
    expect(handler).lastCalledWith(undefined)

    map.set(key, 1)
    expect(handler).toBeCalledTimes(2)
    expect(handler).lastCalledWith(1)

    map.set({}, 2)
    expect(handler).toBeCalledTimes(2)
    expect(handler).lastCalledWith(1)
  })
})
