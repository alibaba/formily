import {
  compile,
  silent,
  registerCompiler,
  shallowCompile,
  patchCompile,
  patchSchemaCompile,
} from '../compiler'
import { Schema } from '../schema'

test('compile', () => {
  expect(compile('{{123}}xx')).toEqual('{{123}}xx')
  expect(compile('{{123}}  ')).toEqual(123)
  expect(compile('{{123}}')).toEqual(123)
  expect(
    compile({
      hello: '{{123}}',
    })
  ).toEqual({
    hello: 123,
  })
  expect(
    compile({
      array: ['{{123}}'],
    })
  ).toEqual({
    array: [123],
  })
  const date = new Date()
  date['expression'] = '{{123}}'
  const compiledDate = compile(date)
  expect(compiledDate).toEqual(date)
  expect(compiledDate['expression']).toEqual('{{123}}')
  const moment = { _isAMomentObject: true, expression: '{{123}}' }
  const compiledMoment = compile(moment)
  expect(compiledMoment).toEqual(moment)
  expect(compiledMoment['expression']).toEqual('{{123}}')
  const react = { _owner: true, $$typeof: true, expression: '{{123}}' }
  const compiledReact = compile(react)
  expect(compiledReact).toEqual(react)
  expect(compiledReact['expression']).toEqual('{{123}}')
  const actions = {
    [Symbol.for('__REVA_ACTIONS')]: true,
    expression: '{{123}}',
  }
  const compiledActions = compile(actions)
  expect(compiledActions).toEqual(actions)
  expect(compiledActions['expression']).toEqual('{{123}}')

  const schema = new Schema({
    type: 'object',
    properties: {
      aa: {
        type: 'string',
        'x-component': 'Input',
        'x-component-props': '{{123}}',
      },
    },
  })
  const compiledSchema = schema.compile()
  expect(compiledSchema.toJSON()).toEqual(schema.toJSON())
  expect(compiledSchema.properties?.['aa']['x-component-props']).toEqual(
    '{{123}}'
  )
  const toJSable = {
    toJS() {
      return {
        aa: 123,
      }
    },
    expression: '{{123}}',
  }

  const compiledToJSable = compile(toJSable)
  expect(compiledToJSable).toEqual(toJSable)
  expect(compiledToJSable['expression']).toEqual('{{123}}')

  const toJSONable = {
    toJSON() {
      return {
        aa: 123,
      }
    },
    expression: '{{123}}',
  }

  const compiledToJSONable = compile(toJSONable)
  expect(compiledToJSONable).toEqual(toJSONable)
  expect(compiledToJSONable['expression']).toEqual('{{123}}')

  const circularRef = {
    expression: '{{123}}',
  }
  circularRef['self'] = circularRef

  const compiledCircularRef = compile(circularRef)
  expect(compiledCircularRef['expression']).toEqual(123)
})

test('shallowCompile', () => {
  expect(shallowCompile('{{123}}xx')).toEqual('{{123}}xx')
  expect(shallowCompile('{{123}}  ')).toEqual(123)
  expect(shallowCompile('{{123}}')).toEqual(123)
  expect(
    shallowCompile({
      hello: '{{123}}',
    })
  ).toEqual({
    hello: '{{123}}',
  })
  expect(
    shallowCompile({
      array: ['{{123}}'],
    })
  ).toEqual({
    array: ['{{123}}'],
  })
  expect(shallowCompile(['{{123}}'])).toEqual(['{{123}}'])
  expect(shallowCompile([{ kk: '{{123}}' }])).toEqual([{ kk: '{{123}}' }])
})

test('unsilent', () => {
  silent(false)
  expect(() => compile('{{ ( }}')).toThrowError()
})

test('silent', () => {
  silent(true)
  expect(() => compile('{{ ( }}')).not.toThrowError()
  silent(false)
})

test('patchCompile', () => {
  const targetState = {
    title: '',
    description: '',
    dataSource: [22],
  }
  patchCompile(
    targetState as any,
    {
      title: '132',
      description: '{{"Hello world"}}',
      dataSource: [1, 2, 3, '{{333}}'],
      extend: '333',
    },
    {}
  )
  expect(targetState).toEqual({
    title: '132',
    description: 'Hello world',
    dataSource: [1, 2, 3, 333],
  })
})

test('patchSchemaCompile', () => {
  const targetState = {
    title: '',
    description: '',
    dataSource: [22],
  }
  patchSchemaCompile(
    targetState as any,
    {
      title: '132',
      description: '{{"Hello world"}}',
      enum: [1, 2, 3, '{{333}}'],
      'x-reactions': {
        fulfill: {
          schema: {
            title: 'hello',
          },
        },
      },
      version: '1.2.3',
    },
    {}
  )
  expect(targetState).toEqual({
    title: '132',
    description: 'Hello world',
    dataSource: [
      { label: 1, value: 1 },
      { label: 2, value: 2 },
      { label: 3, value: 3 },
      { label: 333, value: 333 },
    ],
  })
})

test('patchSchemaCompile demand un initialized', () => {
  const setValidatorRule = (name: string, value: any) => {
    targetState[name] = value
  }
  const targetState = {
    title: '',
    description: '',
    dataSource: [22],
    setValidatorRule,
  }
  patchSchemaCompile(
    targetState as any,
    {
      title: '132',
      'x-display': undefined,
      'x-hidden': null,
      description: '{{"Hello world"}}',
      enum: [1, 2, 3, '{{333}}'],
      format: 'phone',
      'x-reactions': {
        fulfill: {
          schema: {
            title: 'hello',
          },
        },
      },
      version: '1.2.3',
    },
    {},
    true
  )
  expect(targetState).toEqual({
    title: '132',
    description: 'Hello world',
    hidden: null,
    format: 'phone',
    setValidatorRule,
    dataSource: [
      { label: 1, value: 1 },
      { label: 2, value: 2 },
      { label: 3, value: 3 },
      { label: 333, value: 333 },
    ],
  })
})

test('patchSchemaCompile demand initialized', () => {
  const targetState = {
    initialized: true,
    title: '',
    description: '',
    dataSource: [22],
  }
  patchSchemaCompile(
    targetState as any,
    {
      title: '132',
      description: '{{"Hello world"}}',
      enum: [1, 2, 3, '{{333}}'],
      'x-reactions': {
        fulfill: {
          schema: {
            title: 'hello',
          },
        },
      },
      version: '1.2.3',
    },
    {},
    true
  )
  expect(targetState).toEqual({
    initialized: true,
    title: '',
    description: '',
    dataSource: [22],
  })
})

test('patchSchemaCompile x-compile-omitted', () => {
  const targetState = {
    title: '',
    validator: [],
  }
  patchSchemaCompile(
    targetState as any,
    {
      title: '132',
      'x-validator': [
        {
          remoteCheckUniq: '{{field.value}}',
        },
      ],
      version: '1.2.3',
    },
    {
      field: {
        value: 888,
      },
    }
  )
  expect(targetState).toEqual({
    title: '132',
    validator: [{ remoteCheckUniq: 888 }],
  })

  const targetOmitState = {
    title: '',
    validator: [],
  }
  patchSchemaCompile(
    targetOmitState as any,
    {
      title: '132',
      'x-compile-omitted': ['x-validator'],
      'x-validator': [
        {
          remoteCheckUniq: '{{field.value}}',
        },
      ],
      version: '1.2.3',
    },
    {
      field: {
        value: 888,
      },
    }
  )
  expect(targetOmitState).toEqual({
    title: '132',
    validator: [{ remoteCheckUniq: '{{field.value}}' }],
  })
})

test('registerCompiler', () => {
  registerCompiler(() => {
    return 'compiled'
  })
  expect(compile('{{123}}xx')).toEqual('{{123}}xx')
  expect(compile('{{123}}  ')).toEqual('compiled')
  expect(compile('{{123}}')).toEqual('compiled')
  expect(
    compile({
      hello: '{{123}}',
    })
  ).toEqual({
    hello: 'compiled',
  })
  expect(
    compile({
      array: ['{{123}}'],
    })
  ).toEqual({
    array: ['compiled'],
  })
  registerCompiler(null)
})
