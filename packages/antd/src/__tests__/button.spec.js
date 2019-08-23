import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import { SchemaForm, Field, Submit } from '../index'

test('fix repeat request', async () => {
  const handleSubmit = jest.fn()

  const TestComponent = () => (
    <SchemaForm
      labelCol={6}
      wrapperCol={6}
      onSubmit={handleSubmit}
      defaultValue={{ custom: 'abc' }}
    >
      <Field
        type="string"
        name="custom"
        required
        x-rules={() =>
          new Promise(resolve => {
            setTimeout(() => {
              // 延迟 1000ms 的异步校验
              resolve()
            }, 1000)
          })
        }
        title="test: 不会因为存在异步校验而导致可重复点击提交"
      />
      <Submit data-testid="submit" showLoading />
    </SchemaForm>
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
