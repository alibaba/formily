import b from 'benny'
import * as curtReactive from '../src'
import * as prevReactive from '@formily/reactive'

// @formily/reactive from the current directory node_modules physical package,
// not the parent directory node_modules soft link package,
// so remember upgrade the dependent package before benchmark

type BenchmarkFn = (
  reactiveVersion: typeof curtReactive | typeof prevReactive
) => void

function times(times: number, fn: (t: number) => void) {
  ~[...Array(times).keys()].forEach(fn)
}

const benchmark1: BenchmarkFn = (reactiveVersion) => {
  const obs: any = reactiveVersion.observable({})
  obs.arr = []
  obs.obj = {}
  times(1e2, (i) => {
    obs.num = i
    obs.str = String(i)
    obs.arr.push(i)
    obs.obj[String(i)] = i
  })
}

const benchmark2: BenchmarkFn = (reactiveVersion) => {
  const obs: any = reactiveVersion.model({
    a: 0,
    b: 0,
    get c() {
      return this.a + this.b
    },
    get d() {
      void (this.a + this.b)
      return 0
    },
  })
  const disposers = [
    reactiveVersion.autorun(() => obs.a + obs.b),
    reactiveVersion.autorun(() => obs.c + obs.d),
    reactiveVersion.autorun(() => obs.c),
    reactiveVersion.autorun(() => obs.d),
    reactiveVersion.reaction(
      () => obs.a + obs.b,
      (x) => x
    ),
    reactiveVersion.reaction(
      () => obs.c + obs.d,
      (x) => x
    ),
    reactiveVersion.reaction(
      () => obs.c,
      (x) => x
    ),
    reactiveVersion.reaction(
      () => obs.d,
      (x) => x
    ),
  ]
  times(1e2, (i) => {
    obs.a = i
    obs.b += i
  })
  disposers.forEach((disposer) => disposer())
}

b.suite(
  'Reactive Observable',

  b.add('prev reactive', () => {
    benchmark1(prevReactive)
    benchmark2(prevReactive)
  }),

  b.add('current reactive', () => {
    benchmark1(curtReactive)
    benchmark2(curtReactive)
  }),

  b.cycle(),
  b.complete()
)
