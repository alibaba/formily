import { parseValidatorDescriptions } from '../parser'

describe('parseValidatorDescriptions', () => {
  test('basic', () => {
    expect(parseValidatorDescriptions('date')).toEqual([
      { format: 'date', triggerType: 'onInput' },
    ])
    const validator = () => {
      return ''
    }
    expect(parseValidatorDescriptions(validator)).toEqual([
      { validator, triggerType: 'onInput' },
    ])
    expect(parseValidatorDescriptions(['date'])).toEqual([
      { format: 'date', triggerType: 'onInput' },
    ])
    expect(parseValidatorDescriptions([validator])).toEqual([
      { validator, triggerType: 'onInput' },
    ])
    expect(parseValidatorDescriptions({ format: 'date' })).toEqual([
      { format: 'date', triggerType: 'onInput' },
    ])
    expect(parseValidatorDescriptions({ validator })).toEqual([
      { validator, triggerType: 'onInput' },
    ])
  })
})
