import b from 'benny'
import { Parser } from './src/parser'

function times(times: number, fn: (t: number) => void) {
  ~[...Array(times).keys()].forEach(fn)
}

const str =
  'aakkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk.bbmmmmmmmmmmmmmmmmmmmmmmmmmmm.cceeeeeeeeeeeeeeeeeee'

b.suite(
  'Path benchmark',
  b.add('Path parse', () => {
    times(1e3, () => {
      new Parser(str).parse()
    })
  }),
  b.add('Normal foreach', () => {
    times(1e3, () => {
      if (!/[()*\[\]]/.test(str)) {
        str.replace(/\s+/g, '').split('.')
      }
    })
  }),
  b.add('charCodeAt foreach', () => {
    times(1e3, () => {
      const res = []
      for (let i = 0; i < str.length; i++) {
        res.push(str.charCodeAt(i))
      }
    })
  }),
  b.cycle(),
  b.complete()
)
