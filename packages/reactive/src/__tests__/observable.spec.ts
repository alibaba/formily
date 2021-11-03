import { observable } from '../'
import { contains } from '../externals'

test('array mutation', () => {
  const arr = observable([1, 2, 3, 4])
  arr.splice(2, 1)
  expect(arr).toEqual([1, 2, 4])
})

test('observable contains', () => {
  const element = { aa: 123 }
  const other = { bb: 321 }
  const arr = observable<any[]>([element, 2, 3, 4])
  const obj = observable<any>({})
  expect(contains(arr, arr[0])).toBeTruthy()
  expect(contains(obj, obj.other)).toBeFalsy()
  obj.other = other
  obj.arr = arr
  expect(contains(obj, obj.other)).toBeTruthy()
  expect(contains(obj, obj.arr)).toBeFalsy()
})
