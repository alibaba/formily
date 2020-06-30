```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import {
  SchemaForm,
  FormButtonGroup,
  SchemaMarkupField as Field,
  Submit,
  FormPath,
  createFormActions
} from '@formily/next'
import { Input, FormCard, setup } from '@formily/next-components'
import '@alifd/next/dist/next.css'

setup()

const actions = createFormActions()

const App = () => {
  return (
    <SchemaForm
      initialValues={{
        container: [{ bb: '123' }, { bb: '123' }]
      }}
      effects={($, { setFieldState }) => {
        $('onFieldChange', 'container.*.bb').subscribe(
          async ({ value, name }) => {
            const siblingName = FormPath.transform(name, /\d+/, $d => {
              return `container.${$d}.aa`
            })
            await setFieldState(siblingName, state => {
              state.visible = value !== '123'
            })
          }
        )
      }}
    >
      <Field name="container" type="array">
        <Field name="object" type="object">
          <FormCard>
            <Field name="aa" required type="string" />
            <Field name="bb" required type="string" />
          </FormCard>
        </Field>
      </Field>
      <button type="submit">Submit</button>
    </SchemaForm>
  )
}
ReactDOM.render(<App />, document.getElementById('root'))
```
