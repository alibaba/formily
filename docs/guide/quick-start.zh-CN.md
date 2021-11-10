# 快速开始

## 安装依赖

### 安装内核库

使用 Formily 必须要用到[@formily/core](https://core.formilyjs.org/zh-CN)，它负责管理表单的状态，表单校验，联动等等。

```bash
$ npm install --save @formily/core
```

### 安装 UI 桥接库

单纯有了内核还不够，我们还需要一个 UI 库来接入内核数据，用来实现最终的表单交互效果，对于不同框架的用户，我们有不同的桥接库。

**React 用户**

```bash
$ npm install --save @formily/react
```

**Vue 用户**

```bash
$ npm install --save @formily/vue
```

### 安装组件库

想要快速实现漂亮的表单，通常我们都是需要使用业界优秀的组件库的，比如[Ant Design ](https://ant.design)和 [Alibaba Fusion](https://fusion.design)，但是这些优秀的组件库，在表单的某些场景上覆盖的还是不够全面，比如详情预览态的支持，Ant Design 是不支持的，还有一些场景化的组件它也是不支持的，所以 Formily 在此之上又封装了@formily/antd 和@formily/next，保证用户开箱即用。

**Ant Design 用户**

```bash
$ npm install --save antd moment @formily/antd
```

**Alibaba Fusion 用户**

```bash
$ npm install --save @alifd/next moment @formily/next
```

## 导入依赖

使用 ES Module import 语法导入依赖即可

```ts
import React from 'react'
import { createForm } from '@formily/core'
import { FormProvider, Field } from '@formily/react'
import { FormItem, Input } from '@formily/antd'
```

## 具体用例

```tsx
/**
 * defaultShowCode: true
 */
import React from 'react'
import { createForm } from '@formily/core'
import { FormProvider, FormConsumer, Field } from '@formily/react'
import {
  FormItem,
  FormLayout,
  Input,
  FormButtonGroup,
  Submit,
} from '@formily/antd'

const form = createForm()

export default () => {
  return (
    <FormProvider form={form}>
      <FormLayout layout="vertical">
        <Field
          name="input"
          title="输入框"
          required
          initialValue="Hello world"
          decorator={[FormItem]}
          component={[Input]}
        />
      </FormLayout>
      <FormConsumer>
        {() => (
          <div
            style={{
              marginBottom: 20,
              padding: 5,
              border: '1px dashed #666',
            }}
          >
            实时响应：{form.values.input}
          </div>
        )}
      </FormConsumer>
      <FormButtonGroup>
        <Submit onSubmit={console.log}>提交</Submit>
      </FormButtonGroup>
    </FormProvider>
  )
}
```

从以上例子中，我们可以学到很多东西：

- [createForm](https://core.formilyjs.org/zh-CN/api/entry/create-form)用来创建表单核心领域模型，它是作为[MVVM](https://core.formilyjs.org/guide/mvvm)设计模式的标准 ViewModel
- [FormProvider](https://react.formilyjs.org/zh-CN/api/components/form-provider)组件是作为视图层桥接表单模型的入口，它只有一个参数，就是接收 createForm 创建出来的 Form 实例，并将 Form 实例以上下文形式传递到子组件中
- [FormLayout](https://antd.formilyjs.org/zh-CN/components/form-layout)组件是用来批量控制[FormItem](https://antd.formilyjs.org/zh-CN/components/form-item)样式的组件，这里我们指定布局为上下布局，也就是标签在上，组件在下
- [Field](https://react.formilyjs.org/zh-CN/api/components/field)组件是用来承接普通字段的组件
  - name 属性，标识字段在表单最终提交数据中的路径
  - title 属性，标识字段的标题
    - 如果 decorator 指定为 FormItem，那么在 FormItem 组件中会默认以接收 title 属性作为标签
    - 如果指定为某个自定义组件，那么 title 的消费方则由自定义组件来承接
    - 如果不指定 decorator，那么 title 则不会显示在 UI 上
  - required 属性，必填校验的极简写法，标识该字段必填
    - 如果 decorator 指定为 FormItem，那么会自动出现星号提示，同时校验失败也会有对应的状态反馈，这些都是 FormItem 内部做的默认处理
    - 如果 decorator 指定为自定义组件，那么对应的 UI 样式则需要自定义组件实现方自己实现
    - 如果不指定 decorator，那么 required 只是会阻塞提交，校验失败不会有任何 UI 反馈。
  - initialValue 属性，代表字段的默认值
  - decorator 属性，代表字段的 UI 装饰器，通常我们都会指定为 FormItem
    - 注意 decorator 属性传递的是数组形式，第一个参数代表指定组件类型，第二个参数代表指定组件属性
  - component 属性，代表字段的输入控件，可以是 Input，也可以是 Select，等等
    - 注意 component 属性传递的是数组形式，第一个参数代表指定组件类型，第二个参数代表指定组件属性
- [FormConsumer](https://react.formilyjs.org/zh-CN/api/components/form-consumer)组件是作为响应式模型的响应器而存在，它核心是一个 render props 模式，在作为 children 的回调函数中，会自动收集所有依赖，如果依赖发生变化，则会重新渲染，借助 FormConsumer 我们可以很方便的实现各种计算汇总的需求
- [FormButtonGroup](https://antd.formilyjs.org/zh-CN/components/form-button-group)组件作为表单按钮组容器而存在，主要负责按钮的布局
- [Submit](https://antd.formilyjs.org/zh-CN/components/submit)组件作为表单提交的动作触发器而存在，其实我们也可以直接使用 form.submit 方法进行提交，但是使用 Submit 的好处是不需要每次都在 Button 组件上写 onClick 事件处理器，同时它还处理了 Form 的 loading 状态，如果 onSubmit 方法返回一个 Promise，且 Promise 正在 pending 状态，那么按钮会自动进入 loading 状态
