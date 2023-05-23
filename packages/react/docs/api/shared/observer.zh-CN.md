# observer

## observer

### 描述

observer 是一个 [HOC](https://reactjs.bootcss.com/docs/higher-order-components.html)，用于为 react 函数组件添加 reactive 特性。

### 什么时候使用

当一个组件内部使用了 [observable](https://reactive.formilyjs.org/zh-CN/api/observable) 对象，而你希望组件响应 observable 对象的变化时。

### API 定义

```ts
interface IObserverOptions {
  // 是否需要 observer 使用 forwardRef 传递 ref 属性
  forwardRef?: boolean
  scheduler?: (updater: () => void) => void
  displayName?: string
}

function observer<P, Options extends IObserverOptions>(
  component: React.FunctionComponent<P>,
  options?: Options
): React.MemoExoticComponent<
  React.FunctionComponent<
    Options extends { forwardRef: true }
      ? React.PropsWithRef<P>
      : React.PropsWithoutRef<P>
  >
>
```

### 用例

```tsx
/**
 * defaultShowCode: true
 */
import React from 'react'
import { observable } from '@formily/reactive'
import { observer } from '@formily/reactive-react'

const obs = observable({
  value: 'Hello world',
})

export default observer(() => {
  return (
    <div>
      <div>
        <input
          style={{
            height: 28,
            padding: '0 8px',
            border: '2px solid #888',
            borderRadius: 3,
          }}
          value={obs.value}
          onChange={(e) => {
            obs.value = e.target.value
          }}
        />
      </div>
      <div>{obs.value}</div>
    </div>
  )
})
```

### 注意

`observer` 只能接收 callable 函数组件，不支持 `React.forwardRef` | `React.memo` 等包裹的组件。

## Observer

### 描述

类似于 Vue 的响应式 Slot，它接收一个 Function RenderProps，只要在 Function 内部消费到的任何响应式数据，都会随数据变化而自动重新渲染，也更容易实现局部精确渲染

其实该 API 与 FormConsumer 的作用基本一致，只是 FormConsumer 在 RenderProps 参数中透出了当前上下文的 form 实例

### 签名

```ts
interface IObserverProps {
  children?: () => React.ReactElement
}

type Observer = React.FC<React.PropsWithChildren<IObserverProps>>
```

### 用例

```tsx
/**
 * defaultShowCode: true
 */
import React from 'react'
import { observable } from '@formily/reactive'
import { Observer } from '@formily/react'

const obs = observable({
  value: 'Hello world',
})

export default () => {
  return (
    <div>
      <div>
        <Observer>
          {() => (
            <input
              style={{
                height: 28,
                padding: '0 8px',
                border: '2px solid #888',
                borderRadius: 3,
              }}
              value={obs.value}
              onChange={(e) => {
                obs.value = e.target.value
              }}
            />
          )}
        </Observer>
      </div>
      <Observer>{() => <div>{obs.value}</div>}</Observer>
    </div>
  )
}
```
