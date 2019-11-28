# schema-editor

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
            numberB: {
              type: 'number',
              title: '年龄'
            },
            objectC: {
              type: 'object'
            }
          }
        }
      }
    })

  return (
    <SchemaEditor
      schema={schema}
      onChange={setSchema}
    />
  )
}

ReactDOM.render(
  <SchemaEditorDemo />,
  document.getElementById('root')
)
```
