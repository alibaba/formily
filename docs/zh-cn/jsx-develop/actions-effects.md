# 理解 Actions/Effects

我们见过无数表单，因为复杂度提升，性能逐渐变得越来越差，虽然这也是一个正常情况，但是，如果我们可以尽可能的优化其性能，其实对于业务的收益还是很高的，在 Formily 中，我们将所有表单操作，都抽象成了一个又一个原子型的 target 式操作，而非正常的 React 模式(通过重复渲染根组件来达到状态同步)，所以使得 Formily 在复杂表单场景下的性能非常出众。同时，因为有了原子型的 target 操作模式，我们就可以很轻松的将 Form API 与外部世界无缝平滑的连接起来。

但是，我们的连接方式又不能是简单的 React ref，因为 React ref 很容易被 HOC 拦截，所以我们采用了[react-eva](https://github.com/janrywang/react-eva) 这种十分简单的 API 连接方式，它的核心解决了两个问题：

- 外部调用组件内部 API 的问题，这里主要是使用 actions
- 组件内部事件通知外部的问题，同时借助了 Rxjs 可以方便的处理异步事件流竞态组合问题，这里主要是使用 effects

## 如何调用 Form 内部 API

想要调用 FormAPI，我们必须要：

- 先通过 createFormActions/createAsyncFormActions 创建 actions 实例
- 将 actions 传递给`<SchemaForm/>`或者`<Form/>`组件
  这样就能真正调用 FormAPI 了，具体看以下例子：

```jsx
import React, { useEffect } from 'react'
import ReactDOM from 'react-dom'
import {
  Form,
  FormItem,
  FormButtonGroup,
  createFormActions,
  Submit,
  Reset
} from '@formily/antd' // 或者 @formily/next
import { Input } from 'antd'
import 'antd/dist/antd.css'

const actions = createFormActions()

const App = () => {
  useEffect(() => {
    actions.setFieldState('name', state => {
      state.value = 'First Name'
    })
  }, [])
  return (
    <Form
      actions={actions}
      onSubmit={values => {
        console.log(values)
      }}
    >
      <FormItem name="name" label="Name" component={Input} />
    </Form>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
```

**案例解析**

- 借助 actions，我们可以在外部自由调用 FormAPI
- 注意：调用 actions 中的 API，必须要 Form 初始化完成才能调用，其实我们真实业务逻辑通常也是会在某个异步事件完成后调用，所以对这个初始化时机问题感知不多，如果需要保证调用安全性，我们可以调用 createAsyncFormActions 来创建 actions，但是所创建出来的 actions 的内部所有 API，调用时都会返回 Promise 对象

## 如何监听 Form 内部事件

这部分，已经在生命周期章节中有详细讲解
