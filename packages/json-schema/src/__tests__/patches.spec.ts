import { Schema } from '../schema'
import {
  registerTypeDefaultComponents,
  registerVoidComponents,
} from '../polyfills'

registerVoidComponents(['MyCard'])
registerTypeDefaultComponents({
  string: 'Input',
})

Schema.enablePolyfills(['1.0'])

test('v1 polyfill', () => {
  const schema = new Schema({
    type: 'string',
    editable: true,
  } as any)
  expect(schema['x-editable']).toEqual(true)
  const schema1 = new Schema({
    type: 'string',
    visible: true,
  } as any)
  expect(schema1['x-visible']).toEqual(true)
  const schema2 = new Schema({
    type: 'string',
    display: false,
  } as any)
  expect(schema2['x-display']).toEqual('hidden')
  expect(schema2['x-display']).toEqual('hidden')
  const schema3 = new Schema({
    type: 'string',
    'x-linkages': [
      {
        type: 'value:visible',
        condition: '{{$value == 123}}',
      },
    ],
  } as any)
  expect(schema3['x-reactions']).toEqual([
    {
      when: '{{$self.value == 123}}',
      fulfill: {
        state: {
          visible: true,
        },
      },
      otherwise: {
        state: {
          visible: false,
        },
      },
    },
  ])
  const schema4 = new Schema({
    type: 'string',
    'x-linkages': [
      {
        type: 'value:schema',
        target: 'xxx',
        condition: '{{$value == 123}}',
        schema: {
          title: 'xxx',
        },
        otherwise: {
          title: '123',
        },
      },
    ],
  } as any)
  expect(schema4['x-reactions']).toEqual([
    {
      when: '{{$self.value == 123}}',
      target: 'xxx',
      fulfill: {
        schema: {
          version: '1.0',
          title: 'xxx',
          'x-decorator': 'FormItem',
        },
      },
      otherwise: {
        schema: {
          version: '1.0',
          title: '123',
          'x-decorator': 'FormItem',
        },
      },
    },
  ])
  const schema5 = new Schema({
    type: 'string',
    'x-linkages': [
      {
        type: 'value:state',
        target: 'xxx',
        condition: '{{$value == 123}}',
        state: {
          title: 'xxx',
        },
        otherwise: {
          title: '123',
        },
      },
    ],
  } as any)
  expect(schema5['x-reactions']).toEqual([
    {
      when: '{{$self.value == 123}}',
      target: 'xxx',
      fulfill: {
        state: {
          title: 'xxx',
        },
      },
      otherwise: {
        state: {
          title: '123',
        },
      },
    },
  ])
  const schema6 = new Schema({
    type: 'string',
    'x-props': {
      labelCol: 3,
      wrapperCol: 4,
    },
    'x-linkages': [
      {
        type: 'value:visible',
        condition: null,
      },
    ],
  } as any)
  expect(schema6['x-component']).toEqual('Input')
  expect(schema6['x-decorator']).toEqual('FormItem')
  expect(schema6['x-decorator-props']).toEqual({
    labelCol: 3,
    wrapperCol: 4,
  })
  const schema7 = new Schema({
    type: 'object',
    'x-component': 'MyCard',
    'x-linkages': {},
  } as any)
  expect(schema7.type === 'void').toBeTruthy()
  new Schema({
    type: 'object',
    'x-component': 'MyCard',
    'x-linkages': [null],
  } as any)
  new Schema({
    type: 'object',
    'x-component': 'MyCard',
    'x-linkages': [{}],
  } as any)
  const schema8 = new Schema({
    type: 'string',
    'x-rules': ['phone'],
  } as any)
  expect(schema8['x-validator']).toEqual(['phone'])
})
