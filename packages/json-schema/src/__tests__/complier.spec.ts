import { complie, registerComplier, shallowComplie } from '../complier'
import { makeAutoObservable } from 'mobx'
import { Schema } from '../schema'

test('complie', () => {
  expect(complie('{{123}}xx')).toEqual('{{123}}xx')
  expect(complie('{{123}}  ')).toEqual(123)
  expect(complie('{{123}}')).toEqual(123)
  expect(
    complie({
      hello: '{{123}}',
    })
  ).toEqual({
    hello: 123,
  })
  expect(
    complie({
      array: ['{{123}}'],
    })
  ).toEqual({
    array: [123],
  })
  const date = new Date()
  date['expression'] = '{{123}}'
  const compliedDate = complie(date)
  expect(compliedDate).toEqual(date)
  expect(compliedDate['expression']).toEqual('{{123}}')
  const moment = { _isAMomentObject: true, expression: '{{123}}' }
  const compliedMoment = complie(moment)
  expect(compliedMoment).toEqual(moment)
  expect(compliedMoment['expression']).toEqual('{{123}}')
  const react = { _owner: true, $$typeof: true, expression: '{{123}}' }
  const compliedReact = complie(react)
  expect(compliedReact).toEqual(react)
  expect(compliedReact['expression']).toEqual('{{123}}')
  const actions = {
    [Symbol.for('__REVA_ACTIONS')]: true,
    expression: '{{123}}',
  }
  const compliedActions = complie(actions)
  expect(compliedActions).toEqual(actions)
  expect(compliedActions['expression']).toEqual('{{123}}')
  const observable = makeAutoObservable({
    aa: 123,
    bb: 321,
    expression: '{{123}}',
  })
  const compliedObservable = complie(observable)
  expect(compliedObservable).toEqual(observable)
  expect(compliedObservable['expression']).toEqual('{{123}}')

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
  const compliedSchema = complie(schema)
  expect(compliedSchema).toEqual(schema)
  expect(compliedSchema.properties['aa']['x-component-props']).toEqual(
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

  const compliedToJSable = complie(toJSable)
  expect(compliedToJSable).toEqual(toJSable)
  expect(compliedToJSable['expression']).toEqual('{{123}}')

  const toJSONable = {
    toJSON() {
      return {
        aa: 123,
      }
    },
    expression: '{{123}}',
  }

  const compliedToJSONable = complie(toJSONable)
  expect(compliedToJSONable).toEqual(toJSONable)
  expect(compliedToJSONable['expression']).toEqual('{{123}}')

  const circularRef = {
    expression: '{{123}}',
  }
  circularRef['self'] = circularRef

  const compliedCircularRef = complie(circularRef)
  expect(compliedCircularRef['expression']).toEqual(123)
})

test('shallowComplie', () => {
  expect(shallowComplie('{{123}}xx')).toEqual('{{123}}xx')
  expect(shallowComplie('{{123}}  ')).toEqual(123)
  expect(shallowComplie('{{123}}')).toEqual(123)
  expect(
    shallowComplie({
      hello: '{{123}}',
    })
  ).toEqual({
    hello: '{{123}}',
  })
  expect(
    shallowComplie({
      array: ['{{123}}'],
    })
  ).toEqual({
    array: ['{{123}}'],
  })
  expect(shallowComplie(['{{123}}'])).toEqual([123])
  expect(shallowComplie([{ kk: '{{123}}' }])).toEqual([{ kk: '{{123}}' }])
})

test('registerComplier', () => {
  registerComplier(() => {
    return 'complied'
  })
  expect(complie('{{123}}xx')).toEqual('{{123}}xx')
  expect(complie('{{123}}  ')).toEqual('complied')
  expect(complie('{{123}}')).toEqual('complied')
  expect(
    complie({
      hello: '{{123}}',
    })
  ).toEqual({
    hello: 'complied',
  })
  expect(
    complie({
      array: ['{{123}}'],
    })
  ).toEqual({
    array: ['complied'],
  })
  registerComplier(null)
})
