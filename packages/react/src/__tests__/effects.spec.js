import React, { useState, useEffect } from 'react'
import SchemaForm, {
  Field,
  registerFormField,
  connect,
  registerFieldMiddleware,
  createFormActions
} from '../index'
import { render, fireEvent, act } from 'react-testing-library'

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
    connect()(props =>
      props.disabled ? (
        'Disabled'
      ) : (
        <input {...props} value={props.value || ''} />
      )
    )
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

  const { getByText, getByTestId, queryByText } = render(<TestComponent />)

  await sleep(100)
  expect(queryByText('text')).toBeVisible()
  await sleep(100)
  fireEvent.click(getByTestId('btn'))
  await sleep(100)
  expect(getByText('field is required')).toBeVisible()
  await sleep(100)
  actions.setFieldState('aaa', state => {
    state.rules = []
  })
  await sleep(100)
  fireEvent.click(getByTestId('btn'))
  await sleep(100)
  expect(queryByText('field is required')).toBeNull()
})

test('init triggers', async () => {
  const callback = jest.fn()
  const TestComponent = () => {
    return (
      <SchemaForm
        effects={($, { setFieldState }) => {
          $('onFieldChange', 'aaa').subscribe(callback)
        }}
      >
        <Field name='aaa' type='string' />
        <button type='submit' data-testid='btn'>
          Submit
        </button>
      </SchemaForm>
    )
  }

  render(<TestComponent />)
  await sleep(33)
  expect(callback).toHaveBeenCalledTimes(1)
})

test('onFieldChange will trigger with initialValues', async () => {
  const callback = jest.fn()
  const TestComponent = () => {
    const [values, setValues] = useState({})
    useEffect(() => {
      setTimeout(() => {
        act(() => {
          setValues({
            aaa: 123
          })
        })
      })
    }, [])
    return (
      <SchemaForm
        initialValues={values}
        effects={($, { setFieldState }) => {
          $('onFieldChange', 'aaa').subscribe(callback)
        }}
      >
        <Field name='aaa' type='string' />
        <button type='submit' data-testid='btn'>
          Submit
        </button>
      </SchemaForm>
    )
  }

  render(<TestComponent />)
  await sleep(33)
  expect(callback).toHaveBeenCalledTimes(2)
  expect(callback.mock.calls[0][0].value).toBe(undefined)
  expect(callback.mock.calls[1][0].value).toBe(123)
})

test('setFieldState x-props with onFormInit', async () => {
  const TestComponent = () => {
    return (
      <SchemaForm
        effects={($, { setFieldState }) => {
          $('onFormInit').subscribe(() => {
            setFieldState('aaa', state => {
              state.props['x-props'].disabled = true
            })
          })
        }}
      >
        <Field name='aaa' type='string' x-props={{ disabled: false }} />
        <button type='submit' data-testid='btn'>
          Submit
        </button>
      </SchemaForm>
    )
  }

  const { queryByText } = render(<TestComponent />)
  await sleep(33)
  expect(queryByText('Disabled')).toBeVisible()
})
