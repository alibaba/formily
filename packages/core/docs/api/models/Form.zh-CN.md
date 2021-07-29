---
order: 0
---

# Form

调用[createForm](/api/entry/create-form)所返回的核心[表单模型](/guide/form) API，以下会列出所有模型属性，如果该属性是可写的，那么我们可以直接引用是修改该属性，@formily/reactive 便会响应从而触发 UI 更新。

## 属性

| 属性          | 描述                   | 类型                                  | 是否只读 | 默认值            |
| ------------- | ---------------------- | ------------------------------------- | -------- | ----------------- |
| initialized   | 表单是否初始化         | Boolean                               | 否       | `false`           |
| validating    | 表单是否正在校验       | Boolean                               | 否       | `false`           |
| submitting    | 表单是否正在提交       | Boolean                               | 否       | `false`           |
| modified      | 表单值是否已被手动修改 | Boolean                               | 否       | `false`           |
| pattern       | 表单交互模式           | [FormPatternTypes](#formpatterntypes) | 否       | `"editable"`      |
| display       | 表单展示形态           | [FormDisplayTypes](#formdisplaytypes) | 否       | `"visible"`       |
| mounted       | 表单是否已挂载         | Boolean                               | 否       | `false`           |
| unmounted     | 表单是否已卸载         | Boolean                               | 否       | `false`           |
| values        | 表单值                 | Object                                | 否       | `{}`              |
| initialValues | 表单默认值             | Object                                | 否       | `{}`              |
| valid         | 表单是否合法           | Boolean                               | 是       | `true`            |
| invalid       | 表单是否非法           | Boolean                               | 是       | `false`           |
| errors        | 表单校验错误消息       | [IFormFeedback](#iformfeedback)[]     | 是       | `[]`              |
| warnings      | 表单校验警告消息       | [IFormFeedback](#iformfeedback)[]     | 是       | `[]`              |
| successes     | 表单校验成功消息       | [IFormFeedback](#iformfeedback)[]     | 是       | `[]`              |
| hidden        | 表单是否隐藏           | Boolean                               | 否       | `false`           |
| visible       | 表单是否显示           | Boolean                               | 否       | `true`            |
| editable      | 表单是否可编辑         | Boolean                               | 否       | `true`            |
| readOnly      | 表单是否只读           | Boolean                               | 否       | `false`           |
| disabled      | 表单是否禁用           | Boolean                               | 否       | `false`           |
| readPretty    | 表单是否为阅读态       | Boolean                               | 否       | `false`           |
| id            | 表单 ID                | String                                | 否       | `{RANDOM_STRING}` |
| displayName   | 模型标签               | String                                | 否       | `"Form"`          |

## 方法

### createField

#### 描述

创建一个 Field 实例的工厂函数，如果路径相同，多次调用，会复用实例对象

#### 签名

```ts
interface createField {
  (props: IFieldFactoryProps): Field
}
```

函数入参请参考[IFieldFactoryProps](#ifieldfactoryprops)

### createArrayField

#### 描述

创建一个 ArrayField 实例的工厂函数，如果路径相同，多次调用，会复用实例对象

#### 签名

```ts
interface createArrayField {
  (props: IFieldFactoryProps): ArrayField
}
```

函数入参请参考[IFieldFactoryProps](#ifieldfactoryprops)

### createObjectField

#### 描述

创建一个 ObjectField 实例的工厂函数，如果路径相同，多次调用，会复用实例对象

#### 签名

```ts
interface createObjectField {
  (props: IFieldFactoryProps): ArrayField
}
```

函数入参请参考[IFieldFactoryProps](#ifieldfactoryprops)

### createVoidField

#### 描述

创建一个 VoidField 实例的工厂函数，如果路径相同，多次调用，会复用实例对象

#### 签名

```ts
interface createVoidField {
  (props: IVoidFieldFactoryProps): ArrayField
}
```

函数入参请参考[IVoidFieldFactoryProps](#ivoidfieldfactoryprops)

### setValues

#### 描述

设置表单值，可以设置合并策略 [IFormMergeStrategy](#iformmergestrategy)

#### 签名

```ts
interface setValues {
  (values: object, strategy: IFormMergeStrategy = 'merge'): void
}
```

### setInitialValues

#### 描述

设置表单默认值，可以设置合并策略

#### 签名

```ts
interface setInitialValues {
  (initialValues: object, strategy: IFormMergeStrategy = 'merge'): void
}
```

### setValuesIn

#### 描述

精确设置表单值

#### 签名

```ts
interface setValuesIn {
  (path: FormPathPattern, value: any): void
}
```

FormPathPattern API 参考 [FormPath](/api/entry/form-path#formpathpattern)

### setInitialValuesIn

#### 描述

精确设置表单默认值

#### 签名

```ts
interface setInitialValuesIn {
  (path: FormPathPattern, initialValue: any): void
}
```

FormPathPattern API 参考 [FormPath](/api/entry/form-path#formpathpattern)

### existValuesIn

#### 描述

根据指定路径判断值是否存在

#### 签名

```ts
interface existValuesIn {
  (path: FormPathPattern): boolean
}
```

FormPathPattern API 参考 [FormPath](/api/entry/form-path#formpathpattern)

### existInitialValuesIn

#### 描述

根据指定路径判断默认值是否存在

#### 签名

```ts
interface existInitialValuesIn {
  (path: FormPathPattern): boolean
}
```

FormPathPattern API 参考 [FormPath](/api/entry/form-path#formpathpattern)

### getValuesIn

#### 描述

根据指定路径获取表单值

#### 签名

```ts
interface getValuesIn {
  (path: FormPathPattern): any
}
```

FormPathPattern API 参考 [FormPath](/api/entry/form-path#formpathpattern)

### getInitialValuesIn

#### 描述

根据指定路径获取表单默认值

#### 签名

```ts
interface getInitialValuesIn {
  (path: FormPathPattern): any
}
```

FormPathPattern API 参考 [FormPath](/api/entry/form-path#formpathpattern)

### deleteValuesIn

#### 描述

根据指定路径删除表单值

#### 签名

```ts
interface deleteValuesIn {
  (path: FormPathPattern): void
}
```

FormPathPattern API 参考 [FormPath](/api/entry/form-path#formpathpattern)

### deleteInitialValuesIn

#### 描述

根据指定路径删除表单默认值

#### 签名

```ts
interface deleteInitialValuesIn {
  (path: FormPathPattern): void
}
```

FormPathPattern API 参考 [FormPath](/api/entry/form-path#formpathpattern)

### setSubmitting

#### 描述

设置表单是否正在提交状态

#### 签名

```ts
interface setSubmitting {
  (submitting: boolean): void
}
```

### setValidating

#### 描述

设置表单是否正在校验状态

#### 签名

```ts
interface setValidating {
  (validating: boolean): void
}
```

### setDisplay

#### 描述

设置表单展示状态

#### 签名

```ts
interface setDisplay {
  (display: FormDisplayTypes): void
}
```

函数入参请参考[FormDisplayTypes](#formdisplaytypes)

### setPattern

#### 描述

设置表单交互模式

#### 签名

```ts
interface setPattern {
  (pattern: FormPatternTypes): void
}
```

函数入参请参考[FormPatternTypes](#formpatterntypes)

### addEffects

#### 描述

添加副作用

#### 签名

```ts
interface addEffects {
  (id: string, effects: (form: Form) => void): void
}
```

### removeEffects

#### 描述

移除副作用，id 与 addEffects 的 id 保持一致

#### 签名

```ts
interface removeEffects {
  (id: string): void
}
```

### setEffects

#### 描述

覆盖式更新副作用

#### 签名

```ts
interface setEffects {
  (effects: (form: Form) => void): void
}
```

### clearErrors

#### 描述

清空错误消息

#### 签名

```ts
interface clearErrors {
  (pattern?: FormPathPattern): void
}
```

FormPathPattern API 参考 [FormPath](/api/entry/form-path#formpathpattern)

### clearWarnings

#### 描述

清空警告消息

#### 签名

```ts
interface clearWarnings {
  (pattern?: FormPathPattern): void
}
```

FormPathPattern API 参考 [FormPath](/api/entry/form-path#formpathpattern)

### clearSuccesses

#### 描述

清空成功消息

#### 签名

```ts
interface clearSuccesses {
  (pattern?: FormPathPattern): void
}
```

FormPathPattern API 参考 [FormPath](/api/entry/form-path#formpathpattern)

### query

#### 描述

查询字段节点

#### 签名

```ts
interface query {
  (pattern: FormPathPattern): Query
}
```

FormPathPattern API 参考 [FormPath](/api/entry/form-path#formpathpattern)

Query 对象 API 参考 [Query](/api/models/query)

### queryFeedbacks

#### 描述

查询消息反馈

#### 签名

```ts
interface queryFeedbacks {
  (search: ISearchFeedback): IFormFeedback[]
}
```

ISearchFeedback 参考 [ISearchFeedback](/api/models/field#isearchfeedback)

IFormFeedback 参考[IFormFeedback](#iformfeedback)

### notify

#### 描述

广播消息

#### 签名

```ts
interface notify<T> {
  (type?: string, payload: T): void
}
```

### subscribe

#### 描述

订阅消息

#### 签名

```ts
interface subscibe<T> {
  (callback: (payload: T) => void): number
}
```

### unsubscribe

#### 描述

取消订阅

#### 签名

```ts
interface unsubscribe {
  (id: number): void
}
```

### onInit

#### 描述

触发表单初始化，默认不需要手动调用

#### 签名

```ts
interface onInit {
  (): void
}
```

### onMount

#### 描述

触发挂载

#### 签名

```ts
interface onMount {
  (): void
}
```

### onUnmount

#### 描述

触发卸载

#### 签名

```ts
interface onUnmount {
  (): void
}
```

### setState

#### 描述

设置表单状态

#### 签名

```ts
interface setState {
  (callback: (state: IFormState) => void): void
  (state: IFormState): void
}
```

IFormState 参考 [IFormState](#iformstate)

### getState

#### 描述

获取表单状态

#### 签名

```ts
interface getState<T> {
  (): IFormState
  (callback: (state: IFormState) => T): T
}
```

IFormState 参考 [IFormState](#iformstate)

### setFormState

与 setState API 一致

### getFormState

与 getState API 一致

### setFieldState

#### 描述

设置字段状态

#### 签名

```ts
interface setFieldState {
  (pattern: FormPathPattern, setter: (state: IGeneralFieldState) => void): void
  (pattern: FormPathPattern, setter: IGeneralFieldState): void
}
```

FormPathPattern API 参考 [FormPath](/api/entry/form-path#formpathpattern)

IGeneralFieldState 参考 [IGeneralFieldState](/api/models/field/#igeneralfieldstate)

### getFieldState

#### 描述

获取字段状态

#### 签名

```ts
interface getFieldState<T> {
  (pattern: FormPathPattern): IGeneralFieldState
  (pattern: FormPathPattern, callback: (state: IGeneralFieldState) => T): T
}
```

FormPathPattern API 参考 [FormPath](/api/entry/form-path#formpathpattern)

IGeneralFieldState 参考 [IGeneralFieldState](/api/models/field/#igeneralfieldstate)

### getFormGraph

#### 描述

获取表单字段集

#### 签名

```ts
interface getFormGraph {
  (): {
    [key: string]: GeneralFieldState | FormState
  }
}
```

### setFormGraph

#### 描述

设置表单字段集

#### 签名

```ts
interface setFormGraph {
  (graph: { [key: string]: GeneralFieldState | FormState }): void
}
```

### clearFormGraph

#### 描述

清空字段集

#### 签名

```ts
interface clearFormGraph {
  (pattern: FormPathPattern): void
}
```

### validate

#### 描述

表单校验触发器，可以按照指定路径校验，如果校验成功是不会有任何返回，校验失败会在 promise reject 中返回[IFormFeedback](#iformfeedback)[]

#### 签名

```ts
interface validate {
  (pattern: FormPathPattern): Promise<void>
}
```

### submit

#### 描述

表单提交方法，如果在 onSubmit 回调函数中返回 Promise，表单会在提交开始的时候设置 submitting 状态为 true，Promise resolve 的时候再设置为 false，视图层可以消费 submitting 状态来实现防重复提交

#### 签名

```ts
interface submit<T> {
  (): Promise<Form['values']>
  (onSubmit?: (values: Form['values']) => Promise<T> | void): Promise<T>
}
```

### reset

#### 描述

表单重置方法，可以指定重置具体字段，也可以指定重置时自动校验

#### 描述

```ts
interface reset {
  (pattern: FormPathPattern, options?: IFieldResetOptions): Promise<void>
}
```

FormPathPattern API 参考 [FormPath](/api/entry/form-path#formpathpattern)

IFieldResetOptions 参考 [IFieldResetOptions](/api/models/field/#ifieldresetoptions)

## 类型

<Alert>
注意：如果要手动消费类型，直接从包模块中导出即可
</Alert>

### FormPatternTypes

```ts
type FormPatternTypes = 'editable' | 'disabled' | 'readOnly' | 'readPretty'
```

### FormDisplayTypes

```ts
type FormDisplayTypes = 'none' | 'hidden' | 'visible'
```

### IFormFeedback

```ts
interface IFormFeedback {
  path?: string //校验字段数据路径
  address?: string //校验字段绝对路径
  triggerType?: 'onInput' | 'onFocus' | 'onBlur' //校验触发类型
  type?: 'error' | 'success' | 'warning' //反馈类型
  code?: //反馈编码
  | 'ValidateError'
    | 'ValidateSuccess'
    | 'ValidateWarning'
    | 'EffectError'
    | 'EffectSuccess'
    | 'EffectWarning'
  messages?: string[] //反馈消息
}
```

### IFormState

```ts
interface IFormState {
  editable?: boolean
  readOnly?: boolean
  disabled?: boolean
  readPretty?: boolean
  hidden?: boolean
  visible?: boolean
  initialized?: boolean
  validating?: boolean
  submitting?: boolean
  modified?: boolean
  pattern?: FormPatternTypes
  display?: FormDisplayTypes
  values?: any
  initialValues?: any
  mounted?: boolean
  unmounted?: boolean
  readonly valid?: boolean
  readonly invalid?: boolean
  readonly errors?: IFormFeedback[]
  readonly warnings?: IFormFeedback[]
  readonly successes?: IFormFeedback[]
}
```

### IFormMergeStrategy

```ts
type IFormMergeStrategy = 'overwrite' | 'merge' | 'deepMerge' | 'shallowMerge'
```

### IFieldFactoryProps

```ts
interface IFieldFactoryProps {
  name: FormPathPattern //字段名称，当前节点的路径名称
  basePath?: FormPathPattern //基础路径
  title?: string | JSXElement //字段标题
  description?: string | JSXElement //字段描述
  value?: any //字段值
  initialValue?: any //字段默认值
  required?: boolean //字段是否必填
  display?: 'none' | 'hidden' | 'visible' //字段展示形式
  pattern?: 'editable' | 'disabled' | 'readOnly' | 'readPretty' //字段交互模式
  hidden?: boolean //字段是否隐藏
  visible?: boolean //字段是否显示
  editable?: boolean //字段是否可编辑
  disabled?: boolean //字段是否禁用
  readOnly?: boolean //字段是否只读
  readPretty?: boolean //字段是否为阅读态
  dataSource?: any[] //字段数据源
  validateFirst?: boolean //字段校验是否只校验第一个非法规则
  validator?: FieldValidator //字段校验器
  decorator?: any[] //字段装饰器，第一个元素代表组件引用，第二个元素代表组件属性
  component?: any[] //字段组件，第一个元素代表组件引用，第二个元素代表组件属性
  reactions?: FieldReaction[] | FieldReaction //字段响应器
}
```

FormPathPattern API 参考 [FormPath](/api/entry/form-path#formpathpattern)

FieldValidator 参考 [FieldValidator](/api/models/field#fieldvalidator)

FieldReaction 参考 [FieldReaction](/api/models/field#fieldreaction)

### IVoidFieldFactoryProps

```ts
interface IFieldFactoryProps {
  name: FormPathPattern //字段名称，当前节点的路径名称
  basePath?: FormPathPattern //基础路径
  title?: string | JSXElement //字段标题
  description?: string | JSXElement //字段描述
  required?: boolean //字段是否必填
  display?: 'none' | 'hidden' | 'visible' //字段展示形式
  pattern?: 'editable' | 'disabled' | 'readOnly' | 'readPretty' //字段交互模式
  hidden?: boolean //字段是否隐藏
  visible?: boolean //字段是否显示
  editable?: boolean //字段是否可编辑
  disabled?: boolean //字段是否禁用
  readOnly?: boolean //字段是否只读
  readPretty?: boolean //字段是否为阅读态
  decorator?: any[] //字段装饰器，第一个元素代表组件引用，第二个元素代表组件属性
  component?: any[] //字段组件，第一个元素代表组件引用，第二个元素代表组件属性
  reactions?: FieldReaction[] | FieldReaction //字段响应器
}
```

FormPathPattern API 参考 [FormPath](/api/entry/form-path#formpathpattern)

FieldReaction 参考 [FieldReaction](/api/models/field#fieldreaction)

> Formily Typescript 类型约定
>
> - 简单非对象数据类型或 Union 数据类型用 type 定义类型，不能以大写`I`字符开头
> - 简单对象类型统一用 interface 定义类型，且以大写`I`字符开头，如果存在不同 interface 的组合(Intersection or Extends)使用 type 定义类型，同样以大写`I`字符开头
