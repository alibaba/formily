import { observable, reaction, autorun } from '../'
import { batch } from '../batch'
import { define } from '../model'

const sleep = (duration = 100) =>
  new Promise((resolve) => setTimeout(resolve, duration))

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

test('autorun.memo', () => {
  const obs = observable<any>({
    bb: 0,
  })
  const fn = jest.fn()
  autorun(() => {
    const value = autorun.memo(() => ({
      aa: 0,
    }))
    fn(obs.bb, value.aa++)
  })
  obs.bb++
  obs.bb++
  obs.bb++
  obs.bb++
  expect(fn).toBeCalledTimes(5)
  expect(fn).toBeCalledWith(3, 3)
  expect(fn).toBeCalledWith(4, 4)
})

test('autorun.memo with observable', () => {
  const obs1 = observable({
    aa: 0,
  })
  const fn = jest.fn()
  const dispose = autorun(() => {
    const obs2 = autorun.memo(() =>
      observable({
        bb: 0,
      })
    )
    fn(obs1.aa, obs2.bb++)
  })
  obs1.aa++
  obs1.aa++
  obs1.aa++
  expect(fn).toBeCalledTimes(4)
  expect(fn).toBeCalledWith(0, 0)
  expect(fn).toBeCalledWith(1, 1)
  expect(fn).toBeCalledWith(2, 2)
  expect(fn).toBeCalledWith(3, 3)
  dispose()
  obs1.aa++
  expect(fn).toBeCalledTimes(4)
})

test('autorun.memo with observable and effect', async () => {
  const obs1 = observable({
    aa: 0,
  })
  const fn = jest.fn()
  const dispose = autorun(() => {
    const obs2 = autorun.memo(() =>
      observable({
        bb: 0,
      })
    )
    fn(obs1.aa, obs2.bb++)
    autorun.effect(() => {
      obs2.bb++
    }, [])
  })
  obs1.aa++
  obs1.aa++
  obs1.aa++
  await sleep(100)
  expect(fn).toBeCalledTimes(5)
  expect(fn).toBeCalledWith(0, 0)
  expect(fn).toBeCalledWith(1, 1)
  expect(fn).toBeCalledWith(2, 2)
  expect(fn).toBeCalledWith(3, 3)
  expect(fn).toBeCalledWith(3, 5)
  dispose()
  obs1.aa++
  expect(fn).toBeCalledTimes(5)
})

test('autorun.memo with deps', () => {
  const obs = observable<any>({
    bb: 0,
    cc: 0,
  })
  const fn = jest.fn()
  autorun(() => {
    const value = autorun.memo(
      () => ({
        aa: 0,
      }),
      [obs.cc]
    )
    fn(obs.bb, value.aa++)
  })
  obs.bb++
  obs.bb++
  obs.bb++
  obs.bb++
  expect(fn).toBeCalledTimes(5)
  expect(fn).toBeCalledWith(3, 3)
  expect(fn).toBeCalledWith(4, 4)
  obs.cc++
  expect(fn).toBeCalledTimes(6)
  expect(fn).toBeCalledWith(4, 0)
})

test('autorun.memo with deps and dispose', () => {
  const obs = observable<any>({
    bb: 0,
    cc: 0,
  })
  const fn = jest.fn()
  const dispose = autorun(() => {
    const value = autorun.memo(
      () => ({
        aa: 0,
      }),
      [obs.cc]
    )
    fn(obs.bb, value.aa++)
  })
  obs.bb++
  obs.bb++
  obs.bb++
  obs.bb++
  expect(fn).toBeCalledTimes(5)
  expect(fn).toBeCalledWith(3, 3)
  expect(fn).toBeCalledWith(4, 4)
  obs.cc++
  expect(fn).toBeCalledTimes(6)
  expect(fn).toBeCalledWith(4, 0)
  dispose()
  obs.bb++
  obs.cc++
  expect(fn).toBeCalledTimes(6)
})

test('autorun.memo with invalid params', () => {
  const obs = observable<any>({
    bb: 0,
  })
  const fn = jest.fn()
  autorun(() => {
    const value = autorun.memo({ aa: 0 } as any)
    fn(obs.bb, value)
  })
  obs.bb++
  obs.bb++
  obs.bb++
  obs.bb++
  expect(fn).toBeCalledTimes(5)
  expect(fn).toBeCalledWith(4, undefined)
})

test('autorun.memo not in autorun', () => {
  expect(() => autorun.memo(() => ({ aa: 0 }))).toThrow()
})

test('autorun no memo', () => {
  const obs = observable<any>({
    bb: 0,
  })
  const fn = jest.fn()
  autorun(() => {
    const value = {
      aa: 0,
    }
    fn(obs.bb, value.aa++)
  })
  obs.bb++
  obs.bb++
  obs.bb++
  obs.bb++
  expect(fn).toBeCalledTimes(5)
  expect(fn).toBeCalledWith(3, 0)
  expect(fn).toBeCalledWith(4, 0)
})

test('autorun.effect', async () => {
  const obs = observable<any>({
    bb: 0,
  })
  const fn = jest.fn()
  const effect = jest.fn()
  const disposer = jest.fn()
  const dispose = autorun(() => {
    autorun.effect(() => {
      effect()
      return disposer
    }, [])
    fn(obs.bb)
  })
  obs.bb++
  obs.bb++
  obs.bb++
  obs.bb++
  await sleep(16)
  expect(fn).toBeCalledTimes(5)
  expect(fn).toBeCalledWith(4)
  expect(effect).toBeCalledTimes(1)
  expect(disposer).toBeCalledTimes(0)
  dispose()
  expect(effect).toBeCalledTimes(1)
  expect(disposer).toBeCalledTimes(1)
})

test('autorun.effect dispose when autorun dispose', async () => {
  const obs = observable<any>({
    bb: 0,
  })
  const fn = jest.fn()
  const effect = jest.fn()
  const disposer = jest.fn()
  const dispose = autorun(() => {
    autorun.effect(() => {
      effect()
      return disposer
    }, [])
    fn(obs.bb)
  })
  obs.bb++
  obs.bb++
  obs.bb++
  obs.bb++
  dispose()
  await sleep(16)
  expect(fn).toBeCalledTimes(5)
  expect(fn).toBeCalledWith(4)
  expect(effect).toBeCalledTimes(0)
  expect(disposer).toBeCalledTimes(0)
})

test('autorun.effect with deps', async () => {
  const obs = observable<any>({
    bb: 0,
    cc: 0,
  })
  const fn = jest.fn()
  const effect = jest.fn()
  const dispose = autorun(() => {
    autorun.effect(() => {
      effect()
    }, [obs.cc])
    fn(obs.bb)
  })
  obs.bb++
  obs.bb++
  obs.bb++
  obs.bb++
  expect(effect).toBeCalledTimes(0)
  await sleep(16)
  expect(fn).toBeCalledTimes(5)
  expect(fn).toBeCalledWith(4)
  expect(effect).toBeCalledTimes(1)
  obs.cc++
  expect(effect).toBeCalledTimes(1)
  await sleep(16)
  expect(fn).toBeCalledTimes(6)
  expect(fn).toBeCalledWith(4)
  expect(effect).toBeCalledTimes(2)
  dispose()
  expect(effect).toBeCalledTimes(2)
})

test('autorun.effect with default deps', async () => {
  const obs = observable<any>({
    bb: 0,
  })
  const fn = jest.fn()
  const effect = jest.fn()
  const dispose = autorun(() => {
    autorun.effect(() => {
      effect()
    })
    fn(obs.bb)
  })
  obs.bb++
  obs.bb++
  obs.bb++
  obs.bb++
  expect(effect).toBeCalledTimes(0)
  await sleep(100)
  expect(fn).toBeCalledTimes(5)
  expect(fn).toBeCalledWith(4)
  expect(effect).toBeCalledTimes(5)
  dispose()
  expect(effect).toBeCalledTimes(5)
})

test('autorun.effect not in autorun', () => {
  expect(() => autorun.effect(() => {})).toThrow()
})

test('autorun.effect with invalid params', () => {
  autorun.effect({} as any)
})

test('autorun dispose in batch', () => {
  const obs = observable({
    value: 123,
  })
  const handler = jest.fn()
  const dispose = autorun(() => {
    handler(obs.value)
  })

  batch(() => {
    obs.value = 321
    dispose()
  })
  expect(handler).toBeCalledTimes(1)
})
