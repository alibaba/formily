import { FormHeart, FormLifeCycle } from '../shared/lifecycle'
import { LifeCycleTypes } from '../types'

describe('FormLifeCycle', () => {
  test('handler',()=>{
    const cb = jest.fn()
    const lifeCycle = new FormLifeCycle(cb)
    const data = { hello: 'world' }
    lifeCycle.notify(LifeCycleTypes.ON_FORM_INIT, data)
    expect(cb).toBeCalledTimes(1)
    expect(cb).toBeCalledWith({ payload: data, type: LifeCycleTypes.ON_FORM_INIT }, undefined)
    lifeCycle.notify(LifeCycleTypes.ON_FIELD_INITIAL_VALUE_CHANGE, data)
    expect(cb).toBeCalledTimes(2)
    expect(cb).toBeCalledWith({ payload: data, type: LifeCycleTypes.ON_FIELD_INITIAL_VALUE_CHANGE }, undefined)
  })

  test('handler with context',()=>{
    const cb = jest.fn()
    const lifeCycle = new FormLifeCycle(cb)
    const data = { hello: 'world' }
    const context = { temp: true }
    lifeCycle.notify(LifeCycleTypes.ON_FORM_INIT, data, context)
    expect(cb).toBeCalledTimes(1)
    expect(cb).toBeCalledWith({ payload: data, type: LifeCycleTypes.ON_FORM_INIT }, context)
    lifeCycle.notify(LifeCycleTypes.ON_FIELD_INITIAL_VALUE_CHANGE, data, context)
    expect(cb).toBeCalledTimes(2)
    expect(cb).toBeCalledWith({ payload: data, type: LifeCycleTypes.ON_FIELD_INITIAL_VALUE_CHANGE }, context)
  })

  test('type/handler',()=>{
    const cb1 = jest.fn()
    const cb2 = jest.fn()
    const lifeCycle1= new FormLifeCycle(LifeCycleTypes.ON_FORM_INIT, cb1);
    const lifeCycle2= new FormLifeCycle(LifeCycleTypes.ON_FIELD_INITIAL_VALUE_CHANGE, cb2);
    const data = { hello: 'world' }
    lifeCycle1.notify(LifeCycleTypes.ON_FORM_INIT, data)
    expect(cb1).toBeCalledTimes(1)
    expect(cb2).toBeCalledTimes(0)
    expect(cb1).toBeCalledWith(data, undefined)
    lifeCycle2.notify(LifeCycleTypes.ON_FIELD_INITIAL_VALUE_CHANGE, data)
    expect(cb1).toBeCalledTimes(1)
    expect(cb2).toBeCalledTimes(1)
    expect(cb2).toBeCalledWith(data, undefined)
  })

  test('map',()=>{
    const cb1 = jest.fn()
    const cb2 = jest.fn()
    const lifeCycle = new FormLifeCycle({
      [LifeCycleTypes.ON_FORM_INIT]: cb1,
      [LifeCycleTypes.ON_FIELD_INITIAL_VALUE_CHANGE]: cb2,
    })
    const data = { hello: 'world' }
    lifeCycle.notify(LifeCycleTypes.ON_FORM_INIT, data)
    expect(cb1).toBeCalledTimes(1)
    expect(cb2).toBeCalledTimes(0)
    expect(cb1).toBeCalledWith(data, undefined)
    lifeCycle.notify(LifeCycleTypes.ON_FIELD_INITIAL_VALUE_CHANGE, data)
    expect(cb1).toBeCalledTimes(1)
    expect(cb2).toBeCalledTimes(1)
    expect(cb2).toBeCalledWith(data, undefined)
  })
})

describe('FormHeart', () => {
  test('heart is instance of Subscribe',()=>{
    const heart = new FormHeart({})
    const cb = jest.fn()
    const idx = heart.subscribe(cb)
    const data = { hello: 'world' }
    heart.notify(data)
    expect(cb).toBeCalledTimes(1)
    expect(cb).toBeCalledWith(data)
    heart.unsubscribe(idx)
    heart.notify(data)
    expect(cb).toBeCalledTimes(1)
  })

  test('lifecycles constructor handler',()=>{
    const cb = jest.fn()
    const heart = new FormHeart({
      lifecycles: [
        new FormLifeCycle(cb),
      ]
    })
    const data = { hello: 'world' }
    heart.publish(LifeCycleTypes.ON_FORM_INIT, data)
    expect(cb).toBeCalledTimes(1)
    expect(cb).toBeCalledWith({ payload: data, type: LifeCycleTypes.ON_FORM_INIT }, undefined)
    heart.publish(LifeCycleTypes.ON_FIELD_INITIAL_VALUE_CHANGE, data)
    expect(cb).toBeCalledTimes(2)
    expect(cb).toBeCalledWith({ payload: data, type: LifeCycleTypes.ON_FIELD_INITIAL_VALUE_CHANGE }, undefined)
  })

  test('lifecycles constructor type/handler',()=>{
    const cb1 = jest.fn()
    const cb2 = jest.fn()
    const heart = new FormHeart({
      lifecycles: [
        new FormLifeCycle(LifeCycleTypes.ON_FORM_INIT, cb1),
        new FormLifeCycle(LifeCycleTypes.ON_FIELD_INITIAL_VALUE_CHANGE, cb2),
      ]
    })
    const data = { hello: 'world' }
    heart.publish(LifeCycleTypes.ON_FORM_INIT, data)
    expect(cb1).toBeCalledTimes(1)
    expect(cb2).toBeCalledTimes(0)
    expect(cb1).toBeCalledWith(data, undefined)
    heart.publish(LifeCycleTypes.ON_FIELD_INITIAL_VALUE_CHANGE, data)
    expect(cb1).toBeCalledTimes(1)
    expect(cb2).toBeCalledTimes(1)
    expect(cb2).toBeCalledWith(data, undefined)
  })

  test('lifecycles constructor map',()=>{
    const cb1 = jest.fn()
    const cb2 = jest.fn()
    const heart = new FormHeart({
      lifecycles: [
        new FormLifeCycle({
          [LifeCycleTypes.ON_FORM_INIT]: cb1,
          [LifeCycleTypes.ON_FIELD_INITIAL_VALUE_CHANGE]: cb2,
        }),
      ]
    })
    const data = { hello: 'world' }
    heart.publish(LifeCycleTypes.ON_FORM_INIT, data)
    expect(cb1).toBeCalledTimes(1)
    expect(cb2).toBeCalledTimes(0)
    expect(cb1).toBeCalledWith(data, undefined)
    heart.publish(LifeCycleTypes.ON_FIELD_INITIAL_VALUE_CHANGE, data)
    expect(cb1).toBeCalledTimes(1)
    expect(cb2).toBeCalledTimes(1)
    expect(cb2).toBeCalledWith(data, undefined)
  })

  test('lifecycles with constructor context',()=>{
    const cb = jest.fn()
    const context = { constructor: true }
    const heart = new FormHeart({
      lifecycles: [
        new FormLifeCycle(LifeCycleTypes.ON_FORM_INIT, cb),
      ],
      context,
    })
    const data = { hello: 'world' }
    heart.publish(LifeCycleTypes.ON_FORM_INIT, data)
    expect(cb).toBeCalledTimes(1)
    expect(cb).toBeCalledWith(data, context)
  })

  test('lifecycles with temp context',()=>{
    const cb = jest.fn()
    const context = { constructor: true }
    const heart = new FormHeart({
      lifecycles: [
        new FormLifeCycle(LifeCycleTypes.ON_FORM_INIT, cb),
      ],
    })
    const data = { hello: 'world' }
    heart.publish(LifeCycleTypes.ON_FORM_INIT, data)
    expect(cb).toBeCalledTimes(1)
    expect(cb).toBeCalledWith(data, undefined)

    heart.publish(LifeCycleTypes.ON_FORM_INIT, data, context)
    expect(cb).toBeCalledTimes(2)
    expect(cb).toBeCalledWith(data, context)
  })
})
