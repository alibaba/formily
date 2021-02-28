import { define, annotations, autorun } from '..'
import { observe } from '../observe'

describe('define', () => {
  test('observable annotation', () => {
    const target: any = {
      aa: {},
    }
    define(target, {
      aa: annotations.observable,
    })
    const handler = jest.fn()
    const handler1 = jest.fn()
    const handler2 = jest.fn()
    autorun(() => {
      handler(target.aa?.bb?.cc)
    })
    observe(target, handler1)
    observe(target.aa, handler2)
    target.aa.bb = { cc: { dd: { ee: 123 } } }
    target.aa = { hh: 123 }
    expect(handler).toBeCalledWith({ dd: { ee: 123 } })
    expect(handler1).toBeCalledTimes(2)
    expect(handler2).toBeCalledTimes(2)
  })
  test('shallow annotation', () => {
    const target: any = {
      aa: {},
    }
    define(target, {
      aa: annotations.shallow,
    })
    const handler = jest.fn()
    const handler1 = jest.fn()
    const handler2 = jest.fn()
    autorun(() => {
      handler(target.aa?.bb?.cc)
    })
    observe(target, handler1)
    observe(target.aa, handler2)
    target.aa.bb = { cc: { dd: { ee: 123 } } }
    target.aa.bb.cc.kk = 333
    target.aa = { hh: 123 }
    expect(handler).toBeCalledWith({ dd: { ee: 123 }, kk: 333 })
    expect(handler).toBeCalledTimes(3)
    expect(handler1).toBeCalledTimes(2)
    expect(handler2).toBeCalledTimes(2)
  })
  test('box annotation', () => {
    const target: any = {}
    define(target, {
      aa: annotations.box,
    })
    const handler = jest.fn()
    const handler1 = jest.fn()
    const handler2 = jest.fn()
    autorun(() => {
      handler(target.aa.get())
    })
    observe(target, handler1)
    observe(target.aa, handler2)
    target.aa.set(123)
    expect(handler).toBeCalledWith(123)
    expect(handler1).toBeCalledTimes(1)
    expect(handler2).toBeCalledTimes(1)
  })
  test('ref annotation', () => {
    const target: any = {}
    define(target, {
      aa: annotations.ref,
    })
    const handler = jest.fn()
    const handler1 = jest.fn()
    autorun(() => {
      handler(target.aa)
    })
    observe(target, handler1)
    target.aa = 123
    expect(handler).toBeCalledWith(123)
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
      aa: annotations.observable,
      setData: annotations.action,
    })
    const handler = jest.fn()
    autorun(() => {
      handler([target.aa.bb, target.aa.cc])
    })
   target.setData()
    expect(handler).toBeCalledTimes(2)
  })
})
