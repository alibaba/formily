# SchemaForm

## 介绍

@uform/react 的核心组件，用于构建表单

## 依赖

```javascript
import {SchemaForm} from '@uform/react'

or 

import SchemaForm from '@uform/react'
```

## API

| 属性名称 | 属性描述 | 属性类型 | 默认值 |
| ---- | ---- | ---- | --- |
| actions | 需要握手的表单actions，只接收通过[createFormActions](#/97UlUl/XEFAF7HoHV)/[createAsyncFormActions](#/97UlUl/leFLFGHMHK)创建出来的actions | `FormActions|AsyncFormActions` |  |
| defaultValue | 表单默认值 | `any` |  |
| value | 表单值 | `any` | |
| editable | 控制表单字段是否可编辑状态 | `boolean|(name: string) => boolean` |  |
| effects | 副作用处理函数 | `Effects` |  |
| initialValues | 表单值，受控态使用 | `any` | {} |
| locale | 表单国际化文案 | `Locale` | {} |
| schema | 表单json schema，具体参考 [扩展规范](#/MpI2Ij/DVSLSafN) | `ISchema` | {type:"object",properties:{}} |
| onChange | 表单变化事件回调 | `(values: any) => void` |  |
| onReset | 表单重置事件回调 | `(values: any) => void` |  |
| onSubmit | 表单提交事件回调 | `(values: any) => void` |  |
| onValidateFailed | 表单校验失败事件回调 | `(fieldErrors: IFieldError[]) => void` |  |

## 副作用处理

> 表单副作用，也就是由表单字段的内部事件所产生的联动，校验，异步逻辑，如何更好的管理和维护副作用逻辑，恰好就是rxjs的最大优势，所以，我们采用了rxjs来管理副作用逻辑

前面API介绍中有讲到effects，这个effects是一个回调函数，它也是一个非常强大的回调函数，它接收了一个selector函数作为参数，我们可以用selector来选择表单内的任意一个字段，对其做状态修改，即便存在异步逻辑，也是可以很方便的在各种异步环境下对字段的状态做修改，所以，我们的表单联动，是不限于时空的。下面可以看一个简单的例子：

```jsx
import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import SchemaForm, {
  registerFormField,
  Field,  
  connect,
  createFormActions
} from '@uform/react'

const actions = createFormActions()

registerFormField(
  'string',
  connect()(props => <input {...props} value={props.value || ''} />)
)


ReactDOM.render(
    <SchemaForm actions={actions} effects={($)=>{
       $('onFieldChange','aa').subscribe((fieldState)=>{
         actions.setFieldState('bb',state=>{
           state.value = fieldState.value
         })
       })
    }}>
       <Field type="string" name="aa"/>
       <Field type="string" name="bb"/>
    </SchemaForm>,
    document.getElementById('root')
)
```

上面的例子是实现aa在值改变的时候将bb的值设置为aa的值。

## 副作用事件

> 在上面的例子中使用到了事件选择器，事件源主要是以下几种类型

```javascript
<SchemaForm
    effects={($)=>{
       $("onFieldChange").subscribe((fieldState)=>{})
       $("onFormInit").subscribe((formState)=>{})
       $("onFormMount").subscribe((formState)=>{})
       $("onFormReset").subscribe((formState)=>{})
       $("onFormSubmit").subscribe((formState)=>{})
       $("onXXX").subscribe((xxx)=>{}) //自定义事件，主要通过dispatch函数来触发，后面都会提到哪里可以使用dispatch，比如Field组件的x-effect属性，FormConsumer里，IFieldProps里
    }}
/>
```

## 用例

```javascript
import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import SchemaForm, {
  registerFormField,
  Field,  
  connect
} from '@uform/react'

registerFormField(
  'string',
  connect()(props => <input {...props} value={props.value || ''} />)
)

ReactDOM.render(
   <SchemaForm defaultValue={{aa:'123'}} onSubmit={values=>console.log(values)}>
     <Field name="aa" type="string"/>
     <button htmlType="submit">提交</button>
   </SchemaForm>
,document.getElementById('root'))
```
