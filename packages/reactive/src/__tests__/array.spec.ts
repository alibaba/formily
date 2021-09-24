import { toArray, ArraySet } from '../array'

test('toArray', () => {
  expect(toArray([])).toEqual([])
  expect(toArray(null)).toEqual([])
  expect(toArray(undefined)).toEqual([])
  expect(toArray(0)).toEqual([0])
})

test('ArraySet', () => {
  const set = new ArraySet()
  set.add(11)
  set.add(11)
  expect(set.value).toEqual([11])
  set.clear()
  expect(set.value).toEqual([])
})
