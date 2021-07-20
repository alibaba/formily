# tracker

## 描述

主要用于接入 React/Vue 的手动追踪依赖工具，在依赖发生变化时不会重复执行 tracker 函数，需要用户手动重复执行，只会触发 scheduler

## 签名

```ts
class Tracker {
  constructor(scheduler?: (reaction: this['track']) => void, name?: string)
  track: <T>(tracker?: () => T) => T
  dispose: () => void
}
```

## 用例

```ts
import { observable, Tracker } from '@formily/reactive'

const obs = observable({
  aa: 11,
})

const view = () => {
  console.log(obs.aa)
}

const tracker = new Tracker(() => {
  tracker.track(view)
})

tracker.track(view)

obs.aa = 22

tracker.dispose()
```
