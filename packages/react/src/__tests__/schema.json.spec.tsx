import React from 'react'
import { createForm } from '@formily/core'
import { FormProvider, createSchemaField } from '../index'
import { Schema } from '@formily/json-schema'
import { render } from '@testing-library/react'

const Input = ({ value, onChange }) => {
  return <input data-testid="input" value={value || ''} onChange={onChange} />
}

describe('json schema field', () => {
  test('string field', () => {
    const form = createForm()
    const SchemaField = createSchemaField({
      components: {
        Input,
      },
    })
    const { queryByTestId } = render(
      <FormProvider form={form}>
        <SchemaField
          name="string"
          schema={
            new Schema({
              type: 'string',
              default: '123',
              'x-component': 'Input',
            })
          }
        />
      </FormProvider>
    )
    expect(queryByTestId('input')).toBeVisible()
    expect(queryByTestId('input').getAttribute('value')).toEqual('123')
  })
  test('object field', () => {
    const form = createForm()
    const SchemaField = createSchemaField({
      components: {
        Input,
      },
    })
    const { queryByTestId } = render(
      <FormProvider form={form}>
        <SchemaField
          name="object"
          schema={{
            type: 'object',
            properties: {
              string: {
                type: 'string',
                'x-component': 'Input',
              },
            },
          }}
        />
      </FormProvider>
    )
    expect(queryByTestId('input')).toBeVisible()
  })
  test('x-component-props children', () => {
    const form = createForm()
    const Text: React.FC = ({ children }) => {
      return <div data-testid="children-test">{children}</div>
    }
    const SchemaField = createSchemaField({
      components: {
        Text,
      },
    })
    const { queryByTestId } = render(
      <FormProvider form={form}>
        <SchemaField
          name="object"
          schema={{
            type: 'object',
            properties: {
              string: {
                type: 'string',
                'x-component': 'Text',
                'x-component-props': {
                  children: 'children',
                },
              },
            },
          }}
        />
      </FormProvider>
    )
    expect(queryByTestId('children-test')).toBeVisible()
    expect(queryByTestId('children-test').innerHTML).toEqual('children')
  })
  test('x-content', async () => {
    const form = createForm()
    const Text: React.FC = ({ children }) => {
      return <div data-testid="content-test">{children}</div>
    }
    const SchemaField = createSchemaField({
      components: {
        Text,
      },
    })
    const { queryByTestId } = render(
      <FormProvider form={form}>
        <SchemaField
          name="object"
          schema={{
            type: 'object',
            properties: {
              string: {
                type: 'string',
                'x-component': 'Text',
                'x-content': 'content',
              },
            },
          }}
        />
      </FormProvider>
    )
    expect(queryByTestId('content-test')).toBeVisible()
    expect(queryByTestId('content-test').innerHTML).toEqual('content')
  })
})
