import { isEqual } from '../compare'
import { toArr, every, some, findIndex, find, includes } from '../array'
import { clone } from '../clone'


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
      // eslint-disable-next-line no-console
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
