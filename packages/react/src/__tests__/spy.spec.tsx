import React from 'react'
import { fireEvent, render, act, wait } from '@testing-library/react'
import { createForm } from '@formily/core'
import { FormSpy, createFormActions, LifeCycleTypes, Form, Field } from '..'

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

const sleep = (duration: number = 100) =>
  new Promise(resolve => setTimeout(resolve, duration))

describe('useFormSpy hook', () => {
  test('basic', async () => {
    const opts = {}
    const form = createForm(opts)
    const actions = createFormActions()
    const typeList = []
    const { getByTestId, queryByTestId } = render(
      <Form form={form} actions={actions}>
        <InputField name="a" required />
        <FormSpy>
          {({ form: spyForm, type, state }) => {
            typeList.push(type)
            expect(spyForm).toEqual(form)

            return <div data-testid="spy-type">{type}</div>
          }}
        </FormSpy>
        <FormSpy>
          {({ form: spyForm }) => {
            const val = spyForm.getFieldValue('a')
            return <div data-testid="spy-value">{val}</div>
          }}
        </FormSpy>
      </Form>
    )

    expect(getByTestId('spy-type').textContent).toEqual(
      LifeCycleTypes.ON_FORM_INIT
    )
    expect(getByTestId('spy-value').textContent).toEqual('')
    act(() => {
      fireEvent.change(queryByTestId('test-input'), { target: { value: 123 } })
    })
    await sleep()
    expect(typeList).toContain(LifeCycleTypes.ON_FORM_VALUES_CHANGE)
    expect(typeList).toContain(LifeCycleTypes.ON_FIELD_CHANGE)
    expect(typeList).toContain(LifeCycleTypes.ON_FIELD_VALUE_CHANGE)
    expect(typeList).toContain(LifeCycleTypes.ON_FIELD_INPUT_CHANGE)
    expect(typeList).toContain(LifeCycleTypes.ON_FORM_INPUT_CHANGE)
    expect(getByTestId('spy-type').textContent).toEqual(
      typeList[typeList.length - 1]
    )
    expect(getByTestId('spy-value').textContent).toEqual('123')
  })

  test('selector', async () => {
    const opts = {}
    const form = createForm(opts)
    const actions = createFormActions()
    const typeList = []
    const { getByTestId, queryByTestId } = render(
      <Form form={form} actions={actions}>
        <InputField name="a" required />
        <FormSpy selector={[LifeCycleTypes.ON_FIELD_VALUE_CHANGE]}>
          {({ type }) => {
            typeList.push(type)
            return <div data-testid="spy-type">{type}</div>
          }}
        </FormSpy>
        <FormSpy>
          {({ form: spyForm }) => {
            const val = spyForm.getFieldValue('a')
            return <div data-testid="spy-value">{val}</div>
          }}
        </FormSpy>
      </Form>
    )

    expect(getByTestId('spy-type').textContent).toEqual(
      LifeCycleTypes.ON_FORM_INIT
    )
    expect(getByTestId('spy-value').textContent).toEqual('')
    act(() => {
      fireEvent.change(queryByTestId('test-input'), { target: { value: 123 } })
    })
    await sleep()
    expect(getByTestId('spy-type').textContent).toEqual(
      LifeCycleTypes.ON_FIELD_VALUE_CHANGE
    )
    expect(getByTestId('spy-type').textContent).toEqual(
      typeList[typeList.length - 1]
    )
    expect(getByTestId('spy-value').textContent).toEqual('123')
  })

  test('reducer', async () => {
    const opts = {}
    const form = createForm(opts)
    const actions = createFormActions()
    const { getByTestId, queryByTestId, baseElement } = render(
      <Form form={form} actions={actions}>
        <InputField name="a" required />
        <FormSpy
          selector={[LifeCycleTypes.ON_FIELD_VALUE_CHANGE]}
          reducer={(state, { payload }) => {
            return {
              count: (state.count || 0) + 1,
              value: payload.value
            }
          }}
        >
          {({ state }) => {
            return (
              <div>
                <div data-testid="spy-value">{state.value}</div>
                <div data-testid="spy-count">{state.count}</div>
              </div>
            )
          }}
        </FormSpy>
      </Form>
    )

    expect(getByTestId('spy-value').textContent).toEqual('')
    act(() => {
      fireEvent.change(queryByTestId('test-input'), { target: { value: 123 } })
      fireEvent.change(queryByTestId('test-input'), { target: { value: 456 } })
      fireEvent.change(queryByTestId('test-input'), { target: { value: 789 } })
    })
    await sleep()
    expect(getByTestId('spy-value').textContent).toEqual('789')
    expect(getByTestId('spy-count').textContent).toEqual('1')
  })
})
