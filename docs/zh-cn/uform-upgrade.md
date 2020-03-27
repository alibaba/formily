# UForm 迁移 Formily

想必很多人都是 UForm 的用户，目前 UForm 已经改名 Formily，下面我们看看具体从 UForm 到 Formily，我们需要做哪些事情？

## 差异

目前 Formily 相对于 UForm 主要有以下变化：

- @uform/antd/next 拆包变成@formily/antd/next 和@formily/antd-components/next-components，需要依赖扩展组件，统一从@formily/\*-components 中依赖
- @formily/antd/next 默认不会加载扩展组件
- @formily/antd/next 支持了纯源码开发模式
- Schema 开发模式支持联动协议和表达式能力
- Field 组件推荐使用 SchemaMarkupField，目前向后兼容
- x-props 从过去代表 UI 组件属性，变为现在代表 formItem 属性，x-component-props 代表 UI 组件属性，目前是向后兼容的

## 升级

基于上面所述的差异来看，目前最大的 break change 就是拆包，并且默认不会加载扩展组件。不过还好，我们提供了平滑迁移的方案。

**过去**

```tsx
import React from 'react'
import { SchemaForm, Field } from '@uform/antd'
import 'antd/dist/antd.css'


const App = () => {
  return (
    <SchemaForm>
      <Field
        name="aa"
        type="string"
        title="AA"
        x-props={{ placeholder: 'Please Input' }}
      />
    </SchemaForm>
  )
}
```

**现在**

```tsx
import React from 'react'
import { SchemaForm, SchemaMarkupField as Field } from '@formily/antd'
import { setup } from '@formily/antd-components'
import 'antd/dist/antd.css'

setup() //内部会完全按照UForm注册规则将组件注册一遍，注意，只需要注册一次即可，一般我们会在项目入口文件上注册

const App = () => {
  return (
    <SchemaForm>
      <Field
        name="aa"
        type="string"
        title="AA"
        x-component-props={{ placeholder: 'Please Input' }}
      />
    </SchemaForm>
  )
}
```
