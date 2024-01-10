# 介绍

@formily/vue 的核心定位是将 ViewModel([@formily/core](//core.formilyjs.org))与组件实现一个状态绑定关系，它不负责管理表单数据，表单校验，它仅仅是一个渲染胶水层，但是这样一层胶水，并不脏，它会把很多脏逻辑优雅的解耦，变得可维护。

## 超高性能

借助 [@formily/core](//core.formilyjs.org) 的响应式模型，@formily/vue 无需做任何优化即可获得超高的性能优势，依赖追踪，精确更新，按需渲染，让我们的表单真正做到了只需关注业务逻辑，无需考虑性能问题。

## 开箱即用

@formily/vue 提供了一系列的 Vue 组件，比如 Field/ArrayField/ObjectField/VoidField，用户在使用的时候，只需要给 Field 组件传入 component 属性(支持 value/@change 这样的双向绑定约定)即可快速接入@formily/vue，接入成本极低。

## 协议驱动

@formily/vue 提供了 SchemaField 这样的协议驱动组件，同时是基于标准 JSON-Schema 的驱动，让表单开发可以变得更加动态化，可配置化，更甚，我们可以做到一份协议，让多端渲染表单。

## 场景复用

借助协议驱动的能力，我们可以将一个携带业务逻辑的协议片段抽象成一个场景组件，帮助用户在某些场景上高效开发，比如 FormTab、FormStep 这类场景组件。

## 智能提示

因为 formily 是完全的 Typescript 项目，所以用户在 VSCode 或 WebStorm 等上开发可以获得最大化的智能提示体验

![img](https://img.alicdn.com/imgextra/i2/O1CN01yiREHk1X95KJPPz1c_!!6000000002880-2-tps-2014-868.png)

## 状态可观测

安装 [FormilyDevtools](https://chrome.google.com/webstore/detail/formily-devtools/kkocalmbfnplecdmbadaapgapdioecfm?hl=zh-CN) 可以实时观测模型状态变化，排查问题

![img](https://img.alicdn.com/imgextra/i4/O1CN01DSci5h1rAGfRafpXw_!!6000000005590-2-tps-2882-1642.png)
