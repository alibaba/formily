import React from 'react'
import SchemaForm, {
  Field,
  registerFormField,
  connect,
  FormProvider,
  FormConsumer,
  createFormActions
} from '../index'
import { render, fireEvent, act } from '@testing-library/react'

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
          await sleep(200)
        }}
      >
        <Field name='aaa' type='string' />
      </SchemaForm>
      <FormConsumer testingAct={act}>
        {({ status, submit }) => {
          if (status === 'submitting') {
            return <div>Submitting</div>
          } else {
            return <button onClick={submit}>Submit</button>
          }
        }}
      </FormConsumer>
    </FormProvider>
  )

  const { queryByText } = render(<TestComponent />)
  await sleep(100)
  fireEvent.click(queryByText('Submit'))
  await sleep(100)
  expect(queryByText('Submitting')).toBeVisible()
  await sleep(300)
  expect(queryByText('Submitting')).toBeNull()
  expect(queryByText('Submit')).toBeVisible()
})
