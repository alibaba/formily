import { observable, autorun, raw } from '..'

describe('Map', () => {
  test('should be a proper JS Map', () => {
    const map = observable(new Map())
    expect(map).toBeInstanceOf(Map)
    expect(raw(map)).toBeInstanceOf(Map)
  })

  test('should autorun mutations', () => {
    let dummy
    const map = observable(new Map())
    autorun(() => (dummy = map.get('key')))

    expect(dummy).toEqual(undefined)
    map.set('key', 'value')
    expect(dummy).toEqual('value')
    map.set('key', 'value2')
    expect(dummy).toEqual('value2')
    map.delete('key')
    expect(dummy).toEqual(undefined)
  })

  test('should autorun size mutations', () => {
    let dummy
    const map = observable(new Map())
    autorun(() => (dummy = map.size))

    expect(dummy).toEqual(0)
    map.set('key1', 'value')
    map.set('key2', 'value2')
    expect(dummy).toEqual(2)
    map.delete('key1')
    expect(dummy).toEqual(1)
    map.clear()
    expect(dummy).toEqual(0)
  })

  test('should autorun for of iteration', () => {
    let dummy
    const map = observable(new Map())
    autorun(() => {
      dummy = 0
      // eslint-disable-next-line no-unused-vars
      for (let [, num] of map) {
        dummy += num
      }
    })

    expect(dummy).toEqual(0)
    map.set('key0', 3)
    expect(dummy).toEqual(3)
    map.set('key1', 2)
    expect(dummy).toEqual(5)
    map.delete('key0')
    expect(dummy).toEqual(2)
    map.clear()
    expect(dummy).toEqual(0)
  })

  test('should autorun forEach iteration', () => {
    let dummy
    const map = observable(new Map())
    autorun(() => {
      dummy = 0
      map.forEach((num) => (dummy += num))
    })

    expect(dummy).toEqual(0)
    map.set('key0', 3)
    expect(dummy).toEqual(3)
    map.set('key1', 2)
    expect(dummy).toEqual(5)
    map.delete('key0')
    expect(dummy).toEqual(2)
    map.clear()
    expect(dummy).toEqual(0)
  })

  test('should autorun keys iteration', () => {
    let dummy
    const map = observable(new Map())
    autorun(() => {
      dummy = 0
      for (let key of map.keys()) {
        dummy += key
      }
    })

    expect(dummy).toEqual(0)
    map.set(3, 3)
    expect(dummy).toEqual(3)
    map.set(2, 2)
    expect(dummy).toEqual(5)
    map.delete(3)
    expect(dummy).toEqual(2)
    map.clear()
    expect(dummy).toEqual(0)
  })

  test('should autorun values iteration', () => {
    let dummy
    const map = observable(new Map())
    autorun(() => {
      dummy = 0
      for (let num of map.values()) {
        dummy += num
      }
    })

    expect(dummy).toEqual(0)
    map.set('key0', 3)
    expect(dummy).toEqual(3)
    map.set('key1', 2)
    expect(dummy).toEqual(5)
    map.delete('key0')
    expect(dummy).toEqual(2)
    map.clear()
    expect(dummy).toEqual(0)
  })

  test('should autorun entries iteration', () => {
    let dummy
    const map = observable(new Map())
    autorun(() => {
      dummy = 0
      // eslint-disable-next-line no-unused-vars
      for (let [, num] of map.entries()) {
        dummy += num
      }
    })

    expect(dummy).toEqual(0)
    map.set('key0', 3)
    expect(dummy).toEqual(3)
    map.set('key1', 2)
    expect(dummy).toEqual(5)
    map.delete('key0')
    expect(dummy).toEqual(2)
    map.clear()
    expect(dummy).toEqual(0)
  })

  test('should be triggered by clearing', () => {
    let dummy
    const map = observable(new Map())
    autorun(() => (dummy = map.get('key')))

    expect(dummy).toEqual(undefined)
    map.set('key', 3)
    expect(dummy).toEqual(3)
    map.clear()
    expect(dummy).toEqual(undefined)
  })

  test('should not autorun custom property mutations', () => {
    let dummy
    const map = observable(new Map())
    autorun(() => (dummy = map['customProp']))

    expect(dummy).toEqual(undefined)
    map['customProp'] = 'Hello World'
    expect(dummy).toEqual(undefined)
  })

  test('should not autorun non value changing mutations', () => {
    let dummy
    const map = observable(new Map())
    const mapSpy = jest.fn(() => (dummy = map.get('key')))
    autorun(mapSpy)

    expect(dummy).toEqual(undefined)
    expect(mapSpy).toBeCalledTimes(1)
    map.set('key', 'value')
    expect(dummy).toEqual('value')
    expect(mapSpy).toBeCalledTimes(2)
    map.set('key', 'value')
    expect(dummy).toEqual('value')
    expect(mapSpy).toBeCalledTimes(2)
    map.delete('key')
    expect(dummy).toEqual(undefined)
    expect(mapSpy).toBeCalledTimes(3)
    map.delete('key')
    expect(dummy).toEqual(undefined)
    expect(mapSpy).toBeCalledTimes(3)
    map.clear()
    expect(dummy).toEqual(undefined)
    expect(mapSpy).toBeCalledTimes(3)
  })

  test('should not autorun raw data', () => {
    let dummy
    const map = observable(new Map())
    autorun(() => (dummy = raw(map).get('key')))

    expect(dummy).toEqual(undefined)
    map.set('key', 'Hello')
    expect(dummy).toEqual(undefined)
    map.delete('key')
    expect(dummy).toEqual(undefined)
  })

  test('should not autorun raw iterations', () => {
    let dummy = 0
    const map = observable(new Map())
    autorun(() => {
      dummy = 0
      // eslint-disable-next-line no-unused-vars
      for (let [, num] of raw(map).entries()) {
        dummy += num
      }
      for (let key of raw(map).keys()) {
        dummy += raw(map).get(key)
      }
      for (let num of raw(map).values()) {
        dummy += num
      }
      raw(map).forEach((num) => {
        dummy += num
      })
      // eslint-disable-next-line no-unused-vars
      for (let [, num] of raw(map)) {
        dummy += num
      }
    })

    expect(dummy).toEqual(0)
    map.set('key1', 2)
    map.set('key2', 3)
    expect(dummy).toEqual(0)
    map.delete('key1')
    expect(dummy).toEqual(0)
  })

  test('should not be triggered by raw mutations', () => {
    let dummy
    const map = observable(new Map())
    autorun(() => (dummy = map.get('key')))

    expect(dummy).toEqual(undefined)
    raw(map).set('key', 'Hello')
    expect(dummy).toEqual(undefined)
    dummy = 'Thing'
    raw(map).delete('key')
    expect(dummy).toEqual('Thing')
    raw(map).clear()
    expect(dummy).toEqual('Thing')
  })

  test('should not autorun raw size mutations', () => {
    let dummy
    const map = observable(new Map())
    autorun(() => (dummy = raw(map).size))

    expect(dummy).toEqual(0)
    map.set('key', 'value')
    expect(dummy).toEqual(0)
  })

  test('should not be triggered by raw size mutations', () => {
    let dummy
    const map = observable(new Map())
    autorun(() => (dummy = map.size))

    expect(dummy).toEqual(0)
    raw(map).set('key', 'value')
    expect(dummy).toEqual(0)
  })

  test('should support objects as key', () => {
    let dummy
    const key = {}
    const map = observable(new Map())
    const mapSpy = jest.fn(() => (dummy = map.get(key)))
    autorun(mapSpy)

    expect(dummy).toEqual(undefined)
    expect(mapSpy).toBeCalledTimes(1)

    map.set(key, 1)
    expect(dummy).toEqual(1)
    expect(mapSpy).toBeCalledTimes(2)

    map.set({}, 2)
    expect(dummy).toEqual(1)
    expect(mapSpy).toBeCalledTimes(2)
  })
})
