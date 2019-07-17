# createFormActions

## 介绍

声明表单 Actions，用于跨组件通讯，使用该方法创建的所有 actions 都存在调用时机限制，要求 Form 初始化完成之后才能调用，所以只能用在异步事件里调用

## 类型描述

```typescript
interface FormActions {
    //设置表单字段状态，目前支持设置fieldState的所有属性
    setFieldState: (
      name: Path | IFormPathMatcher,
      callback: (fieldState: IFieldState) => void
    ) => Promise<void>
    //获取表单字段状态,callback为可选参数
    getFieldState: (name: Path | IFormPathMatcher, callback: (fieldState: IFieldState) => void) => void
    getFieldState: (name: Path | IFormPathMatcher) => IFieldState
    //设置表单状态，目前只支持设置formState.values
    setFormState: (callback: (fieldState: IFormState) => void) => Promise<void>
    //获取表单状态
    getFormState: (callback: (fieldState: IFormState) => void) => void
    getFormState: () => IFormState
    //获取表单Schema
    getSchema: (path: Path) => ISchema
    //重置表单
    reset: (forceClear?: boolean | { forceClear?: boolean; validate?: boolean },validate : boolean = true) => void
    //提交表单
    submit: () => Promise<IFormState>
    //校验表单
    validate: () => Promise<IFormState>
    //获取表单Schema
    dispatch: <T = any>(type: string, payload: T) => void
}

type createFormActions: () => FormActions
```

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

## 依赖

```javascript
import { createFormActions } from '@uform/react'
```

## 用例

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import SchemaForm, {
  Field,
  registerFormField,
  connect,
  createFormActions
} from '@uform/react'

registerFormField(
  'string',
  connect()(props => <input {...props} value={props.value || ''} />)
)

registerFormField('text', connect()(props => <div>{props.value || ''}</div>))

const actions = createFormActions()

ReactDOM.render(
  <div>
    <SchemaForm
      actions={actions}
      effects={$ => {
        $('onFieldChange', 'aa').subscribe(({ value }) => {
          actions.setFieldState('bb', state => {
            state.value = value
          })
        })
      }}
      onSubmit={() => alert('submited')}
    >
      <Field name="aa" type="string" />
      <Field name="bb" type="text" />
    </SchemaForm>
    <button
      onClick={() => {
        actions.submit()
      }}
    >
      提交表单
    </button>
  </div>,
  document.getElementById('root')
)
```
