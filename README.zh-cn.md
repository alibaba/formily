[English](./README.md) | 简体中文

<p align="center">
<img src="https://img.alicdn.com/tfs/TB1VsOcRbrpK1RjSZTEXXcWAVXa-1400-689.png">
<a href="https://www.npmjs.com/package/@uform/core"><img src="https://img.shields.io/npm/v/@uform/core.svg"></a>
<a href="https://www.npmjs.com/package/@uform/react"><img src="https://img.shields.io/npm/v/@uform/react.svg"></a>
<a href="https://www.npmjs.com/package/@uform/next"><img src="https://img.shields.io/npm/v/@uform/next.svg"></a>
<a href="https://www.npmjs.com/package/@uform/antd"><img src="https://img.shields.io/npm/v/@uform/antd.svg"></a>
<a href="https://travis-ci.com/alibaba/uform"><img src="https://travis-ci.com/alibaba/uform.svg?branch=master"></a>
<a href="https://standardjs.com"><img src="https://img.shields.io/badge/code_style-standard-brightgreen.svg"></a>
<a href="https://app.netlify.com/sites/uform/deploys"><img src="https://api.netlify.com/api/v1/badges/7145918b-9cb5-47f8-8a42-111969e232ef/deploy-status"/></a>
</p>

<p align="center" style="color:#666;margin-top:10px;">面向复杂场景的中后台表单解决方案，UForm 谐音 Your Form，代表，这才是你想要的 Form 解决方案</p>

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
npm install --save antd @uform/antd
```

使用 Fusion Design：

```bash
npm install --save @alifd/next @uform/next
```

## 文档

https://uformjs.org

## 入门案例

https://codesandbox.io/s/245o92lnzy

## 社区



| Online Chat Room                                             | 微信                                                         | 钉钉 |
| ------------------------------------------------------------ | ------------------------------------------------------------ | ---- |
| [gitter.im](https://gitter.im/alibaba-uform/community?source=orgpage) | <img width="200" src="https://img.alicdn.com/tfs/TB1jhm5VNYaK1RjSZFnXXa80pXa-620-824.png"/> |   <img width="200" src="https://img.alicdn.com/tfs/TB1pHMzUrPpK1RjSZFFXXa5PpXa-620-818.png"/>   |



## LICENSE

UForm is open source software licensed as
[MIT.](https://github.com/alibaba/uform/blob/master/LICENSE.md)

## 贡献者

Thanks goes to these wonderful people
([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore -->
<table><tr><td align="center"><a href="https://github.com/janryWang"><img src="https://avatars0.githubusercontent.com/u/4060976?v=4" width="100px;" alt="Janry"/><br /><sub><b>Janry</b></sub></a><br /><a href="#design-janryWang" title="Design">🎨</a></td><td align="center"><a href="http://cnt1992.github.io"><img src="https://avatars1.githubusercontent.com/u/3118988?v=4" width="100px;" alt="SkyCai"/><br /><sub><b>SkyCai</b></sub></a><br /><a href="#design-cnt1992" title="Design">🎨</a></td><td align="center"><a href="https://www.linkedin.com/in/harry-yu-0a931a69/"><img src="https://avatars3.githubusercontent.com/u/2942913?v=4" width="100px;" alt="Harry Yu"/><br /><sub><b>Harry Yu</b></sub></a><br /><a href="https://github.com/alibaba/uform/commits?author=yujiangshui" title="Documentation">📖</a></td><td align="center"><a href="https://www.luoyangfu.com"><img src="https://avatars2.githubusercontent.com/u/22249411?v=4" width="100px;" alt="zsir"/><br /><sub><b>zsir</b></sub></a><br /><a href="https://github.com/alibaba/uform/commits?author=zsirfs" title="Code">💻</a></td><td align="center"><a href="http://www.monkindey.xyz/"><img src="https://avatars0.githubusercontent.com/u/6913898?v=4" width="100px;" alt="Kiho · Cham"/><br /><sub><b>Kiho · Cham</b></sub></a><br /><a href="https://github.com/alibaba/uform/commits?author=monkindey" title="Code">💻</a> <a href="https://github.com/alibaba/uform/commits?author=monkindey" title="Documentation">📖</a></td><td align="center"><a href="http://whj1995.xyz"><img src="https://avatars2.githubusercontent.com/u/22634735?v=4" width="100px;" alt="Hongjiang Wu"/><br /><sub><b>Hongjiang Wu</b></sub></a><br /><a href="https://github.com/alibaba/uform/commits?author=whj1995" title="Documentation">📖</a></td><td align="center"><a href="https://github.com/anyuxuan"><img src="https://avatars3.githubusercontent.com/u/24931869?v=4" width="100px;" alt="合木"/><br /><sub><b>合木</b></sub></a><br /><a href="https://github.com/alibaba/uform/commits?author=anyuxuan" title="Code">💻</a></td></tr></table>

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the
[all-contributors](https://github.com/all-contributors/all-contributors)
specification. Contributions of any kind welcome!
