# ArrayTable

> Self-increasing table, it is more suitable to use this component for scenes with a large amount of data. Although the amount of data is large to a certain extent, it will be a little bit stuck, but it will not affect the basic operation
>
> Note: This component is only applicable to Schema scenarios and can only be an array of objects

## Markup Schema example

```tsx
import React from 'react'
import {
  FormItem,
  Input,
  ArrayTable,
  Editable,
  FormButtonGroup,
  Submit,
} from '@formily/next'
import { createForm } from '@formily/core'
import { FormProvider, createSchemaField } from '@formily/react'
import { Button, Message } from '@alifd/next'

const SchemaField = createSchemaField({
  components: {
    FormItem,
    Editable,
    Input,
    ArrayTable,
  },
})

const form = createForm()

const range = (count: number) =>
  Array.from(new Array(count)).map((_, key) => ({
    aaa: key,
  }))

export default () => {
  return (
    <FormProvider form={form}>
      <SchemaField>
        <SchemaField.Array
          name="array"
          x-decorator="FormItem"
          x-component="ArrayTable"
          x-component-props={{
            pagination: { pageSize: 10 },
            style: { width: '100%' },
          }}
        >
          <SchemaField.Object>
            <SchemaField.Void
              x-component="ArrayTable.Column"
              x-component-props={{ width: 80, title: 'Sort', align: 'center' }}
            >
              <SchemaField.Void
                x-decorator="FormItem"
                required
                x-component="ArrayTable.SortHandle"
              />
            </SchemaField.Void>
            <SchemaField.Void
              x-component="ArrayTable.Column"
              x-component-props={{
                width: 120,
                title: 'Index',
                align: 'center',
              }}
            >
              <SchemaField.String
                x-decorator="FormItem"
                required
                x-component="ArrayTable.Index"
              />
            </SchemaField.Void>
            <SchemaField.Void
              x-component="ArrayTable.Column"
              x-component-props={{ title: 'A1', dataIndex: 'a1', width: 200 }}
            >
              <SchemaField.String
                name="a1"
                x-decorator="Editable"
                required
                x-component="Input"
              />
            </SchemaField.Void>
            <SchemaField.Void
              x-component="ArrayTable.Column"
              x-component-props={{ title: 'A2', width: 200 }}
            >
              <SchemaField.String
                x-decorator="FormItem"
                name="a2"
                required
                x-component="Input"
              />
            </SchemaField.Void>
            <SchemaField.Void
              x-component="ArrayTable.Column"
              x-component-props={{ title: 'A3', width: 200 }}
            >
              <SchemaField.String
                x-decorator="FormItem"
                name="a3"
                required
                x-component="Input"
              />
            </SchemaField.Void>
            <SchemaField.Void
              x-component="ArrayTable.Column"
              x-component-props={{
                title: 'Operations',
                dataIndex: 'operations',
                width: 200,
                fixed: 'right',
              }}
            >
              <SchemaField.Void x-component="FormItem">
                <SchemaField.Void x-component="ArrayTable.Remove" />
                <SchemaField.Void x-component="ArrayTable.MoveDown" />
                <SchemaField.Void x-component="ArrayTable.MoveUp" />
              </SchemaField.Void>
            </SchemaField.Void>
          </SchemaField.Object>
          <SchemaField.Void
            x-component="ArrayTable.Addition"
            title="Add entry"
          />
        </SchemaField.Array>
      </SchemaField>
      <FormButtonGroup>
        <Submit onSubmit={console.log}>Submit</Submit>
        <Button
          onClick={() => {
            form.setInitialValues({
              array: range(100000),
            })
          }}
        >
          Load 10W pieces of large data
        </Button>
      </FormButtonGroup>
      <Message style={{ marginTop: 10 }} type="warning">
        Note: Open the formily plug-in page, because there is data communication
        in the background, which will occupy the browser's computing power, it
        is best to test in the incognito mode (without the formily plug-in)
      </Message>
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
  ArrayTable,
  Editable,
  FormButtonGroup,
  Submit,
} from '@formily/next'
import { createForm } from '@formily/core'
import { FormProvider, createSchemaField } from '@formily/react'

const SchemaField = createSchemaField({
  components: {
    FormItem,
    Editable,
    Input,
    ArrayTable,
  },
})

const form = createForm()

const schema = {
  type: 'object',
  properties: {
    array: {
      type: 'array',
      'x-decorator': 'FormItem',
      'x-component': 'ArrayTable',
      'x-component-props': {
        pagination: { pageSize: 10 },
        style: { width: '100%' },
      },
      items: {
        type: 'object',
        properties: {
          column1: {
            type: 'void',
            'x-component': 'ArrayTable.Column',
            'x-component-props': { width: 80, title: 'Sort', align: 'center' },
            properties: {
              sort: {
                type: 'void',
                'x-component': 'ArrayTable.SortHandle',
              },
            },
          },
          column2: {
            type: 'void',
            'x-component': 'ArrayTable.Column',
            'x-component-props': {
              width: 120,
              title: 'Index',
              align: 'center',
            },
            properties: {
              index: {
                type: 'void',
                'x-component': 'ArrayTable.Index',
              },
            },
          },
          column3: {
            type: 'void',
            'x-component': 'ArrayTable.Column',
            'x-component-props': { width: 200, title: 'A1' },
            properties: {
              a1: {
                type: 'string',
                'x-decorator': 'Editable',
                'x-component': 'Input',
              },
            },
          },
          column4: {
            type: 'void',
            'x-component': 'ArrayTable.Column',
            'x-component-props': { width: 200, title: 'A2' },
            properties: {
              a2: {
                type: 'string',
                'x-decorator': 'FormItem',
                'x-component': 'Input',
              },
            },
          },
          column5: {
            type: 'void',
            'x-component': 'ArrayTable.Column',
            'x-component-props': { width: 200, title: 'A3' },
            properties: {
              a3: {
                type: 'string',
                'x-decorator': 'FormItem',
                'x-component': 'Input',
              },
            },
          },
          column6: {
            type: 'void',
            'x-component': 'ArrayTable.Column',
            'x-component-props': {
              title: 'Operations',
              dataIndex: 'operations',
              width: 200,
              fixed: 'right',
            },
            properties: {
              item: {
                type: 'void',
                'x-component': 'FormItem',
                properties: {
                  remove: {
                    type: 'void',
                    'x-component': 'ArrayTable.Remove',
                  },
                  moveDown: {
                    type: 'void',
                    'x-component': 'ArrayTable.MoveDown',
                  },
                  moveUp: {
                    type: 'void',
                    'x-component': 'ArrayTable.MoveUp',
                  },
                },
              },
            },
          },
        },
      },
      properties: {
        add: {
          type: 'void',
          'x-component': 'ArrayTable.Addition',
          title: 'Add entry',
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
  ArrayTable,
  Switch,
  FormButtonGroup,
  Submit,
} from '@formily/next'
import { createForm, onFieldChange, onFieldReact } from '@formily/core'
import { FormProvider, createSchemaField } from '@formily/react'
import { Button } from '@alifd/next'

const SchemaField = createSchemaField({
  components: {
    FormItem,
    Switch,
    Input,
    Button,
    ArrayTable,
  },
})

const form = createForm({
  effects: () => {
    //Active linkage mode
    onFieldChange('hideFirstColumn', ['value'], (field) => {
      field.query('array.column4').take((target) => {
        target.visible = !field.value
      })
      field.query('array.*.a2').take((target) => {
        target.visible = !field.value
      })
    })
    //Passive linkage mode
    onFieldReact('array.*.a2', (field) => {
      field.visible = !field.query('.a1').get('value')
    })
  },
})

export default () => {
  return (
    <FormProvider form={form}>
      <SchemaField>
        <SchemaField.Boolean
          name="hideFirstColumn"
          x-decorator="FormItem"
          x-component="Switch"
          title="Hide A2"
        />
        <SchemaField.Array
          name="array"
          x-decorator="FormItem"
          x-component="ArrayTable"
          x-component-props={{
            pagination: { pageSize: 10 },
            style: { width: '100%' },
          }}
        >
          <SchemaField.Object>
            <SchemaField.Void
              x-component="ArrayTable.Column"
              name="column1"
              x-component-props={{ width: 80, title: 'Sort', align: 'center' }}
            >
              <SchemaField.Void
                x-decorator="FormItem"
                required
                x-component="ArrayTable.SortHandle"
              />
            </SchemaField.Void>
            <SchemaField.Void
              x-component="ArrayTable.Column"
              name="column2"
              x-component-props={{
                width: 120,
                title: 'Index',
                align: 'center',
              }}
            >
              <SchemaField.String
                x-decorator="FormItem"
                required
                x-component="ArrayTable.Index"
              />
            </SchemaField.Void>
            <SchemaField.Void
              x-component="ArrayTable.Column"
              name="column3"
              x-component-props={{
                title: 'Explicitly hidden->A2',
                dataIndex: 'a1',
                width: 100,
              }}
            >
              <SchemaField.Boolean
                name="a1"
                x-decorator="FormItem"
                required
                x-component="Switch"
              />
            </SchemaField.Void>
            <SchemaField.Void
              x-component="ArrayTable.Column"
              name="column4"
              x-component-props={{ title: 'A2', width: 200 }}
            >
              <SchemaField.String
                x-decorator="FormItem"
                name="a2"
                required
                x-component="Input"
              />
            </SchemaField.Void>
            <SchemaField.Void
              x-component="ArrayTable.Column"
              name="column5"
              x-component-props={{ title: 'A3', width: 200 }}
            >
              <SchemaField.String
                x-decorator="FormItem"
                name="a3"
                required
                x-component="Input"
              />
            </SchemaField.Void>
            <SchemaField.Void
              x-component="ArrayTable.Column"
              name="column6"
              x-component-props={{
                title: 'Operations',
                dataIndex: 'operations',
                width: 200,
                fixed: 'right',
              }}
            >
              <SchemaField.Void x-component="FormItem">
                <SchemaField.Void x-component="ArrayTable.Remove" />
                <SchemaField.Void x-component="ArrayTable.MoveDown" />
                <SchemaField.Void x-component="ArrayTable.MoveUp" />
              </SchemaField.Void>
            </SchemaField.Void>
          </SchemaField.Object>
          <SchemaField.Void
            x-component="ArrayTable.Addition"
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
  ArrayTable,
  Switch,
  FormButtonGroup,
  Submit,
} from '@formily/next'
import { createForm } from '@formily/core'
import { FormProvider, createSchemaField } from '@formily/react'

const SchemaField = createSchemaField({
  components: {
    FormItem,
    Switch,
    Input,
    ArrayTable,
  },
})

const form = createForm()

const schema = {
  type: 'object',
  properties: {
    hideFirstColumn: {
      type: 'boolean',
      title: 'Hide A2',
      'x-decorator': 'FormItem',
      'x-component': 'Switch',
    },
    array: {
      type: 'array',
      'x-decorator': 'FormItem',
      'x-component': 'ArrayTable',
      'x-component-props': {
        pagination: { pageSize: 10 },
        style: { width: '100%' },
      },
      items: {
        type: 'object',
        properties: {
          column1: {
            type: 'void',
            'x-component': 'ArrayTable.Column',
            'x-component-props': { width: 80, title: 'Sort', align: 'center' },

            properties: {
              sort: {
                type: 'void',
                'x-component': 'ArrayTable.SortHandle',
              },
            },
          },
          column2: {
            type: 'void',
            'x-component': 'ArrayTable.Column',
            'x-component-props': {
              width: 120,
              title: 'Index',
              align: 'center',
            },
            properties: {
              index: {
                type: 'void',
                'x-component': 'ArrayTable.Index',
              },
            },
          },
          column3: {
            type: 'void',
            'x-component': 'ArrayTable.Column',
            'x-component-props': { width: 100, title: 'Explicitly hidden->A2' },
            properties: {
              a1: {
                type: 'string',
                'x-decorator': 'FormItem',
                'x-component': 'Switch',
              },
            },
          },
          column4: {
            type: 'void',
            'x-component': 'ArrayTable.Column',
            'x-component-props': { width: 200, title: 'A2' },
            'x-reactions': [
              {
                dependencies: ['hideFirstColumn'],
                when: '{{$deps[0]}}',
                fulfill: {
                  schema: {
                    'x-visible': false,
                  },
                },
                otherwise: {
                  schema: {
                    'x-visible': true,
                  },
                },
              },
            ],
            properties: {
              a2: {
                type: 'string',
                'x-decorator': 'FormItem',
                'x-component': 'Input',
                required: true,
                'x-reactions': [
                  {
                    dependencies: ['.a1', 'hideFirstColumn'],
                    when: '{{$deps[1] || $deps[0]}}',
                    fulfill: {
                      schema: {
                        'x-visible': false,
                      },
                    },
                    otherwise: {
                      schema: {
                        'x-visible': true,
                      },
                    },
                  },
                ],
              },
            },
          },
          column5: {
            type: 'void',
            'x-component': 'ArrayTable.Column',
            'x-component-props': { width: 200, title: 'A3' },
            properties: {
              a3: {
                type: 'string',
                required: true,
                'x-decorator': 'FormItem',
                'x-component': 'Input',
              },
            },
          },
          column6: {
            type: 'void',
            'x-component': 'ArrayTable.Column',
            'x-component-props': {
              title: 'Operations',
              dataIndex: 'operations',
              width: 200,
              fixed: 'right',
            },
            properties: {
              item: {
                type: 'void',
                'x-component': 'FormItem',
                properties: {
                  remove: {
                    type: 'void',
                    'x-component': 'ArrayTable.Remove',
                  },
                  moveDown: {
                    type: 'void',
                    'x-component': 'ArrayTable.MoveDown',
                  },
                  moveUp: {
                    type: 'void',
                    'x-component': 'ArrayTable.MoveUp',
                  },
                },
              },
            },
          },
        },
      },
      properties: {
        add: {
          type: 'void',
          'x-component': 'ArrayTable.Addition',
          title: 'Add entry',
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

### ArrayTable

> Form Components

Reference https://fusion.design/pc/component/basic/table

### ArrayTable.Column

> Table Column

Reference https://fusion.design/pc/component/basic/table

### ArrayTable.SortHandle

> Drag handle

Reference https://ant.design/components/icon-cn/

### ArrayTable.Addition

> Add button

Extended attributes

| Property name | Type                 | Description   | Default value |
| ------------- | -------------------- | ------------- | ------------- |
| title         | ReactText            | Copywriting   |               |
| method        | `'push' \|'unshift'` | add method    | `'push'`      |
| defaultValue  | `any`                | Default value |               |

Other references https://fusion.design/pc/component/basic/button

Note: The title attribute can receive the title mapping in the Field model, that is, uploading the title in the Field is also effective

### ArrayTable.Remove

> Delete button

| Property name | Type      | Description | Default value |
| ------------- | --------- | ----------- | ------------- |
| title         | ReactText | Copywriting |               |

Other references https://ant.design/components/icon-cn/

Note: The title attribute can receive the title mapping in the Field model, that is, uploading the title in the Field is also effective

### ArrayTable.MoveDown

> Move down button

| Property name | Type      | Description | Default value |
| ------------- | --------- | ----------- | ------------- |
| title         | ReactText | Copywriting |               |

Other references https://ant.design/components/icon-cn/

Note: The title attribute can receive the title mapping in the Field model, that is, uploading the title in the Field is also effective

### ArrayTable.MoveUp

> Move up button

| Property name | Type      | Description | Default value |
| ------------- | --------- | ----------- | ------------- |
| title         | ReactText | Copywriting |               |

Other references https://ant.design/components/icon-cn/

Note: The title attribute can receive the title mapping in the Field model, that is, uploading the title in the Field is also effective

### ArrayTable.Index

> Index Renderer

No attributes

### ArrayItems.useIndex

> Read the React Hook of the current rendering row index
