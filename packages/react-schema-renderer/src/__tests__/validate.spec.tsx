import React, { Fragment, useState, useEffect } from 'react'
import {
  registerFormField,
  connect,
  SchemaMarkupForm as SchemaForm,
  SchemaMarkupField as Field,
  createFormActions,
  registerFieldMiddleware,
  FormPath
} from '../index'
import '@testing-library/jest-dom/extend-expect'
import {
  render,
  fireEvent,
  wait,
  act,
  waitForElement,
  waitForDomChange
} from '@testing-library/react'

const sleep = timeout => {
  return new Promise(resolve => {
    setTimeout(resolve, timeout)
  })
}

registerFieldMiddleware(Field => {
  return props => {
    const index = props.schema['x-props'] && props.schema['x-props'].index
    return (
      <div>
        <Field {...props} />
        <div data-testid={`test-errors-${index}`}>{props.errors}</div>
      </div>
    )
  }
})
registerFormField(
  'string',
  connect()(props => (
    <input
      {...props}
      data-testid={`test-input${props.index ? '-' + props.index : ''}`}
      value={props.value || ''}
    />
  ))
)

test('setFieldState will trigger validate', async () => {
  const handleSubmit = jest.fn()
  const handleValidateFailed = jest.fn()
  const actions = createFormActions()
  const TestComponent = () => (
    <SchemaForm
      actions={actions}
      effects={$ => {
        $('onFieldChange', 'text-1').subscribe(({ value }) => {
          if (value) {
            actions.setFieldState('text-2', state => {
              state.value = value
            })
          }
        })
      }}
      onSubmit={handleSubmit}
      onValidateFailed={handleValidateFailed}
    >
      <Fragment>
        <Field name="text-1" type="string" x-props={{ index: 1 }} />
        <Field name="text-2" type="string" required x-props={{ index: 2 }} />
        <button type="submit" data-testid="btn">
          Submit
        </button>
      </Fragment>
    </SchemaForm>
  )

  const { getByTestId } = render(<TestComponent />)

  fireEvent.click(getByTestId('btn'))
  await wait()
  expect(handleSubmit).toHaveBeenCalledTimes(0)
  expect(handleValidateFailed).toHaveBeenCalledTimes(1)
  expect(getByTestId('test-errors-2')).toHaveTextContent(
    'This field is required'
  )
  fireEvent.change(getByTestId('test-input-1'), { target: { value: '123' } })
  await wait()
  expect(getByTestId('test-input-2')).toHaveAttribute('value', '123')
  expect(getByTestId('test-errors-2')).not.toHaveTextContent(
    'This field is required'
  )
})

test('basic validate', async () => {
  const handleSubmit = jest.fn()
  const handleValidateFailed = jest.fn()
  const TestComponent = () => (
    <SchemaForm onSubmit={handleSubmit} onValidateFailed={handleValidateFailed}>
      <Fragment>
        <Field name="text" type="string" required />
        <button type="submit" data-testid="btn">
          Submit
        </button>
      </Fragment>
    </SchemaForm>
  )

  const { getByTestId, getByText } = render(<TestComponent />)

  fireEvent.click(getByTestId('btn'))
  await wait()
  fireEvent.click(getByTestId('btn'))
  await wait()
  expect(handleSubmit).toHaveBeenCalledTimes(0)
  expect(handleValidateFailed).toHaveBeenCalledTimes(2)
  expect(getByText('This field is required')).toBeVisible()
})

test('object validate', async () => {
  const handleSubmit = jest.fn()
  const handleValidateFailed = jest.fn()
  const TestComponent = () => (
    <SchemaForm onSubmit={handleSubmit} onValidateFailed={handleValidateFailed}>
      <Fragment>
        <Field
          type="object"
          name="user"
          required={['username', 'age']}
        >
          <Field type="string" name="username" title="username" />
          <Field type="string" name="age" title="age" />
        </Field>
        <button type="submit" data-testid="btn">
          Submit
        </button>
      </Fragment>
    </SchemaForm>
  )

  const { getByTestId, findAllByText } = render(<TestComponent />)

  fireEvent.click(getByTestId('btn'))
  await wait()
  fireEvent.click(getByTestId('btn'))
  await wait()
  expect(handleSubmit).toHaveBeenCalledTimes(0)
  expect(handleValidateFailed).toHaveBeenCalledTimes(2)
  const errTexts = await findAllByText('This field is required')
  expect(errTexts).toHaveLength(2)
})

test('validate in init', async () => {
  const handleSubmit = jest.fn()
  const handleValidateFailed = jest.fn()
  const TestComponent = () => {
    const [state, setState] = useState<any>()
    useEffect(() => {
      act(() => {
        setState({
          text: ''
        })
      })
    }, [])
    return (
      <SchemaForm
        initialValues={state}
        onSubmit={handleSubmit}
        onValidateFailed={handleValidateFailed}
      >
        <Fragment>
          <Field name="text" type="string" x-rules={{ required: true }} />
          <button type="submit" data-testid="btn">
            Submit
          </button>
        </Fragment>
      </SchemaForm>
    )
  }
  let result
  act(() => {
    result = render(<TestComponent />)
  })
  await wait()
  const { queryByText } = result
  expect(queryByText('text is required')).toBeNull()
  fireEvent.click(queryByText('Submit'))
  await wait()
  expect(handleSubmit).toHaveBeenCalledTimes(0)
  expect(handleValidateFailed).toHaveBeenCalledTimes(1)
  expect(queryByText('This field is required')).toBeVisible()
})

test('validate in editable false', async () => {
  const handleSubmit = jest.fn()
  const handleValidateFailed = jest.fn()
  const actions = createFormActions()
  const TestComponent = () => {
    const [state, setState] = useState<any>()
    useEffect(() => {
      act(() => {
        setState({
          editable: ''
        })
      })
    }, [])
    return (
      <SchemaForm
        actions={actions}
        initialValues={state}
        editable={FormPath.match('editable') as any}
        onSubmit={handleSubmit}
        onValidateFailed={handleValidateFailed}
      >
        <Fragment>
          <Field name="editable" type="string" x-rules={{ required: true }} />
          <button type="submit" data-testid="btn">
            Submit
          </button>
        </Fragment>
      </SchemaForm>
    )
  }
  let result
  act(() => {
    result = render(<TestComponent />)
  })
  await wait()
  const { queryByText } = result
  expect(queryByText('editable is required')).toBeNull()
  fireEvent.click(queryByText('Submit'))
  await wait()
  expect(handleSubmit).toHaveBeenCalledTimes(0)
  expect(handleValidateFailed).toHaveBeenCalledTimes(1)
  expect(queryByText('This field is required')).toBeVisible()
  actions.setFieldState('editable', state => {
    state.value = '123'
  })
  await wait()
  fireEvent.click(queryByText('Submit'))
  await wait()
  expect(handleSubmit).toHaveBeenCalledTimes(1)
  expect(handleValidateFailed).toHaveBeenCalledTimes(1)
  expect(queryByText('editable is required')).toBeNull()
})

test('modify required rules by setFieldState', async () => {
  const actions = createFormActions()
  const handleSubmit = jest.fn()
  const handleValidateFailed = jest.fn()
  const TestComponent = () => {
    return (
      <SchemaForm
        actions={actions}
        onSubmit={handleSubmit}
        onValidateFailed={handleValidateFailed}
      >
        <Fragment>
          <Field name="kk" type="string" />
          <button type="submit" data-testid="btn">
            Submit
          </button>
        </Fragment>
      </SchemaForm>
    )
  }
  const { queryByText } = render(<TestComponent />)
  await wait()
  fireEvent.click(queryByText('Submit'))
  await wait()
  expect(handleSubmit).toBeCalledTimes(1)
  expect(handleValidateFailed).toBeCalledTimes(0)
  actions.setFieldState('kk', (state:any) => {
    state.props.required = true
  })
  await wait()
  fireEvent.click(queryByText('Submit'))
  await wait()
  expect(queryByText('This field is required')).toBeVisible()
  expect(handleSubmit).toBeCalledTimes(1)
  expect(handleValidateFailed).toBeCalledTimes(1)
  actions.setFieldState('kk', state => {
    state.required = false
  })
  await wait()
  fireEvent.click(queryByText('Submit'))
  await wait()
  expect(queryByText('This field is required')).toBeNull()
  expect(handleSubmit).toBeCalledTimes(2)
  expect(handleValidateFailed).toBeCalledTimes(1)
  actions.setFieldState('kk', state => {
    state.required = true
  })
  await wait()
  fireEvent.click(queryByText('Submit'))
  await wait()
  expect(queryByText('This field is required')).toBeVisible()
  expect(handleSubmit).toBeCalledTimes(2)
  expect(handleValidateFailed).toBeCalledTimes(2)
})

test('modify validate rules by setFieldState', async () => {
  const actions = createFormActions()
  const TestComponent = () => {
    return (
      <SchemaForm actions={actions}>
        <Fragment>
          <Field
            name="bb"
            type="string"
            x-rules={[{ required: true, message: 'required' }]}
          />
          <button type="submit" data-testid="btn">
            Submit
          </button>
        </Fragment>
      </SchemaForm>
    )
  }
  const { queryByText, queryByTestId } = render(<TestComponent />)
  await wait()
  fireEvent.click(queryByText('Submit'))
  await wait()
  expect(queryByText('required')).toBeVisible()
  actions.setFieldState('bb', state => {
    state.rules = [
      { required: true },
      {
        pattern: /^\d{6}$/,
        message: 'must have 6 numbers'
      }
    ]
  })
  await wait()
  fireEvent.change(queryByTestId('test-input'), {
    target: { value: '123' }
  })
  await wait()
  expect(queryByText('must have 6 numbers')).toBeVisible()
})

test('dynamic update values', async () => {
  const TestComponent = () => {
    return (
      <SchemaForm>
        <Fragment>
          <Field
            name="bb"
            type="string"
            x-rules={{ pattern: /\d+(\.\d+)?$/g, message: 'must be number' }}
          />
          <button type="submit" data-testid="btn">
            Submit
          </button>
        </Fragment>
      </SchemaForm>
    )
  }
  const { queryByTestId, queryByText } = render(<TestComponent />)
  await wait()
  fireEvent.change(queryByTestId('test-input'), {
    target: { value: '12332123' }
  })
  await wait()
  fireEvent.change(queryByTestId('test-input'), {
    target: { value: '12332123a' }
  })
  await wait()
  fireEvent.change(queryByTestId('test-input'), { target: { value: '123321' } })
  await wait()
  fireEvent.change(queryByTestId('test-input'), { target: { value: '12332' } })
  await wait()
  expect(queryByText('must be number')).toBeNull()
  fireEvent.change(queryByTestId('test-input'), { target: { value: '12332a' } })
  await wait()
  expect(queryByText('must be number')).toBeVisible()
})

test('test idcard rules', async () => {
  const TestComponent = () => {
    return (
      <SchemaForm>
        <Field name="idCard" type="string" x-rules="idcard" />
      </SchemaForm>
    )
  }
  const { queryByTestId, queryByText } = render(<TestComponent />)
  // 14位数字
  const value1 = '12345678912345'
  // 15位数字
  const value2 = '123456789123456'
  // 17位数字
  const value3 = '12345678912345678'
  // 17位数字+x
  const value4 = '12345678912345678x'
  // 17位数字+X
  const value5 = '12345678912345678X'
  // 18位数字
  const value6 = '123456789123456789'

  const element = await waitForElement(() => queryByTestId('test-input'))
  waitForDomChange({ container: element }).then(mutationsList => {
    const mutation = mutationsList[0]
    const { value } = mutation.target
    const errorTipsElement = queryByText('idCard is not an idcard format')
    if (value === value1 || value === value3) {
      expect(errorTipsElement).toBeVisible()
    } else {
      expect(errorTipsElement).toBeNull()
    }
  })
  fireEvent.change(element, { target: { value: value1 } })
  fireEvent.change(element, { target: { value: value2 } })
  fireEvent.change(element, { target: { value: value3 } })
  fireEvent.change(element, { target: { value: value4 } })
  fireEvent.change(element, { target: { value: value5 } })
  fireEvent.change(element, { target: { value: value6 } })
  await sleep(33)
})

test('dynamic switch visible', async () => {
  const TestComponent = () => {
    return (
      <SchemaForm
        initialValues={{ aa: '', bb: '' }}
        effects={($, { setFieldState }) => {
          $('onFieldChange', 'aa').subscribe(({ value }) => {
            setFieldState('bb', state => {
              state.visible = value == 'aa'
            })
          })
        }}
      >
        <Fragment>
          <Field name="aa" type="string" />
          <Field name="bb" type="string" required />
        </Fragment>
      </SchemaForm>
    )
  }
  const { queryAllByTestId, queryByText } = render(<TestComponent />)
  await wait()
  fireEvent.change(queryAllByTestId('test-input')[0], {
    target: { value: 'aa' }
  })
  await wait()
  fireEvent.change(queryAllByTestId('test-input')[0], {
    target: { value: 'bb' }
  })
  await wait()
  fireEvent.change(queryAllByTestId('test-input')[0], {
    target: { value: 'aa' }
  })
  await wait()
  expect(queryByText('bb is required')).toBeNull()
})

test('async validate prevent submit', async () => {
  const onSubmitHandler = jest.fn()
  const actions = createFormActions()
  const TestComponent = () => {
    return (
      <SchemaForm actions={actions} initialValues={{ aa: '' }} onSubmit={onSubmitHandler}>
        <Fragment>
          <Field
            name="aa"
            type="string"
            x-rules={val => {
              return new Promise(resolve => {
                setTimeout(() => {
                  if (val === '123') {
                    resolve('can not input 123')
                  } else {
                    resolve()
                  }
                }, 100)
              })
            }}
          />
          <button type="submit">Submit</button>
        </Fragment>
      </SchemaForm>
    )
  }
  const { queryByTestId, queryByText } = render(<TestComponent />)
  await wait()
  fireEvent.change(queryByTestId('test-input'), {
    target: { value: '444' }
  })
  await wait()
  fireEvent.click(queryByText('Submit'))
  fireEvent.click(queryByText('Submit'))
  fireEvent.click(queryByText('Submit'))
  await sleep(110)
  expect(queryByText('can not input 123')).toBeNull()
  expect(onSubmitHandler).toBeCalledTimes(1)
  fireEvent.change(queryByTestId('test-input'), {
    target: { value: '123' }
  })
  await wait()
  fireEvent.click(queryByText('Submit'))
  await sleep(110)
  expect(queryByText('can not input 123')).toBeVisible()
  expect(onSubmitHandler).toBeCalledTimes(1)
})

test('async validate side effect', async () => {
  const actions = createFormActions()
  const TestComponent = () => {
    return (
      <SchemaForm actions={actions}>
        <Fragment>
          <Field name="aa" type="string" required />
          <Field name="bb" type="string" required />
          <button
            onClick={e => {
              e.preventDefault()
              actions.reset({
                validate: false,
                forceClear: false
              })
            }}
          >
            Cancel
          </button>
        </Fragment>
      </SchemaForm>
    )
  }
  const { queryAllByTestId,queryAllByText, queryByText } = render(<TestComponent />)
  await wait()
  fireEvent.change(queryAllByTestId('test-input')[0], {
    target: { value: 'aaaaa' }
  })
  fireEvent.change(queryAllByTestId('test-input')[1], {
    target: { value: 'bbbbb' }
  })
  await wait()
  fireEvent.click(queryByText('Cancel'))
  await wait()
  expect(queryAllByText('This field is required').length).toEqual(0)
  fireEvent.change(queryAllByTestId('test-input')[0], {
    target: { value: 'aaaaa' }
  })
  await wait()
  expect(queryAllByText('This field is required').length).toEqual(0)
  await wait()
  fireEvent.change(queryAllByTestId('test-input')[0], {
    target: { value: '' }
  })
  await wait()
  expect(queryAllByText('This field is required').length).toEqual(1)
})

test('required support expression', async () => {
  const handleSubmit = jest.fn()
  const handleValidateFailed = jest.fn()
  const TestComponent = () => (
    <SchemaForm onSubmit={handleSubmit} onValidateFailed={handleValidateFailed}>
      <Fragment>
        <Field name="text" type="string" required="{{true}}" />
        <button type="submit" data-testid="btn">
          Submit
        </button>
      </Fragment>
    </SchemaForm>
  )

  const { getByTestId, getByText } = render(<TestComponent />)

  fireEvent.click(getByTestId('btn'))
  await wait()
  fireEvent.click(getByTestId('btn'))
  await wait()
  expect(handleSubmit).toHaveBeenCalledTimes(0)
  expect(handleValidateFailed).toHaveBeenCalledTimes(2)
  expect(getByText('This field is required')).toBeVisible()
})

test('rules support expression', async () => {
  const handleSubmit = jest.fn()
  const handleValidateFailed = jest.fn()
  const TestComponent = () => (
    <SchemaForm onSubmit={handleSubmit} onValidateFailed={handleValidateFailed}>
      <Fragment>
        <Field name="text" type="string" x-rules={{ required: "{{true}}"}} />
        <button type="submit" data-testid="btn">
          Submit
        </button>
      </Fragment>
    </SchemaForm>
  )

  const { getByTestId, getByText } = render(<TestComponent />)

  fireEvent.click(getByTestId('btn'))
  await wait()
  fireEvent.click(getByTestId('btn'))
  await wait()
  expect(handleSubmit).toHaveBeenCalledTimes(0)
  expect(handleValidateFailed).toHaveBeenCalledTimes(2)
  expect(getByText('This field is required')).toBeVisible()
})
