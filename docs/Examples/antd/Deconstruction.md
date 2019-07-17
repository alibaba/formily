# 字段解构

> 字段解构可以说是一个非常强大的特性，它可以对组件生产的值做解构转换，使得快速贴合服务端数据结构要求，无需再做二次转换
> 字段解构主要是对 name 用 ES Deconstruction 语法做解构，需要注意的是，不支持`...`语法

### 最常见的解构案例

> 通常，我们使用日期范围组件的时候组件生产的值是一个数组，但是往往服务端都是以 startDate,endDate 的方式做存储，如果每次前端都花大量精力去转换的话，其实成本还是很高的。所以，我们可以借助字段解构，轻松解决该问题.

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { SchemaForm, Field, FormButtonGroup, Submit, Reset } from '@uform/antd'
import { Button } from '@alifd/antd'
import Printer from '@uform/printer'
import 'antd/dist/antd.css'

const App = () => (
  <Printer>
    <SchemaForm labelCol={6} wrapperCol={6}>
      <Field type="daterange" name="daterange" title="未解构日期" required />
      <Field
        type="daterange"
        name="[startDate,endDate]"
        title="已解构日期"
        required
      />
      <FormButtonGroup offset={6}>
        <Submit>点击查看解构结果</Submit>
        <Reset />
      </FormButtonGroup>
    </SchemaForm>
  </Printer>
)
ReactDOM.render(<App />, document.getElementById('root'))
```

### 根据自定义组件的复杂解构

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import {
  SchemaForm,
  Field,
  FormButtonGroup,
  Submit,
  Reset,
  registerFormField,
  connect
} from '@uform/antd'
import { Button } from '@alifd/antd'
import Printer from '@uform/printer'
import 'antd/dist/antd.css'

registerFormField(
  'complex',
  connect()(({ value, onChange }) => {
    return (
      <div>
        <Button
          onClick={() => {
            onChange({
              aa: {
                bb: {
                  cc: 123,
                  dd: [333, 444],
                  ee: 'abcde'
                }
              }
            })
          }}
        >
          点击上传复杂数据
        </Button>
        <code>
          <pre>{JSON.stringify(value, null, 2)}</pre>
        </code>
      </div>
    )
  })
)

const App = () => (
  <Printer>
    <SchemaForm labelCol={6} wrapperCol={6}>
      <Field
        type="complex"
        name="{aa:{bb:{cc:destructor1,dd:[destructor2,destructor3],ee}}}"
        title="复杂解构"
        required
      />
      <FormButtonGroup offset={6}>
        <Submit>点击查看解构结果</Submit>
        <Reset />
      </FormButtonGroup>
    </SchemaForm>
  </Printer>
)
ReactDOM.render(<App />, document.getElementById('root'))
```

### 嵌套数据结构中的字段解构

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import {
  SchemaForm,
  Field,
  FormButtonGroup,
  Submit,
  Reset,
  registerFormField,
  connect,
  FormLayout
} from '@uform/antd'
import { Button } from '@alifd/antd'
import Printer from '@uform/printer'
import 'antd/dist/antd.css'

registerFormField(
  'complex',
  connect()(({ value, onChange }) => {
    return (
      <div>
        <Button
          onClick={() => {
            onChange({
              aa: {
                bb: {
                  cc: 123,
                  dd: [333, 444],
                  ee: 'abcde'
                }
              }
            })
          }}
        >
          点击上传复杂数据
        </Button>
        <code>
          <pre>{JSON.stringify(value, null, 2)}</pre>
        </code>
      </div>
    )
  })
)

const App = () => (
  <Printer>
    <SchemaForm>
      <Field type="object" name="wrapper">
        <FormLayout labelCol={6} wrapperCol={6}>
          <Field
            type="complex"
            name="{aa:{bb:{cc:destructor1,dd:[destructor2,destructor3],ee}}}"
            title="复杂解构"
            required
          />
        </FormLayout>
      </Field>
      <FormButtonGroup offset={6}>
        <Submit>点击查看解构结果</Submit>
        <Reset />
      </FormButtonGroup>
    </SchemaForm>
  </Printer>
)
ReactDOM.render(<App />, document.getElementById('root'))
```

### 使用 FormPath 路径匹配处理联动

> 注意使用`[[]]`来包裹带关键字的 name 才能匹配

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import {
  SchemaForm,
  Field,
  FormButtonGroup,
  Submit,
  Reset,
  registerFormField,
  connect,
  FormLayout,
  FormPath
} from '@uform/antd'
import { Button } from '@alifd/antd'
import Printer from '@uform/printer'
import 'antd/dist/antd.css'

registerFormField(
  'complex',
  connect()(({ value, onChange }) => {
    return (
      <div>
        <Button
          onClick={() => {
            onChange({
              aa: {
                bb: {
                  cc: 123,
                  dd: [333, 444],
                  ee: 'abcde'
                }
              }
            })
          }}
        >
          点击上传复杂数据
        </Button>
        <code>
          <pre>{JSON.stringify(value, null, 2)}</pre>
        </code>
      </div>
    )
  })
)

const App = () => (
  <Printer>
    <SchemaForm
      effects={($, { setFieldState }) => {
        $('onFieldChange', 'wrapper.relation').subscribe(({ value }) => {
          setFieldState(
            FormPath.match(
              'wrapper.[[{aa:{bb:{cc:destructor1,dd:\\[destructor2,destructor3\\],ee}}}]]'
            ),
            state => {
              state.visible = value == 2
            }
          )
        })
      }}
    >
      <Field type="object" name="wrapper">
        <FormLayout labelCol={6} wrapperCol={6}>
          <Field
            name="relation"
            type="string"
            title="隐藏复杂解构"
            default={1}
            enum={[{ label: '是', value: 1 }, { label: '否', value: 2 }]}
          />
          <Field
            type="complex"
            name="{aa:{bb:{cc:destructor1,dd:[destructor2,destructor3],ee}}}"
            title="复杂解构"
            required
          />
        </FormLayout>
      </Field>
      <FormButtonGroup offset={6}>
        <Submit>点击查看解构结果</Submit>
        <Reset />
      </FormButtonGroup>
    </SchemaForm>
  </Printer>
)
ReactDOM.render(<App />, document.getElementById('root'))
```
