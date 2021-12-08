import React from 'react'
import { createForm } from '@formily/core'
import {
  FormProvider,
  createSchemaField,
  useFieldSchema,
  useField,
  RecursionField,
} from '../index'
import { render, fireEvent, waitFor, act } from '@testing-library/react'

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
  test('props children', () => {
    const form = createForm()
    const Text: React.FC = (props) => {
      return <div data-testid="children-test">{props.children}</div>
    }
    const SchemaField = createSchemaField({
      components: {
        Text,
      },
    })
    const { queryByTestId } = render(
      <FormProvider form={form}>
        <SchemaField>
          <SchemaField.Void
            x-component="Text"
            x-component-props={{ children: 'props' }}
          />
        </SchemaField>
      </FormProvider>
    )
    expect(queryByTestId('children-test')).toBeVisible()
    expect(queryByTestId('children-test').innerHTML).toEqual('props')
  })
  test('x-content', () => {
    const form = createForm()
    const Text: React.FC = (props) => {
      return <div data-testid="content-test">{props.children}</div>
    }
    const SchemaField = createSchemaField({
      components: {
        Text,
      },
    })
    const { queryByTestId } = render(
      <FormProvider form={form}>
        <SchemaField>
          <SchemaField.Void x-component="Text" x-content="content" />
        </SchemaField>
      </FormProvider>
    )
    expect(queryByTestId('content-test')).toBeVisible()
    expect(queryByTestId('content-test').innerHTML).toEqual('content')
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

test('expression scope', async () => {
  let aa = false
  let bb = false
  let cc = false
  const form = createForm()
  const SchemaField = createSchemaField({
    components: {
      Input,
    },
    scope: {
      aa() {
        aa = true
      },
    },
  })

  const scope = {
    bb() {
      bb = true
    },
    cc() {
      cc = true
    },
  }

  const schema = {
    type: 'object',
    properties: {
      aa: {
        type: 'string',
        'x-component': 'Input',
        'x-reactions': '{{ aa }}',
      },
      bb: {
        type: 'string',
        'x-component': 'Input',
        'x-reactions': '{{ bb }}',
      },
      cc: {
        type: 'string',
        'x-component': 'Input',
        'x-reactions': {
          dependencies: ['aa'],
          fulfill: {
            run: 'cc()',
          },
        },
      },
    },
  }

  const { queryByTestId } = render(
    <FormProvider form={form}>
      <SchemaField schema={schema} scope={scope} />
    </FormProvider>
  )

  await waitFor(() => queryByTestId('aa'))
  expect(aa).toBeTruthy()

  await waitFor(() => queryByTestId('bb'))
  expect(bb).toBeTruthy()

  await waitFor(() => queryByTestId('cc'))
  expect(cc).toBeTruthy()
})

test('expression x-content', async () => {
  const form = createForm()
  const SchemaField = createSchemaField({
    components: {
      Wrapper: (props) => props.children,
    },
    scope: {
      child: <div data-testid="child"></div>,
    },
  })

  const { queryByTestId } = render(
    <FormProvider form={form}>
      <SchemaField>
        <SchemaField.String
          name="aaa"
          x-component="Wrapper"
          x-content="{{child}}"
        />
      </SchemaField>
    </FormProvider>
  )

  await waitFor(() => {
    expect(queryByTestId('child')).not.toBeUndefined()
  })
})

test('expression x-visible', async () => {
  const form = createForm()
  const SchemaField = createSchemaField({
    components: {
      AAA: () => <div>AAA</div>,
      BBB: () => <div>BBB</div>,
    },
  })

  const { queryByText } = render(
    <FormProvider form={form}>
      <SchemaField>
        <SchemaField.String name="aaa" x-component="AAA" />
        <SchemaField.String
          name="bbb"
          x-component="BBB"
          x-visible="{{$form.values.aaa === 123}}"
        />
      </SchemaField>
    </FormProvider>
  )

  await waitFor(() => {
    expect(queryByText('BBB')).toBeNull()
  })
  act(() => {
    form.values.aaa = 123
  })
  await waitFor(() => {
    expect(queryByText('BBB')).not.toBeNull()
  })
})

test('expression x-value', async () => {
  const form = createForm({
    values: {
      aaa: 1,
    },
  })
  const SchemaField = createSchemaField({
    components: {
      Text: (props) => <div>{props.value}</div>,
    },
  })

  const { queryByText } = render(
    <FormProvider form={form}>
      <SchemaField>
        <SchemaField.String name="aaa" x-component="Text" />
        <SchemaField.String
          name="bbb"
          x-component="Text"
          x-value="{{$form.values.aaa * 10}}"
        />
      </SchemaField>
    </FormProvider>
  )

  await waitFor(() => {
    expect(queryByText('10')).not.toBeNull()
  })
  act(() => {
    form.values.aaa = 10
  })
  await waitFor(() => {
    expect(queryByText('100')).not.toBeNull()
  })
})

test('nested update component props with expression', async () => {
  const form = createForm({
    values: {
      aaa: 'xxx',
    },
  })
  const SchemaField = createSchemaField({
    components: {
      Text: (props) => <div>{props.aa?.bb?.cc}</div>,
    },
  })

  const { queryByText } = render(
    <FormProvider form={form}>
      <SchemaField>
        <SchemaField.String name="aaa" x-component="Text" />
        <SchemaField.String
          name="bbb"
          x-component="Text"
          x-component-props={{ aa: { bb: { cc: '{{$form.values.aaa}}' } } }}
        />
      </SchemaField>
    </FormProvider>
  )
  await waitFor(() => {
    expect(queryByText('xxx')).not.toBeNull()
  })
  act(() => {
    form.values.aaa = '10'
  })
  await waitFor(() => {
    expect(queryByText('10')).not.toBeNull()
  })
})

test('nested update component props with x-reactions', async () => {
  const form = createForm({
    values: {
      aaa: 'xxx',
    },
  })
  const SchemaField = createSchemaField({
    components: {
      Text: (props) => <div>{props.aa?.bb?.cc}</div>,
    },
  })

  const { queryByText } = render(
    <FormProvider form={form}>
      <SchemaField>
        <SchemaField.String name="aaa" x-component="Text" />
        <SchemaField.String
          name="bbb"
          x-component="Text"
          x-reactions={{
            fulfill: {
              schema: {
                'x-component-props.aa.bb.cc': '{{$form.values.aaa}}',
              } as any,
            },
          }}
        />
      </SchemaField>
    </FormProvider>
  )
  await waitFor(() => {
    expect(queryByText('xxx')).not.toBeNull()
  })
  act(() => {
    form.values.aaa = '10'
  })
  await waitFor(() => {
    expect(queryByText('10')).not.toBeNull()
  })
})

test('schema x-validator/required', async () => {
  const form = createForm({
    values: {
      aaa: 'xxx',
    },
  })
  const SchemaField = createSchemaField({
    components: {
      Input: () => <div></div>,
    },
  })

  render(
    <FormProvider form={form}>
      <SchemaField>
        <SchemaField.String
          name="input"
          required
          x-validator="email"
          x-component="Input"
        />
      </SchemaField>
    </FormProvider>
  )
  await waitFor(() => {
    expect(form.query('input').get('required')).toBeTruthy()
    expect(form.query('input').get('validator')).toEqual([
      { required: true },
      { format: 'email' },
    ])
  })
})

test('schema x-reactions when undefined', async () => {
  const form = createForm({
    values: {
      aaa: 'xxx',
    },
  })
  const SchemaField = createSchemaField({
    components: {
      Input: () => <div data-testid="input"></div>,
      Select: () => <div data-testid="select"></div>,
    },
  })

  const { queryByTestId } = render(
    <FormProvider form={form}>
      <SchemaField>
        <SchemaField.String name="input" required x-component="Input" />
        <SchemaField.String
          name="select"
          required
          x-component="Select"
          x-reactions={{
            when: '{{$values.input}}',
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
          }}
        />
      </SchemaField>
    </FormProvider>
  )
  await waitFor(() => {
    expect(queryByTestId('input')).not.toBeNull()
    expect(queryByTestId('select')).toBeNull()
  })
})

test('void field children', async () => {
  const form = createForm()
  const SchemaField = createSchemaField({
    components: {
      Button: (props) => (
        <div data-testid="btn">{props.children || 'placeholder'}</div>
      ),
    },
  })

  const { queryByTestId } = render(
    <FormProvider form={form}>
      <SchemaField>
        <SchemaField.Void x-component="Button" />
      </SchemaField>
    </FormProvider>
  )
  await waitFor(() => {
    expect(queryByTestId('btn').textContent).toBe('placeholder')
  })
})

test('x-reactions runner for target', async () => {
  const form = createForm()
  const getTarget = jest.fn()
  const SchemaField = createSchemaField({
    components: {
      Input: () => <div></div>,
      Button: (props) => (
        <button
          data-testid="btn"
          onClick={(e) => {
            e.preventDefault()
            props.onChange('123')
          }}
        >
          Click {props.value}
        </button>
      ),
    },
    scope: {
      getTarget,
    },
  })

  const { getByTestId } = render(
    <FormProvider form={form}>
      <SchemaField>
        <SchemaField.String name="target" default="333" x-component="Input" />
        <SchemaField.String
          x-component="Button"
          x-reactions={{
            target: 'target',
            effects: ['onFieldInputValueChange'],
            fulfill: {
              run: 'getTarget($target.value)',
            },
          }}
        />
      </SchemaField>
    </FormProvider>
  )
  fireEvent.click(getByTestId('btn'))
  await waitFor(() => {
    expect(getByTestId('btn').textContent).toBe('Click 123')
    expect(getTarget).toBeCalledWith('333')
    expect(getTarget).toBeCalledTimes(1)
  })
})

test('multi x-reactions isolate effect', async () => {
  const form = createForm()
  const otherEffect = jest.fn()
  const SchemaField = createSchemaField({
    components: {
      Input: () => <div data-testid="input"></div>,
      Button: (props) => (
        <button
          data-testid="btn"
          onClick={(e) => {
            e.preventDefault()
            props.onChange('123')
          }}
        >
          Click {props.value}
        </button>
      ),
    },
  })

  const { getByTestId, queryByTestId } = render(
    <FormProvider form={form}>
      <SchemaField>
        <SchemaField.String
          name="target"
          x-reactions={[
            otherEffect,
            {
              dependencies: ['btn'],
              fulfill: {
                state: {
                  visible: '{{$deps[0] === "123"}}',
                },
              },
            },
          ]}
          x-component="Input"
        />
        <SchemaField.String name="btn" x-component="Button" />
      </SchemaField>
    </FormProvider>
  )
  await waitFor(() => {
    expect(queryByTestId('input')).toBeNull()
  })
  fireEvent.click(getByTestId('btn'))
  await waitFor(() => {
    expect(getByTestId('btn').textContent).toBe('Click 123')
    expect(getByTestId('input')).not.toBeNull()
    expect(otherEffect).toBeCalledTimes(1)
  })
})
