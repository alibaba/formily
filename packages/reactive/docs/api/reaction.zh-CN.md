# reaction

## 描述

接收一个 tracker 函数，与 callback 响应函数，如果 tracker 内部有消费 observable 数据，数据发生变化时，tracker 函数会重复执行，但是 callback 执行必须要求 tracker 函数返回值发生变化时才执行

## 签名

```ts
interface IReactionOptions<T> {
  name?: string
  equals?: (oldValue: T, newValue: T) => boolean //脏检查
  fireImmediately?: boolean //是否第一次默认触发，绕过脏检查
}

interface reaction<T> {
  (
    tracker: () => T,
    subscriber?: (newValue: T, oldValue: T) => void,
    options?: IReactionOptions<T>
  ): void
}
```

## 用例

```ts
import { observable, reaction, batch } from '@formily/reactive'

const obs = observable({
  aa: 1,
  bb: 2,
})

const dispose = reaction(() => {
  return obs.aa + obs.bb
}, console.log)

batch(() => {
  //不会触发，因为obs.aa + obs.bb值没变
  obs.aa = 2
  obs.bb = 1
})

obs.aa = 4

dispose()
```
