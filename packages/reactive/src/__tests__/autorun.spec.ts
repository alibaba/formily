import { observable, reaction, autorun } from '../'
import { batch } from '../batch'
import { define } from '../model'

test('autorun', () => {
  const obs = observable({
    aa: {
      bb: 123,
    },
  })
  const handler = jest.fn()
  const dispose = autorun(() => {
    handler(obs.aa.bb)
  })
  obs.aa.bb = 123
  expect(handler).toBeCalledTimes(1)
  obs.aa.bb = 111
  expect(handler).toBeCalledTimes(2)
  dispose()
  obs.aa.bb = 222
  expect(handler).toBeCalledTimes(2)
})

test('reaction', () => {
  const obs = observable({
    aa: {
      bb: 123,
    },
  })
  const handler = jest.fn()
  const dispose = reaction(() => {
    return obs.aa.bb
  }, handler)
  obs.aa.bb = 123
  expect(handler).toBeCalledTimes(0)
  obs.aa.bb = 111
  expect(handler).toBeCalledTimes(1)
  dispose()
  obs.aa.bb = 222
  expect(handler).toBeCalledTimes(1)
})

test('reaction fireImmediately', () => {
  const obs = observable({
    aa: {
      bb: 123,
    },
  })
  const handler = jest.fn()
  const dispose = reaction(
    () => {
      return obs.aa.bb
    },
    handler,
    {
      fireImmediately: true,
    }
  )
  obs.aa.bb = 123
  expect(handler).toBeCalledTimes(1)
  obs.aa.bb = 111
  expect(handler).toBeCalledTimes(2)
  dispose()
  obs.aa.bb = 222
  expect(handler).toBeCalledTimes(2)
})

test('reaction dirty check', () => {
  const obs: any = {
    aa: 123,
  }
  define(obs, {
    aa: observable.ref,
  })
  const handler = jest.fn()
  reaction(() => {
    return obs.aa
  }, handler)
  batch(() => {
    obs.aa = 123
    obs.aa = 123
  })

  expect(handler).toBeCalledTimes(0)
})

test('reaction with shallow equals', () => {
  const obs: any = {
    aa: { bb: 123 },
  }
  define(obs, {
    aa: observable.ref,
  })
  const handler = jest.fn()
  reaction(() => {
    return obs.aa
  }, handler)
  obs.aa = { bb: 123 }
  expect(handler).toBeCalledTimes(1)
})

test('reaction with deep equals', () => {
  const obs: any = {
    aa: { bb: 123 },
  }
  define(obs, {
    aa: observable.ref,
  })
  const handler = jest.fn()
  reaction(
    () => {
      return obs.aa
    },
    handler,
    {
      equals: (a, b) => JSON.stringify(a) === JSON.stringify(b),
    }
  )
  obs.aa = { bb: 123 }
  expect(handler).toBeCalledTimes(0)
})

test('autorun direct recursive react', () => {
  const obs = observable<any>({ value: 1 })
  autorun(() => {
    obs.value++
  })
  expect(obs.value).toEqual(2)
})

test('autorun direct recursive react with if', () => {
  const obs1 = observable<any>({})
  const obs2 = observable<any>({})
  const fn = jest.fn()
  autorun(() => {
    if (!obs1.value) {
      obs1.value = '111'
      return
    }
    fn(obs1.value, obs2.value)
  })
  obs2.value = '222'
  expect(fn).not.toHaveBeenCalledWith('111', undefined)
  expect(fn).not.toHaveBeenCalledWith('111', '222')
})

test('autorun indirect recursive react', () => {
  const obs1 = observable<any>({})
  const obs2 = observable<any>({})
  const obs3 = observable<any>({})
  autorun(() => {
    obs1.value = obs2.value + 1
  })
  autorun(() => {
    obs2.value = obs3.value + 1
  })
  autorun(() => {
    if (obs1.value) {
      obs3.value = obs1.value + 1
    } else {
      obs3.value = 0
    }
  })
  obs3.value = 1
  expect(obs1.value).toEqual(3)
})

test('autorun indirect alive recursive react', () => {
  const aa = observable<any>({})
  const bb = observable<any>({})
  const cc = observable<any>({})

  batch(() => {
    autorun(() => {
      if (aa.value) {
        bb.value = aa.value + 1
      }
    })
    autorun(() => {
      if (aa.value && bb.value) {
        cc.value = aa.value + bb.value
      }
    })
    batch(() => {
      aa.value = 1
    })
  })
  expect(aa.value).toEqual(1)
  expect(bb.value).toEqual(2)
  expect(cc.value).toEqual(3)
})

test('autorun direct recursive react with head track', () => {
  const obs1 = observable<any>({})
  const obs2 = observable<any>({})
  const fn = jest.fn()
  autorun(() => {
    const obs2Value = obs2.value
    if (!obs1.value) {
      obs1.value = '111'
      return
    }
    fn(obs1.value, obs2Value)
  })
  obs2.value = '222'
  expect(fn).not.toHaveBeenCalledWith('111', undefined)
  expect(fn).toHaveBeenCalledWith('111', '222')
})
