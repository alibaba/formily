# markRaw

## 描述

标记任意一个对象或者类原型为永远不可被 observable 劫持，优先级比 markObservable 高

## 签名

```ts
interface markRaw<T> {
  (target: T): T
}
```

## 用例

```ts
import { observable, autorun, markRaw } from '@formily/reactive'

class A {
  property = ''
}

const a = observable(new A())

autorun(() => {
  console.log(a.property) //property变化时会被触发，因为A实例是普通对象
})

a.property = 123

//--------------------------------------------

const b = observable(markRaw(new A())) //实例级标记，只对当前实例生效

autorun(() => {
  console.log(b.property) //property变化时不会被触发，因为已被标记raw
})

b.property = 123

//--------------------------------------------

markRaw(A) //类级标记，那么所有实例都会生效

const c = observable(new A())

autorun(() => {
  console.log(c.property) //property变化时不会被触发，因为已被标记raw
})

c.property = 123
```
