# createVirtualBox

## 介绍

创建一个虚拟盒子组件，就是说这个组件可以作为 schema 节点描述，但是它并不占数据节点，我们可以使用该 API 来创建一些布局相关的组件。

## 类型描述

```typescript
type createVirtualBox = <T = any>(name: string, component: React.ComponentType<T>) =>
React.FunctionComponent<{
  children : ReactElement[],
  ...props: T
  }>
```

> 为什么需要传 name，是因为如果要在 json-schema 对象中描述，需要可存储，就必须要有一个 Key

## 依赖

```javascript
import { createVirtualBox } from '@uform/react'
```

## 用例

```javascript
import {createVirtualBox,SchemaForm} from '@uform/react'

const Card = createVirtualBox('card',(props)=>{
   return <div>这是一个卡片{props.children}</div>
})

//jsx描述
<SchemaForm>
   <Card>
     <Field name="aa" type="string"/>
   </Card>
</SchemaForm>

//json-schema描述
{
  type:"object",
  properties:{
    card:{
      type:"object",
      "x-component":"card",
      properties:{
         aa:{
           type:"string"
         }
      }
    }
  }
}
```
