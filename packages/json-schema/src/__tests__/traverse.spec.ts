import { traverse } from '../traverse'

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
