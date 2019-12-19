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
    type: 'object',
    title: '我是表单标题',
    description: '我是表单描述',
    properties: {
      fieldA: {
        type: 'object',
        title: '我是层级嵌套标题',
        description: '我是层级嵌套描述',
        properties: {
          arrayA: {
            type: 'array',
            title: '动物',
            description: '我是字段描述',
            component: 'Select',
            items: {
              type: 'string',
              enum: ['Dog', 'Cat', 'Horse']
            }
          },
          arrayB: {
            type: 'array',
            title: '熊猫',
            description: '我是字段描述',
            component: 'Select',
            items: {
              type: 'number',
              enum: ['Dog', 'Cat', 'Horse']
            }
          },
          numberB: {
            type: 'number',
            title: '年龄'
          },
          objectC: {
            type: 'object'
          },
          input: {
            type: 'string',
            'x-component': 'Input',
            'x-component-props': {
              value: 'abc',
              onChange: '{{function(){console.log("abcd");}}}'
            },
            'x-props': {
              help: 'test'
            },
            'x-rules': [
              {
                required: true,
                message: '此项必填'
              }
            ]
          }
        }
      }
    }
  })

  return <SchemaEditor schema={schema} onChange={setSchema} />
}

ReactDOM.render(<SchemaEditorDemo />, document.getElementById('root'))
```

![](https://gw.alicdn.com/tfs/TB1Oo7hq4D1gK0jSZFKXXcJrVXa-1367-755.gif)
