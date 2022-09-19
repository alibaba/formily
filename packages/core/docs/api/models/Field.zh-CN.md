---
order: 1
---

# Field

调用[createField](/api/models/form#createfield)所返回的 Field 模型。

以下会列出所有模型属性，如果该属性是可写的，那么我们可以直接引用是修改该属性，@formily/reactive 便会响应从而触发 UI 更新。

## 属性

| 属性           | 描述                              | 类型                                               | 是否只读 | 默认值       |
| -------------- | --------------------------------- | -------------------------------------------------- | -------- | ------------ |
| initialized    | 字段是否已被初始化                | Boolean                                            | 否       | `false`      |
| mounted        | 字段是否已挂载                    | Boolean                                            | 否       | `false`      |
| unmounted      | 字段是否已卸载                    | Boolean                                            | 否       | `false`      |
| address        | 字段节点路径                      | [FormPath](/api/entry/form-path)                   | 是       |              |
| path           | 字段数据路径                      | [FormPath](/api/entry/form-path)                   | 是       |              |
| title          | 字段标题                          | [FieldMessage](#fieldmessage)                      | 否       | `""`         |
| description    | 字段描述                          | [FieldMessage](#fieldmessage)                      | 否       | `""`         |
| loading        | 字段加载状态                      | Boolean                                            | 否       | `false`      |
| validating     | 字段是否正在校验                  | Boolean                                            | 否       | `false`      |
| modified       | 字段子树是否被手动修改过          | Boolean                                            | 否       | `false`      |
| selfModified   | 字段自身是否被手动修改过          | Boolean                                            | 否       | `false`      |
| active         | 字段是否处于激活态                | Boolean                                            | 否       | `false`      |
| visited        | 字段是否被浏览过                  | Boolean                                            | 否       | `false`      |
| inputValue     | 字段输入值                        | Any                                                | 否       | `null`       |
| inputValues    | 字段输入值集合                    | Array                                              | 否       | `[]`         |
| dataSource     | 字段数据源                        | Array                                              | 否       | `[]`         |
| validator      | 字段校验器                        | [FieldValidator](#fieldvalidator)                  | 否       | `null`       |
| decorator      | 字段装饰器                        | Any[]                                              | 否       | `null`       |
| component      | 字段组件                          | Any[]                                              | 否       | `null`       |
| feedbacks      | 字段反馈信息                      | [IFieldFeedback](#ifieldfeedback)[]                | 否       | `[]`         |
| parent         | 父级字段                          | [GeneralField](#generalfield)                      | 是       | `null`       |
| errors         | 字段汇总(包含子节点)错误消息      | [IFormFeedback](/api/models/form/#iformfeedback)[] | 是       | `[]`         |
| warnings       | 字段汇总(包含子节点)警告消息      | [IFormFeedback](/api/models/form/#iformfeedback)[] | 是       | `[]`         |
| successes      | 字段汇总(包含子节点)成功消息      | [IFormFeedback](/api/models/form/#iformfeedback)[] | 是       | `[]`         |
| valid          | 字段是否合法(包含子节点)          | Boolean                                            | 否       | `true`       |
| invalid        | 字段是否非法(包含子节点)          | Boolean                                            | 否       | `false`      |
| value          | 字段值                            | Any                                                | 否       |              |
| initialValue   | 字段默认值                        | Any                                                | 否       |              |
| display        | 字段展示状态                      | [FieldDisplayTypes](#fielddisplaytypes)            | 否       | `"visible"`  |
| pattern        | 字段交互模式                      | [FieldPatternTypes](#fieldpatterntypes)            | 否       | `"editable"` |
| required       | 字段是否必填                      | Boolean                                            | 否       | `false`      |
| hidden         | 字段是否隐藏                      | Boolean                                            | 否       | `false`      |
| visible        | 字段是否显示                      | Boolean                                            | 否       | `true`       |
| disabled       | 字段是否禁用                      | Boolean                                            | 否       | `false`      |
| readOnly       | 字段是否只读                      | Boolean                                            | 否       | `false`      |
| readPretty     | 字段是否为阅读态                  | Boolean                                            | 否       | `false`      |
| editable       | 字段是可编辑                      | Boolean                                            | 否       | `true`       |
| validateStatus | 字段校验状态                      | [FieldValidateStatus](#fieldvalidatestatus)        | 是       | `null`       |
| content        | 字段内容，一般作为子节点          | any                                                | 否       | `null`       |
| data           | 字段扩展属性                      | Object                                             | 否       | `null`       |
| selfErrors     | 字段自身错误消息                  | [FieldMessage](#fieldmessage)[]                    | 否       | `[]`         |
| selfWarnings   | 字段自身警告消息                  | [FieldMessage](#fieldmessage)[]                    | 否       | `[]`         |
| selfSuccesses  | 字段自身成功消息                  | [FieldMessage](#fieldmessage)[]                    | 否       | `[]`         |
| selfValid      | 字段自身是否合法                  | Boolean                                            | 否       | `true`       |
| selfInvalid    | 字段自身是否非法                  | Boolean                                            | 否       | `false`      |
| indexes        | 字段数字索引集合                  | Number                                             | 是       | `-`          |
| index          | 字段数字索引，取 indexes 最后一个 | Number                                             | 是       | `-`          |

#### 详细解释

**active**

触发 onFocus 为 true，触发 onBlur 为 false

**visited**

触发过 onFocus 则永远为 true

**inputValue**

触发 onInput 收集到的值

**inputValues**

触发 onInput 收集到的多参值

**hidden**

为 true 时， display 为 hidden；为 false 时 display 为 visible

**visible**

为 true 时， display 为 visible；为 false 时 display 为 none

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
  (dataSource?: FieldDataSource): void
}
```

FieldDataSource 参考 [FieldDataSource](#fielddatasource)

### setFeedback

#### 描述

设置字段消息反馈

#### 签名

```ts
interface setFeedback {
  (feedback?: IFieldFeedback): void
}
```

IFieldFeedback 参考 [IFieldFeedback](#ifieldfeedback)

### setSelfErrors

#### 描述

设置字段自身错误消息，这里是以 EffectError 为 code 的 feedback 更新，主要是防止污染校验器结果，如果希望强制覆盖，则可以使用 setFeedback

#### 签名

```ts
interface setSelfErrors {
  (messages?: FieldMessage[]): void
}
```

### setSelfWarnings

#### 描述

设置字段自身警告信息，这里是以 EffectWarning 为 code 的 feedback 更新，主要是防止污染校验器结果，如果希望强制覆盖，则可以使用 setFeedback

#### 签名

```ts
interface setSelfWarning {
  (messages?: FieldMessage[]): void
}
```

### setSelfSuccesses

#### 描述

设置字段自身成功信息，这里是以 EffectSuccess 为 code 的 feedback 更新，主要是防止污染校验器结果，如果希望强制覆盖，则可以使用 setFeedback

#### 签名

```ts
interface setSelfSuccesses {
  (messages?: FieldMessage[]): void
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

### setValidatorRule

#### 描述

按照规则设置字段 validator，类似于 setRequired

#### 签名

```ts
interface setValidatorRule {
  (ruleName?: string, ruleValue: any): void
}
```

### setValue

#### 描述

设置字段值

#### 签名

```ts
interface setValue {
  (value?: FieldValue): void
}
```

FieldValue 参考 [FieldValue](#fieldvalue)

### setInitialValue

#### 描述

设置字段默认值

#### 签名

```ts
interface setInitialValue {
  (initialValue?: FieldValue): void
}
```

FieldValue 参考 [FieldValue](#fieldvalue)

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

### submit

#### 描述

触发字段提交(包含所有子节点，该 API 主要用于子表单场景)

#### 签名

```ts
interface submit<T> {
  (): Promise<Field['value']>
  (onSubmit?: (values: Field['value']) => Promise<T> | void): Promise<T>
}
```

### validate

#### 描述

触发字段校验(包含所有子节点，该 API 主要用于子表单场景)

#### 签名

```ts
interface validate {
  (triggerType?: 'onInput' | 'onFocus' | 'onBlur'): Promise<IValidateResults>
}
```

IValidateResults 参考 [IValidateResults](#ivalidateresults)

### reset

#### 描述

触发字段重置(包含所有子节点，该 API 主要用于子表单场景)，如果设置了校验，那么返回结果就是校验结果

#### 签名

```ts
interface reset {
  (options?: IFieldResetOptions): Promise<IValidateResults>
}
```

IFieldResetOptions 参考 [IFieldResetOptions](#ifieldresetoptions)

IValidateResults 参考 [IValidateResults](#ivalidateresults)

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

### queryFeedbacks

#### 描述

查询当前字段的反馈信息

#### 签名

```ts
interface queryFeedbacks {
  (search: ISearchFeedback): IFieldFeedback[]
}
```

ISearchFeedback 参考 [ISearchFeedback](/api/models/field#isearchfeedback)

IFieldFeedback 参考[IFieldFeedback](#ifieldfeedback)

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

### inject

#### 描述

给字段模型注入可执行方法

#### 签名

```ts
interface inject {
  (actions: Record<string, (...args: any[]) => any>): void
}
```

### invoke

#### 描述

调用字段模型通过 inject 注入的可执行方法

#### 签名

```ts
interface invoke {
  (name: string, ...args: any[]): any
}
```

## 类型

<Alert>
注意：如果要手动消费类型，直接从包模块中导出即可
</Alert>

### FieldValidator

字段校验器，类型较为复杂，需要用户仔细消化

```ts
//字符串型格式校验器
type ValidatorFormats =
  | 'url'
  | 'email'
  | 'ipv6'
  | 'ipv4'
  | 'number'
  | 'integer'
  | 'idcard'
  | 'qq'
  | 'phone'
  | 'money'
  | 'zh'
  | 'date'
  | 'zip'
  | (string & {}) //其他格式校验器需要通过registerValidateFormats进行注册

//对象型校验结果
interface IValidateResult {
  type: 'error' | 'warning' | 'success' | (string & {})
  message: string
}
//对象型校验器
interface IValidatorRules<Context = any> {
  triggerType?: 'onInput' | 'onFocus' | 'onBlur'
  format?: ValidatorFormats
  validator?: ValidatorFunction<Context>
  required?: boolean
  pattern?: RegExp | string
  max?: number
  maximum?: number
  exclusiveMaximum?: number
  exclusiveMinimum?: number
  minimum?: number
  min?: number
  len?: number
  whitespace?: boolean
  enum?: any[]
  const?: any
  multipleOf?: number
  uniqueItems?: boolean
  maxProperties?: number
  minProperties?: number
  maxItems?: number
  maxLength?: number
  minItems?: number
  minLength?: number
  message?: string
  [key: string]: any //其他属性需要通过registerValidateRules进行注册
}
//函数型校验器校验结果类型
type ValidatorFunctionResponse = null | string | boolean | IValidateResult

//函数型校验器
type ValidatorFunction<Context = any> = (
  value: any,
  rule: IValidatorRules<Context>,
  ctx: Context
) => ValidatorFunctionResponse | Promise<ValidatorFunctionResponse> | null

//非数组型校验器
type ValidatorDescription =
  | ValidatorFormats
  | ValidatorFunction<Context>
  | IValidatorRules<Context>

//数组型校验器
type MultiValidator<Context = any> = ValidatorDescription<Context>[]

type FieldValidator<Context = any> =
  | ValidatorDescription<Context>
  | MultiValidator<Context>
```

### FieldMessage

```ts
type FieldMessage = string | JSXElement
```

如果在支持 JSX 的 UI 框架下，我们可以直接传 JSX 的 Node，否则，我们只能传字符串

### FieldDataSource

```ts
type FieldDataSource<ValueType> = Array<{
  label: string | JSXElement
  value: ValueType
  [key: string]: any
}>
```

字段数据源其实就是一个数组，内容是啥形式由用户定，只是我们推荐用户都以 label/value 形式来表达数据源，这里需要注意的是，如果要在 UI 框架中使用，不是设置了就直接能生效，dataSource 属性必须是与具体 UI 组件产生了绑定才能生效，比如使用@formily/react，想要绑定状态，可以使用 connect 函数，也可以直接在组件内通过 useField 拿到字段实例，直接消费。

### FieldValue

字段值类型其实是`Any`类型，只是需要着重提一下，如果在 ArrayField 中是强制数组类型，ObjectField 中是强制对象类型

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

### FieldValidateStatus

```ts
type FieldValidateStatus = 'error' | 'warning' | 'success' | 'validating'
```

### GeneralField

```ts
type GeneralField = Field | VoidField | ArrayField | ObjectField
```

VoidField 参考 [VoidField](/api/models/void-field)

ArrayField 参考 [ArrayField](/api/models/array-field)

ObjectField 参考 [ObjectField](/api/models/object-field)

### IFieldFeedback

```ts
interface IFieldFeedback {
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

### ISearchFeedback

```ts
interface ISearchFeedback {
  triggerType?: 'onInput' | 'onFocus' | 'onBlur' //校验触发类型
  type?: 'error' | 'success' | 'warning' //反馈类型
  code?: //反馈编码
  | 'ValidateError'
    | 'ValidateSuccess'
    | 'ValidateWarning'
    | 'EffectError'
    | 'EffectSuccess'
    | 'EffectWarning'
  address?: FormPathPattern
  path?: FormPathPattern
  messages?: string[]
}
```

### IFieldState

```ts
interface IFieldState {
  hidden?: boolean
  visible?: boolean
  editable?: boolean
  readOnly?: boolean
  disabled?: boolean
  readPretty?: boolean
  title?: any
  description?: any
  loading?: boolean
  validating?: boolean
  modified?: boolean
  active?: boolean
  visited?: boolean
  inputValue?: FieldValue
  inputValues?: any[]
  initialized?: boolean
  dataSource?: FieldDataSource
  mounted?: boolean
  unmounted?: boolean
  validator?: FieldValidator
  decorator?: FieldDecorator
  component?: FieldComponent
  readonly parent?: GeneralField
  errors?: FieldMessage[]
  warnings?: FieldMessage[]
  successes?: FieldMessage[]
  readonly valid?: boolean
  readonly invalid?: boolean
  value?: FieldValue
  initialValue?: FieldValue
  display?: FieldDisplayTypes
  pattern?: FieldPatternTypes
  required?: boolean
  readonly validateStatus?: 'error' | 'success' | 'warning' | 'validating'
}
```

### IGeneralFieldState

```ts
type IGeneralFieldState = IFieldState & IVoidFieldState
```

IVoidFieldState 参考 [IVoidFieldState](/api/models/void-field#ivoidfieldstate)

### IFieldResetOptions

```ts
interface IFieldResetOptions {
  forceClear?: boolean //是否强制清除
  validate?: boolean //是否校验
}
```

### IValidateResults

```ts
interface IValidateResults {
  error?: string[]
  warning?: string[]
  success?: string[]
}
```

> Formily Typescript 类型约定
>
> - 简单非对象数据类型或 Union 数据类型用 type 定义类型，不能以大写`I`字符开头
> - 简单对象类型统一用 interface 定义类型，且以大写`I`字符开头，如果存在不同 interface 的组合(Intersection or Extends)使用 type 定义类型，同样以大写`I`字符开头
