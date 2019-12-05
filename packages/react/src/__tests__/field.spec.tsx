import React from 'react'
import { render, fireEvent, RenderResult } from '@testing-library/react'
import {
  Form,
  Field,
  createFormActions,
  createAsyncFormActions,
  FormEffectHooks
} from '../index'
import { IFormActions, IFormAsyncActions } from '../types'

const { onFieldValueChange$ } = FormEffectHooks

const Radio = props => (
  <Field {...props}>
    {({ state, mutators }) => (
      <div>
        <div>show input</div>
        <input
          data-testid="radio1"
          type="radio"
          onChange={mutators.change}
          name={props.name}
          value="1"
          checked={state.value === '1'}
          disabled={!state.editable}
        />
        Yes
        <br />
        <input
          data-testid="radio2"
          type="radio"
          onChange={mutators.change}
          name={props.name}
          checked={state.value === '0'}
          value="0"
          disabled={!state.editable}
        />
        No
        <br />
        <div data-testid="field-errors">{state.errors}</div>
        <div data-testid="field-warnings">{state.warnings}</div>
      </div>
    )}
  </Field>
)

const Input = props => (
  <Field {...props}>
    {({ state, mutators }) => (
      <div>
        <input
          data-testid={`input-${props.name}`}
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
          // run effect after form mount
          onFieldValueChange$('a1').subscribe(x => {
            if (x.value === '0') {
              setFieldState('a2', state => (state.visible = false))
              setFieldState('a3', state => (state.display = false))
            } else if (x.value === '1') {
              setFieldState('a2', state => (state.visible = true))
              setFieldState('a3', state => (state.display = true))
            }
          })
        }}
      >
        <Radio name="a1" required />
        <Input name="a2" required />
        <Input name="a3" required />
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

  test('field visible and display', () => {
    const { queryByTestId } = renderForm()
    const radio1Ele = queryByTestId('radio1')
    fireEvent.click(radio1Ele)
    const inputA2 = queryByTestId('input-a2')
    fireEvent.change(inputA2, { target: { value: '123' } })
    const inputA3 = queryByTestId('input-a3')
    fireEvent.change(inputA3, { target: { value: '456' } })
    let formState = actions.getFormState()
    expect(formState.values.a2).toEqual('123')
    expect(formState.values.a3).toEqual('456')
    const radio2Ele = queryByTestId('radio2')
    fireEvent.click(radio2Ele)
    formState = actions.getFormState()
    expect(formState.values.a2).toBeUndefined()
    expect(formState.values.a3).toEqual('456')
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
