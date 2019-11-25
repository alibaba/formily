import React from 'react'
import {
  registerFormField,
  connect,
  SchemaMarkupForm as SchemaForm,
  SchemaMarkupField as Field,
  createFormActions,
  FormProvider,
  FormConsumer
} from '../index'
import { render, fireEvent, act, wait } from '@testing-library/react'

const sleep = timeout => {
  return new Promise(resolve => {
    setTimeout(resolve, timeout)
  })
}

beforeEach(() => {
  registerFormField(
    'string',
    connect()(props => <input {...props} value={props.value || ''} />)
  )
})

test('submit by form consumer', async () => {
  const actions = createFormActions()
  const TestComponent = () => (
    <FormProvider>
      <SchemaForm
        actions={actions}
        onSubmit={async () => {
          await sleep(100)
        }}
      >
        <Field name="aaa" type="string" />
      </SchemaForm>
      <FormConsumer>
        {({ submit, status }) => {
          if (status === 'submitting') {
            return <div>Submitting</div>
          } else {
            return <button onClick={() => submit()}>Submit</button>
          }
        }}
      </FormConsumer>
    </FormProvider>
  )

  const { queryByText } = render(<TestComponent />)
  act(() => {
    fireEvent.click(queryByText('Submit'))
  })
  await wait()
  expect(queryByText('Submitting')).toBeVisible()
  await sleep(1000)
  expect(queryByText('Submitting')).toBeNull()
  expect(queryByText('Submit')).not.toBeUndefined()
})
