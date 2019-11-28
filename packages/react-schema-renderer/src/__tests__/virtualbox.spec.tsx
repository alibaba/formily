import React, { Fragment, useState } from 'react'
import {
  registerFormField,
  connect,
  SchemaMarkupForm as SchemaForm,
  SchemaMarkupField as Field,
  registerFieldMiddleware,
  createVirtualBox
} from '../index'
import { render, fireEvent, act, wait } from '@testing-library/react'

let FormCard

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
registerFormField('text', connect()(props => <div>This is Text Component</div>))

FormCard = createVirtualBox('card', ({ children }) => {
  return <div>card content{children}</div>
})

test('createVirtualBox', async () => {
  const TestComponent = () => (
    <SchemaForm>
      <Fragment>
        <FormCard>
          <Field name="aaa" type="string" />
        </FormCard>
        <button type="submit" data-testid="btn">
          Submit
        </button>
      </Fragment>
    </SchemaForm>
  )

  const { queryByText } = render(<TestComponent />)

  await wait()
  expect(queryByText('card content')).toBeVisible()
})

test('dynamic node', async () => {
  const TestComponent = () => {
    const [editable, setEditable] = useState(false)
    return (
      <SchemaForm editable={editable}>
        <Fragment>
          {editable && (
            <FormCard>
              <Field name="aaa" type="string" />
            </FormCard>
          )}
          <FormCard>
            <Field name="bbb" type="text" />
          </FormCard>
          <button
            onClick={() => {
              act(() => {
                setEditable(true)
              })
            }}
          >
            Change Editable
          </button>
        </Fragment>
      </SchemaForm>
    )
  }

  const { queryByText } = render(<TestComponent />)

  await wait()
  fireEvent.click(queryByText('Change Editable'))
  await wait()
  expect(queryByText('This is Text Component')).toBeVisible()
})

test('dynamic schema', async () => {
  const TestComponent = () => {
    const [schema, setSchema] = useState<any>({
      type: 'object',
      properties: {
        card: {
          type: 'object',
          'x-component': 'card',
          properties: {
            aa: {
              type: 'string',
              'x-props': {
                'data-testid': 'aa'
              }
            },
            bb: {
              type: 'string',
              'x-props': {
                'data-testid': 'bb'
              }
            }
          }
        }
      }
    })

    const deleteProperty = () =>
      setSchema({
        type: 'object',
        properties: {
          card: {
            type: 'object',
            'x-component': 'card',
            properties: {
              aa: {
                type: 'string',
                'x-props': {
                  'data-testid': 'aa',
                  disabled: true
                }
              }
              // bb deleted
            }
          }
        }
      })
    return (
      <div>
        <SchemaForm schema={schema} />
        <button onClick={deleteProperty}>Delete</button>
      </div>
    )
  }

  const { queryByText, queryByTestId } = render(<TestComponent />)

  await wait()
  act(() => {
    fireEvent.click(queryByText('Delete'))
  })
  await wait()
  expect(queryByTestId('aa').hasAttribute('disabled')).toBe(true)
  expect(queryByTestId('aa')).toBeVisible()
  expect(queryByTestId('bb')).toBeNull()
})
