import React, { Fragment } from 'react'
import {
  registerFormField,
  connect,
  SchemaMarkupForm as SchemaForm,
  SchemaMarkupField as Field
} from '../index'
import { render, fireEvent, wait } from '@testing-library/react'

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
      <Fragment>
        <Field
          required
          type="string"
          title="inpueField"
          name="inpueField"
          x-props={{ testid: 'inpueField' }}
          x-rules={() => {
            inpueFieldValidate()
            return ''
          }}
        />
        <Field
          required
          type="string"
          title="requriedField"
          name="requriedField"
          x-props={{ testid: 'requriedField' }}
          x-rules={() => {
            requriedFieldValidate()
            return ''
          }}
        />
      </Fragment>
    </SchemaForm>
  )

  const { getByTestId } = render(<TestComponent />)
  fireEvent.change(getByTestId('inpueField'), { target: { value: 1111 } })
  await wait()
  expect(inpueFieldValidate).toHaveBeenCalledTimes(1)
  expect(requriedFieldValidate).toHaveBeenCalledTimes(0)

  // fireEvent.change(getByTestId('requriedField'), { target: { value: 2222 } })
  // await wait();
  // expect(inpueFieldValidate).toHaveBeenCalledTimes(1)
  // expect(requriedFieldValidate).toHaveBeenCalledTimes(1)
})
