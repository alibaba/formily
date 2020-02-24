import React, { Fragment } from 'react'
import {
  connect,
  registerFormField,
  SchemaMarkupForm as SchemaForm,
  SchemaMarkupField as Field
} from '../index'
import { toArr } from '@formily/shared'
import { render, wait } from '@testing-library/react'

beforeEach(() => {
  registerFormField(
    'string',
    connect()(props => <input {...props} value={(props.value || []).join('')} />)
  )
  
  registerFormField('array', props => {
    const { value, renderField } = props
    return (
      <Fragment>
        {toArr(value).map((item, index) => {
          return (
            <div data-testid="item" key={index}>
              {renderField(index)}
            </div>
          )
        })}
      </Fragment>
    )
  })
})

test('destruct with initial values', async () => {
  const TestComponent = () => {
    return (
      <SchemaForm initialValues={{ aa: 123, bb: 321 }}>
        <Field type="string" name="[aa,bb]" />
      </SchemaForm>
    )
  }

  const { queryByText } = render(<TestComponent />)
  await wait()
  expect(queryByText('123321')).toBeNull()
})

test('destruct with initial values in array', async () => {
  const TestComponent = () => {
    return (
      <SchemaForm initialValues={{ array: [{ aa: 123, bb: 321 }] }}>
        <Field type="array" name="array">
          <Field type="object">
            <Field type="string" name="[aa,bb]" />
          </Field>
        </Field>
      </SchemaForm>
    )
  }

  const { queryByText } = render(<TestComponent />)
  await wait()
  expect(queryByText('123321')).toBeNull()
})
