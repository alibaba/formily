import React, { useState, useEffect } from 'react'
import SchemaForm, {
  Field,
  registerFormField,
  connect,
  registerFieldMiddleware,
  FormPath,
  createFormActions
} from '../index'
import {
  render,
  fireEvent,
  act,
  waitForElement,
  waitForDomChange
} from '@testing-library/react'

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
    <input {...props} data-testid="test-input" value={props.value || ''} />
  ))
)

test('basic validate', async () => {
  const handleSubmit = jest.fn()
  const handleValidateFailed = jest.fn()
  const TestComponent = () => (
    <SchemaForm onSubmit={handleSubmit} onValidateFailed={handleValidateFailed}>
      <Field name="text" type="string" required />
      <button type="submit" data-testid="btn">
        Submit
      </button>
    </SchemaForm>
  )

  const { getByTestId, getByText } = render(<TestComponent />)

  fireEvent.click(getByTestId('btn'))
  await sleep(33)
  fireEvent.click(getByTestId('btn'))
  await sleep(33)
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
      act(() => {
        setState({
          text: ''
        })
      })
    }, [])
    return (
      <SchemaForm
        initialValues={state}
        onSubmit={handleSubmit}
        onValidateFailed={handleValidateFailed}
      >
        <Field name="text" type="string" x-rules={{ required: true }} />
        <button type="submit" data-testid="btn">
          Submit
        </button>
      </SchemaForm>
    )
  }
  let result
  act(() => {
    result = render(<TestComponent />)
  })
  await sleep(33)
  const { queryByText } = result
  expect(queryByText('text is required')).toBeNull()
  fireEvent.click(queryByText('Submit'))
  await sleep(33)
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
      act(() => {
        setState({
          editable: ''
        })
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
        <Field name="editable" type="string" x-rules={{ required: true }} />
        <button type="submit" data-testid="btn">
          Submit
        </button>
      </SchemaForm>
    )
  }
  let result
  act(() => {
    result = render(<TestComponent />)
  })
  await sleep(33)
  const { queryByText } = result
  expect(queryByText('editable is required')).toBeNull()
  fireEvent.click(queryByText('Submit'))
  await sleep(33)
  expect(handleSubmit).toHaveBeenCalledTimes(0)
  expect(handleValidateFailed).toHaveBeenCalledTimes(1)
  expect(queryByText('editable is required')).toBeVisible()
  actions.setFieldState('editable', state => {
    state.value = '123'
  })
  await sleep(33)
  fireEvent.click(queryByText('Submit'))
  await sleep(33)
  expect(handleSubmit).toHaveBeenCalledTimes(1)
  expect(handleValidateFailed).toHaveBeenCalledTimes(1)
  expect(queryByText('editable is required')).toBeNull()
})

test('modify required rules by setFieldState', async () => {
  const actions = createFormActions()
  const handleSubmit = jest.fn()
  const handleValidateFailed = jest.fn()
  const TestComponent = () => {
    return (
      <SchemaForm
        actions={actions}
        onSubmit={handleSubmit}
        onValidateFailed={handleValidateFailed}
      >
        <Field name="kk" type="string" />
        <button type="submit" data-testid="btn">
          Submit
        </button>
      </SchemaForm>
    )
  }
  const { queryByText } = render(<TestComponent />)
  await sleep(33)
  fireEvent.click(queryByText('Submit'))
  await sleep(33)
  expect(handleSubmit).toBeCalledTimes(1)
  expect(handleValidateFailed).toBeCalledTimes(0)
  actions.setFieldState('kk', state => {
    state.props.required = true
  })
  await sleep(33)
  fireEvent.click(queryByText('Submit'))
  await sleep(33)
  expect(queryByText('kk is required')).toBeVisible()
  expect(handleSubmit).toBeCalledTimes(1)
  expect(handleValidateFailed).toBeCalledTimes(1)
  actions.setFieldState('kk', state => {
    state.required = false
  })
  await sleep(33)
  fireEvent.click(queryByText('Submit'))
  await sleep(33)
  expect(queryByText('kk is required')).toBeNull()
  expect(handleSubmit).toBeCalledTimes(2)
  expect(handleValidateFailed).toBeCalledTimes(1)
  actions.setFieldState('kk', state => {
    state.required = true
  })
  await sleep(33)
  fireEvent.click(queryByText('Submit'))
  await sleep(33)
  expect(queryByText('kk is required')).toBeVisible()
  expect(handleSubmit).toBeCalledTimes(2)
  expect(handleValidateFailed).toBeCalledTimes(2)
})

test('modify validate rules by setFieldState', async () => {
  const actions = createFormActions()
  const TestComponent = () => {
    return (
      <SchemaForm actions={actions}>
        <Field
          name="bb"
          type="string"
          x-rules={[{ required: true, message: 'required' }]}
        />
        <button type="submit" data-testid="btn">
          Submit
        </button>
      </SchemaForm>
    )
  }
  const { queryByText, queryByTestId } = render(<TestComponent />)
  await sleep(33)
  fireEvent.click(queryByText('Submit'))
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

test('dynamic update values', async () => {
  const TestComponent = () => {
    return (
      <SchemaForm>
        <Field
          name="bb"
          type="string"
          x-rules={{ pattern: /\d+(\.\d+)?$/g, message: 'must be number' }}
        />
        <button type="submit" data-testid="btn">
          Submit
        </button>
      </SchemaForm>
    )
  }
  const { queryByTestId, queryByText } = render(<TestComponent />)
  await sleep(33)
  fireEvent.change(queryByTestId('test-input'), {
    target: { value: '12332123' }
  })
  await sleep(33)
  fireEvent.change(queryByTestId('test-input'), {
    target: { value: '12332123a' }
  })
  await sleep(33)
  fireEvent.change(queryByTestId('test-input'), { target: { value: '123321' } })
  await sleep(33)
  fireEvent.change(queryByTestId('test-input'), { target: { value: '12332' } })
  await sleep(33)
  expect(queryByText('must be number')).toBeNull()
  fireEvent.change(queryByTestId('test-input'), { target: { value: '12332a' } })
  await sleep(33)
  expect(queryByText('must be number')).toBeVisible()
})

test('test idcard rules', async () => {
  const TestComponent = () => {
    return (
      <SchemaForm>
        <Field name="idCard" type="string" x-rules="idcard" />
      </SchemaForm>
    )
  }
  const { queryByTestId, queryByText } = render(<TestComponent />)
  // 14位数字
  const value1 = '12345678912345'
  // 15位数字
  const value2 = '123456789123456'
  // 17位数字
  const value3 = '12345678912345678'
  // 17位数字+x
  const value4 = '12345678912345678x'
  // 17位数字+X
  const value5 = '12345678912345678X'
  // 18位数字
  const value6 = '123456789123456789'
  const element = await waitForElement(() => queryByTestId('test-input'))
  waitForDomChange({ container: element }).then(mutationsList => {
    const mutation = mutationsList[0]
    const { value } = mutation.target
    const errorTipsElement = queryByText('idCard is not an idcard format')
    if (value === value1 || value === value3) {
      errorTipsElement.toBeVisible()
    } else {
      errorTipsElement.toBeNull()
    }
  })
  fireEvent.change(element, { target: { value: value1 } })
  fireEvent.change(element, { target: { value: value2 } })
  fireEvent.change(element, { target: { value: value3 } })
  fireEvent.change(element, { target: { value: value4 } })
  fireEvent.change(element, { target: { value: value5 } })
  fireEvent.change(element, { target: { value: value6 } })
})
