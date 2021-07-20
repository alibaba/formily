# Alibaba Fusion

## 介绍

@formily/next 是基于 Fusion Design 封装的针对表单场景专业级(Professional)组件库，它主要有以下几个特点：

- 仅支持 Formily2.x
  - 大部分组件无法向后兼容
  - 很遗憾，1.x 的很多组件在 API 设计上存在本质上的缺陷，这也是因为表单方案一直在探索之中，所以才会出现版本断裂。
- 更丰富的组件体系
  - 布局组件
    - FormLayout
    - FormItem
    - FormGrid
    - FormButtonGroup
    - Space
    - Submit
    - Reset
  - 输入控件
    - Input
    - Password
    - Select
    - TreeSelect
    - DatePicker
    - TimePicker
    - NumberPicker
    - Transfer
    - Cascader
    - Radio
    - Checkbox
    - Upload
    - Switch
  - 场景组件
    - ArrayCards
    - ArrayItems
    - ArrayTable
    - FormCollapse
    - FormStep
    - FormTab
    - FormDialog
    - FormDrawer
    - Editable
    - LogicDiagram
  - 阅读态组件
    - PreviewText
- 主题定制能力
  - 完全放弃了 1.x styled-components 方案，follow 组件库的样式体系，更方便定制主题
- 支持二次封装
  - 所有组件都能二次封装，1.x 的组件体系是不能二次封装的，所以提供了这个能力则更方便用户做业务定制
- 支持阅读态
  - 虽然 1.x 同样支持阅读态，但是 2.x 单独提供了 PreviewText 组件，用户可以基于它自己做阅读态封装，灵活性更强
- 类型更加友好
  - 每个组件都有着极其完整的类型定义，用户在实际开发过程中，可以感受到前所未有的智能提示体验
- 更完备的布局控制能力
  - 1.x 的布局能力基本上都收敛到了 FormMegaLayout 上，这次，我们直接去掉 Mega，Mega 就是标准组件，完全内化到 FormLayout 和 FormItem 组件中，同时将 MegaLayout 的网格布局能力放到了 FormGrid 组件中，也提供了更智能的布局能力。
- 更优雅易用的 API，比如：
  - 过去的 FormStep，有很多问题，第一，类型不友好，第二，API 隐藏太深，想要控制前进后退需要理解一堆的私有事件。新版 FormStep，用户只需要关注 FormStep Reactive Model 即可，通过 createFormStep 就可以创建出 Reactive Model，传给 FormStep 组件即可快速通讯。同理，FormTab/FormCollapse 也是一样的通讯模式。
  - 弹窗表单，抽屉表单，想必过去，用户几乎每次都得在这两个场景上写大量的代码，这次直接提供了极其简易的 API 让用户使用，最大化提升开发效率。

## 注意

因为 Fusion 是基于 Sass 构建的，如果你用 Webpack 配置请使用以下两个 Sass 工具

```
"sass": "^1.32.11",
"sass-loader": "^8.0.2"
```

## 安装

```bash
$ npm install --save @alifd/next moment
$ npm install --save @formily/next @formily/react

```

## Q/A

问：我想自己封装一套组件库，该怎么做？

答：如果是开源组件库，可以直接参与项目共建，提供 PR，如果是企业内私有组件库，参考源码即可，源码并没有太多复杂逻辑。

问：为什么 ArrayCards/ArrayTable/FormStep 这类组件只支持 Schema 模式，不支持纯 JSX 模式？

答：这就是 Schema 模式的核心优势，借助协议，我们可以做场景化抽象，相反，纯 JSX 模式，受限于 JSX 的不可解析性，我们很难做到 UI 级别的场景化抽象，更多的只是抽象 Hook。

问：为什么没有 ArrayTabs 组件？

答：因为 Fusion 的 Tab 组件并不支持新增 Tab 能力，所以暂时不支持 ArrayTabs 组件。
