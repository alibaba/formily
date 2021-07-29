# FormTab

> 选项卡表单
>
> 注意：该组件只适用于 Schema 场景

## Markup Schema 案例

<dumi-previewer demoPath="guide/form-tab/markup-schema" />

## JSON Schema 案例

<dumi-previewer demoPath="guide/form-tab/json-schema" />

## API

### FormTab

| 属性名  | 类型     | 描述                                  | 默认值 |
| ------- | -------- | ------------------------------------- | ------ |
| formTab | IFormTab | 传入通过 createFormTab 创建出来的模型 |        |

其余参考 [https://element.eleme.io/#/zh-CN/component/tabs](https://element.eleme.io/#/zh-CN/component/tabs)

### FormTab.TabPane

参考 [https://element.eleme.io/#/zh-CN/component/tabs](https://element.eleme.io/#/zh-CN/component/tabs)

### FormTab.createFormTab

```ts pure
type ActiveKey = string | number

interface createFormTab {
  (defaultActiveKey?: ActiveKey): IFormTab
}

interface IFormTab {
  //激活主键
  activeKey: ActiveKey
  //设置激活主键
  setActiveKey(key: ActiveKey): void
}
```
