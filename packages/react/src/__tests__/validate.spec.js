import React, { useState, useEffect } from 'react'
import SchemaForm, {
  Field,
  registerFormField,
  connect,
  registerFieldMiddleware,
  FormPath,
  createFormActions
} from '../index'
import { render, fireEvent, act } from 'react-testing-library'

beforeEach(() => {
  registerFieldMiddleware(Field => {
    return props => {
      return (
        <div>
          <Field {...props} />
          {props.errors}
        </div>
      )
    }
  })

  registerFormField(
    'string',
    connect()(props => (
      <input {...props} data-testid='test-input' value={props.value || ''} />
    ))
  )
})

test('basic validate', async () => {
  const handleSubmit = jest.fn()
  const handleValidateFailed = jest.fn()
  const TestComponent = () => (
    <SchemaForm onSubmit={handleSubmit} onValidateFailed={handleValidateFailed}>
      <Field name='text' type='string' required />
      <button type='submit' data-testid='btn'>
        Submit
      </button>
    </SchemaForm>
  )

  const { getAllByTestId, getByText } = render(<TestComponent />)

  fireEvent.click(getAllByTestId('btn')[1])
  await sleep(100)
  fireEvent.click(getAllByTestId('btn')[1])
  await sleep(300)
  expect(handleSubmit).toHaveBeenCalledTimes(0)
  expect(handleValidateFailed).toHaveBeenCalledTimes(2)
  expect(getByText('text is required')).toBeVisible()
})

test('validate in init', async () => {
  const handleSubmit = jest.fn()
  const handleValidateFailed = jest.fn()
  const TestComponent = () => {
    const [state, setState] = useState()
    useEffect(() => {
      setState({
        text: ''
      })
    }, [])
    return (
      <SchemaForm
        initialValues={state}
        onSubmit={handleSubmit}
        onValidateFailed={handleValidateFailed}
      >
        <Field name='text' type='string' x-rules={{ required: true }} />
        <button type='submit' data-testid='btn'>
          Submit
        </button>
      </SchemaForm>
    )
  }
  let result
  act(() => {
    result = render(<TestComponent />)
  })
  await sleep(100)
  const { queryAllByText, queryByText } = result
  expect(queryByText('text is required')).toBeVisible()
  fireEvent.click(queryAllByText('Submit')[1])
  await sleep(100)
  expect(handleSubmit).toHaveBeenCalledTimes(0)
  expect(handleValidateFailed).toHaveBeenCalledTimes(1)
  expect(queryByText('text is required')).toBeVisible()
})

test('validate in editable false', async () => {
  const handleSubmit = jest.fn()
  const handleValidateFailed = jest.fn()
  const actions = createFormActions()
  const TestComponent = () => {
    const [state, setState] = useState()
    useEffect(() => {
      setState({
        editable: ''
      })
    }, [])
    return (
      <SchemaForm
        actions={actions}
        initialValues={state}
        editable={FormPath.match('editable')}
        onSubmit={handleSubmit}
        onValidateFailed={handleValidateFailed}
      >
        <Field name='editable' type='string' x-rules={{ required: true }} />
        <button type='submit' data-testid='btn'>
          Submit
        </button>
      </SchemaForm>
    )
  }
  let result
  act(() => {
    result = render(<TestComponent />)
  })
  await sleep(100)
  const { queryAllByText, queryByText } = result
  expect(queryByText('editable is required')).toBeVisible()
  fireEvent.click(queryAllByText('Submit')[1])
  await sleep(100)
  expect(handleSubmit).toHaveBeenCalledTimes(0)
  expect(handleValidateFailed).toHaveBeenCalledTimes(1)
  expect(queryByText('editable is required')).toBeVisible()
  actions.setFieldState('editable', state => {
    state.value = '123'
  })
  await sleep(100)
  fireEvent.click(queryAllByText('Submit')[1])
  await sleep(100)
  expect(handleSubmit).toHaveBeenCalledTimes(1)
  expect(handleValidateFailed).toHaveBeenCalledTimes(1)
  expect(queryByText('editable is required')).toBeNull()
})

test('modify validate rules by setFieldState', async () => {
  const actions = createFormActions()
  const TestComponent = () => {
    return (
      <SchemaForm actions={actions}>
        <Field
          name='bb'
          type='string'
          x-rules={[{ required: true, message: 'required' }]}
        />
        <button type='submit' data-testid='btn'>
          Submit
        </button>
      </SchemaForm>
    )
  }
  const { queryByText, queryAllByText, queryByTestId } = render(
    <TestComponent />
  )
  await sleep(33)
  fireEvent.click(queryAllByText('Submit')[1])
  await sleep(33)
  expect(queryByText('required')).toBeVisible()
  actions.setFieldState('bb', state => {
    state.rules = [
      { required: true },
      {
        pattern: /^\d{6}$/,
        message: 'must have 6 numbers'
      }
    ]
  })
  await sleep(33)
  fireEvent.change(queryByTestId('test-input'), {
    target: { value: '123' }
  })
  await sleep(33)
  expect(queryByText('must have 6 numbers')).toBeVisible()
})
