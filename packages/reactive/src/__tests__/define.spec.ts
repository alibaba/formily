import { define, model, observable, autorun } from '..'
import { observe } from '../observe'
import { FormPath } from '@formily/shared'
import { batch } from '../batch'

describe('makeObservable', () => {
  test('observable annotation', () => {
    const target: any = {
      aa: {},
    }
    define(target, {
      aa: observable,
    })
    const handler = jest.fn()
    const handler1 = jest.fn()
    const handler2 = jest.fn()
    autorun(() => {
      handler(FormPath.getIn(target, 'aa.bb.cc'))
    })
    observe(target, handler1)
    observe(target.aa, handler2)
    target.aa.bb = { cc: { dd: { ee: 123 } } }
    target.aa = { hh: 123 }
    expect(handler).toBeCalledTimes(3)
    expect(handler).nthCalledWith(1, undefined)
    expect(handler).nthCalledWith(2, { dd: { ee: 123 } })
    expect(handler).nthCalledWith(3, undefined)
    expect(handler1).toBeCalledTimes(2)
    expect(handler2).toBeCalledTimes(2)
  })
  test('shallow annotation', () => {
    const target: any = {
      aa: {},
    }
    define(target, {
      aa: observable.shallow,
    })
    const handler = jest.fn()
    const handler1 = jest.fn()
    const handler2 = jest.fn()
    autorun(() => {
      handler(FormPath.getIn(target, 'aa.bb.cc'))
    })
    observe(target, handler1)
    observe(target.aa, handler2)
    target.aa.bb = { cc: { dd: { ee: 123 } } }
    target.aa.bb.cc.kk = 333
    target.aa = { hh: 123 }
    expect(handler).toBeCalledTimes(3)
    expect(handler).nthCalledWith(1, undefined)
    expect(handler).nthCalledWith(2, { dd: { ee: 123 }, kk: 333 })
    expect(handler).nthCalledWith(3, undefined)
    expect(handler1).toBeCalledTimes(2)
    expect(handler2).toBeCalledTimes(2)
  })
  test('box annotation', () => {
    const target: any = {}
    define(target, {
      aa: observable.box,
    })
    const handler = jest.fn()
    const handler1 = jest.fn()
    const handler2 = jest.fn()
    autorun(() => {
      handler(target.aa.get())
    })
    observe(target, handler1)
    observe(target.aa, handler2)

    expect(handler).lastCalledWith(undefined)
    target.aa.set(123)
    expect(handler).toBeCalledTimes(2)
    expect(handler).lastCalledWith(123)
    expect(handler1).toBeCalledTimes(1)
    expect(handler2).toBeCalledTimes(1)
  })
  test('ref annotation', () => {
    const target: any = {}
    define(target, {
      aa: observable.ref,
    })
    const handler = jest.fn()
    const handler1 = jest.fn()
    autorun(() => {
      handler(target.aa)
    })
    observe(target, handler1)
    expect(handler).lastCalledWith(undefined)
    target.aa = 123
    expect(handler).toBeCalledTimes(2)
    expect(handler).lastCalledWith(123)
    expect(handler1).toBeCalledTimes(1)
  })
  test('action annotation', () => {
    const target = {
      aa: {
        bb: null,
        cc: null,
      },
      setData() {
        target.aa.bb = 123
        target.aa.cc = 312
      },
    }
    define(target, {
      aa: observable,
      setData: batch,
    })
    const handler = jest.fn()
    autorun(() => {
      handler([target.aa.bb, target.aa.cc])
    })
    expect(handler).toBeCalledTimes(1)
    target.setData()
    expect(handler).toBeCalledTimes(2)
  })
  test('computed annotation', () => {
    const handler = jest.fn()
    const target = {
      aa: 11,
      bb: 22,
      get cc() {
        handler()
        return this.aa + this.bb
      },
    }
    define(target, {
      aa: observable,
      bb: observable,
      cc: observable.computed,
    })
    autorun(() => {
      target.cc
    })
    expect(handler).toBeCalledTimes(1)
    expect(target.cc).toEqual(33)
    target.aa = 22
    expect(handler).toBeCalledTimes(2)
    expect(target.cc).toEqual(44)
  })
})

test('define model', () => {
  const obs = model({
    aa: 1,
    action() {
      this.aa++
    },
  })
  const { action } = obs
  action()
  expect(obs.aa).toEqual(2)
})
