import { isAssignable, isEqual } from '../shared'

test('isAssignable', () => {
  expect(isAssignable({})).toBeTruthy()
  expect(isAssignable(() => {})).toBeTruthy()

  expect(isAssignable(1)).toBeFalsy()
  expect(isAssignable('str')).toBeFalsy()
})

test('isEqual', () => {
  const sameObj = {}
  const sameArray = []
  expect(isEqual('string', 'string')).toBeTruthy()
  expect(isEqual(123, 123)).toBeTruthy()
  expect(isEqual(undefined, undefined)).toBeTruthy()
  expect(isEqual(null, null)).toBeTruthy()

  expect(isEqual(sameObj, sameObj)).toBeTruthy()
  expect(isEqual(sameArray, sameArray)).toBeTruthy()

  expect(isEqual([1, '123'], [1, '123'])).toBeTruthy()
  expect(
    isEqual([1, '123', { a: 1, b: 2 }], [1, '123', { a: 1, b: 2 }])
  ).toBeTruthy()
  expect(
    isEqual([1, '123', { a: 1, b: 2 }], [1, '123', { a: 1, b: 3 }])
  ).toBeFalsy()
  expect(isEqual([1, '123'], [1, '234'])).toBeFalsy()
  expect(isEqual([], [1])).toBeFalsy()
  expect(isEqual([], {})).toBeFalsy()

  expect(isEqual({ a: [1, 2, 3] }, { a: [1, 2, 3] })).toBeTruthy()
  expect(isEqual({ a: [1, 2, 3] }, { a: [1, 2, 4] })).toBeFalsy()
  expect(isEqual({ a: 1 }, { a: 11 })).toBeFalsy()
  expect(isEqual({ a: 1 }, { a: 1, b: 2 })).toBeFalsy()

  const b = { age: '234' }
  // @ts-ignore
  Object.prototype.name = '123'
  expect(isEqual({ name: '123' }, b)).toBeFalsy()

  expect(isEqual(NaN, NaN)).toBeTruthy()
})
