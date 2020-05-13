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
  reduce
} from '../array'
import { clone } from '../clone'
import { lowercase } from '../case'
import { deprecate } from '../deprecate'
import { isValid, isEmpty } from '../isEmpty'
import { stringLength } from '../string'
import { Subscribable } from '../subscribable'
import { BigData } from '../big-data'
import { merge } from '../merge'
import { isFn } from '../types'
import { log } from '../log'

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
    expect(some(values1, item => item === 3)).toBeTruthy()
    expect(some(values1, item => item === 6)).toBeFalsy()
    expect(some(values2, () => true)).toBeFalsy()
    expect(some(values2, () => false)).toBeFalsy()
    expect(some(values3, item => item === 3)).toBeTruthy()
    expect(some(values3, item => item === 6)).toBeFalsy()
    expect(some(values4, () => true)).toBeFalsy()
    expect(some(values4, () => false)).toBeFalsy()
  })

  test('every', () => {
    const values1 = [1, 2, 3, 4, 5]
    const values2 = []
    const values3 = { a: 1, b: 2, c: 3 }
    const values4 = {}
    expect(every(values1, item => item < 6)).toBeTruthy()
    expect(every(values1, item => item < 3)).toBeFalsy()
    expect(every(values2, () => true)).toBeTruthy()
    expect(every(values2, () => false)).toBeTruthy()
    expect(every(values2, () => false)).toBeTruthy()
    expect(every(values3, item => item < 6)).toBeTruthy()
    expect(every(values3, item => item < 3)).toBeFalsy()
    expect(every(values4, () => false)).toBeTruthy()
    expect(every(values4, () => false)).toBeTruthy()
  })

  test('findIndex', () => {
    const value = [1, 2, 3, 4, 5]
    expect(
      isEqual(
        findIndex(value, item => item > 3),
        3
      )
    ).toBeTruthy()
    expect(
      isEqual(
        findIndex(value, item => item < 3, true),
        1
      )
    ).toBeTruthy()
    expect(
      isEqual(
        findIndex(value, item => item > 6),
        -1
      )
    ).toBeTruthy()
  })

  test('find', () => {
    const value = [1, 2, 3, 4, 5]
    expect(
      isEqual(
        find(value, item => item > 3),
        4
      )
    ).toBeTruthy()
    expect(
      isEqual(
        find(value, item => item < 3, true),
        2
      )
    ).toBeTruthy()
    expect(
      isEqual(
        find(value, item => item > 6),
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
        map(value, item => item + 1, true),
        [6, 5, 4, 3, 2]
      )
    ).toBeTruthy()
    expect(
      isEqual(
        map(stringVal, item => item),
        stringVal.split('')
      )
    ).toBeTruthy()
    expect(
      isEqual(
        map(obj, (item, key) => `${item}-copy`),
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
    expect(lowercase('SOME_UPPER_CASE_TEXT')).toEqual('some_upper_case_text')
    expect(lowercase('')).toEqual('')
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
  expect(
    isEqual(
      [{ k1: 'v1' }, { k2: 'v2' }],
      [{ k1: 'v1' }],
      (_, key) => key !== 'k1'
    )
  ).toBeFalsy()

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
})

describe('clone and compare', () => {
  test('clone form data', () => {
    var dd = new Map()
    dd.set('aaa', { bb: 123 })
    // var ee = new WeakMap()
    // ee.set({}, 1)
    // var ff = new WeakSet()
    // ff.add({})
    // var gg = new Set()
    // gg.add(3)

    var a = {
      aa: 123123,
      bb: [{ bb: 111 }, { bb: 222 }],
      cc: () => {
        // eslint-disable-next-line no-console
        console.log('123')
      },
      dd
      // ee,
      // ff,
      // gg
    }
    var cloned = clone(a)
    expect(isEqual(cloned, a)).toBeTruthy()
    expect(a === cloned).toBeFalsy()
    expect(a.bb[0] === cloned.bb[0]).toBeFalsy()
    expect(a.dd === cloned.dd).toBeFalsy()
    expect(a.dd.get('aaa') === cloned.dd.get('aaa')).toBeTruthy()
    expect(a.cc === cloned.cc).toBeTruthy()
    // expect(a.ee === cloned.ee).toBeTruthy()
    // expect(a.ff === cloned.ff).toBeTruthy()
    // expect(a.gg === cloned.gg).toBeTruthy()
  })

  test('filter equal', () => {
    var a = {
      aa: {
        bb: 123
      }
    }
    var b = {
      aa: {
        bb: 123
      }
    }

    expect(isEqual(a, b)).toBeTruthy()
    expect(isEqual(a, b, (_, key) => key !== 'aa')).toBeTruthy()
  })

  test('filter clone', () => {
    var a = {
      aa: {
        bb: 123
      },
      cc: {
        dd: [1, 3, 4, 5]
      }
    }

    var b = clone(a, (_, key) => key !== 'aa')

    expect(a.aa === b.aa).toBeTruthy()
    expect(a.cc === b.cc).toBeFalsy()
    expect(isEqual(a.cc, b.cc)).toBeTruthy()
  })
})

describe('deprecate', () => {
  test('deprecate', () => {
    const test = jest.fn(() => {
      console.log('### deprecated function called ###')
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
    const emptyFunc = function() {}
    const nonEmptyFunc = function(payload) {
      console.log(payload)
    }
    expect(isEmpty(emptyFunc)).toBeTruthy()
    expect(isEmpty(nonEmptyFunc)).toBeFalsy()

    // val - arrays
    expect(isEmpty([])).toBeTruthy()
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
    const cb = jest.fn(payload => payload)

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
    const customFilter = payload => {
      payload.key2 = 'val2'
      return payload
    }
    objWithCustomFilter.subscription = {
      filter: customFilter
    }
    objWithCustomFilter.subscribe(cb)
    const handlerIdx2 = objWithCustomFilter.subscribe(cb)
    expect(handlerIdx2).toEqual(2)
    objWithCustomFilter.notify({ key4: 'val4' })
    expect(cb).toHaveBeenCalledTimes(3)
    expect(cb).toBeCalledWith({ key4: 'val4', key2: 'val2' })

    // subscribable with custom notify
    const objWithCustomNotify = new Subscribable()
    const customNotify = jest.fn(payload => {
      console.log(payload)
      return false
    })
    objWithCustomNotify.subscription = {
      notify: customNotify
    }
    objWithCustomNotify.subscribe(cb)
    objWithCustomNotify.notify({ key3: 'val3' })
    expect(customNotify).toBeCalledTimes(1)
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
})

describe('log', () => {
  const SomeString = Date.now().toString(32)
  const SomeObject = { v: SomeString }
  const Keyword = 'Formily'
  const Tips = 'you should do something'
  const FormilyLog = log
  test('log api', () => {
    expect(FormilyLog.log(SomeString)).toEqual({
      content: SomeString,
      keyword: Keyword
    })
    expect(FormilyLog.log(SomeObject)).toEqual({
      content: SomeObject,
      keyword: Keyword
    })
  })
  test('info api', () => {
    expect(FormilyLog.info(SomeString)).toEqual({
      content: SomeString,
      keyword: Keyword
    })
    expect(FormilyLog.info(SomeObject)).toEqual({
      content: SomeObject,
      keyword: Keyword
    })
  })
  test('warn api', () => {
    expect(FormilyLog.warn(SomeString)).toEqual({
      content: SomeString,
      keyword: Keyword
    })
    expect(FormilyLog.warn(SomeObject)).toEqual({
      content: SomeObject,
      keyword: Keyword
    })

    expect(FormilyLog.warn(SomeString, Tips)).toEqual({
      content: SomeString,
      keyword: Keyword,
      tips: Tips
    })
    expect(FormilyLog.warn(SomeObject, Tips)).toEqual({
      content: SomeObject,
      keyword: Keyword,
      tips: Tips
    })
  })
  test('error api', () => {
    expect(FormilyLog.error(SomeString)).toEqual({
      content: SomeString,
      keyword: Keyword
    })
    expect(FormilyLog.error(SomeObject)).toEqual({
      content: SomeObject,
      keyword: Keyword
    })

    expect(FormilyLog.error(SomeString, Tips)).toEqual({
      content: SomeString,
      keyword: Keyword,
      tips: Tips
    })
    expect(FormilyLog.error(SomeObject, Tips)).toEqual({
      content: SomeObject,
      keyword: Keyword,
      tips: Tips
    })
  })
  test('close open', () => {
    expect(FormilyLog.log(SomeString)).toEqual({
      content: SomeString,
      keyword: Keyword
    })
    FormilyLog.close()
    expect(FormilyLog.log(SomeString)).toEqual({
      content: undefined,
      keyword: Keyword
    })
    FormilyLog.open()
    expect(FormilyLog.log(SomeString)).toEqual({
      content: SomeString,
      keyword: Keyword
    })

    expect(FormilyLog.warn(SomeString, Tips)).toEqual({
      content: SomeString,
      keyword: Keyword,
      tips: Tips
    })
    FormilyLog.close()
    expect(FormilyLog.log(SomeString)).toEqual({
      content: undefined,
      keyword: Keyword,
      tips: undefined
    })
    FormilyLog.open()
    expect(FormilyLog.warn(SomeString, Tips)).toEqual({
      content: SomeString,
      keyword: Keyword,
      tips: Tips
    })
  })
})

describe('merge', () => {
  test('assign', () => {
    const target = {
      aa: {
        bb: {
          cc: {
            dd: 123
          }
        }
      }
    }
    const source = {
      aa: {
        bb: {
          cc: {
            ee: '1234'
          }
        }
      }
    }

    expect(
      merge(target, source, {
        assign: true
      })
    ).toEqual({
      aa: {
        bb: {
          cc: {
            dd: 123,
            ee: '1234'
          }
        }
      }
    })
    expect(target).toEqual({
      aa: {
        bb: {
          cc: {
            dd: 123,
            ee: '1234'
          }
        }
      }
    })
  })

  test('clone', () => {
    const target = {
      aa: {
        bb: {
          cc: {
            dd: 123
          }
        }
      }
    }
    const source = {
      aa: {
        bb: {
          cc: {
            ee: '1234'
          }
        }
      }
    }

    expect(
      merge(target, source)
    ).toEqual({
      aa: {
        bb: {
          cc: {
            dd: 123,
            ee: '1234'
          }
        }
      }
    })
    expect(target).toEqual({
      aa: {
        bb: {
          cc: {
            dd: 123
          }
        }
      }
    })
  })
})

describe('BigData', () => {
  test('merge', () => {
    const structure = new BigData()

    const bigData1 = structure.create({
      ff: {
        gg: {
          hh: 123
        }
      }
    })

    const bigData2 = {
      ff: {
        gg: {
          hh: 123
        }
      }
    }

    const merged1 = merge(
      {
        aa: {
          bb: {
            cc: {
              dd: 123
            }
          }
        }
      },
      {
        aa: {
          bb: {
            cc: {
              ee: bigData1
            }
          }
        }
      }
    )

    const merged2 = merge(
      {
        aa: {
          bb: {
            cc: {
              dd: 123
            }
          }
        }
      },
      {
        aa: {
          bb: {
            cc: {
              ee: bigData2
            }
          }
        }
      }
    )

    expect(merged1.aa.bb.cc.ee === bigData1).toBeTruthy()
    expect(merged2.aa.bb.cc.ee === bigData2).toBeFalsy()
  })
})
