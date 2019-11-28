import React, { Fragment } from 'react'
import {
  registerFormField,
  connect,
  SchemaMarkupForm as SchemaForm,
  SchemaMarkupField as Field,
  createFormActions
} from '../index'
import { render, wait, fireEvent } from '@testing-library/react'

registerFormField(
  'string',
  connect()(props => <input {...props} value={props.value || ''} />)
)

test('x-effect', async () => {
  const actions = createFormActions()
  const TestComponent = () => (
    <SchemaForm
      effects={($, { setFieldState }) => {
        $('onChange', 'aaa').subscribe(({ payload }) => {
          setFieldState('bbb', state => {
            state.value = payload
          })
        })
      }}
      actions={actions}
    >
      <Fragment>
        <Field
          name="aaa"
          type="string"
          x-effect={dispatch => {
            return {
              onChange() {
                dispatch('onChange', '123')
              }
            }
          }}
          x-props={{
            'data-testid': 'aaa'
          }}
        />
        <Field name="bbb" type="string" />
      </Fragment>
    </SchemaForm>
  )

  const { queryByTestId, baseElement } = render(<TestComponent />)
  await wait()
  fireEvent.change(queryByTestId('aaa'), {
    target: {
      value: 'hello world'
    }
  })
  await wait()
  console.log(baseElement.innerHTML)
})
