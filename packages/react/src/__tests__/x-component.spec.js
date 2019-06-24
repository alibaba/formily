import React from 'react'
import SchemaForm, {
  Field,
  registerFormField,
  connect,
  registerFieldMiddleware,
  createFormActions
} from '../index'
import { render } from '@testing-library/react'

registerFieldMiddleware(Field => {
  return props => {
    if (typeof props.editable === 'boolean') {
      if (!props.editable) return <div>empty</div>
    }
    return (
      <div>
        {props.schema.title}
        <Field {...props} />
        {props.errors && props.errors.length ? (
          <div data-testid={`test-errors`}>{props.errors}</div>
        ) : (
          ''
        )}
      </div>
    )
  }
})
registerFormField(
  'string',
  connect()(props => <input {...props} value={props.value || ''} />)
)
registerFormField('text', connect()(props => <div>text component</div>))

test('update x-component by setFieldState', async () => {
  const actions = createFormActions()
  const TestComponent = () => (
    <SchemaForm actions={actions}>
      <Field name="aaa" type="string" />
      <button type="submit" data-testid="btn">
        Submit
      </button>
    </SchemaForm>
  )

  const { queryByText } = render(<TestComponent />)

  await sleep(100)
  expect(queryByText('text component')).toBeNull()
  await sleep(100)
  actions.setFieldState('aaa', state => {
    state.props['x-component'] = 'text'
  })
  await sleep(100)
  expect(queryByText('text component')).toBeVisible()
})
