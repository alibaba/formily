import React, { useState } from 'react'
import { render, act } from '@testing-library/react'
import SchemaForm, {
  Field,
  registerFormField,
  connect,
  createFormActions
} from '../index'

registerFormField(
  'test-string',
  connect()(props => (
    <React.Fragment>
      <div data-testid="value">{props.value}</div>
      <div data-testid="type-value">{typeof props.value}</div>
    </React.Fragment>
  ))
)

test('default value', async () => {
  const Component = () => (
    <SchemaForm defaultValue={{ foo: '' }}>
      <Field name="foo" type="test-string" />
    </SchemaForm>
  )

  const { getByTestId } = render(<Component />)
  await sleep(33)
  expect(getByTestId('type-value').textContent).toEqual('string')
})

test('initialValues', async () => {
  const Component = () => (
    <SchemaForm initialValues={{ foo: '' }}>
      <Field name="foo" type="test-string" />
    </SchemaForm>
  )

  const { getByTestId } = render(<Component />)
  await sleep(33)
  expect(getByTestId('type-value').textContent).toEqual('string')
})

test('controlled initialValues', async () => {
  const actions = createFormActions()
  let outerSetState
  const Component = () => {
    const [state, setState] = useState({
      foo: '123'
    })
    outerSetState = values =>
      act(() => {
        setState(values)
      })
    return (
      <SchemaForm
        actions={actions}
        onChange={outerSetState}
        initialValues={state}
      >
        <Field name="foo" type="test-string" />
      </SchemaForm>
    )
  }

  const { getByTestId } = render(<Component />)
  await sleep(33)
  expect(getByTestId('type-value').textContent).toEqual('string')
  await actions.setFieldState('foo', state => {
    state.value = '321'
  })
  await actions.reset()
  expect(getByTestId('value').textContent).toEqual('123')
  await actions.setFieldState('foo', state => {
    state.value = '321'
  })
  await sleep(33)
  act(() => {
    outerSetState({ foo: '123' })
  })
  await sleep(33)
  expect(getByTestId('value').textContent).toEqual('123')
  await sleep(33)
})
