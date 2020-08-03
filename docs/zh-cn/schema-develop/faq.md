```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import {
  SchemaForm,
  Field,
  FormButtonGroup,
  Submit,
  Reset,
  Balloon,
  Icon
} from '@formily/next'
import {
  Input,
  ArrayTable,
  DatePicker,
  FormBlock,
  FormItemGrid,
  FormLayout
} from '@formily/next-components'
import '@alifd/next/dist/next.css'
import Printer from '@formily/printer'

const App = () => (
  <Printer>
    <SchemaForm
      components={{
        ArrayTable,
        Input,
        RangePicker: DatePicker.RangePicker
      }}
    >
      <FormLayout>
        <Field
          title="数组"
          name="array"
          maxItems={30}
          type="array"
          x-component="ArrayTable"
          x-component-props={{
            renderExtraOperations() {
              return <div>Hello worldasdasdasdasd</div>
            },
            operationsWidth: 300
          }}
        >
          <Field type="object">
            <Field
              name="aa"
              x-component="Input"
              description="hello world"
              title={
                <div style={{ display: 'inline-block' }}>
                  <span>字段1</span>
                  <span>字段1</span>
                  <span>字段1</span>
                  <span>字段1</span>
                </div>
              }
            />
            <Field
              key={0}
              name="bb"
              x-component="Input"
              title={() => {
                return <div>字段2</div>
              }}
            />
            <Field key={1} name="cc" x-component="Input" title={'字段3'} />
            <Field key={3} name="ee" x-component="Input" title={'字段5'} />
          </Field>
        </Field>
      </FormLayout>
    </SchemaForm>
  </Printer>
)
ReactDOM.render(<App />, document.getElementById('root'))
```
