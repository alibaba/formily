# @uform/core

> UForm 内核包

```jsx
import React, { useState } from 'react'
import { Form, Field, createFormActions } from './src'

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
      actions={actions}
      onChange={console.log}
    >
      <Field name="array" initialValue={[]}>
        {({ state, mutators }) => {
          return (
            <div>
              {state.value.map((item, index) => {
                return (
                  <React.Fragment key={index}>
                    <Input name={`array.${index}.aaa`} />
                    <Input name={`array.${index}.bbb`} />
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
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
```
