---
order: 0
---

# createForm

## 描述

创建一个 Form 实例，作为 ViewModel 给 UI 框架层消费

## 签名

```ts
interface createForm {
  (props: IFormProps): Form
}
```

## IFormProps

| 属性          | 描述                             | 类型                                                     | 默认值       |
| ------------- | -------------------------------- | -------------------------------------------------------- | ------------ |
| values        | 表单值                           | Object                                                   | `{}`         |
| initialValues | 表单默认值                       | Object                                                   | `{}`         |
| pattern       | 表单交互模式                     | `"editable" \| "disabled" \| "readOnly" \| "readPretty"` | `"editable"` |
| display       | 表单显隐                         | `"visible" \| "hidden" \| "none"`                        | `"visible`   |
| hidden        | UI 隐藏                          | Boolean                                                  | `false`      |
| visible       | 显示/隐藏(数据隐藏)              | Boolean                                                  | `true`       |
| editable      | 是否可编辑                       | Boolean                                                  | `true`       |
| disabled      | 是否禁用                         | Boolean                                                  | `false`      |
| readOnly      | 是否只读                         | Boolean                                                  | `false`      |
| readPretty    | 是否是优雅阅读态                 | Boolean                                                  | `false`      |
| effects       | 副作用逻辑，用于实现各种联动逻辑 | `(form:Form)=>void`                                      |              |
| validateFirst | 是否只校验第一个非法规则         | Boolean                                                  | `false`      |

## 用例

```ts
import { createForm } from '@formily/core'

const form = createForm({
  initialValues: {
    say: 'hello',
  },
})
```
