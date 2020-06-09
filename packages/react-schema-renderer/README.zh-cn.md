# @formily/react-schema-renderer

> Schema 渲染引擎，该包主要依赖了@formily/react，它的职责很简单，核心就做了两件事情：
>
> - 解析 Form Schema 协议，递归渲染
> - 管理自定义组件

### 安装

```bash
npm install --save @formily/react-schema-renderer
```

### 目录

<!-- toc -->

- [使用方式](#/%E4%BD%BF%E7%94%A8%E6%96%B9%E5%BC%8F)
  - [`快速开始`](#%E5%BF%AB%E9%80%9F%E5%BC%80%E5%A7%8B)
  - [`JSON Schema 驱动表单渲染`](#json-schema-%E9%A9%B1%E5%8A%A8%E8%A1%A8%E5%8D%95%E6%B8%B2%E6%9F%93)
  - [`JSchema 驱动表单渲染`](#jschema-%E9%A9%B1%E5%8A%A8%E8%A1%A8%E5%8D%95%E6%B8%B2%E6%9F%93)
  - [`非单例注册组件`](#%E9%9D%9E%E5%8D%95%E4%BE%8B%E6%B3%A8%E5%86%8C%E7%BB%84%E4%BB%B6)
- [高级教程](#%E9%AB%98%E7%BA%A7%E6%95%99%E7%A8%8B)
  - [`如何接入第三方组件库？`](#%E5%A6%82%E4%BD%95%E6%8E%A5%E5%85%A5%E7%AC%AC%E4%B8%89%E6%96%B9%E7%BB%84%E4%BB%B6%E5%BA%93)
  - [`如何接入 Form/FormItem 组件？`](#%E5%A6%82%E4%BD%95%E6%8E%A5%E5%85%A5-formformitem-%E7%BB%84%E4%BB%B6)
  - [`如何接入表单组件？`](#%E5%A6%82%E4%BD%95%E6%8E%A5%E5%85%A5%E8%A1%A8%E5%8D%95%E7%BB%84%E4%BB%B6)
  - [`如何处理表单布局？`](#%E5%A6%82%E4%BD%95%E5%A4%84%E7%90%86%E8%A1%A8%E5%8D%95%E5%B8%83%E5%B1%80)
  - [`如何实现递归渲染组件？`](#%E5%A6%82%E4%BD%95%E5%AE%9E%E7%8E%B0%E9%80%92%E5%BD%92%E6%B8%B2%E6%9F%93%E7%BB%84%E4%BB%B6)
  - [`如何实现自增列表组件？`](#%E5%A6%82%E4%BD%95%E5%AE%9E%E7%8E%B0%E8%87%AA%E5%A2%9E%E5%88%97%E8%A1%A8%E7%BB%84%E4%BB%B6)
  - [`如何实现超复杂自定义组件？`](#%E5%A6%82%E4%BD%95%E5%AE%9E%E7%8E%B0%E8%B6%85%E5%A4%8D%E6%9D%82%E8%87%AA%E5%AE%9A%E4%B9%89%E7%BB%84%E4%BB%B6)
- [API](#api)
  - [`connect`](#connect)
  - [`registerFormField`](#registerformfield)
  - [`registerFormFields`](#registerformfields)
  - [`registerFormComponent`](#registerformcomponent)
  - [`registerFormItemComponent`](#registerformitemcomponent)
  - [`registerVirtualBox`](#registervirtualbox)
  - [`createVirtualBox`](#createvirtualbox)
  - [`createControllerBox`](#createcontrollerbox)
  - [`getRegistry`](#getregistry)
  - [`cleanRegistry`](#cleanregistry)
- [Classes](#classes)
  - [new Schema(json : ISchema)](#new-schemajson--ischema)
    - [`get`](#get)
    - [`merge`](#merge-)
    - [`getEmptyValue`](#getemptyvalue)
    - [`getSelfProps`](#getselfprops)
    - [`getExtendsRules`](#getextendsrules)
    - [`getExtendsRequired`](#getextendsrequired)
    - [`getExtendsEditable`](#getextendseditable)
    - [`getExtendsTriggerType`](#getextendstriggertype)
    - [`getExtendsProps`](#getextendsprops)
    - [`getExtendsComponent`](#getextendscomponent)
    - [`getExtendsComponentProps`](#getextendscomponentprops)
    - [`getExtendsRenderer`](#getextendsrenderer)
    - [`getExtendsEffect`](#getextendseffect)
    - [`setProperty`](#setproperty)
    - [`setProperties`](#setproperties)
    - [`setArrayItems`](#setarrayitems)
    - [`getOrderProperties`](#getorderproperties)
    - [`mapProperties`](#mapproperties)
    - [`toJSON`](#tojson)
    - [`fromJSON`](#fromjson)
    - [`isObject`](#isobject)
    - [`isArray()`](#isarray)
- [Components](#components)
  - [`<SchemaForm/>`](#SchemaForm)
  - [`<SchemaField/>`](#SchemaField)
  - [`<SchemaMarkupForm/>`](#SchemaMarkupForm)
  - [`<SchemaMarkupField/>`](#SchemaMarkupField)
  - [`<InternalForm/>`](#InternalForm)
  - [`<InternalField/>`](#InternalField)
- [Interfaces](#interfaces)
  - [`IConnectOptions`](#iconnectoptions)
  - [`ISchemaFieldComponentProps`](#ischemafieldcomponentprops)
  - [`ISchemaVirtualFieldComponentProps`](#ischemavirtualfieldcomponentprops)
  - [`ISchemaFormRegistry`](#ischemaformregistry)
  - [`ISchema`](#ischema)
  - [`ISchemaFormActions`](#ischemaformactions)
  - [`ISchemaFormAsyncActions`](#ischemaformasyncactions)
  - [`IFormValidateResult`](#iformvalidateresult)
  - [`InternalFormats`](#internalformats)
  - [`ValidateDescription`](#validatedescription)
  - [`ValidateResponse`](#validateresponse)
  - [`CustomValidator`](#customvalidator)
  - [`ValidatePatternRules`](#validatepatternrules)

<!-- tocstop -->

### 使用方式

---

#### 快速开始

如果您是直接基于@formily/react-schema-renderer 做开发的，那么您必须在开发前将自定义组件注册到渲染器里去，否则，我们的 JSON-Schema 协议是不能渲染表单的。所以：

```tsx
import React from 'react'
import {
  SchemaForm,
  registerFormField,
  connect
} from '@formily/react-schema-renderer'

registerFormField(
  'string',
  connect()(({ value, onChange }) => {
    return <input value={value} onChange={onChange} />
  })
)

export default () => {
  return (
    <SchemaForm
      schema={{
        type: 'object',
        properties: {
          input: {
            type: 'string'
          }
        }
      }}
      onChange={console.log} //{input:'this is your input string'}
    />
  )
}
```

大工告成，这个就是最简单的用法，核心就是注册组件，然后使用协议渲染。**需要注意一点是，我们在注册组件的时候使用了 connect 函数，这个 connect 函数的功能就是，让任意一个组件，只要支持 value/onChange API 的，都可以快速注册到 SchemaForm 里面去，同时，connect 函数也屏蔽了 Field API，所以使用了 connect 函数的组件，是不能做更加强大的扩展的，详细的 connect API 后面会有介绍**。同时，还有一个要注意的就是，如果我们要接入一套组件库的，业内大多数组件库其实都是有自己的 Form 和 FormItem 组件的，他们核心是用于控制样式，FormItem 控制表单局部样式，Form 控制全局表单样式，所以在生产环境下，其实我们还需要注册 Form 和 FormItem 组件，这样才能做到样式与原有解决方案的一致性，具体如何注册，我们会在后面有详细介绍。

#### JSON Schema 驱动表单渲染

说到 JSON Schema，上面一个例子其实已经涉及了，当然，它并不够复杂，我们看一个较为复杂的例子：

```tsx
import React from 'react'
import { SchemaForm } from '@formily/react-schema-renderer'

registerFormField(
  'string',
  connect()(({ value, onChange }) => {
    return <input value={value} onChange={onChange} />
  })
)

registerFormField('array', () => {
  return //...
})

export default () => {
  return (
    <SchemaForm
      schema={{
        type: 'object',
        properties: {
          array: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                input: {
                  type: 'string'
                }
              }
            }
          }
        }
      }}
      onChange={console.log} //{array:[{input:'This is your input string'}]}
    />
  )
}
```

上面的代码是一段伪代码，因为我们并没有注册 array 类型的自定义组件，这里先暂时不讲如何注册 array 类型的自定义组件，我们核心是分析 JSON Schema 是如何驱动表单渲染的。在这份 JSON Schema 中，我们主要使用了 properties 和 items 属性用来描述复杂数据结构，这就是 JSON Schema 最核心的特性，注意：**在 SchemaForm 中，内置了 object 的 properties 的递归渲染，但是并没有内置 array 的 items 递归渲染**，主要原因是，array 的递归渲染会涉及很多样式需求，并不方便内置，所以最好还是留给开发者自己实现，所以，后面我们会详细介绍如何实现自增列表的递归渲染需求。

#### JSchema 驱动表单渲染

JSchema 就是在 jsx 中以一种更优雅的写法来描述 JSON Schema，我们可以针对以上例子用 JSchema 实现一版：

```tsx
import React from 'react'
import {
  SchemaMarkupForm as SchemaForm,
  SchemaMarkupField as Field
} from '@formily/react-schema-renderer'

export default () => {
  return (
    <SchemaForm
      onChange={console.log} //{array:[{input:'This is your input string'}]}
    >
      <Field type="array" name="array">
        <Field type="object">
          <Field type="string" name="input" />
        </Field>
      </Field>
    </SchemaForm>
  )
}
```

可以看到，使用 JSchema 在代码中描述 JSON Schema 比起 JSON 而言变得更加优雅了，大大的提高了代码可维护性。

#### 非单例注册组件

在前面的例子中，我们使用了 registerFormField API 来注册了自定义组件，这种方式是单例注册的方式，它的主要优点就是方便，但是也会存在一些问题，就是单例容易受污染，特别是在 SPA 页面中，如果不同页面的开发者是不一样的，因为共享同一个内存环境，那么 A 开发者可能会注册 B 开发者同名的自定义组件，这样就很容易导致线上故障，所以，我们更加推荐用户使用非单例注册方式：

```tsx
import React, { useMemo } from 'react'
import {
  SchemaForm,
  registerFormField,
  connect
} from '@formily/react-schema-renderer'

const StringField = connect()(({ value, onChange }) => {
  return <input value={value} onChange={onChange} />
})

const useFields = () =>
  useMemo(() => {
    string: StringField
  })

export default () => {
  return (
    <SchemaForm
      fields={useFields()}
      schema={{
        type: 'object',
        properties: {
          input: {
            type: 'string'
          }
        }
      }}
      onChange={console.log} //{input:'this is your input string'}
    />
  )
}
```

在上面的例子中，我们主要是在 SchemaForm 的 props 维度来传递自定义组件，这样就能保证是实例级注册了，这样的形式对 SPA 非常友好，同时，**需要注意的是我们抽象了一个 useFields 的 React Hook，它主要用于解决组件多次渲染的时候不会影响 React Virtual DOM 重新计算，从而避免表单组件重复渲染**。

### 高级教程

---

#### 如何接入第三方组件库？

因为@formily/react-schema-renderer 是一个基础库，默认不会集成任何组件库的，所以我们在实际业务开发中，如果要基于它来定制，那么就必须得面对接入第三方组件库的问题。如何接入第三方组件库，我们分为以下几步：

- 接入 Form/FormItem 组件
- 接入组件库表单组件
- 实现表单布局组件
- 实现自增列表组件

下面就让我们一步步的来接入第三方组件库吧！这里我们主要以 antd 组件库为例子。

#### 如何接入 Form/FormItem 组件？

接入方式目前提供了全局注册机制与单例注册机制，全局注册主要使用 registerFormComponent 和 registerFormItemComponent 两个 API 来注册，单例注册则是直接在 SchemaForm 属性上传 formComponent 和 formItemComponent。如果是 SPA 场景，推荐使用单例注册的方式，下面看看例子：

```tsx
import React from 'react'
import {
  SchemaForm,
  registerFormComponent,
  registerFormItemComponent
} from '@formily/react-schema-renderer'
import { Form } from 'antd'

export const CompatFormComponent = ({ children, ...props }) => {
  return <Form {...props}>{children}</Form> //很简单的使用Form组件，props是SchemaForm组件的props，这里会直接透传
}

export const CompatFormItemComponent = ({ children, ...props }) => {
  const messages = [].concat(props.errors || [], props.warnings || [])
  let status = ''
  if (props.loading) {
    status = 'validating'
  }
  if (props.invalid) {
    status = 'error'
  }
  if (props.warnings && props.warnings.length) {
    status = 'warning'
  }
  return (
    <Form.Item
      {...props}
      label={props.schema.title}
      help={
        messages.length ? messages : props.schema && props.schema.description
      }
      validateStatus={status}
    >
      {children}
    </Form.Item>
  )
}

/***
全局注册方式
registerFormComponent(CompatFormComponent)
registerFormItemComponent(CompatFormItemComponent)
***/

//单例注册方式
export default () => {
  return (
    <SchemaForm
      formComponent={CompatFormComponent}
      formItemComponent={CompatFormItemComponent}
    />
  )
}
```

我们可以看到，扩展表单整体或局部的样式，仅仅只需要通过扩展 Form/FormItem 组件就可以轻松解决了，这里需要注意的是，FormItem 组件接收到的 props 有点复杂，不用担心，后面会列出详细 props API，现在我们只需要知道大概是如何注册的就行了。

#### 如何接入表单组件？

因为组件库的所有组件都是原子型组件，同时大部分都兼容了 value/onChange 规范，所以我们可以借助 connect 函数快速接入组件库的组件，通常，我们接入组件库组件，大概要做 3 件事情：

- 处理状态映射，将 formily 内部的 loading/error 状态映射到该组件属性上，当然，**前提是要求组件必须支持 loading 或 error 这类的样式**
- 处理详情态样式，将 formily 内部的 editable 状态，映射到一个 PreviewText 组件上去，用于更友好更干净的展示数据
- 处理组件枚举态，我们想一下，**JSON Schema，每一个节点都应该支持 enum 属性的**，如果配了 enum 属性，我们最好都以 Select 形式来展现，所以我们需要处理一下组件枚举态

咱们以 InputNumber 为例演示一下：

```tsx
import React from 'react'
import { connect, registerFormField } from '@formily/react-schema-renderer'
import { InputNumber } from 'antd'

const mapTextComponent = (
  Target: React.JSXElementConstructor<any>,
  props: any = {},
  fieldProps: any = {}
): React.JSXElementConstructor<any> => {
  const { editable } = fieldProps
  if (editable !== undefined) {
    if (editable === false) {
      return PreviewText
    }
  }
  if (Array.isArray(props.dataSource)) {
    return Select
  }
  return Target
}

const mapStyledProps = (
  props: IConnectProps,
  fieldProps: MergedFieldComponentProps
) => {
  const { loading, errors } = fieldProps
  if (loading) {
    props.state = props.state || 'loading'
  } else if (errors && errors.length) {
    props.state = 'error'
  }
}

const acceptEnum = (component: React.JSXElementConstructor<any>) => {
  return ({ dataSource, ...others }) => {
    if (dataSource) {
      return React.createElement(Select, { dataSource, ...others })
    } else {
      return React.createElement(component, others)
    }
  }
}

registerFormField(
  'number',
  connect({
    getProps: mapStyledProps, //处理状态映射
    getComponent: mapTextComponent //处理详情态
  })(acceptEnum(InputNumber)) //处理枚举态
)
```

在这个例子中，我们深度使用了 connect 函数，其实 connect 就是一个 HOC，在渲染阶段，它可以在组件渲染过程中加入一些中间处理逻辑，帮助动态分发。当然，connect 还有很多 API，后面会详细介绍。

#### 如何处理表单布局？

JSON Schema 描述表单数据结构，其实是天然支持的，但是表单最终还是落在 UI 层面的，可惜在 UI 层面上我们有很多组件其实并不能作为 JSON Schema 的一个具体数据节点，它仅仅只是一个 UI 节点。所以，想要在 JSON Schema 中描述复杂布局，怎么做？

现在 formily 的做法是，抽象了一个叫**虚拟节点**的概念，用户在代码层面上指定某个 JSON Schema x-component 为虚拟节点之后，后面不管是在渲染，还是在数据处理，还是最终数据提交，只要解析到这个节点是虚拟节点，都不会将它当做一个正常的数据节点。所以，有了这个虚拟节点的概念，我们就可以在 JSON Schema 中描述各种复杂布局，下面让我们试着写一个布局组件：

```tsx
import React from 'react'
import { SchemaForm, registerVirtualBox } from '@formily/react-schema-renderer'
import { Card } from 'antd'

registerVirtualBox('card', ({ children, ...props }) => {
  return <Card {...props.schema.getExtendsComponentProps()}>{children}</Card>
})

export default () => {
  return (
    <SchemaForm
      schema={{
        type: 'object',
        properties: {
          layout_card: {
            //layout_card这个属性名，您改成什么都不会影响最终提交的数据结构
            type: 'object',
            'x-component': 'card',
            'x-component-props': {
              title: 'This is Card'
            },
            properties: {
              array: {
                type: 'array',
                items: {
                  type: 'object',
                  properties: {
                    input: {
                      type: 'string'
                    }
                  }
                }
              }
            }
          }
        }
      }}
    />
  )
}
```

从这段伪代码中我们可以看到 card 就是一个正常的 Object Schema 节点，只是需要指定一个 x-component 为 card，这样就能和 registerVirtualBox 注册的 card 匹配上，就达到了虚拟节点的效果，所以，不管你把 JSON Schema 中的属性名改为什么，都不会影响最终的提交的数据结构。**这里需要注意的是 x-component-props 是直接透传到 registerVirtualBox 的回调函数参数上的。** 这是 JSON Schema 形式的使用，我们还有 JSchema 的使用方式：

```tsx
import React from 'react'
import { SchemaForm, createVirtualBox } from '@formily/react-schema-renderer'
import { Card } from 'antd'

const Card = createVirtualBox('card', ({ children, ...props }) => {
  return <Card {...props}>{children}</Card>
})

export default () => {
  return (
    <SchemaForm>
      <Card title="This is Card">
        <Field type="array" name="array">
          <Field type="object">
            <Field type="string" name="input" />
          </Field>
        </Field>
      </Card>
    </SchemaForm>
  )
}
```

从这个例子中我们可以看到，借助 createVirtualBox API 可以快速创建一个布局组件，同时在 JSchema 中直接使用。**其实 createVirtualBox 的内部实现很简单，还是使用了 registerVitualBox 和 SchemaMarkupField**：

```tsx
import React from 'react'
import { SchemaMarkupField as Field } from '@formily/react-schema-renderer'
export function createVirtualBox<T = {}>(
  key: string,
  component?: React.JSXElementConstructor<React.PropsWithChildren<T>>
) {
  registerVirtualBox(
    key,
    component
      ? ({ props, schema, children }) => {
          return React.createElement(component, {
            ...schema.getExtendsComponentProps(),
            children
          })
        }
      : () => <Fragment />
  )
  const VirtualBox: React.FC<T & { name?: string }> = ({
    children,
    name,
    ...props
  }) => {
    return (
      <Field
        type="object"
        name={name}
        x-component={key}
        x-props={props}
        x-component-props={props}
      >
        {children}
      </Field>
    )
  }
  return VirtualBox
}
```

前面介绍的注册布局组件的方式，其实都是单例注册，如果我们需要实例形式的注册，还是与前面说的方式类似

```tsx
import React from 'react'
import { Card as AntdCard } from 'antd'
const Card = ({children,...props})=>{
  return <AntdCard {...props.schema.getExtendsComponentProps()}>{children}</Card>
}

export default ()=>{
  return (
    <SchemaForm
      virtualFields={{
        card:Card
      }}
      schema={{
        type:"object",
          properties:{
            layout_card:{//layout_card这个属性名，您改成什么都不会影响最终提交的数据结构
              type:"object",
              "x-component":"card",
              "x-component-props":{
                 title:"This is Card"
              },
              properties:{
                array:{
                  type:"array",
                    items:{
                      type:"object",
                        properties:{
                          input:{
                            type:"string"
                          }
                        }
                    }
                }
              }
            }
          }
      }}
    />
  )
}
```

#### 如何实现递归渲染组件？

什么叫递归渲染组件？其实就是**实现了 JSON Schema 中 properties 和 items 的组件**，像`type:"string"` 这种节点就属于原子节点，不属于递归渲染组件。其实像前面说的布局组件，其实它也是属于递归渲染组件，只是它固定了渲染模式，所以可以很简单的注册。所以，我们大部分想要实现递归渲染的场景，可能更多的是在`type:"array"`这种场景才会去实现递归渲染，下面我们会详细介绍自增列表组件的实现方式。

#### 如何实现自增列表组件？

自增列表它主要有几个特点：

- 有独立样式
- 支持递归渲染子组件
- 支持数组项的新增，删除，上移，下移
- 不能使用 connect 函数包装，因为必须调用 Field API

为了帮助大家更好的理解如何实现自增列表组件，我们就不实现具体样式了，更多的是教大家如何实现递归渲染和，数组项的操作。下面我们看伪代码：

```tsx
import React, { Fragment } from 'react'
import {
  registerFormField,
  SchemaField,
  FormPath
} from '@formily/react-schema-renderer'

//不用connect包装
registerFormField('array', ({ value, path, mutators }) => {
  const emptyUI = (
    <button
      onClick={() => {
        mutators.push()
      }}
    >
      Add Element
    </button>
  )

  const listUI = value.map((item, index) => {
    return (
      <div key={index}>
        <SchemaField path={FormPath.parse(path).concat(index)} />
        <button
          onClick={() => {
            mutators.remove(index)
          }}
        >
          remove
        </button>
        <button
          onClick={() => {
            mutators.moveDown(index)
          }}
        >
          move down
        </button>
        <button
          onClick={() => {
            mutators.moveUp(index)
          }}
        >
          move up
        </button>
      </div>
    )
  })

  return value.length == 0 ? emptyUI : listUI
})
```

看到了没，要实现一个带递归渲染的自增列表组件，超级简单，反而如果要实现相关的样式就会有点麻烦，总之核心就是使用了 SchemaField 这个组件和 mutators API，具体 API 会在后面详细介绍。

#### 如何实现超复杂自定义组件？

这个问题，在老版 Formily 中基本无解，恰好也是因为我们这边的业务复杂度高到一定程度之后，我们自己被这个问题给受限制了，所以必须得想办法解决这个问题，下面我们可以定义一下，什么才是超复杂自定义组件：

- 组件内部存在大量表单组件，同时内部也存在大量联动关系
- 组件内部存在私有的服务端动态渲染方案

- 组件内部有复杂布局结构

就这 3 点，基本上满足超复杂自定义组件的特征了，对于这种场景，为什么我们通过正常的封装自定义组件的形式不能解决问题呢？其实主要是受限于校验，没法整体校验，所以，我们需要一个能聚合大量字段处理逻辑的能力，下面我们来看看具体方案：

```tsx
import React, { Fragment } from 'react'
import {
  registerFormField,
  SchemaField,
  FormPath,
  InternalField,
  useFormEffects,
  FormEffectHooks
} from '@formily/react-schema-renderer'
import { Input, Form } from 'antd'

const FormItem = ({ component, ...props }) => {
  return (
    <InternalField {...props}>
      {({ state, mutators }) => {
        const messages = [].concat(state.errors || [], state.warnings || [])
        let status = ''
        if (state.loading) {
          status = 'validating'
        }
        if (state.invalid) {
          status = 'error'
        }
        if (state.warnings && state.warnings.length) {
          status = 'warning'
        }
        return (
          <Form.Item
            {...props}
            help={messages.length ? messages : props.help && props.help}
            validateStatus={status}
          >
            {React.createElement(component, {
              ...state.props,
              value: state.value,
              onChange: mutators.change,
              onBlur: mutators.blur,
              onFocus: mutators.focus
            })}
          </Form.Item>
        )
      }}
    </InternalField>
  )
}

//不用connect包装
registerFormField('complex', ({ path }) => {
  useFormEffects(({ setFieldState }) => {
    FormEffectHooks.onFieldValueChange$('ccc').subscribe(({ value }) => {
      if (value === '123') {
        setFieldState('ddd', state => {
          state.value = 'this is linkage relationship'
        })
      }
    })
  })

  return (
    <>
      <FormItem name={FormPath.parse(path).concat('aaa')} component={Input} />
      <FormItem name={FormPath.parse(path).concat('bbb')} component={Input} />
      <FormItem name="ccc" component={Input} />
      <FormItem name="ddd" component={Input} />
    </>
  )
})
```

在这段伪代码中，我们主要使用了两个核心 API，主要是 useFormEffects 和 InternalField，useFormEffects 给开发者提供了局部写 effects 逻辑的地方这样就能很方便的复用 effects 逻辑，InternalField 则就是@formily/react 的 Field 组件，这个可以具体看看@formily/react 的文档，因为 SchemaForm 内部也是使用的@formily/react，所以可以共享同一个 Context，所以我们就能很方便的在自定义组件内使用 InternalField，同时需要注意一点，**直接使用 InternalField 的时候，我们注册的 name 是根级别的 name，如果想要复用当前自定义组件的路径，可以借助 FormPath 解析路径，然后再 concat 即可。**

### API

---

> 整体 API 完全继承@formily/core 与@formily/react，下面只列举@formily/react-schema-renderer 的特有 API

#### connect

> 自定义组件注册桥接器，这是一个高阶组件函数(HOC)，主要用于快速接入大多数组件库组件(实现了 value/onChange API 的组件)

**签名**

```typescript
connect(options?: IConnectOptions): (
   component : React.JSXElementConstructor<any>
)=>(
   fieldProps:ISchemaFieldComponentProps
)=>JSX.Element
```

**用法**

```typescript
import { registerFormField, connect } from '@formily/react-schema-renderer'
import { Select } from 'antd'
registerFormField('select', connect()(Select))
```

#### registerFormField

> 注册自定义组件函数

**签名**

```typescript
registerFormField(
  name:string,
  component: React.JSXElementConstructor<ISchemaFieldComponentProps>
)
```

#### registerFormFields

> 批量注册自定义组件

**签名**

```typescript
registerFormFields(
  fieldsMap: {
    [key : string]: React.JSXElementConstructor<ISchemaFieldComponentProps>
  }
)
```

#### registerFormComponent

> 注册 Form 样式组件

**签名**

```typescript
registerFormComponent<Props>(
  component:React.JSXElementConstructor<Props>
)
```

#### registerFormItemComponent

> 注册 FormItem 样式组件

**签名**

```typescript
registerFormItemComponent(
  component:React.JSXElementConstructor<ISchemaFieldComponentProps>
)
```

#### registerVirtualBox

> 注册虚拟盒子组件，主要用于在 JSON Schema 中描述布局

**签名**

```typescript
registerVirtualBox(
  name:string,
  component:React.JSXElementConstructor<ISchemaVirtualFieldComponentProps>
)
```

#### createVirtualBox

> 创建一个虚拟盒子组件，返回的组件可以在 SchemaMarkupForm 中直接使用

**签名**

```typescript
createVirtualBox<Props>(
  name:string,
  component:React.JSXElementConstructor<Props>
) : React.FC<Props>
```

**用法**

```tsx
import React from 'react'
import {
  SchemaMarkupForm as SchemaForm,
  SchemaMarkupField as Field,
  createVirtualBox
} from '@formily/react-schema-renderer'
import { Card } from 'antd'

const FormCard = createVirtualBox('card', props => {
  return <Card {...props} />
})

export default () => (
  <SchemaForm>
    <FormCard title="This is card">
      <Field name="aaa" type="string" />
    </FormCard>
  </SchemaForm>
)
```

#### createControllerBox

> 创建一个虚拟盒子组件，返回的组件可以在 SchemaMarkupForm 中直接使用，它与 createVirtualBox 的不同主要是组件接收的 props
> createVirtualBox 接收的 props 就是最简单的组件 props
> createControllerBox 接收的是`ISchemaVirtualFieldComponentProps`

**签名**

```typescript
createControllerBox<Props>(
  name:string,
  component:React.JSXElementConstructor<ISchemaVirtualFieldComponentProps>
) : React.FC<Props>
```

**用法**

```tsx
import React from 'react'
import {
  SchemaMarkupForm as SchemaForm,
  SchemaMarkupField as Field,
  createControllerBox
} from '@formily/react-schema-renderer'
import { Card } from 'antd'

const FormCard = createControllerBox('card', ({ schema, children }) => {
  return <Card {...schema.getExtendsComponentProps()}>{children}</Card>
})

export default () => (
  <SchemaForm>
    <FormCard title="This is card">
      <Field name="aaa" type="string" />
    </FormCard>
  </SchemaForm>
)
```

#### getRegistry

> 获取注册中心，所有通过 registerFormXXX API 注册的组件都统一在 registry 中管理

**签名**

```typescript
getRegistry(): ISchemaFormRegistry
```

#### cleanRegistry

> 清空注册中心，清除所有通过 registerFormXXX API 注册的组件

**签名**

```typescript
cleanRegistry(): void
```

### Classes

> 整体 Class 完全继承@formily/core，比如 FormPath 与 FormLifeCyle，下面只列举@formily/react-schema-renderer 特有的 Class

#### new Schema(json : ISchema)

> Schema 解析引擎，给定一份满足 JSON Schema 的数据，我们会将其解析成对应的 Schema 实例，可以借助一些工具方法快速处理一些事情，同时该 Schema Class 提供了统一的协议差异抹平能力，保证协议升级的时候可以无缝平滑升级

**属性**

| 属性名               | 描述                                   | 类型                                                                                                              |
| -------------------- | -------------------------------------- | ----------------------------------------------------------------------------------------------------------------- |
| title                | 字段标题                               | `React.ReactNode`                                                                                                 |
| name                 | 字段所属的父节点属性名                 | `string`                                                                                                          |
| description          | 字段描述                               | `React.ReactNode`                                                                                                 |
| default              | 字段默认值                             | `any`                                                                                                             |
| readOnly             | 是否只读与 editable 一致               | `boolean`                                                                                                         |
| type                 | 字段类型                               | `'string' | 'object' | 'array' | 'number' | string`                                                               |
| enum                 | 枚举数据                               | `Array<string | number | { label: React.ReactNode, value: any }>`                                                 |
| const                | 校验字段值是否与 const 的值相等        | `any`                                                                                                             |
| multipleOf           | 校验字段值是否可被 multipleOf 的值整除 | `number`                                                                                                          |
| maximum              | 校验最大值(大于)                       | `number`                                                                                                          |
| exclusiveMaximum     | 校验最大值（大于等于）                 | `number`                                                                                                          |
| minimum              | 校验最小值(小于)                       | `number`                                                                                                          |
| exclusiveMinimum     | 最小值（小于等于）                     | `number`                                                                                                          |
| maxLength            | 校验最大长度                           | `number`                                                                                                          |
| minLength            | 校验最小长度                           | `number`                                                                                                          |
| pattern              | 正则校验规则                           | `string | RegExp`                                                                                                 |
| maxItems             | 最大条目数                             | `number`                                                                                                          |
| minItems             | 最小条目数                             | `number`                                                                                                          |
| uniqueItems          | 是否校验重复                           | `boolean`                                                                                                         |
| maxProperties        | 最大属性数量                           | `number`                                                                                                          |
| minProperties        | 最小属性数量                           | `number`                                                                                                          |
| required             | 必填                                   | `boolean`                                                                                                         |
| format               | 正则规则类型                           | `InternalFormats`                                                                                                 |
| properties           | 对象属性                               | `{[key : string]:Schema}`                                                                                         |
| items                | 数组描述                               | `Schema | Schema[]`                                                                                               |
| additionalItems      | 额外数组元素描述                       | `Schema`                                                                                                          |
| patternProperties    | 动态匹配对象的某个属性的 Schema        | `{[key : string]:Schema}`                                                                                         |
| additionalProperties | 匹配对象额外属性的 Schema              | `Schema`                                                                                                          |
| editable             | 字段是否可编辑                         | `boolean`                                                                                                         |
| visible              | 字段是否可见(数据+样式)                | `boolean`                                                                                                         |
| display              | 字段样式是否可见                       | `boolean`                                                                                                         |
| x-props              | 字段扩展属性                           | `{ [name: string]: any }`                                                                                         |
| x-index              | 字段顺序                               | `number`                                                                                                          |
| x-rules              | 字段校验规则                           | `ValidatePatternRules`                                                                                            |
| x-component          | 字段 UI 组件                           | `string`                                                                                                          |
| x-component-props    | 字段 UI 组件属性                       | `{}`                                                                                                              |
| x-render             | 字段扩展渲染函数                       | `<T = ISchemaFieldComponentProps>(props: T & { renderComponent: () => React.ReactElement}) => React.ReactElement` |
| x-effect             | 字段副作用触发器                       | `(dispatch: (type: string, payload: any) => void,option?:object) => { [key: string]: any }`                       |
| x-linkages           | 字段间联动协议，详细描述可以往后看     | `Array<{ target: FormPathPattern, type: string, [key: string]: any }>`                                            |
| x-mega-props         | 字段布局属性                           | `{ [name: string]: any }`                                                                                         |

**方法**

##### `get`

> 根据数据路径获取 Schema 子节点

签名

```typescript
get(path?: FormPathPattern): Schema
```

用法

```typescript
const schema = new Schema({
  type: 'object',
  properties: {
    array: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          input: {
            type: 'string'
          }
        }
      }
    }
  }
})

schema.get('array[0].input') //{type:"string"}
```

##### `merge`

> 合并 Schema

签名

```typescript
merge(spec:ISchema): Schema
```

用法

```typescript
const schema = new Schema({
  type: 'object',
  properties: {
    array: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          input: {
            type: 'string'
          }
        }
      }
    }
  }
})

schema.merge({
  title: 'root object'
})
/**
{
  type:"object",
  title:"root object",
  properties:{
    array:{
      type:'array',
      items:{
        type:'object',
        properties:{
          input:{
            type:'string'
          }
        }
      }
    }
  }
}
**/
```

##### `getEmptyValue`

> 基于 Schema 的 type 获取当前 Schema 的空值

签名

```typescript
getEmptyValue() : '' | [] | {} | 0
```

用法

```typescript
const schema = new Schema({
  type: 'object',
  properties: {
    array: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          input: {
            type: 'string'
          }
        }
      }
    }
  }
})

schema.get('array.0.input').getEmptyValue() // ''
schema.get('array.0').getEmptyValue() // {}
schema.get('array').getEmptyValue() // []
schema.getEmptyValue() // {}
```

##### `getSelfProps`

> 获取无嵌套 Schema 属性(不会包含 properties/items 这类嵌套属性)

签名

```typescript
getSelfProps() : ISchema
```

用法

```typescript
const schema = new Schema({
  type: 'object',
  properties: {
    array: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          input: {
            type: 'string'
          }
        }
      }
    }
  }
})

schema.getSelfProps() // { type:"object" }
```

##### `getExtendsRules`

> 获取扩展校验规则，该方法比较复杂，会解析当前 Schema 的所有校验类型的属性与 x-rules 属性，最终合并为一个统一的 rules 结构

签名

```typescript
getExtendsRules() : ValidateArrayRules
```

用法

```typescript
const schema = new Schema({
  type:"string",
  required:true,
  maxLength:10
  "x-rules":{
    pattern:/^\d+$/
  }
})

schema.getExtendsRules() // [{required:true},{max:10},{pattern:/^\d+$/}]
```

##### `getExtendsRequired`

> 获取是否必填，其实就是读取 Schema 的 required 属性，为什么封装成方法，是为了保证协议升级的时候对用户无感知，我们只需要保证方法的向后兼容即可

签名

```typescript
getExtendsRequired(): void | boolean
```

用法

```typescript
const schema = new Schema({
  type:"string",
  required:true,
  maxLength:10
  "x-rules":{
    pattern:/^\d+$/
  }
})

schema.getExtendsRequired() // true
```

##### `getExtendsEditable`

> 获取 Schema 的 editable 状态，与 getExtendsEditable 能力一致，也是为了抹平协议差异

签名

```typescript
getExtendsEditable() : void | boolean
```

用法

```typescript
const schema1 = new Schema({
  type: 'string',
  editable: false
})

schema1.getExtendsEditable() // false

const schema2 = new Schema({
  type: 'string',
  readOnly: true
})

schema2.getExtendsEditable() // false

const schema3 = new Schema({
  type: 'string',
  'x-props': {
    editable: false
  }
})

schema3.getExtendsEditable() // false

const schema4 = new Schema({
  type: 'string',
  'x-component-props': {
    editable: false
  }
})

schema4.getExtendsEditable() // false
```

##### `getExtendsVisible`

> 获取数据样式可见属性

签名

```typescript
getExtendsVisible(): boolean
```

##### `getExtendsDisplay`

> 获取样式可见属性

签名

```
getExtendsDisplay() : boolean
```

##### `getExtendsTriggerType`

> 获取 triggerType，与 getExtendsEditable 能力一致，都是提供协议差异抹平的能力

签名

```typescript
getExtendsTriggerType() : 'onBlur' | 'onChange' | string
```

用法

```typescript
const schema1 = new Schema({
  type: 'string',
  'x-props': {
    triggerType: 'onBlur'
  }
})

schema1.getExtendsTriggerType() // onBlur

const schema2 = new Schema({
  type: 'string',
  'x-component-props': {
    triggerType: 'onBlur'
  }
})

schema2.getExtendsTriggerType() // onBlur

const schema3 = new Schema({
  type: 'string',
  'x-item-props': {
    triggerType: 'onBlur'
  }
})

schema3.getExtendsTriggerType() // onBlur
```

##### `getExtendsProps`

> 获取 x-props 属性

签名

```typescript
getExtendsProps() : {}
```

##### `getExtendsComponent`

> 获取 x-component 属性

签名

```typescript
getExtendsComponent() : string
```

##### `getExtendsComponentProps`

> 获取 x-component-props 属性，也就是 x-component 的组件属性

签名

```typescript
getExtendsComponentProps() : {}
```

##### `getExtendsRenderer`

> 获取 x-render 属性

签名

```typescript
getExtendsRenderer() : <T = ISchemaFieldComponentProps>(
    props: T & {
      renderComponent: () => React.ReactElement
    }
  ) => React.ReactElement
```

##### `getExtendsEffect`

> 获取 x-effect 属性

签名

```typescript
getExtendsEffect() : (
    dispatch: (type: string, payload: any) => void,
    option?: object
) => { [key: string]: any }
```

##### `setProperty`

> 给当前 Schema 设置 properties

签名

```typescript
setProperty(key: string, schema: ISchema): Schema
```

##### `setProperties`

> 给当前 Schema 批量设置 properties

签名

```typescript
setProperties(properties: {[key : string]:ISchema}) : {[key : string]:Schema}
```

##### `setArrayItems`

> 给当前 Schema 设置 items 属性

签名

```typescript
setArrayItems(schema:Ischema) : Schema
```

##### `getOrderProperties`

> 按照 x-index 顺序给出所有 properties

签名

```typescript
getOrderProperties() : {schema:Schema,key:string}[]
```

##### `mapProperties`

> 按顺序(x-index)遍历 Schema 的 properties 属性

签名

```typescript
mapProperties(callback?: (schema: Schema, key: string) => any):any[]
```

##### `toJSON`

> 输出无循环依赖 json 数据结构

签名

```
toJSON() : ISchema
```

##### `fromJSON`

> 基于一份 json 解析生成 Schema 对象

签名

```typescript
fromJSON(json : ISchema) : Schema
```

##### `isObject`

> 判断当前 Schema 是否是 object 类型

签名

```
isObject() : boolean
```

##### `isArray()`

> 判断当前 Schema 是否是 array 类型

签名

```
isArray() : boolean
```

### Components

---

> 整体组件完全继承@formily/react，下面只列举@formily/react-schema-renderer 特有的组件

#### `<SchemaForm/>`

> 最核心的 JSON Schema 渲染组件

**属性**

```typescript
interface ISchemaFormProps<
  Value = any,
  DefaultValue = any,
  FormEffectPayload = any,
  FormActions = ISchemaFormActions | ISchemaFormAsyncActions
> {
  //表单值
  value?: Value
  //表单默认值
  defaultValue?: DefaultValue
  //表单默认值，弱受控
  initialValues?: DefaultValue
  //表单actions
  actions?: FormActions
  //表单effects
  effects?: IFormEffect<FormEffectPayload, FormActions>
  //form实例
  form?: IForm
  //表单变化回调
  onChange?: (values: Value) => void
  //表单提交回调
  onSubmit?: (values: Value) => void | Promise<Value>
  //表单重置回调
  onReset?: () => void
  //表单校验失败回调
  onValidateFailed?: (valideted: IFormValidateResult) => void
  //表单子节点
  children?: React.ReactElement
  //是否开启脏检查
  useDirty?: boolean
  //是否可编辑
  editable?: boolean | ((name: string) => boolean)
  //是否开启悲观校验，遇到第一个校验失败，则停止剩余校验
  validateFirst?: boolean
  //Form Schema对象
  schema?: ISchema
  //实例级注册自定义组件
  fields?: ISchemaFormRegistry['fields']
  //实例级注册虚拟盒子组件
  virtualFields?: ISchemaFormRegistry['virtualFields']
  //实例级注册Form样式组件
  formComponent?: ISchemaFormRegistry['formComponent']
  //实例级注册FormItem样式组件
  formItemComponent?: ISchemaFormRegistry['formItemComponent']
}
```

#### `<SchemaField/>`

> 基于一个 Data Path，自动寻找 Schema 节点并渲染的内部组件，主要用于在自定义组件内实现递归渲染

**属性**

```typescript
interface ISchemaFieldProps {
  //数据路径
  path?: FormPathPattern
}
```

#### `<SchemaMarkupForm/>`

> 让 SchemaForm 支持 jsx 标签式写法的 Form 组件，需要配合 SchemaMarkupField 一起使用

**属性**

```typescript
interface ISchemaFormProps<
  Value = any,
  DefaultValue = any,
  FormEffectPayload = any,
  FormActions = ISchemaFormActions | ISchemaFormAsyncActions
> {
  //表单值
  value?: Value
  //表单默认值
  defaultValue?: DefaultValue
  //表单默认值，弱受控
  initialValues?: DefaultValue
  //表单actions
  actions?: FormActions
  //表单effects
  effects?: IFormEffect<FormEffectPayload, FormActions>
  //form实例
  form?: IForm
  //表单变化回调
  onChange?: (values: Value) => void
  //表单提交回调
  onSubmit?: (values: Value) => void | Promise<Value>
  //表单重置回调
  onReset?: () => void
  //表单校验失败回调
  onValidateFailed?: (valideted: IFormValidateResult) => void
  //表单子节点
  children?: React.ReactElement
  //是否开启脏检查
  useDirty?: boolean
  //是否可编辑
  editable?: boolean | ((name: string) => boolean)
  //是否开启悲观校验，遇到第一个校验失败，则停止剩余校验
  validateFirst?: boolean
  //Form Schema对象
  schema?: ISchema
  //实例级注册自定义组件
  fields?: ISchemaFormRegistry['fields']
  //实例级注册虚拟盒子组件
  virtualFields?: ISchemaFormRegistry['virtualFields']
  //实例级注册Form样式组件
  formComponent?: ISchemaFormRegistry['formComponent']
  //实例级注册FormItem样式组件
  formItemComponent?: ISchemaFormRegistry['formItemComponent']
}
```

**用法**

```tsx
import {
  SchemaMarkupForm as SchemaForm,
  SchemaMarkupField as Field
} from '@formily/react-schema-renderer'

export default () => {
  return (
    <SchemaForm>
      <Field name="aa" type="string" />
    </SchemaForm>
  )
}
```

#### `<SchemaMarkupField/>`

> 让 SchemaForm 支持 jsx 标签式写法的 Field 组件，需要配合 SchemaMarkupForm 一起使用

**属性**

```typescript
type IMarkupSchemaFieldProps = ISchema
```

#### `<InternalForm/>`

> 核心 Form，与@formily/react 中的 Form 组件一样

#### `<InternalField/>`

> 核心 Field，与@formily/react 中的 Field 组件一样，主要用于复杂自定义组件内使用

### Interfaces

---

> 整体继承@formily/react 和@formily/core 的 Interfaces，下面只列举@formily/react-schema-renderer 特有 Interfaces

#### IConnectOptions

> 注册组件桥接器参数

```typescript
interface IConnectOptions {
  valueName?: string //值名称，默认是value
  eventName?: string //取值回调名称，默认是onChange
  defaultProps?: {} //自定义组件默认属性
  getValueFromEvent?: (event?: any, value?: any) => any //取值回调处理器，主要用于针对事件参数到最终触发onChange的值做转换合并
  getProps?: (
    //组件属性转换器，使用它可以轻松的处理从FieldProps到ComponentProps的转换映射等工作
    componentProps: {},
    fieldProps: MergedFieldComponentProps
  ) => {} | void
  getComponent?: (
    //组件转换器，有些场景，根据FieldState，会将组件做动态切换，比如根据editable，会动态切换为文本预览组件之类的
    Target: any,
    componentProps: {},
    fieldProps: MergedFieldComponentProps
  ) => React.JSXElementConstructor<any>
}
```

#### ISchemaFieldComponentProps

> 自定义组件所接收的属性，非常重要，只要涉及开发自定义组件，都需要了解该协议

```typescript
interface ISchemaFieldComponentProps {
  //状态名称，FieldState
  displayName?: string
  //数据路径
  name: string
  //节点路径
  path: string
  //是否已经初始化
  initialized: boolean
  //是否处于原始态，只有value===intialValues时的时候该状态为true
  pristine: boolean
  //是否处于合法态，只要errors长度大于0的时候valid为false
  valid: boolean
  //是否处于非法态，只要errors长度大于0的时候valid为true
  invalid: boolean
  //是否处于校验态
  validating: boolean
  //是否被修改，如果值发生变化，该属性为true，同时在整个字段的生命周期内都会为true
  modified: boolean
  //是否被触碰
  touched: boolean
  //是否被激活，字段触发onFocus事件的时候，它会被触发为true，触发onBlur时，为false
  active: boolean
  //是否访问过，字段触发onBlur事件的时候，它会被触发为true
  visited: boolean
  //是否可见，注意：该状态如果为false，那么字段的值不会被提交，同时UI不会显示
  visible: boolean
  //是否展示，注意：该状态如果为false，那么字段的值会提交，UI不会展示，类似于表单隐藏域
  display: boolean
  //是否可编辑
  editable: boolean
  //是否处于loading状态，注意：如果字段处于异步校验时，loading为true
  loading: boolean
  //字段多参值，比如字段onChange触发时，给事件回调传了多参数据，那么这里会存储所有参数的值
  values: any[]
  //字段错误消息
  errors: string[]
  //字段告警消息
  warnings: string[]
  //字段值，与values[0]是恒定相等
  value: any
  //初始值
  initialValue: any
  //校验规则，具体类型描述参考后面文档
  rules: ValidatePatternRules[]
  //是否必填
  required: boolean
  //是否挂载
  mounted: boolean
  //是否卸载
  unmounted: boolean
  //字段扩展属性，在SchemaForm下就是ISchema结构
  props: ISchema
  //当前字段的schema对象
  schema: Schema
  //当前字段的数据操作函数集
  mutators: IMutators
  //form实例
  form: IForm
  //递归渲染函数
  renderField: (
    addtionKey: string | number,
    reactKey?: string | number
  ) => React.ReactElement
}
```

#### ISchemaVirtualFieldComponentProps

> 虚拟字段组件所接收的属性，只要涉及注册虚拟字段的，都需要了解该协议

```typescript
interface ISchemaVirtualFieldComponentProps {
  //状态名称，VirtualFieldState
  displayName: string
  //字段数据路径
  name: string
  //字段节点路径
  path: string
  //是否已经初始化
  initialized: boolean
  //是否可见，注意：该状态如果为false，UI不会显示，数据也不会提交(因为它是VirtualField)
  visible: boolean
  //是否展示，注意：该状态如果为false，UI不会显示，数据也不会提交(因为它是VirtualField)
  display: boolean
  //是否已挂载
  mounted: boolean
  //是否已卸载
  unmounted: boolean
  //字段扩展属性
  props: ISchema
  //当前字段的schema对象
  schema: Schema
  //form实例
  form: IForm
  //子元素
  children: React.ReactElement[]
  //递归渲染函数
  renderField: (
    addtionKey: string | number,
    reactKey?: string | number
  ) => React.ReactElement
}
```

#### ISchemaFormRegistry

> 组件注册中心，不管是普通字段，还是虚拟字段，还是 Form/FormItem 都会注册在这里

```typescript
interface ISchemaFormRegistry {
  fields: {
    [key: string]: React.JSXElementConstructor<ISchemaFieldComponentProps>
  }
  virtualFields: {
    [key: string]: React.JSXElementConstructor<
      ISchemaVirtualFieldComponentProps
    >
  }
  formItemComponent: React.JSXElementConstructor<ISchemaFieldComponentProps>
  formComponent: string | React.JSXElementConstructor<any>
}
```

#### ISchema

> Schema 协议对象，主要用于约束一份 json 结构满足 Schema 协议

```typescript
interface ISchema {
  /** base json schema spec**/
  title?: React.ReactNode
  description?: React.ReactNode
  default?: any
  readOnly?: boolean
  writeOnly?: boolean
  type?: 'string' | 'object' | 'array' | 'number' | string
  enum?: Array<string | number | { label: React.ReactNode; value: any }>
  const?: any
  multipleOf?: number
  maximum?: number
  exclusiveMaximum?: number
  minimum?: number
  exclusiveMinimum?: number
  maxLength?: number
  minLength?: number
  pattern?: string | RegExp
  maxItems?: number
  minItems?: number
  uniqueItems?: boolean
  maxProperties?: number
  minProperties?: number
  required?: string[] | boolean
  format?: string
  /** nested json schema spec **/
  properties?: {
    [key: string]: ISchema
  }
  items?: ISchema | ISchema[]
  additionalItems?: ISchema
  patternProperties?: {
    [key: string]: ISchema
  }
  additionalProperties?: ISchema
  /** extend json schema specs */
  editable?: boolean
  //数据与样式是否可见
  visible?: boolean
  //样式是否可见
  display?: boolean
  ['x-props']?: { [name: string]: any }
  ['x-index']?: number
  ['x-rules']?: ValidatePatternRules
  ['x-component']?: string
  ['x-component-props']?: { [name: string]: any }
  ['x-render']?: <T = ISchemaFieldComponentProps>(
    props: T & {
      renderComponent: () => React.ReactElement
    }
  ) => React.ReactElement
  ['x-effect']?: (
    dispatch: (type: string, payload: any) => void,
    option?: object
  ) => { [key: string]: any }
}
```

#### ISchemaFormActions

> 核心 actions 继承@formily/react 的 IFormActions，主要增加了 getSchema API

```typescript
interface ISchemaFormActions extends IFormActions {
  getSchema(): Schema
  getFormSchema(): Schema
}
```

#### ISchemaFormAsyncActions

> 核心 actions 继承@formily/react 的 IFormAsyncActions，主要增加了 getSchema API

```typescript
interface ISchemaFormAsyncActions extends IFormAsyncActions {
  getSchema(): Promise<Schema>
  getFormSchema(): Promise<Schema>
}
```

#### IFormValidateResult

> 校验结果

```typescript
interface IFormValidateResult {
  errors: Array<{
    path: string
    messages: string[]
  }>
  warnings: Array<{
    path: string
    messages: string[]
  }>
}
```

#### InternalFormats

> 内置格式校验集

```typescript
type InternalFormats =
  | 'url'
  | 'email'
  | 'ipv6'
  | 'ipv4'
  | 'idcard'
  | 'taodomain'
  | 'qq'
  | 'phone'
  | 'money'
  | 'zh'
  | 'date'
  | 'zip'
  | string
```

#### ValidateDescription

> 原始校验描述

```typescript
interface ValidateDescription {
  //正则规则类型
  format?: InternalFormats
  //自定义校验规则
  validator?: CustomValidator
  //是否必填
  required?: boolean
  //自定以正则
  pattern?: RegExp | string
  //最大长度规则
  max?: number
  //最大数值规则
  maximum?: number
  //封顶数值规则
  exclusiveMaximum?: number
  //封底数值规则
  exclusiveMinimum?: number
  //最小数值规则
  minimum?: number
  //最小长度规则
  min?: number
  //长度规则
  len?: number
  //是否校验空白符
  whitespace?: boolean
  //枚举校验规则
  enum?: any[]
  //自定义错误文案
  message?: string
  //自定义校验规则
  [key: string]: any
}
```

#### ValidateResponse

```typescript
type SyncValidateResponse =
  | null
  | string
  | boolean
  | {
      type?: 'error' | 'warning'
      message: string
    }
type AsyncValidateResponse = Promise<SyncValidateResponse>
type ValidateResponse = SyncValidateResponse | AsyncValidateResponse
```

#### CustomValidator

> 自定义校验函数

```typescript
type CustomValidator = (
  value: any,
  description?: ValidateDescription
) => ValidateResponse
```

#### ValidatePatternRules

> 校验规则集

```typescript
type ValidatePatternRules =
  | InternalFormats
  | CustomValidator
  | ValidateDescription
  | Array<InternalFormats | CustomValidator | ValidateDescription>
```
