# Field

## 介绍

@uform/react 的核心组件，用于描述表单字段

## 依赖

```javascript
import {Field} from '@uform/react'
```

## API

| 属性名称 | 属性描述 | 属性类型 | 默认值 |  |
| ---- | ---- | ---- | --- | --- |
| default | 默认值 | any |  |  |
| enum | 枚举值，配置该值在默认情况下会显示Select形态，指定x-component会显示对应的组件形态 | `Array< String | {label:String,value:any}>` | \[] |  |
| maxItems | 最大条目数，只有在type="array"时可以使用 | Number |  |  |
| minItems | 最小条目数，只有在type="array"时可以使用 | Number |  |  |
| name | 字段名称 | Object | {} |  |
| required | 字段是否必填 | Boolean | false |  |
| description | 字段描述，如果字符串字数超过30字或内容是ReactNode，会自动以pop形式展示 | String/React Node | '' |  |
| type | 字段类型，具体类型枚举参考 [fields](https://github.com/alibaba/uform/tree/master/packages/antd/src/fields) | String | "" |  |
| x-component | 字段UI组件，用于指定该字段应该用什么组件做渲染，具体类型枚举参考 [fields](https://github.com/alibaba/uform/tree/master/packages/antd/src/fields) | String | "" |  |
| x-effect | 副作用事件绑定对象 | `Function(dispatch : Function) : {    [eventName](...arguemtns)}` |  |  |
| x-index | 字段索引顺序 | Number |  |  |
| x-props | 字段UI组件属性，API请参考对应fusion next/ant design组件API | Object | {} |  |
| x-props.editable | 字段是否可编辑 | Boolean | true |  |
| x-render | 字段渲染函数 | `Function(fieldProps : FieldRenderProps){}` |  |  |
| x-rules | 字段校验规则 | `Object | Array<String | Object | Function> | String | Function` |  |  |

## x-rules详解

校验规则，在uform中有几种校验形态：

- 字符串正则校验，在x-rules中可以通过传字符串或者字符串数组来描述，下面是正则匹配模式

  - url 匹配url路径

  - email 匹配邮箱

  - ipv6 匹配ipv6格式

  - ipv4 匹配ipv4格式

  - number 匹配number格式

  - integer 匹配整型格式

  - qq 匹配qq格式

  - phone 匹配手机号码

  - idcard 匹配大陆身份证号码

  - taodomain 匹配淘系域名

  - money 匹配货币格式

  - zh 匹配中文字符串

  - date 匹配日期格式

  - zip 匹配邮编

- 自定义正则匹配，在x-rules中必须以对象或者数组对象的形式来描述，比如`{pattern:/\d+/,message:""该字段必须为数字}`

- 必填型校验，在x-rules中必须以对象或者数组对象的形式来描述，比如`{required:true,message:"该字段必填"}`,message是选填字段，因为默认错误提示文案里已经有了

- 自定义校验，在x-rules中可以通过传函数来描述，下面是该函数的类型描述

```typescript
interface IRuleDescription {
  required?: boolean
  message?: string,
  pattern?: RegExp | string,
  validator?: Validator,
  format?: DefaultPatternRule
}

type Validator = (value: any, rule: IRuleDescription, values: any, name: string) => string | Promise<string>

type DefaultPatternRule = 'url' | 'email' | 'ipv6' | 'ipv4' | 'number' | 'integer' | 'qq' | 'phone' | 'idcard' | 'taodomain' | 'money' | 'zh' | 'date' | 'zip'

type Rule = Validator | Array<Validator | IRuleDescription | DefaultPatternRule> | DefaultPatternRule | IRuleDescription

//该回调函数直接return错误文案字符串代表响应错误，如果返回Promise对象，
//代表是异步校验，resolve错误文案的时候代表错误响应，resolve为空的时候代表正确响应

```

## x-render详解

上面API List中可以看到x-render函数会接收FieldRenderProps类型的参数，下面是它的具体描述

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

## x-effect详解

x-effect属于一个非常高级的API，它是为了解决在某些场景，我们的数据联动不是基于字段的onChange事件来做的联动或者依赖onChange事件的其他参数来做的联动，它的解决方案是将dispatch函数给x-effect函数，然后让x-effect函数返回对应的事件处理器，然后再传递给具体的组件，比如：

```javascript
import {createFormActions} from '@uform/react'

const actions = createFormActions()

<SchemaForm effects={($)=>{
   $('selectOptions','aa')
    .subscribe(({payload:options})=>{
      actions.setFieldState('bb',state=>{
         state.props.enum = options.extra
      })
    })
 }}>
    <Field 
      type="string" 
      name="aa"
      enum={[
        {label:"111",value:"111",extra:["111","222","333"]},
        {label:"222",value:"222",extra:["111","222","333"]},
        {label:"333",value:"333",extra:["111","222","333"]}
      ]}
      x-effect={dispatch=>{
        return {
          onChange(value,options){
             dispatch("selectOptions",options)
          }
        }
      }}
    />
    <Field type="string" name="bb" enum={[]}/>
</SchemaForm>

这个例子很简单的实现了aa字段的下拉列表中的额外参数赋值到bb的枚举值中，实现了非常规onChange的值联动
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
