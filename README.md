English | [简体中文](./README.zh-cn.md)

<p align="center">
<img src="https://img.alicdn.com/tfs/TB19uf2XBGw3KVjSZFwXXbQ2FXa-1400-689.png">
<a href="https://www.npmjs.com/package/@uform/core"><a href="#backers" alt="sponsors on Open Collective"><img src="https://opencollective.com/uform/backers/badge.svg" /></a> <a href="#sponsors" alt="Sponsors on Open Collective"><img src="https://opencollective.com/uform/sponsors/badge.svg" /></a> <img src="https://img.shields.io/npm/v/@uform/core.svg"></a>
<a href="https://www.npmjs.com/package/@uform/react"><img src="https://img.shields.io/npm/v/@uform/react.svg"></a>
<a href="https://travis-ci.com/alibaba/uform"><img src="https://travis-ci.com/alibaba/uform.svg?branch=master"></a>
<a href="https://standardjs.com"><img src="https://img.shields.io/badge/code_style-standard-brightgreen.svg"></a>
<a href="https://app.netlify.com/sites/uform/deploys"><img src="https://api.netlify.com/api/v1/badges/7145918b-9cb5-47f8-8a42-111969e232ef/deploy-status"/></a>
</p>

<p align="center" style="color:#666;margin-top:10px;">UForm - a high-performance React form solution for handling complicated enterprise requirements.</p>
---

## Background

In React, the whole tree rendering performance problem of the form is very obvious in the controlled mode. Especially for the scene of data linkage, it is easy to cause the page to be stuck. To solve this problem, we have distributed the management of the state of each form field, which significantly improves the performance of the form operations. At the same time, we deeply integrate the JSON Schema protocol to help you solve the problem of back-end driven form rendering quickly.

## Features

- 🚀 High performance, fields managed independently, rather rerender the whole tree.
- 💡 Integrated Alibaba Fusion and Ant Design components are guaranteed to work out of the box.
- 🎨 JSON Schema applied for BackEnd. JSchema applied for FrontEnd. Two paradigms can be converted to each other.
- 🏅 Side effects are managed independently, making form data linkages easier than ever before.
- 🌯 Override most complicated form layout use cases.

## Install

Use Ant Design：

```bash
npm install --save antd @uform/antd
```

Use Fusion Design：

```bash
npm install --save @alifd/next @uform/next
```

Use uform react render engine pacakge:

```bash
npm install --save @uform/react-schema-renderer
```

Use uform react package:

```bash
npm install --save @uform/react
```

Use UForm core package:

```bash
npm install --save @uform/core
```


## WebSite

https://uformjs.org

## Documents

- [@uform/antd](./packages/antd/README.md)
- [@uform/next](./packages/next/README.md)
- [@uform/react-schema-renderer](./packages/react-schema-renderer/README.md)
- [@uform/react](./packages/react/README.md)
- [@uform/core](./packages/core/README.md)


## Demo

[codesandbox](https://codesandbox.io/s/o5up7)

## Community

| Online Chat Room                                             | 微信                                                         | 钉钉 |
| ------------------------------------------------------------ | ------------------------------------------------------------ | ---- |
| [gitter.im](https://gitter.im/alibaba-uform/community?source=orgpage) | <img width="200" src="https://img.alicdn.com/tfs/TB1jhm5VNYaK1RjSZFnXXa80pXa-620-824.png"/> |   <img width="200" src="https://img.alicdn.com/tfs/TB1pHMzUrPpK1RjSZFFXXa5PpXa-620-818.png"/>   |


## Contributors

This project exists thanks to all the people who contribute. 
<a href="https://github.com/alibaba/uform/graphs/contributors"><img src="https://opencollective.com/uform/contributors.svg?width=890&button=false" /></a>


## Backers

Thank you to all our backers! 🙏 [[Become a backer](https://opencollective.com/uform#backer)]

<a href="https://opencollective.com/uform#backers" target="_blank"><img src="https://opencollective.com/uform/backers.svg?width=890"></a>


## Sponsors

Support this project by becoming a sponsor. Your logo will show up here with a link to your website. [[Become a sponsor](https://opencollective.com/uform#sponsor)]



## LICENSE

UForm is open source software licensed as
[MIT](https://github.com/alibaba/uform/blob/master/LICENSE.md).
