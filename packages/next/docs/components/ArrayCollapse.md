# ArrayCollapse

> Folding panel, it is more suitable to use ArrayCollapse for scenes with more fields in each row and more linkage
>
> Note: This component is only applicable to Schema scenarios

## Markup Schema example

```tsx
import React from 'react'
import {
  FormItem,
  Input,
  ArrayCollapse,
  FormButtonGroup,
  Submit,
} from '@formily/next'
import { createForm } from '@formily/core'
import { FormProvider, createSchemaField } from '@formily/react'
import { Button } from '@alifd/next'

const SchemaField = createSchemaField({
  components: {
    FormItem,
    Input,
    ArrayCollapse,
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
          x-component="ArrayCollapse"
          x-component-props={{
            accordion: true,
            defaultOpenPanelCount: 3,
          }}
        >
          <SchemaField.Void
            x-component="ArrayCollapse.CollapsePanel"
            x-component-props={{
              title: 'String array',
            }}
          >
            <SchemaField.Void x-component="ArrayCollapse.Index" />
            <SchemaField.String
              name="input"
              x-decorator="FormItem"
              title="Input"
              required
              x-component="Input"
            />
            <SchemaField.Void x-component="ArrayCollapse.Remove" />
            <SchemaField.Void x-component="ArrayCollapse.MoveUp" />
            <SchemaField.Void x-component="ArrayCollapse.MoveDown" />
          </SchemaField.Void>
          <SchemaField.Void
            x-component="ArrayCollapse.Addition"
            title="Add entry"
          />
        </SchemaField.Array>
        <SchemaField.Array
          name="array"
          maxItems={3}
          x-decorator="FormItem"
          x-component="ArrayCollapse"
        >
          <SchemaField.Object
            x-component="ArrayCollapse.CollapsePanel"
            x-component-props={{
              title: 'Object array',
            }}
          >
            <SchemaField.Void x-component="ArrayCollapse.Index" />
            <SchemaField.String
              name="input"
              x-decorator="FormItem"
              title="Input"
              required
              x-component="Input"
            />
            <SchemaField.Void x-component="ArrayCollapse.Remove" />
            <SchemaField.Void x-component="ArrayCollapse.MoveUp" />
            <SchemaField.Void x-component="ArrayCollapse.MoveDown" />
          </SchemaField.Object>
          <SchemaField.Void
            x-component="ArrayCollapse.Addition"
            title="Add entry"
          />
        </SchemaField.Array>
        <SchemaField.Array
          name="string_array_unshift"
          maxItems={3}
          x-decorator="FormItem"
          x-component="ArrayCollapse"
          x-component-props={{
            defaultOpenPanelCount: 8,
          }}
        >
          <SchemaField.Void
            x-component="ArrayCollapse.CollapsePanel"
            x-component-props={{
              title: 'String array',
            }}
          >
            <SchemaField.Void x-component="ArrayCollapse.Index" />
            <SchemaField.String
              name="input"
              x-decorator="FormItem"
              title="Input"
              required
              x-component="Input"
            />
            <SchemaField.Void x-component="ArrayCollapse.Remove" />
            <SchemaField.Void x-component="ArrayCollapse.MoveUp" />
            <SchemaField.Void x-component="ArrayCollapse.MoveDown" />
          </SchemaField.Void>
          <SchemaField.Void
            x-component="ArrayCollapse.Addition"
            title="Add entry (unshift)"
            x-component-props={{
              method: 'unshift',
            }}
          />
        </SchemaField.Array>
      </SchemaField>
      <FormButtonGroup>
        <Button
          onClick={() => {
            form.setInitialValues({
              array: Array.from({ length: 10 }).map(() => ({
                input: 'default value',
              })),
              string_array: Array.from({ length: 10 }).map(
                () => 'default value'
              ),
              string_array_unshift: Array.from({ length: 10 }).map(
                () => 'default value'
              ),
            })
          }}
        >
          Load default data
        </Button>
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
  ArrayCollapse,
  FormButtonGroup,
  Submit,
} from '@formily/next'
import { createForm } from '@formily/core'
import { FormProvider, createSchemaField } from '@formily/react'

const SchemaField = createSchemaField({
  components: {
    FormItem,
    Input,
    ArrayCollapse,
  },
})

const form = createForm()

const schema = {
  type: 'object',
  properties: {
    string_array: {
      type: 'array',
      'x-component': 'ArrayCollapse',
      maxItems: 3,
      'x-decorator': 'FormItem',
      items: {
        type: 'void',
        'x-component': 'ArrayCollapse.CollapsePanel',
        'x-component-props': {
          title: 'String array',
        },
        properties: {
          index: {
            type: 'void',
            'x-component': 'ArrayCollapse.Index',
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
            'x-component': 'ArrayCollapse.Remove',
          },
          moveUp: {
            type: 'void',
            'x-component': 'ArrayCollapse.MoveUp',
          },
          moveDown: {
            type: 'void',
            'x-component': 'ArrayCollapse.MoveDown',
          },
        },
      },
      properties: {
        addition: {
          type: 'void',
          title: 'Add entry',
          'x-component': 'ArrayCollapse.Addition',
        },
      },
    },
    array: {
      type: 'array',
      'x-component': 'ArrayCollapse',
      maxItems: 3,
      'x-decorator': 'FormItem',
      items: {
        type: 'object',
        'x-component': 'ArrayCollapse.CollapsePanel',
        'x-component-props': {
          title: 'Object array',
        },
        properties: {
          index: {
            type: 'void',
            'x-component': 'ArrayCollapse.Index',
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
            'x-component': 'ArrayCollapse.Remove',
          },
          moveUp: {
            type: 'void',
            'x-component': 'ArrayCollapse.MoveUp',
          },
          moveDown: {
            type: 'void',
            'x-component': 'ArrayCollapse.MoveDown',
          },
        },
      },
      properties: {
        addition: {
          type: 'void',
          title: 'Add entry',
          'x-component': 'ArrayCollapse.Addition',
        },
      },
    },
    array_unshift: {
      type: 'array',
      'x-component': 'ArrayCollapse',
      maxItems: 3,
      'x-decorator': 'FormItem',
      items: {
        type: 'object',
        'x-component': 'ArrayCollapse.CollapsePanel',
        'x-component-props': {
          title: 'Object array',
        },
        properties: {
          index: {
            type: 'void',
            'x-component': 'ArrayCollapse.Index',
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
            'x-component': 'ArrayCollapse.Remove',
          },
          moveUp: {
            type: 'void',
            'x-component': 'ArrayCollapse.MoveUp',
          },
          moveDown: {
            type: 'void',
            'x-component': 'ArrayCollapse.MoveDown',
          },
        },
      },
      properties: {
        addition: {
          type: 'void',
          title: 'Add entry (unshift)',
          'x-component': 'ArrayCollapse.Addition',
          'x-component-props': {
            method: 'unshift',
          },
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
  ArrayCollapse,
  FormButtonGroup,
  Submit,
} from '@formily/next'
import { createForm, onFieldChange, onFieldReact } from '@formily/core'
import { FormProvider, createSchemaField } from '@formily/react'

const SchemaField = createSchemaField({
  components: {
    FormItem,
    Input,
    ArrayCollapse,
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
          x-component="ArrayCollapse"
          x-decorator="FormItem"
          x-component-props={{
            title: 'Object array',
          }}
        >
          <SchemaField.Object
            x-component="ArrayCollapse.CollapsePanel"
            x-component-props={{
              title: 'Object array',
            }}
          >
            <SchemaField.Void x-component="ArrayCollapse.Index" />
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
            <SchemaField.Void x-component="ArrayCollapse.Remove" />
            <SchemaField.Void x-component="ArrayCollapse.MoveUp" />
            <SchemaField.Void x-component="ArrayCollapse.MoveDown" />
          </SchemaField.Object>
          <SchemaField.Void
            x-component="ArrayCollapse.Addition"
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
  ArrayCollapse,
  FormButtonGroup,
  Submit,
} from '@formily/next'
import { createForm } from '@formily/core'
import { FormProvider, createSchemaField } from '@formily/react'

const SchemaField = createSchemaField({
  components: {
    FormItem,
    Input,
    ArrayCollapse,
  },
})

const form = createForm()

const schema = {
  type: 'object',
  properties: {
    array: {
      type: 'array',
      'x-component': 'ArrayCollapse',
      maxItems: 3,
      title: 'Object array',
      items: {
        type: 'object',
        'x-component': 'ArrayCollapse.CollapsePanel',
        'x-component-props': {
          title: 'Object array',
        },
        properties: {
          index: {
            type: 'void',
            'x-component': 'ArrayCollapse.Index',
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
            'x-component': 'ArrayCollapse.Remove',
          },
          moveUp: {
            type: 'void',
            'x-component': 'ArrayCollapse.MoveUp',
          },
          moveDown: {
            type: 'void',
            'x-component': 'ArrayCollapse.MoveDown',
          },
        },
      },
      properties: {
        addition: {
          type: 'void',
          title: 'Add entry',
          'x-component': 'ArrayCollapse.Addition',
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

### ArrayCollapse

Reference https://fusion.design/pc/component/collapse

Extended attributes

| Property name         | Type   | Description                  | Default value |
| --------------------- | ------ | ---------------------------- | ------------- |
| defaultOpenPanelCount | number | Default expanded Panel count | 5             |

### ArrayCollapse.CollapsePanel

Reference https://fusion.design/pc/component/collapse

### ArrayCollapse.Addition

> Add button

Extended attributes

| Property name | Type                 | Description   | Default value |
| ------------- | -------------------- | ------------- | ------------- |
| title         | ReactText            | Copywriting   |               |
| method        | `'push' \|'unshift'` | add method    | `'push'`      |
| defaultValue  | `any`                | Default value |               |

Other references https://fusion.design/pc/component/basic/button

Note: The title attribute can receive the title mapping in the Field model, that is, uploading the title in the Field is also effective

### ArrayCollapse.Remove

> Delete button

| Property name | Type      | Description | Default value |
| ------------- | --------- | ----------- | ------------- |
| title         | ReactText | Copywriting |               |

Other references https://ant.design/components/icon-cn/

Note: The title attribute can receive the title mapping in the Field model, that is, uploading the title in the Field is also effective

### ArrayCollapse.MoveDown

> Move down button

| Property name | Type      | Description | Default value |
| ------------- | --------- | ----------- | ------------- |
| title         | ReactText | Copywriting |               |

Other references https://ant.design/components/icon-cn/

Note: The title attribute can receive the title mapping in the Field model, that is, uploading the title in the Field is also effective

### ArrayCollapse.MoveUp

> Move up button

| Property name | Type      | Description | Default value |
| ------------- | --------- | ----------- | ------------- |
| title         | ReactText | Copywriting |               |

Other references https://ant.design/components/icon-cn/

Note: The title attribute can receive the title mapping in the Field model, that is, uploading the title in the Field is also effective

### ArrayCollapse.Index

> Index Renderer

No attributes

### ArrayCollapse.useIndex

> Read the React Hook of the current rendering row index

### ArrayCollapse.useRecord

> Read the React Hook of the current rendering row
