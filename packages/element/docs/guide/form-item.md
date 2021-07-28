# FormItem

> 全新的 FormItem 组件，相比于 Element 的 FormItem，它支持的功能更多，同时它的定位是纯样式组件，不管理表单状态，所以也会更轻量，更方便定制

## Markup Schema 案例

<dumi-previewer demoPath="guide/form-item/markup-schema" />

## JSON Schema 案例

<dumi-previewer demoPath="guide/form-item/json-schema" />

## Template 案例

<dumi-previewer demoPath="guide/form-item/template" />

## 常用属性案例

<dumi-previewer demoPath="guide/form-item/common" />

## 无边框案例

设置去除组件边框

<dumi-previewer demoPath="guide/form-item/bordered-none" />

## 内嵌模式案例

设置表单组件为内嵌模式

<dumi-previewer demoPath="guide/form-item/inset" />

## 反馈信息定制案例

可通过 `feedbackIcon` 传入指定反馈的按钮

<dumi-previewer demoPath="guide/form-item/feedback" />

## 尺寸控制案例

<dumi-previewer demoPath="guide/form-item/size" />

## API

### FormItem

| 属性名         | 类型                                                   | 描述                                        | 默认值     |
| -------------- | ------------------------------------------------------ | ------------------------------------------- | ---------- | -------- |
| style          | CSSProperties                                          | 样式                                        | -          |
| label          | String \| Vue Component                                | 标签                                        | -          |
| labelStyle     | CSSProperties                                          | 标签样式                                    | -          |
| wrapperStyle   | CSSProperties                                          | 组件容器样式                                | -          |
| className      | string                                                 | 组件样式类名                                | -          |
| colon          | boolean                                                | 冒号                                        | -          |
| tooltip        | String \| Vue Component                                | 问号提示                                    | -          |
| tooltipLayout  | `"icon"                                                | "text"`                                     | 问提示布局 | `"icon"` |
| labelAlign     | `"left"` \| `"right"`                                  | 标签文本对齐方式                            | `"right"`  |
| labelWrap      | boolean                                                | 标签换⾏，否则出现省略号，hover 有 tooltip  | false      |
| labelWidth     | `number`                                               | 标签固定宽度                                | -          |
| wrapperWidth   | `number`                                               | 内容固定宽度                                | -          |
| labelCol       | number                                                 | 标签⽹格所占列数，和内容列数加起来总和为 24 | -          |
| wrapperCol     | number                                                 | 内容⽹格所占列数，和标签列数加起来总和为 24 | -          |
| wrapperAlign   | `"left"` \| `"right"`                                  | 内容文本对齐方式⻬                          | `"left"`   |
| wrapperWrap    | boolean                                                | 内容换⾏，否则出现省略号，hover 有 tooltip  | false      |
| fullness       | boolean                                                | 内容撑满                                    | false      |
| addonBefore    | String \| Vue Component                                | 前缀内容                                    | -          |
| addonAfter     | String \| Vue Component                                | 后缀内容                                    | -          |
| size           | `"small"` \| `"default"` \| `"large"`                  | 尺⼨                                        | -          |
| extra          | ReactNode                                              | 扩展描述⽂案                                | -          |
| feedbackText   | ReactNode                                              | 反馈⽂案                                    | -          |
| feedbackLayout | `"loose"` \| `"terse"` \| `"popover"` \| `"none"`      | 反馈布局                                    | -          |
| feedbackStatus | `"error"` \| `"warning"` \| `"success"` \| `"pending"` | 反馈布局                                    | -          |
| feedbackIcon   | string                                                 | 反馈图标                                    | -          |
| required       | boolean                                                | 星号提醒                                    | -          |
| asterisk       | boolean                                                | 星号提醒                                    | -          |
| gridSpan       | number                                                 | ⽹格布局占宽                                | -          |

### FormItem.BaseItem

纯样式组件，属性与 FormItem 一样，与 Formily Core 不做状态桥接，主要用于一些需要依赖 FormItem 的样式布局能力，但不希望接入 Field 状态的场景
