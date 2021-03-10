import { compile, registerCompiler, shallowCompile } from '../compiler'
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
  const compiledSchema = compile(schema)
  expect(compiledSchema).toEqual(schema)
  expect(compiledSchema.properties['aa']['x-component-props']).toEqual(
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
  expect(shallowCompile(['{{123}}'])).toEqual([123])
  expect(shallowCompile([{ kk: '{{123}}' }])).toEqual([{ kk: '{{123}}' }])
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
