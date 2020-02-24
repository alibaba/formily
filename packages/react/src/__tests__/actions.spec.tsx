import React from 'react'
import { render, fireEvent, RenderResult } from '@testing-library/react'
import {
  Form,
  Field,
  createFormActions,
  createAsyncFormActions,
  IFieldStateUIProps
} from '../index'
import { IFormActions, IFormAsyncActions } from '../types'

const Input: React.FC<IFieldStateUIProps> = props => (
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

  const renderForm = (isAsync = false): RenderResult =>
    render(
      <Form
        onSubmit={onSubmitHandler}
        onReset={onResetHandler}
        onChange={onChangeHandler}
        onValidateFailed={onValidateFailedHandler}
        actions={isAsync ? asyncActions : actions}
        effects={($, { setFieldState }) => {
          $('onChangeFieldValue').subscribe(({ name, value }) => {
            setFieldState(name, state => {
              state.value = value
            })
          })
        }}
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
      expect(e).toEqual([{ path: 'aaa', name: 'aaa', messages: ['This field is required'] }])
      expect(errorsEle).toBeTruthy()
    }
    fireEvent.change(inputEle, { target: { value: '123' } })
    await actions.submit()
    expect(onSubmitHandler).toBeCalledWith({ aaa: '123' })
  })

  test('async submit', async () => {
    const { queryByTestId } = renderForm(true)
    const inputEle = queryByTestId('input')
    const errorsEle = queryByTestId('field-errors')
    try {
      await asyncActions.submit()
    } catch (e) {
      expect(e).toEqual([{ path: 'aaa', name: 'aaa', messages: ['This field is required'] }])
      expect(errorsEle).toBeTruthy()
    }
    fireEvent.change(inputEle, { target: { value: '123' } })
    expect(onSubmitHandler).toBeCalledWith({ aaa: '123' })
  })

  test('reset', () => {
    renderForm()
    actions.reset()
    expect(onResetHandler).toBeCalled()
  })

  test('async reset', async () => {
    renderForm(true)
    await asyncActions.reset()
    expect(onResetHandler).toBeCalled()
  })

  test('validate', async () => {
    const { queryByTestId } = renderForm()
    const errorsEle = queryByTestId('field-errors')
    try {
      await actions.validate()
    } catch (e) {
      // do nothing...
    }
    
    expect(onValidateFailedHandler).toBeCalledWith({
      errors: [{ path: 'aaa', name: 'aaa', messages: ['This field is required'] }],
      warnings: []
    })
    expect(errorsEle).toBeTruthy()
  })

  test('async valid', async () => {
    const { queryByTestId } = renderForm(true)
    const errorsEle = queryByTestId('field-errors')
    try {
      await asyncActions.validate()
    } catch (e) {
      // do nothing...
    }
    
    expect(onValidateFailedHandler).toBeCalledWith({
      errors: [{ path: 'aaa', name: 'aaa', messages: ['This field is required'] }],
      warnings: []
    })
    expect(errorsEle).toBeTruthy()
  })

  test('setFormState', () => {
    renderForm()
    const fn = jest.fn().mockImplementation(formState => {
      formState.values.aaa = '123'
    })
    actions.setFormState(fn)
    expect(fn).toBeCalled()
  })

  test('async setFormState', async () => {
    renderForm(true)
    const fn = jest.fn().mockImplementation(formState => {
      formState.values.aaa = '123'
    })
    asyncActions.setFormState(fn)
    expect(fn).toBeCalled()
  })

  test('getFormState', () => {
    const { queryByTestId } = renderForm()
    const inputEle = queryByTestId('input')
    fireEvent.change(inputEle, { target: { value: '123' } })
    const formState = actions.getFormState()
    expect(formState.values.aaa).toEqual('123')
  })

  test('async getFormState', async () => {
    const { queryByTestId } = renderForm(true)
    const inputEle = queryByTestId('input')
    fireEvent.change(inputEle, { target: { value: '123' } })
    const formState = await asyncActions.getFormState()
    expect(formState.values.aaa).toEqual('123')
  })

  test('setFieldState', () => {
    renderForm()
    const fn = jest.fn().mockImplementation(fieldState => {
      fieldState.value = '123'
    })
    actions.setFieldState('aaa', fn)
    expect(fn).toBeCalled()
    const formState = actions.getFormState()
    expect(formState.values.aaa).toEqual('123')
  })

  test('async setFieldState', async () => {
    renderForm(true)
    const fn = jest.fn().mockImplementation(fieldState => {
      fieldState.value = '123'
    })
    await asyncActions.setFieldState('aaa', fn)
    expect(fn).toBeCalled()
    const formState = await asyncActions.getFormState()
    expect(formState.values.aaa).toEqual('123')
  })

  test('getFieldState', async () => {
    const { queryByTestId } = renderForm()
    const inputEle = queryByTestId('input')
    fireEvent.change(inputEle, { target: { value: '123' } })
    const fieldState = actions.getFieldState('aaa')
    expect(fieldState.value).toEqual('123')
  })

  test('async getFieldState', async () => {
    const { queryByTestId } = renderForm(true)
    const inputEle = queryByTestId('input')
    fireEvent.change(inputEle, { target: { value: '123' } })
    const fieldState = await asyncActions.getFieldState('aaa')
    expect(fieldState.value).toEqual('123')
  })

  test('subscribe', () => {
    renderForm()
    const callAction = () =>
      new Promise(resolve => {
        const fn = jest.fn().mockImplementation(params => resolve(params))
        actions.subscribe(fn)
      })
    expect(callAction()).resolves.toEqual(
      expect.objectContaining({
        type: expect.any(String),
        payload: expect.any(Object)
      })
    )
  })

  test('async subscribe', () => {
    renderForm(true)
    const callAsyncAction = () =>
      new Promise(async resolve => {
        const fn = jest.fn().mockImplementation(params => resolve(params))
        await asyncActions.subscribe(fn)
      })
    expect(callAsyncAction()).resolves.toEqual(
      expect.objectContaining({
        type: expect.any(String),
        payload: expect.any(Object)
      })
    )
  })

  test('unsubscribe', () => {
    renderForm()
    expect.assertions(0)
    const fn = jest.fn().mockImplementation(params => {
      expect(params).toEqual(
        expect.objectContaining({
          type: expect.any(String),
          payload: expect.any(Object)
        })
      )
    })
    const subscribeId = actions.subscribe(fn)
    actions.unsubscribe(subscribeId)
  })

  test('async unsubscribe', async () => {
    renderForm(true)
    expect.assertions(0)
    const fn = jest.fn().mockImplementation(params => {
      expect(params).toEqual(
        expect.objectContaining({
          type: expect.any(String),
          payload: expect.any(Object)
        })
      )
    })
    const subscribeId = await asyncActions.subscribe(fn)
    await asyncActions.unsubscribe(subscribeId)
  })

  test('notify', () => {
    renderForm()
    expect.assertions(1)
    const fn = jest.fn().mockImplementation(params => {
      const { type, payload } = params
      if (type === 'onTest') {
        expect(payload).toEqual({ aaa: '123' })
      }
    })
    actions.subscribe(fn)
    actions.notify('onTest', { aaa: '123' })
  })

  test('async notify', async () => {
    renderForm(true)
    expect.assertions(1)
    const fn = jest.fn().mockImplementation(params => {
      const { type, payload } = params
      if (type === 'onTest') {
        expect(payload).toEqual({ aaa: '123' })
      }
    })
    await asyncActions.subscribe(fn)
    await asyncActions.notify('onTest', { aaa: '123' })
  })

  test('dispatch', () => {
    renderForm()
    actions.dispatch('onChangeFieldValue', { name: 'aaa', value: '123' })
    const fieldState = actions.getFieldState('aaa')
    expect(fieldState.value).toEqual('123')
  })

  test('async dispatch', async () => {
    renderForm(true)
    asyncActions.dispatch('onChangeFieldValue', {
      name: 'aaa',
      value: '123'
    })
    const fieldState = await asyncActions.getFieldState('aaa')
    expect(fieldState.value).toEqual('123')
  })

  test('setFieldValue', () => {
    renderForm()
    actions.setFieldValue('aaa', '123')
    const fieldState = actions.getFieldState('aaa')
    expect(fieldState.value).toEqual('123')
  })

  test('async setFieldValue', async () => {
    renderForm(true)
    await asyncActions.setFieldValue('aaa', '123')
    const fieldState = await asyncActions.getFieldState('aaa')
    expect(fieldState.value).toEqual('123')
  })

  test('getFieldValue', () => {
    renderForm()
    actions.setFieldValue('aaa', '123')
    const fieldValue = actions.getFieldValue('aaa')
    expect(fieldValue).toEqual('123')
  })

  test('async getFieldValue', async () => {
    renderForm(true)
    await asyncActions.setFieldValue('aaa', '123')
    const fieldValue = await asyncActions.getFieldValue('aaa')
    expect(fieldValue).toEqual('123')
  })

  test('setFieldInitialValue', () => {
    renderForm()
    actions.setFieldInitialValue('aaa', '456')
    const fieldInitialValue = actions.getFieldState('aaa')
    expect(fieldInitialValue.initialValue).toEqual('456')
  })

  test('async setFieldInitialValue', async () => {
    renderForm(true)
    await asyncActions.setFieldInitialValue('aaa', '456')
    const fieldInitialValue = await asyncActions.getFieldState('aaa')
    expect(fieldInitialValue.initialValue).toEqual('456')
  })

  test('getFieldInitialValue', () => {
    renderForm()
    actions.setFieldInitialValue('aaa', '456')
    const fieldInitialValue = actions.getFieldInitialValue('aaa')
    expect(fieldInitialValue).toEqual('456')
  })

  test('async getFieldInitialValue', async () => {
    renderForm(true)
    await asyncActions.setFieldInitialValue('aaa', '456')
    const fieldInitialValue = await asyncActions.getFieldInitialValue('aaa')
    expect(fieldInitialValue).toEqual('456')
  })
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