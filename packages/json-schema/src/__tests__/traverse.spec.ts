import { traverse } from '../traverse'
import { FormPath } from '@formily/shared'

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
