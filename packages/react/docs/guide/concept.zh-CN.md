# 核心概念

@formily/react 本身架构不复杂，因为它只是提供了一系列的组件和 Hooks 给用户使用，但是我们还是需要理解以下几个概念：

- 表单上下文
- 字段上下文
- 协议上下文
- 模型绑定
- 协议驱动
- 三种开发模式

## 表单上下文

从[架构图](/guide/architecture)中我们可以看到 FormProvider 是作为表单统一上下文而存在，它的地位非常重要，主要用于将@formily/core 创建出来的[Form](//core.formilyjs.org/api/models/form)实例下发到所有子组件中，不管是在内置组件还是用户扩展的组件，都能通过[useForm](/api/hooks/use-form)读取到[Form](//core.formilyjs.org/api/models/form)实例

## 字段上下文

从[架构图](/guide/architecture)中我们可以看到不管是 Field/ArrayField/ObjectField/VoidField，会给子树下发一个 FieldContext，我们可以在自定义组件中读取到当前字段模型，主要是使用[useField](/api/hooks/use-field)来读取，这样非常方便于做模型映射

## 协议上下文

从[架构图](/guide/architecture)中我们可以看到[RecursionField](/api/components/recursion-field)会给子树下发一个 FieldSchemaContext，我们可以在自定义组件中读取到当前字段的 Schema 描述，主要是使用[useFieldSchema](/api/hooks/useFieldSchema)来读取。注意，该 Hook 只能用在[SchemaField](/api/components/SchemaField)和[RecursionField](/api/components/recursion-field)子树中使用

## 模型绑定

想要理解模型绑定，需要先理解什么是[MVVM](//core.formilyjs.org/guide/mvvm)，理解了之后我们再看看这张图：

![](https://img.alicdn.com/imgextra/i1/O1CN01A03C191KwT1raxnDg_!!6000000001228-55-tps-2200-869.svg)

在 Formily 中，@formily/core 就是 ViewModel，Component 和 Decorator 就是 View，@formily/react 就是将 ViewModel 和 View 绑定起来的胶水层，ViewModel 和 View 的绑定就叫做模型绑定，实现模型绑定的手段主要有[useField](/api/hooks/use-field)，也能使用[connect](/api/shared/connect)和[mapProps](/api/shared/map-props)，需要注意的是，Component 只需要支持 value/onChange 属性即可自动实现数据层的双向绑定。

## 协议驱动

协议驱动渲染算是@formily/react 中学习成本最高的部分了，但是学会了之后，它给业务带来的收益也是很高，总共需要理解 4 个核心概念：

- Schema
- 递归渲染
- 协议绑定
- 三种开发模式

### Schema

formily 的协议驱动主要是基于标准 JSON Schema 来进行驱动渲染的，同时我们在标准之上又扩展了一些`x-*`属性来表达 UI，使得整个协议可以具备完整描述一个复杂表单的能力，具体 Schema 协议，参考[Schema](/api/shared/schema) API 文档

### 递归渲染

何为递归渲染？递归渲染就是组件 A 在某些条件下会继续用组件 A 来渲染内容，看看以下伪代码：

```json
{ <---- RecursionField(条件：object；渲染权：RecursionField)
  "type":"object",
  "properties":{
    "username":{ <---- RecursionField(条件：string；渲染权：RecursionField)
      "type":"string",
      "x-component":"Input"
    },
    "phone":{ <---- RecursionField(条件：string；渲染权：RecursionField)
      "type":"string",
      "x-component":"Input",
      "x-validator":"phone"
    },
    "email":{ <---- RecursionField(条件：string；渲染权：RecursionField)
      "type":"string",
      "x-component":"Input",
      "x-validator":"email"
    },
    "contacts":{ <---- RecursionField(条件：array；渲染权：RecursionField)
      "type":"array",
      "x-component":"ArrayTable",
      "items":{ <---- RecursionField(条件：object；渲染权：ArrayTable组件)
        "type":"object",
        "properties":{
          "username":{ <---- RecursionField(条件：string；渲染权：RecursionField)
            "type":"string",
            "x-component":"Input"
          },
          "phone":{ <---- RecursionField(条件：string；渲染权：RecursionField)
            "type":"string",
            "x-component":"Input",
            "x-validator":"phone"
          },
          "email":{ <---- RecursionField(条件：string；渲染权：RecursionField)
            "type":"string",
            "x-component":"Input",
            "x-validator":"email"
          },
        }
      }
    }
  }
}
```

@formily/react 递归渲染的入口是[SchemaField](/api/components/schema-field)，但它内部实际是使用 [RecursionField](/api/components/recursion-field) 来渲染的，因为 JSON-Schema 就是一个递归型结构，所以 [RecursionField](/api/components/recursion-field) 在渲染的时候会从顶层 Schema 节点解析，如果是非 object 和 array 类型则直接渲染具体组件，如果是 object，则会遍历 properties 继续用 [RecursionField](/api/components/recursion-field) 渲染子级 Schema 节点。

这里有点特殊的情况是 array 类型的自增列表渲染，需要用户在自定义组件内使用[RecursionField](/api/components/recursion-field)进行递归渲染，因为自增列表的 UI 个性化定制程度很高，所以就把递归渲染权交给用户来渲染了，这样设计也能让协议驱动渲染变得更加灵活。

那 SchemaField 和 RecursionField 有啥差别呢？主要有两点：

- SchemaField 是支持 Markup 语法的，它会提前解析 Markup 语法生成[JSON Schema](/api/shared/schema)移交给 RecursionField 渲染，所以 RecursionField 只能基于 [JSON Schema](/api/shared/schema) 渲染
- SchemaField 渲染的是整体的 Schema 协议，而 RecursionField 渲染的是局部 Schema 协议

### 协议绑定

前面讲了模型绑定，而协议绑定则是将 Schema 协议转换成模型绑定的过程，因为 JSON-Schema 协议是 JSON 字符串，可离线存储的，而模型绑定则是内存间的绑定关系，是 Runtime 层的，比如`x-component`在 Schema 中是组件的字符串标识，但是在模型中的 component 则是需要组件引用，所以 JSON 字符串与 Runtime 层是需要转换的。然后我们就可以继续完善一下以上模型绑定的图：

![](https://img.alicdn.com/imgextra/i3/O1CN01jLCRxH1aa3V0x6nw4_!!6000000003345-55-tps-2200-1147.svg)

总结下来，在@formily/react 中，主要有 2 层绑定关系，Schema 绑定模型，模型绑定组件，实现绑定的胶水层就是@formily/react，需要注意的是，Schema 绑定字段模型之后，字段模型中是感知不到 Schema 的，比如要修改`enum`，就是修改字段模型中的`dataSource`属性了，总之，想要更新字段模型，参考[Field](//core.formilyjs.org/models/field)，想要理解 Schema 与字段模型的映射关系可以参考[Schema](/api/shared/schema)文档

## 三种开发模式

从[架构图](/guide/architecture)中我们其实已经看到整个@formily/react 是有三种开发模式的，对应不同用户：

- JSX 开发模式
- JSON Schema 开发模式
- Markup Schema 开发模式

我们可以看看具体例子

#### JSX 开发模式

该模式主要是使用 Field/ArrayField/ObjectField/VoidField 组件

```tsx
import React from 'react'
import { createForm } from '@formily/core'
import { FormProvider, Field } from '@formily/react'
import { Input } from 'antd'

const form = createForm()

export default () => (
  <FormProvider form={form}>
    <Field name="input" component={[Input, { placeholder: '请输入' }]} />
  </FormProvider>
)
```

#### JSON Schema 开发模式

该模式是给 SchemaField 的 schema 属性传递 JSON Schema 即可

```tsx
import React from 'react'
import { createForm } from '@formily/core'
import { FormProvider, createSchemaField } from '@formily/react'
import { Input } from 'antd'

const form = createForm()

const SchemaField = createSchemaField({
  components: {
    Input,
  },
})

export default () => (
  <FormProvider form={form}>
    <SchemaField
      schema={{
        type: 'object',
        properties: {
          input: {
            type: 'string',
            'x-component': 'Input',
            'x-component-props': {
              placeholder: '请输入',
            },
          },
        },
      }}
    />
  </FormProvider>
)
```

#### Markup Schema 开发模式

该模式算是一个对源码开发比较友好的 Schema 开发模式，同样是使用 SchemaField 组件。

因为用 JSON Schema 在 JSX 环境下很难得到最好的智能提示体验，而且也不方便维护，用标签的形式可维护性会更好，智能提示也很强。

Markup Schema 模式主要有以下几个特点：

- 主要依赖 SchemaField.String/SchemaField.Array/SchemaField.Object...这类描述标签来表达 Schema
- 每个描述标签都代表一个 Schema 节点，与 JSON-Schema 等价
- SchemaField 子节点不能随意插 UI 元素，因为 SchemaField 只会解析子节点的所有 Schema 描述标签，然后转换成 JSON Schema，最终交给[RecursionField](/api/components/recursion-field)渲染，如果想要插入 UI 元素，可以在 VoidDield 上传`x-content`属性来插入 UI 元素

```tsx
import React from 'react'
import { createForm } from '@formily/core'
import { FormProvider, createSchemaField } from '@formily/react'
import { Input } from 'antd'

const form = createForm()

const SchemaField = createSchemaField({
  components: {
    Input,
  },
})

export default () => (
  <FormProvider form={form}>
    <SchemaField>
      <SchemaField.String
        x-component="Input"
        x-component-props={{ placeholder: '请输入' }}
      />
      <div>我不会被渲染</div>
      <SchemaField.Void x-content={<div>我会被渲染</div>} />
    </SchemaField>
  </FormProvider>
)
```
