# connect

## 介绍

包装字段组件，让字段组件只需要支持value/defaultValue/onChange属性即可快速接入表单

## 类型描述

```typescript

interface IConnectOptions<T> {
  //控制表单组件
  valueName?: string
  //事件名称
  eventName?: string
  //默认props
  defaultProps?: Partial<IConnectProps>
  //取值函数，有些场景我们的事件函数取值并不是事件回调的第一个参数，需要做进一步的定制
  getValueFromEvent?: (props:  IFieldProps['x-props'], event: Event, ...args: any[]) => any 
  //字段组件props transformer
  getProps?: (connectProps: IConnectProps, fieldProps: IFieldProps) => IConnectProps 
  //字段组件component transformer
  getComponent?: ( 
    target: T, 
    connectProps: IConnectProps,
    fieldProps: IFieldProps
  ) => T
}

type Connect = <T extends React.ComponentType<IFieldProps>>(options?: IConnectOptions<T>) => 
(Target: T) => React.PureComponent<IFieldProps>
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
