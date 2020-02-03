# Formily原理

## 核心架构

![img](//img.alicdn.com/tfs/TB12hkLM8LoK1RjSZFuXXXn0XXa-922-538.png)

目前 Formily 主要分为三层结构：

- `@formily/core` 层，负责表单内部的数据状态管理，校验管理，副作用逻辑管理
- `@formily/react` 层，负责在 React 中集成 Formily，帮助用户快速接入各种 React 组件库
- 组件库层，属于 `@formily/react` 的插件包，可以接入各种组件库，比如：Ant Design/Fusion Design

最终，我们使用的是 `@formily/next` 或者 `@formily/antd` 等等，他们的核心 API 都将继承 `@formily/react` 的 API。

