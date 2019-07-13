import React from 'react'
import SchemaForm, { Field, registerFormField, connect } from '../index'
import { render, fireEvent } from '@testing-library/react'

registerFormField('string', connect()(props => <div>{props.value}</div>))

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

  await sleep(33)
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

  await sleep(33)
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
        <Field type="object" name="obj">
          <Field type="string" name="aa" />
        </Field>
        <Field type="string" name="bb" default="123" />
        <button type="submit">Submit</button>
      </SchemaForm>
    )
  }

  const { queryByText } = render(<TestComponent />)

  await sleep(33)
  expect(queryByText('123321')).toBeNull()
  fireEvent.click(queryByText('Submit'))
  await sleep(33)
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
        onValidateFailed={onValidateFailedHandler}
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
        <Field type="object" name="obj">
          <Field type="string" name="aa" required />
        </Field>
        <Field type="string" name="bb" default="123" />
        <button type="submit">Submit</button>
      </SchemaForm>
    )
  }

  const { queryByText } = render(<TestComponent />)

  await sleep(33)
  expect(queryByText('123321')).toBeNull()
  fireEvent.click(queryByText('Submit'))
  await sleep(33)
  expect(onSubmitHandler).toHaveBeenCalledWith({
    obj: { aa: '123321' },
    bb: '123'
  })
  expect(onValidateFailedHandler).toHaveBeenCalledTimes(0)
})
