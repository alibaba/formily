# createForm

## 介绍

创建一个 Form 实例，它负责管理整个表单的数据状态与校验状态。

## 类型描述

```typescript

type createForm = (options: IFormOptions) => Form

interface IFormOptions = {
  editable        : Editable
  effects         : Effects
  values?         : any
  initialValues?  : any
  schema          : ISchema
  subscribes      : { [eventName: string]: Observable<any> }
  onFormChange    : (payload: IFormPayload) => void
  onFieldChange   : (payload: IFieldPayload) => void
  onValidateFailed: (fieldErrors: IFieldError[]) => void
  onFormWillInit? : (form: any) => void
  onReset         : (payload: IFormPayload) => void
  onSubmit        : (values: any) => Promise<any> | void
}
type Editable = boolean | ((name: string) => boolean)

type Form = {
  editable: Editable
  changeValues(values: any): void;
  changeEditable(editable: Editable): void;

  getFieldState(name: Path | IFormPathMatcher, callback: (fieldState: IFieldState) => void) => void
  getFieldState(name: Path | IFormPathMatcher) => IFieldState
  setFieldState: (
    name: Path | IFormPathMatcher,
    callback: (fieldState: IFieldState) => void
  ) => Promise<void>

  getFormState: (callback: (fieldState: IFormState) => void) => void
  getFormState: () => IFormState
  setFormState: (callback: (fieldState: IFormState) => void) => Promise<void>

  registerField(name: string, options: {
    path: Path,
    props: any,
    onChange: (fieldState:IFieldState) => void
  }): IField;
  setIn(name: string, value: any): void;
  setInitialValueIn(name: string, value: any): void;
  setValue(name: string, value: any): void;
  setErrors(name: string, errors: string[] | string, ...args: string[]): void;
  updateChildrenValue(parent: IField): void;
  updateChildrenInitalValue(parent: IField): void;
  updateFieldInitialValue(): Promise<any>;
  updateFieldsValue(validate?: boolean): Promise<any>;
  updateChildrenVisible(parent: IField, visible?: boolean): void;
  getInitialValue(name: string, path?: Path): any;
  getValue(name?: string, copy?: boolean): any;
  deleteIn(name: string): void;
  deleteInitialValues(name: string): void;
  reset(forceClear?: boolean,validate : boolean = true): void;
  publishState(): IFormState;
  formNotify(fieldState?: IFieldState): IFormState;
  validate(): Promise<IFormState>;
  submit(): Promise<IFormState>;
  subscribe(callback: (payload: {
    formState: IFormState,
    fieldState: IFieldState
  }) => void): () => void;
  destructor(): void;
  dispatchEffect: (eventName: string, ...args: any[]) => void;
  syncUpdate(fn: () => void): void;
  initialize(values?: any): void;
}

interface IFormPayload {
  formState: IFormState
}

interface IFieldPayload {
  fieldState: IFieldState
  formState : IFormState
}

type Effects = (selector: Selector, actions: FormActions | AsyncFormActions) => void
type Selector = <T = any>(eventName: string, formPathPattern: string | IFormPathMatcher) => Observable<T>
```

## 依赖

```javascript
import { createForm } from '@uform/core'
```

## API

| 属性名称         | 属性描述                                                                                   | 属性类型                                   | 默认值 |
| ---------------- | ------------------------------------------------------------------------------------------ | ------------------------------------------ | ------ |
| effects          | 副作用处理函数                                                                             | `Effects`                                  |        |
| initialValues    | 初始值                                                                                     | `any`                                      |        |
| values           | 表单数据                                                                                   | `any`                                      |        |  |
| schema           | json schema 对象，用于搜索 json schema 中的 default 属性值，同时 merge 至 initialValues 中 | `ISchema`                                  |        |
| subscribes       | 观察者对象                                                                                 | `{ [eventName: string]: Observable<any> }` |        |
| onFieldChange    | FieldChange 事件处理器                                                                     | `(payload: IFieldPayload) => void`         |        |
| onFormChange     | FormChange 事件处理器                                                                      | `(payload: IFormPayload) => void`          |        |
| onReset          | Reset 事件处理器                                                                           | `(payload: IFormPayload) => void`          |        |
| onSubmit         | Submit 事件处理器                                                                          | `(values: any) => Promise<any> | void`     |        |
| onValidateFailed | Validate 校验失败事件处理器                                                                | `(fieldErrors: IFieldError[]) => void`     |        |

## formState

用于描述整个表单状态的模型对象

```typescript
interface IFormState<V> {
  values: V // 表单数据
  initialValues: V // 初始化数据
  valid: boolean // 是否合法
  invalid: boolean // 是否不合法
  errors: { name: string; errors: string[] }[] // 错误提示集合
  pristine: boolean // 是否是原始态
  dirty: boolean // 是否存在变化
}
```

## fieldState

用于描述表单字段状态的模型对象

```typescript
interface IFieldState<V = any>{
  value       : V                   //字段值
  valid       : boolean             //字段是否合法
  invalid     : boolean             //字段是否非法
  visible     : boolean             //字段显示状态
  display     : boolean             //字段UI展示状态，与visible的差别是，visible会删值，display不会删值
  editable    : boolean             //字段是否可编辑
  loading     : boolean             //字段加载状态
  errors      : string[]            //字段错误消息集合
  pristine    : boolean             //字段是否处于原始态
  initialValue: V                   //字段初始值
  name        : string              //字段路径
  path        : string[]            //字段路径，数组形式
  props       : ISchema             //字段附加属性
  rules       : IRuleDescription[]  //字段校验规则
}
```

## 用例

```javascript
const form = createForm({
  initialValues: {
    aa: 123,
    bb: 222
  },
  onSubmit: ({ formState }) => {
    console.log(formState)
  },
  onFieldChange: ({ formState }) => {
    console.log(formState)
  }
})

form.registerField('aa', {
  onChange(fieldState) {
    console.log(fieldState)
  }
})

setTimeout(() => {
  form.setValue('aa', 456)
  setTimeout(() => {
    form.submit()
  }, 1000)
}, 500)
```
