```jsx
import React, { useEffect } from 'react'
import ReactDOM from 'react-dom'
import {
  SchemaForm,
  FormSlot,
  SchemaMarkupField as Field,
  FormButtonGroup,
  createFormActions,
  createVirtualBox,
  Submit,
  Reset
} from '@formily/antd' // 或者 @formily/next
import styled, { css } from 'styled-components'
import { FormMegaLayout, Input, DatePicker } from '@formily/antd-components'
import Printer from '@formily/printer'
import 'antd/dist/antd.css'

const actions1 = createFormActions()
const actions2 = createFormActions()
const actions3 = createFormActions()
const actions4 = createFormActions()
window.actions1 = actions1
window.actions2 = actions2
window.actions3 = actions3
window.actions4 = actions4

const NestedSchemaForm = createVirtualBox('SchemaForm1', SchemaForm)

const App = () => {
  return (
    <Printer>
      <SchemaForm actions={actions1} components={{ Input, SchemaForm }}>
        <Field name="f1" title="标题" x-component="Input" />
        <Field
          x-component="SchemaForm"          
          x-component-props={{
            actions: actions2,
            components: { Input }
          }}
        >
          <Field name="t1-1" title="标题1-1" x-component="Input" />
          <Field name="t1-2" title="标题1-2" x-component="Input" />
        </Field>        

        <Field
          x-component="SchemaForm"
          x-component-props={{
            actions: actions3,
            components: { Input },
            schema: {
              "type": "object",
              "properties": {
                "inner-t1": {
                  "key": "inner-t1",
                  "name": "inner-t1",
                  "title": "标题inner-1",
                  "x-component": "Input"
                },
                "inner-t2": {
                  "key": "inner-t2",
                  "name": "inner-t2",
                  "title": "标题inner-2",
                  "x-component": "Input"
                },
              }
            }
          }}   
        />

        <NestedSchemaForm
          actions={actions4}
          components={{ Input, SchemaForm }}
        >
          <Field name="t2-1" title="标题1-1" x-component="Input" />
          <Field name="t2-2" title="标题1-2" x-component="Input" />
        </NestedSchemaForm>        
      </SchemaForm>      
    </Printer>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
```