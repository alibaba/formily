# registerFormFields

## 介绍

批量注册一个表单字段组件，主要用于扩展自定义控件，您的自定义控件只需要与正常的Input组件类似，接收value/onChange这样的受控控制即可完全接入uform.

> 注意：被接入的自定义组件的props就是Field组件的x-props。所以我们在使用自定义组件的时候，除了指定x-component，其余配置都可以通过x-props来控制


## 类型描述

```typescript
type registerFormField(
   [name: string]: React.ComponentType<IFieldProps> 
)
```

## 依赖

```javascript
import {registerFormFields} from '@uform/react'
```

## API

> 注册的组件将会接收以下属性列表

```typescript
interface IFieldProps<V = any> {
   name                : string //字段数据路径
   path                : Array<string> //字段数组数据路径
   value               : V //字段值
   errors              : Array<string> //字段错误消息集合
   editable            : boolean | ((name:string) => boolean) //字段是否可编辑
   locale              : Locale //国际化文案对象
   loading             : boolean //是否处于加载态
   schemaPath          : Array<string> //schema path,考虑到有些schema其实是不占数据路径的，所以这个路径是真实路径
   getSchema           : (path: string) => ISchema //根据路径获取schema
   renderField         : (childKey: string, reactKey: string | number) => JSX.Element | string | null //根据childKey渲染当前字段的子字段
   renderComponent     : React.FunctionComponent<Partial<IFieldProps> | undefined>,//渲染当前字段的组件，对于x-render来说，可以借助它快速实现渲染包装功能
   getOrderProperties  : () => Array<{schema: ISchema, key: number, path: string, name: string }>,//根据properties里字段的x-index值求出排序后的properties
   mutators            : Mutators,//数据操作对象
   schema              : ISchema
}

interface Mutators<V = any> {
   change: (value: V)=> void,//改变当前字段值
   dispatch: (name: string, payload : any) => void,//触发effect事件
   errors: (errors: string | Array<string>, ...formatValues: Array<string | number>) => void,//设置当前字段的错误消息
   push(value: V),//对当前字段的值做push操作
   pop(),//对当前字段的值做pop操作
   insert(index: number,value: V),//对当前字段的值做insert操作
   remove(name : string),//对当前字段的值做remove操作
   unshift(value : V),//对当前字段值做unshift操作
   shift(),//对当前字段值做shift操作
   move(fromIndex: number, toIndex: number)//对当前字段值做move操作
}
```

## 用例

```javascript
import {registerFormFields,connect} from '@uform/react'

registerFormFields({
  string:connect()(props => <input {...props} value={props.value || ''} />)
})
```
