import React, { Fragment, useState } from 'react'
import {
  registerFormField,
  connect,
  FormPath,
  SchemaMarkupForm as SchemaForm,
  SchemaMarkupField as Field,
  createFormActions,
  registerFieldMiddleware
} from '../index'
import { toArr } from '@formily/shared'
import { render, wait, fireEvent, act } from '@testing-library/react'

registerFieldMiddleware(Field => {
  return props => {
    if (typeof props.editable === 'boolean' && props.name !== '') {
      if (!props.editable) return <div>empty</div>
    }
    return (
      <div>
        {props.schema.title}
        <Field {...props} />
        {props.errors && props.errors.length ? (
          <div data-testid={'test-errors'}>{props.errors}</div>
        ) : (
          ''
        )}
      </div>
    )
  }
})

beforeEach(() => {
  registerFormField(
    'string',
    connect()(props => <input {...props} value={props.value || ''} />)
  )
  registerFormField('array', props => {
    const { value, mutators, renderField } = props
    return (
      <Fragment>
        {toArr(value).map((item, index) => {
          return (
            <div data-testid="item" key={index}>
              {renderField(index)}
            </div>
          )
        })}
        <button
          type="button"
          onClick={() => {
            mutators.push({ aa: '' })
          }}
        >
          Add Field
        </button>
      </Fragment>
    )
  })
})

test('update editable by setFieldState', async () => {
  const actions = createFormActions()
  const TestComponent = () => (
    <SchemaForm
      actions={actions}
      effects={($, { setFieldState }) => {
        $('onFormInit').subscribe(() => {
          setFieldState('aaa', state => {
            state.props.title = 'text'
            state.rules = [
              {
                required: true,
                message: 'field is required'
              }
            ]
            state.editable = false
          })
        })
      }}
    >
      <Fragment>
        <Field name="aaa" type="string" />
        <button type="submit" data-testid="btn">
          Submit
        </button>
      </Fragment>
    </SchemaForm>
  )

  const { queryByText } = render(<TestComponent />)
  await wait()
  expect(queryByText('text')).toBeNull()
  actions.setFieldState('aaa', state => {
    state.editable = true
  })
  await wait()
  expect(queryByText('text')).toBeVisible()
})

test('update editable by setFieldState with initalState is not editable', async () => {
  const actions = createFormActions()
  const TestComponent = () => (
    <SchemaForm
      actions={actions}
      editable={false}
      effects={($, { setFieldState }) => {
        $('onFormInit').subscribe(() => {
          setFieldState('aaa', state => {
            state.props.title = 'text'
          })
        })
      }}
    >
      <Fragment>
        <Field name="aaa" type="string" />
        <button type="submit" data-testid="btn">
          Submit
        </button>
      </Fragment>
    </SchemaForm>
  )

  const { queryByText } = render(<TestComponent />)
  await wait()
  expect(queryByText('text')).toBeNull()
  actions.setFieldState('aaa', state => {
    state.editable = true
  })
  await wait()
  expect(queryByText('text')).toBeVisible()
})

test('update editable in controlled', async () => {
  let updateEditable
  const TestComponent = () => {
    const [editable, _updateEditable] = useState(true)
    updateEditable = _updateEditable
    return (
      <SchemaForm editable={editable}>
        <Field name="aaa" type="string" title="text" />
      </SchemaForm>
    )
  }

  const { queryByText } = render(<TestComponent />)
  await wait()
  expect(queryByText('text')).toBeVisible()
  act(() => updateEditable(false))
  await wait()
  expect(queryByText('text')).toBeNull()
  act(() => updateEditable(true))
  await wait()
  expect(queryByText('text')).toBeVisible()
})

test('editable with x-props', async () => {
  const actions = createFormActions()
  const TestComponent = () => {
    return (
      <SchemaForm actions={actions}>
        <Field
          name="aaa"
          x-props={{ editable: false }}
          type="string"
          title="text"
        />
      </SchemaForm>
    )
  }

  const { queryByText } = render(<TestComponent />)
  await wait()
  expect(queryByText('text')).toBeNull()
  actions.setFieldState('aaa', state => {
    state.editable = true
  })
  await wait()
  expect(queryByText('text')).toBeVisible()
})

test('editable with x-props in array field', async () => {
  const actions = createFormActions()
  const TestComponent = () => {
    return (
      <SchemaForm
        initialValues={{ array: [{ aa: '123123' }] }}
        actions={actions}
      >
        <Field type="array" name="array">
          <Field type="object">
            <Field
              name="aa"
              x-props={{ editable: false }}
              type="string"
              title="text"
            />
          </Field>
        </Field>
      </SchemaForm>
    )
  }

  const { queryByText } = render(<TestComponent />)
  await wait()
  expect(queryByText('empty')).toBeVisible()
  actions.setFieldState('array.0.aa', state => {
    state.editable = true
  })
  await wait()
  expect(queryByText('empty')).toBeNull()
})

test('editable with x-props is affected by global editable', async () => {
  const actions = createFormActions()
  const TestComponent = () => {
    return (
      <SchemaForm
        editable={false}
        initialValues={{ array: [{ aa: '123123' }] }}
        actions={actions}
      >
        <Field type="array" name="array" x-props={{ editable: true }}>
          <Field type="object" x-props={{ editable: true }}>
            <Field
              name="aa"
              x-props={{ editable: true }}
              type="string"
              title="text"
            />
          </Field>
        </Field>
      </SchemaForm>
    )
  }

  const { queryByText } = render(<TestComponent />)
  await wait()
  expect(queryByText('empty')).toBeNull()
  actions.setFieldState('array.0.aa', state => {
    state.editable = false
  })
  await wait()
  expect(queryByText('empty')).toBeVisible()
})

test('editable conflicts that global editable props with setFieldState', async () => {
  const TestComponent = () => {
    return (
      <SchemaForm
        editable={FormPath.match('*(!bbb)') as any}
        effects={($, { setFieldState }) => {
          $('onFieldChange', 'ccc').subscribe(() => {
            setFieldState('bbb', state => {
              state.editable = true
            })
          })
        }}
      >
        <Fragment>
          <Field
            type="string"
            name="aaa"
            x-props={{ 'data-testid': 'this is aaa' }}
          />
          <Field
            type="string"
            name="bbb"
            x-props={{ 'data-testid': 'this is bbb' }}
          />
          <Field
            type="string"
            name="ccc"
            x-props={{ 'data-testid': 'this is ccc' }}
          />
        </Fragment>
      </SchemaForm>
    )
  }

  const { queryByTestId } = render(<TestComponent />)
  await wait()
  expect(queryByTestId('this is aaa')).toBeVisible()
  expect(queryByTestId('this is bbb')).toBeVisible()
  expect(queryByTestId('this is ccc')).toBeVisible()
  fireEvent.change(queryByTestId('this is ccc'), { target: { value: '123' } })
  await wait()
  expect(queryByTestId('this is bbb')).toBeVisible()

  fireEvent.change(queryByTestId('this is ccc'), { target: { value: '321' } })
  await wait()
  expect(queryByTestId('this is bbb')).toBeVisible()
})

test('editable conflicts that props editable props with setFieldState', async () => {
  const TestComponent = () => {
    return (
      <SchemaForm
        effects={($, { setFieldState }) => {
          $('onFieldChange', 'ccc').subscribe(() => {
            setFieldState('bbb', state => {
              state.editable = true
            })
          })
        }}
      >
        <Fragment>
          <Field
            type="string"
            name="aaa"
            x-props={{ 'data-testid': 'this is aaa' }}
          />
          <Field
            type="string"
            name="bbb"
            editable={false}
            x-props={{ 'data-testid': 'this is bbb' }}
          />
          <Field
            type="string"
            name="ccc"
            x-props={{ 'data-testid': 'this is ccc' }}
          />
        </Fragment>
      </SchemaForm>
    )
  }

  const { queryByTestId } = render(<TestComponent />)
  await wait()
  expect(queryByTestId('this is aaa')).toBeVisible()
  expect(queryByTestId('this is bbb')).toBeVisible()
  expect(queryByTestId('this is ccc')).toBeVisible()
  fireEvent.change(queryByTestId('this is ccc'), { target: { value: '123' } })
  await wait()
  expect(queryByTestId('this is bbb')).toBeVisible()
  fireEvent.change(queryByTestId('this is ccc'), { target: { value: '321' } })
  await wait()
  expect(queryByTestId('this is bbb')).toBeVisible()
})

test('editable conflicts that x-props editable props with setFieldState', async () => {
  const TestComponent = () => {
    return (
      <SchemaForm
        effects={($, { setFieldState }) => {
          $('onFieldChange', 'ccc').subscribe(() => {
            setFieldState('bbb', state => {
              state.editable = true
            })
          })
        }}
      >
        <Fragment>
          <Field
            type="string"
            name="aaa"
            x-props={{ 'data-testid': 'this is aaa' }}
          />
          <Field
            type="string"
            name="bbb"
            x-props={{ 'data-testid': 'this is bbb', editable: false }}
          />
          <Field
            type="string"
            name="ccc"
            x-props={{ 'data-testid': 'this is ccc' }}
          />
        </Fragment>
      </SchemaForm>
    )
  }

  const { queryByTestId } = render(<TestComponent />)
  await wait()
  expect(queryByTestId('this is aaa')).toBeVisible()
  expect(queryByTestId('this is bbb')).toBeVisible()
  expect(queryByTestId('this is ccc')).toBeVisible()
  fireEvent.change(queryByTestId('this is ccc'), { target: { value: '123' } })
  await wait()
  expect(queryByTestId('this is bbb')).toBeVisible()
  fireEvent.change(queryByTestId('this is ccc'), { target: { value: '321' } })
  await wait()
  expect(queryByTestId('this is bbb')).toBeVisible()
})
