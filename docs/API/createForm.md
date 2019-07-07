# createForm

## 介绍

创建一个Form实例，它负责管理整个表单的数据状态与校验状态。

## 类型描述

```typescript



interface CreateForm = {
  editable        : boolean | ((name: string) => boolean)
  effects         : Effects
  defaultValue?   : any
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
import {createForm} from '@uform/core'
```

## API

| 属性名称         | 属性描述                                                                          | 属性类型                                                  | 默认值 |
| ---------------- | --------------------------------------------------------------------------------- | --------------------------------------------------------- | ------ |
| effects          | 副作用处理函数                                                                    | `Effects`                       |        |
| initialValues    | 初始值                                                                            | `any`                                                    |        |
| values | 表单数据 | `any`| | |
| schema           | json schema对象，用于搜索json schema中的default属性值，同时merge至initialValues中 | `ISchema`                                                    |        |
| subscribes       | 观察者对象                                                                        | `{ [eventName: string]: Observable<any> }`                         |        |
| onFieldChange    | FieldChange事件处理器                                                             | `(payload: IFieldPayload) => void` |        |
| onFormChange     | FormChange事件处理器                                                              | `(payload: IFormPayload) => void`                      |        |
| onReset          | Reset事件处理器                                                                   | `(payload: IFormPayload) => void`                        |        |
| onSubmit         | Submit事件处理器                                                                  | `(values: any) => Promise<any> | void`                        |        |
| onValidateFailed | Validate校验失败事件处理器                                                        | `(fieldErrors: IFieldError[]) => void`                      |        |

## formState

用于描述整个表单状态的模型对象

```typescript
interface IFormState<V> {
  values       : V                                     // 表单数据
  initialValues: V                                     // 初始化数据
  valid        : boolean                               // 是否合法
  invalid      : boolean                               // 是否不合法
  errors       : { name: string, errors: string[] }[]  // 错误提示集合
  pristine     : boolean                               // 是否是原始态
  dirty        : boolean                               // 是否存在变化
}
```

## fieldState

用于描述表单字段状态的模型对象

```typescript
interface IFieldState<V>{
  value       : V                   //字段值
  valid       : boolean             //字段是否合法
  invalid     : boolean             //字段是否非法
  visible     : boolean             //字段显示状态
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
  onSubmit: ({formState}) => {
    console.log(formState)
  },
  onFieldChange:({formState})=>{
    console.log(formState)
  }
})

form.registerField('aa', {
  onChange(fieldState) {
    console.log(fieldState)
  }
})

setTimeout(() => {
  form.setValue('aa', 456);
  setTimeout(() => {
    form.submit()
  }, 1000)
}, 500)
```
