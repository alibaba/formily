import React, { useState } from 'react'
import { render, act, fireEvent } from '@testing-library/react'
import SchemaForm, {
  Field,
  registerFormField,
  connect,
  createFormActions,
  FormSlot
} from '../index'

registerFormField(
  'test-string',
  connect()(props => (
    <React.Fragment>
      <div data-testid="value">{props.value}</div>
      <div data-testid="type-value">{typeof props.value}</div>
    </React.Fragment>
  ))
)

registerFormField(
  'string',
  connect()(props => (
    <input data-testid="test-input" {...props} value={props.value || ''} />
  ))
)

registerFormField(
  'name-string',
  connect()(props => (
    <input
      data-testid={`test-input-${props.name}`}
      {...props}
      value={props.value || ''}
    />
  ))
)

test('default value', async () => {
  const Component = () => (
    <SchemaForm defaultValue={{ foo: '' }}>
      <Field name="foo" type="test-string" />
    </SchemaForm>
  )

  const { getByTestId } = render(<Component />)
  await sleep(33)
  expect(getByTestId('type-value').textContent).toEqual('string')
})

test('initialValues', async () => {
  const Component = () => (
    <SchemaForm initialValues={{ foo: '' }}>
      <Field name="foo" type="test-string" />
    </SchemaForm>
  )

  const { getByTestId } = render(<Component />)
  await sleep(33)
  expect(getByTestId('type-value').textContent).toEqual('string')
})

test('controlled initialValues', async () => {
  const actions = createFormActions()
  let outerSetState
  const Component = () => {
    const [state, setState] = useState({
      foo: '123'
    })
    outerSetState = values =>
      act(() => {
        setState(values)
      })
    return (
      <SchemaForm actions={actions} initialValues={state} value={state}>
        <Field name="foo" type="test-string" />
      </SchemaForm>
    )
  }

  const { getByTestId } = render(<Component />)
  await sleep(33)
  expect(getByTestId('type-value').textContent).toEqual('string')
  await actions.setFieldState('foo', state => {
    state.value = '321'
  })
  await actions.reset()
  await sleep(33)
  expect(getByTestId('value').textContent).toEqual('123')
  await actions.setFieldState('foo', state => {
    state.value = '321'
  })
  await sleep(33)
  act(() => {
    outerSetState({ foo: '123' })
  })
  await sleep(33)
  expect(getByTestId('value').textContent).toEqual('123')
  await sleep(33)
})

test('controlled with hooks by initalValues', async () => {
  const onChangeHandler = jest.fn()
  const actions = createFormActions()
  const Component = () => {
    const [total, setTotal] = useState(0)
    return (
      <div>
        <SchemaForm
          actions={actions}
          initialValues={{ a3: 123 }}
          effects={$ => {
            $('onFieldChange', 'a3').subscribe(onChangeHandler)
            $('onFieldChange', 'a3').subscribe(state => {
              act(() => {
                setTotal(state.value)
              })
            })
          }}
        >
          <Field type="string" name="a3" />
          <FormSlot>
            <div data-testid="inner-result">Total is:{total}</div>
          </FormSlot>
        </SchemaForm>
        <div data-testid="outer-result">Total is:{total}</div>
      </div>
    )
  }

  const { queryByTestId } = render(<Component />)
  expect(queryByTestId('outer-result').textContent).toEqual('Total is:123')
  expect(queryByTestId('inner-result').textContent).toEqual('Total is:123')
  fireEvent.change(queryByTestId('test-input'), { target: { value: '333' } })
  await sleep(33)
  expect(queryByTestId('outer-result').textContent).toEqual('Total is:333')
  expect(queryByTestId('inner-result').textContent).toEqual('Total is:333')
  expect(onChangeHandler).toHaveBeenCalledTimes(2)
  await actions.setFieldState('a3', state => {
    state.value = '456'
  })
  await sleep(33)
  expect(queryByTestId('test-input').value).toEqual('456')
  expect(queryByTestId('outer-result').textContent).toEqual('Total is:456')
  expect(queryByTestId('inner-result').textContent).toEqual('Total is:456')
  expect(onChangeHandler).toHaveBeenCalledTimes(3)
  await actions.reset()
  await sleep(33)
  expect(queryByTestId('test-input').value).toEqual('123')
  expect(queryByTestId('outer-result').textContent).toEqual('Total is:456')
  expect(queryByTestId('inner-result').textContent).toEqual('Total is:456')
  expect(onChangeHandler).toHaveBeenCalledTimes(3)
})

test('controlled with hooks by static value', async () => {
  const onChangeHandler = jest.fn()
  const actions = createFormActions()
  const Component = () => {
    const [total, setTotal] = useState(0)

    return (
      <div>
        <SchemaForm
          value={{ a3: 123 }}
          actions={actions}
          effects={$ => {
            $('onFieldChange', 'a3').subscribe(onChangeHandler)
            $('onFieldChange', 'a3').subscribe(state => {
              act(() => {
                setTotal(state.value)
              })
            })
          }}
        >
          <Field type="string" name="a3" />
          <FormSlot>
            <div data-testid="inner-result">Total is:{total}</div>
          </FormSlot>
        </SchemaForm>
        <div data-testid="outer-result">Total is:{total}</div>
      </div>
    )
  }

  const { queryByTestId } = render(<Component />)
  expect(queryByTestId('outer-result').textContent).toEqual('Total is:123')
  expect(queryByTestId('inner-result').textContent).toEqual('Total is:123')
  fireEvent.change(queryByTestId('test-input'), { target: { value: '333' } })
  await sleep(33)
  expect(queryByTestId('outer-result').textContent).toEqual('Total is:123')
  expect(queryByTestId('inner-result').textContent).toEqual('Total is:123')
  expect(onChangeHandler).toHaveBeenCalledTimes(3)
  actions.reset()
  await sleep(33)
  expect(queryByTestId('outer-result').textContent).toEqual('Total is:123')
  expect(queryByTestId('inner-result').textContent).toEqual('Total is:123')
  expect(onChangeHandler).toHaveBeenCalledTimes(3)
  await actions.setFieldState('a3', state => {
    state.value = '456'
  })
  await sleep(33)
  expect(queryByTestId('test-input').value).toEqual('123')
  expect(queryByTestId('outer-result').textContent).toEqual('Total is:123')
  expect(queryByTestId('inner-result').textContent).toEqual('Total is:123')
  expect(onChangeHandler).toHaveBeenCalledTimes(5)
  await actions.reset()
  await sleep(33)
  expect(queryByTestId('test-input').value).toEqual('')
  expect(queryByTestId('outer-result').textContent).toEqual('Total is:123')
  expect(queryByTestId('inner-result').textContent).toEqual('Total is:123')
  expect(onChangeHandler).toHaveBeenCalledTimes(5)
})

test('controlled with hooks by dynamic value', async () => {
  const onChangeHandler = jest.fn()
  const actions = createFormActions()
  const Component = () => {
    const [total, setTotal] = useState('123')

    return (
      <div>
        <SchemaForm
          value={{ a3: total }}
          actions={actions}
          effects={$ => {
            $('onFieldChange', 'a3').subscribe(onChangeHandler)
            $('onFieldChange', 'a3').subscribe(state => {
              act(() => {
                setTotal(state.value)
              })
            })
          }}
        >
          <Field type="string" name="a3" />
          <FormSlot>
            <div data-testid="inner-result">Total is:{total}</div>
          </FormSlot>
        </SchemaForm>
        <div data-testid="outer-result">Total is:{total}</div>
      </div>
    )
  }

  const { queryByTestId } = render(<Component />)
  expect(queryByTestId('outer-result').textContent).toEqual('Total is:123')
  expect(queryByTestId('inner-result').textContent).toEqual('Total is:123')
  fireEvent.change(queryByTestId('test-input'), { target: { value: '333' } })
  await sleep(33)
  expect(queryByTestId('outer-result').textContent).toEqual('Total is:333')
  expect(queryByTestId('inner-result').textContent).toEqual('Total is:333')
  expect(onChangeHandler).toHaveBeenCalledTimes(2)
  actions.reset()
  await sleep(33)
  expect(queryByTestId('test-input').value).toEqual('')
  expect(queryByTestId('outer-result').textContent).toEqual('Total is:333')
  expect(queryByTestId('inner-result').textContent).toEqual('Total is:333')
  expect(onChangeHandler).toHaveBeenCalledTimes(2)
  await actions.setFieldState('a3', state => {
    state.value = '456'
  })
  await sleep(33)
  expect(queryByTestId('test-input').value).toEqual('456')
  expect(queryByTestId('outer-result').textContent).toEqual('Total is:456')
  expect(queryByTestId('inner-result').textContent).toEqual('Total is:456')
  expect(onChangeHandler).toHaveBeenCalledTimes(3)
  await actions.reset()
  await sleep(33)
  expect(queryByTestId('test-input').value).toEqual('')
  expect(queryByTestId('outer-result').textContent).toEqual('Total is:456')
  expect(queryByTestId('inner-result').textContent).toEqual('Total is:456')
  expect(onChangeHandler).toHaveBeenCalledTimes(3)
})

test('invariant initialValues will not be changed when form rerender', async () => {
  const Component = () => {
    const [, setDisabled] = useState(false)

    return (
      <div>
        <SchemaForm
          initialValues={{ a1: 'a1' }}
          onSubmit={() => {
            act(setDisabled)
          }}
        >
          <Field type="name-string" x-props={{ name: 'a1' }} name="a1" />
          <Field
            type="name-string"
            name="a2"
            x-props={{ name: 'a2' }}
            default={'a2'}
          />
          <Field type="name-string" name="a3" x-props={{ name: 'a3' }} />
          <button type="submit">Click</button>
        </SchemaForm>
      </div>
    )
  }

  const { queryByTestId, queryByText } = render(<Component />)
  expect(queryByTestId('test-input-a1').value).toEqual('a1')
  expect(queryByTestId('test-input-a2').value).toEqual('a2')
  expect(queryByTestId('test-input-a3').value).toEqual('')

  fireEvent.click(queryByText('Click'))
  await sleep(33)

  expect(queryByTestId('test-input-a1').value).toEqual('a1')
  expect(queryByTestId('test-input-a2').value).toEqual('a2')
  expect(queryByTestId('test-input-a3').value).toEqual('')

  // 重新设置 SchemaForm Rerender
  fireEvent.click(queryByText('Click'))
  await sleep(33)

  expect(queryByTestId('test-input-a1').value).toEqual('a1')
  expect(queryByTestId('test-input-a2').value).toEqual('a2')
  expect(queryByTestId('test-input-a3').value).toEqual('')
})

test('submit with number name', async () => {
  const onSubmitHandler = jest.fn()
  const Component = () => {
    return (
      <SchemaForm onSubmit={onSubmitHandler}>
        <Field type="object" name="aaa">
          <Field name="bbb" type="string" />
        </Field>
        <button type="submit">Click</button>
      </SchemaForm>
    )
  }

  const { queryByTestId, queryByText } = render(<Component />)
  fireEvent.change(queryByTestId('test-input'), { target: { value: '333' } })
  fireEvent.click(queryByText('Click'))

  await sleep(33)
  expect(onSubmitHandler).toHaveBeenCalledWith({
    aaa: {
      bbb: '333'
    }
  })
})
