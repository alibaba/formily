import React from 'react'
import { render, fireEvent, RenderResult } from '@testing-library/react'
import {
  Form,
  Field,
  VirtualField,
  createFormActions,
  createAsyncFormActions,
  FormEffectHooks
} from '../index'
import { IFormActions, IFormAsyncActions } from '../types'

const { onFieldValueChange$ } = FormEffectHooks

const FieldBlock = props => (
  <VirtualField {...props}>
    {({ state }) => (
      <fieldset>
        <legend>block-{props.name}</legend>
        {props.children}
      </fieldset>
    )}
  </VirtualField>
)

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
          onFieldValueChange$('a1').subscribe(x => {
            if (x.value === '0') {
              setFieldState('b', state => (state.visible = false))
              setFieldState('c', state => (state.display = false))
            } else if (x.value === '1') {
              setFieldState('b', state => (state.visible = true))
              setFieldState('c', state => (state.display = true))
            }
          })
        }}
      >
        <Radio name="a1" required />
        <FieldBlock name="b">
          <Input name="b.b1" required />
        </FieldBlock>
        <FieldBlock name="c">
          <Input name="c.c1" required />
        </FieldBlock>
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

  test('virtualField visible and display', () => {
    const { queryByTestId } = renderForm()
    const radio1Ele = queryByTestId('radio1')
    fireEvent.click(radio1Ele)
    const inputB1 = queryByTestId('input-b.b1')
    fireEvent.change(inputB1, { target: { value: '123' } })
    const inputC1 = queryByTestId('input-c.c1')
    fireEvent.change(inputC1, { target: { value: '456' } })

    let formState = actions.getFormState()
    expect(formState.values.b1).toEqual('123')
    expect(formState.values.c1).toEqual('456')
    expect(formState.values).toEqual({ a1: '1', b1: '123', c1: '456' })
    const radio2Ele = queryByTestId('radio2')
    fireEvent.click(radio2Ele)
    formState = actions.getFormState()
    expect(formState.values.b1).toBeUndefined()
    expect(formState.values).toEqual({ a1: '0', c1: '456', b1: undefined })
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
