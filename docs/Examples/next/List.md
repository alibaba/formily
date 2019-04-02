# List 场景

> 数组场景，区块型数组，能解决大量字段的聚合输入，但是对于数据的对比化展示，区分
> 度不够明显

#### Demo 示例

```jsx
import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import SchemaForm, {
  Field,
  FormItemGrid,
  FormButtonGroup,
  Submit,
  Reset,
  FormBlock,
  FormLayout
} from '@uform/next'
import '@alifd/next/dist/next.css'
import Printer from '@uform/printer'

const App = () => {
  const [value, setValues] = useState({})
  useEffect(() => {
    setTimeout(() => {
      setValues({
        array: [{ array2: [{ aa: '123', bb: '321' }] }]
      })
    }, 1000)
  }, [])
  return (
    <Printer>
      <SchemaForm initialValues={value} onSubmit={v => console.log(v)}>
        <Field
          title="数组"
          name="array"
          maxItems={3}
          type="array"
        >
          <Field type="object">
            <FormBlock title="基础信息">
              <FormLayout labelCol={9} wrapperCol={6}>
                <Field name="aa" type="string" title="字段1" />
                <Field name="bb" type="string" title="字段2" />
                <FormItemGrid title="字段3" gutter={10}>
                  <Field name="cc" type="string" />
                  <Field name="dd" type="string" />
                </FormItemGrid>
              </FormLayout>
            </FormBlock>
            <FormBlock title="嵌套数组">
              <Field
                name="array2"
                maxItems={3}
                type="array"
              >
                <Field type="object">
                  <FormLayout labelCol={9} wrapperCol={6}>
                    <Field name="aa" type="string" title="字段1" />
                    <Field name="bb" type="string" title="字段2" />
                    <FormItemGrid title="字段3" gutter={10}>
                      <Field name="cc" type="string" />
                      <Field name="dd" type="string" />
                    </FormItemGrid>
                  </FormLayout>
                </Field>
              </Field>
            </FormBlock>
          </Field>
        </Field>
        <FormButtonGroup>
          <Submit>提交</Submit>
          <Reset>重置</Reset>
        </FormButtonGroup>
      </SchemaForm>
    </Printer>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
```

# Table Style

> 数组场景，列表型数组，对于需要做数据对比分析的场景，比较适合，但是它对数据结构
> 的要求，必须是 ObjectList

#### Demo 示例

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import SchemaForm, {
  Field,
  FormItemGrid,
  FormButtonGroup,
  Submit,
  Reset,
  FormBlock,
  FormLayout
} from '@uform/react'
import '@alifd/next/dist/next.css'
import Preview from './preview'

const App = () => (
  <Preview>
    <SchemaForm>
      <Field
        title="数组"
        name="array"
        maxItems={3}
        type="array"
        x-component="table"
      >
        <Field type="object">
          <Field
            name="aa"
            type="string"
            description="hello world"
            title="字段1"
          />
          <Field name="bb" type="string" title="字段2" />
          <Field name="cc" type="string" title="字段3" />
          <Field name="dd" type="string" title="字段4" />
          <Field name="dd" type="string" title="字段5" />
          <Field name="ee" type="string" title="字段6" />
          <Field name="ff" type="string" title="字段7" />
          <Field name="gg" type="daterange" title="字段8" />
        </Field>
      </Field>
    </SchemaForm>
  </Preview>
)
ReactDOM.render(<App />, document.getElementById('root'))
```

# Card Style

> 数组场景，卡片数组，信息层级结构更加清晰的要求，必须是 ObjectList

#### Demo 示例

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import SchemaForm, {
  Field,
  FormItemGrid,
  FormButtonGroup,
  Submit,
  Reset,
  FormBlock,
  FormLayout
} from '@uform/next'
import '@alifd/next/dist/next.css'
import Preview from './preview'

const App = () => (
  <Preview>
    <SchemaForm>
      <Field name="array" maxItems={3} type="array" x-component="cards" x-props={{title:'这是卡片标题'}}>
        <Field type="object">
          <FormLayout labelCol={6} wrapperCol={8}>
            <Field
              name="aa"
              type="string"
              description="hello world"
              title="字段1"
            />
            <Field name="bb" type="string" title="字段2" />
            <Field name="cc" type="string" title="字段3" />
            <Field name="dd" type="string" title="字段4" />
            <Field name="dd" type="string" title="字段5" />
            <Field name="ee" type="string" title="字段6" />
            <Field name="ff" type="string" title="字段7" />
            <Field name="gg" type="daterange" title="字段8" />
          </FormLayout>
          <Field name="array" maxItems={3} type="array" x-component="cards" x-props={{title:'这是卡片标题'}}>
            <Field type="object">
              <FormLayout labelCol={6} wrapperCol={8}>
                <Field
                  name="aa"
                  type="string"
                  description="hello world"
                  title="字段1"
                />
                <Field name="bb" type="string" title="字段2" />
                <Field name="cc" type="string" title="字段3" />
                <Field name="dd" type="string" title="字段4" />
                <Field name="dd" type="string" title="字段5" />
                <Field name="ee" type="string" title="字段6" />
                <Field name="ff" type="string" title="字段7" />
                <Field name="gg" type="daterange" title="字段8" />
              </FormLayout>
            </Field>
          </Field>
        </Field>
      </Field>
    </SchemaForm>
  </Preview>
)
ReactDOM.render(<App />, document.getElementById('root'))
```
