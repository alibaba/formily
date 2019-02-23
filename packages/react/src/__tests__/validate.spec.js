import React from 'react'
import SchemaForm, {
  Field,
  registerFormField,
  connect,
  registerFieldMiddleware
} from '../index'
import { render, fireEvent } from 'react-testing-library'

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
