import { observable } from '../'

test('array mutation', () => {
  const arr = observable([1, 2, 3, 4])
  arr.splice(2, 1)
  expect(arr).toEqual([1, 2, 4])
})
