import React from 'react'
import SchemaForm, {
  Field,
  registerFormField,
  connect,
  createAsyncFormActions
} from '../index'
import { render } from 'react-testing-library'

beforeEach(() => {
  registerFormField('string', connect()(props => <div>{props.value}</div>))
})

test('createFormActions', async () => {
  const actions = createAsyncFormActions()
  const TestComponent = () => (
    <SchemaForm actions={actions}>
      <Field name='aaa' type='string' />
    </SchemaForm>
  )

  const { queryByText } = render(<TestComponent />)
  await sleep(33)
  await actions.setFormState(state => (state.values = { aaa: 123 }))
  expect(queryByText('123')).toBeVisible()
  await actions.setFieldState('aaa', state => (state.value = 'hello world'))
  expect(queryByText('hello world')).toBeVisible()
})
