import React from 'react'
import { render, fireEvent } from '@testing-library/react'

import SchemaForm, { Field, registerFormField, connect } from '../index'

registerFormField(
  'string',
  connect()(props => (
    <input {...props} data-testid={props.testid} value={props.value || ''} />
  ))
)

test('Increase lastValidateValue value processing during initialization', async () => {
  const inpueFieldValidate = jest.fn()
  const requriedFieldValidate = jest.fn()

  const TestComponent = () => (
    <SchemaForm initialValues={{ requriedField: 'defaultValue' }}>
      <Field
        requried
        type="string"
        title="inpueField"
        name="inpueField"
        x-props={{ testid: 'inpueField' }}
        x-rules={() =>
          new Promise(resolve => {
            inpueFieldValidate()

            resolve()
          })
        }
      />
      <Field
        requried
        type="string"
        title="requriedField"
        name="requriedField"
        x-props={{ testid: 'requriedField' }}
        x-rules={() =>
          new Promise(resolve => {
            requriedFieldValidate()

            resolve()
          })
        }
      />
    </SchemaForm>
  )

  const { getByTestId } = render(<TestComponent />)
  fireEvent.change(getByTestId('inpueField'), { target: { value: 1111 } })
  await sleep(1000)
  expect(inpueFieldValidate).toHaveBeenCalledTimes(1)
  expect(requriedFieldValidate).toHaveBeenCalledTimes(0)

  fireEvent.change(getByTestId('requriedField'), { target: { value: 2222 } })
  await sleep(1000)
  expect(inpueFieldValidate).toHaveBeenCalledTimes(1)
  expect(requriedFieldValidate).toHaveBeenCalledTimes(1)
})
