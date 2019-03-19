import React, { useState, Fragment } from 'react'
import SchemaForm, {
  Field,
  registerFormField,
  connect,
  registerFieldMiddleware,
  createFormActions
} from '../index'
import { render, act } from 'react-testing-library'
import { toArr } from '@uform/utils'

beforeEach(() => {
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
            <div data-testid={`test-errors`}>{props.errors}</div>
          ) : (
            ''
          )}
        </div>
      )
    }
  })
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
            <div data-testid='item' key={index}>
              {renderField(index)}
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
            state.props.editable = false
          })
        })
      }}
    >
      <Field name='aaa' type='string' />
      <button type='submit' data-testid='btn'>
        Submit
      </button>
    </SchemaForm>
  )

  const { queryByText } = render(<TestComponent />)

  await sleep(100)
  expect(queryByText('text')).toBeNull()
  await sleep(100)
  actions.setFieldState('aaa', state => {
    state.editable = true
  })
  await sleep(100)
  expect(queryByText('text')).toBeVisible()
})

test('update editable by setFieldState with initalState is not editable', async () => {
  const actions = createFormActions()
  const TestComponent = () => (
    <SchemaForm
      actions={actions}
      editable={name => {
        return false
      }}
      effects={($, { setFieldState }) => {
        $('onFormInit').subscribe(() => {
          setFieldState('aaa', state => {
            state.props.title = 'text'
          })
        })
      }}
    >
      <Field name='aaa' type='string' />
      <button type='submit' data-testid='btn'>
        Submit
      </button>
    </SchemaForm>
  )

  const { queryByText } = render(<TestComponent />)

  await sleep(100)
  expect(queryByText('text')).toBeNull()
  await sleep(100)
  actions.setFieldState('aaa', state => {
    state.editable = true
  })
  await sleep(100)
  expect(queryByText('text')).toBeVisible()
})

test('update editable in controlled', async () => {
  let updateEditable
  const TestComponent = () => {
    const [editable, _updateEditable] = useState(true)
    updateEditable = _updateEditable
    return (
      <SchemaForm editable={editable}>
        <Field name='aaa' type='string' title='text' />
      </SchemaForm>
    )
  }

  const { queryByText } = render(<TestComponent />)
  await sleep(100)
  expect(queryByText('text')).toBeVisible()
  act(() => updateEditable(false))
  await sleep(100)
  expect(queryByText('text')).toBeNull()
  act(() => updateEditable(true))
  await sleep(100)
  expect(queryByText('text')).toBeVisible()
})

test('editable with x-props', async () => {
  const actions = createFormActions()
  const TestComponent = () => {
    return (
      <SchemaForm actions={actions}>
        <Field
          name='aaa'
          x-props={{ editable: false }}
          type='string'
          title='text'
        />
      </SchemaForm>
    )
  }

  const { queryByText } = render(<TestComponent />)
  await sleep(100)
  expect(queryByText('text')).toBeNull()
  actions.setFieldState('aaa', state => {
    state.editable = true
  })
  await sleep(100)
  expect(queryByText('text')).toBeVisible()
})

test('editable with x-props in array field', async () => {
  const actions = createFormActions()
  const TestComponent = () => {
    return (
      <SchemaForm
        defaultValue={{ array: [{ aa: '123123' }] }}
        actions={actions}
      >
        <Field type='array' name='array'>
          <Field type='object'>
            <Field
              name='aa'
              x-props={{ editable: false }}
              type='string'
              title='text'
            />
          </Field>
        </Field>
      </SchemaForm>
    )
  }

  const { queryByText } = render(<TestComponent />)
  await sleep(100)
  expect(queryByText('empty')).toBeVisible()
  actions.setFieldState('array.0.aa', state => {
    state.editable = true
  })
  await sleep(100)
  expect(queryByText('empty')).toBeNull()
})

test('editable with x-props is affected by global editable', async () => {
  const actions = createFormActions()
  const TestComponent = () => {
    return (
      <SchemaForm
        editable={false}
        defaultValue={{ array: [{ aa: '123123' }] }}
        actions={actions}
      >
        <Field type='array' name='array' x-props={{ editable: true }}>
          <Field type='object' x-props={{ editable: true }}>
            <Field
              name='aa'
              x-props={{ editable: true }}
              type='string'
              title='text'
            />
          </Field>
        </Field>
      </SchemaForm>
    )
  }

  const { queryByText } = render(<TestComponent />)
  await sleep(100)
  expect(queryByText('empty')).toBeNull()
  actions.setFieldState('array.0.aa', state => {
    state.editable = false
  })
  await sleep(100)
  expect(queryByText('empty')).toBeVisible()
})
