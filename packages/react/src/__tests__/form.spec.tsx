import React from 'react'
import { render } from '@testing-library/react'
import { createForm } from '@formily/core'
import { FormProvider, ObjectField, VoidField, Field } from '../'
import { FormConsumer } from '../components'
import { useParentForm } from '../hooks'

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

const DisplayParentForm: React.FC<React.HTMLAttributes<HTMLDivElement>> = (
  props
) => {
  return <div {...props}>{useParentForm()?.displayName}</div>
}

test('useParentForm', () => {
  const form = createForm()
  const { queryByTestId } = render(
    <FormProvider form={form}>
      <ObjectField name="aa">
        <Field name="bb">
          <DisplayParentForm data-testid="111" />
        </Field>
      </ObjectField>
      <VoidField name="cc">
        <Field name="dd">
          <DisplayParentForm data-testid="222" />
        </Field>
      </VoidField>
      <DisplayParentForm data-testid="333" />
    </FormProvider>
  )

  expect(queryByTestId('111').textContent).toBe('ObjectField')
  expect(queryByTestId('222').textContent).toBe('Form')
  expect(queryByTestId('333').textContent).toBe('Form')
})
