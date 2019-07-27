import React, { useState } from 'react'
import { render, act } from '@testing-library/react'
import SchemaForm, {
  Field,
  registerFormField,
  connect,
  createFormActions,
  registerFormFieldPropsTransformer
} from '../index'

registerFormField(
  'test-string',
  connect()(props => (
    <React.Fragment>
      <div data-testid="value">{props.value}</div>
      <div data-testid="type-value">{typeof props.value}</div>
      <div data-testid="extra-props">{props.extra}</div>
    </React.Fragment>
  ))
)

registerFormFieldPropsTransformer('test-string', schema => {
  schema['x-props'] = {
    extra: 'this is extra props'
  }
  return schema
})

registerFormFieldPropsTransformer('test-string', schema => {
  schema['x-props'] = {
    extra: 'this is extra props 2'
  }
  return schema
})

test('props traverse', async () => {
  const actions = createFormActions()

  const Component = () => {
    return (
      <SchemaForm actions={actions} value={{ foo: '123' }}>
        <Field name="foo" type="test-string" />
      </SchemaForm>
    )
  }

  const { getByTestId, baseElement } = render(<Component />)
  await sleep(33)
  expect(getByTestId('extra-props').textContent).toEqual(
    'this is extra props 2'
  )
  actions.setFieldState('foo', state => {
    state.props['x-props'].extra = 'modify props'
  })
  await sleep(33)
  expect(getByTestId('extra-props').textContent).toEqual('modify props')
})
