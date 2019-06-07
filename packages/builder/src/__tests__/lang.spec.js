import * as lang from '../utils/lang'

test('lang funtions', () => {
  expect(lang.isType('Array')([])).not.toBeFalsy()
  expect(lang.isType('Array')('')).toBeFalsy()
  expect(lang.isFn(function() {})).not.toBeFalsy()
  expect(lang.isFn('')).toBeFalsy()
  expect(lang.isArr([])).not.toBeFalsy()
  expect(lang.isArr('111')).toBeFalsy()
  expect(lang.isObj({})).not.toBeFalsy()
  expect(lang.isObj('111')).toBeFalsy()
  expect(lang.isStr('')).not.toBeFalsy()
  expect(lang.isStr(123)).toBeFalsy()
  expect(lang.isNum(111)).not.toBeFalsy()
  expect(lang.isNum('hello')).toBeFalsy()
  expect(lang.isIter([1, 2])).not.toBeFalsy()
  expect(lang.isIter(1)).toBeFalsy()
})

test('should correct normalize schema', () => {
  var schema = {
    type: 'object',
    properties: {
      wrapper: {
        type: 'object',
        'x-component': 'layout',
        properties: {
          '[startDate1,endDate1]': {
            type: 'daterange',
            default: [
              { type: 'specify', value: '2019-01-01', flag: 'date' },
              { type: 'specify', value: '2019-01-02', flag: 'date' }
            ],
            'z-index': 0
          }
        }
      },
      '[startDate,endDate]': {
        type: 'daterange',
        default: [
          { type: 'specify', value: '2019-01-01', flag: 'date' },
          { type: 'specify', value: '2019-01-02', flag: 'date' }
        ],
        'z-index': 0
      }
      // '[dateType, startBizDate, endBizDate]': {
      //   type: 'string',
      //   title: '请选择统计周期',
      //   default: [
      //     {
      //       flag: '',
      //       type: 'specify',
      //       value: 'week'
      //     },
      //     {
      //       flag: 'weekRange',
      //       type: 'pastStart',
      //       value: 1
      //     },
      //     {
      //       flag: 'weekRange',
      //       type: 'pastStart',
      //       value: 0
      //     }
      //   ],
      //   'x-component': 'demensionPicker',
      //   'x-props': {
      //     direction: 'hoz',
      //     rangeTypes: ['week', 'month', 'day']
      //   }
      // }
    }
  }
  var schema1 = {
    type: 'object',
    properties: {
      '[startDate,endDate]': {
        type: 'daterange',
        default: [
          { type: 'specify', value: '2019-01-01', flag: 'date' },
          { type: 'specify', value: '2019-01-02', flag: 'date' }
        ],
        'z-index': 0
      }
    }
  }
  var value = lang.normalizeSchema(schema)
  var value1 = lang.normalizeSchema(schema1)
  var result = {
    type: 'object',
    properties: {
      wrapper: {
        type: 'object',
        'x-component': 'layout',
        properties: {
          '[startDate1,endDate1]': {
            type: 'daterange',
            default: ['2019-01-01', '2019-01-02'],
            'z-index': 0
          }
        }
      },
      '[startDate,endDate]': {
        type: 'daterange',
        default: ['2019-01-01', '2019-01-02'],
        'z-index': 0
      }
    }
  }
  var result1 = {
    type: 'object',
    properties: {
      '[startDate,endDate]': {
        type: 'daterange',
        default: ['2019-01-01', '2019-01-02'],
        'z-index': 0
      }
    }
  }

  expect(value).toEqual(result)
  expect(value1).toEqual(result1)
  expect(lang.normalizeSchema()).toEqual(null)
})
