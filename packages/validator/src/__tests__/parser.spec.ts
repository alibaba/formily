import { parseValidatorDescriptions } from '../parser'

describe('parseValidatorDescriptions', () => {
  test('basic', () => {
    expect(parseValidatorDescriptions('date')).toEqual([{ format: 'date' }])
    const validator = () => {
      return ''
    }
    expect(parseValidatorDescriptions(validator)).toEqual([{ validator }])
    expect(parseValidatorDescriptions(['date'])).toEqual([{ format: 'date' }])
    expect(parseValidatorDescriptions([validator])).toEqual([{ validator }])
    expect(parseValidatorDescriptions({ format: 'date' })).toEqual([
      { format: 'date' },
    ])
    expect(parseValidatorDescriptions({ validator })).toEqual([{ validator }])
  })
})
