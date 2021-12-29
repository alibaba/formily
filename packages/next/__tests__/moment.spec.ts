import { momentable, formatMomentValue } from '../src/__builtins__/moment'
import moment from 'moment'

test('momentable is usable', () => {
  expect(moment.isMoment(momentable('2021-09-08'))).toBe(true)
  expect(
    momentable(['2021-09-08', '2021-12-29']).every((item) =>
      moment.isMoment(item)
    )
  ).toBe(true)
})

test('formatMomentValue is usable', () => {
  expect(formatMomentValue('', 'YYYY-MM-DD', '~')).toBe('~')
  expect(formatMomentValue('2021-12-22 15:47:00', 'YYYY-MM-DD')).toBe(
    '2021-12-22'
  )
  expect(formatMomentValue('2021-12-23 15:47:00', undefined)).toBe(
    '2021-12-23 15:47:00'
  )
  expect(formatMomentValue('2021-12-21 15:47:00', (date: string) => date)).toBe(
    '2021-12-21 15:47:00'
  )
  expect(
    formatMomentValue(
      ['2021-12-21 15:47:00', '2021-12-29 15:47:00'],
      'YYYY-MM-DD'
    )
  ).toEqual(['2021-12-21', '2021-12-29'])
  expect(
    formatMomentValue(
      ['2021-12-21 16:47:00', '2021-12-29 18:47:00'],
      (date: string) => date
    )
  ).toEqual(['2021-12-21 16:47:00', '2021-12-29 18:47:00'])
  expect(
    formatMomentValue(
      ['2021-12-21 16:47:00', '2021-12-29 18:47:00'],
      ['YYYY-MM-DD', (date: string) => date]
    )
  ).toEqual(['2021-12-21', '2021-12-29 18:47:00'])
  expect(
    formatMomentValue(
      ['2021-12-21 16:47:00', '2021-12-29 18:47:00'],
      ['YYYY-MM-DD', undefined]
    )
  ).toEqual(['2021-12-21', '2021-12-29 18:47:00'])
})
