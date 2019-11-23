
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

使用UForm React渲染引擎包:

```bash
npm install --save @uform/react-schema-renderer
```

使用 UForm React包:

```bash
npm install --save @uform/react
```

使用 UForm 核心包:

```bash
npm install --save @uform/core
```

## 社区


| Online Chat Room                                             | 微信                                                         | 钉钉 |
| ------------------------------------------------------------ | ------------------------------------------------------------ | ---- |
| [gitter.im](https://gitter.im/alibaba-uform/community?source=orgpage) | <img width="200" src="https://img.alicdn.com/tfs/TB1jhm5VNYaK1RjSZFnXXa80pXa-620-824.png"/> |   <img width="200" src="https://img.alicdn.com/tfs/TB1pHMzUrPpK1RjSZFFXXa5PpXa-620-818.png"/>   |

## 贡献者

This project exists thanks to all the people who contribute. 
<a href="https://github.com/alibaba/uform/graphs/contributors"><img src="https://opencollective.com/uform/contributors.svg?width=890&button=false" /></a>


## 点个赞

Thank you to all our backers! 🙏 [[Become a backer](https://opencollective.com/uform#backer)]

<a href="https://opencollective.com/uform#backers" target="_blank"><img src="https://opencollective.com/uform/backers.svg?width=890"></a>


## 捐献我们

Support this project by becoming a sponsor. Your logo will show up here with a link to your website. [[Become a sponsor](https://opencollective.com/uform#sponsor)]


## LICENSE

UForm is open source software licensed as
[MIT.](https://github.com/alibaba/uform/blob/master/LICENSE.md)
