English | [简体中文](./README.zh-cn.md)

<p align="center">
<img src="https://img.alicdn.com/tfs/TB1MdJYuYj1gK0jSZFuXXcrHpXa-2500-1200.png">
<a href="https://www.npmjs.com/package/@formily/core"><img src="https://img.shields.io/npm/v/@formily/core.svg"></a>
<a href="https://www.npmjs.com/package/@formily/react"><img src="https://img.shields.io/npm/v/@formily/react.svg"></a>
<a href="https://travis-ci.com/alibaba/formily"><img src="https://travis-ci.com/alibaba/formily.svg?branch=master"></a>
<a href="https://standardjs.com"><img src="https://img.shields.io/badge/code_style-standard-brightgreen.svg"></a>
<a href="https://app.netlify.com/sites/formily/deploys"><img src="https://api.netlify.com/api/v1/badges/7145918b-9cb5-47f8-8a42-111969e232ef/deploy-status"/></a>
</p>

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
npm install --save antd @formily/antd
```

Use Fusion Design：

```bash
npm install --save @alifd/next @formily/next
```

Use formily react render engine pacakge:

```bash
npm install --save @formily/react-schema-renderer
```

Use formily react package:

```bash
npm install --save @formily/react
```

Use formily core package:

```bash
npm install --save @formily/core
```

## Architecture

![](https://img.alicdn.com/tfs/TB1BvlRu4D1gK0jSZFsXXbldVXa-1882-1144.png)


## WebSite

https://formilyjs.org

## Documents

- [@formily/antd](./packages/antd/README.md)
- [@formily/next](./packages/next/README.md)
- [@formily/react-schema-renderer](./packages/react-schema-renderer/README.md)
- [@formily/react](./packages/react/README.md)
- [@formily/core](./packages/core/README.md)


## Demo

[codesandbox](https://codesandbox.io/s/o5up7)

## Community

| Online Chat Room                                             | 微信                                                         | 钉钉 |
| ------------------------------------------------------------ | ------------------------------------------------------------ | ---- |
| [gitter.im](https://gitter.im/alibaba-formily/community?source=orgpage) | <img width="200" src="https://img.alicdn.com/tfs/TB1jhm5VNYaK1RjSZFnXXa80pXa-620-824.png"/> |   <img width="200" src="https://img.alicdn.com/tfs/TB1pHMzUrPpK1RjSZFFXXa5PpXa-620-818.png"/>   |


## Contributors

This project exists thanks to all the people who contribute. 
<a href="https://github.com/alibaba/formily/graphs/contributors"><img src="https://opencollective.com/formily/contributors.svg?width=890" /></a>


## LICENSE

Formily is open source software licensed as
[MIT](https://github.com/alibaba/formily/blob/master/LICENSE.md).
