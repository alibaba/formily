import { formatMomentValue } from '../src/__builtins__/moment'

test('formatMomentValue is usable', () => {
  expect(formatMomentValue('2021-12-21 15:47:00', 'YYYY-MM-DD')).toBe(
    '2021-12-21'
  )
  expect(formatMomentValue('2021-12-21 15:47:00', undefined)).toBe(
    '2021-12-21 15:47:00'
  )
})
