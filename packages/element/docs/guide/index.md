# Element-UI

## 介绍

@formily/element 是基于 Element UI 封装的针对表单场景专业级(Professional)组件库，它主要有以下几个特点：

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
    - DatePicker
    - TimePicker
    - InputNumber
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
    - ArrayTabs
    - FormCollapse
    - FormStep
    - FormTab
    - FormDialog
    - FormDrawer
    - Editable
  - 阅读态组件
    - PreviewText

- 主题定制能力
  - follow 组件库的样式体系，更方便定制主题
- 支持二次封装
  - 所有组件都能二次封装
- 支持阅读态
  - 提供了 PreviewText 组件，用户可以基于它自己做阅读态封装，灵活性更强
- 类型更加友好
  - 每个组件都有着极其完整的类型定义，用户在实际开发过程中，可以感受到前所未有的智能提示体验
- 更完备的布局控制能力
  - 基于 FormLayout、FormItem、FormGrid 组件，提供更智能的布局能力。
- 更优雅易用的 API
  - FormStep，用户只需要关注 FormStep Reactive Model 即可，通过 createFormStep 就可以创建出 Reactive Model，传给 FormStep 组件即可快速通讯。同理，FormTab/FormCollapse 也是一样的通讯模式
  - 弹窗表单，抽屉表单，想必过去，用户几乎每次都得在这两个场景上写大量的代码，这次直接提供了极其简易的 API 让用户使用，最大化提升开发效率

## 安装

```bash
$ npm install --save element-ui
$ npm install --save @formily/core @formily/vue @vue/composition-api @formily/element
```

## 按需打包

`Element-UI` 按需引入参见 [https://element.eleme.io/#/zh-CN/component/quickstart#an-xu-yin-ru](https://element.eleme.io/#/zh-CN/component/quickstart#an-xu-yin-ru)

`@formily/element`按需引入需借助 `babel-plugin-import`

#### 安装 `babel-plugin-import`

```shell
npm install babel-plugin-import --save-dev
```

或者

```shell
yarn add babel-plugin-import --dev
```

修改 `.babelrc`

```json
{
  "plugins": [
    [
      "component",
      {
        "libraryName": "element-ui",
        "styleLibraryName": "theme-chalk"
      }
    ],
    [
      "import",
      {
        "libraryName": "@formily/element",
        "libraryDirectory": "esm",
        "style": true
      }
    ]
  ]
}
```

## Q/A

问：我想自己封装一套组件库，该怎么做？

答：如果是开源组件库，可以直接参与项目共建，提供 PR，如果是企业内私有组件库，参考源码即可，源码并没有太多复杂逻辑。

问：为什么 ArrayCards/ArrayTable/FormStep 这类组件只支持 Schema 模式，不支持纯 Template 模式？

答：这就是 Schema 模式的核心优势，借助协议，我们可以做场景化抽象，相反，纯 Template 模式，受限于 Template 的不可解析性，我们很难做到 UI 级别的场景化抽象，更多的只是抽象 Hook。
