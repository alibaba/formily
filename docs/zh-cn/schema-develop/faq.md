```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import {
  SchemaForm,
  FormButtonGroup,
  Submit,
  Reset,
  SchemaMarkupField as Field
} from '@formily/next'
import { Input } from '@alifd/next'
import '@alifd/next/dist/next.css'

const StrInput = props => {
  const { onChange, value } = props
  return <Input value={value} onChange={onChange} />
}

const ObjInput = props => {
  const { onChange, value } = props
  return (
    <Input
      value={value && value.text}
      onChange={val => {
        onChange({ text: val })
      }}
    />
  )
}
const ArrayInput = props => {
  const { onChange, value } = props
  return (
    <Input
      value={value && value[0]}
      onChange={val => {
        onChange([val])
      }}
    />
  )
}

const App = () => (
  <SchemaForm
    components={{ StrInput, ObjInput, ArrayInput }}
    labelCol={7}
    wrapperCol={12}
    onSubmit={console.log}
  >
    <Field type="string" title="String" name="string" x-component="StrInput" />
    <Field type="object" title="object" name="object" x-component="ObjInput" />
    <Field type="array" title="array" name="array" x-component="ArrayInput" />
    <FormButtonGroup offset={7}>
      <Submit>提交</Submit>
      <Reset forceClear>重置</Reset>
    </FormButtonGroup>
  </SchemaForm>
)
ReactDOM.render(<App />, document.getElementById('root'))
```
