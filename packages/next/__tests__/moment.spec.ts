import { formatMomentValue } from '../src/__builtins__/moment'

test('formatMomentValue is usable', () => {
  expect(formatMomentValue('2021-12-22 15:47:00', 'YYYY-MM-DD')).toBe(
    '2021-12-22'
  )
  expect(formatMomentValue('2021-12-23 15:47:00', undefined)).toBe(
    '2021-12-23 15:47:00'
  )
})
