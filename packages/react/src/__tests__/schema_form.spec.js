import React from 'react'
import { render, fireEvent } from '@testing-library/react'

import SchemaForm, {
  Field,
  registerFormField,
  connect,
  createFormActions
} from '../index'

registerFormField(
  'string',
  connect()(props => (
    <input {...props} data-testid={props.testid} value={props.value || ''} />
  ))
)

test('Increase lastValidateValue value processing during initialization', async () => {
  const inpueFieldValidate = jest.fn()
  const requriedFieldValidate = jest.fn()

  const TestComponent = () => (
    <SchemaForm initialValues={{ requriedField: 'defaultValue' }}>
      <Field
        requried
        type="string"
        title="inpueField"
        name="inpueField"
        x-props={{ testid: 'inpueField' }}
        x-rules={() =>
          new Promise(resolve => {
            inpueFieldValidate()

            resolve()
          })
        }
      />
      <Field
        requried
        type="string"
        title="requriedField"
        name="requriedField"
        x-props={{ testid: 'requriedField' }}
        x-rules={() =>
          new Promise(resolve => {
            requriedFieldValidate()

            resolve()
          })
        }
      />
    </SchemaForm>
  )

  const { getByTestId } = render(<TestComponent />)
  fireEvent.change(getByTestId('inpueField'), { target: { value: 1111 } })
  await sleep(1000)
  expect(inpueFieldValidate).toHaveBeenCalledTimes(1)
  expect(requriedFieldValidate).toHaveBeenCalledTimes(0)

  fireEvent.change(getByTestId('requriedField'), { target: { value: 2222 } })
  await sleep(1000)
  expect(inpueFieldValidate).toHaveBeenCalledTimes(1)
  expect(requriedFieldValidate).toHaveBeenCalledTimes(1)
})

const TestSubmitComponent = ({ children, ...props }) => (
  <SchemaForm {...props}>
    <Field
      type="string"
      x-rules={() =>
        new Promise(resolve => {
          // 延迟 1000ms 的异步校验
          setTimeout(() => {
            resolve()
          }, 1000)
        })
      }
    />
    {children}
  </SchemaForm>
)

test('test button submit type trigger onSubmit', async () => {
  const handleSubmit = jest.fn()

  const TestComponent = () => (
    <TestSubmitComponent onSubmit={handleSubmit}>
      <button type="submit" data-testid="submit">
        submit
      </button>
    </TestSubmitComponent>
  )

  const { getByTestId } = render(<TestComponent />)

  fireEvent.click(getByTestId('submit'))

  await sleep(100)
  fireEvent.click(getByTestId('submit'))
  fireEvent.click(getByTestId('submit'))
  fireEvent.click(getByTestId('submit'))

  await sleep(1000)
  expect(handleSubmit).toHaveBeenCalledTimes(1)
})

test('test actions.submit trigger onSubmit', async () => {
  const handleSubmit = jest.fn()

  const actions = createFormActions()

  const TestComponent = () => (
    <TestSubmitComponent actions={actions} onSubmit={handleSubmit}>
      <button
        data-testid="submit"
        onClick={() => {
          actions.submit()
        }}
      >
        submit
      </button>
    </TestSubmitComponent>
  )

  const { getByTestId } = render(<TestComponent />)

  fireEvent.click(getByTestId('submit'))

  await sleep(100)
  fireEvent.click(getByTestId('submit'))
  fireEvent.click(getByTestId('submit'))
  fireEvent.click(getByTestId('submit'))

  await sleep(1000)
  expect(handleSubmit).toHaveBeenCalledTimes(1)
})

test('test actions.submit and button submit type trigger onSubmit', async () => {
  const handleSubmit = jest.fn()

  const actions = createFormActions()

  const TestComponent = () => (
    <TestSubmitComponent
      actions={actions}
      onSubmit={() =>
        new Promise(resolve => {
          handleSubmit()
          resolve()
        })
      }
    >
      <button type="submit" data-testid="htmlSubmit">
        htmlSubmit
      </button>
      <button
        data-testid="actionSubmit"
        onClick={() => {
          actions.submit()
        }}
      >
        actionSubmit
      </button>
    </TestSubmitComponent>
  )

  const { getByTestId } = render(<TestComponent />)

  fireEvent.click(getByTestId('htmlSubmit'))
  await sleep(100)
  fireEvent.click(getByTestId('actionSubmit'))
  fireEvent.click(getByTestId('actionSubmit'))
  fireEvent.click(getByTestId('actionSubmit'))

  await sleep(1000)
  expect(handleSubmit).toHaveBeenCalledTimes(1)

  // actions.submit
  fireEvent.click(getByTestId('actionSubmit'))
  await sleep(100)
  fireEvent.click(getByTestId('htmlSubmit'))
  fireEvent.click(getByTestId('htmlSubmit'))
  fireEvent.click(getByTestId('htmlSubmit'))

  await sleep(1000)
  expect(handleSubmit).toHaveBeenCalledTimes(2)
})
