import b from 'benny'
import * as curtReactive from '../src'
import * as prevReactive from '@formily/reactive'
import { createElement } from 'react'

// @formily/reactive from the current directory node_modules physical package,
// not the parent directory node_modules soft link package,
// so remember upgrade the dependent package before benchmark

type BenchmarkFn = (
  reactiveVersion: typeof curtReactive | typeof prevReactive
) => void

function times(times: number, fn: (t: number) => void) {
  ~[...Array(times).keys()].forEach(fn)
}

function createElements() {
  createElement(
    'div',
    {},
    createElement('span', {}, 'hello'),
    createElement('span', {}, 'world')
  )
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
    get b() {
      return this.a
    },
    get c() {
      void this.a
      return 0
    },
  })
  const disposers = [
    // Heavy load
    reactiveVersion.autorun(() => (void obs.b, createElements())),
    reactiveVersion.autorun(() => (void obs.c, createElements())),
    // Light load
    reactiveVersion.reaction(
      () => obs.b,
      (b) => void b
    ),
    reactiveVersion.reaction(
      () => obs.c,
      (c) => void c
    ),
  ]
  times(1e2, () => obs.a++)
  disposers.forEach((d) => d())
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
