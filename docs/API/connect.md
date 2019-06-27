# connect

## 介绍

包装字段组件，让字段组件只需要支持value/defaultValue/onChange属性即可快速接入表单

## 类型描述

```typescript
type connect({
  valueName : String, //控制表单组件
  eventName : String, //事件名称
  getValueFromEvent(args: any[]): any //取值函数，有些场景我们的事件函数取值并不是事件回调的第一个参数，需要做进一步的定制
  getProps(outputProps : Object,fieldProps : FieldRenderProps) : Object //字段组件props transformer
  getComponent( //字段组件component transformer
    target : ReactComponent , 
    outputProps : Object,
    fieldProps : FieldRenderProps
  ) : ReactComponent
})(Target : ReactComponent)
```

## 依赖

```javascript
import {connect} from '@uform/react'
```

## 用例

```javascript
import {registerFormField,connect} from '@uform/react'

registerFormField(
  'string',
  connect()(props => <input {...props} value={props.value || ''} />)
)
```
