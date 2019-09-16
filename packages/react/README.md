# @uform/react

> UForm React Pure Package

### ArrayList

```jsx
import React, { useState } from 'react'
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

const actions = createFormActions()

const Input = props => (
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

const { onFormInit$, onFormInputChange$, onFieldInputChange$ } = FormEffectHooks

const App = () => {
  const [values, setValues] = useState({})
  const [editable, setEditable] = useState(true)
  return (
    <FormProvider>
      <Form
        //actions={actions}
        editable={editable}
        initialValues={values}
        effects={() => {
          onFormInit$().subscribe(() => {
            console.log('初始化')
          })
          onFieldInputChange$().subscribe(state => {
            console.log('输入变化', state)
          })
        }}
        onChange={() => {}}
      >
        <Field name="array" initialValue={[]}>
          {({ state, mutators }) => {
            return (
              <div>
                {state.value.map((item, index) => {
                  return (
                    <React.Fragment key={index}>
                      <Input
                        name={`array[${index}].aaa`}
                        required
                        triggerType="onBlur"
                      />
                      <Input
                        name={`array[${index}].bbb`}
                        rules={value => {
                          if (value == '123') {
                            return {
                              type: 'warning',
                              message: '这个是一个提示'
                            }
                          }
                        }}
                      />
                      <button
                        onClick={() => {
                          mutators.remove(index)
                        }}
                      >
                        Remove
                      </button>
                    </React.Fragment>
                  )
                })}
                <button onClick={() => mutators.push({})}>Add Item</button>
              </div>
            )
          }}
        </Field>
      </Form>
    </FormProvider>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
```

### Dynamic Object

```jsx
import React, { useState } from 'react'
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

const actions = createFormActions()

const Input = props => (
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

const { onFormInit$, onFormInputChange$, onFieldInputChange$ } = FormEffectHooks

const App = () => {
  const [values, setValues] = useState({})
  const [editable, setEditable] = useState(true)
  return (
    <FormProvider>
      <Form
        actions={actions}
        editable={editable}
        initialValues={values}
        effects={() => {
          onFormInit$().subscribe(() => {
            console.log('初始化')
          })
          onFieldInputChange$().subscribe(state => {
            console.log('输入变化', state)
          })
        }}
        onChange={() => {}}
      >
        <Field name="object" initialValue={{}}>
          {({ state, mutators }) => {
            return (
              <React.Fragment>
                {Object.keys(state.value).map(key => {
                  if (!mutators.exist(key)) return
                  return (
                    <React.Fragment key={key}>
                      <Input
                        name={`object.${key}`}
                        required
                        triggerType="onBlur"
                      />
                      <button
                        onClick={() => {
                          mutators.remove(key)
                          console.log(actions.getFormGraph())
                        }}
                      >
                        Remove
                      </button>
                    </React.Fragment>
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
                  add
                </button>
              </React.Fragment>
            )
          }}
        </Field>
      </Form>
    </FormProvider>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
```
