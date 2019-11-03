import React from 'react'
import {
  registerFormField,
  connect,
  SchemaMarkupForm as SchemaForm,
  SchemaMarkupField as Field,
  createFormActions,
  FormProvider,
  FormConsumer,
} from '../index'
import { render, fireEvent, act, wait } from '@testing-library/react'

const sleep = async (timeout) => {
  const noop = () => {}
  await wait(noop, timeout)
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
          await sleep(200)
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
  // await sleep(30)
  // expect(queryByText('Submitting')).toBeVisible()
  // await sleep(300)
  // expect(queryByText('Submitting')).toBeNull()
  // expect(queryByText('Submit')).not.toBeUndefined()
})
