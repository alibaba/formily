# @formily/react-schema-renderer

English | [简体中文](./README.zh-cn.md)

> Schema rendering engine, the package mainly relies on @formily/react, its responsibilities are very simple, the core does two things:
>
> - Parse the Form Schema protocol, recursive rendering
> - Manage custom components

### Installation

```bash
npm install --save @formily/react-schema-renderer
```

### Contents

<!-- toc -->

- [Usage](#usage)
  - [`Quick start`](#quick-start)
  - [`JSON Schema driver form rendering`](#json-schema-driver-form-rendering)
  - [`JSchema driver form rendering`](#jschema-driver-form-rendering)
  - [`Non-single instance registration component`](#non-single-instance-registration-component)
- [Advanced tutorial](#advanced-tutorial)
  - [`How to access third-party component libraries?`](#how-to-access-third-party-component-libraries)
  - [`How to access the Form/FormItem component?`](#how-to-access-the-formformitem-component)
  - [`How to access form components?`](#how-to-access-form-components)
  - [`How to handle form layout?`](#how-to-handle-form-layout)
  - [`How to implement recursive rendering components?`](#how-to-implement-recursive-rendering-components)
  - [`How to implement the auto-increment list component?`](#how-to-implement-the-auto-increment-list-component)
  - [`How to implement ultra-complex custom components?`](#how-to-implement-ultra-complex-custom-components)
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
    - [`getExtendsVisible`](#getextendsvisible)
    - [`getExtendsDisplay`](#getextendsdisplay)
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
  - [IConnectOptions](#iconnectoptions)
  - [ISchemaFieldComponentProps](#ischemafieldcomponentprops)
  - [ISchemaVirtualFieldComponentProps](#ischemavirtualfieldcomponentprops)
  - [ISchemaFormRegistry](#ischemaformregistry)
  - [ISchema](#ischema)
  - [ISchemaFormActions](#ischemaformactions)
  - [ISchemaFormAsyncActions](#ischemaformasyncactions)
  - [IFormValidateResult](#iformvalidateresult)
  - [InternalFormats](#internalformats)
  - [ValidateDescription](#validatedescription)
  - [ValidateResponse](#validateresponse)
  - [CustomValidator](#customvalidator)
  - [ValidatePatternRules](#validatepatternrules)

<!-- tocstop -->

### Usage

---

#### Quick start

If you are developing directly based on @formily/react-schema-renderer, then you must register your custom component before development. Go to the renderer, otherwise our JSON-Schema protocol can't render the form. And so:

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

Great workmanship, this is the easiest way to use, the core is to register components, and then use the protocol to render.**One thing to note is that we used the connect function when registering components,The function of this connect function is to allow any component to be registered in the SchemaForm as long as it supports the value/onChange API.At the same time, the connect function also shields the Field API, so components that use the connect function cannot be more powerfully extended. The detailed connect API will be introduced later. ** At the same time, one thing to note is that if we want to access a set of component libraries, most of the component libraries in the industry have their Form and FormItem components.Their core is used to control styles, FormItem controls form local styles, and Form controls global form styles,So in a production environment, we need to register the Form and FormItem components so that the style is consistent with the original solution.How to register specifically, we will introduce in detail later.

#### JSON Schema driver form rendering

Speaking of JSON Schema, the above example has been covered. Of course, it is not complicated enough. Let's look at a more complicated example:

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

The above code is a pseudo-code because we didn't register a custom component of type array. Here we don't talk about how to register custom components of the array type. Our core is to analyze how JSON Schema drives form rendering.Note:**In SchemaForm, recursive rendering of properties of an object is built-in, but there is no recursive rendering of items with a built-in array**.The main reason is that the recursive rendering of an array involves many style requirements, which is not convenient for built-in. So it’s best to leave it to the developer to implement it yourself. So, we will detail how to implement the recursive rendering requirements of the auto-increment list.

#### JSchema driver form rendering

JSchema describes JSON Schema in a more elegant way in jsx. We can implement a version of JSchema for the above example:

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

As you can see, using JSchema to describe JSON Schema in your code is more elegant than JSON, greatly improving code maintainability.

#### Non-single instance registration component

In the previous example, we used the registerFormField API to register a custom component, which is the way to register a singleton,Its main advantage is the convenience, but there are also some problems, that is, the single case is easily contaminated, especially in the SPA page.If the developers of different pages are different, because sharing the same memory environment, then A developers may register custom components with the same name as B developers, which can easily lead to online failures.Therefore, we recommend users to use non-single registration methods:

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

In the above example, we mainly pass the custom component in the props dimension of SchemaForm, so that we can guarantee the instance-level registration. This form is very friendly to the SPA.At the same time,**It should be noted that we abstracted a React Hook of useFields, which is mainly used to solve the React Virtual DOM recalculation when the component is rendered multiple times, thus avoiding the repeated rendering of the form component.**

### Advanced tutorial

---

#### How to access third-party component libraries?

Because @formily/react-schema-renderer is a base library, no component library is integrated by default. so in actual business development, If you want to customize it based on it, you have to face the problem of accessing third-party component libraries. How to access the third-party component library, let's divide it into the following steps:

- Access the Form/FormItem component
- Access component library form component
- Implement form layout components
- Implement an auto-increment list component

Let's take a step by step access to third-party component libraries! Here we mainly use the antd component library as an example.

#### How to access the Form/FormItem component?

The access method currently provides a global registration mechanism and a singleton registration mechanism. Global registration is mainly registered using two APIs, registerFormComponent and registerFormItemComponent.Singleton registration is to upload formComponent and formItemComponent directly in the SchemaForm property. If it is a SPA scene, it is recommended to use the singleton registration method. Let's look at the example below:

```tsx
import React from 'react'
import {
  SchemaForm,
  registerFormComponent,
  registerFormItemComponent
} from '@formily/react-schema-renderer'
import { Form } from 'antd'

export const CompatFormComponent = ({ children, ...props }) => {
  return <Form {...props}>{children}</Form> //Very simple to use the Form component, props is the props of the SchemaForm component, here will be directly transparent
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
Global registration method
registerFormComponent(CompatFormComponent)
registerFormItemComponent(CompatFormItemComponent)
***/

//Single case registration method
export default () => {
  return (
    <SchemaForm
      formComponent={CompatFormComponent}
      formItemComponent={CompatFormItemComponent}
    />
  )
}
```

We can see that extending the overall or partial style of the form can be easily solved by simply extending the Form/FormItem component. It should be noted here that the props received by the FormItem component are a bit complicated. Don't worry, the detailed props API will be listed later. Now we just need to know how it is probably registered.

#### How to access form components?

all components of the component library are atomic components, most of them are compatible with the value/onChange specification, so we can quickly access the components of the component library with the connect function. Usually, if we need access to the component library component, we probably do three things:

- Handle state maps, map the loading/error state inside the formily to the component properties, of course, **the premise is that the component must support styles such as loading or error.**
- Handle detail styles, map the editable state inside the formily to a PreviewText component for more friendly and cleaner presentation data.
- Handle component enumeration, let's think about it, **JSON Schema, each node should support the enum attribute**, If we have the enum attribute, we'd better show it in the form of Select, so we need to handle the component enumeration state.

Let's take an example of InputNumber：

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
    getProps: mapStyledProps, //Process state map
    getComponent: mapTextComponent //Process details
  })(acceptEnum(InputNumber)) //Process enumeration states
)
```

In this example, we use the connect function in depth. Connect is a HOC. During the rendering phase, it can add some intermediate processing logic to the component rendering process to help dynamic distribution. Of course, connect has a lot of APIs, which will be covered in detail later.

#### How to handle form layout?

JSON Schema describes the form of data structure, which is supported by nature. But the form ends up at the UI level. Unfortunately, at the UI level, we have a lot of components that are not a specific data node of JSON Schema. It's just a UI node. So, how to do to describe complex layouts in JSON Schema?

Now formily's approach is to abstract a concept called **virtual node**After the user specifies a JSON Schema x-component as a virtual node at the code level, whether it is rendering, data processing, or final data submission, as long as the node is virtual, it will not be treated as a normal data node. So, with the concept of this virtual node, we can describe various complex layouts in JSON Schema. Let's try to write a layout component:

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
            //layout_cardThe name of this property, whatever you change will not affect the final submitted data structure
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

From this pseudo-code, we can see that the card is a normal Object Schema node, just need to specify an x-component as card, so that it can match the card registered by registerVirtualBox, it will achieve the effect of virtual node. So, no matter what you change the name of the property in JSON Schema, it will not affect the final submitted data structure.**It should be noted here that x-component-props is directly passed to the callback function parameters of registerVirtualBox.** This is the use of the JSON Schema form, and we also use JSchema:

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

From this example we can see that with the createVirtualBox API you can quickly create a layout component that you can use directly in JSchema.**In fact, the internal implementation of createVirtualBox is very simple, just use registerVitualBox and SchemaMarkupField**：

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

The way to register the layout components described above is a singleton registration. If we need registration in the form of an instance, it is still similar to the way we said earlier.

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
            layout_card:{//layout_cardThe name of this property, whatever you change will not affect the final submitted data structure
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

#### How to implement recursive rendering components?

What is a recursive rendering component? In fact, **implement the components of properties and items in JSON Schema**，sucn as`type:"string"` This kind of node belongs to the atomic node and is not a recursive rendering component. The layout component mentioned above, it is also a recursive rendering component, but it fixes the rendering mode, so it can be easily registered. So, most of us want to implement recursive rendering of the scene,Perhaps more of a scene in`type:"array"will implement recursive rendering. Below we will detail the implementation of the auto-increment list component.

#### How to implement the auto-increment list component?

The self-increment list has several main features:

- Independent style
- Support for recursive rendering of subcomponents
- Support for adding, deleting, moving up, down moving array items
- Cannot be wrapped with the connect function because the Field API must be called

In order to help you better understand how to implement the auto-increment list component, we will not implement the specific style, and more is to teach you how to implement recursive rendering and array item operations. Let us look at the pseudo-code:

```tsx
import React, { Fragment } from 'react'
import {
  registerFormField,
  SchemaField,
  FormPath
} from '@formily/react-schema-renderer'

//No need to pack with connet
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

To implement a self-incrementing list component with recursive rendering is super simple. On the contrary, it would be a bit cumbersome to implement related styles. In short, the core is to use the SchemaField component and the mutators API, the specific API will be described in detail later.

#### How to implement ultra-complex custom components?

This problem is no solution in the old Formily.It happens that because our business complexity is high to a certain extent, we are limited by this problem, so we must find a way to solve this problem. We can define what is a super complex custom component:

- There are a large number of form components inside the component, and there are also a large number of linkage relationships inside.
- There is a private server dynamic rendering scheme inside the component.

- There is a complex layout structure inside the component

In these three points, meet the characteristics of ultra-complex custom components, For this scenario, why can't we solve the problem by properly encapsulating the form of a custom component? In fact, it is mainly limited to verification, there is no way to check the whole, so we need an ability to aggregate a large amount of field processing logic. Let's take a look at the specific solution：

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

//No need to pack with connet
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

In this pseudo-code, we mainly use two core APIs, mainly useFormEffects and InternalField,useFormEffects gives developers a place to write the effects logic locally, so that the effects logic can be easily reused. InternalField is the @formily/react Field component. You can take a look at the @formily/react documentation. SchemaForm also uses @formily/react internally, it can share the same Context, so we can easily use InternalField inside a custom component. Also note that **when using InternalField directly, the name we registered is the root level name, if you want to reuse the path of the current custom component, you can use FormPath to resolve the path, and then concat.**

### API

---

> The overall API fully inherits @formily/core and @formily/react, and only the specific APIs of @formily/react-schema-renderer are listed below.

#### connect

> Custom component registration bridge, a high-level component function (HOC) that is used primarily to quickly access most component library components (components that implement the value/onChange API)

**Signature**

```typescript
connect(options?: IConnectOptions): (component : React.JSXElementConstructor<any>)=>(fieldProps:ISchemaFieldComponentProps)=>JSX.Element
```

**Usage**

```typescript
import { registerFormField, connect } from '@formily/react-schema-renderer'
import { Select } from 'antd'
registerFormField('select', connect()(Select))
```

#### registerFormField

> Register custom component functions

**Signature**

```typescript
registerFormField(
  name:string,
  component: React.JSXElementConstructor<ISchemaFieldComponentProps>
)
```

#### registerFormFields

> Bulk registration of custom components

**Signature**

```typescript
registerFormFields(
  fieldsMap: {
    [key : string]: React.JSXElementConstructor<ISchemaFieldComponentProps>
  }
)
```

#### registerFormComponent

> Register Form Style Component

**Signature**

```typescript
registerFormComponent<Props>(
  component:React.JSXElementConstructor<Props>
)
```

#### registerFormItemComponent

> Register the FormItem style component

**Signature**

```typescript
registerFormItemComponent(
  component:React.JSXElementConstructor<ISchemaFieldComponentProps>
)
```

#### registerVirtualBox

> Register the virtual box component, mainly used to describe the layout in JSON Schema

**Signature**

```typescript
registerVirtualBox(
  name:string,
  component:React.JSXElementConstructor<ISchemaVirtualFieldComponentProps>
)
```

#### createVirtualBox

> Create a virtual box component, the returned component can be used directly in SchemaMarkupForm

**Signature**

```typescript
createVirtualBox<Props>(
  name:string,
  component:React.JSXElementConstructor<Props>
) : React.FC<Props>
```

**Usage**

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

> Creating a virtual box component, the returned component can be used directly in SchemaMarkupForm, it is different from createVirtualBox mainly because the component receives the props
> The props received by createVirtualBox is the simplest component props
> createControllerBox receives`ISchemaVirtualFieldComponentProps`

**Signature**

```typescript
createControllerBox<Props>(
  name:string,
  component:React.JSXElementConstructor<ISchemaVirtualFieldComponentProps>
) : React.FC<Props>
```

**Usage**

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

> Get the registry, all components registered through the registerFormXXX API are managed in the registry

**Signature**

```typescript
getRegistry(): ISchemaFormRegistry
```

#### cleanRegistry

> Clear the registry and clear all components registered via the registerFormXXX API

**Signature**

```typescript
cleanRegistry(): void
```

### Classes

> The whole Class inherits @formily/core completely, such as FormPath and FormLifeCyle. Only the classes specific to @formily/react-schema-renderer are listed below.

#### new Schema(json : ISchema)

> The Schema parsing engine, given a data that satisfies the JSON Schema, we will parse it into the corresponding Schema instance, and we can quickly process some things with some tool methods. At the same time, the Schema Class provides a unified protocol difference smoothing capability to ensure Seamless and smooth upgrade when the protocol is upgraded

**Attributes**

| Attribute name       | Description                                                          | Type                                                                                                              |
| -------------------- | -------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------- |
| title                | Field title                                                          | `React.ReactNode`                                                                                                 |
| name                 | The parent property name of the field                                | `string`                                                                                                          |
| description          | Field description                                                    | `React.ReactNode`                                                                                                 |
| default              | Field default                                                        | `any`                                                                                                             |
| readOnly             | Whether read-only and editable                                       | `boolean`                                                                                                         |
| type                 | Field Type                                                           | `'string' | 'object' | 'array' | 'number' | string`                                                               |
| enum                 | Enumerate data                                                       | `Array<string | number | { label: React.ReactNode, value: any }>`                                                 |
| const                | Check if the field value is equal to the value of const              | `any`                                                                                                             |
| multipleOf           | Check if the field value can be divisible by the value of multipleOf | `number`                                                                                                          |
| maximum              | Check the maximum value (greater than)                               | `number`                                                                                                          |
| exclusiveMaximum     | Check the maximum value (greater than or equal to)                   | `number`                                                                                                          |
| minimum              | Check minimum value (less than)                                      | `number`                                                                                                          |
| exclusiveMinimum     | Minimum value (less than or equal to)                                | `number`                                                                                                          |
| maxLength            | Check maximum length                                                 | `number`                                                                                                          |
| minLength            | Check minimum length                                                 | `number`                                                                                                          |
| pattern              | Regular check rule                                                   | `string | RegExp`                                                                                                 |
| maxItems             | Maximum number of entries                                            | `number`                                                                                                          |
| minItems             | Minimum number of entries                                            | `number`                                                                                                          |
| uniqueItems          | Whether to check for duplicates                                      | `boolean`                                                                                                         |
| maxProperties        | Maximum number of attributes                                         | `number`                                                                                                          |
| minProperties        | Minimum number of attributes                                         | `number`                                                                                                          |
| required             | Required                                                             | `boolean`                                                                                                         |
| format               | Regular rule type                                                    | `InternalFormats`                                                                                                 |
| properties           | Object property                                                      | `{[key : string]:Schema}`                                                                                         |
| items                | Array description                                                    | `Schema | Schema[]`                                                                                               |
| additionalItems      | Extra array element description                                      | `Schema`                                                                                                          |
| patternProperties    | Dynamically match the schema of an attribute of an object            | `{[key : string]:Schema}`                                                                                         |
| additionalProperties | Schema matching the extra attributes of the object                   | `Schema`                                                                                                          |
| editable             | Whether the field is editable                                        | `boolean`                                                                                                         |
| visible              | Whether the data and style is visible                                | `boolean`                                                                                                         |
| display              | Whether the style is visible                                         | `boolean`                                                                                                         |
| x-props              | Field extension attribute                                            | `{ [name: string]: any }`                                                                                         |
| x-index              | Field order                                                          | `number`                                                                                                          |
| x-rules              | Field check rule                                                     | `ValidatePatternRules`                                                                                            |
| x-component          | Field UI component                                                   | `string`                                                                                                          |
| x-component-props    | Field UI component properties                                        | `{}`                                                                                                              |
| x-render             | Field extension rendering function                                   | `<T = ISchemaFieldComponentProps>(props: T & { renderComponent: () => React.ReactElement}) => React.ReactElement` |
| x-effect             | Field side effect trigger                                            | `(dispatch: (type: string, payload: any) => void,option?:object) => { [key: string]: any }`                       |

**Method**

##### `get`

> Get the Schema child node according to the data path

Signature

```typescript
get(path?: FormPathPattern): Schema
```

Usage

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

> Merge Schema

Signature

```typescript
merge(spec:ISchema): Schema
```

Usage

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

> Get the null value of the current Schema based on the type of Schema

Signature

```typescript
getEmptyValue() : '' | [] | {} | 0
```

Usage

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

> Get no nested Schema properties (does not include nested properties like properties/items)

Signature

```typescript
getSelfProps() : ISchema
```

Usage

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

> Get the extended check rule. This method is more complicated. It will parse the attributes and x-rules attributes of all the check types of the current Schema, and finally merge them into a unified rules structure.

Signature

```typescript
getExtendsRules() : ValidateArrayRules
```

Usage

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

> Obtaining whether it is required or not is actually reading the required attribute of the Schema. Why is it encapsulated into a method to ensure that the user is not aware of the protocol upgrade? We only need to ensure backward compatibility of the method.

Signature

```typescript
getExtendsRequired(): void | boolean
```

Usage

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

> Get the editable state of the Schema, consistent with the getExtendsEditable ability, also to smooth out the protocol differences

Signature

```typescript
getExtendsEditable() : void | boolean
```

Usage

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

> Get data and style visible property

签名

```typescript
getExtendsVisible(): boolean
```

##### `getExtendsDisplay`

> Get style visible property

签名

```
getExtendsDisplay() : boolean
```

##### `getExtendsTriggerType`

> Get the triggerType, which is consistent with the getExtendsTriggerType capability, and is capable of providing protocol differences.

Signature

```typescript
getExtendsTriggerType() : 'onBlur' | 'onChange' | string
```

Usage

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

> Get the x-props attribute

Signature

```typescript
getExtendsProps() : {}
```

##### `getExtendsComponent`

> Get the x-props attribute

Signature

```typescript
getExtendsComponent() : string
```

##### `getExtendsComponentProps`

> Get the x-component-props property, which is the component property of the x-component

Signature

```typescript
getExtendsComponentProps() : {}
```

##### `getExtendsRenderer`

> Get the x-render attribute

Signature

```typescript
getExtendsRenderer() : <T = ISchemaFieldComponentProps>(
    props: T & {
      renderComponent: () => React.ReactElement
    }
  ) => React.ReactElement
```

##### `getExtendsEffect`

> Get the x-effect attribute

Signature

```typescript
getExtendsEffect() : (
    dispatch: (type: string, payload: any) => void,
    option?: object
) => { [key: string]: any }
```

##### `setProperty`

> Set properties for the current schema

Signature

```typescript
setProperty(key: string, schema: ISchema): Schema
```

##### `setProperties`

> Set properties for the current Schema batch

Signature

```typescript
setProperties(properties: {[key : string]:ISchema}) : {[key : string]:Schema}
```

##### `setArrayItems`

> Set the items property to the current schema

Signature

```typescript
setArrayItems(schema:Ischema) : Schema
```

##### `getOrderProperties`

> Give all properties in x-index order

Signature

```typescript
getOrderProperties() : {schema:Schema,key:string}[]
```

##### `mapProperties`

> Traverse the properties of the schema in order (x-index)

Signature

```typescript
mapProperties(callback?: (schema: Schema, key: string) => any):any[]
```

##### `toJSON`

> Output no loop dependent json data structure

Signature

```
toJSON() : ISchema
```

##### `fromJSON`

> Generate a Schema object based on a json parsing

Signature

```typescript
fromJSON(json : ISchema) : Schema
```

##### `isObject`

> Determine whether the current schema is an object type

Signature

```
isObject() : boolean
```

##### `isArray()`

> Determine if the current schema is an array type

Signature

```
isArray() : boolean
```

### Components

---

> The whole component is completely inherited @formily/react, only the components specific to @formily/react-schema-renderer are listed below.

#### `<SchemaForm/>`

> The core JSON Schema rendering component

**Attributes**

```typescript
interface ISchemaFormProps<
  Value = any,
  DefaultValue = any,
  FormEffectPayload = any,
  FormActions = ISchemaFormActions | ISchemaFormAsyncActions
> {
  //Form value
  value?: Value
  //Form default value
  defaultValue?: DefaultValue
  //Form default value, weakly controlled
  initialValues?: DefaultValue
  //Form actions
  actions?: FormActions
  //Form effects
  effects?: IFormEffect<FormEffectPayload, FormActions>
  //Form instance
  form?: IForm
  //Form change callback
  onChange?: (values: Value) => void
  //Form submission callback
  onSubmit?: (values: Value) => void | Promise<Value>
  //Form reset callback
  onReset?: () => void
  //Form validation failure callback
  onValidateFailed?: (valideted: IFormValidateResult) => void
  //Form child node
  children?: React.ReactElement
  //Whether to open the dirty check
  useDirty?: boolean
  //Is it editable
  editable?: boolean | ((name: string) => boolean)
  //Whether to enable pessimistic verification, if the first verification fails, stop the remaining verification
  validateFirst?: boolean
  //Form Schema object
  schema?: ISchema
  //Instance level registration custom component
  fields?: ISchemaFormRegistry['fields']
  //Instance level registration virtual box component
  virtualFields?: ISchemaFormRegistry['virtualFields']
  //Instance level registration Form style component
  formComponent?: ISchemaFormRegistry['formComponent']
  //Instance level registration FormItem style component
  formItemComponent?: ISchemaFormRegistry['formItemComponent']
}
```

#### `<SchemaField/>`

> Based on a Data Path, it automatically finds and renders the internal components of the Schema node, mainly used to implement recursive rendering within the custom component.

**Attributes**

```typescript
interface ISchemaFieldProps {
  //Data path
  path?: FormPathPattern
}
```

#### `<SchemaMarkupForm/>`

> Let SchemaForm support the Form component of jsx tabbed notation, which needs to be used together with SchemaMarkupField

**Attributes**

```typescript
interface ISchemaFormProps<
  Value = any,
  DefaultValue = any,
  FormEffectPayload = any,
  FormActions = ISchemaFormActions | ISchemaFormAsyncActions
> {
  //Form value
  value?: Value
  //Form default value
  defaultValue?: DefaultValue
  //Form default value, weakly controlled
  initialValues?: DefaultValue
  //Form actions
  actions?: FormActions
  //Form effects
  effects?: IFormEffect<FormEffectPayload, FormActions>
  //Form instance
  form?: IForm
  //Form change callback
  onChange?: (values: Value) => void
  //Form submission callback
  onSubmit?: (values: Value) => void | Promise<Value>
  //Form reset callback
  onReset?: () => void
  //Form validation failure callback
  onValidateFailed?: (valideted: IFormValidateResult) => void
  //Form child node
  children?: React.ReactElement
  //Whether to open the dirty check
  useDirty?: boolean
  //Is it editable
  editable?: boolean | ((name: string) => boolean)
  //Whether to enable pessimistic verification, if the first verification fails, stop the remaining verification
  validateFirst?: boolean
  //Form Schema object
  schema?: ISchema
  //Instance level registration custom component
  fields?: ISchemaFormRegistry['fields']
  //Instance level registration virtual box component
  virtualFields?: ISchemaFormRegistry['virtualFields']
  //Instance level registration Form style component
  formComponent?: ISchemaFormRegistry['formComponent']
  //Instance level registration FormItem style component
  formItemComponent?: ISchemaFormRegistry['formItemComponent']
}
```

**Usage**

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

> The SchemaForm supports the Field component of jsx tabbed notation, which needs to be used together with SchemaMarkupForm

**Attributes**

```typescript
type IMarkupSchemaFieldProps = ISchema
```

#### `<InternalForm/>`

> The core Form is the same as the Form component in @formily/react

#### `<InternalField/>`

> The core Field, like the Field component in @formily/react, is mainly used in complex custom components.

### Interfaces

---

> Inheriting @formily/react and @formily/core's Interfaces as a whole, only @formily/react-schema-renderer are listed below.

#### IConnectOptions

> Connect parameters for registered components

```typescript
interface IConnectOptions {
  valueName?: string //value name
  eventName?: string //get value callback name
  defaultProps?: {} //component default props
  getValueFromEvent?: (event?: any, value?: any) => any //get value from event callback.
  getProps?: (
    //props transformer
    componentProps: {},
    fieldProps: MergedFieldComponentProps
  ) => {} | void
  getComponent?: (
    //component transformer
    Target: any,
    componentProps: {},
    fieldProps: MergedFieldComponentProps
  ) => React.JSXElementConstructor<any>
}
```

#### ISchemaFieldComponentProps

> It is very important to customize the properties received by the component. As long as it involves developing custom components, you need to understand the protocol.

```typescript
interface ISchemaFieldComponentProps {
  //State name, FieldState
  displayName?: string
  //Data path
  name: string
  //Node path
  path: string
  //Whether it has been initialized
  initialized: boolean
  //Whether it is in the original state, the state is true only when value===intialValues
  pristine: boolean
  //Whether it is in a legal state, as long as the error length is greater than 0, the valid is false.
  valid: boolean
  //Whether it is in an illegal state, as long as the error length is greater than 0, the valid is true.
  invalid: boolean
  //Is it in check state?
  validating: boolean
  //Whether it is modified, if the value changes, the property is true and will be true for the entire lifetime of the field.
  modified: boolean
  //Whether it is touched
  touched: boolean
  //Whether it is activated, it will be triggered to true when the field triggers the onFocus event, and false when onBlur is triggered.
  active: boolean
  //Whether it has been accessed, when the field triggers the onBlur event, it will be triggered to true
  visited: boolean
  //Is it visible, note: if the status is false, the value of the field will not be submitted, and the UI will not display
  visible: boolean
  //Whether to show, note: if the status is false, then the value of the field will be submitted, the UI will not display, similar to the form hidden field
  display: boolean
  //Is it editable
  editable: boolean
  //Whether it is in the loading state, note: if the field is in asynchronous check, loading is true
  loading: boolean
  //The field has multiple parameters. For example, when the field onChange is triggered, multi-parameter data is passed to the event callback, then the values of all parameters are stored here.
  values: any[]
  //Field error message
  errors: string[]
  //Field alert message
  warnings: string[]
  //Field value, which is constant equal to values[0]
  value: any
  //Initial value
  initialValue: any
  //Verification rules, specific type descriptions refer to the following documents
  rules: ValidatePatternRules[]
  //Required or not
  required: boolean
  //Has it been mounted?
  mounted: boolean
  //Has it been unmounted?
  unmounted: boolean
  //Field extension property, under the SchemaForm ISchema structure
  props: ISchema
  //The schema object of the current field
  schema: Schema
  //Current operation data set of the field
  mutators: IMutators
  //Form instance
  form: IForm
  //Recursive rendering function
  renderField: (
    addtionKey: string | number,
    reactKey?: string | number
  ) => React.ReactElement
}
```

#### ISchemaVirtualFieldComponentProps

> The attributes received by the virtual field component, as long as it involves registering the virtual field, you need to understand the protocol.

```typescript
interface ISchemaVirtualFieldComponentProps {
  //State name, VirtualFieldState
  displayName: string
  //Field data path
  name: string
  //Field node path
  path: string
  //Whether it has been initialized
  initialized: boolean
  //Is it visible, note: if the status is false, the UI will not be displayed, and the data will not be submitted (because it is a VirtualField)
  visible: boolean
  //Whether to show, note: if the state is false, the UI will not be displayed, and the data will not be submitted (because it is a VirtualField)
  display: boolean
  //Has it been mounted?
  mounted: boolean
  //Has it been unmounted?
  unmounted: boolean
  //Field extension attribute
  props: ISchema
  //The schema object of the current field
  schema: Schema
  //Form instance
  form: IForm
  //Child element
  children: React.ReactElement[]
  //Recursive rendering function
  renderField: (
    addtionKey: string | number,
    reactKey?: string | number
  ) => React.ReactElement
}
```

#### ISchemaFormRegistry

> The component registry, whether it is a normal field, a virtual field, or a Form/FormItem will be registered here.

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

> Schema protocol object, mainly used to constrain a json structure to satisfy the Schema protocol

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
  visible?: boolean //Field initial visible status(Whether the data is visible)
  display?: boolean //Field initial display status(Whether the style is visible)
  editable?: boolean
  ['x-props']?: { [name: string]: any }
  ['x-index']?: number
  ['x-rules']?: ValidatePatternRules
  ['x-linkages']?: Array<{
    target: FormPathPattern
    type: string
    [key: string]: any
  }>
  ['x-mega-props']?: { [name: string]: any }
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

> The core actions inherit @formily/react's IFormActions, mainly adding the getSchema API

```typescript
interface ISchemaFormActions extends IFormActions {
  getSchema(): Schema
  getFormSchema(): Schema
}
```

#### ISchemaFormAsyncActions

> Core actions inherit @formily/react's IFormAsyncActions, mainly adding the getSchema API

```typescript
interface ISchemaFormAsyncActions extends IFormAsyncActions {
  getSchema(): Promise<Schema>
  getFormSchema(): Promise<Schema>
}
```

#### IFormValidateResult

> Calibration result

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

> Built-in format checksum

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

> Original check description

```typescript
interface ValidateDescription {
  // built-in rules，ref: string rules
  format?: InternalFormats
  // custom validation
  validator?: CustomValidator
  // required
  required?: boolean
  // pattern
  pattern?: RegExp | string
  // max length
  max?: number
  // maximum
  maximum?: number
  // exclusiveMaximum
  exclusiveMaximum?: number
  // exclusiveMinimum
  exclusiveMinimum?: number
  // minimum
  minimum?: number
  // min
  min?: number
  // length
  len?: number
  // whitespace
  whitespace?: boolean
  // enum
  enum?: any[]
  // error message
  message?: string
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

> Custom check function

```typescript
type CustomValidator = (
  value: any,
  description?: ValidateDescription
) => ValidateResponse
```

#### ValidatePatternRules

> Verification rule set

```typescript
type ValidatePatternRules =
  | InternalFormats
  | CustomValidator
  | ValidateDescription
  | Array<InternalFormats | CustomValidator | ValidateDescription>
```
