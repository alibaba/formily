import moment from 'moment'
import { Map as ImmutableMap } from 'immutable'
import { isEqual } from '../compare'
import {
  toArr,
  every,
  some,
  findIndex,
  find,
  includes,
  map,
  reduce,
} from '../array'
import { clone, shallowClone } from '../clone'
import { lowerCase } from '../case'
import { deprecate } from '../deprecate'
import { globalThisPolyfill } from '../global'
import { isValid, isEmpty } from '../isEmpty'
import { stringLength } from '../string'
import { Subscribable } from '../subscribable'
import { merge } from '../merge'
import { instOf } from '../instanceof'
import { isFn, isHTMLElement, isNumberLike, isReactElement } from '../checkers'
import { defaults } from '../defaults'
import { applyMiddleware } from '../middleware'

const sleep = (d = 100) => new Promise((resolve) => setTimeout(resolve, d))

describe('array', () => {
  test('toArr', () => {
    expect(isEqual(toArr([123]), [123])).toBeTruthy()
    expect(isEqual(toArr(123), [123])).toBeTruthy()
    expect(isEqual(toArr(null), [])).toBeTruthy()
  })

  test('some', () => {
    const values1 = [1, 2, 3, 4, 5]
    const values2 = []
    const values3 = { a: 1, b: 2, c: 3 }
    const values4 = {}
    expect(some(values1, (item) => item === 3)).toBeTruthy()
    expect(some(values1, (item) => item === 6)).toBeFalsy()
    expect(some(values2, () => true)).toBeFalsy()
    expect(some(values2, () => false)).toBeFalsy()
    expect(some(values3, (item) => item === 3)).toBeTruthy()
    expect(some(values3, (item) => item === 6)).toBeFalsy()
    expect(some(values4, () => true)).toBeFalsy()
    expect(some(values4, () => false)).toBeFalsy()
  })

  test('every', () => {
    const values1 = [1, 2, 3, 4, 5]
    const values2 = []
    const values3 = { a: 1, b: 2, c: 3 }
    const values4 = {}
    expect(every(values1, (item) => item < 6)).toBeTruthy()
    expect(every(values1, (item) => item < 3)).toBeFalsy()
    expect(every(values2, () => true)).toBeTruthy()
    expect(every(values2, () => false)).toBeTruthy()
    expect(every(values2, () => false)).toBeTruthy()
    expect(every(values3, (item) => item < 6)).toBeTruthy()
    expect(every(values3, (item) => item < 3)).toBeFalsy()
    expect(every(values4, () => false)).toBeTruthy()
    expect(every(values4, () => false)).toBeTruthy()
  })

  test('findIndex', () => {
    const value = [1, 2, 3, 4, 5]
    expect(
      isEqual(
        findIndex(value, (item) => item > 3),
        3
      )
    ).toBeTruthy()
    expect(
      isEqual(
        findIndex(value, (item) => item < 3, true),
        1
      )
    ).toBeTruthy()
    expect(
      isEqual(
        findIndex(value, (item) => item > 6),
        -1
      )
    ).toBeTruthy()
  })

  test('find', () => {
    const value = [1, 2, 3, 4, 5]
    expect(
      isEqual(
        find(value, (item) => item > 3),
        4
      )
    ).toBeTruthy()
    expect(
      isEqual(
        find(value, (item) => item < 3, true),
        2
      )
    ).toBeTruthy()
    expect(
      isEqual(
        find(value, (item) => item > 6),
        void 0
      )
    ).toBeTruthy()
  })

  test('includes', () => {
    const value = [1, 2, 3, 4, 5]
    expect(includes(value, 3)).toBeTruthy()
    expect(includes(value, 6)).toBeFalsy()
    expect(includes('some test string', 'test')).toBeTruthy()
    expect(includes('some test string', 'test2')).toBeFalsy()
  })

  test('map', () => {
    const value = [1, 2, 3, 4, 5]
    const stringVal = 'some test string'
    const obj = { k1: 'v1', k2: 'v2' }
    expect(
      isEqual(
        map(value, (item) => item + 1, true),
        [6, 5, 4, 3, 2]
      )
    ).toBeTruthy()
    expect(
      isEqual(
        map(stringVal, (item) => item),
        stringVal.split('')
      )
    ).toBeTruthy()
    expect(
      isEqual(
        map(obj, (item) => `${item}-copy`),
        { k1: 'v1-copy', k2: 'v2-copy' }
      )
    ).toBeTruthy()
  })

  test('reduce', () => {
    const value = [1, 2, 3, 4, 5]
    expect(
      isEqual(
        reduce(value, (acc, item) => acc + item, 0, true),
        15
      )
    ).toBeTruthy()
  })
})

describe('case', () => {
  test('lowercase', () => {
    expect(lowerCase('SOME_UPPER_CASE_TEXT')).toEqual('some_upper_case_text')
    expect(lowerCase('')).toEqual('')
  })
})

describe('compare', () => {
  // base
  expect(isEqual('some test string', 'some test string')).toBeTruthy()

  // array
  expect(
    isEqual([{ k1: 'v1' }, { k2: 'v2' }], [{ k1: 'v1' }, { k2: 'v2' }])
  ).toBeTruthy()
  expect(isEqual([{ k1: 'v1' }, { k2: 'v2' }], [{ k1: 'v1' }])).toBeFalsy()

  // moment
  const momentA = moment('2019-11-11', 'YYYY-MM-DD')
  const momentB = moment('2019-11-10', 'YYYY-MM-DD')
  expect(isEqual(momentA, {})).toBeFalsy()
  expect(isEqual(momentA, moment('2019-11-11', 'YYYY-MM-DD'))).toBeTruthy()
  expect(isEqual(momentA, momentB)).toBeFalsy()

  // immutable
  const immutableA = ImmutableMap({ key: 'val' })
  const immutableB = ImmutableMap({ key1: 'val1' })
  expect(isEqual(immutableA, {})).toBeFalsy()
  expect(isEqual(immutableA, immutableB)).toBeFalsy()
  // schema
  // todo
  // date
  const dateA = new Date('2019-11-11')
  const dateB = new Date('2019-11-10')
  expect(isEqual(dateA, {})).toBeFalsy()
  expect(isEqual(dateA, dateB)).toBeFalsy()
  expect(isEqual(dateA, new Date('2019-11-11'))).toBeTruthy()
  // regexp
  const regexpA = new RegExp(/test/)
  const regexpB = new RegExp(/test2/)
  expect(isEqual(regexpA, {})).toBeFalsy()
  expect(isEqual(regexpA, new RegExp(/test/))).toBeTruthy()
  expect(isEqual(regexpA, regexpB)).toBeFalsy()
  // URL
  const urlA = new URL('https://formilyjs.org/')
  const urlB = new URL('https://www.taobao.com')
  const urlC = new URL('https://formilyjs.org/')
  expect(isEqual(urlA, urlC)).toBeTruthy()
  expect(isEqual(urlA, urlB)).toBeFalsy()
  // object
  const objA = { key: 'val' }
  const objB = { key2: 'val2', key3: 'val3' }
  const objC = { key2: 'val2' }
  expect(isEqual(objA, { key: 'val' })).toBeTruthy()
  expect(isEqual(objA, objB)).toBeFalsy()
  expect(isEqual(objA, objC)).toBeFalsy()
  expect(isEqual([11, 22], [33, 44])).toBeFalsy()
  expect(isEqual([11, 22], {})).toBeFalsy()
  expect(isEqual(new URL('https://aa.test'), {})).toBeFalsy()
  expect(instOf(new URL('https://aa.test'), 'URL')).toBeTruthy()
  expect(instOf(new Date(), 'Date')).toBeTruthy()
  expect(
    isEqual(new URL('https://aa.test'), new URL('https://aa.test'))
  ).toBeTruthy()
  expect(
    isEqual(
      {
        $$typeof: true,
        _owner: true,
        aaa: 123,
      },
      {
        $$typeof: true,
        _owner: true,
        aaa: 123,
      }
    )
  ).toBeTruthy()
  expect(
    isEqual(
      {
        $$typeof: true,
        _owner: true,
        aaa: 123,
      },
      {
        $$typeof: true,
        _owner: true,
        bbb: 123,
      }
    )
  ).toBeFalsy()
  expect(
    isEqual(
      {
        $$typeof: true,
        _owner: true,
        aaa: 123,
      },
      {
        $$typeof: true,
        _owner: true,
        aaa: 333,
      }
    )
  ).toBeFalsy()
})

describe('clone and compare', () => {
  test('clone form data', () => {
    let dd = new Map()
    dd.set('aaa', { bb: 123 })
    let ee = new WeakMap()
    ee.set({}, 1)
    let ff = new WeakSet()
    ff.add({})
    let gg = new Set()
    gg.add(3)

    let a = {
      aa: 123123,
      bb: [{ bb: 111 }, { bb: 222 }],
      cc: () => {
        // eslint-disable-next-line no-console
        console.log('123')
      },
      dd,
      ee,
      ff,
      gg,
    }
    let cloned = clone(a)
    expect(isEqual(cloned, a)).toBeTruthy()
    expect(a === cloned).toBeFalsy()
    expect(a.bb[0] === cloned.bb[0]).toBeFalsy()
    expect(a.dd === cloned.dd).toBeTruthy()
    expect(a.dd.get('aaa') === cloned.dd.get('aaa')).toBeTruthy()
    expect(a.cc === cloned.cc).toBeTruthy()
    expect(a.ee === cloned.ee).toBeTruthy()
    expect(a.ff === cloned.ff).toBeTruthy()
    expect(a.gg === cloned.gg).toBeTruthy()
    expect(
      clone({
        aa: {
          _isAMomentObject: true,
        },
        bb: {
          _isJSONSchemaObject: true,
        },
        cc: {
          $$typeof: true,
          _owner: true,
        },
      })
    ).toEqual({
      aa: {
        _isAMomentObject: true,
      },
      bb: {
        _isJSONSchemaObject: true,
      },
      cc: {
        $$typeof: true,
        _owner: true,
      },
    })
    expect(
      clone({
        toJS() {
          return 123
        },
      })
    ).toEqual(123)
    expect(
      clone({
        toJSON() {
          return 123
        },
      })
    ).toEqual(123)
  })

  test('native clone', () => {
    const map = new Map()
    map.set('key', 123)
    expect(clone(map) === map).toBeTruthy()
    const weakMap = new WeakMap()
    const key = {}
    weakMap.set(key, 123)
    expect(clone(weakMap) === weakMap).toBeTruthy()
    const weakSet = new WeakSet()
    const key2 = {}
    weakMap.set(key2, 123)
    expect(clone(weakSet) === weakSet).toBeTruthy()
    const set = new Set()
    expect(clone(set) === set).toBeTruthy()
    const date = new Date()
    expect(clone(date) === date).toBeTruthy()
    const file = new File([''], 'filename')
    expect(clone(file) === file).toBeTruthy()
    const url = new URL('https://test.com')
    expect(clone(url) === url).toBeTruthy()
    const regexp = /\d+/
    expect(clone(regexp) === regexp).toBeTruthy()
    const promise = Promise.resolve(1)
    expect(clone(promise) === promise).toBeTruthy()
  })

  test('shallowClone', () => {
    expect(shallowClone({ aa: 123 })).toEqual({ aa: 123 })
    expect(shallowClone([123])).toEqual([123])
    expect(shallowClone(/\d+/)).toEqual(/\d+/)
  })
})

describe('deprecate', () => {
  test('deprecate', () => {
    const test = jest.fn(() => {
      console.info('### deprecated function called ###')
    })
    const deprecatedFn = jest.fn(
      deprecate(test, 'Some.Deprecated.Api', 'some deprecated error')
    )

    // arguments - function
    deprecatedFn()
    expect(deprecatedFn).toHaveBeenCalledTimes(1)
    expect(test).toHaveBeenCalledTimes(1)

    // arguments - string
    const testDeprecatedFn = jest.fn(() =>
      deprecate('Some.Deprecated.Api', 'some deprecated error')
    )
    testDeprecatedFn()
    expect(testDeprecatedFn).toHaveBeenCalledTimes(1)

    // arguments - empty string
    const testDeprecatedFn2 = jest.fn(() => deprecate('Some.Deprecated.Api'))
    testDeprecatedFn2()
    expect(testDeprecatedFn2).toHaveBeenCalledTimes(1)
  })
})

describe('isEmpty', () => {
  test('isValid', () => {
    // val - undefined
    expect(isValid(undefined)).toBeFalsy()
    // val - any
    expect(isValid(!undefined)).toBeTruthy()
  })

  test('isEmpty', () => {
    // val - null
    expect(isEmpty(null)).toBeTruthy()

    // val - boolean
    expect(isEmpty(true)).toBeFalsy()

    // val - number
    expect(isEmpty(2422)).toBeFalsy()

    // val - string
    expect(isEmpty('some text')).toBeFalsy()
    expect(isEmpty('')).toBeTruthy()

    // val - function
    const emptyFunc = function () {}
    const nonEmptyFunc = function (payload) {
      console.info(payload)
    }
    expect(isEmpty(emptyFunc)).toBeTruthy()
    expect(isEmpty(nonEmptyFunc)).toBeFalsy()

    // val - arrays
    expect(isEmpty([])).toBeTruthy()
    expect(isEmpty([0])).toBeTruthy()
    expect(isEmpty([''])).toBeTruthy()
    expect(isEmpty([''], true)).toBeFalsy()
    expect(isEmpty([0], true)).toBeFalsy()
    expect(isEmpty([1, 2, 3, 4, 5])).toBeFalsy()
    expect(isEmpty([0, undefined, null, ''])).toBeTruthy()

    // val - errors
    expect(isEmpty(new Error())).toBeTruthy()
    expect(isEmpty(new Error('some error'))).toBeFalsy()

    // val - objects
    expect(
      isEmpty(new File(['foo'], 'filename.txt', { type: 'text/plain' }))
    ).toBeFalsy()
    expect(isEmpty(new Map())).toBeTruthy()
    expect(isEmpty(new Map().set('key', 'val'))).toBeFalsy()
    expect(isEmpty(new Set())).toBeTruthy()
    expect(isEmpty(new Set([1, 2]))).toBeFalsy()
    expect(isEmpty({ key: 'val' })).toBeFalsy()
    expect(isEmpty({})).toBeTruthy()

    expect(isEmpty(Symbol()))
  })
})

describe('string', () => {
  test('stringLength', () => {
    expect(stringLength('🦄some text')).toEqual(10)
  })
})

describe('shared Subscribable', () => {
  test('Subscribable', () => {
    const cb = jest.fn((payload) => payload)

    // defualt subscribable
    const obj = new Subscribable()
    const handlerIdx = obj.subscribe(cb)
    expect(handlerIdx).toEqual(1)
    obj.notify({ key: 'val' })
    expect(cb).toHaveBeenCalledTimes(1)
    expect(cb).toBeCalledWith({ key: 'val' })

    obj.unsubscribe(handlerIdx)
    obj.notify({ key: 'val' })
    expect(cb).toHaveBeenCalledTimes(1)

    // subscribable with custom filter
    const objWithCustomFilter = new Subscribable()
    const customFilter = (payload) => {
      payload.key2 = 'val2'
      return payload
    }
    objWithCustomFilter.subscription = {
      filter: customFilter,
    }
    objWithCustomFilter.subscribe(cb)
    const handlerIdx2 = objWithCustomFilter.subscribe(cb)
    expect(handlerIdx2).toEqual(2)
    objWithCustomFilter.notify({ key4: 'val4' })
    expect(cb).toHaveBeenCalledTimes(3)
    expect(cb).toBeCalledWith({ key4: 'val4', key2: 'val2' })

    // subscribable with custom notify
    const objWithCustomNotify = new Subscribable()
    const customNotify = jest.fn((payload) => {
      console.info(payload)
      return false
    })
    objWithCustomNotify.subscription = {
      notify: customNotify,
    }
    objWithCustomNotify.subscribe(cb)
    objWithCustomNotify.notify({ key3: 'val3' })
    expect(customNotify).toBeCalledTimes(1)
    objWithCustomNotify.unsubscribe()
  })
})

describe('types', () => {
  test('isFn', () => {
    const normalFunction = function normalFn() {}
    const asyncFunction = async function asyncFn() {}
    const generatorFunction = function* generatorFn() {}
    expect(isFn(() => {})).toBeTruthy()
    expect(isFn(normalFunction)).toBeTruthy()
    expect(isFn(asyncFunction)).toBeTruthy()
    expect(isFn(generatorFunction)).toBeTruthy()
    expect(isFn('')).toBeFalsy()
    expect(isFn(undefined)).toBeFalsy()
    expect(isFn(['🦄'])).toBeFalsy()
  })
  test('isNumberLike', () => {
    expect(isNumberLike(123)).toBeTruthy()
    expect(isNumberLike('123')).toBeTruthy()
    expect(isNumberLike('aa')).toBeFalsy()
  })
  test('isReactElement', () => {
    expect(isReactElement({ $$typeof: true, _owner: true })).toBeTruthy()
  })
  test('isHTMLElement', () => {
    expect(isHTMLElement(document.createElement('div'))).toBeTruthy()
  })
})

describe('merge', () => {
  test('assign', () => {
    const target = {
      aa: {
        bb: {
          cc: {
            dd: 123,
          },
        },
      },
    }
    const source = {
      aa: {
        bb: {
          cc: {
            ee: '1234',
          },
        },
      },
    }

    expect(
      merge(target, source, {
        assign: true,
      })
    ).toEqual({
      aa: {
        bb: {
          cc: {
            dd: 123,
            ee: '1234',
          },
        },
      },
    })
    expect(target).toEqual({
      aa: {
        bb: {
          cc: {
            dd: 123,
            ee: '1234',
          },
        },
      },
    })
  })

  test('clone', () => {
    const target = {
      aa: {
        bb: {
          cc: {
            dd: 123,
          },
        },
      },
    }
    const source = {
      aa: {
        bb: {
          cc: {
            ee: '1234',
          },
        },
      },
    }

    expect(merge(target, source)).toEqual({
      aa: {
        bb: {
          cc: {
            dd: 123,
            ee: '1234',
          },
        },
      },
    })
    expect(target).toEqual({
      aa: {
        bb: {
          cc: {
            dd: 123,
          },
        },
      },
    })
  })
  test('merge array', () => {
    expect(merge([11, 22], [333])).toEqual([11, 22, 333])
  })
  test('merge custom', () => {
    expect(
      merge(
        { aa: { cc: 123 } },
        { aa: { bb: 321 } },
        {
          customMerge() {
            return (a, b) => ({ ...a, ...b })
          },
        }
      )
    ).toEqual({ aa: { cc: 123, bb: 321 } })
  })
  test('merge symbols', () => {
    const symbol = Symbol('xxx')
    expect(merge({ [symbol]: 123 }, { aa: 321 })).toEqual({
      [symbol]: 123,
      aa: 321,
    })
  })
  test('merge unmatch', () => {
    expect(merge({ aa: 123 }, [111])).toEqual([111])
  })
})

describe('globalThis', () => {
  expect(globalThisPolyfill.requestAnimationFrame).not.toBeUndefined()
})

describe('instanceof', () => {
  test('instOf', () => {
    expect(instOf(123, 123)).toBeFalsy()
  })
})

test('defaults', () => {
  const toJSON = () => {}
  const toJS = () => {}
  expect(
    defaults(
      {
        aa: {
          _isAMomentObject: true,
        },
        bb: {
          _isJSONSchemaObject: true,
        },
        cc: {
          $$typeof: true,
          _owner: true,
        },
        dd: {
          toJSON,
        },
        ee: {
          toJS,
        },
      },
      {
        aa: { value: 111 },
        bb: { value: 222 },
        cc: { value: 333 },
        dd: { value: 444 },
        ee: { value: 555 },
        mm: { value: 123 },
      }
    )
  ).toEqual({
    aa: { value: 111 },
    bb: { value: 222 },
    cc: { value: 333 },
    dd: { value: 444 },
    ee: { value: 555 },
    mm: { value: 123 },
  })
})

test('applyMiddleware', async () => {
  expect(await applyMiddleware(0)).toEqual(0)
  expect(
    await applyMiddleware(0, [
      (num: number, next) => next(num + 1),
      (num: number, next) => next(num + 1),
      (num: number, next) => next(num + 1),
    ])
  ).toEqual(3)
  expect(
    await applyMiddleware(0, [
      (num: number, next) => next(),
      (num: number, next) => next(num + 1),
      (num: number, next) => next(num + 1),
    ])
  ).toEqual(2)
  const resolved = jest.fn()
  applyMiddleware(0, [
    (num: number, next) => next(num + 1),
    () => '123',
    (num: number, next) => next(num + 1),
  ]).then(resolved)
  await sleep(16)
  expect(resolved).toBeCalledTimes(0)
})

test('applyMiddleware with error', async () => {
  try {
    await applyMiddleware(0, [
      () => {
        throw 'this is error'
      },
    ])
  } catch (e) {
    expect(e).toEqual('this is error')
  }
})
