```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import {
  SchemaForm,
  FormButtonGroup,
  SchemaMarkupField as Field,
  Submit
} from '@formily/next'
import { Input, ArrayCards } from '@formily/next-components'
import '@alifd/next/dist/next.css'

const range = (n = 100) => {
  const results = []
  for (let i = 0; i < n; i++) {
    results.push(i)
  }
  return results
}

const App = () => {
  return (
    <SchemaForm
      components={{
        Input,
        ArrayCards
      }}
      initialValues={{
        array: range(400).map(() => {
          return {
            aa: '123',
            bb: '123',
            cc: '123'
          }
        })
      }}
      onSubmit={console.log}
    >
      <Field name="array" title="Array" type="array" x-component="ArrayCards">
        <Field type="object">
          <Field name="aa" type="string" title="AA" x-component="Input" />
          <Field name="bb" type="string" title="AA" x-component="Input" />
          <Field name="cc" type="string" title="AA" x-component="Input" />
        </Field>
      </Field>
      <FormButtonGroup>
        <Submit>提交</Submit>
      </FormButtonGroup>
    </SchemaForm>
  )
}
ReactDOM.render(<App />, document.getElementById('root'))
```
