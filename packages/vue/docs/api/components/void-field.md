---
order: 3
---

# VoidField

## 描述

作为@formily/core 的 [createVoidField](https://core.formilyjs.org/api/models/form#createvoidfield) Vue 实现，它是专门用于将 ViewModel 与虚拟布局控件做绑定的桥接组件，可以用来控制数据型字段的显示隐藏，交互模式等，VoidField 组件属性参考[IVoidFieldFactoryProps](https://core.formilyjs.org/api/models/form#ivoidfieldfactoryprops)

::: warning
我们在使用 VoidField 组件的时候，一定要记得传 name 属性。
:::

## 签名

```ts
type VoidField = Vue.Component<any, any, any, IVoidFieldFactoryProps>
```

## 用例

该例子演示了如何用 VoidField 控制子节点显示隐藏，注意观察，VoidField 隐藏的时候，子节点的数据会同时被清空，因为 visible 为 false 代表 display 为 none，这种隐藏是不会保留字段值的。

但是再次显示的时候，又会恢复现场，这里是 Formily Core 内部的特性，支持完全恢复现场的能力。

<dumi-previewer demoPath="api/components/void-field" />
