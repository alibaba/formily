import b from 'benny'
import _ from 'lodash'
import { Parser } from './src/parser'

const str =
  'aakkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk.bbmmmmmmmmmmmmmmmmmmmmmmmmmmm.cceeeeeeeeeeeeeeeeeee'

b.suite(
  'Path benchmark',
  b.add('Path parse', () => {
    _.times(1e3, () => {
      new Parser(str).parse()
    })
  }),
  b.add('Normal foreach', () => {
    _.times(1e3, () => {
      if (!/[()*\[\]]/.test(str)) {
        str.replace(/\s+/g, '').split('.')
      }
    })
  }),
  b.add('charCodeAt foreach', () => {
    _.times(1e3, () => {
      const res = []
      for (let i = 0; i < str.length; i++) {
        res.push(str.charCodeAt(i))
      }
    })
  }),
  b.cycle(),
  b.complete()
)
