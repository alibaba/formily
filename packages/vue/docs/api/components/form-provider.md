---
order: 6
---

# FormProvider

## 描述

入口组件，用于下发表单上下文给字段组件，负责整个表单状态的通讯，它相当于是一个通讯枢纽。

## 签名

```ts
type FormProvider = Vue.Component<
  any,
  any,
  any,
  {
    form: Form //通过createForm创建的form实例
  }
>
```

Form 参考[Form](https://core.formilyjs.org/api/models/form)

## 用例

<dumi-previewer demoPath="api/components/form-provider" />
