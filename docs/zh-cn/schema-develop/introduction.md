# 介绍

在 Formily 中，主要有三种开发模式，主要是：

- JSON Schema 开发表单
  - 该方案主要用于后端动态渲染表单
- JSX Schema 开发表单
  - 该方案主要用于后端动态渲染表单的过渡形态，Schema 在前端维护，方便未来迁移后端动态渲染模式
- 纯 JSX(源码) 开发表单
  - 该方案主要用于纯前端开发方式，或者在前两个方案的自定义组件内部的开发以复合形态来开发。

下面我们以具体例子来详细介绍不同开发模式的差异，案例右下角可以查看源码也可以跳转至 CodeSandbox 中试玩该例子。
我们在看例子的过程中不需要详细理解具体 API，只需要了解个大概即可。

## JSON Schema 开发表单

> 在该例子中，只需要了解我们需要用到一个叫 SchemaForm 的组件，同时需要给该组件传递一个叫做 schema 的属性，该属性接收一个 json 对象。

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { SchemaForm, FormButtonGroup, Submit } from '@formily/next'
import { Input } from '@formily/next-components'
import '@alifd/next/dist/next.css'

const App = () => {
  return (
    <SchemaForm
      components={{
        Input
      }}
      onSubmit={console.log}
      schema={{
        type: 'object',
        'x-component-props': {
          labelCol: 7,
          wrapperCol: 12
        },
        properties: {
          string: {
            type: 'string',
            title: 'String',
            'x-component': 'Input'
          }
        }
      }}
    >
      <FormButtonGroup offset={7}>
        <Submit>提交</Submit>
      </FormButtonGroup>
    </SchemaForm>
  )
}
ReactDOM.render(<App />, document.getElementById('root'))
```

## JSX Schema 开发表单

> JSX Schema 是一种对前端更友好的前端维护 Schema 的开发模式。
> 主要是使用了 SchemaForm 组件和 SchemaMarkupField 组件，SchemaMarkupField 是一个描述型标签，它不是实际的 UI 组件，只能再 SchemaForm 内部使用，这个标签属性与 JSON Schema 中的 Field 对象是等价的
>
> **注意：SchemaForm 的子节点不能随意插入任何 div 之类的实际 UI 节点，否则它会被推到 Form 底部去渲染。**

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import {
  SchemaForm,
  FormButtonGroup,
  Submit,
  SchemaMarkupField as Field
} from '@formily/next'
import { Input } from '@formily/next-components'
import '@alifd/next/dist/next.css'

const App = () => (
  <SchemaForm
    components={{ Input }}
    labelCol={7}
    wrapperCol={12}
    onSubmit={console.log}
  >
    <div style={{ padding: 20, margin: 20, border: '1px solid red' }}>
      这是一个非Field类标签，会被挪到最底部渲染
    </div>
    <Field type="string" title="String" name="string" x-component="Input" />
    <FormButtonGroup offset={7}>
      <Submit>提交</Submit>
    </FormButtonGroup>
  </SchemaForm>
)
ReactDOM.render(<App />, document.getElementById('root'))
```

## 纯 JSX(源码) 开发表单

> 纯源码开发，没有任何 Schema 束缚，它更简单，更直接，对于一些简单页面，或者 Schema 开发中的自定义组件中，使用纯 JSX 开发模式会更高效

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { Form, FormItem, FormButtonGroup, Submit } from '@formily/next'
import { Input } from '@formily/next-components'
import '@alifd/next/dist/next.css'

const App = () => (
  <Form labelCol={7} wrapperCol={12} onSubmit={console.log}>
    <div style={{ padding: 20, margin: 20, border: '1px solid red' }}>
      Form组件内部可以随便插入UI元素了
    </div>
    <FormItem label="String" name="string" component={Input} />
    <FormButtonGroup offset={7}>
      <Submit>提交</Submit>
    </FormButtonGroup>
  </Form>
)

ReactDOM.render(<App />, document.getElementById('root'))
```
