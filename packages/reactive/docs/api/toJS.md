# toJS

## 描述

深度递归将 observable 对象转换成普通 JS 对象

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
