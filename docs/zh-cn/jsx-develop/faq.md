# FAQ

```jsx
import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom'
import { SchemaForm } from '@formily/antd' // 或者 @formily/next
import { Input, Select, Radio } from '@formily/antd-components'
import Printer from '@formily/printer'
import 'antd/dist/antd.css'

const mockSchema = {
  type: 'object',
  properties: {
    aa: {
      type: 'boolean',
      enum: [
        { label: '设置bb的枚举列表', value: true },
        { label: '还原bb的枚举列表', value: false }
      ],
      default: false,
      title: 'AA',
      'x-component': 'RadioGroup',
      'x-linkages': [
        {
          type: 'value:schema',
          target: 'bb',
          condition: '{{!!$value}}',
          schema: {
            enum: ['xx1', 'xx2', 'xx3']
          },
          otherwise: {
            enum: ['zz']
          }
        }
      ]
    },
    bb: {
      type: 'string',
      title: 'BB',
      'x-component': 'Input',
      enum: ['yy']
    },
    cc: {
      type: 'string',
      title: '{{customCCTitle}}',
      'x-component': 'Input'
    }
  }
}

const App = () => {
  const [schema, setSchema] = useState({
    type: 'object'
  })
  useEffect(() => {
    setTimeout(() => {
      setSchema(mockSchema)
    }, 1000)
  }, [])

  return (
    <Printer>
      <SchemaForm
        schema={schema}
        components={{ Input, Select, RadioGroup: Radio.Group }}
        onSubmit={values => {
          console.log(values)
        }}
        expressionScope={{
          customTitle: 'this is custom title',
          customCCTitle: 'CC'
        }}
      />
    </Printer>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
```
