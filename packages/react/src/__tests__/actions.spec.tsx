import React from 'react'
import {
  Form,
  Field,
  createFormActions,
  // FormEffectHooks,
  IFieldProps
} from '../index'
import { render } from '@testing-library/react'

const Input: React.FC<IFieldProps> = props => (
  <Field {...props}>
    {({ state, mutators }) => (
      <div>
        <input
          disabled={!state.editable}
          value={state.value || ''}
          onChange={mutators.change}
          onBlur={mutators.blur}
          onFocus={mutators.focus}
        />
        {state.errors}
        {state.warnings}
      </div>
    )}
  </Field>
)
const CreatTestValue = function ():string {
  return Date.now().toString(32)
}
// const { onFieldValueChange$ } = FormEffectHooks

// 'submit',
// 'reset',
// 'validate',
// 'setFormState',
// 'getFormState',
// 'setFieldState',
// 'getFieldState',
// 'getFormGraph',
// 'setFormGraph',
// 'subscribe',
// 'unsubscribe',
// 'notify',
// 'dispatch',
// 'setFieldValue',
// 'getFieldValue',
// 'setFieldInitialValue',
// 'getFieldInitialValue'
const actions = createFormActions()
const ExpectKey   = "testKey"

describe('test all apis', () => {
  beforeAll(() => {
    // 预处理操作
    render(
      <Form
        actions={actions}
      >
        <Input name={ExpectKey} required />
      </Form>
    )
  })
  test('field state', async () => {
    
    const ExpectValue = CreatTestValue()
    // set state value
    actions.setFieldState(ExpectKey, state => {
      expect.assertions(1)
      state.value = ExpectValue
    })
    // get state value
    actions.getFieldState(ExpectKey, state => {
      expect.assertions(1)
      expect(state.value).toEqual(ExpectValue)
    })
  })
  test('form state', async () => {
    const ExpectValue = CreatTestValue()
    // set state value
    actions.setFormState(state => {
      expect.assertions(1)
      state.values[ExpectKey] = ExpectValue
    })
    // get state value
    actions.getFormState(state => {
      expect.assertions(1)
      expect(state.values[ExpectKey]).toEqual(ExpectValue)
    })
  })
  test('form graph', async () => {
    // set new graph
    const ExpectValue = CreatTestValue()
    actions.getFieldState(ExpectKey,state =>{
      expect.assertions(1)
      actions.setFormGraph({
        [ExpectValue]: state
      })
      expect(actions.getFormGraph()[ExpectValue]).toEqual(state)
    })
  })
  // test('subscribe', async () => {
  //   // set new graph
  //   const ExpectType = CreatTestValue()
  //   const ExpectPayload = CreatTestValue()
  //   const ExpectID = actions.subscribe(({
  //     type,
  //     payload
  //   })=>{
  //     expect.assertions(1)
  //     expect(type).toBe(ExpectType)
  //     expect(payload).toBe(ExpectPayload)
  //   })
  //   actions.notify(ExpectType,ExpectPayload)
  //   actions.unsubscribe(ExpectID)
  //   actions.notify(ExpectType,ExpectPayload)
  // })


  // test('submit', async () => {
  //   const actions = createFormActions()
  //   const onSubmitHandler = jest.fn()
  //   const onValidateFailedHandler = jest.fn()
  //   render(
  //     <Form
  //       onSubmit={onSubmitHandler}
  //       onValidateFailed={onValidateFailedHandler}
  //       actions={actions}
  //       effects={$ => {
  //         onFieldValueChange$('aaa').subscribe(fieldState => {
  //           $.setFieldState('aaa', state => {
  //             state.value = 'hello world'
  //           })
  //         })
  //       }}
  //     >
  //       <Input name="aaa" required />
  //     </Form>
  //   )
  //   try {
  //     await actions.submit()
  //   } catch (e) {
  //     expect(e).toEqual([{ path: 'aaa', messages: ['This field is required'] }])
  //   }
  //   actions.setFieldState('aaa', state => {
  //     state.value = '123'
  //   })
  //   await actions.submit()
  //   expect(onSubmitHandler).toBeCalledWith({ aaa: 'hello world' })

  // })
})

describe('major scenes',()=>{
  //todo
  test('basic',()=>{
    //todo
  })
})


describe('bugfix',()=>{
  //todo
  test('basic',()=>{
    //todo
  })
})
