import React from 'react'
import { render, fireEvent, RenderResult } from '@testing-library/react'
import {
  Form,
  Field,
  createFormActions,
  createAsyncFormActions,
  IFieldProps
} from '../index'
import { IFormActions, IFormAsyncActions } from '../types'

const Input: React.FC<IFieldProps> = props => (
  <Field {...props}>
    {({ state, mutators }) => (
      <div>
        <input
          data-testid="input"
          disabled={!state.editable}
          value={state.value || ''}
          onChange={mutators.change}
          onBlur={mutators.blur}
          onFocus={mutators.focus}
        />
        <div data-testid="field-errors">{state.errors}</div>
        <div data-testid="field-warnings">{state.warnings}</div>
      </div>
    )}
  </Field>
)

describe('test all apis', () => {
  const ACTIONS = [
    'submit',
    'reset',
    'validate',
    'setFormState',
    'getFormState',
    'setFieldState',
    'getFieldState',
    'getFormGraph',
    'setFormGraph',
    'subscribe',
    'unsubscribe',
    'notify',
    'dispatch',
    'setFieldValue',
    'getFieldValue',
    'setFieldInitialValue',
    'getFieldInitialValue'
  ]

  let actions: IFormActions
  let asyncActions: IFormAsyncActions
  let onSubmitHandler: any
  let onResetHandler: any
  let onValidateFailedHandler: any
  let onChangeHandler: any

  const renderForm = (): RenderResult =>
    render(
      <Form
        onSubmit={onSubmitHandler}
        onReset={onResetHandler}
        onChange={onChangeHandler}
        onValidateFailed={onValidateFailedHandler}
        actions={actions}
      >
        <Input name="aaa" required />
      </Form>
    )

  beforeAll(() => {
    actions = createFormActions()
    asyncActions = createAsyncFormActions()
    onSubmitHandler = jest.fn()
    onResetHandler = jest.fn()
    onValidateFailedHandler = jest.fn()
    onChangeHandler = jest.fn()
  })

  test('createFormActions', () => {
    expect(Object.keys(actions)).toEqual(expect.arrayContaining(ACTIONS))
  })

  test('createAsyncFormActions', () => {
    expect(Object.keys(asyncActions)).toEqual(expect.arrayContaining(ACTIONS))
  })

  test('submit', async () => {
    const { queryByTestId } = renderForm()
    const inputEle = queryByTestId('input')
    const errorsEle = queryByTestId('field-errors')
    try {
      await actions.submit()
    } catch (e) {
      expect(e).toEqual([{ path: 'aaa', messages: ['This field is required'] }])
      expect(errorsEle).toBeTruthy()
    }
    fireEvent.focus(inputEle)
    fireEvent.change(inputEle, { target: { value: '123' } })
    await actions.submit()
    expect(onSubmitHandler).toBeCalledWith({ aaa: '123' })
  })
  test('reset', () => {
    actions.reset()
    expect(onResetHandler).toBeCalled()
    asyncActions.reset()
    expect(onResetHandler).toBeCalled()
  })
  test('validate', async () => {
    try {
      actions.validate()
    } catch (e) {
      expect(onValidateFailedHandler).toBeCalled()
      expect(e).toEqual([{ path: 'aaa', messages: ['This field is required'] }])
    }
    try {
      asyncActions.validate()
    } catch (e) {
      expect(onValidateFailedHandler).toBeCalled()
      expect(e).toEqual([{ path: 'aaa', messages: ['This field is required'] }])
    }
  })
  test('setFormState', () => {
    renderForm()
    const fn = jest.fn().mockImplementation(formState => {
      formState.values.aaa = '123'
    })
    actions.setFormState(fn)
    expect(fn).toBeCalled()
  })
  test('getFormState', () => {})
  test('setFieldState', () => {})
  test('getFieldState', () => {})
  test('getFormGraph', () => {})
  test('setFormGraph', () => {})
  test('subscribe', () => {})
  test('unsubscribe', () => {})
  test('notify', () => {})
  test('dispatch', () => {})
  test('setFieldValue', () => {})
  test('getFieldValue', () => {})
  test('setFieldInitialValue', () => {})
  test('getFieldInitialValue', () => {})
  test('getSchema', () => {})
  test('getFormSchema', () => {})
})

describe('major scenes', () => {
  //todo
  test('basic', () => {
    //todo
  })
})

describe('bugfix', () => {
  //todo
  test('basic', () => {
    //todo
  })
})
