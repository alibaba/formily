import React, { useState, useEffect } from 'react'
import SchemaForm, {
  Field,
  registerFormField,
  connect,
  registerFieldMiddleware,
  createFormActions,
  FormPath
} from '../index'
import { render, fireEvent, act } from '@testing-library/react'

registerFieldMiddleware(Field => {
  return props => {
    return (
      <div>
        {props.schema.title}
        <Field {...props} />
        {props.errors && props.errors.length ? (
          <div data-testid={'test-errors'}>{props.errors}</div>
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
    props.disabled ? 'Disabled' : <input {...props} value={props.value || ''} />
  )
)

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
      <Field name="aaa" type="string" />
      <button type="submit" data-testid="btn">
        Submit
      </button>
    </SchemaForm>
  )

  const { getByText, getByTestId, queryByText } = render(<TestComponent />)

  await sleep(33)
  expect(queryByText('text')).toBeVisible()
  await sleep(33)
  fireEvent.click(getByTestId('btn'))
  await sleep(33)
  expect(getByText('field is required')).toBeVisible()
  await sleep(33)
  actions.setFieldState('aaa', state => {
    state.rules = []
  })
  await sleep(33)
  fireEvent.click(getByTestId('btn'))
  await sleep(33)
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
        <Field name="aaa" type="string" />
        <button type="submit" data-testid="btn">
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
        <Field name="aaa" type="string" />
        <button type="submit" data-testid="btn">
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
        <Field name="aaa" type="string" x-props={{ disabled: false }} />
        <button type="submit" data-testid="btn">
          Submit
        </button>
      </SchemaForm>
    )
  }

  const { queryByText } = render(<TestComponent />)
  await sleep(33)
  expect(queryByText('Disabled')).toBeVisible()
})

test('getFieldState with onFieldChange', async () => {
  let aaValue
  const TestComponent = () => {
    return (
      <SchemaForm
        // eslint-disable-next-line no-console
        onSubmit={values => console.log(values)}
        initialValues={{ obj: { aa: 123 } }}
        effects={($, { getFieldState }) => {
          $('onFieldChange', 'obj.aa').subscribe(() => {
            aaValue = getFieldState('obj', state => state.value.aa)
          })
        }}
      >
        <Field type="object" name="obj">
          <Field
            type="string"
            name="aa"
            x-props={{ 'data-testid': 'this is aa' }}
          />
        </Field>
      </SchemaForm>
    )
  }
  const { queryByTestId } = render(<TestComponent />)
  await sleep(33)
  fireEvent.change(queryByTestId('this is aa'), { target: { value: '333' } })
  await sleep(33)
  expect(aaValue).toBe('333')
})

test('set errors in effects', async () => {
  const callback = jest.fn()
  const TestComponent = () => {
    return (
      <SchemaForm
        effects={($, { setFieldState }) => {
          $('onFormInit').subscribe(() => {
            setFieldState('aaa', state => {
              state.errors = ['validate failed']
            })
          })
        }}
        onSubmit={callback}
      >
        <Field name="aaa" type="string" />
        <button type="submit" data-testid="btn">
          Submit
        </button>
      </SchemaForm>
    )
  }

  const { queryByTestId } = render(<TestComponent />)
  await sleep(33)
  fireEvent.click(queryByTestId('btn'))
  await sleep(33)
  expect(callback).toHaveBeenCalledTimes(0)
})

test('setFieldState from buffer', async () => {
  const callback = jest.fn()
  const TestComponent = () => {
    return (
      <SchemaForm
        effects={($, { setFieldState }) => {
          $('onFormInit').subscribe(() => {
            setFieldState(FormPath.match('*'), state => {
              state.title = '1123'
            })
          })
          $('onFieldChange', 'kkk').subscribe(() => {
            setFieldState(FormPath.match('dd.*'), state => {
              state.visible = false
            })
          })
        }}
        onSubmit={callback}
      >
        <Field type="object" name="dd" title="DD">
          <Field type="string" name="bbb" title="ccc" />
        </Field>
        <Field
          type="string"
          name="kkk"
          title="String"
          x-props={{ 'data-testid': 'test' }}
        />
      </SchemaForm>
    )
  }

  const { queryByTestId } = render(<TestComponent />)
  await sleep(33)
  expect(queryByTestId('test')).toBeVisible()
})
