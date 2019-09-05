import { createForm } from '../index'
import { FormLifeCycle, LifeCycleTypes } from '../shared/lifecycle'

describe('createForm', () => {
  test('values', () => {
    const form = createForm({
      values: {
        aa: 111,
        bb: 222
      }
    })
    expect(form.getState(state => state.values)).toEqual({
      aa: 111,
      bb: 222
    })
    expect(form.getState(state => state.pristine)).toEqual(true)
    expect(form.getState(state => state.initialized)).toEqual(true)
  })

  test('initialValues', () => {
    const form = createForm({
      initialValues: {
        aa: 111,
        bb: 222
      }
    })
    expect(form.getState(state => state.values)).toEqual({
      aa: 111,
      bb: 222
    })
    expect(form.getState(state => state.initialValues)).toEqual({
      aa: 111,
      bb: 222
    })
    expect(form.getState(state => state.pristine)).toEqual(true)
    expect(form.getState(state => state.initialized)).toEqual(true)
  })

  test('lifecycles', () => {
    const onFormInit = jest.fn()
    const onFieldInit = jest.fn()
    const onFieldChange = jest.fn()
    const form = createForm({
      initialValues: {
        aa: 111,
        bb: 222
      },
      lifecycles: [
        new FormLifeCycle(LifeCycleTypes.ON_FORM_INIT, onFormInit),
        new FormLifeCycle(LifeCycleTypes.ON_FIELD_INIT, onFieldInit),
        new FormLifeCycle(LifeCycleTypes.ON_FIELD_CHANGE,onFieldChange)
      ]
    })

    const aa = form.registerField({
      path: 'aa',
      value: '123'
    })

    const bb = form.registerField({
      path: 'bb',
      value: '321'
    })

    expect(onFormInit).toBeCalledTimes(1)
    expect(onFieldInit).toBeCalledTimes(2)
    expect(onFieldChange).toBeCalledTimes(2)
    expect(form.getState(state => state.values)).toEqual({
      aa: '123',
      bb: '321'
    })
    aa.setState(state=>{
      state.value = 'change aa'
    })
    bb.setState(state=>{
      state.value = 'change bb'
    })
    expect(onFieldChange).toBeCalledTimes(4)
    expect(form.getState(state => state.values)).toEqual({
      aa: 'change aa',
      bb: 'change bb'
    })
    expect(aa.getState(state => state.value)).toEqual('change aa')
    expect(bb.getState(state => state.value)).toEqual('change bb')
  })

})

test('submit', () => {
  //todo
})

test('reset', () => {
  //todo
})

test('validate', () => {
  //todo
})

test('setState', () => {
  //todo
})

test('getState', () => {
  //todo
})

test('subscribe', () => {
  //todo
})

test('unsubscribe', () => {
  //todo
})

test('setFieldState', () => {
  //todo
})

test('getFieldState', () => {
  //todo
})

test('registerField', () => {
  //todo
})

test('registerVField', () => {
  //todo
})

test('createMutators', () => {
  //todo
})
