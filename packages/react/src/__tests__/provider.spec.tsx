import React, { useContext } from 'react'
import { fireEvent, render, act, wait } from '@testing-library/react'

import { Broadcast } from '../shared'
import { createForm } from '@formily/core'
import { FormSpy, FormProvider, createFormActions, Form, Field } from '..'
import { BroadcastContext } from '../context'

const InputField = props => (
  <Field {...props}>
    {({ state, mutators }) => (
      <input
        data-testid="test-input"
        value={state.value || ''}
        onChange={mutators.change}
      />
    )}
  </Field>
)

describe('provider hook', () => {
  test('basic', async () => {
    const InnerConsumer = () => {
      const broadCastInstance = useContext(BroadcastContext)
      expect(broadCastInstance instanceof Broadcast).toEqual(true)
      return <div>consumer</div>
    }

    const actions = createFormActions()
    // 传入自定义的form会使得useForm绑定broadcast逻辑失效
    const Frag = () => {
      return (
        <Form actions={actions}>
          <InputField name="a" />
          <InnerConsumer />
        </Form>
      )
    }
    const { getByTestId, queryByTestId } = render(
      <FormProvider>
        <Frag />
        <FormSpy>
          {({ form: spyForm }) => {
            return (
              <div data-testid="spy-value">{spyForm.getFieldValue('a')}</div>
            )
          }}
        </FormSpy>
      </FormProvider>
    )

    await wait()
    expect(getByTestId('spy-value').textContent).toEqual('')
    act(() => {
      fireEvent.change(queryByTestId('test-input'), { target: { value: 123 } })
    })
    await wait()
    expect(getByTestId('spy-value').textContent).toEqual('123')
  })

  test('custom form is invalid for provider', async () => {
    const InnerConsumer = () => {
      const broadCastInstance = useContext(BroadcastContext)
      expect(broadCastInstance instanceof Broadcast).toEqual(true)
      return <div>consumer</div>
    }

    const customForm = createForm()
    const actions = createFormActions()
    // 传入自定义的form会使得useForm绑定broadcast逻辑失效
    const Frag = () => {
      return (
        <Form form={customForm} actions={actions}>
          <InputField name="a" />
          <InnerConsumer />
        </Form>
      )
    }
    render(
      <FormProvider>
        <Frag />
        <FormSpy>
          {({ form: spyForm }) => {
            // custom form can not reproduce init hook, broadcast can never setContext
            expect(spyForm).toEqual(undefined)
            return <div data-testid="spy-value"></div>
          }}
        </FormSpy>
      </FormProvider>
    )
  })
})
