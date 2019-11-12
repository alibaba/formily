import React, { Fragment } from 'react'
import {
  registerFormField,
  connect,
  SchemaMarkupForm as SchemaForm,
  SchemaMarkupField as Field,
  createFormActions,
  registerFieldMiddleware
} from '../index'
import { render, wait } from '@testing-library/react'

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
          <div data-testid={'test-errors'}>{props.errors}</div>
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
      <Fragment>
        <Field name="aaa" type="string" />
        <button type="submit" data-testid="btn">
          Submit
        </button>
      </Fragment>
    </SchemaForm>
  )

  const { queryByText } = render(<TestComponent />)

  await wait();
  expect(queryByText('text component')).toBeNull()
  await wait();
  actions.setFieldState('aaa', state => {
    state.props['x-component'] = 'text'
  })
  await wait();
  expect(queryByText('text component')).toBeVisible()
})
