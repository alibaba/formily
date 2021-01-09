import React, { Fragment, useState, useEffect } from 'react'
import {
  registerFormField,
  connect,
  FormPath,
  SchemaMarkupForm as SchemaForm,
  SchemaMarkupField as Field,
  createFormActions,
  // createVirtualBox,
  registerFieldMiddleware
} from '../index'
// import { toArr } from '@formily/shared'
import { render, wait, act, fireEvent } from '@testing-library/react'
import { filter } from 'rxjs/operators'

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
    props.disabled ? (
      <span>Disabled</span>
    ) : (
      <input {...props} value={props.value || ''} />
    )
  )
)

const sleep = (duration = 100) =>
  new Promise(resolve => {
    setTimeout(resolve, duration)
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
                required: true
              }
            ]
          })
        })
      }}
    >
      <Fragment>
        <Field name="aaa" type="string" />
        <button type="submit" data-testid="btn">
          Submit
        </button>
      </Fragment>
    </SchemaForm>
  )

  const { getByText, getByTestId, queryByText } = render(<TestComponent />)

  await wait()
  expect(queryByText('text')).toBeVisible()
  await wait()
  fireEvent.click(getByTestId('btn'))
  await wait()
  expect(getByText('This field is required')).toBeVisible()
  await wait()
  actions.setFieldState('aaa', state => {
    state.rules = []
  })
  await wait()
  fireEvent.click(getByTestId('btn'))
  await wait()
  expect(queryByText('This field is required')).toBeNull()
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
        <Fragment>
          <Field name="aaa" type="string" />
          <button type="submit" data-testid="btn">
            Submit
          </button>
        </Fragment>
      </SchemaForm>
    )
  }

  render(<TestComponent />)
  await wait()
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
        <Fragment>
          <Field name="aaa" type="string" />
          <button type="submit" data-testid="btn">
            Submit
          </button>
        </Fragment>
      </SchemaForm>
    )
  }

  render(<TestComponent />)
  await sleep(100)
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
        <Fragment>
          <Field name="aaa" type="string" x-props={{ disabled: false }} />
          <button type="submit" data-testid="btn">
            Submit
          </button>
        </Fragment>
      </SchemaForm>
    )
  }

  const { queryByText } = render(<TestComponent />)
  await wait()
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
            aaValue = getFieldState('obj', state => {
              return state.value && state.value.aa
            })
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
  await wait()
  fireEvent.change(queryByTestId('this is aa'), { target: { value: '333' } })
  await wait()
  expect(aaValue).toBe('333')
})

test('set errors in effects', async () => {
  const callback = jest.fn()
  const actions = createFormActions()
  const TestComponent = () => {
    return (
      <SchemaForm
        actions={actions}
        effects={($, { setFieldState }) => {
          $('onFormInit').subscribe(() => {
            setFieldState('aaa', state => {
              state.errors = ['validate failed']
            })
          })
        }}
        onSubmit={callback}
      >
        <Fragment>
          <Field name="aaa" type="string" />
          <button type="submit" data-testid="btn">
            Submit
          </button>
        </Fragment>
      </SchemaForm>
    )
  }

  const { queryByTestId } = render(<TestComponent />)
  await wait()
  fireEvent.click(queryByTestId('btn'))
  await wait()
  expect(callback).toHaveBeenCalledTimes(0)
})

test('setFieldState from buffer', async () => {
  const callback = jest.fn()
  const TestComponent = () => {
    return (
      <SchemaForm
        effects={($, { setFieldState }) => {
          $('onFormInit').subscribe(() => {
            setFieldState(FormPath.match('*') as any, state => {
              ;(state as any).title = '1123'
            })
          })
          $('onFieldChange', 'kkk').subscribe(() => {
            setFieldState(FormPath.match('dd.*') as any, state => {
              state.visible = false
            })
          })
        }}
        onSubmit={callback}
      >
        <Fragment>
          <Field type="object" name="dd" title="DD">
            <Field type="string" name="bbb" title="ccc" />
          </Field>
          <Field
            type="string"
            name="kkk"
            title="String"
            x-props={{ 'data-testid': 'test' }}
          />
        </Fragment>
      </SchemaForm>
    )
  }

  const { queryByTestId } = render(<TestComponent />)
  await wait()
  expect(queryByTestId('test')).toBeVisible()
})

test('filter first onFieldChange', async () => {
  const sub1 = jest.fn()
  const sub2 = jest.fn()
  const TestComponent = () => {
    return (
      <SchemaForm
        effects={($, { setFieldState }) => {
          $('onFieldChange', 'aaa')
            .pipe(filter(state => !state.pristine))
            .subscribe(sub1)
          $('onFieldChange', 'aaa').subscribe(sub2)
        }}
      >
        <Field type="string" name="aaa" title="aaa" />
      </SchemaForm>
    )
  }

  render(<TestComponent />)
  await wait()
  expect(sub1).toHaveBeenCalledTimes(0)
  expect(sub2).toHaveBeenCalledTimes(1)
})
