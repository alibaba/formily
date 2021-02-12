---
order: 1
---

# Field

核心[字段模型](/guide/field)API，以下会列出所有模型属性，如果该属性是可写的，那么我们可以直接引用是修改该属性，Mobx 便会响应从而触发 UI 更新。

<Alert>

注意，要在 mobx action 中修改属性。如果在 formily 给出的回调函数中直接修改，则不需要包装 action，如果在异步回调中则需要包装，当然你也可以直接调用 Setters 方法。

</Alert>

## 属性

| 属性           | 描述                                                                       | 类型                                        | 是否只读 | 默认值       |
| -------------- | -------------------------------------------------------------------------- | ------------------------------------------- | -------- | ------------ |
| initialized    | 字段是否已被初始化                                                         | Boolean                                     | 否       | `false`      |
| mounted        | 字段是否已挂载                                                             | Boolean                                     | 否       | `false`      |
| unmounted      | 字段是否已卸载                                                             | Boolean                                     | 否       | `false`      |
| address        | 字段节点路径                                                               | [FormPath](/api/package/form-path)          | 是       |              |
| path           | 字段数据路径                                                               | [FormPath](/api/package/form-path)          | 是       |              |
| title          | 字段标题                                                                   | [FieldMessage](#fieldmessage)               | 否       | `""`         |
| description    | 字段描述                                                                   | [FieldMessage](#fieldmessage)               | 否       | `""`         |
| loading        | 字段加载状态                                                               | Boolean                                     | 否       | `false`      |
| validating     | 字段是否正在校验                                                           | Boolean                                     | 否       | `false`      |
| modified       | 字段是否被修改过                                                           | Boolean                                     | 否       | `false`      |
| active         | 字段是否处于激活态(触发 onFocus 为 true，触发 onBlur 为 false)             | Boolean                                     | 否       | `false`      |
| visited        | 字段是否被浏览过(触发过 onFocus 则永远为 true)                             | Boolean                                     | 否       | `false`      |
| inputValue     | 字段输入值(触发 onInput 收集到的值)                                        | Any                                         | 否       | `null`       |
| inputValues    | 字段输入值集合(触发 onInput 收集到的多参值)                                | Array                                       | 否       | `[]`         |
| dataSource     | 字段数据源                                                                 | Array                                       | 否       | `[]`         |
| validator      | 字段校验器                                                                 | [FieldValidator](#fieldvalidator)           | 否       | `null`       |
| decorator      | 字段装饰器                                                                 | Any                                         | 否       | `null`       |
| component      | 字段组件                                                                   | Any                                         | 否       | `null`       |
| feedbacks      | 字段反馈信息                                                               | [FieldFeedback](#fieldfeedback)[]           | 否       | `[]`         |
| parent         | 父级字段                                                                   | [GeneralField](#generalfield)               | 是       | `null`       |
| errors         | 字段错误消息                                                               | [FieldMessage](#fieldmessage)[]             | 否       | `[]`         |
| warnings       | 字段警告消息                                                               | [FieldMessage](#fieldmessage)[]             | 否       | `[]`         |
| successes      | 字段成功消息                                                               | [FieldMessage](#fieldmessage)[]             | 否       | `[]`         |
| valid          | 字段是否合法                                                               | Boolean                                     | 是       | `true`       |
| invalid        | 字段是否非法                                                               | Boolean                                     | 是       | `true`       |
| value          | 字段值                                                                     | Any                                         | 否       |              |
| initialValue   | 字段默认值                                                                 | Any                                         | 否       |              |
| display        | 字段展示状态                                                               | [FieldDisplayTypes](#fielddisplaytypes)     | 否       | `"visible"`  |
| pattern        | 字段交互模式                                                               | [FieldPatternTypes](#fieldpatterntypes)     | 否       | `"editable"` |
| required       | 字段是否必填                                                               | Boolean                                     | 否       | `false`      |
| hidden         | 字段是否隐藏，为 true 是 display 为 hidden，为 false 是 display 为 visible | Boolean                                     | 否       | `false`      |
| visible        | 字段是否显示，为 true 是 display 为 visible，为 false 是 display 为 none   | Boolean                                     | 否       | `true`       |
| disabled       | 字段是否禁用                                                               | Boolean                                     | 否       | `false`      |
| readOnly       | 字段是否只读                                                               | Boolean                                     | 否       | `false`      |
| readPretty     | 字段是否为阅读态                                                           | Boolean                                     | 否       | `false`      |
| editable       | 字段是可编辑                                                               | Boolean                                     | 否       | `true`       |
| validateStatus | 字段校验状态                                                               | [FieldValidateStatus](#fieldvalidatestatus) | 是       | `null`       |

## 方法

### setTitle

#### 描述

设置字段标题

#### 签名

```ts
interface setTitle {
  (title?: FieldMessage): void
}
```

FieldMessage 参考 [FieldMessage](#fieldmessage)

### setDescription

#### 描述

设置字段描述信息

#### 签名

```ts
interface setDescription {
  (title?: FieldMessage): void
}
```

FieldMessage 参考 [FieldMessage](#fieldmessage)

### setDataSource

#### 描述

设置字段数据源

#### 签名

```ts
interface setDataSource {
  (dataSource?: any[]): void
}
```

### setFeedback

#### 描述

设置字段消息反馈

#### 签名

```ts
interface setFeedback {
  (feedback?: FieldFeedback): void
}
```

FieldFeedback 参考 [FieldFeedback](#fieldfeedback)

### setErrors

#### 描述

设置字段错误消息，这里是以 EffectError 为 code 的 feedback 更新，主要是防止污染校验器结果，如果希望强制覆盖，则可以使用 setFeedback

#### 签名

```ts
interface setErrors {
  (messages?: string[] | JSXElement[]): void
}
```

### setWarnings

#### 描述

设置字段警告信息，这里是以 EffectWarning 为 code 的 feedback 更新，主要是防止污染校验器结果，如果希望强制覆盖，则可以使用 setFeedback

#### 签名

```ts
interface setWarning {
  (messages?: string[] | JSXElement[]): void
}
```

### setSuccesses

#### 描述

设置字段成功信息，这里是以 EffectWarning 为 code 的 feedback 更新，主要是防止污染校验器结果，如果希望强制覆盖，则可以使用 setFeedback

#### 签名

```ts
interface setSuccesses {
  (messages?: string[] | JSXElement[]): void
}
```

### setValidator

#### 描述

设置字段校验器

#### 签名

```ts
interface setValidator {
  (validator?: FieldValidator): void
}
```

FieldValidator 参考 [FieldValidator](#fieldvalidator)

### setRequired

#### 描述

设置字段是否必填

#### 签名

```ts
interface setRequired {
  (required?: boolean): void
}
```

### setValue

#### 描述

设置字段值

#### 签名

```ts
interface setValue {
  (value?: any): void
}
```

### setInitialValue

#### 描述

设置字段默认值

#### 签名

```ts
interface setInitialValue {
  (initialValue?: any): void
}
```

### setDisplay

#### 描述

设置字段展示状态

#### 签名

```ts
interface setDisplay {
  (display?: FieldDisplayTypes): void
}
```

FieldDisplayTypes 参考 [FieldDisplayTypes](#fielddisplaytypes)

### setPattern

#### 描述

设置字段交互模式

#### 签名

```ts
interface setPattern {
  (pattern?: FieldPatternTypes): void
}
```

FieldPatternTypes 参考 [FieldPatternTypes](#fieldpatterntypes)

### setLoading

#### 描述

设置字段加载状态

#### 签名

```ts
interface setLoading {
  (loading?: boolean): void
}
```

### setValidating

#### 描述

设置字段校验中状态

#### 签名

```ts
interface setValidating {
  (validating?: boolean): void
}
```

### setComponent

#### 描述

设置字段组件

#### 签名

```ts
interface setComponent {
  (component?: any, props?: any): void
}
```

### setComponentProps

#### 描述

设置字段组件属性

#### 签名

```ts
interface setComponentProps {
  (props?: any): void
}
```

### setDecorator

#### 描述

设置字段装饰器

#### 签名

```ts
interface setDecorator {
  (decorator?: any, props?: any): void
}
```

### setDecoratorProps

#### 描述

设置字段装饰器属性

#### 签名

```ts
interface setDecoratorProps {
  (props?: any): void
}
```

### setState

#### 描述

设置字段状态

#### 签名

```ts
interface setState {
  (state: IFieldState): void
  (callback: (state: IFieldState) => void): void
}
```

IFieldState 参考 [IFieldState](#ifieldstate)

### getState

#### 描述

获取字段状态

#### 签名

```ts
interface getState<T> {
  (): IFieldState
  (callback: (state: IFieldState) => T): T
}
```

IFieldState 参考 [IFieldState](#ifieldstate)

### onInit

#### 描述

触发字段初始化，默认不需要手动调用

#### 签名

```ts
interface onInit {
  (): void
}
```

### onMount

#### 描述

触发字段挂载

#### 签名

```ts
interface onMount {
  (): void
}
```

### onUnmount

#### 描述

触发字段卸载

#### 签名

```ts
interface onUnmount {
  (): void
}
```

### onInput

#### 描述

触发字段输入

#### 签名

```ts
interface onInput {
  (...args: any[]): Promise<void>
}
```

### onFocus

#### 描述

触发字段聚焦

#### 签名

```ts
interface onFocus {
  (...args: any[]): Promise<void>
}
```

### onBlur

#### 描述

触发字段失焦

#### 签名

```ts
interface onBlur {
  (...args: any[]): Promise<void>
}
```

### validate

#### 描述

触发字段校验

#### 签名

```ts
interface validate {
  (triggerType?: 'onInput' | 'onFocus' | 'onBlur'): Promise<ValidateResults>
}
```

ValidateResults 参考 [ValidateResults](#validateresults)

### reset

#### 描述

触发字段重置，如果设置了校验，那么返回结果就是校验结果

#### 签名

```ts
interface reset {
  (options?: IFieldResetOptions): Promise<ValidateResults>
}
```

IFieldResetOptions 参考 [IFieldResetOptions](#ifieldresetoptions)

ValidateResults 参考 [ValidateResults](#validateresults)

### query

#### 描述

查询字段，可以基于当前字段查询相邻字段

#### 签名

```ts
interface query {
  (pattern: FormPathPattern): Query
}
```

FormPathPattern API 参考 [FormPath](/api/package/FormPath#formpathpattern)

Query 对象 API 参考 [Query](/api/models/query)

### queryFeedbacks

#### 描述

查询当前字段的反馈信息

#### 签名

```ts
interface queryFeedbacks {
  (search: ISearchFeedback): FieldFeedback[]
}
```

ISearchFeedback 参考 [ISearchFeedback](/api/models/field#isearchfeedback)

FieldFeedback 参考[FieldFeedback](#fieldfeedback)

### dispose

#### 描述

释放 observer，默认不需要手动释放

#### 签名

```ts
interface dispose {
  (): void
}
```

### match

#### 描述

基于路径匹配字段

#### 签名

```ts
interface match {
  (pattern: FormPathPattern): boolean
}
```

FormPathPattern API 参考 [FormPath](/api/package/FormPath#formpathpattern)

## 类型

<Alert>
注意：如果要手动消费类型，直接消费全局namespace中的Formily.Core.Types中的类型即可
</Alert>

### ValidateResults

### FieldValidator

### FieldMessage

### FieldFeedback

### FieldDisplayTypes

### FieldPatternTypes

### FieldValidateStatus

### ISearchFeedback

### IFieldState

### IGeneralField

### IGeneralFieldState

> Formily Typescript 类型约定
>
> - 简单非对象数据类型或 Union 数据类型用 type 定义类型，不能以大写`I`字符开头
> - 简单对象类型统一用 interface 定义类型，且以大写`I`字符开头，如果存在不同 interface 的组合(Intersection or Extends)使用 type 定义类型，同样以大写`I`字符开头
