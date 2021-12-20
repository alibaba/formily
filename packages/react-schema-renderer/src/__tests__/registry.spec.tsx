import React, { Fragment } from 'react'
import {
  registerFormField,
  connect,
  SchemaMarkupForm as SchemaForm,
  SchemaMarkupField as Field,
  createFormActions
} from '../index'

import { render, wait } from '@testing-library/react'

beforeEach(() => {
    registerFormField(
      'string',
      connect()(props => {
          return <input {...props} value={props.value || ''} />
      })
    )
  })

test('createFormActions', async () => {
  const actions = createFormActions()
  const Input = (props) => {    
    const { schema } = props
    const componentProps = schema.getExtendsComponentProps()
    return <input {...componentProps} value={props.value || ''} />
  }
  Input.isFieldComponent = true
  const TestComponent = () => (
    <SchemaForm
      actions={actions}
      components={{ Input }}
      componentPropsInterceptor={(props) => {
          const { schema } = props
          return { className: schema.name + '_' + (schema['x-component'] || schema.type) }
      }}
    >
      <Field name="aaa" x-component="Input" x-props={{ 'data-testid': 'inputA' }} />
      <Field name="bbb" type="string" x-props={{ 'data-testid': 'inputB' }} />
    </SchemaForm>
  )

  const { queryByTestId } = render(<TestComponent />)
  expect(queryByTestId('inputA').getAttribute('class')).toEqual('aaa_input')
  expect(queryByTestId('inputB').getAttribute('class')).toEqual('bbb_string')
})