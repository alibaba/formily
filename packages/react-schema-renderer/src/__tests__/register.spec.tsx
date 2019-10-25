import React from 'react'
import {
  registerFormField,
  registerFieldMiddleware,
  registerVirtualBox,
  connect,
  SchemaForm,
  createFormActions,
  cleanRegistry
} from '../index'
import { render, fireEvent, wait } from '@testing-library/react'

describe('test all apis', () => {
  afterEach(() => {
    cleanRegistry()
  })
  test('registerFormField', async () => {
    registerFormField(
      'string',
      connect()(props => {
        return <input {...props} value={props.value || ''} />
      })
    )

    const actions = createFormActions()

    const { queryByTestId } = render(
      <SchemaForm
        actions={actions}
        schema={{
          type: 'object',
          properties: {
            aa: {
              type: 'string',
              default: '123',
              'x-props': {
                'data-testid': 'input'
              }
            }
          }
        }}
      />
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
    })
  })

  test('registerFieldMiddleware', async () => {
    registerFormField(
      'string',
      connect()(props => {
        return <input {...props} value={props.value || ''} />
      })
    )

    registerFieldMiddleware(FieldComponent => props => {
      return (
        <div>
          this is wrapper
          <FieldComponent {...props} />
        </div>
      )
    })

    const actions = createFormActions()

    const { queryByTestId, queryByText } = render(
      <SchemaForm
        actions={actions}
        schema={{
          type: 'object',
          properties: {
            aa: {
              type: 'string',
              default: '123',
              'x-props': {
                'data-testid': 'input'
              }
            }
          }
        }}
      />
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
      expect(queryByText('this is wrapper')).toBeTruthy()
    })
  })

  test('registerVirtualBox', async () => {
    registerFormField(
      'string',
      connect()(props => {
        return <input {...props} value={props.value || ''} />
      })
    )

    registerVirtualBox('box', props => {
      return <div>this is VirtualBox.{props.children}</div>
    })

    const actions = createFormActions()

    const { queryByTestId, queryByText } = render(
      <SchemaForm
        actions={actions}
        schema={{
          type: 'object',
          properties: {
            cc: {
              type: 'object',
              'x-component': 'box',
              properties: {
                aa: {
                  type: 'string',
                  default: '123',
                  'x-props': {
                    'data-testid': 'input'
                  }
                }
              }
            }
          }
        }}
      />
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
      expect(queryByText('this is VirtualBox.')).toBeTruthy()
    })
  })
})

describe('major scenes',()=>{
  //todo
  test('basic',()=>{
    //todo
  })
})


describe('bugfix',()=>{
  //todo
  test('basic',()=>{
    //todo
  })
})