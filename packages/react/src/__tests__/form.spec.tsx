import React from 'react'
import { render } from '@testing-library/react'
import { createForm } from '@formily/core'
import { FormProvider } from '../'
import { FormConsumer } from '../components'

test('render form', () => {
  const form = createForm()
  render(
    <FormProvider form={form}>
      <FormConsumer>{(form) => `${form.mounted}`}</FormConsumer>
      <FormConsumer />
    </FormProvider>
  )
  expect(form.mounted).toBeTruthy()
})
