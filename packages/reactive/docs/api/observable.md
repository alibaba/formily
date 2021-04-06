# observable

> 主要用于创建不同响应式行为的 observable 对象，同时可以作为 annotation 给 define 用于标记响应式属性

## observable/observable.deep

### 描述

创建深度劫持响应式对象

### 签名

```ts
interface observable<T extends object> {
  (target: T): T
}

interface deep<T extends object> {
  (target: T): T
}
```

### 用例

```ts
import { observable, autorun } from '@formily/reactive'

const obs = observable({
  aa: {
    bb: 123,
  },
})

autorun(() => {
  console.log(obs.aa.bb)
})

obs.aa.bb = 321
```

## observable.shallow

### 描述

创建浅劫持响应式对象，也就是只会对目标对象的第一级属性操作响应

### 签名

```ts
interface shallow<T extends object> {
  (target: T): T
}
```

### 用例

```ts
import { observable, autorun } from '@formily/reactive'

const obs = observable.shallow({
  aa: {
    bb: 111,
  },
})

autorun(() => {
  console.log(obs.aa.bb)
})

obs.aa.bb = 222 // 不会响应
obs.aa = { bb: 333 } // 可以响应
```

## observable.computed

### 描述

创建一个计算缓存器

### 签名

```ts
interface computed {
  <T extends () => any>(target: T): { value: ReturnType<T> }
  <T extends { get?: () => any; set?: (value: any) => void }>(target: T): {
    value: ReturnType<T['get']>
  }
}
```

### 用例

```ts
import { observable, autorun } from '@formily/reactive'

const obs = observable({
  aa: 11,
  bb: 22,
})

const computed = observable.computed(() => obs.aa + obs.bb)

autorun(() => {
  console.log(computed.value)
})

obs.aa = 33
```

## observable.ref

### 描述

创建引用劫持响应式对象

### 签名

```ts
interface ref<T extends object> {
  (target: T): { value: T }
}
```

### 用例

```ts
import { observable, autorun } from '@formily/reactive'

const ref = observable.ref(1)

autorun(() => {
  console.log(ref.value)
})

ref.value = 2
```

## observable.box

### 描述

与 ref 相似，只是读写数据是通过 get/set 方法

### 签名

```ts
interface box<T extends object> {
  (target: T): { get: () => T; set: (value: T) => void }
}
```

### 用例

```ts
import { observable, autorun } from '@formily/reactive'

const box = observable.box(1)

autorun(() => {
  console.log(box.get())
})

box.set(2)
```
