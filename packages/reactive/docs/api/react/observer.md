# observer

## 描述

在 React 中，将 Function Component 变成 Reaction，每次视图重新渲染就会收集依赖，依赖更新会自动重渲染

<Alert>
注意：只支持Function Component
</Alert>

## 签名

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

## 用例

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
