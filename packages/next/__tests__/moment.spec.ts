import { momentable, formatMomentValue } from '../src/__builtins__/moment'
import moment from 'moment'

test('momentable is usable', () => {
  expect(moment.isMoment(momentable('2021-09-08'))).toBe(true)
  expect(
    momentable(['2021-09-08', '2021-12-29']).every((item) =>
      moment.isMoment(item)
    )
  ).toBe(true)
  expect(momentable(0)).toBe(0)
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
  expect(formatMomentValue('12:11', 'HH:mm')).toBe('12:11')
  expect(formatMomentValue('12:11:11', 'HH:mm:ss')).toBe('12:11:11')
  expect(formatMomentValue(['12:11'], ['HH:mm'])).toEqual(['12:11'])
  expect(formatMomentValue(['12:11:11'], ['HH:mm:ss'])).toEqual(['12:11:11'])
  expect(formatMomentValue(1663155911097, 'YYYY-MM-DD HH:mm:ss')).toBe(
    moment(1663155911097).format('YYYY-MM-DD HH:mm:ss')
  )
  expect(formatMomentValue([1663155911097], ['YYYY-MM-DD HH:mm:ss'])).toEqual([
    moment(1663155911097).format('YYYY-MM-DD HH:mm:ss'),
  ])
  expect(
    formatMomentValue('2022-09-15T09:56:26.000Z', 'YYYY-MM-DD HH:mm:ss')
  ).toBe(moment('2022-09-15T09:56:26.000Z').format('YYYY-MM-DD HH:mm:ss'))
  expect(
    formatMomentValue(['2022-09-15T09:56:26.000Z'], ['YYYY-MM-DD HH:mm:ss'])
  ).toEqual([moment('2022-09-15T09:56:26.000Z').format('YYYY-MM-DD HH:mm:ss')])
  expect(formatMomentValue('2022-09-15 09:56:26', 'HH:mm:ss')).toBe('09:56:26')
  expect(formatMomentValue(['2022-09-15 09:56:26'], ['HH:mm:ss'])).toEqual([
    '09:56:26',
  ])
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
