# registerFormFields

## 介绍
批量注册一个表单字段组件

## 类型描述

```typescript
type registerFormField(
   [name : String] : Function 
)
```

## 依赖

```javascript
import {registerFormFields} from '@uform/react'
```


## API
> 注册的组件将会接收以下属性列表


```typescript
type FieldRenderProps {
   name                : String,//字段数据路径
   path                : Array<String>,//字段数组数据路径
   value               : any,//字段值
   errors              : Array<String>,//字段错误消息集合
   editable            : Boolean | Function,//字段是否可编辑
   locale              : Object,//国际化文案对象
   loading             : Boolean,//是否处于加载态
   schemaPath          : Array<String>,//schema path,考虑到有些schema其实是不占数据路径的，所以这个路径是真实路径
   getSchema(path) : Object, //根据路径获取schema
   renderField(childKey : String,reactKey : String | Number) : ReactElement,//根据childKey渲染当前字段的子字段
   renderComponent(props : Object) : ReactElement,//渲染当前字段的组件，对于x-render来说，可以借助它快速实现渲染包装功能
   getOrderProperties() : Array<Object>,//根据properties里字段的x-index值求出排序后的properties
   mutators            : Mutators,//数据操作对象
   schema              : Object   
}

type Mutators {
   change(value : any),//改变当前字段值
   dispatch(name : String,payload : any),//触发effect事件
   errors(errors : String | Array<String>,[...formatValue : String | Number]),//设置当前字段的错误消息
   push(value : any),//对当前字段的值做push操作
   pop(),//对当前字段的值做pop操作
   insert(index : Number,value : any),//对当前字段的值做insert操作
   remove(name : any),//对当前字段的值做remove操作
   unshift(value : any),//对当前字段值做unshift操作
   shift(),//对当前字段值做shift操作
   move(fromIndex : Number, toIndex : Number)//对当前字段值做move操作
}
```

## 用例

```javascript
import {registerFormFields,connect} from '@uform/react'

registerFormFields({
  string:connect()(props => <input {...props} value={props.value || ''} />)
})
```
