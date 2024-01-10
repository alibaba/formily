# markObservable

## 描述

标记任意一个对象或者类原型为可被 observable 劫持，在@formily/reactive 中会自动绕过 React Node 与带有 toJSON/toJS 方法的对象，特殊场景，我们可能希望该对象应该被劫持，所以可以使用 markObservable 标记

## 签名

```ts
interface markObservable<T> {
  (target: T): T
}
```

## 用例

```ts
import { observable, autorun, markObservable } from '@formily/reactive'

class A {
  property = ''

  toJSON() {}
}

const a = observable(new A())

autorun(() => {
  console.log(a.property) //property变化时不会被触发，因为A实例中有toJSON方法
})

a.property = 123

//--------------------------------------------

const b = observable(markObservable(new A())) //实例级标记，只对当前实例生效

autorun(() => {
  console.log(b.property) //property变化时可以被触发，因为已被标记observable
})

b.property = 123

//--------------------------------------------

markObservable(A) //类级标记，那么所有实例都会生效

const c = observable(new A())

autorun(() => {
  console.log(c.property) //property变化时可以被触发，因为已被标记observable
})

c.property = 123
```
