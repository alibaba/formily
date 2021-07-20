---
order: 3
---

# Form Hooks API

## createEffectHook

#### 描述

创建自定义钩子监听器

#### 签名

```ts
interface createEffectHook {
  (
    type: string,
    callback?: (
      payload: any,
      form: Form,
      ...ctx: any[] //用户注入的上下文
    ) => (...args: any[]) => void //高阶回调用于处理监听器的封装，帮助用户实现参数定制能力
  )
}
```

#### 用例

```tsx
import React, { useMemo, useState } from 'react'
import { createForm, createEffectHook } from '@formily/core'
import { ActionResponse } from './ActionResponse'

const onCustomEvent = createEffectHook(
  'custom-event',
  (payload, form) => (listener) => {
    listener(payload, form)
  }
)

export default () => {
  const [response, setResponse] = useState('')
  const form = useMemo(
    () =>
      createForm({
        effects() {
          onCustomEvent((payload, form) => {
            setResponse(payload + ' Form: ' + form.id)
          })
        },
      }),
    []
  )
  return (
    <ActionResponse response={response}>
      <button
        onClick={() => {
          form.notify('custom-event', 'This is Custom Event')
        }}
      >
        Notify
      </button>
    </ActionResponse>
  )
}
```

## createEffectContext

#### 描述

在 effects 函数中如果我们抽象了很多细粒度的 hooks，想要在 hooks 里读到顶层上下文数据就需要层层传递，这样明显是很低效的事情，所以 formily 提供了 createEffectContext 帮助用户快速获取上下文数据

#### 签名

```ts
interface createEffectContext<T> {
  (defaultValue: T): {
    provide(value: T): void
    consume(): T
  }
}
```

#### 用例

```tsx
import React, { useMemo, useState } from 'react'
import { createForm, onFormSubmit, createEffectContext } from '@formily/core'
import { ActionResponse } from './ActionResponse'

const { provide, consume } = createEffectContext()

const useMyHook = () => {
  const setResponse = consume()
  onFormSubmit(() => {
    setResponse('上下文通讯成功')
  })
}

export default () => {
  const [response, setResponse] = useState('')
  const form = useMemo(
    () =>
      createForm({
        effects() {
          provide(setResponse)
          useMyHook()
        },
      }),
    []
  )
  return (
    <ActionResponse response={response}>
      <button
        onClick={() => {
          form.submit()
        }}
      >
        提交
      </button>
    </ActionResponse>
  )
}
```

## useEffectForm

#### 描述

useEffectForm 其实是 EffectContext 的便利用法，因为大多数场景用户都会读取 Form 实例，所以就不需要手动定义一个 EffectFormContext

#### 签名

```ts
interface useEffectForm {
  (): Form
}
```

#### 用例

```tsx
import React, { useMemo, useState } from 'react'
import { createForm, useEffectForm, createEffectContext } from '@formily/core'
import { ActionResponse } from './ActionResponse'

const { provide, consume } = createEffectContext()

const useMyHook = () => {
  const form = useEffectForm()
  const setResponse = consume()
  setResponse('通讯成功：' + form.id)
}

export default () => {
  const [response, setResponse] = useState('')
  useMemo(
    () =>
      createForm({
        effects() {
          provide(setResponse)
          useMyHook()
        },
      }),
    []
  )
  return <ActionResponse response={response} />
}
```
