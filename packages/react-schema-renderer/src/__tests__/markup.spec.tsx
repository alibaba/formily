import React from 'react'
import {
  registerFormField,
  createVirtualBox,
  connect,
  SchemaMarkupForm as SchemaForm,
  SchemaMarkupField as Field,
  createFormActions,
  createSchemaFormActions,
  cleanup
} from '../index'
import { render, fireEvent, wait } from '@testing-library/react'

describe('markup', () => {
  beforeEach(() => {
    registerFormField(
      'string',
      connect()(props => {
        return <input {...props} value={props.value || ''} />
      })
    )
  })

  afterEach(() => {
    cleanup()
  })

  test('markup string', async () => {
    const actions = createFormActions()

    const { queryByTestId } = render(
      <SchemaForm actions={actions}>
        <Field
          name="aa"
          type="string"
          default="123"
          x-props={{ 'data-testid': 'input' }}
        />
      </SchemaForm>
    )
    expect(queryByTestId('input').getAttribute('value')).toEqual('123')
    fireEvent.change(queryByTestId('input'), {
      target: {
        value: 'aa change'
      }
    })
    await wait(() => {
      expect(queryByTestId('input').getAttribute('value')).toEqual('aa change')
      expect(actions.getFormGraph()).toMatchSnapshot()
      expect(actions.getFormState(state => state.values)).toEqual({
        aa: 'aa change'
      })
    })
  })

  test('markup virtualbox', async () => {
    const Card = createVirtualBox<{ title?: string | React.ReactElement }>(
      'card',
      props => {
        return (
          <div>
            <div>Title:{props.title}</div>
            <div>{props.children}</div>
          </div>
        )
      }
    )

    const actions = createSchemaFormActions()

    const { queryByTestId } = render(
      <SchemaForm actions={actions}>
        <Card title={'this is card'}>
          <Field
            name="aa"
            type="string"
            default="123"
            x-props={{ 'data-testid': 'input' }}
          />
        </Card>
      </SchemaForm>
    )
    expect(queryByTestId('input').getAttribute('value')).toEqual('123')
    fireEvent.change(queryByTestId('input'), {
      target: {
        value: 'aa change'
      }
    })
    await wait(() => {
      expect(queryByTestId('input').getAttribute('value')).toEqual('aa change')
      expect(actions.getFormGraph()).toMatchSnapshot()
      expect(actions.getFormState(state => state.values)).toEqual({
        aa: 'aa change'
      })
      expect(actions.getFormSchema()).toMatchSnapshot()
    })
  })
})
