# Reset

> 重置按钮

## 普通重置

> 有默认值的控件无法清空

<dumi-previewer demoPath="guide/reset/base" />

## 强制清空重置

<dumi-previewer demoPath="guide/reset/force" />

## 强制清空重置并校验

<dumi-previewer demoPath="guide/reset/validate" />

## API

按钮相关的 API 属性，我们参考 [https://element.eleme.io/#/zh-CN/component/button](https://element.eleme.io/#/zh-CN/component/button) 即可，剩下是 Reset 组件独有的 API 属性

### 事件

| 属性名                 | 类型                                                                                             | 描述             | 默认值                                |
| ---------------------- | ------------------------------------------------------------------------------------------------ | ---------------- | ------------------------------------- | --- |
| onClick                | `(event: MouseEvent) => void                                                                     | boolean`         | 点击事件，如果返回 false 可以阻塞重置 | -   |
| onResetValidateSuccess | (payload: any) => void                                                                           | 重置校验成功事件 | -                                     |
| onResetValidateFailed  | (feedbacks: [IFormFeedback](https://core.formilyjs.org/api/models/form#iformfeedback)[]) => void | 重置校验失败事件 | -                                     |
