# action

## 描述

定义一个批量动作。与 batch 的唯一差别就是 action 内部是无法收集依赖的

## 签名

```ts
interface action {
  <T>(callback?: () => T): T //原地action
  scope<T>(callback?: () => T): T //原地局部action
  bound<T extends (...args: any[]) => any>(callback: T, context?: any): T //高阶绑定
}
```

## 用例

```ts
import { observable, action } from '@formily/reactive'

const obs = observable({})

const method = action.bound(() => {
  obs.aa = 123
  obs.bb = 321
})

method()
```
