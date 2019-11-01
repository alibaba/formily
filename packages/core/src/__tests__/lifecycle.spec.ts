import { FormLifeCycle, FormHeart } from '../shared/lifecycle'
import { LifeCycleTypes } from '../types'

test('create lifecycle',()=>{
  const cb = payload => payload
  const onFormInit = jest.fn(cb)
  const onFormMount = jest.fn(cb)

  // arguments - handler
  const lifeCycle = new FormLifeCycle(onFormInit)
  lifeCycle.notify(LifeCycleTypes.ON_FORM_INIT, {
    k1: 'v1',
    k2: 'v2'
  })

  expect(onFormInit).toHaveBeenCalledTimes(1)
  expect(onFormInit.mock.calls[0][0]).toEqual({
    type: LifeCycleTypes.ON_FORM_INIT,
    payload: {
      k1: 'v1',
      k2: 'v2'
    }
  })

  // arguments - type, handler
  const lifeCycle2 = new FormLifeCycle(LifeCycleTypes.ON_FORM_MOUNT, onFormMount)
  lifeCycle2.notify(LifeCycleTypes.ON_FORM_MOUNT, {
    k3: 'v3'
  })

  expect(onFormMount).toHaveBeenCalledTimes(1)
  expect(onFormMount.mock.calls[0][0]).toEqual({
    k3: 'v3'
  })

  // arguments - handlerMap
  const lifeCycle3 = new FormLifeCycle({
    [LifeCycleTypes.ON_FORM_INIT]: onFormInit,
    [LifeCycleTypes.ON_FORM_MOUNT]: onFormMount
  })
  lifeCycle3.notify(LifeCycleTypes.ON_FORM_INIT, {
    k1: 'v1'
  })
  expect(onFormInit).toHaveBeenCalledTimes(2)
  expect(onFormInit.mock.calls[1][0]).toEqual({
    k1: 'v1'
  })

  lifeCycle3.notify(LifeCycleTypes.ON_FORM_MOUNT, {
    k3: 'v3'
  })
  expect(onFormMount).toHaveBeenCalledTimes(2)
  expect(onFormMount.mock.calls[1][0]).toEqual({
    k3: 'v3'
  })
})

test('create form heart',()=>{
  const formHeart = new FormHeart({
    context: null
  });

  const cb = jest.fn(payload => payload)
  // subscribe
  formHeart.subscribe(cb)
  formHeart.subscribe(cb)
  formHeart.notify(LifeCycleTypes.ON_FIELD_INIT, {
    k33: 'v33'
  })
  expect(cb).toHaveBeenCalledTimes(1)
  expect(cb.mock.calls[0][0]).toEqual({
    type: LifeCycleTypes.ON_FIELD_INIT,
    payload: {
      k33: 'v33'
    }
  })

  // unsubscribe
  formHeart.unsubscribe(cb)
  formHeart.notify(LifeCycleTypes.ON_FIELD_INIT, {
    k1: 'v1'
  })
  expect(cb).toHaveBeenCalledTimes(1)

  formHeart.unsubscribe()
  expect(cb).toHaveBeenCalledTimes(1)
})

test('heart with lifecycle',()=>{
  const cb = payload => payload
  const onFormInit = jest.fn(cb)
  const onFormMount = jest.fn(cb)
  const onFieldInit = jest.fn(cb)
  const onFieldChange = jest.fn(cb)
  const ctx: any = {}
  const lifeCycles: Array<any> = [
    new FormLifeCycle(onFieldInit),
    new FormLifeCycle(onFieldChange),
  ]

  // arguments - handler
  const formHeart = new FormHeart({
    lifecycles: [
      new FormLifeCycle(onFormInit),
      new FormLifeCycle(onFormMount),
      ctx,
      lifeCycles
    ],
    context: null
  })

  formHeart.notify(LifeCycleTypes.ON_FORM_INIT, {
    k222: 'v222'
  })
  
  expect(onFormInit).toHaveBeenCalledTimes(1)
  expect(onFormInit.mock.calls[0][0]).toEqual({
    type: LifeCycleTypes.ON_FORM_INIT,
    payload: {
      k222: 'v222'
    }
  })
  expect(onFormInit).toHaveBeenCalledTimes(1)
})