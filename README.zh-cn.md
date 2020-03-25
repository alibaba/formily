[English](./README.md) | 简体中文

<p align="center">
<img src="https://img.alicdn.com/tfs/TB1DIpUu7L0gK0jSZFxXXXWHVXa-2500-1200.png">
<a href="https://www.npmjs.com/package/@formily/core"><img src="https://img.shields.io/npm/v/@formily/core.svg"></a>
<a href="https://www.npmjs.com/package/@formily/react"><img src="https://img.shields.io/npm/v/@formily/react.svg"></a>
<a href="https://travis-ci.com/alibaba/formily"><img src="https://travis-ci.com/alibaba/formily.svg?branch=master"></a>
<a href="https://standardjs.com"><img src="https://img.shields.io/badge/code_style-standard-brightgreen.svg"></a>
<a href="https://app.netlify.com/sites/formily/deploys"><img src="https://api.netlify.com/api/v1/badges/7145918b-9cb5-47f8-8a42-111969e232ef/deploy-status"/></a>
</p>

---

## 背景

在React中，在受控模式下，表单的整树渲染问题非常明显。特别是对于数据联动的场景，很容易导致页面卡顿，为了解决这个问题，我们将每个表单字段的状态做了分布式管理，从而大大提升了表单操作性能。同时，我们深度整合了JSON Schema协议，可以帮助您快速解决后端驱动表单渲染的问题。

## 特性

- 🚀 高性能，字段分布式渲染，大大减轻 React 渲染压力
- 💡 支持 Ant Design/Fusion Next 组件体系
- 🎨 JSX 标签化写法/JSON Schema 数据驱动方案无缝迁移过渡
- 🏅 副作用逻辑独立管理，涵盖各种复杂联动校验逻辑
- 🌯 支持各种表单复杂布局方案

## 安装

使用 Ant Design：

```bash
npm install --save antd @formily/antd @formily/antd-components
```

使用 Fusion Design：

```bash
npm install --save @alifd/next @formily/next @formily/next-components
```

使用Formily React渲染引擎包:

```bash
npm install --save @formily/react-schema-renderer
```

使用 Formily React包:

```bash
npm install --save @formily/react
```

使用 Formily 核心包:

```bash
npm install --save @formily/core
```

## 官网

https://formilyjs.org

## 架构

![](https://img.alicdn.com/tfs/TB1BvlRu4D1gK0jSZFsXXbldVXa-1882-1144.png)

## 文档

- [@formily/antd](./packages/antd/README.zh-cn.md)
- [@formily/next](./packages/next/README.zh-cn.md)
- [@formily/react-schema-renderer](./packages/react-schema-renderer/README.zh-cn.md)
- [@formily/react](./packages/react/README.zh-cn.md)
- [@formily/core](./packages/core/README.zh-cn.md)


## 入门案例

[codesandbox](https://codesandbox.io/s/o5up7)

## 集团其他产品

- [icejs](https://github.com/alibaba/ice)


## 贡献者

This project exists thanks to all the people who contribute. 
<a href="https://github.com/alibaba/formily/graphs/contributors"><img src="https://opencollective.com/formily/contributors.svg?width=890" /></a>


## LICENSE

Formily is open source software licensed as
[MIT.](https://github.com/alibaba/formily/blob/master/LICENSE.md)
