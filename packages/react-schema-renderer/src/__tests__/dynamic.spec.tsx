import React, { Fragment, useEffect, useState } from 'react'
import {
  registerFormField,
  connect,
  FormPath,
  SchemaMarkupForm as SchemaForm,
  SchemaMarkupField as Field,
  createFormActions,
  createVirtualBox
} from '../index'
import { toArr } from '@formily/shared'
import { render, fireEvent, wait, act } from '@testing-library/react'

const sleep = timeout => {
  return new Promise(resolve => {
    setTimeout(resolve, timeout)
  })
}

let FormCard
beforeEach(() => {
  registerFormField(
    'string',
    connect()(props => (
      <input data-testid="input" {...props} value={props.value || ''} />
    ))
  )

  registerFormField(
    'radio',
    connect()(props =>
      props.dataSource.map(item => (
        <label htmlFor={item.value} key={`${item.label}-${item.value}`}>
          <input
            onChange={() => props.onChange(item.value)}
            type="radio"
            checked={item.value === props.value}
            id={item.value}
            data-testid={`radio-${item.value}`}
          />
          {props.id}
        </label>
      ))
    )
  )

  registerFormField('container', props => {
    const { value, mutators, renderField } = props
    return (
      <Fragment>
        {toArr(value).map((item, index) => {
          return (
            <div data-testid="item" key={index}>
              {renderField(index)}
              <button
                type="button"
                onClick={() => {
                  mutators.remove(index)
                }}
              >
                Remove Field
              </button>
            </div>
          )
        })}
        <button
          type="button"
          onClick={() => {
            mutators.push()
          }}
        >
          Add Field
        </button>
      </Fragment>
    )
  })

  FormCard = createVirtualBox('card', ({ children }) => {
    return <div>card content{children}</div>
  })
})

test('dynaimc add field', async () => {
  const actions = createFormActions()
  const TestComponent = () => {
    return (
      <SchemaForm
        actions={actions}
        effects={($, { setFieldState }) => {
          $('onFormInit').subscribe(() => {
            setFieldState(FormPath.match('container.*.bb'), state => {
              state.visible = false
            })
          })

          $('onFieldChange', FormPath.match('container.0.aa')).subscribe(
            state => {
              if (state.value == '123') {
                setFieldState(
                  FormPath.transform(state.name, /\d/, $1 => {
                    return `container.${$1}.bb`
                  }),
                  state => {
                    state.visible = true
                  }
                )
              }
            }
          )
        }}
      >
        <Field name="container" type="array" x-component="container">
          <Field name="object" type="object">
            <Field name="aa" type="string" />
            <Field name="bb" type="string" />
          </Field>
        </Field>
      </SchemaForm>
    )
  }

  const { queryAllByTestId, queryByText } = render(<TestComponent />)
  await wait()
  expect(queryAllByTestId('item').length).toBe(0)
  expect(queryAllByTestId('input').length).toBe(0)
  fireEvent.click(queryByText('Add Field'))
  await wait()
  expect(queryAllByTestId('item').length).toBe(1)
  expect(queryAllByTestId('input').length).toBe(1)

  actions.setFieldState('container.0.bb', state => {
    state.visible = true
  })
  await wait()
  expect(queryAllByTestId('item').length).toBe(1)
  expect(queryAllByTestId('input').length).toBe(2)
  actions.setFieldState('container.0.bb', state => {
    state.visible = false
  })
  await wait()
  expect(queryAllByTestId('item').length).toBe(1)
  expect(queryAllByTestId('input').length).toBe(1)

  actions.setFieldState('container.0.aa', state => {
    state.value = '123'
  })
  await wait()
  expect(queryAllByTestId('item').length).toBe(1)
  expect(queryAllByTestId('input').length).toBe(2)
})

test('dynaimc add field with initialValue', async () => {
  const actions = createFormActions()
  const TestComponent = () => {
    return (
      <SchemaForm
        actions={actions}
        initialValues={{ container: [{ aa: '', bb: '' }] }}
        effects={($, { setFieldState }) => {
          $('onFormInit').subscribe(() => {
            setFieldState('container.*.bb', state => {
              state.visible = false
            })
          })

          $('onFieldChange', FormPath.match('container.*.aa')).subscribe(
            state => {
              if (state.value) {
                if (state.value === '123') {
                  setFieldState(
                    FormPath.transform(state.name, /\d/, $1 => {
                      return `container.${$1}.bb`
                    }),
                    state => {
                      state.visible = true
                    }
                  )
                } else {
                  setFieldState(
                    FormPath.transform(state.name, /\d/, $1 => {
                      return `container.${$1}.bb`
                    }),
                    state => {
                      state.visible = false
                    }
                  )
                }
              }
            }
          )
        }}
      >
        <Field name="container" type="array" x-component="container">
          <Field name="object" type="object">
            <Field name="aa" type="string" />
            <Field name="bb" type="string" />
          </Field>
        </Field>
      </SchemaForm>
    )
  }

  const { queryAllByTestId, queryByText } = render(<TestComponent />)
  await wait()
  expect(queryAllByTestId('item').length).toBe(1)
  expect(queryAllByTestId('input').length).toBe(1)
  fireEvent.click(queryByText('Add Field'))
  await wait()
  expect(queryAllByTestId('item').length).toBe(2)
  expect(queryAllByTestId('input').length).toBe(2)
  actions.setFieldState('container.0.bb', state => {
    state.visible = true
  })
  await wait()
  expect(queryAllByTestId('item').length).toBe(2)
  expect(queryAllByTestId('input').length).toBe(3)
  actions.setFieldState('container.0.bb', state => {
    state.visible = false
  })
  await wait()
  expect(queryAllByTestId('item').length).toBe(2)
  expect(queryAllByTestId('input').length).toBe(2)
  actions.setFieldState('container.0.aa', state => {
    state.value = '123'
  })
  await wait()
  expect(queryAllByTestId('item').length).toBe(2)
  expect(queryAllByTestId('input').length).toBe(3)
  actions.setFieldState('container.0.aa', state => {
    state.value = '321'
  })
  await wait()
  expect(queryAllByTestId('item').length).toBe(2)
  expect(queryAllByTestId('input').length).toBe(2)
})

test('dynaimc add field with initialValue in virtualbox', async () => {
  const actions = createFormActions()
  const submitHandler = jest.fn()
  const TestComponent = () => {
    return (
      <SchemaForm
        actions={actions}
        onSubmit={submitHandler}
        initialValues={{ container: [{ aa: '', bb: 'hello' }] }}
        effects={($, { setFieldState }) => {
          $('onFormInit').subscribe(() => {
            setFieldState(FormPath.match('container.*.bb'), state => {
              state.visible = false
            })
          })

          $('onFieldChange', FormPath.match('container.*.aa')).subscribe(
            state => {
              if (state.value) {
                if (state.value === '123') {
                  setFieldState(
                    FormPath.transform(state.name, /\d/, $1 => {
                      return `container.${$1}.bb`
                    }),
                    state => {
                      state.visible = true
                    }
                  )
                } else {
                  setFieldState(
                    FormPath.transform(state.name, /\d/, $1 => {
                      return `container.${$1}.bb`
                    }),
                    state => {
                      state.visible = false
                    }
                  )
                }
              }
            }
          )
        }}
      >
        <Fragment>
          <Field name="container" type="array" x-component="container">
            <Field name="object" type="object">
              <FormCard>
                <Field name="aa" type="string" />
                <Field name="bb" type="string" />
              </FormCard>
            </Field>
          </Field>
          <button type="submit">Submit</button>
        </Fragment>
      </SchemaForm>
    )
  }

  const { queryAllByTestId, queryByText } = render(<TestComponent />)
  await wait()
  expect(queryAllByTestId('item').length).toBe(1)
  expect(queryAllByTestId('input').length).toBe(1)
  fireEvent.click(queryByText('Add Field'))
  await wait()
  expect(queryAllByTestId('item').length).toBe(2)
  expect(queryAllByTestId('input').length).toBe(2)
  actions.setFieldState('container.0.bb', state => {
    state.visible = true
  })
  await wait()
  expect(queryAllByTestId('item').length).toBe(2)
  expect(queryAllByTestId('input').length).toBe(3)
  actions.setFieldState('container.0.bb', state => {
    state.visible = false
  })
  await wait()
  expect(queryAllByTestId('item').length).toBe(2)
  expect(queryAllByTestId('input').length).toBe(2)
  actions.setFieldState('container.0.aa', state => {
    state.value = '123'
  })
  await wait()
  expect(queryAllByTestId('item').length).toBe(2)
  expect(queryAllByTestId('input').length).toBe(3)
  actions.setFieldState('container.0.aa', state => {
    state.value = '321'
  })
  await wait()
  expect(queryAllByTestId('item').length).toBe(2)
  expect(queryAllByTestId('input').length).toBe(2)
  fireEvent.click(queryByText('Submit'))
  await wait()
  expect(submitHandler).toHaveBeenCalledWith({
    container: [
      {
        aa: '321',
        bb: undefined,
        [Symbol.for('@@__YOU_CAN_NEVER_REMOVE_ARRAY_UNIQUE_TAG__@@')]: 'container.0'
      },
      undefined
    ]
  })
})

test('dynamic remove field', async () => {
  const submitHandler = jest.fn()
  const validateFaildHandler = jest.fn()
  const TestComponent = () => {
    return (
      <SchemaForm
        onSubmit={submitHandler}
        onValidateFailed={validateFaildHandler}
      >
        <Fragment>
          <Field name="container" type="array" x-component="container">
            <Field name="object" type="object">
              <FormCard>
                <Field name="aa" required type="string" />
                <Field name="bb" required type="string" />
              </FormCard>
            </Field>
          </Field>
          <button type="submit">Submit</button>
        </Fragment>
      </SchemaForm>
    )
  }

  const { queryAllByTestId, queryByText } = render(<TestComponent />)
  await wait()
  fireEvent.click(queryByText('Add Field'))
  await wait()
  fireEvent.click(queryByText('Remove Field'))
  await wait()
  fireEvent.click(queryByText('Submit'))
  await wait()
  expect(submitHandler).toHaveBeenCalledTimes(1)
  expect(validateFaildHandler).toHaveBeenCalledTimes(0)
  fireEvent.click(queryByText('Add Field'))
  await wait()
  expect(queryAllByTestId('item').length).toBe(1)
  expect(queryAllByTestId('input').length).toBe(2)
  await wait()
  fireEvent.click(queryByText('Remove Field'))
  fireEvent.click(queryByText('Submit'))
  await wait()
  expect(submitHandler).toHaveBeenCalledTimes(2)
  expect(validateFaildHandler).toHaveBeenCalledTimes(0)
})

test('dynamic default value', async () => {
  const TestComponent = () => {
    return (
      <SchemaForm>
        <Field
          name="container"
          type="array"
          default={[{}]}
          x-component="container"
        >
          <Fragment>
            <Field name="object" type="object">
              <FormCard>
                <Field name="aa" required type="string" />
                <Field name="bb" required type="string" />
              </FormCard>
            </Field>
          </Fragment>
          <button type="submit">Submit</button>
        </Field>
      </SchemaForm>
    )
  }

  const { queryAllByTestId } = render(<TestComponent />)
  expect(queryAllByTestId('item').length).toBe(1)
  expect(queryAllByTestId('input').length).toBe(2)
})

test('invalid schema', async () => {
  const TestComponent = () => {
    const [schema, setSchema] = useState()
    useEffect(() => {
      setTimeout(() => {
        act(() => {
          setSchema({
            type: 'object',
            properties: {
              container: {
                type: 'array',
                default: [{}],
                'x-component': 'container',
                properties: {},
                items: {
                  type: 'object',
                  properties: {
                    aa: {
                      type: 'string'
                    },
                    bb: {
                      type: 'string'
                    }
                  }
                }
              }
            }
          })
        })
      }, 30)
    }, [])
    return (
      <SchemaForm initialValues={{}} schema={schema}>
        <button type="submit">Submit</button>
      </SchemaForm>
    )
  }
  const { queryByText, queryAllByTestId } = render(<TestComponent />)
  await sleep(33)
  fireEvent.click(queryByText('Add Field'))
  await wait()
  expect(queryAllByTestId('item').length).toBe(2)
  expect(queryAllByTestId('input').length).toBe(4)
})

test('dynamic change functions onChange/onReset/onSubmit/onValidateFailed', async () => {
  const actions = createFormActions()
  const TestComponent = () => {
    const [state, setState] = useState<{ [key: string]: string }>({
      testA: '123'
    })
    const constState = { ...state }
    useEffect(() => {
      setTimeout(() => {
        act(() => setState({ testA: `${Math.random()}` }))
      }, 10)
    }, [])
    return (
      <Fragment>
        <SchemaForm
          actions={actions}
          initialValues={constState}
          onChange={() => {
            if (constState.testA !== '123') {
              act(() => setState({ ...constState, testB: '456' }))
            }
          }}
          onReset={() => {
            if (constState.testA !== '123') {
              act(() => setState({ ...constState, testC: '456' }))
            }
          }}
          onSubmit={() => {
            if (constState.testA !== '123') {
              act(() => setState({ ...constState, testD: '456' }))
            }
          }}
          onValidateFailed={p => {
            if (constState.testA !== '123') {
              act(() => setState({ ...constState, testE: '456' }))
            }
          }}
        >
          <Fragment>
            <Field
              type="radio"
              enum={[
                { label: 'a1', value: 'a1' },
                { label: 'a2', value: 'a2' }
              ]}
              name="a"
            />
            <Field
              type="radio"
              enum={[
                { label: 'b1', value: 'b1' },
                { label: 'b2', value: 'b2' }
              ]}
              required
              name="b"
            />
            <button type="submit">Submit</button>
          </Fragment>
        </SchemaForm>
        <div>valueB-{constState.testB}</div>
        <div>valueC-{constState.testC}</div>
        <div>valueD-{constState.testD}</div>
        <div>valueE-{constState.testE}</div>
      </Fragment>
    )
  }
  const { queryByTestId, queryByText } = render(<TestComponent />)

  await sleep(30)
  fireEvent.click(queryByTestId('radio-a2'))
  await wait()
  expect(queryByText('valueB-456')).toBeVisible()
  actions.reset({ validate: false })
  await wait()
  expect(queryByText('valueC-456')).toBeVisible()
  fireEvent.click(queryByText('Submit'))
  await wait()
  expect(queryByText('valueE-456')).toBeVisible()
  fireEvent.click(queryByTestId('radio-b2'))
  fireEvent.click(queryByText('Submit'))
  await wait()
  expect(queryByText('valueD-456')).toBeVisible()
})

test('dynamic remove field and relationship needs to be retained', async () => {
  const TestComponent = () => {
    return (
      <SchemaForm
        initialValues={{
          container: [{ bb: '123' }, { bb: '123' }]
        }}
        effects={($, { setFieldState }) => {
          $('onFieldChange', 'container.*.bb').subscribe(
            async ({ value, name }) => {
              const siblingName = FormPath.transform(name, /\d+/, $d => {
                return `container.${$d}.aa`
              })
              await setFieldState(siblingName, state => {
                state.visible = value !== '123'
              })
            }
          )
        }}
      >
        <Fragment>
          <Field name="container" type="array" x-component="container">
            <Field name="object" type="object">
              <FormCard>
                <Field name="aa" required type="string" />
                <Field name="bb" required type="string" />
              </FormCard>
            </Field>
          </Field>
          <button type="submit">Submit</button>
        </Fragment>
      </SchemaForm>
    )
  }

  const { queryAllByTestId, queryByText, queryAllByText } = render(
    <TestComponent />
  )
  await wait()
  expect(queryAllByTestId('input').length).toBe(2)
  let removes
  await wait()
  removes = queryAllByText('Remove Field')
  fireEvent.click(removes[removes.length - 1])
  await wait()
  removes = queryAllByText('Remove Field')
  fireEvent.click(removes[removes.length - 1])
  await wait()
  expect(queryAllByTestId('input').length).toBe(0)
  await wait()
  fireEvent.click(queryByText('Add Field'))
  await wait()
  fireEvent.click(queryByText('Add Field'))
  await wait()
  expect(queryAllByTestId('input').length).toBe(2)
  expect(queryAllByTestId('input')[0].getAttribute('value')).toBe('123')
  expect(queryAllByTestId('input')[1].getAttribute('value')).toBe('123')
})

test('after deleting a component should not be sync an default value', async () => {
  const TestComponent = () => {
    return (
      <SchemaForm
        value={{
          container: [{ bb: '123' }, { bb: '123' }]
        }}
        effects={($, { setFieldState }) => {
          $('onFieldChange', 'container.*.bb').subscribe(({ value, name }) => {
            const siblingName = FormPath.transform(name, /\d+/, $d => {
              return `container.${$d}.aa`
            })
            setFieldState(siblingName, state => {
              state.visible = value === '123'
            })
          })
        }}
      >
        <Fragment>
          <Field name="container" type="array" x-component="container">
            <Field name="object" type="object">
              <Field name="aa" required type="string" />
              <Field name="bb" required type="string" />
            </Field>
          </Field>
          <button type="submit">Submit</button>
        </Fragment>
      </SchemaForm>
    )
  }

  const { queryAllByTestId, queryByText, queryAllByText } = render(
    <TestComponent />
  )
  await wait()
  expect(queryAllByTestId('input').length).toBe(4)
  let removes
  await wait()
  removes = queryAllByText('Remove Field')
  fireEvent.click(removes[removes.length - 1])
  await wait()
  removes = queryAllByText('Remove Field')
  fireEvent.click(removes[removes.length - 1])
  await wait()
  expect(queryAllByTestId('input').length).toBe(0)
  fireEvent.click(queryByText('Add Field'))
  fireEvent.click(queryByText('Add Field'))
  await wait()
  expect(queryAllByTestId('input').length).toBe(2)
  expect(queryAllByTestId('input')[0].getAttribute('value')).toBe('')
  expect(queryAllByTestId('input')[1].getAttribute('value')).toBe('')
})
