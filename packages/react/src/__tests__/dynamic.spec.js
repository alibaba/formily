import React, { Fragment, useEffect, useState } from 'react'
import SchemaForm, {
  Field,
  registerFormField,
  connect,
  FormPath,
  createFormActions,
  createVirtualBox
} from '../index'
import { toArr } from '@uform/utils'
import { render, fireEvent, act } from 'react-testing-library'

let FormCard

beforeEach(() => {
  registerFormField(
    'string',
    connect()(props => (
      <input data-testid='input' {...props} value={props.value || ''} />
    ))
  )

  registerFormField('container', props => {
    const { value, mutators, renderField } = props
    return (
      <Fragment>
        {toArr(value).map((item, index) => {
          return (
            <div data-testid='item' key={index}>
              {renderField(index)}
              <button
                type='button'
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
          type='button'
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

          $('onFieldChange', FormPath.match('container.*.aa')).subscribe(
            state => {
              if (state.value === '123') {
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
        <Field name='container' type='array' x-component='container'>
          <Field name='object' type='object'>
            <Field name='aa' type='string' />
            <Field name='bb' type='string' />
          </Field>
        </Field>
      </SchemaForm>
    )
  }

  const { queryAllByTestId, queryByText } = render(<TestComponent />)
  await sleep(33)
  fireEvent.click(queryByText('Add Field'))
  await sleep(33)
  expect(queryAllByTestId('item').length).toBe(1)
  expect(queryAllByTestId('input').length).toBe(1)
  actions.setFieldState('container.0.bb', state => {
    state.visible = true
  })
  await sleep(33)
  expect(queryAllByTestId('item').length).toBe(1)
  expect(queryAllByTestId('input').length).toBe(2)
  actions.setFieldState('container.0.bb', state => {
    state.visible = false
  })
  await sleep(33)
  expect(queryAllByTestId('item').length).toBe(1)
  expect(queryAllByTestId('input').length).toBe(1)
  actions.setFieldState('container.0.aa', state => {
    state.value = '123'
  })
  await sleep(33)
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
        <Field name='container' type='array' x-component='container'>
          <Field name='object' type='object'>
            <Field name='aa' type='string' />
            <Field name='bb' type='string' />
          </Field>
        </Field>
      </SchemaForm>
    )
  }

  const { queryAllByTestId, queryByText } = render(<TestComponent />)
  await sleep(100)
  expect(queryAllByTestId('item').length).toBe(1)
  expect(queryAllByTestId('input').length).toBe(1)
  fireEvent.click(queryByText('Add Field'))
  await sleep(33)
  expect(queryAllByTestId('item').length).toBe(2)
  expect(queryAllByTestId('input').length).toBe(2)
  actions.setFieldState('container.0.bb', state => {
    state.visible = true
  })
  await sleep(33)
  expect(queryAllByTestId('item').length).toBe(2)
  expect(queryAllByTestId('input').length).toBe(3)
  actions.setFieldState('container.0.bb', state => {
    state.visible = false
  })
  await sleep(33)
  expect(queryAllByTestId('item').length).toBe(2)
  expect(queryAllByTestId('input').length).toBe(2)
  actions.setFieldState('container.0.aa', state => {
    state.value = '123'
  })
  await sleep(33)
  expect(queryAllByTestId('item').length).toBe(2)
  expect(queryAllByTestId('input').length).toBe(3)
  actions.setFieldState('container.0.aa', state => {
    state.value = '321'
  })
  await sleep(33)
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
        initialValues={{ container: [{ aa: '', bb: '' }] }}
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
        <Field name='container' type='array' x-component='container'>
          <Field name='object' type='object'>
            <FormCard>
              <Field name='aa' type='string' />
              <Field name='bb' type='string' />
            </FormCard>
          </Field>
        </Field>
        <button type='submit'>Submit</button>
      </SchemaForm>
    )
  }

  const { queryAllByTestId, queryAllByText, queryByText } = render(
    <TestComponent />
  )
  await sleep(100)
  expect(queryAllByTestId('item').length).toBe(1)
  expect(queryAllByTestId('input').length).toBe(1)
  fireEvent.click(queryByText('Add Field'))
  await sleep(33)
  expect(queryAllByTestId('item').length).toBe(2)
  expect(queryAllByTestId('input').length).toBe(2)
  actions.setFieldState('container.0.bb', state => {
    state.visible = true
  })
  await sleep(33)
  expect(queryAllByTestId('item').length).toBe(2)
  expect(queryAllByTestId('input').length).toBe(3)
  actions.setFieldState('container.0.bb', state => {
    state.visible = false
  })
  await sleep(33)
  expect(queryAllByTestId('item').length).toBe(2)
  expect(queryAllByTestId('input').length).toBe(2)
  actions.setFieldState('container.0.aa', state => {
    state.value = '123'
  })
  await sleep(33)
  expect(queryAllByTestId('item').length).toBe(2)
  expect(queryAllByTestId('input').length).toBe(3)
  actions.setFieldState('container.0.aa', state => {
    state.value = '321'
  })
  await sleep(33)
  expect(queryAllByTestId('item').length).toBe(2)
  expect(queryAllByTestId('input').length).toBe(2)
  fireEvent.click(queryAllByText('Submit')[1])
  await sleep(100)
  expect(submitHandler).toHaveBeenCalledWith({
    container: [{ aa: '321' }, undefined]
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
        <Field name='container' type='array' x-component='container'>
          <Field name='object' type='object'>
            <FormCard>
              <Field name='aa' required type='string' />
              <Field name='bb' required type='string' />
            </FormCard>
          </Field>
        </Field>
        <button type='submit'>Submit</button>
      </SchemaForm>
    )
  }

  const { queryAllByTestId, queryAllByText, queryByText } = render(
    <TestComponent />
  )
  await sleep(33)
  fireEvent.click(queryByText('Add Field'))
  await sleep(33)
  fireEvent.click(queryByText('Remove Field'))
  await sleep(33)
  fireEvent.click(queryAllByText('Submit')[1])
  await sleep(33)
  expect(submitHandler).toHaveBeenCalledTimes(1)
  expect(validateFaildHandler).toHaveBeenCalledTimes(0)
  await sleep(33)
  fireEvent.click(queryByText('Add Field'))
  await sleep(33)
  expect(queryAllByTestId('item').length).toBe(1)
  expect(queryAllByTestId('input').length).toBe(2)
  await sleep(33)
  fireEvent.click(queryByText('Remove Field'))
  await sleep(33)
  fireEvent.click(queryAllByText('Submit')[1])
  await sleep(33)
  expect(submitHandler).toHaveBeenCalledTimes(2)
  expect(validateFaildHandler).toHaveBeenCalledTimes(0)
})

test('dynamic default value', async () => {
  const TestComponent = () => {
    return (
      <SchemaForm>
        <Field
          name='container'
          type='array'
          default={[{}]}
          x-component='container'
        >
          <Field name='object' type='object'>
            <FormCard>
              <Field name='aa' required type='string' />
              <Field name='bb' required type='string' />
            </FormCard>
          </Field>
        </Field>
        <button type='submit'>Submit</button>
      </SchemaForm>
    )
  }

  const { queryAllByTestId } = render(<TestComponent />)
  await sleep(33)
  expect(queryAllByTestId('item').length).toBe(1)
  expect(queryAllByTestId('input').length).toBe(2)
})

test('dynamic async default value', async () => {
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
      }, 33)
    }, [])
    return (
      <SchemaForm schema={schema}>
        <button type='submit'>Submit</button>
      </SchemaForm>
    )
  }
  const { queryAllByTestId } = render(<TestComponent />)
  await sleep(100)
  expect(queryAllByTestId('item').length).toBe(1)
  expect(queryAllByTestId('input').length).toBe(2)
})
