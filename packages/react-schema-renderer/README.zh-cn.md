# @uform/react-schema-renderer
> Schema渲染引擎，该包主要依赖了@uform/react，它的职责很简单，核心就做了两件事情：
>
> - 解析Form Schema协议，递归渲染
> - 管理自定义组件

### 安装

```bash
npm install --save @uform/react-schema-renderer
```

### 目录

<!-- toc -->

### 使用方式
---

#### 快速开始

如果您是直接基于@uform/react-schema-renderer做开发的，那么您必须在开发前将自定义组件注册到渲染器里去，否则，我们的JSON-Schema协议是不能渲染表单的。所以：

```jsx
import React from 'react'
import { SchemaForm, registerFormField,connect } from '@uform/react-schema-renderer'

registerFormField('string',connect()(({value,onChange})=>{
  return <input value={value} onChange={onChange} />
}))

export default ()=>{
  return (
    <SchemaForm 
      schema={{
        type:"object",
          properties:{
            input:{
              type:"string"
            }
          }
      }} 
      onChange={console.log} //{input:'this is your input string'}
    />
  )
}
```

大工告成，这个就是最简单的用法，核心就是注册组件，然后使用协议渲染。**需要注意一点是，我们在注册组件的时候使用了connect函数，这个connect函数的功能就是，让任意一个组件，只要支持value/onChange API的，都可以快速注册到SchemaForm里面去，同时，connect函数也屏蔽了Field API，所以使用了connect函数的组件，是不能做更加强大的扩展的，详细的connect API后面会有介绍**。同时，还有一个要注意的就是，如果我们要接入一套组件库的，业内大多数组件库其实都是有自己的Form和FormItem组件的，他们核心是用于控制样式，FormItem控制表单局部样式，Form控制全局表单样式，所以在生产环境下，其实我们还需要注册Form和FormItem组件，这样才能做到样式与原有解决方案的一致性，具体如何注册，我们会在后面有详细介绍。

#### JSON Schema驱动表单渲染

说到JSON Schema，上面一个例子其实已经涉及了，当然，它并不够复杂，我们看一个较为复杂的例子：

```tsx
import React from 'react'
import { SchemaForm } from '@uform/react-schema-renderer'

registerFormField('string',connect()(({value,onChange})=>{
  return <input value={value} onChange={onChange} />
}))

registerFormField('array',()=>{
  return //...
})

export default ()=>{
  return (
     <SchemaForm 
       schema={{
        type:"object",
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
      }}
      onChange={console.log} //{array:[{input:'This is your input string'}]}
     />
  )
}
```

上面的代码是一段伪代码，因为我们并没有注册array类型的自定义组件，这里先暂时不讲如何注册array类型的自定义组件，我们核心是分析JSON Schema是如何驱动表单渲染的。在这份JSON Schema中，我们主要使用了properties和items属性用来描述复杂数据结构，这就是JSON Schema最核心的特性，注意：**在SchemaForm中，内置了object的properties的递归渲染，但是并没有内置array的items递归渲染**，主要原因是，array的递归渲染会涉及很多样式需求，并不方便内置，所以最好还是留给开发者自己实现，所以，后面我们会详细介绍如何实现自增列表的递归渲染需求。

#### JSchema驱动表单渲染

JSchema就是在jsx中以一种更优雅的写法来描述JSON Schema，我们可以针对以上例子用JSchema实现一版：

```tsx
import React from 'react'
import { 
  SchemaMarkupForm as SchemaForm,
  SchemaMarkupField as Field 
} from '@uform/react-schema-renderer'

export default ()=>{
  return (
     <SchemaForm 
      onChange={console.log} //{array:[{input:'This is your input string'}]}
     >
       <Field type="array" name="array">
         <Field type="object">
           <Field type="string" name="input"/>
         </Field>
       </Field>
    </SchemaForm>
  )
}
```

可以看到，使用JSchema在代码中描述JSON Schema比起JSON而言变得更加优雅了，大大的提高了代码可维护性。

#### 非单例注册组件

在前面的例子中，我们使用了registerFormField API来注册了自定义组件，这种方式是单例注册的方式，它的主要优点就是方便，但是也会存在一些问题，就是单例容易受污染，特别是在SPA页面中，如果不同页面的开发者是不一样的，因为共享同一个内存环境，那么A开发者可能会注册B开发者同名的自定义组件，这样就很容易导致线上故障，所以，我们更加推荐用户使用非单例注册方式：

```jsx
import React,{ useMemo } from 'react'
import { SchemaForm, registerFormField,connect } from '@uform/react-schema-renderer'

const StringField = connect()(({value,onChange})=>{
  return <input value={value} onChange={onChange} />
})

const useFields = ()=>useMemo(()=>{
  string:StringField
})

export default ()=>{
  return (
    <SchemaForm 
      fields={
        useFields()
      }
      schema={{
        type:"object",
          properties:{
            input:{
              type:"string"
            }
          }
      }} 
      onChange={console.log} //{input:'this is your input string'}
    />
  )
}
```

在上面的例子中，我们主要是在SchemaForm的props维度来传递自定义组件，这样就能保证是实例级注册了，这样的形式对SPA非常友好，同时，**需要注意的是我们抽象了一个useFields的React Hook，它主要用于解决组件多次渲染的时候不会影响React Virtual DOM重新计算，从而避免表单组件重复渲染**。

### 高级教程
---

#### 如何接入第三方组件库？

因为@uform/react-schema-renderer是一个基础库，默认不会集成任何组件库的，所以我们在实际业务开发中，如果要基于它来定制，那么就必须得面对接入第三方组件库的问题。如何接入第三方组件库，我们分为以下几步：

- 接入Form/FormItem组件
- 接入组件库表单组件
- 实现表单布局组件
- 实现自增列表组件

下面就让我们一步步的来接入第三方组件库吧！这里我们主要以antd组件库为例子。

#### 如何接入Form/FormItem组件？

接入方式目前提供了全局注册机制与单例注册机制，全局注册主要使用registerFormComponent和registerFormItemComponent两个API来注册，单例注册则是直接在SchemaForm属性上传formComponent和formItemComponent。如果是SPA场景，推荐使用单例注册的方式，下面看看例子：

```tsx
import React from 'react'
import {
  SchemaForm,
  registerFormComponent,
  registerFormItemComponent
} from '@uform/react-schema-renderer'
import { Form } from 'antd'

export const CompatFormComponent = ({children,...props})=>{
  return <Form {...props}>{children}</Form> //很简单的使用Form组件，props是SchemaForm组件的props，这里会直接透传
})

export const CompatFormItemComponent = ({children,...props})=>{
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
      help={messages.length ? messages : props.schema && props.schema.description}
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
export default ()=>{
  return (
    <SchemaForm 
       formComponent={CompatFormComponent}
       formItemComponent={CompatFormItemComponent}
    />
}

```

我们可以看到，扩展表单整体或局部的样式，仅仅只需要通过扩展Form/FormItem组件就可以轻松解决了，这里需要注意的是，FormItem组件接收到的props有点复杂，不用担心，后面会列出详细props API，现在我们只需要知道大概是如何注册的就行了。

#### 如何接入表单组件？

因为组件库的所有组件都是原子型组件，同时大部分都兼容了value/onChange规范，所以我们可以借助connect函数快速接入组件库的组件，通常，我们接入组件库组件，大概要做3件事情：

- 处理状态映射，将uform内部的loading/error状态映射到该组件属性上，当然，**前提是要求组件必须支持loading或error这类的样式**
- 处理详情态样式，将uform内部的editable状态，映射到一个PreviewText组件上去，用于更友好更干净的展示数据
- 处理组件枚举态，我们想一下，**JSON Schema，每一个节点都应该支持enum属性的**，如果配了enum属性，我们最好都以Select形式来展现，所以我们需要处理一下组件枚举态

咱们以InputNumber为例演示一下：

```tsx
import React from 'react'
import { connect, registerFormField } from '@uform/react-schema-renderer'
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
    getProps: mapStyledProps,//处理状态映射
    getComponent: mapTextComponent//处理详情态
  })(acceptEnum(InputNumber))//处理枚举态
)

```

在这个例子中，我们深度使用了connect函数，其实connect就是一个HOC，在渲染阶段，它可以在组件渲染过程中加入一些中间处理逻辑，帮助动态分发。当然，connect还有很多API，后面会详细介绍。

#### 如何处理表单布局？

JSON Schema描述表单数据结构，其实是天然支持的，但是表单最终还是落在UI层面的，可惜在UI层面上我们有很多组件其实并不能作为JSON Schema的一个具体数据节点，它仅仅只是一个UI节点。所以，想要在JSON Schema中描述复杂布局，怎么做？

现在uform的做法是，抽象了一个叫**虚拟节点**的概念，用户在代码层面上指定某个JSON Schema x-component为虚拟节点之后，后面不管是在渲染，还是在数据处理，还是最终数据提交，只要解析到这个节点是虚拟节点，都不会将它当做一个正常的数据节点。所以，有了这个虚拟节点的概念，我们就可以在JSON Schema中描述各种复杂布局，下面让我们试着写一个布局组件：

```tsx
import React from 'react'
import { SchemaForm,registerVirtualBox } from '@uform/react-schema-renderer'
import { Card } from 'antd'

registerVirtualBox('card',({children,...props})=>{
   return <Card {...props.schema.getExtendsComponentProps()}>{children}</Card>
})

export default ()=>{
  return (
    <SchemaForm 
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

从这段伪代码中我们可以看到card就是一个正常的Object Schema节点，只是需要指定一个x-component为card，这样就能和registerVirtualBox注册的card匹配上，就达到了虚拟节点的效果，所以，不管你把JSON Schema中的属性名改为什么，都不会影响最终的提交的数据结构。**这里需要注意的是x-component-props是直接透传到registerVirtualBox的回调函数参数上的。** 这是JSON Schema形式的使用，我们还有JSchema的使用方式：

```tsx
import React from 'react'
import { SchemaForm,createVirtualBox } from '@uform/react-schema-renderer'
import { Card } from 'antd'

const Card = createVirtualBox('card',({children,...props})=>{
   return <Card {...props}>{children}</Card>
})

export default ()=>{
  return (
    <SchemaForm>
       <Card title="This is Card">
         <Field type="array" name="array">
           <Field type="object">
             <Field type="string" name="input"/>
           </Field>
         </Field>
       </Card>
    </SchemaForm>
  )
}
```

从这个例子中我们可以看到，借助createVirtualBox API可以快速创建一个布局组件，同时在JSchema中直接使用。**其实createVirtualBox的内部实现很简单，还是使用了registerVitualBox和SchemaMarkupField**：

```tsx
import React from 'react'
import { SchemaMarkupField as Field } from '@uform/react-schema-renderer'
export function createVirtualBox<T = {}>(
  key: string,
  component?: React.JSXElementConstructor<React.PropsWithChildren<T>>
) {
  registerVirtualBox(
    key,
    component
      ? ({ props,schema, children }) => {
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

什么叫递归渲染组件？其实就是**实现了JSON Schema中properties和items的组件**，像`type:"string"` 这种节点就属于原子节点，不属于递归渲染组件。其实像前面说的布局组件，其实它也是属于递归渲染组件，只是它固定了渲染模式，所以可以很简单的注册。所以，我们大部分想要实现递归渲染的场景，可能更多的是在`type:"array"`这种场景才会去实现递归渲染，下面我们会详细介绍自增列表组件的实现方式。

#### 如何实现自增列表组件？

自增列表它主要有几个特点：

- 有独立样式
- 支持递归渲染子组件
- 支持数组项的新增，删除，上移，下移
- 不能使用connect函数包装，因为必须调用Field API

为了帮助大家更好的理解如何实现自增列表组件，我们就不实现具体样式了，更多的是教大家如何实现递归渲染和，数组项的操作。下面我们看伪代码：

```tsx
import React, { Fragment } from 'react'
import {
  registerFormField,
  SchemaField,
  FormPath
} from '@uform/react-schema-renderer'

//不用connect包装
registerFormField('array',({value,path,mutators})=>{
  
  const emptyUI = <button onClick={()=>{
        mutators.push()
      }}>Add Element</button>
        
  const listUI = value.map((item,index)=>{
    return (
      <div key={index}>
        <SchemaField path={FormPath.parse(path).concat(index)}/>
        <button onClick={()=>{
            mutators.remove(index)
        }}>remove</button>
        <button onClick={()=>{
            mutators.moveDown(index)
        }}>move down</button>
        <button onClick={()=>{
            mutators.moveUp(index)
        }}>move up</button>
      </div>
    )
  })
  
  return (
    value.length == 0 ? emptyUI : listUI
  )
})
```

看到了没，要实现一个带递归渲染的自增列表组件，超级简单，反而如果要实现相关的样式就会有点麻烦，总之核心就是使用了SchemaField这个组件和mutators API，具体API会在后面详细介绍。

#### 如何实现超复杂自定义组件？

这个问题，在老版UForm中基本无解，恰好也是因为我们这边的业务复杂度高到一定程度之后，我们自己被这个问题给受限制了，所以必须得想办法解决这个问题，下面我们可以定义一下，什么才是超复杂自定义组件：

- 组件内部存在大量表单组件，同时内部也存在大量联动关系
- 组件内部存在私有的服务端动态渲染方案

- 组件内部有复杂布局结构

就这3点，基本上满足超复杂自定义组件的特征了，对于这种场景，为什么我们通过正常的封装自定义组件的形式不能解决问题呢？其实主要是受限于校验，没法整体校验，所以，我们需要一个能聚合大量字段处理逻辑的能力，下面我们来看看具体方案：

```tsx
import React, { Fragment } from 'react'
import {
  registerFormField,
  SchemaField,
  FormPath,
  InternalField,
  useFormEffects,
  FormEffectHooks
} from '@uform/react-schema-renderer'
import { Input, Form } from 'antd'


const FormItem = ({component,...props})=>{
  return (
    <InternalField {...props}>
      {({state,mutators})=>{
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
            {React.createElement(component,{
              ...state.props,
              value:state.value,
              onChange:mutators.change
            })}
          </Form.Item>
        )
      }}
    </InternalField>
  )
}

//不用connect包装
registerFormField('complex',({path})=>{
   useFormEffects(({setFieldState})=>{
     FormEffectHooks.onFieldValueChange$('ccc').subscribe(({value})=>{
        if(value === '123'){
          setFieldState('ddd',state=>{
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

在这段伪代码中，我们主要使用了两个核心API，主要是useFormEffects和InternalField，useFormEffects给开发者提供了局部写effects逻辑的地方这样就能很方便的复用effects逻辑，InternalField则就是@uform/react的Field组件，这个可以具体看看@uform/react的文档，因为SchemaForm内部也是使用的@uform/react，所以可以共享同一个Context，所以我们就能很方便的在自定义组件内使用InternalField，同时需要注意一点，**直接使用InternalField的时候，我们注册的name是根级别的name，如果想要复用当前自定义组件的路径，可以借助FormPath解析路径，然后再concat即可。**



### API

---

> 整体API完全继承@uform/core与@uform/react，下面只列举@uform/react-schema-renderer的特有API

#### connect



#### registerFormField



#### registerFormFields



#### registerFormComponent



#### registerFormItemComponent



#### registerVirtualBox



#### getRegistry



#### cleanRegistry





### Classes

> 整体Class完全继承@uform/core，比如FormPath与FormLifeCyle，下面只列举@uform/react-schema-renderer特有的Class



#### new Schema()



### Components

---

> 整体组件完全继承@uform/react，下面只列举@uform/react-schema-renderer特有的组件



#### `<SchemaForm/>`



#### `<SchemaField/>`



#### `<SchemaMarkupForm/>`



#### `<SchemaMarkupField/>`



### Interfaces

---

> 整体继承@uform/react和@uform/core的Interfaces，下面只列举@uform/react-schema-renderer特有Interfaces