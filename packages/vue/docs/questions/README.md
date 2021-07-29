---
sidebar: auto
---

# 常见问题

## 如何添加事件？

`x-component-props` 中可以用 `@` 来标识事件，同时也支持 `onXxx` 这种方式来标识事件。两者区别在于使用 `@` 标识的内容不会再作为 prop 传入组件，而 `onXxx` 这种会。这是为了兼容某些组件具有 `onXxx` 的 prop，如 ElementUI 中的 [upload 组件](https://element.eleme.cn/#/zh-CN/component/upload#attribute)。

::: warning
事件名冲突时，`@` 的优先级更高。例如同时设置了 `@change` 和 `onChange`，只有 `@change` 会生效。
:::

<dumi-previewer demoPath="questions/events" />

## 如何使用插槽？

使用 `x-content` 可以在组件的 `default` 插槽中插入内容。可以传入文本或组件。

<dumi-previewer demoPath="questions/default-slot" />

## 如何使用具名插槽？

`x-content` 中以键名来表示插槽名。

::: danger
注意键名不可包含 `template`、`render`、`setup` 三个关键字，否则整个 `x-content` 会被当做 vue 组件进行渲染。
:::

<dumi-previewer demoPath="questions/named-slot" />
