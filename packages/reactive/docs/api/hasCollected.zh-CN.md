# hasCollected

## 描述

用于检测某段执行逻辑是否存在依赖收集

## 签名

```ts
interface hasCollected {
  (callback?: () => void): boolean
}
```

## 用例

```ts
import { observable, autorun } from '@formily/reactive'

const obs = observable({
  aa: 11,
})

autorun(() => {
  console.log(
    hasCollected(() => {
      obs.aa
    })
  ) //return true
  console.log(
    hasCollected(() => {
      11 + 22
    })
  ) //return false
})

obs.aa = 22
```
