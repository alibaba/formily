# UForm原理

## 核心架构

![img](https://cdn.nlark.com/lark/0/2018/png/16211/1545062144497-af611eb2-8d7a-4831-b525-cdee05539235.png)

目前UForm主要分为三层结构

- @uform/core层，负责表单内部的数据状态管理，校验管理，副作用逻辑管理
- @uform/react层，负责在React中集成UForm，帮助用户快速接入各种React组件库
- 组件库层，属于@uform/react的插件包，可以接入各种组件库，比如antd/fusion next

最终，我们使用的是@uform/next或者@uform/antd等等，他们的核心API都将继承@uform/react的API

