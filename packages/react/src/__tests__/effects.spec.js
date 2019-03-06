
import React from 'react'
import SchemaForm, {
  Field,
  registerFormField,
  connect,
  registerFieldMiddleware,
  createFormActions
} from '../index'
import { render, fireEvent } from 'react-testing-library'

beforeEach(() => {
  registerFieldMiddleware(Field => {
    return props => {
      return (
        <div>
          {props.schema.title}
          <Field {...props} />
          {props.errors && props.errors.length ? (
            <div data-testid={`test-errors`}>{props.errors}</div>
          ) : (
            ''
          )}
        </div>
      )
    }
  })
  registerFormField(
    'string',
    connect()(props => <input {...props} value={props.value || ''} />)
  )
})

test('onFormInit setFieldState', async () => {
  const actions = createFormActions()
  const TestComponent = () => (
    <SchemaForm
      actions={actions}
      effects={($, { setFieldState }) => {
        $('onFormInit').subscribe(() => {
          setFieldState('aaa', state => {
            state.props.title = 'text'
            state.rules = [
              {
                required: true,
                message: 'field is required'
              }
            ]
          })
        })
      }}
    >
      <Field name='aaa' type='string' />
      <button type='submit' data-testid='btn'>
        Submit
      </button>
    </SchemaForm>
  )

  const { getByText, getAllByTestId, queryByText } = render(<TestComponent />)

  await sleep(100)
  expect(queryByText('text')).toBeVisible()
  await sleep(100)
  fireEvent.click(getAllByTestId('btn')[1])
  await sleep(100)
  expect(getByText('field is required')).toBeVisible()
  await sleep(100)
  actions.setFieldState('aaa', state => {
    state.rules = []
  })
  await sleep(100)
  fireEvent.click(getAllByTestId('btn')[1])
  await sleep(100)
  expect(queryByText('field is required')).toBeNull()
})
