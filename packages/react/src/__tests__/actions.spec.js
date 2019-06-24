import React from 'react'
import SchemaForm, {
  Field,
  registerFormField,
  connect,
  createAsyncFormActions
} from '../index'
import { render } from '@testing-library/react'

beforeEach(() => {
  registerFormField('string', connect()(props => <div>{props.value}</div>))
})

test('createFormActions', async () => {
  const actions = createAsyncFormActions()
  const TestComponent = () => (
    <SchemaForm
      actions={actions}
      effects={($, { setFieldState }) => {
        $('onFormInit').subscribe(() => {
          setFieldState('aaa', state => {
            state.value = 'change value of aaa field onFormInit'
          })
        })
      }}
    >
      <Field name='aaa' type='string' />
      <Field name='bbb' type='string' />
    </SchemaForm>
  )

  const { queryByText } = render(<TestComponent />)
  await sleep(33)
  expect(queryByText('change value of aaa field onFormInit')).toBeVisible()
  await actions.setFormState(state => (state.values = { aaa: 123 }))
  expect(queryByText('123')).toBeVisible()
  await actions.setFieldState('aaa', state => (state.value = 'hello world'))
  expect(queryByText('hello world')).toBeVisible()
  const schemaData = [
    { name: 'aaa', value: 'value of aaa field' },
    { name: 'bbb', value: 'value of bbb field' }
  ]
  const updateQueue = []
  schemaData.forEach(({ name, value }) => {
    updateQueue.push(
      actions.setFieldState(name, state => {
        state.value = value
      })
    )
  })
  await Promise.all(updateQueue)
  expect(queryByText('value of aaa field')).toBeVisible()
  expect(queryByText('value of bbb field')).toBeVisible()
})
