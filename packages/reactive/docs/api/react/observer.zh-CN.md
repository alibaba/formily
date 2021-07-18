# observer

## observer

### 描述

在 React 中，将 Function Component 变成 Reaction，每次视图重新渲染就会收集依赖，依赖更新会自动重渲染

<Alert>
注意：只支持Function Component
</Alert>

### 签名

```ts
interface IObserverOptions {
  forwardRef?: boolean //是否透传引用
  scheduler?: (updater: () => void) => void //调度器，可以手动控制更新时机
  displayName?: string //包装后的组件的displayName
}

interface observer<T extends React.FC> {
  (component: T, options?: IObserverOptions): T
}
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

## Observer

### 描述

类似于 Vue 的响应式 Slot，它接收一个 Function RenderProps，只要在 Function 内部消费到的任何响应式数据，都会随数据变化而自动重新渲染，也更容易实现局部精确渲染

### 签名

```ts
interface IObserverProps {
  children?: () => React.ReactElement
}

type Observer = React.FC<IObserverProps>
```

### 用例

```tsx
/**
 * defaultShowCode: true
 */
import React from 'react'
import { observable } from '@formily/reactive'
import { Observer } from '@formily/reactive-react'

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
