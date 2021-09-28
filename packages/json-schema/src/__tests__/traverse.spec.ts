import { traverse, traverseSchema } from '../shared'
import { FormPath } from '@formily/shared'

test('traverseSchema', () => {
  const visited = []
  traverseSchema(
    {
      type: 'string',
      required: true,
      'x-validator': 'phone',
    },
    (value, path) => {
      visited.push(path)
    }
  )
  expect(visited).toEqual([['x-validator'], ['type'], ['required']])
})

test('traverse circular reference', () => {
  // eslint-disable-next-line
  var a = {
    dd: {
      mm: null,
    },
    bb: {
      cc: {
        dd: 123,
      },
    },
    kk: {
      toJS() {},
    },
  }
  a.dd.mm = a
  traverse(a, () => {})
})

test('traverse none circular reference', () => {
  // eslint-disable-next-line
  var dd = {
    mm: null,
  }
  let a = {
    dd,
    bb: {
      dd,
    },
  }
  const paths = []
  traverse(a, (value, path) => {
    paths.push(path)
  })
  expect(
    paths.some((path) => FormPath.parse(path).includes('dd.mm'))
  ).toBeTruthy()
  expect(
    paths.some((path) => FormPath.parse(path).includes('bb.dd.mm'))
  ).toBeTruthy()
})
