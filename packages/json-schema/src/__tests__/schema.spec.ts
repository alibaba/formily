import { Schema } from '../'
import { isFn } from '@formily/shared'

test('has methods', () => {
  const schema = new Schema({
    type: 'object',
    properties: {
      aa: {
        type: 'string',
      },
    },
  })
  expect(isFn(schema.setAdditionalItems)).toBeTruthy()
  expect(isFn(schema.setAdditionalProperties)).toBeTruthy()
  expect(isFn(schema.setItems)).toBeTruthy()
  expect(isFn(schema.setPatternProperties)).toBeTruthy()
  expect(isFn(schema.setProperties)).toBeTruthy()
  expect(isFn(schema.addPatternProperty)).toBeTruthy()
  expect(isFn(schema.addProperty)).toBeTruthy()
  expect(isFn(schema.fromJSON)).toBeTruthy()
  expect(isFn(schema.toJSON)).toBeTruthy()
  expect(isFn(schema.reducePatternProperties)).toBeTruthy()
  expect(isFn(schema.reduceProperties)).toBeTruthy()
  expect(isFn(schema.removeProperty)).toBeTruthy()
  expect(isFn(schema.removePatternProperty)).toBeTruthy()
  expect(isFn(schema.mapPatternProperties)).toBeTruthy()
  expect(isFn(schema.mapProperties)).toBeTruthy()

  expect(isFn(Schema.isSchemaInstance)).toBeTruthy()
  expect(isFn(Schema.registerCompiler)).toBeTruthy()
  expect(isFn(Schema.registerPatches)).toBeTruthy()
  expect(isFn(Schema.shallowCompile)).toBeTruthy()
  expect(isFn(Schema.compile)).toBeTruthy()
  expect(isFn(Schema.getOrderProperties)).toBeTruthy()
})

test('all props', () => {
  const schema = new Schema({
    type: 'object',
    title: 'title',
    description: 'description',
    patternProperties: {
      '^[a-zA-Z0-9]*$': {
        properties: {
          model: { type: 'string' },
          made: { type: 'string' },
          year: { type: 'string' },
        },
      },
    },
    additionalProperties: {
      type: 'string',
    },
    properties: {
      string: {
        type: 'string',
        default: 'default',
        required: true,
        'x-component': 'Input',
        'x-component-props': {
          placeholder: 'placeholder',
        },
        'x-decorator': 'FormItem',
        'x-decorator-props': {
          labelCol: 3,
        },
        'x-disabled': true,
        'x-display': 'visible',
        'x-editable': false,
        'x-hidden': false,
        'x-pattern': 'readPretty',
        'x-read-only': true,
        'x-validator': ['phone'],
        'x-reactions': [
          {
            target: 'xxx',
            when: '{{aa > bb}}',
          },
        ],
      },
      boolean: {
        type: 'boolean',
        default: false,
      },
      number: {
        type: 'number',
        default: 100,
      },
      date: {
        type: 'date',
        default: '2020-12-23',
      },
      datetime: {
        type: 'datetime',
        default: '2020-12-23 23:00:00',
      },
      array: {
        type: 'array',
        items: {
          type: 'string',
        },
        additionalItems: {
          type: 'number',
        },
      },
      array2: {
        type: 'array',
        items: [
          {
            type: 'string',
          },
          {
            type: 'object',
          },
        ],
      },
      void: {
        type: 'void',
      },
    },
  })
  expect(schema).toMatchSnapshot()
})

test('all methods', () => {
  const schema = new Schema({
    type: 'object',
    'x-reactions': null,
  })
  const schema2 = new Schema({
    type: 'object',
    fn: () => {},
  } as any)
  const schema3 = new Schema({
    type: 'object',
    additionalItems: null,
    additionalProperties: null,
    properties: null,
  })
  schema3.additionalItems = null
  schema3.additionalProperties = null
  schema3.properties = {
    xxx: null,
  }
  schema3.items = [null]
  const schema4 = new Schema({
    type: 'object',
    additionalItems: {},
    additionalProperties: {},
    properties: {},
  })
  schema4.additionalItems = {} as any
  schema4.additionalProperties = {} as any
  schema4.properties = {
    xxx: {} as any,
  }
  schema4.items = [{}] as any
  const schema5 = new Schema({
    type: 'array',
  })
  schema5.items = null
  const schema6 = new Schema({
    type: 'array',
  })
  schema6.items = {} as any
  const schema7 = new Schema({
    type: 'array',
    items: {
      type: 'string',
    },
  })
  const string = schema.addProperty('string', {
    type: 'string',
    title: 'string',
    description: null,
    'x-reactions': [
      {
        target: 'xxx',
        when: true,
        fulfill: {
          schema: {},
        },
      },
    ],
  })

  const array = schema.addProperty('array', {
    type: 'string',
    title: 'string',
    items: [{ type: 'integer' }, { type: 'integer' }],
  })
  const pattern = schema.addPatternProperty('^[a-zA-Z0-9]*$', {
    properties: {
      model: { type: 'string', 'x-index': 2 },
      made: { type: 'string', 'x-index': 1 },
      year: { type: 'string', 'x-index': 0 },
    },
  })
  schema.addPatternProperty('xxx', null)
  schema.setAdditionalProperties({
    type: 'string',
  })
  schema.setAdditionalProperties(null)
  array.setItems(null)
  array.setAdditionalItems({
    type: 'string',
  })
  array.setAdditionalItems(null)
  schema.setPatternProperties(null)
  schema.fromJSON(null)
  expect(schema2['fn']).toBeUndefined()
  expect(schema.properties.string).not.toBeUndefined()
  expect(schema.patternProperties['^[a-zA-Z0-9]*$']).not.toBeUndefined()
  expect(schema).toMatchSnapshot()
  expect(schema.toJSON()).toMatchSnapshot()
  expect(pattern.mapProperties((schema, key) => key)).toEqual([
    'year',
    'made',
    'model',
  ])
  expect(
    pattern.reduceProperties((buf, schema, key) => buf.concat('_' + key), [])
  ).toEqual(['_year', '_made', '_model'])
  expect(schema.mapPatternProperties((schema, key) => key)).toEqual([
    '^[a-zA-Z0-9]*$',
  ])
  expect(
    schema.reducePatternProperties(
      (buf, schema, key) => buf.concat('_' + key),
      []
    )
  ).toEqual(['_^[a-zA-Z0-9]*$'])
  schema5.toJSON()
  schema6.toJSON()
  schema7.toJSON()
  schema.removeProperty('string')
  expect(schema.properties.string).toBeUndefined()
  schema.removePatternProperty('^[a-zA-Z0-9]*$')
  expect(schema.patternProperties['^[a-zA-Z0-9]*$']).toBeUndefined()
  expect(schema.compile()).toMatchSnapshot()
  expect(string.compile()).toMatchSnapshot()
  expect(schema3.toJSON()).toMatchSnapshot()
  expect(schema4.toJSON()).toMatchSnapshot()
})

describe('all static methods', () => {
  expect(Schema.compile({ aa: '{{123}}' })).toEqual({ aa: 123 })
  expect(Schema.shallowCompile('{{123}}')).toEqual(123)
  expect(Schema.getOrderProperties()).toEqual([])
  Schema.registerPatches(null)
})
