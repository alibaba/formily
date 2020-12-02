import React from 'react'
import {
  registerFormField,
  connect,
  SchemaMarkupForm as SchemaForm,
  SchemaMarkupField as Field,
  createFormActions
} from '../index'
import { render, fireEvent, wait } from '@testing-library/react'

registerFormField(
  'mutator',
  connect()(props => (
    <div>
      <button
        onClick={() => {
          props.onChange([{ aaa: '321' }, ...props.value])
        }}
      >
        Change Value
      </button>
      {props.value && props.value[0] && props.value[0].aaa}
    </div>
  ))
)

test('update value by ref', async () => {
  const actions = createFormActions()
  const TestComponent = () => (
    <SchemaForm initialValues={{ mutator: [{ aaa: '123' }] }} actions={actions}>
      <Field name="mutator" type="mutator" />
    </SchemaForm>
  )

  const { queryByText } = render(<TestComponent />)
  await wait()
  expect(queryByText('123')).toBeVisible()
  fireEvent.click(queryByText('Change Value'))
  await wait()
  expect(queryByText('321')).toBeVisible()
})
