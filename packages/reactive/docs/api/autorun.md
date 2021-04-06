# autorun

## 描述

接收一个 tracker 函数，如果函数内部有消费 observable 数据，数据发生变化时，tracker 函数会重复执行

## 签名

```ts
interface autorun {
  (tracker: () => void, name?: string): void
}
```

## 用例

```ts
import { observable, autorun } from '@formily/reactive'

const obs = observable({})

const dispose = autorun(() => {
  console.log(obs.aa)
})

obs.aa = 123

dispose()
```
