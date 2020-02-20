# UForm 迁移 Formily

想必很多人都是 UForm 的用户，目前 UForm 已经改名 Formily。
Formily 代表着，它已经是一个集团性的技术产品，Formily 的 API，经历了内部无数次的讨论与设计，现在终于成型，这也是我们内部目前为止最满意的一个版本，Formily 是一个具有里程碑意义的产品，这是我们第一次在一个具体技术领域，整合了众多 BU 一同共建的对外开源产品。

目前 Formily 小组的团队成员有：

项目组长：元彦，大果

核心维护人(参与者)：白玄，鬼鼠，黄子毅，云数，玉门，载溪，锦此，秋逢，晓松，浅末，松屹

好了，下面我们看看具体从 UForm 到 Formily，我们需要做哪些事情？

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
import { SchemaForm, Field } from '@uform/antd'

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
import { SchemaForm, SchemaMarkupField as Field } from '@formily/antd'
import { setup } from '@formily/antd-components'

setup() //内部会完全按照UForm注册规则将组件注册一遍

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
