import { observable } from '../'
import { contains } from '../externals'

test('array mutation', () => {
  const arr = observable([1, 2, 3, 4])
  arr.splice(2, 1)
  expect(arr).toEqual([1, 2, 4])
})

test('observable contains', () => {
  const subElement = { cc: 333 }
  const element = { aa: subElement }
  const arr = observable<any[]>([element, 2, 3, 4])
  expect(contains(arr, arr[0])).toBe(true)
  expect(contains(arr, arr[0].aa)).toBe(true)
  expect(contains(arr, element)).toBe(true)
  expect(contains(arr, subElement)).toBe(true)
  expect(contains(element, subElement)).toBe(true)
  expect(contains(element, arr[0].aa)).toBe(true)
  expect(contains(arr[0], subElement)).toBe(true)

  const obj = observable<any>({})
  const other = { bb: 321 }
  expect(contains(obj, obj.other)).toBe(false)
  obj.other = other
  obj.arr = arr

  expect(contains(obj, obj.other)).toBe(true)
  expect(contains(obj, other)).toBe(true)

  // Are these expected behaviors?
  expect(contains(obj, obj.arr)).toBe(false)
  expect(contains(obj, arr)).toBe(false)
})
