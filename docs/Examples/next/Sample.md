# 简单场景

> 最简单的表单使用场景，只需要很简单使
> 用`<SchemaForm/>/<SchemaMarkupField/><FormButtonGroup/><Submit/><Reset/>`即可

#### Demo 示例

```jsx
import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import {
  SchemaForm,
  FormButtonGroup,
  Submit,
  Reset,
  FormEffectHooks,
  createFormActions
} from '@uform/next'
import Printer from '@uform/printer'
import '@alifd/next/dist/next.css'

const useLinkage = () => {
  const actions = createFormActions()
  FormEffectHooks.onFieldChange$('aaa').subscribe(fieldState => {
    actions.setFieldState('bbb', state => {
      state.visible = fieldState.value === '123'
    })
  })
}

const App = () => {
  const [schema, setSchema] = useState({ type: 'object' })
  useEffect(() => {
    setTimeout(() => {
      setSchema({
        type: 'object',
        properties: {
          aaa: {
            type: 'string',
            'x-linkages': [
              {
                type: 'value:schema',
                target: 'bbb',
                condition: ['=', '123'],
                schema: {
                  title: '这是标题'
                },
                otherwise: {
                  title: ''
                }
              }
            ]
          },
          bbb: {
            type: 'string'
          },
          ccc: {
            type: 'string'
          }
        }
      })
    }, 1000)
  }, [])
  return (
    <Printer>
      <SchemaForm
        effects={($, actions) => {
          //useLinkage()
          console.log('执行')
        }}
        schema={schema}
      >
        <FormButtonGroup offset={8}>
          <Submit>提交</Submit>​ <Reset>重置</Reset>​
        </FormButtonGroup>
      </SchemaForm>
    </Printer>
  )
}
ReactDOM.render(<App />, document.getElementById('root'))
```
