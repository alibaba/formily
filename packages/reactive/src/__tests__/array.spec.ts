import { toArray } from '../array'

test('toArray', () => {
  expect(toArray([])).toEqual([])
  expect(toArray(null)).toEqual([])
  expect(toArray(undefined)).toEqual([])
  expect(toArray(0)).toEqual([0])
})
