# @uform/core

> UForm 内核包

```jsx
import React, { useState } from 'react'
import { Form, Field, createFormActions, FormSpy, LifeCycleTypes } from './src'

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

const App = () => {
  return (
    <Form
      //actions={actions}
      effects={($)=>{
        $(LifeCycleTypes.ON_FORM_MOUNT).subscribe(()=>{
          console.log('mounted')
        })
      }}
      onChange={() => {

      }}
    >
      <Field name="array" initialValue={[]}>
        {({ state, mutators }) => {
          return (
            <div>
              {state.value.map((item, index) => {
                return (
                  <React.Fragment key={index}>
                    <Input
                      name={`array.${index}.aaa`}
                      required
                      triggerType="onBlur"
                    />
                    <Input
                      name={`array.${index}.bbb`}
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
      <FormSpy selector={LifeCycleTypes.ON_FORM_MOUNT}>
        {form => {
          return <div>hello world</div>
        }}
      </FormSpy>
    </Form>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
```
