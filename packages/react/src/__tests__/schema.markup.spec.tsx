import React from 'react'
import { createForm } from '@formily/core'
import {
  FormProvider,
  createSchemaField,
  useFieldSchema,
  useField,
  RecursionField,
} from '../index'
import { render, fireEvent, waitFor } from '@testing-library/react'

const Input: React.FC<{
  value?: string
  onChange?: (...args: any) => void
  [key: string]: any
}> = ({ value, onChange, ...others }) => {
  return (
    <input
      data-testid="input"
      {...others}
      value={value || ''}
      onChange={onChange}
    />
  )
}

describe('markup schema field', () => {
  test('string', () => {
    const form = createForm()
    const SchemaField = createSchemaField({
      components: {
        Input,
      },
    })
    const { queryByTestId } = render(
      <FormProvider form={form}>
        <SchemaField>
          <SchemaField.String x-component="Input" />
        </SchemaField>
      </FormProvider>
    )
    expect(queryByTestId('input')).toBeVisible()
  })
  test('boolean', () => {
    const form = createForm()
    const SchemaField = createSchemaField({
      components: {
        Input,
      },
    })
    const { queryByTestId } = render(
      <FormProvider form={form}>
        <SchemaField>
          <SchemaField.Boolean x-component="Input" />
        </SchemaField>
      </FormProvider>
    )
    expect(queryByTestId('input')).toBeVisible()
  })
  test('number', () => {
    const form = createForm()
    const SchemaField = createSchemaField({
      components: {
        Input,
      },
    })
    const { queryByTestId } = render(
      <FormProvider form={form}>
        <SchemaField>
          <SchemaField.Number x-component="Input" />
        </SchemaField>
      </FormProvider>
    )
    expect(queryByTestId('input')).toBeVisible()
  })
  test('date', () => {
    const form = createForm()
    const SchemaField = createSchemaField({
      components: {
        Input,
      },
    })
    const { queryByTestId } = render(
      <FormProvider form={form}>
        <SchemaField>
          <SchemaField.Date x-component="Input" />
        </SchemaField>
      </FormProvider>
    )
    expect(queryByTestId('input')).toBeVisible()
  })
  test('datetime', () => {
    const form = createForm()
    const SchemaField = createSchemaField({
      components: {
        Input,
      },
    })
    const { queryByTestId } = render(
      <FormProvider form={form}>
        <SchemaField>
          <SchemaField.DateTime x-component="Input" />
        </SchemaField>
      </FormProvider>
    )
    expect(queryByTestId('input')).toBeVisible()
  })
  test('void', () => {
    const form = createForm()
    const VoidComponent: React.FC = (props) => {
      return <div data-testid="void-component">{props.children}</div>
    }
    const SchemaField = createSchemaField({
      components: {
        VoidComponent,
      },
    })
    const { queryByTestId } = render(
      <FormProvider form={form}>
        <SchemaField>
          <SchemaField.Void x-component="VoidComponent" />
        </SchemaField>
      </FormProvider>
    )
    expect(queryByTestId('void-component')).toBeVisible()
  })
  test('array', () => {
    const form = createForm()
    const SchemaField = createSchemaField({
      components: {
        Input,
      },
    })
    render(
      <FormProvider form={form}>
        <SchemaField>
          <SchemaField.Array>
            <SchemaField.Object>
              <SchemaField.String x-component="Input" />
            </SchemaField.Object>
            <SchemaField.Void />
          </SchemaField.Array>
        </SchemaField>
      </FormProvider>
    )
  })
  test('other', () => {
    const form = createForm()
    const SchemaField = createSchemaField({
      components: {
        Input,
      },
    })
    render(
      <FormProvider form={form}>
        <SchemaField>
          <SchemaField.Markup type="other">
            <SchemaField.Markup />
          </SchemaField.Markup>
        </SchemaField>
      </FormProvider>
    )
  })
  test('no parent', () => {
    const form = createForm()
    const SchemaField = createSchemaField({
      components: {
        Input,
      },
    })
    render(
      <FormProvider form={form}>
        <SchemaField.Markup type="other">
          <SchemaField.Markup />
        </SchemaField.Markup>
      </FormProvider>
    )
  })
})

describe('recursion field', () => {
  test('onlyRenderProperties', () => {
    const form = createForm()
    const CustomObject: React.FC = () => {
      const schema = useFieldSchema()
      return (
        <div data-testid="object">
          <RecursionField schema={schema} />
        </div>
      )
    }
    const CustomObject2: React.FC = () => {
      const field = useField()
      const schema = useFieldSchema()
      return (
        <div data-testid="only-properties">
          <RecursionField
            name={schema.name}
            basePath={field.address}
            schema={schema}
            onlyRenderProperties
          />
        </div>
      )
    }
    const SchemaField = createSchemaField({
      components: {
        Input,
        CustomObject,
        CustomObject2,
      },
    })
    const { queryAllByTestId } = render(
      <FormProvider form={form}>
        <SchemaField>
          <SchemaField.Object x-component="CustomObject">
            <SchemaField.String x-component="Input" />
          </SchemaField.Object>
          <SchemaField.Object x-component="CustomObject2">
            <SchemaField.String x-component="Input" />
          </SchemaField.Object>
          <SchemaField.Void x-component="CustomObject2">
            <SchemaField.String x-component="Input" />
          </SchemaField.Void>
        </SchemaField>
      </FormProvider>
    )
    expect(queryAllByTestId('input').length).toEqual(3)
    expect(queryAllByTestId('object').length).toEqual(1)
    expect(queryAllByTestId('only-properties').length).toEqual(2)
  })

  test('mapProperties', () => {
    const form = createForm()
    const CustomObject: React.FC = () => {
      const schema = useFieldSchema()
      return (
        <div data-testid="object">
          <RecursionField
            schema={schema}
            mapProperties={(schema) => {
              schema.default = '123'
              return schema
            }}
          />
        </div>
      )
    }
    const CustomObject2: React.FC = () => {
      const schema = useFieldSchema()
      return (
        <div data-testid="object">
          <RecursionField
            schema={schema}
            mapProperties={() => {
              return null
            }}
          />
        </div>
      )
    }
    const SchemaField = createSchemaField({
      components: {
        Input,
        CustomObject,
        CustomObject2,
      },
    })
    const { queryAllByTestId } = render(
      <FormProvider form={form}>
        <SchemaField>
          <SchemaField.Object x-component="CustomObject">
            <SchemaField.String x-component="Input" />
          </SchemaField.Object>
          <SchemaField.Object x-component="CustomObject2">
            <SchemaField.String x-component="Input" />
          </SchemaField.Object>
        </SchemaField>
      </FormProvider>
    )
    expect(queryAllByTestId('input').length).toEqual(2)
    expect(queryAllByTestId('input')[0].getAttribute('value')).toEqual('123')
    expect(queryAllByTestId('input')[1].getAttribute('value')).toEqual('')
  })

  test('filterProperties', () => {
    const form = createForm()
    const CustomObject: React.FC = () => {
      const schema = useFieldSchema()
      return (
        <div data-testid="object">
          <RecursionField
            schema={schema}
            filterProperties={(schema) => {
              if (schema['x-component'] === 'Input') return false
              return true
            }}
          />
        </div>
      )
    }
    const CustomObject2: React.FC = () => {
      const schema = useFieldSchema()
      return (
        <div data-testid="object">
          <RecursionField
            schema={schema}
            filterProperties={(schema) => {
              if (schema['x-component'] === 'Input') return
              return true
            }}
          />
        </div>
      )
    }
    const SchemaField = createSchemaField({
      components: {
        Input,
        CustomObject,
        CustomObject2,
      },
    })
    const { queryAllByTestId } = render(
      <FormProvider form={form}>
        <SchemaField>
          <SchemaField.Object x-component="CustomObject">
            <SchemaField.String x-component="Input" />
          </SchemaField.Object>
          <SchemaField.Object x-component="CustomObject2">
            <SchemaField.String x-component="Input" />
          </SchemaField.Object>
        </SchemaField>
      </FormProvider>
    )
    expect(queryAllByTestId('input').length).toEqual(1)
    expect(queryAllByTestId('object').length).toEqual(2)
  })

  test('onlyRenderSelf', () => {
    const form = createForm()
    const CustomObject: React.FC = () => {
      const schema = useFieldSchema()
      return (
        <div data-testid="object">
          <RecursionField schema={schema} onlyRenderSelf />
        </div>
      )
    }
    const SchemaField = createSchemaField({
      components: {
        Input,
        CustomObject,
      },
    })
    const { queryAllByTestId } = render(
      <FormProvider form={form}>
        <SchemaField>
          <SchemaField.Object x-component="CustomObject">
            <SchemaField.String x-component="Input" />
          </SchemaField.Object>
        </SchemaField>
      </FormProvider>
    )
    expect(queryAllByTestId('input').length).toEqual(0)
    expect(queryAllByTestId('object').length).toEqual(1)
  })

  test('illegal schema', () => {
    const form = createForm()
    const CustomObject: React.FC = () => {
      return (
        <div data-testid="object">
          <RecursionField schema={null} />
        </div>
      )
    }
    const CustomObject2: React.FC = () => {
      return (
        <div data-testid="object">
          <RecursionField schema={{} as any} />
        </div>
      )
    }
    const SchemaField = createSchemaField({
      components: {
        Input,
        CustomObject,
        CustomObject2,
      },
    })
    const { queryByTestId } = render(
      <FormProvider form={form}>
        <SchemaField>
          <SchemaField.Object x-component="CustomObject">
            <SchemaField.String x-component="Input" />
          </SchemaField.Object>
          <SchemaField.Object x-component="CustomObject2">
            <SchemaField.String x-component="Input" />
          </SchemaField.Object>
        </SchemaField>
      </FormProvider>
    )
    expect(queryByTestId('input')).toBeNull()
  })
})

test('schema reactions', async () => {
  const form = createForm()
  const SchemaField = createSchemaField({
    components: {
      Input,
    },
  })
  const { queryByTestId } = render(
    <FormProvider form={form}>
      <SchemaField>
        <SchemaField.String
          name="aaa"
          x-component="Input"
          x-component-props={{
            'data-testid': 'aaa',
          }}
        />
        <SchemaField.String
          name="bbb"
          x-component="Input"
          x-component-props={{
            'data-testid': 'bbb',
          }}
          x-reactions={[
            {
              when: '{{$form.values.aaa === "123"}}',
              fulfill: {
                state: {
                  visible: true,
                },
              },
              otherwise: {
                state: {
                  visible: false,
                },
              },
            },
            {
              when: '{{$self.value === "123"}}',
              target: 'ccc',
              fulfill: {
                schema: {
                  'x-visible': true,
                },
              },
              otherwise: {
                schema: {
                  'x-visible': false,
                },
              },
            },
          ]}
        />
        <SchemaField.String
          name="ccc"
          x-component="Input"
          x-component-props={{
            'data-testid': 'ccc',
          }}
        />
      </SchemaField>
    </FormProvider>
  )
  expect(queryByTestId('bbb')).toBeNull()
  fireEvent.change(queryByTestId('aaa'), {
    target: {
      value: '123',
    },
  })
  await waitFor(() => {
    expect(queryByTestId('bbb')).toBeVisible()
  })
  expect(queryByTestId('ccc')).toBeNull()
  fireEvent.change(queryByTestId('bbb'), {
    target: {
      value: '123',
    },
  })
  await waitFor(() => {
    expect(queryByTestId('ccc')).toBeVisible()
  })
})
