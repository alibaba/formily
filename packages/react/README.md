# @uform/react

> @uform/react is based on `react` and @uform/core is already built in. It provide API to manuplate form state and components for rendering support.
> it mainly includes:
>
> - Form
> - Field
> - VirtualField
> - FormaSpy
> - FormProvider
> - FormConsumer(deprecated，pls using FormSpy)
> - createFormActions (create sync API to manuplate form state)
> - createAsyncFormActions (create async API to manuplate form state)
> - FormEffectHooks (LifeCycles Hook)

### Install

```bash
npm install --save @uform/react
```

### Table Of Contents

<!-- toc -->

- [`Usage`](#Usage)
  - [`Quick Start`](#Quick-Start)
  - [`Basic Field`](#Basic-Field)
  - [`Validation`](#Validation)
  - [`Object Field`](#Object-Field)
  - [`ArrayField`](#ArrayField)
  - [`ArrayField<Object>`](#ArrayField<Object>)
  - [`Combo`](#Combo)
  - [`Provide and FormSpy`](#Provide-and-FormSpy)
- [Components](#components)
  - [`Form`](#Form)
  - [`Field`](#Field)
  - [`VirtualField`](#VirtualField)
  - [`FormSpy`](#FormSpy)
  - [`FormProvider`](#FormProvider)
  - [`FormConsumer(deprecated，pls using FormSpy)`](<#FormConsumer(deprecated，pls-using-FormSpy)>)
- [API](#API)
  - [`createFormActions`](#createFormActions)
  - [`createAsyncFormActions`](#createAsyncFormActions)
  - [`FormEffectHooks`](#FormEffectHooks)
  - [`createEffectHook`](#createEffectHook)
- [Interfaces](#Interfaces)
  - [`IFormActions`](#IFormActions)
  - [`IFormAsyncActions`](#IFormAsyncActions)
  - [`IFieldState`](#IFieldState)
  - [`IVirtualFieldState`](#IVirtualFieldState)
  - [`SyncValidateResponse`](#SyncValidateResponse)
  - [`AsyncValidateResponse`](#AsyncValidateResponse)
  - [`ValidateResponse`](#ValidateResponse)
  - [`InternalFormats`](#InternalFormats)
  - [`CustomValidator`](#CustomValidator)
  - [`ValidateDescription`](#ValidateDescription)
  - [`ValidateArrayRules`](#ValidateArrayRules)
  - [`ValidatePatternRules`](#ValidatePatternRules)

### Usage

---

#### Quick Start

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import {
  Form,
  Field,
  FormPath,
  createFormActions,
  FormSpy,
  FormProvider,
  FormConsumer,
  FormEffectHooks
} from './src'

const { onFormInit$, onFormInputChange$, onFieldInputChange$ } = FormEffectHooks
const actions = createFormActions()
const App = () => {
  return (
    <Form
      actions={actions}
      effects={() => {
        onFormInit$().subscribe(() => {
          console.log('initialized')
        })
        onFieldInputChange$().subscribe(state => {
          console.log('field change', state)
        })
      }}
      onChange={() => {}}
    >
      <React.Fragment>
        <label>username: </label>
        <Field name="username">
          {({ state, mutators }) => (
            <React.Fragment>
              <input
                disabled={!state.editable}
                value={state.value || ''}
                onChange={mutators.change}
                onBlur={mutators.blur}
                onFocus={mutators.focus}
              />
              {state.errors}
              {state.warnings}
            </React.Fragment>
          )}
        </Field>
      </React.Fragment>
    </Form>
  )
}
ReactDOM.render(<App />, document.getElementById('root'))
```

#### Basic Field

Example：Show you how to bind the `<input>` field and subsequent examples are based on this field

```tsx
const InputField = props => (
  <Field {...props}>
    {({ state, mutators }) => (
      <div>
        <input
          disabled={!state.editable}
          value={state.value || ''}
          onChange={mutators.change}
          onBlur={mutators.blur}
          onFocus={mutators.focus}
        />
        {state.errors}
        {state.warnings}
      </div>
    )}
  </Field>
)
```

#### Validation

Example：required validation + error type validation + warning type validation + custom validation
The type of rules is [ValidatePatternRules](#ValidatePatternRules) which is [InternalFormats](#InternalFormats) | [CustomValidator](#CustomValidator) | [ValidateDescription](#ValidateDescription) | [ValidateArrayRules](#ValidateArrayRules)

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { Form, Field, createFormActions } from './src'

const actions = createFormActions()
const InputField = props => (
  <Field {...props}>
    {({ state, mutators }) => (
      <React.Fragment>
        <input
          disabled={!state.editable}
          value={state.value || ''}
          onChange={mutators.change}
          onBlur={mutators.blur}
          onFocus={mutators.focus}
        />
        <span style={{ color: 'red' }}>{state.errors}</span>
        <span style={{ color: 'orange' }}>{state.warnings}</span>
      </React.Fragment>
    )}
  </Field>
)

const App = () => {
  return (
    <Form actions={actions}>
      <h5>required validation</h5>
      <span>username</span>
      <InputField name="username" required />

      <h5>error type validation</h5>
      <span>age</span>
      <InputField
        name="age"
        rules={[
          val =>
            val === undefiend
              ? { type: 'error', message: 'age is required' }
              : undefined
        ]}
      />

      <h5>warning type validation</h5>
      <span>gender</span>
      <InputField
        name="gender"
        rules={[
          val =>
            val === undefiend
              ? { type: 'warning', message: 'gender is required' }
              : undefined
        ]}
      />

      <h5>built-in validation default to error type validation</h5>
      <span>id</span>
      <InputField
        name="id"
        rules={[
          {
            format: 'number',
            message: 'id is not a number.'
          }
        ]}
      />

      <h5>custom validation</h5>
      <span>verifyCode</span>
      <InputField
        name="verifyCode"
        rules={[
          {
            validator(value) {
              return value === undefiend
                ? 'This field can not be empty, please enter {{scope.outerVariable}}'
                : undefined
            },
            scope: {
              outerVariable: '456'
            }
          },

          {
            validator(value) {
              return value === '456'
                ? { type: 'error', message: 'This field can not be 456' }
                : undefined
            }
          }
        ]}
      />

      <div>
        <button
          onClick={() => {
            const result = actions.validate()
            console.log(actions.getFormState(state => state.values))
            result.then(validateResp => {
              console.log(validateResp)
            })
          }}
        >
          validate
        </button>
      </div>
    </Form>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
```

#### Object Field

Example：User info `user(username, age)`

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { Form, Field, createFormActions } from './src'

const actions = createFormActions()
const InputField = props => (
  <Field {...props}>
    {({ state, mutators }) => (
      <React.Fragment>
        <input
          disabled={!state.editable}
          value={state.value || ''}
          onChange={mutators.change}
          onBlur={mutators.blur}
          onFocus={mutators.focus}
        />
        <span style={{ color: 'red' }}>{state.errors}</span>
        <span style={{ color: 'orange' }}>{state.warnings}</span>
      </React.Fragment>
    )}
  </Field>
)

const App = () => {
  return (
    <Form actions={actions}>
      <span>user</span>
      <Field
        name="user"
        initialValue={{
          username: undefined,
          age: undefined
        }}
      >
        {({ state, mutators }) => {
          return (
            <React.Fragment>
              {Object.keys(state.value).map(key => {
                if (!mutators.exist(key)) return

                return (
                  <div key={key}>
                    <span>{key}</span>
                    <InputField name={`user.${key}`} />
                    <button
                      onClick={() => {
                        mutators.remove(key)
                      }}
                    >
                      x
                    </button>
                  </div>
                )
              })}
              <button
                onClick={() => {
                  mutators.change({
                    ...state.value,
                    [new Date().getTime()]: new Date().getTime()
                  })
                }}
              >
                +
              </button>
              <button
                onClick={() => {
                  console.log(
                    'values',
                    actions.getFormState(state => state.values)
                  )
                }}
              >
                print
              </button>
            </React.Fragment>
          )
        }}
      </Field>
    </Form>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
```

#### ArrayField

Example：Id list

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { Form, Field, createFormActions } from './src'

const actions = createFormActions()
const InputField = props => (
  <Field {...props}>
    {({ state, mutators }) => (
      <React.Fragment>
        <input
          disabled={!state.editable}
          value={state.value || ''}
          onChange={mutators.change}
          onBlur={mutators.blur}
          onFocus={mutators.focus}
        />
        <span style={{ color: 'red' }}>{state.errors}</span>
        <span style={{ color: 'orange' }}>{state.warnings}</span>
      </React.Fragment>
    )}
  </Field>
)

const App = () => {
  return (
    <Form actions={actions}>
      <Field name="idList" initialValue={['1', '2', '3']}>
        {({ state, mutators }) => {
          return (
            <React.Fragment>
              {state.value.map((item, index) => {
                return (
                  <div key={index}>
                    <InputField name={`idList[${index}]`} />
                    <button onClick={() => mutators.remove(index)}>
                      Remove
                    </button>
                  </div>
                )
              })}
              <button onClick={() => mutators.push()}>Add Item</button>
            </React.Fragment>
          )
        }}
      </Field>
    </Form>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
```

#### ArrayField&lt;Object&gt;

Example：User list

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { Form, Field, createFormActions } from './src'

const actions = createFormActions()
const InputField = props => (
  <Field {...props}>
    {({ state, mutators }) => (
      <React.Fragment>
        <input
          disabled={!state.editable}
          value={state.value || ''}
          onChange={mutators.change}
          onBlur={mutators.blur}
          onFocus={mutators.focus}
        />
        <span style={{ color: 'red' }}>{state.errors}</span>
        <span style={{ color: 'orange' }}>{state.warnings}</span>
      </React.Fragment>
    )}
  </Field>
)

const App = () => {
  return (
    <Form actions={actions}>
      <Field
        name="userList"
        initialValue={[
          { username: 'bobby', age: 21 },
          { username: 'lily', age: 20 }
        ]}
      >
        {({ state, mutators }) => {
          return (
            <React.Fragment>
              {state.value.map((item, index) => {
                return (
                  <div key={index}>
                    <Field name={`userList[${index}]`} initialValue={{}}>
                      {({ state: innerState, mutators: innerMutator }) => {
                        return (
                          <React.Fragment>
                            {Object.keys(innerState.value).map(key => {
                              if (!innerMutator.exist(key)) return
                              return (
                                <React.Fragment key={key}>
                                  <InputField
                                    name={`userList[${index}].${key}`}
                                  />
                                  <button
                                    onClick={() => {
                                      innerMutator.remove(key)
                                    }}
                                  >
                                    x
                                  </button>
                                </React.Fragment>
                              )
                            })}
                            <button
                              onClick={() => {
                                innerMutator.change({
                                  ...innerState.value,
                                  [new Date().getTime()]: new Date().getTime()
                                })
                              }}
                            >
                              +
                            </button>
                          </React.Fragment>
                        )
                      }}
                    </Field>

                    <button onClick={() => mutators.remove(index)}>
                      Remove
                    </button>
                  </div>
                )
              })}
              <button
                onClick={() =>
                  mutators.push({
                    username: undefined,
                    age: undefined
                  })
                }
              >
                Add Item
              </button>
              <button
                onClick={() =>
                  console.log(actions.getFormState(state => state.values))
                }
              >
                print
              </button>
            </React.Fragment>
          )
        }}
      </Field>
    </Form>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
```

#### Combo

Example：Combo value of username and age. Check [FormSpy](#FormSpy) for more inforation.

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { Form, Field, createFormActions, FormSpy } from './src'

const actions = createFormActions()
const InputField = props => (
  <Field {...props}>
    {({ state, mutators }) => (
      <React.Fragment>
        <input
          disabled={!state.editable}
          value={state.value || ''}
          onChange={mutators.change}
          onBlur={mutators.blur}
          onFocus={mutators.focus}
        />
        <span style={{ color: 'red' }}>{state.errors}</span>
        <span style={{ color: 'orange' }}>{state.warnings}</span>
      </React.Fragment>
    )}
  </Field>
)

const App = () => {
  return (
    <Form actions={actions}>
      <label>username</label>
      <InputField name="username" />
      <label>age</label>
      <InputField name="age" />
      <FormSpy>
        {({ state, form }) => {
          return (
            <div>
              name: {form.getFieldValue('username')}
              <br />
              age: {form.getFieldValue('age')}
            </div>
          )
        }}
      </FormSpy>
    </Form>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
```

#### Provide and FormSpy

```typescript
Dictionary
--app
  |---components
  |---customForm
```

Example：Cross-file consumption form state, Check [FormProvider](#FormProvider) and [FormSpy](#FormSpy) for more infomation.

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { Form, Field, createFormActions, FormSpy, FormProvider } from './src'

const actions = createFormActions()
const InputField = props => (
  <Field {...props}>
    {({ state, mutators }) => (
      <React.Fragment>
        <input
          disabled={!state.editable}
          value={state.value || ''}
          onChange={mutators.change}
          onBlur={mutators.blur}
          onFocus={mutators.focus}
        />
        <span style={{ color: 'red' }}>{state.errors}</span>
        <span style={{ color: 'orange' }}>{state.warnings}</span>
      </React.Fragment>
    )}
  </Field>
)

const CustomForm = () => {
  return (
    <Form actions={actions}>
      <label>username</label>
      <InputField name="username" />
      <label>age</label>
      <InputField name="age" />
    </Form>
  )
}

const App = () => {
  return (
    <FormProvider>
      <CustomForm />
      <FormSpy>
        {({ state, form }) => {
          return (
            <div>
              name: {form.getFieldValue('username')}
              <br />
              age: {form.getFieldValue('age')}
            </div>
          )
        }}
      </FormSpy>
    </FormProvider>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
```

### Components

---

#### Form

> `<Form>` Props

```typescript
interface IFormProps {
  // Form value
  value?: any
  defaultValue?: any // Form initial value
  initialValues?: any
  // formAPI
  actions?: IFormActions | IFormAsyncActions
  // effect
  effects?: IFormEffect<any, IFormActions | IFormAsyncActions>
  // IForm instance
  form?: IForm // Form change event callback
  onChange?: (values: Value) => void // Form submission event callback
  onSubmit?: (values: Value) => void | Promise<Value> // Form reset event callback
  onReset?: () => void // Form verification failure event callback
  onValidateFailed?: (valideted: IFormValidateResult) => void
  children?: React.ReactElement | ((form: IForm) => React.ReactElement)
  // Whether to use the dirty check, the default will go immer accurate update
  useDirty?: boolean
  // Is it editable, overall control in the Form dimension
  editable?: boolean
  // Whether to go pessimistic check, stop the subsequent check when the first check fails
  validateFirst?: boolean
}
```

#### Field

> `<Field>` Props

```typescript
interface IFieldStateUIProps {
  // Node path
  path?: FormPathPattern // Node path
  nodePath?: FormPathPattern // Data path
  dataPath?: FormPathPattern // Data path
  name?: string // Field value, is equal to values[0]
  value?: any // Field multi-parameter value, such as when the field onChange trigger, the event callback passed multi-parameter data, then the value of all parameters will be stored here
  values?: any[] // Initial value
  initialValue?: any // field extension properties
  props?: FieldProps // Check the rules, the specific type description refers to the following documents
  rules?: ValidatePatternRules[] // Is it required?
  required?: boolean // Is it editable?
  editable?: boolean // Whether to use the dirty check, the default will go immer accurate update
  useDirty?: boolean
  // Field state calculation container, mainly used to extend the core linkage rules
  computeState?: (draft: IFieldState, prevState: IFieldState) => void
  // type of trigger validation
  triggerType?: 'onChange' | 'onBlur'
  // get value from browser event(eg. e.target.value)
  getValueFromEvent?: (...args: any[]) => any
  children?: React.ReactElement | ((api: IFieldAPI) => React.ReactElement)
}
```

**Usage**

Example：All type of field

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { Form, Field, createFormActions } from './src'

const actions = createFormActions()
const InputField = props => (
  <Field {...props}>
    {({ state, mutators }) => (
      <React.Fragment>
        <input
          disabled={!state.editable}
          value={state.value || ''}
          onChange={mutators.change}
          onBlur={mutators.blur}
          onFocus={mutators.focus}
        />
        <span style={{ color: 'red' }}>{state.errors}</span>
        <span style={{ color: 'orange' }}>{state.warnings}</span>
      </React.Fragment>
    )}
  </Field>
)

const App = () => {
  return (
    <Form actions={actions}>
      <div>
        <h5>Basic Field</h5>
        <Field name="id">
          {({ state, mutator }) => {
            return <input value={state.value} onChange={mutator} />
          }}
        </Field>
      </div>

      <div>
        <h5>Object Field</h5>
        <Field
          name="user"
          initialValue={{
            username: undefined,
            age: undefined
          }}
        >
          {({ state, mutators }) => {
            return (
              <React.Fragment>
                {Object.keys(state.value).map(key => {
                  if (!mutators.exist(key)) return

                  return (
                    <div key={key}>
                      <span>{key}</span>
                      <InputField name={`user.${key}`} />
                      <button
                        onClick={() => {
                          mutators.remove(key)
                        }}
                      >
                        x
                      </button>
                    </div>
                  )
                })}
                <button
                  onClick={() => {
                    mutators.change({
                      ...state.value,
                      [new Date().getTime()]: new Date().getTime()
                    })
                  }}
                >
                  +
                </button>
              </React.Fragment>
            )
          }}
        </Field>
      </div>

      <div>
        <h5>ArrayField Field</h5>
        <Field name="idList" initialValue={['1', '2', '3']}>
          {({ state, mutators }) => {
            return (
              <React.Fragment>
                {state.value.map((item, index) => {
                  return (
                    <div key={index}>
                      <InputField name={`idList[${index}]`} />
                      <button onClick={() => mutators.remove(index)}>
                        Remove
                      </button>
                    </div>
                  )
                })}
                <button onClick={() => mutators.push()}>Add Item</button>
              </React.Fragment>
            )
          }}
        </Field>
      </div>

      <div>
        <h5>ArrayObject Field</h5>
        <Field
          name="userList"
          initialValue={[
            { username: 'bobby', age: 21 },
            { username: 'lily', age: 20 }
          ]}
        >
          {({ state, mutators }) => {
            return (
              <React.Fragment>
                {state.value.map((item, index) => {
                  return (
                    <div key={index}>
                      <Field name={`userList[${index}]`} initialValue={{}}>
                        {({ state: innerState, mutators: innerMutator }) => {
                          return (
                            <React.Fragment>
                              {Object.keys(innerState.value).map(key => {
                                if (!innerMutator.exist(key)) return
                                return (
                                  <React.Fragment key={key}>
                                    <InputField
                                      name={`userList[${index}].${key}`}
                                    />
                                    <button
                                      onClick={() => {
                                        innerMutator.remove(key)
                                      }}
                                    >
                                      x
                                    </button>
                                  </React.Fragment>
                                )
                              })}
                              <button
                                onClick={() => {
                                  innerMutator.change({
                                    ...innerState.value,
                                    [new Date().getTime()]: new Date().getTime()
                                  })
                                }}
                              >
                                +
                              </button>
                            </React.Fragment>
                          )
                        }}
                      </Field>

                      <button onClick={() => mutators.remove(index)}>
                        Remove
                      </button>
                    </div>
                  )
                })}
                <button
                  onClick={() =>
                    mutators.push({
                      username: undefined,
                      age: undefined
                    })
                  }
                >
                  Add Item
                </button>
              </React.Fragment>
            )
          }}
        </Field>

        
      </div>
      <button
        onClick={() =>
          console.log(actions.getFormState(state => state.values))
        }
      >
        print
      </button>
    </Form>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
```

#### VirtualField

> `<VirtualField>` Props

```typescript
interface IVirtualFieldProps {
  // Node path
  path?: FormPathPattern // Node path
  nodePath?: FormPathPattern // Data path
  dataPath?: FormPathPattern // Data path
  name?: string // Form extension properties
  props?: FieldProps // Whether to use the dirty check, the default will go immer accurate update
  useDirty?: boolean
  // Field state calculation container, mainly used to extend the core linkage rules
  computeState?: (draft: IFieldState, prevState: IFieldState) => void
  children?: React.ReactElement | ((api: IFieldAPI) => React.ReactElement)
}
```

**Usage**

Example：Setting `<Layout>` size from 100x100 to 200x200

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { Form, Field, createFormActions, VirtualField } from './src'

const actions = createFormActions()
const InputField = props => (
  <Field {...props}>
    {({ state, mutators }) => (
      <React.Fragment>
        <input
          disabled={!state.editable}
          value={state.value || ''}
          onChange={mutators.change}
          onBlur={mutators.blur}
          onFocus={mutators.focus}
        />
        <span style={{ color: 'red' }}>{state.errors}</span>
        <span style={{ color: 'orange' }}>{state.warnings}</span>
      </React.Fragment>
    )}
  </Field>
)

const Layout = ({ children, width = '100px', height = '100px' }) => {
  return (
    <div style={{ border: '1px solid #999', width, height }}>{children}</div>
  )
}

const App = () => {
  return (
    <Form actions={actions}>
      <Field name="user" initialValue={{}}>
        {({ state, mutator }) => {
          return (
            <VirtualField name="layout">
              {({ state: layoutState }) => {
                return (
                  <Layout
                    width={layoutState.props.width}
                    height={layoutState.props.height}
                  >
                    <label>username</label>
                    <InputField name="username" />
                    <label>age</label>
                    <InputField name="age" />
                  </Layout>
                )
              }}
            </VirtualField>
          )
        }}
      </Field>

      <button
        onClick={() => {
          // some where dynamic change layout's props
          actions.setFieldState('user.layout', state => {
            state.props.width = '200px'
            state.props.height = '200px'
          })
        }}
      >
        change layout
      </button>
    </Form>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
```

#### FormSpy

> `<FormSpy>` Props

```typescript
interface IFormSpyProps {
  // selector, eg: [ LifeCycleTypes.ON_FORM_SUBMIT_START, LifeCycleTypes.ON_FORM_SUBMIT_END ]
  selector?: string[] | string
  // reducer
  reducer?: (
    state: any,
    action: { type: string; payload: any },
    form: IForm
  ) => any
  children?: React.ReactElement | ((api: IFormSpyAPI) => React.ReactElement)
}
```

**Usage**

Example1： Form state change counter

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { Form, Field, createFormActions, FormSpy, LifeCycleTypes } from './src'

const actions = createFormActions()
const InputField = props => (
  <Field {...props}>
    {({ state, mutators }) => (
      <React.Fragment>
        <input
          disabled={!state.editable}
          value={state.value || ''}
          onChange={mutators.change}
          onBlur={mutators.blur}
          onFocus={mutators.focus}
        />
        <span style={{ color: 'red' }}>{state.errors}</span>
        <span style={{ color: 'orange' }}>{state.warnings}</span>
      </React.Fragment>
    )}
  </Field>
)

const App = () => {
  return (
    <Form actions={actions}>
      <label>username</label>
      <InputField name="username" />
      <label>age</label>
      <InputField name="age" />
      <FormSpy
        selector={LifeCycleTypes.ON_FORM_VALUES_CHANGE}
        reducer={(state, action, form) => ({
          count: state.count ? state.count + 1 : 1
        })}
      >
        {({ state, type, form }) => {
          return <div>count: {state.count || 0}</div>
        }}
      </FormSpy>
    </Form>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))

```

Example2：Combo

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { Form, Field, createFormActions, FormSpy } from './src'

const actions = createFormActions()
const InputField = props => (
  <Field {...props}>
    {({ state, mutators }) => (
      <React.Fragment>
        <input
          disabled={!state.editable}
          value={state.value || ''}
          onChange={mutators.change}
          onBlur={mutators.blur}
          onFocus={mutators.focus}
        />
        <span style={{ color: 'red' }}>{state.errors}</span>
        <span style={{ color: 'orange' }}>{state.warnings}</span>
      </React.Fragment>
    )}
  </Field>
)

const App = () => {
  return (
    <Form actions={actions}>
      <label>username</label>
      <InputField name="username" />
      <label>age</label>
      <InputField name="age" />
      <FormSpy>
        {({ state, form }) => {
          return (
            <div>
              name: {form.getFieldValue('username')}
              <br />
              age: {form.getFieldValue('age')}
            </div>
          )
        }}
      </FormSpy>
    </Form>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
```

#### FormProvider

> Used with FormSpy, often used in Cross-file consumption form state

**Usage**


```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { Form, Field, createFormActions, FormSpy, FormProvider } from './src'

const actions = createFormActions()
const InputField = props => (
  <Field {...props}>
    {({ state, mutators }) => (
      <React.Fragment>
        <input
          disabled={!state.editable}
          value={state.value || ''}
          onChange={mutators.change}
          onBlur={mutators.blur}
          onFocus={mutators.focus}
        />
        <span style={{ color: 'red' }}>{state.errors}</span>
        <span style={{ color: 'orange' }}>{state.warnings}</span>
      </React.Fragment>
    )}
  </Field>
)

const CustomForm = () => {
  return (
    <Form actions={actions}>
      <label>username</label>
      <InputField name="username" />
      <label>age</label>
      <InputField name="age" />
    </Form>
  )
}

const App = () => {
  return (
    <FormProvider>
      <CustomForm />
      <FormSpy>
        {({ state, form }) => {
          return (
            <div>
              name: {form.getFieldValue('username')}
              <br />
              age: {form.getFieldValue('age')}
            </div>
          )
        }}
      </FormSpy>
    </FormProvider>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
```

#### FormConsumer(deprecated，pls using FormSpy)

> `<FormConsumer>` Props

```typescript
interface IFormConsumerProps {
  // eg.[ LifeCycleTypes.ON_FORM_SUBMIT_START, LifeCycleTypes.ON_FORM_SUBMIT_END ]
  selector?: string[] | string
  children?:
    | React.ReactElement
    | ((api: IFormConsumerAPI) => React.ReactElement)
}
```

### API

---

#### `createFormActions`

> Return [IFormActions](#IFormActions)

**Signature**

```typescript
createFormActions(): IFormActions
```

**Usage**

```typescript
import { createFormActions } from '@uform/react'

const actions = createFormActions()
console.log(actions.getFieldValue('username'))
```

#### `createAsyncFormActions`

> Return [IFormAsyncActions](#IFormAsyncActions)

**Signature**

```typescript
createAsyncFormActions(): IFormAsyncActions
```

**Usage**

```typescript
import { createAsyncFormActions } from '@uform/react'

const actions = createAsyncFormActions()
actions.getFieldValue('username').then(val => console.log(val))
```

#### `FormEffectHooks`

> Return all @uform/core lifeCycles hook which can be subscribe

**Usage**

```tsx
import { FormEffectHooks, Form } from '@uform/react'
const {
  /**
   * Form LifeCycle
   **/
  // Form pre-initialization trigger
  onFormWillInit$,
  // Form initialization trigger
  onFormInit$,
  // Triggered when the form changes
  onFormChange$,
  // Triggered when the form event is triggered, used to monitor only manual operations
  onFormInputChange$,
  // Trigger when the form initial value changes
  onFormInitialValueChange$,
  // Triggered when the form is reset
  onFormReset$,
  // Triggered when the form is submitted
  onFormSubmit$,
  // Triggered when the form submission starts
  onFormSubmitStart$,
  // Triggered when the form submission ends
  onFormSubmitEnd$,
  // Triggered when the form is mounted
  onFormMount$,
  // Triggered when the form is unloaded
  onFormUnmount$,
  // Triggered when form validation begins
  onFormValidateStart$,
  // Triggered when the form validation ends
  onFormValidateEnd$,
  // Trigger when the form initial value changes
  onFormValuesChange$,
  /**
   * FormGraph LifeCycle
   **/
  // Triggered when the form observer tree changes
  onFormGraphChange$,
  /**
   * Field LifeCycle
   **/
  // Triggered when pre-initialized
  onFieldWillInit$,
  // Triggered when the field is initialized
  onFieldInit$,
  // Triggered when the field changes
  onFieldChange$,
  // Triggered when the field is mounted
  onFieldMount$,
  // Trigger when the field is unloaded
  onFieldUnmount$,
  // Triggered when the field event is triggered, used to monitor only manual operations
  onFieldInputChange$,
  // Triggered when the field value changes
  onFieldValueChange$,
  // Trigger when the initial value of the field changes
  onFieldInitialValueChange$
} = FormEffectHooks

const App = () => {
  return (
    <Form
      effects={() => {
        onFormInit$().subscribe(() => {
          console.log('initialized')
        })
      }}
    >
      ...
    </Form>
  )
}
```

#### createEffectHook

> Custom your own hook by this api

**Usage**

```jsx
import { Form, createEffectHook, createFormActions } from './src'

const actions = createFormActions()
const diyHook1$ = createEffectHook('diy1')
const diyHook2$ = createEffectHook('diy2')

const App = () => {
  return (
    <Form
      actions={actions}
      effects={() => {
        diyHook1$().subscribe((payload) => {
          console.log('diy1 hook triggered', payload)
        })

        diyHook2$().subscribe((payload) => {
          console.log('diy2 hook triggered', payload)
        })
      }}
    >
      <button onClick={() => {
        actions.notify('diy1', { index: 1 })
      }}>notify diy1</button>
      <button onClick={() => {
        actions.notify('diy2', { index: 2 })
      }}>notify diy2</button>
    </Form>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
```


### Interfaces

---

#### IFormActions

```typescript
interface IFormActions {
  /*
   * Form submission, if the callback parameter returns Promise,
   * Then the entire submission process will hold and load is true.
   * Wait for Promise resolve to trigger the form onFormSubmitEnd event while loading is false
   */
  submit(
    onSubmit?: (values: IFormState['values']) => any | Promise<any>
  ): Promise<{
    Validated: IFormValidateResult
    Payload: any //onSubmit callback function return value
  }>
  /*
   * Clear the error message, you can pass the FormPathPattern to batch or precise control of the field to be cleared.
   * For example, clearErrors("*(aa,bb,cc)")
   */
  clearErrors: (pattern?: FormPathPattern) => void
  /*
   * Get status changes, mainly used to determine which states in the current life cycle have changed in the form lifecycle hook.
   * For example, hasChanged(state,'value.aa')
   */
  hasChanged(
    target: IFormState | IFieldState | IVirtualFieldState,
    path: FormPathPattern
  ): boolean
  /*
   * Reset form
   */
  reset(options?: {
    // Forced to empty
    forceClear?: boolean // Forced check
    validate?: boolean // Reset range for batch or precise control of the field to be reset
    selector?: FormPathPattern
  }): Promise<void | IFormValidateResult>
  /*
   * Validation form
   */
  validate(
    path?: FormPathPattern,
    options?: {
      // Is it pessimistic check, if the current field encounters the first verification error, stop the subsequent verification process
      first?: boolean
    }
  ): Promise<IFormValidateResult>
  /*
   * Set the form status
   */
  setFormState( // Operation callback
    callback?: (state: IFormState) => any, // No trigger the event
    silent?: boolean
  ): void
  /*
   * Get form status
   */
  getFormState( //transformer
    callback?: (state: IFormState) => any
  ): any
  /*
   * Set the field status
   */
  setFieldState( // Field path
    path: FormPathPattern, // Operation callback
    callback?: (state: IFieldState) => void, // No trigger the event
    silent?: boolean
  ): void
  /*
   * Get the field status
   */
  getFieldState( // Field path
    path: FormPathPattern, // Transformer
    callback?: (state: IFieldState) => any
  ): any
  /*
   * Registration field
   */
  registerField(props: {
    // Node path
    path?: FormPathPattern // Data path
    name?: string // Field value
    value?: any // Field multi-value
    values?: any[] // Field initial value
    initialValue?: any // Field extension properties
    props?: any // Field check rule
    rules?: ValidatePatternRules[] // Field is required
    required?: boolean // Is the field editable?
    editable?: boolean // Whether the field is dirty check
    useDirty?: boolean // Field state calculation container, mainly used to extend the core linkage rules
    computeState?: (draft: IFieldState, prevState: IFieldState) => void
  }): IField
  /*
   * Register virtual fields
   */
  registerVirtualField(props: {
    // Node path
    path?: FormPathPattern // Data path
    name?: string // Field extension properties
    props?: any // Whether the field is dirty check
    useDirty?: boolean // Field state calculation container, mainly used to extend the core linkage rules
    computeState?: (draft: IFieldState, prevState: IFieldState) => void
  }): IVirtualField
  /*
   * Create a field data operator, which will explain the returned API in detail later.
   */
  createMutators(field: IField): IMutators
  /*
   * Get the form observer tree
   */
  getFormGraph(): IFormGraph
  /*
   * Set the form observer tree
   */
  setFormGraph(graph: IFormGraph): void
  /*
   * Listen to the form life cycle
   */
  subscribe(
    callback?: ({ type, payload }: { type: string; payload: any }) => void
  ): number
  /*
   * Cancel the listening form life cycle
   */
  unsubscribe(id: number): void
  /*
   * Trigger form custom life cycle
   */
  notify: <T>(type: string, payload?: T) => void
  /*
   * Set the field value
   */
  setFieldValue(path?: FormPathPattern, value?: any): void
  /*
   * Get the field value
   */
  getFieldValue(path?: FormPathPattern): any
  /*
   * Set the initial value of the field
   */
  setFieldInitialValue(path?: FormPathPattern, value?: any): void
  /*
   * Get the initial value of the field
   */
  getFieldInitialValue(path?: FormPathPattern): any
}
```

#### IFormAsyncActions

```typescript
interface IFormAsyncActions {
  /*
   * Form submission, if the callback parameter returns Promise,
   * Then the entire submission process will hold and load is true.
   * Wait for Promise resolve to trigger the form onFormSubmitEnd event while loading is false
   */
  submit(
    onSubmit?: (values: IFormState['values']) => void | Promise<any>
  ): Promise<IFormSubmitResult>
  /*
   * Reset form
   */
  reset(options?: IFormResetOptions): Promise<void>
  /*
   * Get status changes, mainly used to determine which states in the current life cycle have changed in the form lifecycle hook.
   * For example, hasChanged(state,'value.aa')
   */
  hasChanged(target: any, path: FormPathPattern): Promise<boolean>
  /*
   * Clear the error message, you can pass the FormPathPattern to batch or precise control of the field to be cleared.
   * For example, clearErrors("*(aa,bb,cc)")
   */
  clearErrors: (pattern?: FormPathPattern) => Promise<void>
  /*
   * Validation form
   */
  validate(
    path?: FormPathPattern,
    options?: {
      // Is it pessimistic check, if the current field encounters the first verification error, stop the subsequent verification process
      first?: boolean
    }
  ): Promise<IFormValidateResult>
  /*
   * Set the form state
   */
  setFormState(
    // Operation callback
    callback?: (state: IFormState) => any,
    // No trigger the event
    silent?: boolean
  ): Promise<void>
  /*
   * Get form state
   */
  getFormState(
    //transformer
    callback?: (state: IFormState) => any
  ): Promise<any>
  /*
   * Set the field state
   */
  setFieldState(
    // Field path
    path: FormPathPattern,
    // Operation callback
    callback?: (state: IFieldState) => void,
    // No trigger the event
    silent?: boolean
  ): Promise<void>
  /*
   * Get the field state
   */
  getFieldState(
    // Field path
    path: FormPathPattern,
    //transformer
    callback?: (state: IFieldState) => any
  ): Promise<void>
  /*
   * Get the form observer tree
   */
  getFormGraph(): Promise<IFormGraph>
  /*
   * Set the form observer tree
   */
  setFormGraph(graph: IFormGraph): Promise<void>
  /*
   * Listen to the form life cycle
   */
  subscribe(callback?: FormHeartSubscriber): Promise<number>
  /*
   * Cancel the listening form life cycle
   */
  unsubscribe(id: number): Promise<void>
  /*
   * Trigger form custom life cycle
   */
  notify: <T>(type: string, payload: T) => Promise<void>
  dispatch: <T>(type: string, payload: T) => void
  /*
   * Set the field value
   */
  setFieldValue(path?: FormPathPattern, value?: any): Promise<void>
  /*
   * Get the field value
   */
  getFieldValue(path?: FormPathPattern): Promise<any>
  /*
   * Set the initial value of the field
   */
  setFieldInitialValue(path?: FormPathPattern, value?: any): Promise<void>
  /*
   * Get the initial value of the field
   */
  getFieldInitialValue(path?: FormPathPattern): Promise<any>
}
```

#### IFieldState

```typescript
interface IFieldState<FieldProps = any> {
  /**Read-only attribute**/
  // State name, FieldState
  displayName?: string // Data path
  name: string // Node path
  path: string // Has been initialized
  initialized: boolean // Is it in the original state, the state is true only when value===intialValues
  pristine: boolean // Is it in a legal state, as long as the error length is greater than 0, the valid is false
  valid: boolean // Is it illegal, as long as the error length is greater than 0, the valid is true
  invalid: boolean // Is it in check state?
  validating: boolean // Is it modified, if the value changes, the property is true, and will be true throughout the life of the field
  modified: boolean // Is it touched?
  touched: boolean // Is it activated, when the field triggers the onFocus event, it will be triggered to true, when onBlur is triggered, it is false
  active: boolean // Have you ever visited, when the field triggers the onBlur event, it will be triggered to true
  visited: boolean /** writable property**/ // Is it visible, note: if the state is false, then the value of the field will not be submitted, and the UI will not display
  visible: boolean // Whether to show, note: if the state is false, then the value of the field will be submitted, the UI will not display, similar to the form hidden field
  display: boolean // Is it editable?
  editable: boolean // Is it in the loading state, note: if the field is in asynchronous verification, loading is true
  loading: boolean // Field multi-parameter value, such as when the field onChange trigger, the event callback passed multi-parameter data, then the value of all parameters will be stored here
  values: any[] // Field error message
  errors: string[] // Field alert message
  warnings: string[] // Field value, is equal to values[0]
  value: any // Initial value
  initialValue: any // Check the rules, the specific type description refers to the following documents
  rules: ValidatePatternRules[] // Is it required?
  required: boolean // Whether to mount
  mounted: boolean // Whether to uninstall
  unmounted: boolean // field extension properties
  props: FieldProps
}
```

#### IVirtualFieldState

```typescript
interface IVirtualFieldState<FieldProps = any> {
  /**Read-only status**/
  // State name, VirtualFieldState
  displayName: string // Field data path
  name: string // Field node path
  path: string // Has been initialized
  initialized: boolean /** writable status**/ // Is it visible, note: if the state is false, the UI will not be displayed, the data will not be submitted (because it is a VirtualField)
  visible: boolean // Whether to show, note: if the state is false, the UI will not display, the data will not be submitted (because it is VirtualField)
  display: boolean // Is it mounted?
  mounted: boolean // Has been uninstalled
  unmounted: boolean // field extension properties
  props: FieldProps
}
```

#### SyncValidateResponse

```typescript
declare type SyncValidateResponse =
  | null
  | string
  | boolean
  | {
      type?: 'error' | 'warning'
      message: string
    }
```

#### AsyncValidateResponse

```typescript
declare type AsyncValidateResponse = Promise<SyncValidateResponse>
```

#### ValidateResponse

```typescript
export declare type ValidateResponse =
  | SyncValidateResponse
  | AsyncValidateResponse
```

#### InternalFormats

```typescript
type InternalFormats =
  | 'url'
  | 'email'
  | 'ipv6'
  | 'ipv4'
  | 'idcard'
  | 'taodomain'
  | 'qq'
  | 'phone'
  | 'money'
  | 'zh'
  | 'date'
  | 'zip'
  | string
```

#### CustomValidator

```typescript
declare type CustomValidator = (
  value: any,
  rescription?: ValidateDescription
) => ValidateResponse
```

#### ValidateDescription

```typescript
interface ValidateDescription {
  // built-in rules，ref: string rules
  format?: InternalFormats
  // custom validation
  validator?: CustomValidator
  // required
  required?: boolean
  // pattern
  pattern?: RegExp | string
  // max length
  max?: number
  // maximum
  maximum?: number
  // exclusiveMaximum
  exclusiveMaximum?: number
  // exclusiveMinimum
  exclusiveMinimum?: number
  // minimum
  minimum?: number
  // min
  min?: number
  // length
  len?: number
  // whitespace
  whitespace?: boolean
  // enum
  enum?: any[]
  // error message
  message?: string
  [key: string]: any
}
```

#### ValidateArrayRules

```typescript
declare type ValidateArrayRules = Array<
  InternalFormats | CustomValidator | ValidateDescription
>
```

#### ValidatePatternRules

```typescript
declare type ValidatePatternRules =
  | InternalFormats
  | CustomValidator
  | ValidateDescription
  | ValidateArrayRules
```
