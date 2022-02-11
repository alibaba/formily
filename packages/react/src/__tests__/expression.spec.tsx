import React from 'react'
import { render } from '@testing-library/react'
import { createForm } from '@formily/core'
import { FormProvider, ExpressionScope, createSchemaField } from '..'

test('expression scope', async () => {
  const Container = (props) => {
    return (
      <ExpressionScope value={{ $innerScope: 'this is inner scope value' }}>
        {props.children}
      </ExpressionScope>
    )
  }
  const Input = (props) => <div data-testid="test-input">{props.value}</div>
  const SchemaField = createSchemaField({
    components: {
      Container,
      Input,
    },
  })
  const form = createForm()
  const { getByTestId } = render(
    <FormProvider form={form}>
      <SchemaField scope={{ $outerScope: 'this is outer scope value' }}>
        <SchemaField.Void x-component="Container">
          <SchemaField.String
            name="input"
            x-component="Input"
            x-value="{{$innerScope + ' ' + $outerScope}}"
          />
        </SchemaField.Void>
      </SchemaField>
    </FormProvider>
  )

  expect(getByTestId('test-input').textContent).toBe(
    'this is inner scope value this is outer scope value'
  )
})
