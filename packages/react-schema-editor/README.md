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
            fieldC: {
              type: 'number',
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
