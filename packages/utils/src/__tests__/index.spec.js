import { getIn, setIn, getPathSegments } from '../accessor'
import { Broadcast } from '../broadcast'
import { isEqual } from '../compare'
import { toArr, every, some, findIndex, find, includes } from '../array'
import { clone } from '../clone'
import { caculateSchemaInitialValues } from '../schema'

test('test accessor', () => {
  const value = { a: { b: { c: 2, d: 333 } } }
  expect(getIn(value, 'a.b.c') === 2).toBeTruthy()
  setIn(value, 'a.b.c', 1111)
  expect(getIn(value, 'a.b.c') === 1111).toBeTruthy()
})

test('test accessor with large path', () => {
  const value = { array: [{ aa: 123, bb: 321 }] }
  expect(isEqual(getIn(value, 'array.0.[aa,bb]'), [123, 321])).toBeTruthy()
})

test('test setIn auto create array', () => {
  const value = {}
  setIn(value, 'array.0.bb.2', 'hello world')
  expect(
    isEqual(value, {
      array: [
        {
          bb: [undefined, undefined, 'hello world']
        }
      ]
    })
  ).toBeTruthy()
})

test('destruct getIn', () => {
  // getIn 通过解构表达式从扁平数据转为复合嵌套数据
  const value = { a: { b: { c: 2, d: 333 } } }
  expect(
    isEqual(getIn({ a: { b: { kk: 2, mm: 333 } } }, 'a.b.{c:kk,d:mm}'), {
      c: 2,
      d: 333
    })
  ).toBeTruthy()
  expect(
    isEqual(
      getIn(
        { a: { b: { kk: 2, mm: 333 } } },
        `{
        a : {
          b : {
            c : kk,
            d : mm
          }
        }
      }`
      ),
      value
    )
  ).toBeTruthy()
})

test('destruct setIn', () => {
  const value = { a: { b: { c: 2, d: 333 } } }
  // setIn 从复杂嵌套结构中解构数据出来对其做赋值处理
  expect(
    isEqual(
      setIn(
        {},
        `{
        a : {
          b : {
            c,
            d
          }
        }
      }`,
        value
      ),
      { c: 2, d: 333 }
    )
  ).toBeTruthy()
  expect(
    isEqual(
      setIn(
        {},
        `
      [aa,bb]
      `,
        [123, 444]
      ),
      { aa: 123, bb: 444 }
    )
  ).toBeTruthy()
  expect(
    isEqual(setIn({}, `aa.bb.ddd.[aa,bb]`, [123, 444]), {
      aa: { bb: { ddd: { aa: 123, bb: 444 } } }
    })
  ).toBeTruthy()

  expect(
    isEqual(setIn({}, `aa.bb.ddd.[{cc:aa,bb}]`, [{ cc: 123, bb: 444 }]), {
      aa: { bb: { ddd: { aa: 123, bb: 444 } } }
    })
  ).toBeTruthy()
})

test('broadcast', () => {
  const centerHub = new Broadcast()
  const unsubscribe = centerHub.subscribe(payload => {
    expect(payload === 111).toBeTruthy()
  })
  return new Promise(resolve => {
    setTimeout(() => {
      centerHub.notify(111)
      unsubscribe()
      centerHub.notify(222)
      resolve()
    }, 1000)
  })
})

test('toArr', () => {
  expect(isEqual(toArr([123]), [123])).toBeTruthy()
  expect(isEqual(toArr(123), [123])).toBeTruthy()
  expect(isEqual(toArr(null), [])).toBeTruthy()
})

test('clone form data', () => {
  var dd = new Map()
  dd.set('aaa', { bb: 123 })
  var a = {
    aa: 123123,
    bb: [{ bb: 111 }, { bb: 222 }],
    cc: () => {
      console.log('123')
    },
    dd
  }
  var cloned = clone(a)
  expect(isEqual(cloned, a)).toBeTruthy()
  expect(a === cloned).toBeFalsy()
  expect(a.bb[0] === cloned.bb[0]).toBeFalsy()
  expect(a.dd === cloned.dd).toBeFalsy()
  expect(a.dd.get('aaa') === cloned.dd.get('aaa')).toBeTruthy()
  expect(a.cc === cloned.cc).toBeTruthy()
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

test('setIn', () => {
  var values = {}
  setIn(values, 'a', '123232323')
  expect(isEqual(values.a, '123232323')).toBeTruthy()
})

test('caculateSchemaInitialValues', () => {
  var values1 = JSON.parse(
    '{"type":"object","properties":{"[startDate,endDate]":{"type":"daterange","default":["2019-01-24","2019-01-30"],"z-index":0,"id":"[startDate,endDate]","x-index":0}}}'
  )
  var values2 = JSON.parse(
    '{"type":"object","properties":{"[startDate,endDate]":{"type":"daterange","default":["2019-01-24",""],"z-index":0,"id":"[startDate,endDate]","x-index":0}}}'
  )
  var values3 = JSON.parse(
    '{"type":"object","properties":{"[startDate,endDate]":{"type":"daterange","default":["","2019-01-30"],"z-index":0,"id":"[startDate,endDate]","x-index":0}}}'
  )
  var values4 = JSON.parse(
    '{"type":"object","properties":{"[startDate,endDate]":{"type":"daterange","z-index":0,"id":"[startDate,endDate]","x-index":0}}}'
  )
  var result1 = caculateSchemaInitialValues(values1)
  var result2 = caculateSchemaInitialValues(values2)
  var result3 = caculateSchemaInitialValues(values3)
  var result4 = caculateSchemaInitialValues(values4)
  expect(
    isEqual(
      JSON.stringify(result1),
      JSON.stringify({ startDate: '2019-01-24', endDate: '2019-01-30' })
    )
  ).toBeTruthy()
  expect(
    isEqual(
      JSON.stringify(result2),
      JSON.stringify({ startDate: '2019-01-24', endDate: '' })
    )
  ).toBeTruthy()
  expect(
    isEqual(
      JSON.stringify(result3),
      JSON.stringify({ startDate: '', endDate: '2019-01-30' })
    )
  ).toBeTruthy()
  expect(
    isEqual(
      JSON.stringify(result4),
      JSON.stringify({ startDate: undefined, endDate: undefined })
    )
  ).toBeTruthy()
})

test('getPathSegments', () => {
  expect(isEqual(getPathSegments(0), [0])).toBeTruthy()
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
  expect(isEqual(findIndex(value, item => item > 3), 3)).toBeTruthy()
  expect(isEqual(findIndex(value, item => item < 3, true), 1)).toBeTruthy()
  expect(isEqual(findIndex(value, item => item > 6), -1)).toBeTruthy()
})

test('find', () => {
  const value = [1, 2, 3, 4, 5]
  expect(isEqual(find(value, item => item > 3), 4)).toBeTruthy()
  expect(isEqual(find(value, item => item < 3, true), 2)).toBeTruthy()
  expect(isEqual(find(value, item => item > 6), void 0)).toBeTruthy()
})

test('includes', () => {
  const value = [1, 2, 3, 4, 5]
  expect(includes(value, 3)).toBeTruthy()
  expect(includes(value, 6)).toBeFalsy()
})
