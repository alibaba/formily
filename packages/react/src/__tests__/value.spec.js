import React from 'react'
import { render } from '@testing-library/react'
import SchemaForm, { Field, registerFormField, connect } from '../index'

beforeEach(() => {
  registerFormField(
    'string',
    connect()(props => <div data-testid="value">{typeof props.value}</div>)
  )
})

test('default value', async () => {
  const Component = () => (
    <SchemaForm defaultValue={{ foo: '' }}>
      <Field name="foo" type="string" />
    </SchemaForm>
  )

  const { getByTestId } = render(<Component />)
  await sleep(33)
  expect(getByTestId('value').textContent).toEqual('string')
})

test('initialValues', async () => {
  const Component = () => (
    <SchemaForm initialValues={{ foo: '' }}>
      <Field name="foo" type="string" />
    </SchemaForm>
  )

  const { getByTestId } = render(<Component />)
  await sleep(33)
  expect(getByTestId('value').textContent).toEqual('string')
})
