import b from 'benny'
import * as mobx from 'mobx'
import * as vueReactivity from '@vue/reactivity'
import * as formilyReactive from '../src'

function times(times: number, fn: (t: number) => void) {
  ~[...Array(times).keys()].forEach(fn)
}

const benchmark1 = (obs: any) => {
  obs.arr = []
  obs.obj = {}
  times(1e2, (v) => {
    obs.num = v
    obs.str = String(v)
    obs.arr.push(v)
    obs.obj[String(v)] = v
  })
}

b.suite(
  'Reactive Observable',

  b.add('Case MobX', () => {
    const obs = mobx.observable({})
    benchmark1(obs)
  }),

  b.add('Case @vue/reactivity', () => {
    const obs = vueReactivity.reactive({})
    benchmark1(obs)
  }),

  b.add('Case @formily/reactive', () => {
    const obs = formilyReactive.observable({})
    benchmark1(obs)
  }),

  b.cycle(),
  b.complete()
)
