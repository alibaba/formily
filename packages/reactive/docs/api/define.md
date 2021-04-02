# define

## 描述

手动定义领域模型，可以指定具体属性的响应式行为，也可以指定某个方法为 batch 模式

## 签名

```ts
interface define<Target extends object> {
  (
    target: Target,
    annotations?: {
      [key: string]: (...args: any[]) => any
    }
  ): Target
}
```

## Annotations

目前支持的所有 Annotation 有：

- observable/observable.deep 定义深度劫持响应式属性
- observable.box 定义 get/set 容器
- observable.computed 定义计算属性
- observable.ref 定义引用劫持响应式属性
- observable.shallow 定义浅劫持响应式属性
- action/batch 定义批处理方法

## 用例

```ts
import { define, observable, action, autorun } from '@formily/reactive'

class DomainModel {
  deep = { aa: 1 }
  shallow = {}
  box = 0
  ref = ''

  constructor() {
    define(this, {
      deep: observable,
      shallow: observable.shallow,
      box: observable.box,
      ref: observable.ref,
      computed: observable.computed,
      action,
    })
  }

  get computed() {
    return this.deep.aa + this.box.get()
  }
  action(aa, box) {
    this.deep.aa = aa
    this.box.set(box)
  }
}

const model = new DomainModel()

autorun(() => {
  console.log(model.computed)
})

model.action(1, 2)
model.action(1, 2) //重复调用不会重复响应
model.action(3, 4)
```
