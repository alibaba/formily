# Core idea

The architecture of @formily/react itself is not complicated, because it only provides a series of components and Hooks for users to use, but we still need to understand the following concepts:

- Form context
- Field context
- Protocol context
- Model binding
- Protocol driven
- Three development modes

## Form context

From the [architecture diagram](/guide/architecture) we can see that FormProvider exists as a unified context for forms, and its position is very important. It is mainly used to create [Form](//core. formilyjs.org/api/models/form) instances are distributed to all sub-components, whether in built-in components or user-extended components, can be read through [useForm](/api/hooks/use-form) [ Form](//core.formilyjs.org/api/models/form) instance

## Field context

From the [architecture diagram](/guide/architecture) we can see that whether it is Field/ArrayField/ObjectField/VoidField, a FieldContext will be issued to the subtree. We can read the current field model in the custom component, mainly Use [useField](/api/hooks/use-field) to read, which is very convenient for model mapping

## Protocol context

From the [architecture diagram](/guide/architecture) we can see that [RecursionField](/api/components/recursion-field) will send a FieldSchemaContext to the subtree, and we can read the current field in the custom component The Schema description is mainly read using [useFieldSchema](/api/hooks/useFieldSchema). Note that this Hook can only be used in the [SchemaField](/api/components/SchemaField) and [RecursionField](/api/components/recursion-field) subtrees

## Model binding

To understand model binding, you need to understand what [MVVM](//core.formilyjs.org/guide/mvvm) is. After understanding, let’s take a look at this picture:

![](https://img.alicdn.com/imgextra/i1/O1CN01A03C191KwT1raxnDg_!!6000000001228-55-tps-2200-869.svg)

In Formily, @formily/core is ViewModel, Component and Decorator are View, @formily/react is the glue layer that binds ViewModel and View, and the binding of ViewModel and View is called model binding, which implements model binding. The main methods are [useField](/api/hooks/use-field), and [connect](/api/shared/connect) and [mapProps](/api/shared/map-props) can also be used. Note that Component only needs to support the value/onChange property to automatically realize the two-way binding of the data layer.

## JSON Schema Driver

Protocol-driven rendering is the most expensive part of @formily/react, but after learning it, the benefits it brings to the business are also very high. A total of 4 core concepts need to be understood:

- Schema
- Recursive rendering
- Protocol binding
- Three development modes

### Schema

Formily’s protocol driver is mainly based on the standard JSON Schema to drive rendering. At the same time, we have extended some `x-*` attributes to express the UI on top of the standard, so that the entire protocol can fully describe a complex form. Schema protocol, refer to [Schema](/api/shared/schema) API document

### Recursive rendering

What is recursive rendering? Recursive rendering means that component A will continue to use component A to render content under certain conditions. Take a look at the following pseudo code:

```json
{<---- RecursionField (condition: object; rendering right: RecursionField)
  "type":"object",
  "properties":{
    "username":{ <---- RecursionField (condition: string; rendering right: RecursionField)
      "type":"string",
      "x-component":"Input"
    },
    "phone":{ <---- RecursionField (condition: string; rendering right: RecursionField)
      "type":"string",
      "x-component":"Input",
      "x-validator":"phone"
    },
    "email":{ <---- RecursionField (condition: string; rendering right: RecursionField)
      "type":"string",
      "x-component":"Input",
      "x-validator":"email"
    },
    "contacts":{ <---- RecursionField (condition: array; rendering right: RecursionField)
      "type":"array",
      "x-component":"ArrayTable",
      "items":{ <---- RecursionField (condition: object; rendering rights: ArrayTable component)
        "type":"object",
        "properties":{
          "username":{ <---- RecursionField (condition: string; rendering right: RecursionField)
            "type":"string",
            "x-component":"Input"
          },
          "phone":{ <---- RecursionField (condition: string; rendering right: RecursionField)
            "type":"string",
            "x-component":"Input",
            "x-validator":"phone"
          },
          "email":{ <---- RecursionField (condition: string; rendering right: RecursionField)
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

@formily/react The entry point for recursive rendering is [SchemaField](/api/components/schema-field), but it actually uses [RecursionField](/api/components/recursion-field) to render internally, because of JSON-Schema It is a recursive structure, so [RecursionField](/api/components/recursion-field) will be parsed from the top-level Schema node when rendering. If it is a non-object and array type, it will directly render the specific component. If it is an object, it will traverse. properties Continue to use [RecursionField](/api/components/recursion-field) to render child Schema nodes.

A special case here is the rendering of the array type auto-increment list, which requires the user to use [RecursionField](/api/components/recursion-field) in the custom component for recursive rendering, because the UI of the auto-increment list is very customized High, so the recursive rendering rights are handed over to the user to render, so the design can also make protocol-driven rendering more flexible.

What is the difference between SchemaField and RecursionField? There are two main points:

- SchemaField supports Markup grammar, it will parse Markup grammar in advance to generate [JSON Schema](/api/shared/schema) and transfer it to RecursionField for rendering, so RecursionField can only be rendered based on [JSON Schema](/api/shared/schema)
- SchemaField renders the overall Schema protocol, while RecursionField renders the partial Schema protocol

### Protocol binding

I talked about model binding, and protocol binding is the process of converting Schema protocol into model binding, because JSON-Schema protocol is a JSON string and can be stored offline, while model binding is a binding between memory The relationship is at the Runtime layer. For example, `x-component` is the string identifier of the component in the Schema, but the component in the model requires component reference, so the JSON string and the Runtime layer need to be converted. Then we can continue to improve the above model binding diagram:

![](https://img.alicdn.com/imgextra/i3/O1CN01jLCRxH1aa3V0x6nw4_!!6000000003345-55-tps-2200-1147.svg)

To sum up, in @formily/react, there are mainly two layers of binding relationships, Schema binding model, model binding component, the glue layer that realizes the binding is @formily/react, it should be noted that Schema binds the field model After that, the Schema is not perceptible in the field model. For example, if you want to modify the `enum`, you need to modify the `dataSource` attribute in the field model. In short, if you want to update the field model, refer to [Field](//core.formilyjs. org/api/models/field), you can refer to [Schema](/api/shared/schema) document if you want to understand the mapping relationship between Schema and field model

## Three development models

From the [architecture diagram](/guide/architecture), we have actually seen that the entire @formily/react has three development modes, corresponding to different users:

- JSX development model
- JSON Schema development mode
- Markup Schema development mode

We can look at specific examples

#### JSX development model

This mode mainly uses Field/ArrayField/ObjectField/VoidField components

```tsx
import React from 'react'
import { createForm } from '@formily/core'
import { FormProvider, Field } from '@formily/react'
import { Input } from 'antd'

const form = createForm()

export default () => (
  <FormProvider form={form}>
    <Field name="input" component={[Input, { placeholder: 'Please enter' }]} />
  </FormProvider>
)
```

#### JSON Schema Development Mode

This mode is to pass JSON Schema to the schema attribute of SchemaField

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
              placeholder: 'Please enter',
            },
          },
        },
      }}
    />
  </FormProvider>
)
```

#### Markup Schema Development Mode

This mode can be regarded as a Schema development mode that is more friendly to source code development, and it also uses the SchemaField component.

Because it is difficult to get the best smart prompt experience in the JSX environment with JSON Schema, and it is inconvenient to maintain, the maintainability in the form of tags will be better, and the smart prompt is also very strong.

Markup Schema mode mainly has the following characteristics:

- Mainly rely on description tags such as SchemaField.String/SchemaField.Array/SchemaField.Object... to express Schema
- Each description tag represents a Schema node, which is equivalent to JSON-Schema
- SchemaField child nodes cannot insert UI elements at will, because SchemaField will only parse all the Schema description tags of the child nodes, and then convert them into JSON Schema, and finally give it to [RecursionField](/api/components/recursion-field) for rendering, if you want Insert UI elements, you can upload the `x-content` attribute in VoidDield to insert UI elements

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
        x-component-props={{ placeholder: 'Please enter' }}
      />
      <div>I will not be rendered</div>
      <SchemaField.Void x-content={<div>I will be rendered</div>} />
    </SchemaField>
  </FormProvider>
)
```
