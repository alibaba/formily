# Form Schema扩展规范

## 背景

虽然JSON Schema是可以轻松描述数据结构，但是，原生标准规范却不支持UI相关的描述，所以，我们只能通过扩展json schema来做UI描述



## UI组件描述

为了描述具体UI组件，虽然我们有了基本数据类型(string/number/boolean/object/array/date)，但是对于一些扩展组件还是需要一些特殊属性来描述，而且也有可能存在同一种数据类型，但UI展示却是不一样的情况，所以，对于UI组件描述，我们使用了 **x-component** 属性来指定对应的UI组件

```json
{
  type:"string",
  "x-component":"radio"
}
```



## 表单校验描述

在表单场景中，校验是必不可少的，同样，为了描述字段的校验规则，我们又扩展了 **x-rules** 来描述字段的校验规则

```json
{
  type:"string",
  "x-component":"radio",
  "x-rules":[{pattern:"\\d+",message:"必须是数字"}]
}
```



## 表单组件属性描述

每个表单组件其实都会有自己的一套属性，有控制交互行为的，也有控制样式的，但是这些都与json-schema无关，所以我们只能继续扩展 **x-props** 来给传递给具体的表单UI组件

```json
{
  type:"string",
  "x-rules":[{pattern:"\\d+",message:"必须是数字"}],
  "x-props":{multiple:true}
}
```



## 表单字段顺序描述

因为json-schema描述对象型数据结构同样是使用对象结构来描述，但是想要映射到UI界面上，就会存在一个显示顺序的问题，对象key是无序的，所以，我们就扩展了 **x-index** 来控制字段顺序

```json
{
  type:"object",
  properties:{
    aa:{
      type:"string",
      "x-rules":[{pattern:"\\d+",message:"必须是数字"}],
      "x-props":{multiple:true},
      "x-index":1
    },
    bb:{
      type:"string",
      "x-rules":[{pattern:"\\d+",message:"必须是数字"}],
      "x-props":{multiple:true},
      "x-index":0
    }
  }
}
```