# PreviewText

> 阅读态组件，主要用来实现类 Input，类 DatePicker 这些组件的阅读态

## 简单案例

<dumi-previewer demoPath="guide/preview-text/base" />

## 扩展案例

<dumi-previewer demoPath="guide/preview-text/extend" />

## API

### PreviewText.Input

参考 [https://element.eleme.io/#/zh-CN/component/input](https://element.eleme.io/#/zh-CN/component/input)

### PreviewText.Select

参考 [https://element.eleme.io/#/zh-CN/component/select](https://element.eleme.io/#/zh-CN/component/select)

### PreviewText.Cascader

参考 [https://element.eleme.io/#/zh-CN/component/cascader](https://element.eleme.io/#/zh-CN/component/cascader)

### PreviewText.DatePicker

参考 [https://element.eleme.io/#/zh-CN/component/date-picker](https://element.eleme.io/#/zh-CN/component/date-picker)

### PreviewText.TimePicker

参考 [https://element.eleme.io/#/zh-CN/component/time-picker](https://element.eleme.io/#/zh-CN/component/time-picker)

### PreviewText

| 属性名 | 类型   | 描述       | 默认值 |
| ------ | ------ | ---------- | ------ |
| value  | stirng | 缺省占位符 | N/A    |

### PreviewText.Placeholder

| 属性名 | 类型   | 描述       | 默认值 |
| ------ | ------ | ---------- | ------ |
| value  | stirng | 缺省占位符 | N/A    |

### PreviewText.usePlaceholder

```ts pure
interface usePreviewTextPlaceholder {
  (): string
}
```
