# @formily/core

> 表单状态核心管理包(不依赖任何第三方 UI 框架)，在该包中，它主要做了：
>
> - 管理 Form 状态
> - 管理 Field 状态
> - 管理 Validator 状态
> - 管理 Form/Field/Validator 之间的依赖关系

### 安装

```bash
npm install --save @formily/core
```

### 目录

<!-- toc -->

- [背景](#%E8%83%8C%E6%99%AF)
- [设计理念](#%E8%AE%BE%E8%AE%A1%E7%90%86%E5%BF%B5)
- [核心亮点](#%E6%A0%B8%E5%BF%83%E4%BA%AE%E7%82%B9)
- [架构图](#%E6%9E%B6%E6%9E%84%E5%9B%BE)
- [术语解释](#%E6%9C%AF%E8%AF%AD%E8%A7%A3%E9%87%8A)
- [API](#api)
  - [`createForm`](#createform)
  - [`registerValidationFormats`](#registervalidationformats)
  - [`registerValidationRules`](#registervalidationrules)
  - [`registerValidationMTEngine`](#registervalidationmtengine)
  - [`setValidationLanguage`](#setvalidationlanguage)
  - [`setValidationLocale`](#setvalidationlocale)
- [Classes](#classes)
  - [`new FormPath()`](#new-formpath)
  - [`new FormLifeCyle()`](#new-formlifecyle)
- [Enums](#enums)
  - [LifeCycleTypes](#lifecycletypes)
- [Interfaces](#interfaces)
  - [IFormCreatorOptions](#iformcreatoroptions)
  - [IForm](#iform)
  - [IMutators](#imutators)
  - [Validation](#validation)
  - [IFormState](#iformstate)
  - [IFieldState](#ifieldstate)
  - [IVirtualFieldState](#ivirtualfieldstate)
  - [IField/IVirtualField](#ifieldivirtualfield)

<!-- tocstop -->

### 背景

中后台领域，核心就是两种场景，**一个是数据录入，一个是数据查询+数据展现**，不管
是数据录入还是数据查询，都是借助表单来实现的，从实现复杂度来看，两者复杂度相差不
多，因为数据呈现层面难免会有极度复杂的呈现形式(比如 Tree Table 等等)，但是，数据
呈现却是最容易复用和抽象的，只有表单，会涉及大量的交互逻辑，所以，只要我们根本上
解决了表单问题，对于中后台场景，基本上解决了大部分中后台场景问题，Formily，就是为
此而诞生的。

### 设计理念

**Anything comes from Observable Graph.**

### 核心亮点

- 时间旅行，借助首创 Observable Graph，可以记录任意时刻的全量状态，也可以将状态
  回滚至任意时刻，这样的能力在，重事务型应用与本地调试上可以发挥出最大价值
- 高效更新，精确渲染，无需整树渲染
- 内置 immer.js，智能降级，无需关心浏览器兼容性
- 更加完备的生命周期钩子
- 更加完备的校验引擎
  - validateFirst 校验
  - warning 校验(不阻塞提交校验)
  - 校验消息模板引擎(不影响国际化文案存储的复杂校验文案消息解决方案)
  - 校验规则可扩展，正则校验库可扩展
- 更加灵活的路径解析，匹配，求值，取值引擎
  - 批量匹配数据路径能力
  - 解构求值，解构取值能力
- 提供了基础表单状态模型之外的状态管理能力

### 架构图

![](https://img.alicdn.com/tfs/TB18LXHlVP7gK0jSZFjXXc5aXXa-1428-926.png)

### 术语解释

**FormPath/FormPathPattern** 是一个抽象数据路径形式，FormPath 是路径类
，FormPathPattern 是可以被 FormPath 解析的路径形式，在这里主要使用了
[cool-path](https://github.com/janrywang/cool-path) 路径解析匹配，求值取值能力

**VirtualField** 是一个特殊的 Field 数据结构，它与 Field 的差异就是，它不管理
value，也就是说，它与 Form 的 value 是没有关联性的，通常我们使用它，更多的是作为
代理一个 UI 容器的状态，比如：Formily 中的布局组件 FormBlock，它会在整个 Form
Graph 中作为一个独立节点而存在，但是这个节点类型就是一个 VirtualField，但是最终
数据提交的时候，FormBlock 并不会污染提交数据的数据结构。

**Observable Graph** 是 Form 独有的观察者树，借助观察者树，可以实现很多表单相关
的内部联动逻辑

**Data Path** 是 Field/VirtualField 的 name 属性，它是作为数据路径而存在

**Node Path** 是 Field/VirtualField 的 path 属性，它是作为节点路径而存在

对于数据路径和节点路径，我们可以看下面这张图：

![](https://img.alicdn.com/tfs/TB1.rAamG61gK0jSZFlXXXDKFXa-1496-898.png)

如果存在这样一棵树的话，那么:

- c 字段的 name 属性则是 a.c，path 属性是 a.b.c
- b 字段的 name 属性是 a.b，path 属性是 a.b
- d 字段的 name 属性是 a.d，path 属性是 a.d
- e 字段的 name 属性是 a.d.e，path 属性是 a.d.e

这一来解释之后，我们就大概明白了，只要在某个节点路径中，存在 VirtualField，那么
它的数据路径就会略过 VirtualField，但是，对于 VirtualField 自身这个节点，它的
name 属性，是包含它自身的节点标识的，这就是为什么 b 字段的 name 属性是 a.b 的原
因

### API

---

#### `createForm`

> 创建一个 Form 实例

**签名**

```typescript
createForm(options?: IFormCreatorOptions): IForm
```

**用法**

```typescript
import { createForm } from '@formily/core'

const form = createForm({
  values: {},
  initialValues: {},
  onChange: values => {
    console.log(values)
  }
})

const aa = form.registerField({
  path: 'aa'
})

aa.setState(state => {
  state.value = 123
})
console.log(form.getFormState(state => state.values)) //{aa:123}
```

#### `registerValidationFormats`

> 注册正则校验规则集

**签名**

```typescript
registerValidationFormats(formats:{
    [formatName in string]: RegExp;
}) : void
```

**用法**

```typescript
import { createForm, registerValidationFormats } from '@formily/core'

registerValidationFormats({
  number: /^[+-]?\d+(\.\d+)?$/
})

const form = createForm({
  values: {},
  initialValues: {},
  onChange: values => {
    console.log(values)
  }
})

const aa = form.registerField({
  path: 'aa',
  rules: [
    {
      format: 'number',
      message: 'This field is not a number.'
    }
  ]
})

aa.setState(state => {
  state.value = 'hello world'
})
form.validate()

console.log(form.getFormState(state => state.errors))
/**
[{
    path: 'aa',
    messages: [ 'This field is not a number.' ]
}]
**/
```

#### `registerValidationRules`

> 注册校验规则集，与注册 formats 的差别是，它可以注册复杂校验规则，但是 formats
> 只是正则表达式

**签名**

```typescript
registerValidationRules(
  rules:{
     [ruleName:string]:(value:any,rule:ValidateDescription)=>boolean
  }
) : void
```

**用法**

```typescript
import { createForm, registerValidationRules } from '@formily/core'

registerValidationRules({
  custom: value => {
    return value === '123' ? 'This field can not be 123' : ''
  }
})

const form = createForm({
  values: {},
  initialValues: {},
  onChange: values => {
    console.log(values)
  }
})

const aa = form.registerField({
  path: 'aa',
  rules: [
    {
      custom: true
    }
  ]
})

aa.setState(state => {
  state.value = '123'
})
form.validate()

console.log(form.getFormState(state => state.errors))
/**
[{
    path: 'aa',
    messages: ['This field can not be 123']
}]
**/
```

#### `registerValidationMTEngine`

> 注册校验消息模板引擎

**签名**

```typescript
registerValidationMTEngine(callback:(message,context)=>any) : void
```

**用法**

```javascript
import { createForm,registerValidationMTEngine } from '@formily/core'

registerValidationMTEngine((message,context)=>{
  return message.replace(/\{\{\s*(\w+)\s*\}\}/g, (_, $0) => {
      return FormPath.getIn(context, $0)
  })
})

const form = createForm({
  values: {},
  initialValues: {},
  onChange: values => {
    console.log(values)
  }
})

const aa = form.registerField({
  path: 'aa',
  rules: [
    {
      validator(value){
         return value === 123 : 'This field can not be 123 {{scope.outerVariable}}'
      },
      scope:{
        outerVariable:'addonAfter'
      }
    }
  ]
})

aa.setState(state => {
  state.value = '123'
})
form.validate()

console.log(form.getFormState(state =>state.errors))
/**
[{
    path: 'aa',
    messages: ['This field can not be 123 addonAfter']
}]
**/
```

#### `setValidationLanguage`

> 设置国际化语言类型

**签名**

```typescript
setValidationLanguage(lang: string): void
```

**用法**

```javascript
import { setValidationLanguage } from '@formily/core'

setValidationLanguage('en-US')
```

#### `setValidationLocale`

> 设置语言包

**签名**

```typescript
interface ILocaleMessages {
    [key: string]: string | ILocaleMessages;
}
interface ILocales {
    [lang: string]: ILocaleMessages;
}
setValidationLocale(locale: ILocales) => void
```

**用法**

```javascript
import { setValidationLocale } from '@formily/core'

setValidationLocale({
  'en-US': {
    required: 'This field is required.'
  }
})
```

### Classes

#### `new FormPath()`

> 表单路径引擎，核心负责路径解析，匹配，求值，取值，解构求值，解构取值

具体文档参考：https://github.com/janrywang/cool-path

#### `new FormLifeCyle()`

> 创建一个生命周期监听器

**签名**

```typescript
type FormLifeCycleHandler<T> = (payload: T, context: any) => void

new FormLifeCycle(handler: FormLifeCycleHandler<Payload>)
new FormLifeCycle(...type: LifeCycleTypes, handler: FormLifeCycleHandler<Payload>...)
new FormLifeCycle(handlerMap: { [key: LifeCycleTypes]: FormLifeCycleHandler<Payload> })
```

**用法**

```typescript
import { createForm,FormLifeCycle,LifeCycleTypes } from '@formily/core'

const form = createForm({
  lifecycles:[
    new FormLifeCycle(({type:LifeCycleTypes,payload:IForm | IField | IVirtualField })=>{
       //上帝模式，全量监听
    }),
    new FormLifeCycle(
      LifeCycleTypes.ON_FORM_MOUNT,
      (payload:IForm | IField | IVirtualField)=>{
       //精确监听
    }),
    new FormLifeCycle({
      [LifeCycleTypes.ON_FORM_MOUNT]:(payload:IForm | IField | IVirtualField)=>{
        //对象形式精确监听
      }
    }),
  ]
})
```

### Enums

---

#### LifeCycleTypes

```typescript
enum LifeCycleTypes {
  /**
   * Form LifeCycle
   **/

  ON_FORM_WILL_INIT = 'onFormWillInit', //表单预初始化触发
  ON_FORM_INIT = 'onFormInit', //表单初始化触发
  ON_FORM_CHANGE = 'onFormChange', //表单变化时触发
  ON_FORM_MOUNT = 'onFormMount', //表单挂载时触发
  ON_FORM_UNMOUNT = 'onFormUnmount', //表单卸载时触发
  ON_FORM_SUBMIT = 'onFormSubmit', //表单提交时触发
  ON_FORM_RESET = 'onFormReset', //表单重置时触发
  ON_FORM_SUBMIT_START = 'onFormSubmitStart', //表单提交开始时触发
  ON_FORM_SUBMIT_END = 'onFormSubmitEnd', //表单提交结束时触发
  ON_FORM_SUBMIT_VALIDATE_START = 'onFormSubmitValidateStart', // 表单提交触发的校验
  ON_FORM_SUBMIT_VALIDATE_SUCCESS = 'onFormSubmitValidateSuccess', // 表单提交时因为校验成功而触发
  ON_FORM_SUBMIT_VALIDATE_FAILED = 'onFormSubmitValidateFailed', // 表单提交时因为校验失败而触发
  ON_FORM_ON_SUBMIT_SUCCESS = 'onFormOnSubmitSuccess', // 表单自定义onSubmit成功
  ON_FORM_ON_SUBMIT_FAILED = 'onFormOnSubmitFailed', // 表单自定义onSubmit失败
  ON_FORM_VALUES_CHANGE = 'onFormValuesChange', //表单值变化时触发
  ON_FORM_INITIAL_VALUES_CHANGE = 'onFormInitialValuesChange', //表单初始值变化时触发
  ON_FORM_VALIDATE_START = 'onFormValidateStart', //表单校验开始时触发
  ON_FORM_VALIDATE_END = 'onFormValidateEnd', //表单校验结束时触发
  ON_FORM_INPUT_CHANGE = 'onFormInputChange', //表单事件触发时触发，用于只监控人工操作
  /**
   * FormGraph LifeCycle
   **/
  ON_FORM_GRAPH_CHANGE = 'onFormGraphChange', //表单观察者树变化时触发

  /**
   * Field LifeCycle
   **/

  ON_FIELD_WILL_INIT = 'onFieldWillInit', //字段预初始化时触发
  ON_FIELD_INIT = 'onFieldInit', //字段初始化时触发
  ON_FIELD_CHANGE = 'onFieldChange', //字段变化时触发
  ON_FIELD_INPUT_CHANGE = 'onFieldInputChange', //字段事件触发时触发，用于只监控人工操作
  ON_FIELD_VALUE_CHANGE = 'onFieldValueChange', //字段值变化时触发
  ON_FIELD_INITIAL_VALUE_CHANGE = 'onFieldInitialValueChange', //字段初始值变化时触发
  ON_FIELD_MOUNT = 'onFieldMount', //字段挂载时触发
  ON_FIELD_UNMOUNT = 'onFieldUnmount' //字段卸载时触发
}
```

### Interfaces

---

#### IFormCreatorOptions

> createForm 参数对象协议

```typescript
interface IFormCreatorOptions {
  //初始值
  initialValues?: {}
  //值
  values?: {}
  //生命周期监听器，在这里主要传入FormLifeCycle的实例化对象
  lifecycles?: FormLifeCycle[]
  //是否可编辑，在Form维度整体控制
  editable?: boolean | ((name: string) => boolean)
  //是否使用脏检查，默认会走immer精确更新
  useDirty?: boolean
  //是否走悲观校验，遇到第一个校验失败就停止后续校验
  validateFirst?: boolean
  //表单变化事件回调
  onChange?: (values: IFormState['values']) => void
  //表单提交事件回调
  onSubmit?: (values: IFormState['values']) => any | Promise<any>
  //表单重置事件回调
  onReset?: () => void
  //表单校验失败事件回调
  onValidateFailed?: (validated: IFormValidateResult) => void
}
```

#### IForm

> 通过 createForm 创建出来的 Form 实例对象 API

```typescript
interface IForm {
  /*
   * 表单提交，如果回调参数返回Promise，
   * 那么整个提交流程会hold住，同时loading为true，
   * 等待Promise resolve才触发表单onFormSubmitEnd事件，同时loading为false
   */
  submit(
    onSubmit?: (values: IFormState['values']) => any | Promise<any>
  ): Promise<{
    validated: IFormValidateResult
    payload: any //onSubmit回调函数返回值
  }>

  /*
   * 清空错误消息，可以通过传FormPathPattern来批量或精确控制要清空的字段，
   * 比如clearErrors("*(aa,bb,cc)")
   */
  clearErrors: (pattern?: FormPathPattern) => void

  /*
   * 获取状态变化情况，主要用于在表单生命周期钩子内判断当前生命周期中有哪些状态发生了变化，
   * 比如hasChanged(state,'value.aa')
   */
  hasChanged(
    target: IFormState | IFieldState | IVirtualFieldState,
    path: FormPathPattern
  ): boolean

  /*
   * 重置表单
   */
  reset(options?: {
    //强制清空
    forceClear?: boolean
    //强制校验
    validate?: boolean
    //重置范围，用于批量或者精确控制要重置的字段
    selector?: FormPathPattern
  }): Promise<void | IFormValidateResult>

  /*
   * 校验表单, 当校验失败时抛出异常
   */
  validate(
    path?: FormPathPattern,
    options?: {
      //是否悲观校验，如果当前字段遇到第一个校验错误则停止后续校验流程
      first?: boolean
    }
  ): Promise<IFormValidateResult>

  /*
   * 设置表单状态
   */
  setFormState(
    //操作回调
    callback?: (state: IFormState) => any,
    //是否不触发事件
    silent?: boolean
  ): void

  /*
   * 获取表单状态
   */
  getFormState(
    //transformer
    callback?: (state: IFormState) => any
  ): any

  /*
   * 设置字段状态
   */
  setFieldState(
    //字段路径
    path: FormPathPattern,
    //操作回调
    callback?: (state: IFieldState) => void,
    //是否不触发事件
    silent?: boolean
  ): void

  /*
   * 获取字段状态
   */
  getFieldState(
    //字段路径
    path: FormPathPattern,
    //transformer
    callback?: (state: IFieldState) => any
  ): any

  /*
   * 注册字段
   */
  registerField(props: {
    //节点路径
    path?: FormPathPattern
    //数据路径
    name?: string
    //字段值
    value?: any
    //字段多参值
    values?: any[]
    //字段初始值
    initialValue?: any
    //数据与样式是否可见
    visible?: boolean
    //样式是否可见
    display?: boolean
    //字段扩展属性
    props?: any
    //字段校验规则
    rules?: ValidatePatternRules[]
    //字段是否必填
    required?: boolean
    //字段是否可编辑
    editable?: boolean
    //字段是否走脏检查
    useDirty?: boolean
    //字段状态计算容器，主要用于扩展核心联动规则
    computeState?: (draft: IFieldState, prevState: IFieldState) => void
  }): IField

  /*
   * 注册虚拟字段
   */
  registerVirtualField(props: {
    //节点路径
    path?: FormPathPattern
    //数据路径
    name?: string
    //字段扩展属性
    props?: any
    //字段是否走脏检查
    useDirty?: boolean
    //字段状态计算容器，主要用于扩展核心联动规则
    computeState?: (draft: IFieldState, prevState: IFieldState) => void
  }): IVirtualField

  /*
   * 创建字段数据操作器，后面会详细解释返回的API
   */
  createMutators(field: IField | FormPathPattern): IMutators

  /*
   * 获取表单观察者树
   */
  getFormGraph(): IFormGraph

  /*
   * 设置表单观察者树
   */
  setFormGraph(graph: IFormGraph): void

  /*
   * 监听表单生命周期
   */
  subscribe(
    callback?: ({ type, payload }: { type: string; payload: any }) => void
  ): number

  /*
   * 取消监听表单生命周期
   */
  unsubscribe(id: number): void

  /*
   * 触发表单自定义生命周期
   */
  notify: <T>(type: string, payload?: T) => void

  /*
   * 设置字段值
   */
  setFieldValue(path?: FormPathPattern, value?: any): void

  /*
   * 获取字段值
   */
  getFieldValue(path?: FormPathPattern): any

  /*
   * 设置字段初始值
   */
  setFieldInitialValue(path?: FormPathPattern, value?: any): void

  /*
   * 获取字段初始值
   */
  getFieldInitialValue(path?: FormPathPattern): any
}
```

#### IMutators

> 通过 createMutators 创建出来的实例 API，主要用于操作字段数据

```typescript
interface IMutators {
  //改变字段值，多参情况，会将所有参数存在values中
  change(...values: any[]): any
  //获取焦点，触发active状态改变
  focus(): void
  //失去焦点，触发active/visited状态改变
  blur(): void
  //触发当前字段校验器
  validate(): Promise<IFormValidateResult>
  //当前字段的值是否在Form的values属性中存在
  exist(index?: number | string): boolean

  /**数组操作方法**/

  //追加数据
  push(value?: any): any[]
  //弹出尾部数据
  pop(): any[]
  //插入数据
  insert(index: number, value: any): any[]
  //删除数据
  remove(index: number | string): any
  //头部插入
  unshift(value: any): any[]
  //头部弹出
  shift(): any[]
  //移动元素
  move($from: number, $to: number): any[]
  //下移
  moveDown(index: number): any[]
  //上移
  moveUp(index: number): any[]
}
```

#### Validation

> 这里主要列举校验相关的中间类型签名

```typescript
type CustomValidator = (
  value: any,
  description?: ValidateDescription
) => ValidateResponse
type SyncValidateResponse =
  | null
  | string
  | boolean
  | {
      type?: 'error' | 'warning'
      message: string
    }
type AsyncValidateResponse = Promise<SyncValidateResponse>
type ValidateResponse = SyncValidateResponse | AsyncValidateResponse

interface IFormValidateResult {
  errors: Array<{
    path: string
    messages: string[]
  }>
  warnings: Array<{
    path: string
    messages: string[]
  }>
}

type InternalFormats =
  | 'url'
  | 'email'
  | 'ipv6'
  | 'ipv4'
  | 'idcard'
  | 'taodomain'
  | 'qq'
  | 'phone'
  | 'money'
  | 'zh'
  | 'date'
  | 'zip'
  | string

interface ValidateDescription {
  //正则规则类型
  format?: InternalFormats
  //自定义校验规则
  validator?: CustomValidator
  //是否必填
  required?: boolean
  //自定以正则
  pattern?: RegExp | string
  //最大长度规则
  max?: number
  //最大数值规则
  maximum?: number
  //封顶数值规则
  exclusiveMaximum?: number
  //封底数值规则
  exclusiveMinimum?: number
  //最小数值规则
  minimum?: number
  //最小长度规则
  min?: number
  //长度规则
  len?: number
  //是否校验空白符
  whitespace?: boolean
  //枚举校验规则
  enum?: any[]
  //自定义错误文案
  message?: string
  //自定义校验规则
  [key: string]: any
}
```

#### IFormState

> Form 核心状态

```typescript
interface IFormState<FormProps = any> {
  /**只读属性**/

  //是否处于原始态，只有values===initialValues时，pristine为true
  pristine: boolean
  //是否合法，只要errors长度大于0的时候valid为false
  valid: boolean
  //是否非法，只要errors长度大于0的时候valid为true
  invalid: boolean
  //是否处于校验态，只有在调用validate API的时候才会被设置
  validating: boolean
  //是否处于提交态，只有在调用submit API的时候才会被设置
  submitting: boolean
  //错误消息了列表
  errors: string[]
  //告警消息列表
  warnings: string[]

  /**可写属性**/

  //是否处于加载态，可写状态，只要validating为true时，该状态也会为true，为false时同理
  loading: boolean
  //是否处于初始态
  initialized: boolean
  //是否可编辑
  editable: boolean | ((name: string) => boolean)
  //表单值
  values: {}
  //表单初始值
  initialValues: {}
  //表单挂载，前面讲到的生命周期钩子，是必须通过设置该状态来触发的，默认不会触发
  mounted: boolean
  //表单卸载，前面讲到的生命周期钩子，是必须通过设置该状态来触发的，默认不会触发
  unmounted: boolean
  //表单扩展属性
  props: FormProps
}
```

#### IFieldState

> 核心 Field 状态

```typescript
interface IFieldState<FieldProps = any> {
  /**只读属性**/

  //状态名称，FieldState
  displayName?: string
  //数据路径
  name: string
  //节点路径
  path: string
  //是否已经初始化
  initialized: boolean
  //是否处于原始态，只有value===intialValues时的时候该状态为true
  pristine: boolean
  //是否处于合法态，只要errors长度大于0的时候valid为false
  valid: boolean
  //是否处于非法态，只要errors长度大于0的时候valid为true
  invalid: boolean
  //是否处于校验态
  validating: boolean
  //是否被修改，如果值发生变化，该属性为true，同时在整个字段的生命周期内都会为true
  modified: boolean
  //是否被触碰
  touched: boolean
  //是否被激活，字段触发onFocus事件的时候，它会被触发为true，触发onBlur时，为false
  active: boolean
  //是否访问过，字段触发onBlur事件的时候，它会被触发为true
  visited: boolean

  /**可写属性**/

  //是否可见，注意：该状态如果为false，那么字段的值不会被提交，同时UI不会显示
  visible: boolean
  //是否展示，注意：该状态如果为false，那么字段的值会提交，UI不会展示，类似于表单隐藏域
  display: boolean
  //是否可编辑
  editable: boolean
  //是否处于loading状态，注意：如果字段处于异步校验时，loading为true
  loading: boolean
  //字段多参值，比如字段onChange触发时，给事件回调传了多参数据，那么这里会存储所有参数的值
  values: any[]
  //字段错误消息
  errors: string[]
  //字段告警消息
  warnings: string[]
  //字段值，与values[0]是恒定相等
  value: any
  //初始值
  initialValue: any
  //校验规则，具体类型描述参考后面文档
  rules: ValidatePatternRules[]
  //是否必填
  required: boolean
  //是否挂载
  mounted: boolean
  //是否卸载
  unmounted: boolean
  //字段扩展属性
  props: FieldProps
}
```

#### IVirtualFieldState

> 虚拟 Field 核心状态

```typescript
interface IVirtualFieldState<FieldProps = any> {
  /**只读状态**/

  //状态名称，VirtualFieldState
  displayName: string
  //字段数据路径
  name: string
  //字段节点路径
  path: string
  //是否已经初始化
  initialized: boolean

  /**可写状态**/

  //是否可见，注意：该状态如果为false，UI不会显示，数据也不会提交(因为它是VirtualField)
  visible: boolean
  //是否展示，注意：该状态如果为false，UI不会显示，数据也不会提交(因为它是VirtualField)
  display: boolean
  //是否已挂载
  mounted: boolean
  //是否已卸载
  unmounted: boolean
  //字段扩展属性
  props: FieldProps
}
```

#### IField/IVirtualField

> 通过 registerField/registerVirtualField 创建出来的实例 API

```typescript
interface IField/IVirtualField {
  //批量更新容器
  batch: (callback?: () => void) => void
  //获取状态
  getState: (callback?: (state: IFieldState) => any) => any
  //设置状态
  setState: (callback?: (state: IFieldState | Draft<IFieldState>) => void, silent?: boolean) => void
  //获取源状态
  getSourceState: (callback?: (state: IFieldState) => any) => any
  //设置源状态
  setSourceState: (callback?: (state: IFieldState) => void) => void
  //获取状态变化情况
  hasChanged: (key?: string) => boolean
  //获取状态脏
  isDirty: (key?: string) => boolean
  //获取状态脏信息
  getDirtyInfo: () => StateDirtyMap<IFieldState>
}
```
