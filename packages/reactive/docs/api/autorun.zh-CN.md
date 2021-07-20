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

## autorun.memo

### 描述

在 autorun 中用于创建持久引用数据，仅仅只会受依赖变化而重新执行 memo 内部函数

注意：请不要在 If/For 这类语句中使用，因为它内部是依赖执行顺序来绑定当前 autorun 的

### 签名

```ts
interface memo<T> {
  (callback: () => T, dependencies: any[] = []): T
}
```

注意：依赖默认为`[]`，也就是如果不传依赖，代表永远不会执行第二次

### 用例

```ts
import { observable, autorun } from '@formily/reactive'

const obs1 = observable({
  aa: 0,
})

const dispose = autorun(() => {
  const obs2 = autorun.memo(() =>
    observable({
      bb: 0,
    })
  )
  console.log(obs1.aa, obs2.bb++)
})

obs1.aa++
obs1.aa++
obs1.aa++
//执行四次，输出结果为
/**
 * 0 0
 * 1 1
 * 2 2
 * 3 3
 */

dispose()
```

## autorun.effect

### 描述

在 autorun 中用于响应 autorun 第一次执行的下一个微任务时机与响应 autorun 的 dispose

注意：请不要在 If/For 这类语句中使用，因为它内部是依赖执行顺序来绑定当前 autorun 的

### 签名

```ts
interface effect {
  (callback: () => void | (() => void), dependencies: any[] = [{}]): void
}
```

注意：依赖默认为`[{}]`，也就是如果不传依赖，代表会持续执行，因为内部脏检查是浅比较

### 用例

```ts
import { observable, autorun } from '@formily/reactive'

const obs1 = observable({
  aa: 0,
})
const fn = jest.fn()
const dispose = autorun(() => {
  const obs2 = autorun.memo(() =>
    observable({
      bb: 0,
    })
  )
  console.log(obs1.aa, obs2.bb++)
  autorun.effect(() => {
    obs2.bb++
  }, [])
})
obs1.aa++
obs1.aa++
obs1.aa++
//执行五次，输出结果为
/**
 * 0 0
 * 1 1
 * 2 2
 * 3 3
 * 3 5
 */

dispose()
```
