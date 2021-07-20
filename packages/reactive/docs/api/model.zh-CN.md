# model

## 描述

快速定义领域模型，会对模型属性做自动声明：

- getter/setter 属性自动声明 computed
- 函数自动声明 action
- 普通属性自动声明 observable

## 签名

```ts
interface model<Target extends object> {
  (target: Target): Target
}
```

## 用例

```ts
import { model, autorun } from '@formily/reactive'

const obs = model({
  aa: 1,
  bb: 2,
  get cc() {
    return this.aa + this.bb
  },
  update(aa, bb) {
    this.cc
  },
})

autorun(() => {
  console.log(obs.cc)
})

obs.aa = 3

obs.update(4, 6)
```
