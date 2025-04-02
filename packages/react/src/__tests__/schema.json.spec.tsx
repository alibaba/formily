import React from 'react'
import { createForm } from '@formily/core'
import { FormProvider, createSchemaField } from '../index'
import { Schema } from '@formily/json-schema'
import { render } from '@testing-library/react'

const Input = ({ value, onChange }) => {
  return <input data-testid="input" value={value || ''} onChange={onChange} />
}

import { Button, Rate } from 'antd'
import { SearchOutlined, DollarOutlined } from '@ant-design/icons'

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
    expect(queryByTestId('input')?.getAttribute('value')).toEqual('123')
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
    expect(queryByTestId('children-test')?.innerHTML).toEqual('children')
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
    expect(queryByTestId('content-test')?.innerHTML).toEqual('content')
  })
  test('x-slot-node', () => {
    const form = createForm()
    const SchemaField = createSchemaField({
      components: {
        SearchOutlined,
        Button,
      },
    })
    const { queryByTestId } = render(
      <FormProvider form={form}>
        <SchemaField
          name="object"
          schema={{
            type: 'object',
            properties: {
              icon: {
                'x-slot-node': {
                  target: 'button.x-component-props.icon',
                },
                'x-component': 'SearchOutlined',
                'x-component-props': {
                  'data-testid': 'icon',
                },
              },
              button: {
                type: 'string',
                'x-component': 'Button',
                'x-component-props': {
                  'data-testid': 'button',
                },
              },
            },
          }}
        />
      </FormProvider>
    )
    const button = queryByTestId('button')
    const icon = queryByTestId('icon')

    expect(button).toContainElement(icon)
  })
  test('x-slot-node render prop', async () => {
    const form = createForm()
    const SchemaField = createSchemaField({
      components: {
        Rate,
        DollarOutlined,
      },
    })
    const { queryByRole, queryAllByTestId } = render(
      <FormProvider form={form}>
        <SchemaField
          name="object"
          schema={{
            type: 'object',
            properties: {
              icon: {
                'x-slot-node': {
                  target: 'rate.x-component-props.character',
                  isRenderProp: true,
                },
                'x-component': 'DollarOutlined',
                'x-component-props': {
                  'data-testid': 'icon',
                  rotate: '{{$slotArgs[0].value * 45}}',
                  style: {
                    fontSize: '{{`${$slotArgs[0].value * 10}px`}}',
                  },
                },
              },
              rate: {
                'x-component': 'Rate',
                'x-component-props': {
                  defaultValue: 2,
                },
              },
            },
          }}
        />
      </FormProvider>
    )

    const rate = queryByRole('radiogroup')
    expect(rate).toBeVisible()
    const icons = queryAllByTestId('icon')
    expect(icons).toHaveLength(10)
    icons.forEach((icon) => {
      expect(rate).toContainElement(icon)
    })

    const style = window.getComputedStyle(icons[0])
    const fontSize = style.fontSize
    expect(fontSize).toBe('20px')
  })
})
