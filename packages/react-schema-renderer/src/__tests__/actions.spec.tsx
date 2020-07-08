import React, { Fragment } from 'react'
import {
  registerFormField,
  connect,
  SchemaMarkupForm as SchemaForm,
  SchemaMarkupField as Field,
  createFormActions
} from '../index'

import { render, wait } from '@testing-library/react'

beforeEach(() => {
  registerFormField(
    'string',
    connect()(props => <input {...props} value={props.value || ''} />)
  )
})

test('createFormActions', async () => {
  const actions = createFormActions()
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
      <Fragment>
        <Field
          name="aaa"
          type="string"
          x-props={{
            'data-testid': 'inputA'
          }}
        />
        <Field
          name="bbb"
          type="string"
          x-props={{
            'data-testid': 'inputB'
          }}
        />
      </Fragment>
    </SchemaForm>
  )

  const { queryByTestId } = render(<TestComponent />)
  expect(queryByTestId('inputA').getAttribute('value')).toEqual(
    'change value of aaa field onFormInit'
  )
  actions.setFormState(state => (state.values = { aaa: 123 }))
  await wait()
  expect(queryByTestId('inputA').getAttribute('value')).toEqual('123')
  actions.setFieldState('aaa', state => (state.value = 'hello world'))
  await wait()
  expect(queryByTestId('inputA').getAttribute('value')).toEqual('hello world')
  const VALUE_A = 'value of aaa field'
  const VALUE_B = 'value of bbb field'
  const schemaData = [
    { name: 'aaa', value: VALUE_A },
    { name: 'bbb', value: VALUE_B }
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
  await wait()
  expect(queryByTestId('inputA').getAttribute('value')).toEqual(VALUE_A)
  expect(queryByTestId('inputB').getAttribute('value')).toEqual(VALUE_B)
})

test('createFormActions', async () => {
  const actionsSymbol = Symbol.for("__REVA_ACTIONS")
  const actions = createFormActions()
  const actions2 = createFormActions()
  expect(actions[actionsSymbol]).toEqual(true)
  expect(actions2[actionsSymbol]).toEqual(true)
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
      components={{ SchemaForm }}
    >
      <Field name="nested"
        x-component="SchemaForm"
        x-component-props={{
          actions: actions2
        }}
      />
      <Field
        name="aaa"
        type="string"
        x-props={{
          'data-testid': 'inputA'
        }}
      />
    </SchemaForm>
  )

  const { queryByTestId } = render(<TestComponent />)
  expect(queryByTestId('inputA').getAttribute('value')).toEqual(
    'change value of aaa field onFormInit'
  )
  actions.setFormState(state => (state.values = { aaa: 123 }))
  await wait()
  expect(actions[actionsSymbol]).toEqual(true)
  expect(actions2[actionsSymbol]).toEqual(true)
})