# observe

## 描述

与 autorun/reaction/Tracker 非常不一样，使用 observe 会监听 observable 对象的所有操作，支持深度监听也支持浅监听

<Alert>
注意：读取操作是不会被监听到的
</Alert>

## 签名

```ts
type PropertyKey = string | number | symbol

type ObservablePath = Array<string | number>

type OperationType =
  | 'add'
  | 'delete'
  | 'clear'
  | 'set'
  | 'get'
  | 'iterate'
  | 'has'

interface IChange {
  key?: PropertyKey
  path?: ObservablePath
  object?: object
  value?: any
  oldValue?: any
  type?: OperationType
}

interface IDispose {
  (): void
}

interface observe {
  (
    target: object,
    observer?: (change: IChange) => void,
    deep?: boolean //默认为true
  ): IDispose //释放监听
}
```

## 用例

```ts
import { observable, observe } from '@formily/reactive'

const obs = observable({
  aa: 11,
})

const dispose = observe(obs, (change) => {
  console.log(change)
})

obs.aa = 22

dispose()
```
