# Submit

> 提交按钮

## 普通提交

<dumi-previewer demoPath="guide/submit/base" />

## 防重提交

<dumi-previewer demoPath="guide/submit/loading" />

## API

按钮相关的 API 属性，我们参考 [https://element.eleme.io/#/zh-CN/component/button](https://element.eleme.io/#/zh-CN/component/button) 即可，剩下是 Submit 组件独有的 API 属性

| 属性名          | 类型                                                                                             | 描述                 | 默认值                                |
| --------------- | ------------------------------------------------------------------------------------------------ | -------------------- | ------------------------------------- | --- |
| onClick         | `(event: MouseEvent) => void                                                                     | boolean`             | 点击事件，如果返回 false 可以阻塞提交 | -   |
| onSubmit        | `(values: any) => Promise<any>                                                                   | any`                 | 提交事件回调                          | -   |
| onSubmitSuccess | (payload: any) => void                                                                           | 提交成功响应事件     | -                                     |
| onSubmitFailed  | (feedbacks: [IFormFeedback](https://core.formilyjs.org/api/models/form#iformfeedback)[]) => void | 提交校验失败事件回调 | -                                     |
