import React from 'react'
import {
  Form,
  Field,
  createFormActions,
  FormEffectHooks,
  IFieldStateProps
} from '../index'
import { render } from '@testing-library/react'

const Input: React.FC<IFieldStateProps> = props => (
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

const { onFieldValueChange$ } = FormEffectHooks

describe('test all apis', () => {
  test('Form', async () => {
    const actions = createFormActions()
    const onSubmitHandler = jest.fn()
    const onValidateFailedHandler = jest.fn()
    render(
      <Form
        onSubmit={onSubmitHandler}
        onValidateFailed={onValidateFailedHandler}
        actions={actions}
        effects={$ => {
          onFieldValueChange$('aaa').subscribe(fieldState => {
            $.setFieldState('aaa', state => {
              state.value = 'hello world'
            })
          })
        }}
      >
        <Input name="aaa" required />
      </Form>
    )
    try {
      await actions.submit()
    } catch (e) {
      expect(e).toEqual([{ path: 'aaa', messages: ['This field is required'] }])
    }
    actions.setFieldState('aaa', state => {
      state.value = '123'
    })
    await actions.submit()
    expect(onSubmitHandler).toBeCalledWith({ aaa: 'hello world' })
  })
})

describe('major scenes', () => {
  //todo
  test('basic',()=>{
    //todo
  })
})

describe('bugfix', () => {
  //todo
  test('basic',()=>{
    //todo
  })
})
