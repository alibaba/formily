# createFormActions

## 介绍

声明表单 Actions，用于跨组件通讯

## 类型描述

```typescript
type createFormActions() : {
    setFormState(callback : (state : formState)=>void) : Promise, //设置表单状态，目前只支持设置formState.values
    getFormState(callback : (state : formState)=>any)), //获取表单状态
    setFieldState(name : String,callback : (state : fieldState)=>void) : Promise, //设置表单字段状态，目前支持设置fieldState的所有属性
    getFieldState(name : String[,callback : (state : fieldState)=>any)]),//获取表单字段状态,callback为可选参数
    reset(),//重置表单
    submit(),//提交表单
    validate(),//校验表单
    getSchema(name : String) //获取表单Schema
}
```

## formState

用于描述整个表单状态的模型对象

```typescript
type formState {
    values            : Object, //表单数据
    valid             : Boolean, //是否合法
    invalid           : Boolean, //是否不合法
    errors            : Array<String>, //错误提示集合
    pristine          : Boolean, //是否是原始态
    dirty             : Boolean //是否存在变化
}
```

## fieldState

用于描述表单字段状态的模型对象

```typescript
type fieldState {
    value            : Any,//字段值
    valid            : Boolean,//字段是否合法
    invalid          : Boolean,//字段是否非法
    visible          : Boolean,//字段显示状态
    editable         : Boolean,//字段是否可编辑
    loading          : Boolean,//字段加载状态
    errors           : Array<String>,//字段错误消息集合
    pristine         : Boolean,//字段是否处于原始态
    initialValue     : Any,//字段初始值
    name             : String,//字段路径
    path,            : Array<String>//字段路径，数组形式
    props            : Object,//字段附加属性
    rules            : Array<Object | Function | String>//字段校验规则
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

registerFormField(
  'text',
  connect()(props => <div>{props.value || ''}</div>)
)

const actions = createFormActions()

ReactDOM.render(
  <div>
    <SchemaForm actions={actions} effects={($)=>{
      $('onFieldChange','aa').subscribe(({value})=>{
        actions.setFieldState('bb',state=>{
          state.value = value
        })
      })
    }} onSubmit={()=>alert('submited')}>
      <Field name="aa" type="string" />
      <Field name="bb" type="text"/>
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
