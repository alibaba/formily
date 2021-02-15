# 核心概念

@formily/react 本身架构不复杂，因为它只是提供了一系列的组件和 Hooks 给用户使用，所以，这里更多的是需要用户灵活组合使用，在使用之前，必须要理解 3 个顶层概念：

- 统一表单上下文
- 字段状态是如何绑定的
- 协议驱动是如何驱动渲染的

## 统一表单上下文

从上图中我们可以看到 FormProvider 是作为表单统一上下文而存在，它的地位非常重要，主要用于将@formily/core 创建出来的[Form](//core.formilyjs.org/api/models/form)实例下发到所有子组件中，不管是在内置组件还是用户扩展的组件，都能通过[useForm](/api/hooks/use-form)读取到[Form](//core.formilyjs.org/api/models/form)实例

## 字段状态绑定

因为 Formily 是推崇[MVVM](//core.formilyjs.org/guide/mvvm)架构模式的，而且@formily/core 也是作为 ViewModel 而存在，所以@formily/react 就是专门负责绑定 View 和 ViewModel 的，具体怎么绑定，我们看看下面伪代码：

```tsx pure
observer(() => (
  <FormItem //------------------------ field.decorator[0]
    {...field.decorator[1]}
    label={field.title}
    help={field.errors}
    extra={field.description}
  >
    <Select //------------------------ field.component[0]
      {...field.component[1]}
      value={field.value}
      onChange={field.onInput}
      options={field.dataSource}
    />
  </FormItem>
))
```

以上伪代码描述了@formily/react 内部是如何进行状态绑定的，核心就几点：

- 字段模型中的 field.component[0]等价于 Select，这个需要用户手动传入 Select
- 字段模型中的 value/onInput 会自动传入 Select，无需手动映射
- 字段模型中的 dataSource 等价于 Select 的 options，需要用户手动映射
- 字段模型中的 decorator 等价于 FormItem
- observer 函数代表需要对字段模型的属性做依赖追踪，如果发生变化则重新渲染

然后我们再看看实际代码：

```tsx pure
import React from 'react'
import { createForm } from '@formily/core'
import { FormProvider, Field, observer, useField } from '@formily/react'
import { Form, Select as AntdSelect } from 'antd'

const FormItem = observer((props) => {
  const field = useField()
  return (
    <Form.Item
      {...props}
      validateStatus={field.validateStatus}
      label={field.title}
      help={field.errors}
      extra={field.description}
    >
      {props.children}
    </Form.Item>
  )
})

const Select = observer(({ value, onChange, ...props }) => {
  const field = useField()
  return (
    <AntdSelect
      {...props}
      value={value}
      onChange={onChange}
      options={field.dataSource}
    />
  )
})

const form = createForm()

export default () => (
  <FormProvider form={form}>
    <Field
      name="select"
      title="下拉框"
      description="这是一段描述"
      required
      dataSource={[
        { label: '选项1', value: 1 },
        { label: '选项2', value: 2 },
      ]}
      decorator={[FormItem]}
      component={[Select, { allowClear: true }]}
    />
  </FormProvider>
)
```

以上绑定是基于组件的二次封装来进行绑定的，可以看到 Select 组件可以直接从 props 上拿到 value/onChange 属性，不需要单独从 field 中读取。

如果我们不想二次封装，则可以使用[connect](/api/shared/connect)和[mapProps](/api/shared/mapProps)

```tsx pure
import React from 'react'
import { createForm } from '@formily/core'
import {
  FormProvider,
  Field,
  observer,
  useField,
  connect,
  mapProps,
} from '@formily/react'
import { Form, Select as AntdSelect } from 'antd'
import 'antd/lib/form/style'
import 'antd/lib/select/style'

const FormItem = connect(
  Form.Item,
  mapProps(
    {
      extract: 'validateStatus',
    },
    {
      extract: 'title',
      to: 'label',
    },
    {
      extract: 'description',
      to: 'extra',
    },
    {
      extract: 'errors',
      to: 'help',
    }
  )
)

const Select = connect(
  AntdSelect,
  mapProps({
    extract: 'dataSource',
    to: 'options',
  })
)

const form = createForm()

export default () => (
  <FormProvider form={form}>
    <Field
      name="select"
      title="下拉框"
      description="这是一段描述"
      required
      dataSource={[
        { label: '选项1', value: 1 },
        { label: '选项2', value: 2 },
      ]}
      decorator={[FormItem]}
      component={[Select, { allowClear: true }]}
    />
  </FormProvider>
)
```

从这两个例子中可以看到，想要实现自定义组件接入@formily/react，只要组件支持 value/onChange 属性就能实现无感接入，除非还需要[@formily/core](//core.formilyjs.org)代理其他状态，比如 title/description/dataSource 这些是需要手动映射状态的，只不过这些映射都是一次性的映射成本，映射好了之后，下次使用就直接使用映射完的组件，这样开发效率就会大大提升，所以，这也是[@formily/antd](//antd.formilyjs.org)和[@formily/next](//next.formilyjs.org)的意义所在，它们就是负责给用户提前映射组件，方便用户开箱即用。

## 协议驱动渲染

协议驱动渲染算是@formily/react 中学习成本最高的部分了，但是学会了之后，它给业务带来的收益也是很高，总共需要理解 4 个核心概念：

- JSON Schema
- 递归渲染
- 协议绑定
- 三种开发模式

### JSON Schema

formily 的协议驱动主要是基于标准 JSON Schema 来进行驱动渲染的，同时我们在标准之上又扩展了一些`x-*`属性来表达 UI，使得整个协议可以具备完整描述一个复杂表单的能力，具体 Schema 协议，参考[Schema](/api/shared/schema) API 文档

### 递归渲染

何为递归渲染？看看以下伪代码：

```json
{ <---- RecursionField(渲染权：RecursionField)
  "type":"object",
  "properties":{
    "username":{ <---- RecursionField(渲染权：RecursionField)
      "type":"string",
      "x-component":"Input"
    },
    "phone":{ <---- RecursionField(渲染权：RecursionField)
      "type":"string",
      "x-component":"Input",
      "x-validator":"phone"
    },
    "email":{ <---- RecursionField(渲染权：RecursionField)
      "type":"string",
      "x-component":"Input",
      "x-validator":"email"
    },
    "contacts":{ <---- RecursionField(渲染权：RecursionField)
      "type":"array",
      "x-component":"ArrayTable",
      "items":{ <---- RecursionField(渲染权：ArrayTable)
        "type":"object",
        "properties":{
          "username":{ <---- RecursionField(渲染权：RecursionField)
            "type":"string",
            "x-component":"Input"
          },
          "phone":{ <---- RecursionField(渲染权：RecursionField)
            "type":"string",
            "x-component":"Input",
            "x-validator":"phone"
          },
          "email":{ <---- RecursionField(渲染权：RecursionField)
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

@formily/react 递归渲染的入口是[SchemaField](/api/components/schema-field)，但它内部实际是使用 [RecursionField](/api/components/recursion-field) 来渲染的，因为 JSON-Schema 就是一个递归型结构，所以 [RecursionField](/api/components/recursion-field) 在渲染的时候会从顶层 Schema 节点解析，如果是非 object 和 array 类型则直接渲染具体组件，如果是 object，则会遍历 properties 继续用 [RecursionField](/api/components/recursion-field) 渲染子级 Schema 节点，这里有点特殊的情况是 array 类型的自增列表渲染，需要用户在自定义组件内使用[RecursionField](/api/components/recursion-field)进行递归渲染，因为自增列表的 UI 个性化定制程度很高，所以就把递归渲染权交给用户来渲染了，这样设计也能让协议驱动渲染变得更加灵活。
那 SchemaField 和 RecursionField 有啥差别呢？主要有两点：

- SchemaField 是支持 Markup 语法的，它会提前解析 Markup 语法生成[JSON Schema](/api/shared/schema)移交给 RecursionField 渲染，所以 RecursionField 只能基于 [JSON Schema](/api/shared/schema) 渲染
- SchemaField 渲染的是整体的 Schema 协议，而 RecursionField 渲染的是局部 Schema 协议

### 协议绑定

### 三种开发模式
