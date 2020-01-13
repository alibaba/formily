# react-schema-editor
react-schema-editor is a UI tool for build form schema.

## Usage
```
npm install @formily/react-schema-editor -S
```

## Demo

```jsx
import React from 'react'
import { SchemaEditor } from './src'

function SchemaEditorDemo() {
  const [schema, setSchema] = React.useState({
  title: '动态表单示例',
  type: 'object',
  "properties": {
    "username": {
      "title": "用户名",
      "type": "string",
      "x-component-props": {
        "placeholder": "请输入用户名",
        "onChange": "function(value) \n{console.log('input onChange', value, this.field, this.field.getValue('note'))"
      }
    },
    "password": {
      "title": "密码",
      "type": "string",
      "x-component": "Input",
      "x-component-props": {
        "htmlType": "password",
        "placeholder": "请输入密码"
      } 
    },
    "note": {
      "title": "备注",
      "type": "string",
      "x-component": "TextArea",
      "x-component-props": {
        "placeholder": "something"
      } 
    },
    "agreement": {
      "title": "同意",
      "type": "string",
      "x-component": "Checkbox",
      "x-component-props": {
        "disabled": "{{!this.field.getValue('username')}}",
        "defaultChecked": true
      }
    }
  }
})

  return <SchemaEditor schema={schema} onChange={setSchema} />
}

ReactDOM.render(<SchemaEditorDemo />, document.getElementById('root'))
```

![](https://gw.alicdn.com/tfs/TB1Oo7hq4D1gK0jSZFKXXcJrVXa-1367-755.gif)
