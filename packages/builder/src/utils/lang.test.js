import { normalizeSchema } from './lang'

test('should correct normalize schema', () => {
  var schema = {
    'type': 'object',
    'properties': {
      'wrapper': {
        type: 'object',
        'x-component': 'layout',
        properties: {
          '[startDate1,endDate1]': {
            'type': 'daterange',
            'default': [
              { type: 'specify', value: '2019-01-01', flag: 'date' },
              { type: 'specify', value: '2019-01-02', flag: 'date' }
            ],
            'z-index': 0
          }
        }
      },
      '[startDate,endDate]': {
        'type': 'daterange',
        'default': [
          { type: 'specify', value: '2019-01-01', flag: 'date' },
          { type: 'specify', value: '2019-01-02', flag: 'date' }
        ],
        'z-index': 0
      }
    }
  }
  var value = normalizeSchema(schema)
  var result = {
    'type': 'object',
    'properties': {
      'wrapper': {
        type: 'object',
        'x-component': 'layout',
        properties: {
          '[startDate1,endDate1]': {
            'type': 'daterange',
            'default': [
              '2019-01-01',
              '2019-01-02'
            ],
            'z-index': 0
          }
        }
      },
      '[startDate,endDate]': {
        'type': 'daterange',
        'default': [
          '2019-01-01',
          '2019-01-02'
        ],
        'z-index': 0
      }
    }
  }
  expect(value).toEqual(result)
})
