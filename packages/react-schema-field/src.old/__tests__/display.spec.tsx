import React, { Fragment } from 'react'
import {
  registerFormField,
  connect,
  SchemaMarkupForm as SchemaForm,
  SchemaMarkupField as Field
} from '../index'
import { render, fireEvent, wait } from '@testing-library/react'

beforeEach(() => {
  registerFormField('string', connect()(props => <div>{props.value}</div>))
})

test('display is false will remove react node', async () => {
  const TestComponent = () => {
    return (
      <SchemaForm
        effects={($, { setFieldState }) => {
          $('onFormInit').subscribe(() => {
            setFieldState('aa', state => {
              state.display = false
            })
          })
        }}
      >
        <Field type="string" name="aa" default="123321" />
      </SchemaForm>
    )
  }

  const { queryByText } = render(<TestComponent />)
  await wait();
  expect(queryByText('123321')).toBeNull()
})

test('display is false will remove react children node', async () => {
  const TestComponent = () => {
    return (
      <SchemaForm
        effects={($, { setFieldState }) => {
          $('onFormInit').subscribe(() => {
            setFieldState('obj', state => {
              state.display = false
            })
          })
        }}
      >
        <Field type="object" name="obj">
          <Field type="string" name="aa" default="123321" />
        </Field>
      </SchemaForm>
    )
  }

  const { queryByText } = render(<TestComponent />)
  await wait()
  expect(queryByText('123321')).toBeNull()
})

test('display is false will not remove value(include default value)', async () => {
  const onSubmitHandler = jest.fn()
  const TestComponent = () => {
    return (
      <SchemaForm
        initialValues={{ obj: { aa: '123321' } }}
        onSubmit={onSubmitHandler}
        effects={($, { setFieldState }) => {
          $('onFieldChange', 'bb').subscribe(({ value }) => {
            if (value === '123') {
              setFieldState('obj', state => {
                state.display = false
              })
            }
          })
        }}
      >
        <Fragment>
          <Field type="object" name="obj">
            <Field type="string" name="aa" />
          </Field>
          <Field type="string" name="bb" default="123" />
          <button type="submit">Submit</button>
        </Fragment>
      </SchemaForm>
    )
  }

  const { queryByText } = render(<TestComponent />)

  await wait()
  expect(queryByText('123321')).toBeNull()
  fireEvent.click(queryByText('Submit'))
  await wait()
  expect(onSubmitHandler).toHaveBeenCalledWith({
    obj: { aa: '123321' },
    bb: '123'
  })
})

test('display is false will not validate(include children)', async () => {
  const onSubmitHandler = jest.fn()
  const onValidateFailedHandler = jest.fn()
  const TestComponent = () => {
    return (
      <SchemaForm
        initialValues={{ obj: { aa: '123321' } }}
        onSubmit={onSubmitHandler}
        onValidateFailed={console.log}
        effects={($, { setFieldState }) => {
          $('onFieldChange', 'bb').subscribe(({ value }) => {
            if (value === '123') {
              setFieldState('obj', state => {
                state.display = false
              })
            }
          })
        }}
      >
        <Fragment>
          <Field type="object" name="obj">
            <Field type="string" name="aa" required />
          </Field>
          <Field type="string" name="bb" default="123" />
          <button type="submit">Submit</button>
        </Fragment>
      </SchemaForm>
    )
  }

  const { queryByText } = render(<TestComponent />)
  await wait()
  expect(queryByText('123321')).toBeNull()
  fireEvent.click(queryByText('Submit'))
  await wait()
  expect(onSubmitHandler).toHaveBeenCalledWith({
    obj: { aa: '123321' },
    bb: '123'
  })
  expect(onValidateFailedHandler).toHaveBeenCalledTimes(0)
})

test('display is expression true will display react node', async () => {
  const TestComponent = () => {
    const schema = {
      'type': 'object',
      'properties': {
        'aa': {
          'x-component': 'string',
          'title': 'aa',
          'default':'123321',
          'display':'{{true}}'
        },
      }
    }
    return (
      <SchemaForm schema={schema}/>
    )
  }
  const { queryByText } = render(<TestComponent />)
  await wait()
  expect(queryByText('123321')).toBeVisible()
})

test('display is expression false will hide react node', async () => {
  const TestComponent = () => {
    const schema = {
      'type': 'object',
      'properties': {
        'aa': {
          'x-component': 'string',
          'title': 'aa',
          'default':'123321',
          'display':'{{false}}'
        },
      }
    }
    return (
      <SchemaForm schema={schema}/>
    )
  }
  const { queryByText } = render(<TestComponent />)
  await wait()
  expect(queryByText('123321')).toBeNull()
})
