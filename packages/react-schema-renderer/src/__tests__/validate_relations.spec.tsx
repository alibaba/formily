import React, { Fragment } from 'react'
import {
  registerFormField,
  connect,
  SchemaMarkupForm as SchemaForm,
  SchemaMarkupField as Field,
  createFormActions,
  registerFieldMiddleware
} from '../index'
import { render, fireEvent, wait } from '@testing-library/react'

registerFieldMiddleware(Field => {
  return props => {
    const index = props.schema['x-props'] && props.schema['x-props'].index
    return (
      <div>
        <Field {...props} />
        <div data-testid={`test-errors-${index}`}>{props.errors}</div>
      </div>
    )
  }
})
registerFormField(
  'string',
  connect()(props => (
    <input
      {...props}
      data-testid={`test-input-${props.index}`}
      value={props.value || ''}
    />
  ))
)

test('setFieldState will trigger validate', async () => {
  const handleSubmit = jest.fn()
  const handleValidateFailed = jest.fn()
  const actions = createFormActions()
  const TestComponent = () => (
    <SchemaForm
      actions={actions}
      effects={$ => {
        $('onFieldChange', 'text-1').subscribe(({ value }) => {
          if (value) {
            actions.setFieldState('text-2', state => {
              state.value = value
            })
          }
        })
      }}
      onSubmit={handleSubmit}
      onValidateFailed={handleValidateFailed}
    >
      <Fragment>
        <Field name="text-1" type="string" x-props={{ index: 1 }} />
        <Field name="text-2" type="string" required x-props={{ index: 2 }} />
        <button type="submit" data-testid="btn">
          Submit
        </button>
      </Fragment>
    </SchemaForm>
  )

  const { getByTestId } = render(<TestComponent />)

  fireEvent.click(getByTestId('btn'))
  await wait();
  expect(handleSubmit).toHaveBeenCalledTimes(0)
  expect(handleValidateFailed).toHaveBeenCalledTimes(1)
  expect(getByTestId('test-errors-2')).toHaveTextContent('text-2 is required')
  fireEvent.change(getByTestId('test-input-1'), { target: { value: '123' } })
  await wait();
  expect(getByTestId('test-input-2')).toHaveAttribute('value', '123')
  expect(getByTestId('test-errors-2')).not.toHaveTextContent(
    'text-2 is required'
  )
})
