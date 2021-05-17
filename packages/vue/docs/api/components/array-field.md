---
order: 1
---

# ArrayField

## 描述

作为@formily/core 的 [createArrayField](https://core.formilyjs.org/api/models/form#createarrayfield) Vue 实现，它是专门用于将 ViewModel 与输入控件做绑定的桥接组件，ArrayField 组件属性参考[IFieldFactoryProps](https://core.formilyjs.org/api/models/form#ifieldfactoryprops)

::: warning
我们在使用 ArrayField 组件的时候，一定要记得传 name 属性。同时要使用 scoped slots 形式来组织子组件
:::

## 签名

```ts
type ArrayField = Vue.Component<any, any, any, IFieldFactoryProps>
```

## 用例

<dumi-previewer demoPath="api/components/array-field" />
