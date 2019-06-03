English | [简体中文](./README.zh-cn.md)

<p align="center">
<img src="https://img.alicdn.com/tfs/TB19uf2XBGw3KVjSZFwXXbQ2FXa-1400-689.png">
<a href="https://www.npmjs.com/package/@uform/core"><img src="https://img.shields.io/npm/v/@uform/core.svg"></a>
<a href="https://www.npmjs.com/package/@uform/react"><img src="https://img.shields.io/npm/v/@uform/react.svg"></a>
<a href="https://www.npmjs.com/package/@uform/next"><img src="https://img.shields.io/npm/v/@uform/next.svg"></a>
<a href="https://www.npmjs.com/package/@uform/antd"><img src="https://img.shields.io/npm/v/@uform/antd.svg"></a>
<a href="https://travis-ci.com/alibaba/uform"><img src="https://travis-ci.com/alibaba/uform.svg?branch=master"></a>
<a href="https://standardjs.com"><img src="https://img.shields.io/badge/code_style-standard-brightgreen.svg"></a>
<a href="https://app.netlify.com/sites/uform/deploys"><img src="https://api.netlify.com/api/v1/badges/7145918b-9cb5-47f8-8a42-111969e232ef/deploy-status"/></a>
</p>

<p align="center" style="color:#666;margin-top:10px;">UFrom - a high-performance React form solution for handling complicated enterprise requirements.</p>

---

## Background

In React, the whole tree rendering performance problem of the form is very obvious in the controlled mode. Especially for the scene of data linkage, it is easy to cause the page to be stuck. To solve this problem, we have distributed the management of the state of each form field, which significantly improves the performance of the form operations. At the same time, we deeply integrate the JSON Schema protocol to help you solve the problem of back-end driven form rendering quickly.

## Features

- 🚀 High performance, fields managed independently, rather rerender the whole tree.
- 💡 Integrated Aliabab Fusion and Ant Design components are guaranteed to work out of the box.
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

## Documents

https://uformjs.org


## Demo

https://codesandbox.io/s/245o92lnzy


## Community

| Online Chat Room                                             | 微信                                                         | 钉钉 |
| ------------------------------------------------------------ | ------------------------------------------------------------ | ---- |
| [gitter.im](https://gitter.im/alibaba-uform/community?source=orgpage) | <img width="200" src="https://img.alicdn.com/tfs/TB1jhm5VNYaK1RjSZFnXXa80pXa-620-824.png"/> |   <img width="200" src="https://img.alicdn.com/tfs/TB1pHMzUrPpK1RjSZFFXXa5PpXa-620-818.png"/>   |


## LICENSE

UForm is open source software licensed as
[MIT](https://github.com/alibaba/uform/blob/master/LICENSE.md).

## Contributors

Thanks for these passionate people
([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore -->
<table><tr><td align="center"><a href="https://github.com/janryWang"><img src="https://avatars0.githubusercontent.com/u/4060976?v=4" width="100px;" alt="Janry"/><br /><sub><b>Janry</b></sub></a><br /><a href="#design-janryWang" title="Design">🎨</a></td><td align="center"><a href="http://cnt1992.github.io"><img src="https://avatars1.githubusercontent.com/u/3118988?v=4" width="100px;" alt="SkyCai"/><br /><sub><b>SkyCai</b></sub></a><br /><a href="#design-cnt1992" title="Design">🎨</a></td><td align="center"><a href="https://www.linkedin.com/in/harry-yu-0a931a69/"><img src="https://avatars3.githubusercontent.com/u/2942913?v=4" width="100px;" alt="Harry Yu"/><br /><sub><b>Harry Yu</b></sub></a><br /><a href="https://github.com/alibaba/uform/commits?author=yujiangshui" title="Documentation">📖</a> <a href="https://github.com/alibaba/uform/commits?author=yujiangshui" title="Code">💻</a></td><td align="center"><a href="https://www.luoyangfu.com"><img src="https://avatars2.githubusercontent.com/u/22249411?v=4" width="100px;" alt="zsir"/><br /><sub><b>zsir</b></sub></a><br /><a href="https://github.com/alibaba/uform/commits?author=zsirfs" title="Code">💻</a></td><td align="center"><a href="http://www.monkindey.xyz/"><img src="https://avatars0.githubusercontent.com/u/6913898?v=4" width="100px;" alt="Kiho · Cham"/><br /><sub><b>Kiho · Cham</b></sub></a><br /><a href="https://github.com/alibaba/uform/commits?author=monkindey" title="Code">💻</a> <a href="https://github.com/alibaba/uform/commits?author=monkindey" title="Documentation">📖</a></td><td align="center"><a href="http://whj1995.xyz"><img src="https://avatars2.githubusercontent.com/u/22634735?v=4" width="100px;" alt="Hongjiang Wu"/><br /><sub><b>Hongjiang Wu</b></sub></a><br /><a href="https://github.com/alibaba/uform/commits?author=whj1995" title="Documentation">📖</a></td><td align="center"><a href="https://github.com/anyuxuan"><img src="https://avatars3.githubusercontent.com/u/24931869?v=4" width="100px;" alt="合木"/><br /><sub><b>合木</b></sub></a><br /><a href="https://github.com/alibaba/uform/commits?author=anyuxuan" title="Code">💻</a></td></tr><tr><td align="center"><a href="https://github.com/Azath0th"><img src="https://avatars2.githubusercontent.com/u/18497361?v=4" width="100px;" alt="Chen YuBen"/><br /><sub><b>Chen YuBen</b></sub></a><br /><a href="https://github.com/alibaba/uform/commits?author=Azath0th" title="Code">💻</a></td><td align="center"><a href="https://github.com/HarrisFeng"><img src="https://avatars1.githubusercontent.com/u/7928957?v=4" width="100px;" alt="Harris Feng"/><br /><sub><b>Harris Feng</b></sub></a><br /><a href="https://github.com/alibaba/uform/commits?author=HarrisFeng" title="Code">💻</a></td></tr></table>

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the
[all-contributors](https://github.com/all-contributors/all-contributors)
Specification. Contributions of any kind are welcome!
