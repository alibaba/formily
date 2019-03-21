# connect

## 介绍
包装字段组件，让字段组件只需要支持value/defaultValue/onChange属性即可快速接入表单

## 类型描述

```typescript
type connect({
  valueName : String, //控制表单组件
  eventName : String, //事件名称
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
import {connect} from '@alife/rs-uform'
```


## 用例

```javascript
import {registerFormField,connect} from '@alife/rs-uform'

registerFormField(
  'string',
  connect()(props => <input {...props} value={props.value || ''} />)
)
```