# FormStep

> 分步表单组件
>
> 注意：该组件只能用在 Schema 场景

## Markup Schema 案例

<dumi-previewer demoPath="guide/form-step/markup-schema" />

## JSON Schema 案例

<dumi-previewer demoPath="guide/form-step/json-schema" />

## API

### FormStep

| 属性名   | 类型      | 描述                                   | 默认值 |
| -------- | --------- | -------------------------------------- | ------ |
| formStep | IFormStep | 传入通过 createFormStep 创建出来的模型 |        |

其余参考 [https://element.eleme.io/#/zh-CN/component/steps](https://element.eleme.io/#/zh-CN/component/steps)

### FormStep.StepPane

参考 [https://element.eleme.io/#/zh-CN/component/steps](https://element.eleme.io/#/zh-CN/component/steps)

### FormStep.createFormStep

```ts pure
interface createFormStep {
  (current?: number): IFormStep
}

interface IFormStep {
  //当前索引
  current: number
  //是否允许向后
  allowNext: boolean
  //是否允许向前
  allowBack: boolean
  //设置当前索引
  setCurrent(key: number): void
  //提交表单
  submit: Formily.Core.Models.Form['submit']
  //向后
  next(): void
  //向前
  back(): void
}
```
