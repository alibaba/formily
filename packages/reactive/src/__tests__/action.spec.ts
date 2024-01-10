import { observable, action, autorun } from '..'
import { reaction } from '../autorun'
import { batch } from '../batch'
import { define } from '../model'

describe('normal action', () => {
  test('no action', () => {
    const obs = observable({
      aa: {
        bb: 123,
      },
    })
    const handler = jest.fn()
    autorun(() => {
      handler(obs.aa.bb)
    })
    obs.aa.bb = 111
    obs.aa.bb = 222
    expect(handler).toBeCalledTimes(3)

    obs.aa.bb = 333
    obs.aa.bb = 444

    expect(handler).toBeCalledTimes(5)
  })

  test('action', () => {
    const obs = observable({
      aa: {
        bb: 123,
      },
    })
    const handler = jest.fn()
    autorun(() => {
      handler(obs.aa.bb)
    })
    obs.aa.bb = 111
    obs.aa.bb = 222
    expect(handler).toBeCalledTimes(3)
    action(() => {
      obs.aa.bb = 333
      obs.aa.bb = 444
    })
    action(() => {})
    action()
    expect(handler).toBeCalledTimes(4)
  })

  test('action track', () => {
    const obs = observable({
      aa: {
        bb: 123,
      },
      cc: 1,
    })
    const handler = jest.fn()
    autorun(() => {
      action(() => {
        if (obs.cc > 0) {
          handler(obs.aa.bb)
          obs.cc = obs.cc + 20
        }
      })
    })
    expect(handler).toBeCalledTimes(1)
    expect(obs.cc).toEqual(21)
    obs.aa.bb = 321
    expect(handler).toBeCalledTimes(1)
    expect(obs.cc).toEqual(21)
  })

  test('action.bound', () => {
    const obs = observable({
      aa: {
        bb: 123,
      },
    })
    const handler = jest.fn()
    const setData = action.bound(() => {
      obs.aa.bb = 333
      obs.aa.bb = 444
    })
    autorun(() => {
      handler(obs.aa.bb)
    })
    obs.aa.bb = 111
    obs.aa.bb = 222
    expect(handler).toBeCalledTimes(3)
    setData()
    action.bound(() => {})
    expect(handler).toBeCalledTimes(4)
  })

  test('action.bound track', () => {
    const obs = observable({
      aa: {
        bb: 123,
      },
      cc: 1,
    })
    const handler = jest.fn()
    autorun(() => {
      action.bound(() => {
        if (obs.cc > 0) {
          handler(obs.aa.bb)
          obs.cc = obs.cc + 20
        }
      })()
    })
    expect(handler).toBeCalledTimes(1)
    expect(obs.cc).toEqual(21)
    obs.aa.bb = 321
    expect(handler).toBeCalledTimes(1)
    expect(obs.cc).toEqual(21)
  })

  test('action.scope xxx', () => {
    const obs = observable<any>({})

    const handler = jest.fn()

    autorun(() => {
      handler(obs.aa, obs.bb, obs.cc, obs.dd)
    })

    action(() => {
      action.scope(() => {
        obs.aa = 123
      })
      action.scope(() => {
        obs.cc = 'ccccc'
      })
      obs.bb = 321
      obs.dd = 'ddddd'
    })

    expect(handler).toBeCalledTimes(4)
  })

  test('action.scope bound', () => {
    const obs = observable<any>({})

    const handler = jest.fn()

    autorun(() => {
      handler(obs.aa, obs.bb, obs.cc, obs.dd)
    })

    const scope1 = action.scope.bound(() => {
      obs.aa = 123
    })
    action(() => {
      scope1()
      action.scope.bound(() => {
        obs.cc = 'ccccc'
      })()
      obs.bb = 321
      obs.dd = 'ddddd'
    })

    expect(handler).toBeCalledTimes(4)
  })

  test('action.scope track', () => {
    const obs = observable({
      aa: {
        bb: 123,
      },
      cc: 1,
    })
    const handler = jest.fn()
    autorun(() => {
      action.scope(() => {
        if (obs.cc > 0) {
          handler(obs.aa.bb)
          obs.cc = obs.cc + 20
        }
      })
    })
    expect(handler).toBeCalledTimes(1)
    expect(obs.cc).toEqual(21)
    obs.aa.bb = 321
    expect(handler).toBeCalledTimes(1)
    expect(obs.cc).toEqual(21)
  })

  test('action.scope bound track', () => {
    const obs = observable({
      aa: {
        bb: 123,
      },
      cc: 1,
    })
    const handler = jest.fn()
    autorun(() => {
      action.scope.bound(() => {
        if (obs.cc > 0) {
          handler(obs.aa.bb)
          obs.cc = obs.cc + 20
        }
      })()
    })
    expect(handler).toBeCalledTimes(1)
    expect(obs.cc).toEqual(21)
    obs.aa.bb = 321
    expect(handler).toBeCalledTimes(1)
    expect(obs.cc).toEqual(21)
  })
})

describe('annotation action', () => {
  test('action', () => {
    const obs = define(
      {
        aa: {
          bb: 123,
        },
        setData() {
          this.aa.bb = 333
          this.aa.bb = 444
        },
      },
      {
        aa: observable,
        setData: action,
      }
    )
    const handler = jest.fn()
    autorun(() => {
      handler(obs.aa.bb)
    })
    obs.aa.bb = 111
    obs.aa.bb = 222
    expect(handler).toBeCalledTimes(3)
    obs.setData()
    expect(handler).toBeCalledTimes(4)
  })

  test('action track', () => {
    const obs = define(
      {
        aa: {
          bb: 123,
        },
        cc: 1,
        setData() {
          if (obs.cc > 0) {
            handler(obs.aa.bb)
            obs.cc = obs.cc + 20
          }
        },
      },
      {
        aa: observable,
        setData: action,
      }
    )
    const handler = jest.fn()
    autorun(() => {
      obs.setData()
    })
    expect(handler).toBeCalledTimes(1)
    expect(obs.cc).toEqual(21)
    obs.aa.bb = 321
    expect(handler).toBeCalledTimes(1)
    expect(obs.cc).toEqual(21)
  })

  test('action.bound', () => {
    const obs = define(
      {
        aa: {
          bb: 123,
        },
        setData() {
          this.aa.bb = 333
          this.aa.bb = 444
        },
      },
      {
        aa: observable,
        setData: action.bound,
      }
    )
    const handler = jest.fn()
    autorun(() => {
      handler(obs.aa.bb)
    })
    obs.aa.bb = 111
    obs.aa.bb = 222
    expect(handler).toBeCalledTimes(3)
    obs.setData()
    expect(handler).toBeCalledTimes(4)
  })

  test('action.bound track', () => {
    const obs = define(
      {
        aa: {
          bb: 123,
        },
        cc: 1,
        setData() {
          if (obs.cc > 0) {
            handler(obs.aa.bb)
            obs.cc = obs.cc + 20
          }
        },
      },
      {
        aa: observable,
        setData: action.bound,
      }
    )
    const handler = jest.fn()
    autorun(() => {
      obs.setData()
    })
    expect(handler).toBeCalledTimes(1)
    expect(obs.cc).toEqual(21)
    obs.aa.bb = 321
    expect(handler).toBeCalledTimes(1)
    expect(obs.cc).toEqual(21)
  })

  test('action.scope', () => {
    const obs = define(
      {
        aa: null,
        bb: null,
        cc: null,
        dd: null,
        scope1() {
          this.aa = 123
        },
        scope2() {
          this.cc = 'ccccc'
        },
      },
      {
        aa: observable,
        bb: observable,
        cc: observable,
        dd: observable,
        scope1: action.scope,
        scope2: action.scope,
      }
    )

    const handler = jest.fn()

    autorun(() => {
      handler(obs.aa, obs.bb, obs.cc, obs.dd)
    })

    action(() => {
      obs.scope1()
      obs.scope2()
      obs.bb = 321
      obs.dd = 'ddddd'
    })

    expect(handler).toBeCalledTimes(4)
  })

  test('action.scope bound', () => {
    const obs = define(
      {
        aa: null,
        bb: null,
        cc: null,
        dd: null,
        scope1() {
          this.aa = 123
        },
        scope2() {
          this.cc = 'ccccc'
        },
      },
      {
        aa: observable,
        bb: observable,
        cc: observable,
        dd: observable,
        scope1: action.scope.bound,
        scope2: action.scope.bound,
      }
    )

    const handler = jest.fn()

    autorun(() => {
      handler(obs.aa, obs.bb, obs.cc, obs.dd)
    })

    action(() => {
      obs.scope1()
      obs.scope2()
      obs.bb = 321
      obs.dd = 'ddddd'
    })

    expect(handler).toBeCalledTimes(4)
  })

  test('action.scope track', () => {
    const obs = define(
      {
        aa: {
          bb: 123,
        },
        cc: 1,
        scope() {
          if (this.cc > 0) {
            handler(this.aa.bb)
            this.cc = this.cc + 20
          }
        },
      },
      {
        aa: observable,
        cc: observable,
        scope: action.scope,
      }
    )
    const handler = jest.fn()
    autorun(() => {
      obs.scope()
    })
    expect(handler).toBeCalledTimes(1)
    expect(obs.cc).toEqual(21)
    obs.aa.bb = 321
    expect(handler).toBeCalledTimes(1)
    expect(obs.cc).toEqual(21)
  })

  test('action.scope bound track', () => {
    const obs = define(
      {
        aa: {
          bb: 123,
        },
        cc: 1,
        scope() {
          if (this.cc > 0) {
            handler(this.aa.bb)
            this.cc = this.cc + 20
          }
        },
      },
      {
        aa: observable,
        cc: observable,
        scope: action.scope.bound,
      }
    )
    const handler = jest.fn()
    autorun(() => {
      obs.scope()
    })
    expect(handler).toBeCalledTimes(1)
    expect(obs.cc).toEqual(21)
    obs.aa.bb = 321
    expect(handler).toBeCalledTimes(1)
    expect(obs.cc).toEqual(21)
  })
})

test('nested action to reaction', () => {
  const obs = observable({
    aa: 0,
  })
  const handler = jest.fn()
  reaction(
    () => obs.aa,
    (v) => handler(v)
  )
  action(() => {
    obs.aa = 1
    action(() => {
      obs.aa = 2
    })
  })
  action(() => {
    obs.aa = 3
    action(() => {
      obs.aa = 4
    })
  })
  expect(handler).nthCalledWith(1, 2)
  expect(handler).nthCalledWith(2, 4)
  expect(handler).toBeCalledTimes(2)
})

test('nested action/batch to reaction', () => {
  const obs = define(
    {
      bb: 0,
      get aa() {
        return this.bb
      },
      set aa(v) {
        this.bb = v
      },
    },
    {
      aa: observable.computed,
      bb: observable,
    }
  )
  const handler = jest.fn()
  reaction(
    () => obs.aa,
    (v) => handler(v)
  )
  action(() => {
    obs.aa = 1
    batch(() => {
      obs.aa = 2
    })
  })
  action(() => {
    obs.aa = 3
    batch(() => {
      obs.aa = 4
    })
  })
  expect(handler).nthCalledWith(1, 2)
  expect(handler).nthCalledWith(2, 4)
  expect(handler).toBeCalledTimes(2)
})
