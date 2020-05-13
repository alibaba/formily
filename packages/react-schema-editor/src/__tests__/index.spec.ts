import { json2schema } from '../utils/json2schema'

// mock datasource
const testValues = {
  string: 'input test',
  boolean: true,
  checkbox: ['1'],
  date: '2019-12-12',
  daterange: ['2019-12-12', '2019-12-13'],
  number: 1,
  radio: '2',
  rating: 4,
  select: '1',
  textarea: 'test text',
  time: '00:00:04',
  transfer: [1, 2],
  year: '2013-01-01 00:00:00'
}

describe('json object transform', () => {
  test('values', () => {
    const result = json2schema(testValues)
    const validResult = {
      title: '',
      type: 'object',
      properties: {
        string: {
          title: '',
          type: 'string',
          example: 'input test',
          enum: [],
          description: '',
          'x-component': 'Input'
        },
        boolean: {
          title: '',
          type: 'boolean',
          example: true,
          enum: [],
          description: '',
          'x-component': 'Input'
        },
        checkbox: {
          title: '',
          type: 'array',
          items: {
            title: '',
            type: 'string',
            example: '1',
            enum: [],
            description: '',
            'x-component': 'Input'
          },
          description: '',
          'x-component': 'Input'
        },
        date: {
          title: '',
          type: 'string',
          example: '2019-12-12',
          enum: [],
          description: '',
          'x-component': 'Input'
        },
        daterange: {
          title: '',
          type: 'array',
          items: {
            title: '',
            type: 'string',
            example: '2019-12-12',
            enum: [],
            description: '',
            'x-component': 'Input'
          },
          description: '',
          'x-component': 'Input'
        },
        number: {
          title: '',
          type: 'number',
          example: 1,
          enum: [],
          description: '',
          'x-component': 'Input'
        },
        radio: {
          title: '',
          type: 'string',
          example: '2',
          enum: [],
          description: '',
          'x-component': 'Input'
        },
        rating: {
          title: '',
          type: 'number',
          example: 4,
          enum: [],
          description: '',
          'x-component': 'Input'
        },
        select: {
          title: '',
          type: 'string',
          example: '1',
          enum: [],
          description: '',
          'x-component': 'Input'
        },
        textarea: {
          title: '',
          type: 'string',
          example: 'test text',
          enum: [],
          description: '',
          'x-component': 'Input'
        },
        time: {
          title: '',
          type: 'string',
          example: '00:00:04',
          enum: [],
          description: '',
          'x-component': 'Input'
        },
        transfer: {
          title: '',
          type: 'array',
          items: {
            title: '',
            type: 'number',
            example: 1,
            enum: [],
            description: '',
            'x-component': 'Input'
          },
          description: '',
          'x-component': 'Input'
        },
        year: {
          title: '',
          type: 'string',
          example: '2013-01-01 00:00:00',
          enum: [],
          description: '',
          'x-component': 'Input'
        }
      },
      description: ''
    }

    // console.log(JSON.stringify(result, null, 2))
    expect(result).toEqual(validResult)
  })
})
