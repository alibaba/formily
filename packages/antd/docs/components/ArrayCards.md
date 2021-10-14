# ArrayCards

> Card list, it is more suitable to use ArrayCards for scenarios with a large number of fields in each row and more linkages
>
> Note: This component is only applicable to Schema scenarios

## Markup Schema example

```tsx
import React from 'react'
import {
  FormItem,
  Input,
  ArrayCards,
  FormButtonGroup,
  Submit,
} from '@formily/antd'
import { createForm } from '@formily/core'
import { FormProvider, createSchemaField } from '@formily/react'

const SchemaField = createSchemaField({
  components: {
    FormItem,
    Input,
    ArrayCards,
  },
})

const form = createForm()

export default () => {
  return (
    <FormProvider form={form}>
      <SchemaField>
        <SchemaField.Array
          name="string_array"
          maxItems={3}
          x-decorator="FormItem"
          x-component="ArrayCards"
          x-component-props={{
            title: 'String array',
          }}
        >
          <SchemaField.Void>
            <SchemaField.Void x-component="ArrayCards.Index" />
            <SchemaField.String
              name="input"
              x-decorator="FormItem"
              title="Input"
              required
              x-component="Input"
            />
            <SchemaField.Void x-component="ArrayCards.Remove" />
            <SchemaField.Void x-component="ArrayCards.MoveUp" />
            <SchemaField.Void x-component="ArrayCards.MoveDown" />
          </SchemaField.Void>
          <SchemaField.Void
            x-component="ArrayCards.Addition"
            title="Add entry"
          />
        </SchemaField.Array>
        <SchemaField.Array
          name="array"
          maxItems={3}
          x-decorator="FormItem"
          x-component="ArrayCards"
          x-component-props={{
            title: 'Object array',
          }}
        >
          <SchemaField.Object>
            <SchemaField.Void x-component="ArrayCards.Index" />
            <SchemaField.String
              name="input"
              x-decorator="FormItem"
              title="Input"
              required
              x-component="Input"
            />
            <SchemaField.Void x-component="ArrayCards.Remove" />
            <SchemaField.Void x-component="ArrayCards.MoveUp" />
            <SchemaField.Void x-component="ArrayCards.MoveDown" />
          </SchemaField.Object>
          <SchemaField.Void
            x-component="ArrayCards.Addition"
            title="Add entry"
          />
        </SchemaField.Array>
      </SchemaField>
      <FormButtonGroup>
        <Submit onSubmit={console.log}>Submit</Submit>
      </FormButtonGroup>
    </FormProvider>
  )
}
```

## JSON Schema case

```tsx
import React from 'react'
import {
  FormItem,
  Input,
  ArrayCards,
  FormButtonGroup,
  Submit,
} from '@formily/antd'
import { createForm } from '@formily/core'
import { FormProvider, createSchemaField } from '@formily/react'

const SchemaField = createSchemaField({
  components: {
    FormItem,
    Input,
    ArrayCards,
  },
})

const form = createForm()

const schema = {
  type: 'object',
  properties: {
    string_array: {
      type: 'array',
      'x-component': 'ArrayCards',
      maxItems: 3,
      'x-decorator': 'FormItem',
      'x-component-props': {
        title: 'String array',
      },
      items: {
        type: 'void',
        properties: {
          index: {
            type: 'void',
            'x-component': 'ArrayCards.Index',
          },
          input: {
            type: 'string',
            'x-decorator': 'FormItem',
            title: 'Input',
            required: true,
            'x-component': 'Input',
          },
          remove: {
            type: 'void',
            'x-component': 'ArrayCards.Remove',
          },
          moveUp: {
            type: 'void',
            'x-component': 'ArrayCards.MoveUp',
          },
          moveDown: {
            type: 'void',
            'x-component': 'ArrayCards.MoveDown',
          },
        },
      },
      properties: {
        addition: {
          type: 'void',
          title: 'Add entry',
          'x-component': 'ArrayCards.Addition',
        },
      },
    },
    array: {
      type: 'array',
      'x-component': 'ArrayCards',
      maxItems: 3,
      'x-decorator': 'FormItem',
      'x-component-props': {
        title: 'Object array',
      },
      items: {
        type: 'object',
        properties: {
          index: {
            type: 'void',
            'x-component': 'ArrayCards.Index',
          },
          input: {
            type: 'string',
            'x-decorator': 'FormItem',
            title: 'Input',
            required: true,
            'x-component': 'Input',
          },
          remove: {
            type: 'void',
            'x-component': 'ArrayCards.Remove',
          },
          moveUp: {
            type: 'void',
            'x-component': 'ArrayCards.MoveUp',
          },
          moveDown: {
            type: 'void',
            'x-component': 'ArrayCards.MoveDown',
          },
        },
      },
      properties: {
        addition: {
          type: 'void',
          title: 'Add entry',
          'x-component': 'ArrayCards.Addition',
        },
      },
    },
  },
}

export default () => {
  return (
    <FormProvider form={form}>
      <SchemaField schema={schema} />
      <FormButtonGroup>
        <Submit onSubmit={console.log}>Submit</Submit>
      </FormButtonGroup>
    </FormProvider>
  )
}
```

## Effects linkage case

```tsx
import React from 'react'
import {
  FormItem,
  Input,
  ArrayCards,
  FormButtonGroup,
  Submit,
} from '@formily/antd'
import { createForm, onFieldChange, onFieldReact } from '@formily/core'
import { FormProvider, createSchemaField } from '@formily/react'

const SchemaField = createSchemaField({
  components: {
    FormItem,
    Input,
    ArrayCards,
  },
})

const form = createForm({
  effects: () => {
    //Active linkage mode
    onFieldChange('array.*.aa', ['value'], (field, form) => {
      form.setFieldState(field.query('.bb'), (state) => {
        state.visible = field.value != '123'
      })
    })
    //Passive linkage mode
    onFieldReact('array.*.dd', (field) => {
      field.visible = field.query('.cc').get('value') != '123'
    })
  },
})

export default () => {
  return (
    <FormProvider form={form}>
      <SchemaField>
        <SchemaField.Array
          name="array"
          maxItems={3}
          x-component="ArrayCards"
          x-decorator="FormItem"
          x-component-props={{
            title: 'Object array',
          }}
        >
          <SchemaField.Object>
            <SchemaField.Void x-component="ArrayCards.Index" />
            <SchemaField.String
              name="aa"
              x-decorator="FormItem"
              title="AA"
              required
              description="AA hide BB when entering 123"
              x-component="Input"
            />
            <SchemaField.String
              name="bb"
              x-decorator="FormItem"
              title="BB"
              required
              x-component="Input"
            />
            <SchemaField.String
              name="cc"
              x-decorator="FormItem"
              title="CC"
              required
              description="Hide DD when CC enters 123"
              x-component="Input"
            />
            <SchemaField.String
              name="dd"
              x-decorator="FormItem"
              title="DD"
              required
              x-component="Input"
            />
            <SchemaField.Void x-component="ArrayCards.Remove" />
            <SchemaField.Void x-component="ArrayCards.MoveUp" />
            <SchemaField.Void x-component="ArrayCards.MoveDown" />
          </SchemaField.Object>
          <SchemaField.Void
            x-component="ArrayCards.Addition"
            title="Add entry"
          />
        </SchemaField.Array>
      </SchemaField>
      <FormButtonGroup>
        <Submit onSubmit={console.log}>Submit</Submit>
      </FormButtonGroup>
    </FormProvider>
  )
}
```

## JSON Schema linkage case

```tsx
import React from 'react'
import {
  FormItem,
  Input,
  ArrayCards,
  FormButtonGroup,
  Submit,
} from '@formily/antd'
import { createForm } from '@formily/core'
import { FormProvider, createSchemaField } from '@formily/react'

const SchemaField = createSchemaField({
  components: {
    FormItem,
    Input,
    ArrayCards,
  },
})

const form = createForm()

const schema = {
  type: 'object',
  properties: {
    array: {
      type: 'array',
      'x-component': 'ArrayCards',
      maxItems: 3,
      title: 'Object array',
      items: {
        type: 'object',
        properties: {
          index: {
            type: 'void',
            'x-component': 'ArrayCards.Index',
          },
          aa: {
            type: 'string',
            'x-decorator': 'FormItem',
            title: 'AA',
            required: true,
            'x-component': 'Input',
            description: 'Enter 123',
          },
          bb: {
            type: 'string',
            title: 'BB',
            required: true,
            'x-decorator': 'FormItem',
            'x-component': 'Input',
            'x-reactions': [
              {
                dependencies: ['.aa'],
                when: "{{$deps[0] != '123'}}",
                fulfill: {
                  schema: {
                    title: 'BB',
                    'x-disabled': true,
                  },
                },
                otherwise: {
                  schema: {
                    title: 'Changed',
                    'x-disabled': false,
                  },
                },
              },
            ],
          },
          remove: {
            type: 'void',
            'x-component': 'ArrayCards.Remove',
          },
          moveUp: {
            type: 'void',
            'x-component': 'ArrayCards.MoveUp',
          },
          moveDown: {
            type: 'void',
            'x-component': 'ArrayCards.MoveDown',
          },
        },
      },
      properties: {
        addition: {
          type: 'void',
          title: 'Add entry',
          'x-component': 'ArrayCards.Addition',
        },
      },
    },
  },
}

export default () => {
  return (
    <FormProvider form={form}>
      <SchemaField schema={schema} />
      <FormButtonGroup>
        <Submit onSubmit={console.log}>Submit</Submit>
      </FormButtonGroup>
    </FormProvider>
  )
}
```

## API

### ArrayCards

Reference https://ant.design/components/card-cn/

### ArrayCards.Addition

> Add button

Extended attributes

| Property name | Type                 | Description   | Default value |
| ------------- | -------------------- | ------------- | ------------- |
| title         | ReactText            | Copywriting   |               |
| method        | `'push' \|'unshift'` | add method    | `'push'`      |
| defaultValue  | `any`                | Default value |               |

Other references https://ant.design/components/button-cn/

Note: The title attribute can receive the title mapping in the Field model, that is, uploading the title in the Field is also effective

### ArrayCards.Remove

> Delete button

| Property name | Type      | Description | Default value |
| ------------- | --------- | ----------- | ------------- |
| title         | ReactText | Copywriting |               |

Other references https://ant.design/components/icon-cn/

Note: The title attribute can receive the title mapping in the Field model, that is, uploading the title in the Field is also effective

### ArrayCards.MoveDown

> Move down button

| Property name | Type      | Description | Default value |
| ------------- | --------- | ----------- | ------------- |
| title         | ReactText | Copywriting |               |

Other references https://ant.design/components/icon-cn/

Note: The title attribute can receive the title mapping in the Field model, that is, uploading the title in the Field is also effective

### ArrayCards.MoveUp

> Move up button

| Property name | Type      | Description | Default value |
| ------------- | --------- | ----------- | ------------- |
| title         | ReactText | Copywriting |               |

Other references https://ant.design/components/icon-cn/

Note: The title attribute can receive the title mapping in the Field model, that is, uploading the title in the Field is also effective

### ArrayCards.Index

> Index Renderer

No attributes

### ArrayCards.useIndex

> Read the React Hook of the current rendering row index

### ArrayCards.useRecord

> Read the React Hook of the current rendering row
