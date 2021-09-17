# toJS

## 描述

深度递归将 observable 对象转换成普通 JS 对象

注意：如果对一个已经是 observable 的对象标记 markRaw，那么 toJS，是不会将它转换成普通对象的

## 签名

```ts
interface toJS<T> {
  (target: T): T
}
```

## 用例

```ts
import { observable, autorun, toJS } from '@formily/reactive'

const obs = observable({
  aa: {
    bb: {
      cc: 123,
    },
  },
})

const js = toJS(obs)

autorun(() => {
  console.log(js.aa.bb.cc) //变化时不会触发
})

js.aa.bb.cc = 321
```
