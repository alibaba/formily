import { Schema } from '../schema'

test('transform field props', () => {
  const schema = new Schema({
    type: 'string',
  })
  expect(schema.toFieldProps()).not.toBeUndefined()
})

test('transform required', () => {
  const schema = new Schema({
    type: 'object',
    required: ['string'],
    properties: {
      string: {
        type: 'string',
      },
      number: {
        type: 'number',
        required: true,
      },
      date: {
        type: 'date',
      },
    },
  })
  expect(schema.toFieldProps().required).toBeFalsy()
  expect(schema.properties.string.toFieldProps().required).toBeTruthy()
  expect(schema.properties.number.toFieldProps().required).toBeTruthy()
  expect(schema.properties.date.toFieldProps().required).toBeFalsy()
  const schema2 = new Schema({
    type: 'object',
    required: 'string',
    properties: {
      string: {
        type: 'string',
      },
      number: {
        type: 'number',
        required: true,
      },
      date: {
        type: 'date',
      },
    },
  })
  expect(schema2.toFieldProps().required).toBeFalsy()
  expect(schema2.properties.string.toFieldProps().required).toBeTruthy()
  expect(schema2.properties.number.toFieldProps().required).toBeTruthy()
  expect(schema2.properties.date.toFieldProps().required).toBeFalsy()
})

describe('transform validator', () => {
  test('maxItems/minItems', () => {
    const schema = new Schema({
      type: 'string',
      maxItems: 100,
      minItems: 10,
    })
    const props = schema.toFieldProps()
    expect(props.validator).toEqual([
      {
        max: 100,
      },
      {
        min: 10,
      },
    ])
  })
  test('maxLength/minLength', () => {
    const schema = new Schema({
      type: 'string',
      maxLength: 100,
      minLength: 10,
    })
    const props = schema.toFieldProps()
    expect(props.validator).toEqual([
      {
        max: 100,
      },
      {
        min: 10,
      },
    ])
  })
  test('maximum/minimum', () => {
    const schema = new Schema({
      type: 'string',
      maximum: 100,
      minimum: 10,
    })
    const props = schema.toFieldProps()
    expect(props.validator).toEqual([
      {
        maximum: 100,
      },
      {
        minimum: 10,
      },
    ])
  })
  test('exclusiveMaximum/exclusiveMinimum', () => {
    const schema = new Schema({
      type: 'string',
      exclusiveMaximum: 100,
      exclusiveMinimum: 10,
    })
    const props = schema.toFieldProps()
    expect(props.validator).toEqual([
      {
        exclusiveMaximum: 100,
      },
      {
        exclusiveMinimum: 10,
      },
    ])
  })
  test('pattern', () => {
    const schema = new Schema({
      type: 'string',
      pattern: /\d/,
    })
    const props = schema.toFieldProps()
    expect(props.validator).toEqual([
      {
        pattern: /\d/,
      },
    ])
  })
  test('pattern', () => {
    const schema = new Schema({
      type: 'string',
      const: 123,
    })
    const props = schema.toFieldProps()
    expect(props.validator.length).toEqual(1)
  })
  test('multipleOf', () => {
    const schema = new Schema({
      type: 'string',
      multipleOf: 100,
    })
    const props = schema.toFieldProps()
    expect(props.validator.length).toEqual(1)
  })
  test('maxProperties', () => {
    const schema = new Schema({
      type: 'string',
      maxProperties: 10,
    })
    const props = schema.toFieldProps()
    expect(props.validator.length).toEqual(1)
  })
  test('minProperties', () => {
    const schema = new Schema({
      type: 'string',
      minProperties: 10,
    })
    const props = schema.toFieldProps()
    expect(props.validator.length).toEqual(1)
  })
  test('uniqueItems', () => {
    const schema = new Schema({
      type: 'string',
      uniqueItems: true,
    })
    const props = schema.toFieldProps()
    expect(props.validator.length).toEqual(1)
  })

  test('format', () => {
    const schema = new Schema({
      type: 'string',
      format: 'date',
    })
    const props = schema.toFieldProps()
    expect(props.validator.length).toEqual(1)
  })

  test('enum', () => {
    const schema = new Schema({
      type: 'string',
      enum: [
        { label: 'aaa', value: 1 },
        { label: 'bbb', value: 2 },
      ],
    })
    const props = schema.toFieldProps()
    expect(props.dataSource).toEqual([
      { label: 'aaa', value: 1 },
      { label: 'bbb', value: 2 },
    ])
    const schema2 = new Schema({
      type: 'string',
      enum: ['111', '222'],
    })
    const props2 = schema2.toFieldProps()
    expect(props2.dataSource).toEqual([
      { label: '111', value: '111' },
      { label: '222', value: '222' },
    ])
  })

  test('x-validator', () => {
    const schema = new Schema({
      type: 'string',
      'x-validator': () => {},
    })
    const props = schema.toFieldProps()
    expect(props.validator.length).toEqual(1)
  })
})
