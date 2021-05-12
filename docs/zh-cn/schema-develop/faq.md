```jsx
import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom'
import 'antd/dist/antd.css'
import { AutoComplete } from 'antd'
import { Form, FormItem, createFormActions } from '@formily/antd'

const { Option } = AutoComplete
const actions = createFormActions()

const Complete = props => {
  console.log(props.options, 'props.options')
  return (
    <AutoComplete
      style={{
        width: 200
      }}
      placeholder="input here"
      onChange={props.onChange}
    >
      {props.options?.map(email => (
        <Option key={email} value={email}>
          <div
            onClick={() => {
              props.fn(email)
            }}
          >
            {email}
          </div>
        </Option>
      ))}
    </AutoComplete>
  )
}

const Ma = () => {
  const [result1, setResult1] = useState(0)
  const [result2, setResult2] = useState([])
  const handleSelect = value => {
    setResult1(e => e + 1)
  }
  useEffect(() => {
    setResult2([1, 23, 2, 4])
  }, [])
  return (
    <Form actions={actions}>
      <FormItem
        title="账号"
        name="accountNo"
        component={Complete}
        options={result2}
        fn={handleSelect}
        handleSelect={handleSelect}
      />
    </Form>
  )
}

ReactDOM.render(<Ma />, document.getElementById('container'))
```
