# @uform/core
> 表单状态核心管理包(不依赖任何第三方UI框架)，在该包中，它主要做了：
>
> - 管理Form状态
> - 管理Field状态
> - 管理Validator状态
> - 管理Form/Field/Vaidator之间的依赖关系

### 背景

中后台领域，核心就是两种场景，**一个是数据录入，一个是数据查询+数据展现**，不管是数据录入还是数据查询，都是借助表单来实现，只有数据展现的形式是比较多样化的，但是却是最容易复用和抽象的，只有表单，会涉及大量的交互逻辑，所以，只要我们根本上解决了表单问题，对于中后台场景，基本上解决了大部分中后台场景问题，UForm，就是为此而诞生的。

### 设计理念

**Anything comes from Observable Grpah.**

### 核心亮点

- 时间旅行，借助首创Observable Graph，可以记录任意时刻的全量状态，也可以将状态回滚至任意时刻，这样的能力在，重事务型应用与本地调试上可以发挥出最大价值
- 高效更新，精确渲染，无需整树渲染
- 内置immer.js，智能降级，无需关心浏览器兼容性
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



### 快速上手







### API

---

#### `createForm`

> 创建一个Form实例

**签名**

```typescript
createForm(options?: IFormCreatorOptions): IForm
```

**用法**

```jsx
import { createForm } from '@uform/core'

const form = createForm({
  values:{},
  initialValues:{},
  onChange:(values)=>{
    console.log(values)
  }
})

const aa = form.registerField({
  path:"aa"
})

aa.setState(state=>{
  state.value = 123
})
console.log(form.getFormState(state=>state.values)) //{aa:123}
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

```jsx
import { createForm,registerValidationFormats } from '@uform/core'

registerValidationFormats({
  number: /^[+-]?\d+(\.\d+)?$/
})

const form = createForm({
  values:{},
  initialValues:{},
  onChange:(values)=>{
    console.log(values)
  }
})

const aa = form.registerField({
  path:"aa",
  rules:[{
    format:"number",
    message:'This field is not a number.'
  }]
})

aa.setState(state=>{
  state.value = 'hello world'
})
form.validate()

console.log(form.getFormState(state=>state.errors)) 
/**
[{ 
    path: 'aa',
    messages: [ 'This field does not match any pattern' ] 
}]
**/
```



#### `registerValidationRules`

> 注册校验规则集，与注册formats的差别是，它可以注册复杂校验规则，但是formats只是正则表达式

**签名**

```typescript
registerValidationRules(
  rules:{
     [ruleName:string]:(value:any,rule:ValidateDescription)=>boolean
  }
) : void
```

**用法**

```jsx
import { createForm,registerValidationRules } from '@uform/core'

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

console.log(form.getFormState(state =>state.errors))
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
import { createForm,registerValidationMTEngine } from '@uform/core'

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
import { setValidationLanguage } from '@uform/core'

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
import { setValidationLocale } from '@uform/core'

setValidationLocale({
  'en-US':{
    required:"This field is required."
  }
})
```



#### `new FormPath()`

> 表单路径引擎，核心负责路径解析，匹配，求值，取值，解构求值，解构取值

具体文档参考：https://github.com/janrywang/cool-path

#### `new FormLifeCyle()`

> 创建一个生命周期监听器

**签名**

```typescript

```



**用法**



### 特殊概念

**VirtualField** 是一个特殊的Field数据结构，它与Field的差异就是，它不管理value，也就是说，它与Form的value是没有关联性的，通常我们使用它，更多的是作为代理一个UI容器的状态，比如：UForm中的布局组件FormBlock，它会在整个Form Grpah中作为一个独立节点而存在，但是这个节点类型就是一个VirtualField，但是最终数据提交的时候，FormBlock并不会污染提交数据的数据结构。



### Enums

---

#### LifeCycleTypes

```typescript
enum LifeCycleTypes {
  /**
   * Form LifeCycle
   **/

  ON_FORM_WILL_INIT = 'onFormWillInit',
  ON_FORM_INIT = 'onFormInit',
  ON_FORM_CHANGE = 'onFormChange',
  ON_FORM_MOUNT = 'onFormMount',
  ON_FORM_UNMOUNT = 'onFormUnmount',
  ON_FORM_SUBMIT = 'onFormSubmit',
  ON_FORM_RESET = 'onFormReset',
  ON_FORM_SUBMIT_START = 'onFormSubmitStart',
  ON_FORM_SUBMIT_END = 'onFormSubmitEnd',
  ON_FORM_VALUES_CHANGE = 'onFormValuesChange',
  ON_FORM_INITIAL_VALUES_CHANGE = 'onFormInitialValuesChange',
  ON_FORM_VALIDATE_START = 'onFormValidateStart',
  ON_FORM_VALIDATE_END = 'onFormValidateEnd',
  ON_FORM_INPUT_CHANGE = 'onFormInputChange',
  /**
   * FormGraph LifeCycle
   **/
  ON_FORM_GRAPH_CHANGE = 'onFormGraphChange',

  /**
   * Field LifeCycle
   **/

  ON_FIELD_WILL_INIT = 'onFieldWillInit',
  ON_FIELD_INIT = 'onFieldInit',
  ON_FIELD_CHANGE = 'onFieldChange',
  ON_FIELD_INPUT_CHANGE = 'onFieldInputChange',
  ON_FIELD_VALUE_CHANGE = 'onFieldValueChange',
  ON_FIELD_INITIAL_VALUE_CHANGE = 'onFieldInitialValueChange',
  ON_FIELD_MOUNT = 'onFieldMount',
  ON_FIELD_UNMOUNT = 'onFieldUnmount'
}
```



### Interfaces

---

#### IFormCreatorOptions

> createForm参数对象协议

```typescript
interface IFormCreatorOptions {
  initialValues?: {}
  values?: {}
  listeners?: FormLifeCycleListener[]
  editable?: boolean | ((name: string) => boolean)
  useDirty?: boolean
  validateFirst?: boolean
  editable?: boolean
  onChange?: (values: IFormState['values']) => void
  onSubmit?: (values: IFormState['values']) => any | Promise<any>
  onReset?: () => void
  onValidateFailed?: (validated: IFormValidateResult) => void
}
```



#### IFormState

> Form核心状态

```typescript
interface IFormState<FormProps = any> {
  pristine: boolean
  valid: boolean
  invalid: boolean
  loading: boolean
  validating: boolean
  submitting: boolean
  initialized: boolean
  editable: boolean | ((name: string) => boolean)
  errors: string[]
  warnings: string[]
  values: {}
  initialValues: {}
  mounted: boolean
  unmounted: boolean
  props: FormProps
}
```



#### IFieldState

> 核心Field状态

```typescript
interface IFieldState<FieldProps = any> {
  displayName?: string
  name: string
  path: string
  initialized: boolean
  pristine: boolean
  valid: boolean
  touched: boolean
  invalid: boolean
  visible: boolean
  display: boolean
  editable: boolean
  selfEditable: boolean
  formEditable: boolean | ((name: string) => boolean)
  loading: boolean
  modified: boolean
  active: boolean
  visited: boolean
  validating: boolean
  values: any[]
  errors: string[]
  effectErrors: string[]
  ruleErrors: string[]
  warnings: string[]
  effectWarnings: string[]
  ruleWarnings: string[]
  value: any
  initialValue: any
  rules: ValidatePatternRules[]
  required: boolean
  mounted: boolean
  unmounted: boolean
  props: FieldProps
}
```



#### IVirtualFieldState

> 虚拟Field核心状态

```typescript
interface IVirtualFieldState<FieldProps = any> {
  name: string
  path: string
  displayName?: string
  initialized: boolean
  visible: boolean
  display: boolean
  mounted: boolean
  unmounted: boolean
  props: FieldProps
}
```



#### IForm

> 通过createForm创建出来的Form实例对象API

```typescript
interface IForm {
  submit(
    onSubmit?: (values: IFormState['values']) => any | Promise<any>
  ): Promise<IFormSubmitResult>
  clearErrors: (pattern?: FormPathPattern) => void
  hasChanged(target: any, path: FormPathPattern): boolean
  reset(options?: IFormResetOptions): Promise<void | IFormValidateResult>
  validate(path?: FormPathPattern, options?: {}): Promise<IFormValidateResult>
  setFormState(callback?: (state: IFormState) => any, silent?: boolean): void
  getFormState(callback?: (state: IFormState) => any): any
  setFieldState(
    path: FormPathPattern,
    callback?: (state: IFieldState) => void,
    silent?: boolean
  ): void
  getFieldState(
    path: FormPathPattern,
    callback?: (state: IFieldState) => any
  ): any
  registerField(props: IFieldStateProps): IField
  registerVirtualField(props: IVirtualFieldStateProps): IVirtualField
  createMutators(field: IField): IMutators
  getFormGraph(): IFormGraph
  setFormGraph(graph: IFormGraph): void
  subscribe(callback?: Formlistenersubscriber): number
  unsubscribe(id: number): void
  notify: <T>(type: string, payload?: T) => void
  setFieldValue(path?: FormPathPattern, value?: any): void
  getFieldValue(path?: FormPathPattern): any
  setFieldInitialValue(path?: FormPathPattern, value?: any): void
  getFieldInitialValue(path?: FormPathPattern): any
}
```



#### IField/IVirtualField

> 通过registerField/registerVirtualField创建出来的实例API

```typescript
interface IField/IVirtualField {
  batch: (callback?: () => void) => void
  getState: (callback?: (state: IFieldState) => any) => any
  setState: (callback?: (state: IFieldState | Draft<IFieldState>) => void, silent?: boolean) => void
  unsafe_getSourceState: (callback?: (state: IFieldState) => any) => any
  unsafe_setSourceState: (callback?: (state: IFieldState) => void) => void
  hasChanged: (key?: string) => boolean
  isDirty: (key?: string) => boolean
  getDirtyInfo: () => StateDirtyMap<IFieldState>
}
```



#### Imutators

> 通过createMutators创建出来的实例API

```typescript
interface IMutators {
  change(...values: any[]): any
  focus(): void
  blur(): void
  push(value?: any): any[]
  pop(): any[]
  insert(index: number, value: any): any[]
  remove(index: number | string): any
  unshift(value: any): any[]
  shift(): any[]
  move($from: number, $to: number): any
  moveDown(index: number): any
  moveUp(index: number): any
  validate(): Promise<IFormValidateResult>
  exist(index?: number | string): boolean
}
```



#### ValidateDescription

```typescript
type CustomValidator = (value: any, rescription?: ValidateDescription) => ValidateResponse
type SyncValidateResponse = null | string | boolean | {
    type?: 'error' | 'warning';
    message: string;
};
type AsyncValidateResponse = Promise<SyncValidateResponse>
type ValidateResponse = SyncValidateResponse | AsyncValidateResponse;

interface ValidateDescription {
    format?: string;
    validator?: CustomValidator;
    required?: boolean;
    pattern?: RegExp | string;
    max?: number;
    maximum?: number;
    exclusiveMaximum?: number;
    exclusiveMinimum?: number;
    minimum?: number;
    min?: number;
    len?: number;
    whitespace?: boolean;
    enum?: any[];
    message?: string;
    [key: string]: any;
}
```

