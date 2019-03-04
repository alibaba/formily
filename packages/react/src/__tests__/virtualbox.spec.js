import React from 'react'
import SchemaForm, {
  Field,
  registerFormField,
  createVirtualBox,
  connect,
  registerFieldMiddleware
} from '../index'
import { render } from 'react-testing-library'

let FormCard

beforeEach(() => {
  registerFieldMiddleware(Field => {
    return props => {
      if (typeof props.editable === 'boolean' && props.name !== '') {
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
  FormCard = createVirtualBox('card', ({ children }) => {
    return <div>card content{children}</div>
  })
})

test('createVirtualBox', async () => {
  const TestComponent = () => (
    <SchemaForm>
      <FormCard>
        <Field name='aaa' type='string' />
      </FormCard>
      <button type='submit' data-testid='btn'>
        Submit
      </button>
    </SchemaForm>
  )

  const { queryByText } = render(<TestComponent />)

  await sleep(100)
  expect(queryByText('card content')).toBeVisible()
})
