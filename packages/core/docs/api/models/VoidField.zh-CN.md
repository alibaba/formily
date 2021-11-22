---
order: 4
---

# VoidField

调用[createVoidField](/api/models/form#createvoidfield)所返回的 VoidField 模型。

以下会列出所有模型属性，如果该属性是可写的，那么我们可以直接引用是修改该属性，@formily/reactive 便会响应从而触发 UI 更新。

## 属性

| 属性        | 描述               | 类型                                    | 是否只读 | 默认值       |
| ----------- | ------------------ | --------------------------------------- | -------- | ------------ |
| initialized | 字段是否已被初始化 | Boolean                                 | 否       | `false`      |
| mounted     | 字段是否已挂载     | Boolean                                 | 否       | `false`      |
| unmounted   | 字段是否已卸载     | Boolean                                 | 否       | `false`      |
| address     | 字段节点路径       | [FormPath](/api/entry/form-path)        | 是       |              |
| path        | 字段数据路径       | [FormPath](/api/entry/form-path)        | 是       |              |
| title       | 字段标题           | [FieldMessage](#fieldmessage)           | 否       | `""`         |
| description | 字段描述           | [FieldMessage](#fieldmessage)           | 否       | `""`         |
| decorator   | 字段装饰器         | Any[]                                   | 否       | `null`       |
| component   | 字段组件           | Any[]                                   | 否       | `null`       |
| parent      | 父级字段           | [GeneralField](#generalfield)           | 是       | `null`       |
| display     | 字段展示状态       | [FieldDisplayTypes](#fielddisplaytypes) | 否       | `"visible"`  |
| pattern     | 字段交互模式       | [FieldPatternTypes](#fieldpatterntypes) | 否       | `"editable"` |
| hidden      | 字段是否隐藏       | Boolean                                 | 否       | `false`      |
| visible     | 字段是否显示       | Boolean                                 | 否       | `true`       |
| disabled    | 字段是否禁用       | Boolean                                 | 否       | `false`      |
| readOnly    | 字段是否只读       | Boolean                                 | 否       | `false`      |
| readPretty  | 字段是否为阅读态   | Boolean                                 | 否       | `false`      |
| editable    | 字段是可编辑       | Boolean                                 | 否       | `true`       |

#### 详细解释

**hidden**

为 true 时是 display 为 hidden，为 false 时是 display 为 visible

**visible**

为 true 时是 display 为 visible，为 false 时是 display 为 none

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

### setComponent

#### 描述

设置字段组件

#### 签名

```ts
interface setComponent {
  (component?: FieldComponent, props?: any): void
}
```

FieldComponent 参考 [FieldComponent](#fieldcomponent)

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
  (decorator?: FieldDecorator, props?: any): void
}
```

FieldDecorator 参考 [FieldDecorator](#fielddecorator)

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
  (state: IVoidFieldState): void
  (callback: (state: IVoidFieldState) => void): void
}
```

IVoidFieldState 参考 [IVoidFieldState](#ifieldstate)

### getState

#### 描述

获取字段状态

#### 签名

```ts
interface getState<T> {
  (): IVoidFieldState
  (callback: (state: IVoidFieldState) => T): T
}
```

IVoidFieldState 参考 [IVoidFieldState](#ifieldstate)

### setData

#### 描述

设置 Data 值

#### 签名

```ts
interface setData {
  (data: any): void
}
```

### setContent

#### 描述

设置 Content 值

#### 签名

```ts
interface setContent {
  (content: any): void
}
```

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

### query

#### 描述

查询字段，可以基于当前字段查询相邻字段

#### 签名

```ts
interface query {
  (pattern: FormPathPattern): Query
}
```

FormPathPattern API 参考 [FormPath](/api/entry/form-path#formpathpattern)

Query 对象 API 参考 [Query](/api/models/query)

### dispose

#### 描述

释放 observer，默认不需要手动释放

#### 签名

```ts
interface dispose {
  (): void
}
```

### destroy

#### 描述

释放 observer，并删除字段模型

#### 签名

```ts
interface destroy {
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

FormPathPattern API 参考 [FormPath](/api/entry/form-path#formpathpattern)

## 类型

<Alert>
注意：如果要手动消费类型，直接从包模块中导出即可
</Alert>

### FieldMessage

```ts
type FieldMessage = string | JSXElement
```

如果在支持 JSX 的 UI 框架下，我们可以直接传 JSX 的 Node，否则，我们只能传字符串

### FieldComponent

```ts
type FieldComponent = string | JSXComponentConstructor
```

字段组件，如果我们在支持 JSX 的框架中使用，FieldComponent 推荐直接存储 JSX 组件引用，否则可以存储一个组件标识字符串，在实际渲染的时候做一次分发。

### FieldDecorator

```ts
type FieldDecorator = string | JSXComponentConstructor
```

字段装饰器，如果我们在支持 JSX 的框架中使用，FieldDecorator 推荐直接存储 JSX 组件引用，否则可以存储一个组件标识字符串，在实际渲染的时候做一次分发。

### FieldReaction

```ts
type FieldReaction = (field: GeneralField) => void
```

### FieldDisplayTypes

```ts
type FieldDisplayTypes = 'none' | 'hidden' | 'visible'
```

### FieldPatternTypes

```ts
type FieldPatternTypes = 'editable' | 'disabled' | 'readOnly' | 'readPretty'
```

### GeneralField

```ts
type GeneralField = Field | VoidField | ArrayField | ObjectField
```

Field 参考 [Field](/api/models/field)

ArrayField 参考 [ArrayField](/api/models/array-field)

ObjectField 参考 [ObjectField](/api/models/object-field)

### IVoidFieldState

```ts
interface IVoidFieldState {
  hidden?: boolean
  visible?: boolean
  editable?: boolean
  readOnly?: boolean
  disabled?: boolean
  readPretty?: boolean
  title?: any
  description?: any
  modified?: boolean
  active?: boolean
  visited?: boolean
  initialized?: boolean
  mounted?: boolean
  unmounted?: boolean
  decorator?: FieldDecorator
  component?: FieldComponent
  readonly parent?: GeneralField
  display?: FieldDisplayTypes
  pattern?: FieldPatternTypes
}
```

### IGeneralFieldState

```ts
type IGeneralFieldState = IVoidFieldState & IFieldState
```

IFieldState 参考 [IFieldState](/api/models/field#ifieldstate)
