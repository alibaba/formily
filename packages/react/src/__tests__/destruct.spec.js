import React, { Fragment } from 'react'
import SchemaForm, { Field, registerFormField, connect } from '../index'
import { toArr } from '@uform/utils'
import { render } from '@testing-library/react'

registerFormField('string', connect()(props => <div>{props.value}</div>))

registerFormField('array', props => {
  const { value, mutators, renderField } = props
  return (
    <Fragment>
      {toArr(value).map((item, index) => {
        return (
          <div data-testid="item" key={index}>
            {renderField(index)}
          </div>
        )
      })}
      <button
        type="button"
        onClick={() => {
          mutators.push()
        }}
      >
        Add Field
      </button>
    </Fragment>
  )
})

test('destruct with initial values', async () => {
  const TestComponent = () => {
    return (
      <SchemaForm initialValues={{ aa: 123, bb: 321 }}>
        <Field type="string" name="[aa,bb]" />
      </SchemaForm>
    )
  }

  const { queryByText } = render(<TestComponent />)

  await sleep(33)
  expect(queryByText('123321')).toBeVisible()
})

test('destruct with initial values in array', async () => {
  const TestComponent = () => {
    return (
      <SchemaForm initialValues={{ array: [{ aa: 123, bb: 321 }] }}>
        <Field type="array" name="array">
          <Field type="object">
            <Field type="string" name="[aa,bb]" />
          </Field>
        </Field>
      </SchemaForm>
    )
  }

  const { queryByText } = render(<TestComponent />)

  await sleep(33)
  expect(queryByText('123321')).toBeVisible()
})
