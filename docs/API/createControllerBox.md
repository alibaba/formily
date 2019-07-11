# createControllerBox

## 介绍

其实它是createVirtualBox的变体，同样是不占数据空间，但它的区别是，它是有能力封装逻辑的，所以在它的props上是可以接受到完整的FieldProps

## 类型描述

```typescript
type createControllerBox = <T = any>(name: string, component: React.ComponentType<T>) => 
React.FunctionComponent<{
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
  schema              : ISchema,
  form                : Form //参考createForm中的Form API描述
  children            : ReactElement[]
  }>
```

> 为什么需要传name，是因为如果要在json-schema对象中描述，需要可存储，就必须要有一个Key

## 依赖

```javascript
import {createVirtualBox} from '@uform/react'
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
