# createForm


## 介绍

创建一个Form实例，它负责管理整个表单的数据状态与校验状态。



## 类型描述

```typescript
type createForm({
  initialValues : Object,
  subscribes : Object,
  schema : Object,
  effects : Function,
  onSubmit : Function,
  onReset : Function,
  onFormChange : Function,
  onFieldChange : Function,
  onValidateFailed : Function
})
```



## 依赖

```javascript
import {createForm} from '@alife/uform'
```



## API

| 属性名称         | 属性描述                                                     | 属性类型                                                  | 默认值 |
| ---------------- | ------------------------------------------------------------ | --------------------------------------------------------- | ------ |
| initialValues    | 初始值                                                       | Object                                                    |        |
| subscribes       | 观察者对象                                                   | `{[eventName:String]:Observable}`                         |        |
| schema           | json schema对象，用于搜索json schema中的default属性值，同时merge至initialValues中 | Object                                                    |        |
| effects          | 副作用处理函数                                               | `Function( selector : Function ){}`                       |        |
| onSubmit         | Submit事件处理器                                             | `Function({formState : Object}){}`                        |        |
| onReset          | Reset事件处理器                                              | `Function({formState : Object}){}`                        |        |
| onFormChange     | FormChange事件处理器                                         | `Function({ formState : Object }){}`                      |        |
| onFieldChange    | FieldChange事件处理器                                        | `Function({ formState : Object, fieldState : Object }){}` |        |
| onValidateFailed | Validate校验失败事件处理器                                   | `Function(errors : Array<String>){}`                      |        |



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

const aa = form.registerField('aa', {
  onChange(fieldState) {
    console.log(fieldState)
  }
})

setTimeout(() => {
  aa.changeValue(456)
  setTimeout(() => {
    form.submit()
  }, 1000)
}, 500)
```