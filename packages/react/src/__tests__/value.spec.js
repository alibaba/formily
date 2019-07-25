import React, { useState } from 'react'
import { render, act, fireEvent } from '@testing-library/react'
import SchemaForm, {
  Field,
  registerFormField,
  connect,
  createFormActions,
  FormSlot
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

registerFormField(
  'string',
  connect()(props => <input data-testid="test-input" value="" {...props} />)
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
      <SchemaForm actions={actions} initialValues={state} value={state}>
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

test('controlled with hooks by initalValues', async () => {
  const onChangeHandler = jest.fn()
  const Component = () => {
    const [total, setTotal] = useState(0)

    return (
      <div>
        <SchemaForm
          initialValues={{ a3: 123 }}
          effects={$ => {
            $('onFieldChange', 'a3').subscribe(onChangeHandler)
            $('onFieldChange', 'a3').subscribe(state => {
              act(() => {
                setTotal(state.value)
              })
            })
          }}
        >
          <Field type="string" name="a3" />
          <FormSlot>
            <div data-testid="inner-result">Total is:{total}</div>
          </FormSlot>
        </SchemaForm>
        <div data-testid="outer-result">Total is:{total}</div>
      </div>
    )
  }

  const { queryByTestId } = render(<Component />)
  expect(queryByTestId('outer-result').textContent).toEqual('Total is:123')
  expect(queryByTestId('inner-result').textContent).toEqual('Total is:123')
  fireEvent.change(queryByTestId('test-input'), { target: { value: '333' } })
  await sleep(33)
  expect(queryByTestId('outer-result').textContent).toEqual('Total is:333')
  expect(queryByTestId('inner-result').textContent).toEqual('Total is:333')
  expect(onChangeHandler).toHaveBeenCalledTimes(2)
})


test('controlled with hooks by value', async () => {
  const onChangeHandler = jest.fn()
  const Component = () => {
    const [total, setTotal] = useState(0)

    return (
      <div>
        <SchemaForm
          value={{ a3: 123 }}
          effects={$ => {
            $('onFieldChange', 'a3').subscribe(onChangeHandler)
            $('onFieldChange', 'a3').subscribe(state => {
              act(() => {
                setTotal(state.value)
              })
            })
          }}
        >
          <Field type="string" name="a3" />
          <FormSlot>
            <div data-testid="inner-result">Total is:{total}</div>
          </FormSlot>
        </SchemaForm>
        <div data-testid="outer-result">Total is:{total}</div>
      </div>
    )
  }

  const { queryByTestId } = render(<Component />)
  expect(queryByTestId('outer-result').textContent).toEqual('Total is:123')
  expect(queryByTestId('inner-result').textContent).toEqual('Total is:123')
  fireEvent.change(queryByTestId('test-input'), { target: { value: '333' } })
  await sleep(33)
  expect(queryByTestId('outer-result').textContent).toEqual('Total is:123')
  expect(queryByTestId('inner-result').textContent).toEqual('Total is:123')
  expect(onChangeHandler).toHaveBeenCalledTimes(3)
})