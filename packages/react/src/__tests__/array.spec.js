import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import SchemaForm, {
  Field,
  registerFormField,
  connect,
  createArrayField
} from '../index'

registerFormField(
  'string',
  connect({
    getProps: (props, { errors, name }) => {
      props.idx = name
      props.errors = errors
    }
  })(props => (
    <div>
      <input {...props} data-testid={props.idx} value={props.value || ''} />
      {!!props.errors.length && (
        <span data-testid={`${props.idx}_error`}>{props.errors[0]}</span>
      )}
    </div>
  ))
)

const ArrayField = createArrayField()

registerFormField(
  'table',
  class extends ArrayField {
    render() {
      const { value, schema, renderField } = this.props

      const Column = ({ item, index }) => (
        <div>
          {Object.keys(schema.items.properties).map(key => (
            <div key={key}>
              {renderField([index, key])}

              <div>
                {this.renderRemove(index, item)}
                {this.renderMoveDown(index, item)}
                {this.renderMoveUp(index)}
                {this.renderExtraOperations(index)}
              </div>
            </div>
          ))}
        </div>
      )

      return (
        <div>
          <div>
            {value.map((item, index) => (
              <Column key={index} {...{ item, index }} />
            ))}
          </div>

          {this.renderAddition()}
        </div>
      )
    }
  }
)

test('make sure deleted column data is removed from Form fieldssetFieldState will trigger validate', async () => {
  const TestComponent = () => {
    return (
      <SchemaForm>
        <Field
          name="array"
          type="array"
          x-component="table"
          x-props={{
            renderAddition: ({ add }) => {
              return (
                <a
                  data-testid="add"
                  onClick={e => {
                    e.preventDefault()
                    add(e)
                  }}
                >
                  add config
                </a>
              )
            },
            renderRemove: ({ index, remove }) => {
              return (
                <a
                  data-testid={`delete_${index}`}
                  onClick={e => {
                    e.preventDefault()
                    remove(e, index)
                  }}
                >
                  delete
                </a>
              )
            },
            renderMoveDown: () => <span />,
            renderMoveUp: () => <span />,
            operationsWidth: 50
          }}
        >
          <Field type="object">
            <Field
              data-testid="test-input"
              name="test-input"
              type="string"
              required
            />
          </Field>
        </Field>
      </SchemaForm>
    )
  }

  const { getByTestId, queryByText } = render(<TestComponent />)

  fireEvent.click(getByTestId('add'))
  await sleep(33)
  fireEvent.click(getByTestId('add'))

  fireEvent.change(getByTestId('array.1.test-input'), {
    target: { value: 'aa' }
  })
  await sleep(33)
  fireEvent.change(getByTestId('array.1.test-input'), {
    target: { value: '' }
  })

  await sleep(33)
  expect(queryByText('array.1.test-input is required')).toBeVisible()

  await sleep(33)
  fireEvent.click(getByTestId('delete_1'))

  await sleep(33)
  fireEvent.click(getByTestId('add'))

  await sleep(33)
  expect(queryByText('array.1.test-input is required')).toBeNull()
})
