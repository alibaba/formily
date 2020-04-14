```jsx
import React from 'react'
import {
  SchemaForm,
  InternalField as Field,
  createFormActions
} from '@formily/react-schema-renderer'

const actions = createFormActions()

export default function App() {
  const renderExercises = () => {
    let ret = []
    for (let i = 0; i < 1000; i++) {
      ret.push(
        <Field key={i} name={`Exercise${i}`} initialValue={i}>
          {({ form, state, props, mutators }) => {
            return <div>{state.value}</div>
          }}
        </Field>
      )
    }
    return ret
  }

  return (
    <SchemaForm
      actions={actions}
      onChange={console.log}
      schema={{ type: 'object' }}
    >
      {renderExercises()}
    </SchemaForm>
  )
}
```
