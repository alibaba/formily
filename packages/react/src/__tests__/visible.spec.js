import React from 'react'
import SchemaForm, { Field, registerFormField, connect } from '../index'
import { render } from '@testing-library/react'

registerFormField('string', connect()(props => <div>{props.value}</div>))

test('set visible by setFieldState', async () => {
  const TestComponent = () => {
    return (
      <SchemaForm
        effects={($, { setFieldState }) => {
          $('onFormInit').subscribe(() => {
            setFieldState('aa', state => {
              state.visible = false
            })
          })
        }}
      >
        <Field type="string" name="aa" default="123321" />
      </SchemaForm>
    )
  }

  const { queryByText } = render(<TestComponent />)

  await sleep(33)
  expect(queryByText('123321')).toBeNull()
})
