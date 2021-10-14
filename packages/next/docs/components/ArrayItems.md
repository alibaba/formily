# ArrayItems

> Self-increment list, suitable for simple self-increment editing scenes, or for scenes with high space requirements
>
> Note: This component is only applicable to Schema scenarios

## Markup Schema example

```tsx
import React from 'react'
import {
  FormItem,
  Input,
  Editable,
  Select,
  DatePicker,
  ArrayItems,
  FormButtonGroup,
  Submit,
  Space,
} from '@formily/next'
import { createForm } from '@formily/core'
import { FormProvider, createSchemaField } from '@formily/react'

const SchemaField = createSchemaField({
  components: {
    FormItem,
    DatePicker,
    Editable,
    Space,
    Input,
    Select,
    ArrayItems,
  },
})

const form = createForm()

export default () => {
  return (
    <FormProvider form={form}>
      <SchemaField>
        <SchemaField.Array
          name="string_array"
          title="string array"
          x-decorator="FormItem"
          x-component="ArrayItems"
        >
          <SchemaField.Void x-component="Space">
            <SchemaField.Void
              x-decorator="FormItem"
              x-component="ArrayItems.SortHandle"
            />
            <SchemaField.String
              x-decorator="FormItem"
              required
              name="input"
              x-component="Input"
            />
            <SchemaField.Void
              x-decorator="FormItem"
              x-component="ArrayItems.Remove"
            />
          </SchemaField.Void>
          <SchemaField.Void
            x-component="ArrayItems.Addition"
            title="Add entry"
          />
        </SchemaField.Array>
        <SchemaField.Array
          name="array"
          title="Object array"
          x-decorator="FormItem"
          x-component="ArrayItems"
        >
          <SchemaField.Object>
            <SchemaField.Void x-component="Space">
              <SchemaField.Void
                x-decorator="FormItem"
                x-component="ArrayItems.SortHandle"
              />
              <SchemaField.String
                x-decorator="FormItem"
                required
                title="date"
                name="date"
                x-component="DatePicker.RangePicker"
                x-component-props={{
                  style: {
                    width: 160,
                  },
                }}
              />
              <SchemaField.String
                x-decorator="FormItem"
                required
                title="input box"
                name="input"
                x-component="Input"
              />
              <SchemaField.String
                x-decorator="FormItem"
                required
                title="select box"
                name="select"
                enum={[
                  { label: 'Option 1', value: 1 },
                  { label: 'Option 2', value: 2 },
                ]}
                x-component="Select"
                x-component-props={{
                  style: {
                    width: 160,
                  },
                }}
              />
              <SchemaField.Void
                x-decorator="FormItem"
                x-component="ArrayItems.Remove"
              />
            </SchemaField.Void>
          </SchemaField.Object>
          <SchemaField.Void
            x-component="ArrayItems.Addition"
            title="Add entry"
          />
        </SchemaField.Array>
        <SchemaField.Array
          name="array2"
          title="Object array"
          x-decorator="FormItem"
          x-component="ArrayItems"
          x-component-props={{ style: { width: 300 } }}
        >
          <SchemaField.Object x-decorator="ArrayItems.Item">
            <SchemaField.Void
              x-decorator="FormItem"
              x-component="ArrayItems.SortHandle"
            />
            <SchemaField.String
              x-decorator="Editable"
              title="input box"
              name="input"
              x-component="Input"
            />
            <SchemaField.Object
              name="config"
              x-component="Editable.Popover"
              required
              title="Configure complex data"
              x-reactions={(field) =>
                (field.title = field.value?.input || field.title)
              }
            >
              <SchemaField.String
                x-decorator="FormItem"
                required
                title="date"
                name="date"
                x-component="DatePicker.RangePicker"
                x-component-props={{
                  style: { width: '100%' },
                  followTrigger: true,
                }}
              />
              <SchemaField.String
                x-decorator="FormItem"
                required
                title="input box"
                name="input"
                x-component="Input"
              />
            </SchemaField.Object>
            <SchemaField.Void
              x-decorator="FormItem"
              x-component="ArrayItems.Remove"
            />
          </SchemaField.Object>
          <SchemaField.Void
            x-component="ArrayItems.Addition"
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
  Editable,
  Input,
  Select,
  Radio,
  DatePicker,
  ArrayItems,
  FormButtonGroup,
  Submit,
  Space,
} from '@formily/next'
import { createForm } from '@formily/core'
import { FormProvider, createSchemaField } from '@formily/react'

const SchemaField = createSchemaField({
  components: {
    FormItem,
    Editable,
    DatePicker,
    Space,
    Radio,
    Input,
    Select,
    ArrayItems,
  },
})

const form = createForm()

const schema = {
  type: 'object',
  properties: {
    string_array: {
      type: 'array',
      'x-component': 'ArrayItems',
      'x-decorator': 'FormItem',
      title: 'String array',
      items: {
        type: 'void',
        'x-component': 'Space',
        properties: {
          sort: {
            type: 'void',
            'x-decorator': 'FormItem',
            'x-component': 'ArrayItems.SortHandle',
          },
          input: {
            type: 'string',
            'x-decorator': 'FormItem',
            'x-component': 'Input',
          },
          remove: {
            type: 'void',
            'x-decorator': 'FormItem',
            'x-component': 'ArrayItems.Remove',
          },
        },
      },
      properties: {
        add: {
          type: 'void',
          title: 'Add entry',
          'x-component': 'ArrayItems.Addition',
        },
      },
    },
    array: {
      type: 'array',
      'x-component': 'ArrayItems',
      'x-decorator': 'FormItem',
      title: 'Object array',
      items: {
        type: 'object',
        properties: {
          space: {
            type: 'void',
            'x-component': 'Space',
            properties: {
              sort: {
                type: 'void',
                'x-decorator': 'FormItem',
                'x-component': 'ArrayItems.SortHandle',
              },
              date: {
                type: 'string',
                title: 'Date',
                'x-decorator': 'FormItem',
                'x-component': 'DatePicker.RangePicker',
                'x-component-props': {
                  style: {
                    width: 160,
                  },
                },
              },
              input: {
                type: 'string',
                title: 'input box',
                'x-decorator': 'FormItem',
                'x-component': 'Input',
              },
              select: {
                type: 'string',
                title: 'drop-down box',
                enum: [
                  { label: 'Option 1', value: 1 },
                  { label: 'Option 2', value: 2 },
                ],
                'x-decorator': 'FormItem',
                'x-component': 'Select',
                'x-component-props': {
                  style: {
                    width: 160,
                  },
                },
              },
              remove: {
                type: 'void',
                'x-decorator': 'FormItem',
                'x-component': 'ArrayItems.Remove',
              },
            },
          },
        },
      },
      properties: {
        add: {
          type: 'void',
          title: 'Add entry',
          'x-component': 'ArrayItems.Addition',
        },
      },
    },
    array2: {
      type: 'array',
      'x-component': 'ArrayItems',
      'x-decorator': 'FormItem',
      'x-component-props': { style: { width: 300 } },
      title: 'Object array',
      items: {
        type: 'object',
        'x-decorator': 'ArrayItems.Item',
        properties: {
          sort: {
            type: 'void',
            'x-decorator': 'FormItem',
            'x-component': 'ArrayItems.SortHandle',
          },

          input: {
            type: 'string',
            title: 'input box',
            'x-decorator': 'Editable',
            'x-component': 'Input',
          },
          config: {
            type: 'object',
            title: 'Configure complex data',
            'x-component': 'Editable.Popover',
            'x-reactions':
              '{{(field)=>field.title = field.value && field.value.input || field.title}}',
            properties: {
              date: {
                type: 'string',
                title: 'Date',
                'x-decorator': 'FormItem',
                'x-component': 'DatePicker.RangePicker',
                'x-component-props': {
                  style: {
                    width: 160,
                  },
                  followTrigger: true,
                },
              },
              input: {
                type: 'string',
                title: 'input box',
                'x-decorator': 'FormItem',
                'x-component': 'Input',
              },
              select: {
                type: 'string',
                title: 'drop-down box',
                enum: [
                  { label: 'Option 1', value: 1 },
                  { label: 'Option 2', value: 2 },
                ],
                'x-decorator': 'FormItem',
                'x-component': 'Select',
                'x-component-props': {
                  style: {
                    width: 160,
                  },
                },
              },
            },
          },
          remove: {
            type: 'void',
            'x-decorator': 'FormItem',
            'x-component': 'ArrayItems.Remove',
          },
        },
      },
      properties: {
        add: {
          type: 'void',
          title: 'Add entry',
          'x-component': 'ArrayItems.Addition',
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
  ArrayItems,
  Editable,
  FormButtonGroup,
  Submit,
  Space,
} from '@formily/next'
import { createForm, onFieldChange, onFieldReact } from '@formily/core'
import { FormProvider, createSchemaField } from '@formily/react'

const SchemaField = createSchemaField({
  components: {
    Space,
    Editable,
    FormItem,
    Input,
    ArrayItems,
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
          title="Object array"
          maxItems={3}
          x-decorator="FormItem"
          x-component="ArrayItems"
          x-component-props={{
            style: {
              width: 300,
            },
          }}
        >
          <SchemaField.Object x-decorator="ArrayItems.Item">
            <SchemaField.Void x-component="Space">
              <SchemaField.Void
                x-decorator="FormItem"
                x-component="ArrayItems.SortHandle"
              />
              <SchemaField.Void
                x-decorator="FormItem"
                x-component="ArrayItems.Index"
              />
            </SchemaField.Void>
            <SchemaField.Void
              x-component="Editable.Popover"
              title="Configuration data"
            >
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
            </SchemaField.Void>
            <SchemaField.Void x-component="Space">
              <SchemaField.Void
                x-decorator="FormItem"
                x-component="ArrayItems.Remove"
              />
              <SchemaField.Void
                x-decorator="FormItem"
                x-component="ArrayItems.MoveUp"
              />
              <SchemaField.Void
                x-decorator="FormItem"
                x-component="ArrayItems.MoveDown"
              />
            </SchemaField.Void>
          </SchemaField.Object>
          <SchemaField.Void
            x-component="ArrayItems.Addition"
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
  ArrayItems,
  Editable,
  FormButtonGroup,
  Submit,
  Space,
} from '@formily/next'
import { createForm } from '@formily/core'
import { FormProvider, createSchemaField } from '@formily/react'

const SchemaField = createSchemaField({
  components: {
    Space,
    Editable,
    FormItem,
    Input,
    ArrayItems,
  },
})

const form = createForm()

const schema = {
  type: 'object',
  properties: {
    array: {
      type: 'array',
      'x-component': 'ArrayItems',
      'x-decorator': 'FormItem',
      maxItems: 3,
      title: 'Object array',
      'x-component-props': { style: { width: 300 } },
      items: {
        type: 'object',
        'x-decorator': 'ArrayItems.Item',
        properties: {
          left: {
            type: 'void',
            'x-component': 'Space',
            properties: {
              sort: {
                type: 'void',
                'x-decorator': 'FormItem',
                'x-component': 'ArrayItems.SortHandle',
              },
              index: {
                type: 'void',
                'x-decorator': 'FormItem',
                'x-component': 'ArrayItems.Index',
              },
            },
          },
          edit: {
            type: 'void',
            'x-component': 'Editable.Popover',
            title: 'Configuration data',
            properties: {
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
            },
          },
          right: {
            type: 'void',
            'x-component': 'Space',
            properties: {
              remove: {
                type: 'void',
                'x-component': 'ArrayItems.Remove',
              },
              moveUp: {
                type: 'void',
                'x-component': 'ArrayItems.MoveUp',
              },
              moveDown: {
                type: 'void',
                'x-component': 'ArrayItems.MoveDown',
              },
            },
          },
        },
      },
      properties: {
        addition: {
          type: 'void',
          title: 'Add entry',
          'x-component': 'ArrayItems.Addition',
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

### ArrayItems

Inherit HTMLDivElement Props

### ArrayItems.Item

> List block

Inherit HTMLDivElement Props

Extended attributes

| Property name | Type                | Description           | Default value |
| ------------- | ------------------- | --------------------- | ------------- |
| type          | `'card' \|'divide'` | card or dividing line |               |

### ArrayItems.SortHandle

> Drag handle

Reference https://ant.design/components/icon-cn/

### ArrayItems.Addition

> Add button

Extended attributes

| Property name | Type                 | Description   | Default value |
| ------------- | -------------------- | ------------- | ------------- |
| title         | ReactText            | Copywriting   |               |
| method        | `'push' \|'unshift'` | add method    | `'push'`      |
| defaultValue  | `any`                | Default value |               |

Other references https://fusion.design/pc/component/basic/button

Note: The title attribute can receive the title mapping in the Field model, that is, uploading the title in the Field is also effective

### ArrayItems.Remove

> Delete button

| Property name | Type      | Description | Default value |
| ------------- | --------- | ----------- | ------------- |
| title         | ReactText | Copywriting |               |

Other references https://ant.design/components/icon-cn/

Note: The title attribute can receive the title mapping in the Field model, that is, uploading the title in the Field is also effective

### ArrayItems.MoveDown

> Move down button

| Property name | Type      | Description | Default value |
| ------------- | --------- | ----------- | ------------- |
| title         | ReactText | Copywriting |               |

Other references https://ant.design/components/icon-cn/

Note: The title attribute can receive the title mapping in the Field model, that is, uploading the title in the Field is also effective

### ArrayItems.MoveUp

> Move up button

| Property name | Type      | Description | Default value |
| ------------- | --------- | ----------- | ------------- |
| title         | ReactText | Copywriting |               |

Other references https://ant.design/components/icon-cn/

Note: The title attribute can receive the title mapping in the Field model, that is, uploading the title in the Field is also effective

### ArrayItems.Index

> Index Renderer

No attributes

### ArrayItems.useIndex

> Read the React Hook of the current rendering row index

### ArrayItems.useRecord

> Read the React Hook of the current rendering row
