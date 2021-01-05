# ArrayItems

> 自增列表，对于简单的自增编辑场景比较适合，或者对于空间要求高的场景比较适合
>
> 注意：该组件只适用于 Schema 场景

## Markup Schema 案例

```tsx
import React from 'react'
import {
  FormItem,
  Input,
  Editable,
  Select,
  DatePicker,
  ArrayItems,
} from '@formily/antd'
import {
  FormProvider,
  createForm,
  onFieldReact,
  onFieldChange,
} from '@formily/react'
import { createSchemaField } from '@formily/react-schema-field'
import { Button, Space } from 'antd'

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
          title="字符串数组"
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
            title="添加条目"
          />
        </SchemaField.Array>
        <SchemaField.Array
          name="array"
          title="对象数组"
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
                title="日期"
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
                title="输入框"
                name="input"
                x-component="Input"
              />
              <SchemaField.String
                x-decorator="FormItem"
                required
                title="选择框"
                name="select"
                enum={[
                  { label: '选项1', value: 1 },
                  { label: '选项2', value: 2 },
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
            title="添加条目"
          />
        </SchemaField.Array>
        <SchemaField.Array
          name="array2"
          title="对象数组"
          x-decorator="FormItem"
          x-component="ArrayItems"
          x-component-props={{ style: { width: 300 } }}
        >
          <SchemaField.Object x-decorator="ArrayItems.Card">
            <SchemaField.Void
              x-decorator="FormItem"
              x-component="ArrayItems.SortHandle"
            />
            <SchemaField.String
              x-decorator="Editable"
              title="输入框"
              name="input"
              x-component="Input"
              x-component-props={{ bordered: false }}
            />
            <SchemaField.Object
              name="config"
              x-component="Editable.Popover"
              required
              title="配置复杂数据"
              x-component-props={{ dataIndex: 'input' }}
            >
              <SchemaField.String
                x-decorator="FormItem"
                required
                title="日期"
                name="date"
                x-component="DatePicker.RangePicker"
                x-component-props={{ style: { width: '100%' } }}
              />
              <SchemaField.String
                x-decorator="FormItem"
                required
                title="输入框"
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
            title="添加条目"
          />
        </SchemaField.Array>
      </SchemaField>
    </FormProvider>
  )
}
```

## JSON Schema 案例

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
} from '@formily/antd'
import {
  FormProvider,
  createForm,
  onFieldReact,
  onFieldChange,
} from '@formily/react'
import { createSchemaField } from '@formily/react-schema-field'
import { Button, Space } from 'antd'

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
      title: '字符串数组',
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
          title: '添加条目',
          'x-component': 'ArrayItems.Addition',
        },
      },
    },
    array: {
      type: 'array',
      'x-component': 'ArrayItems',
      'x-decorator': 'FormItem',
      title: '对象数组',
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
                title: '日期',
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
                title: '输入框',
                'x-decorator': 'FormItem',
                'x-component': 'Input',
              },
              select: {
                type: 'string',
                title: '下拉框',
                enum: [
                  { label: '选项1', value: 1 },
                  { label: '选项2', value: 2 },
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
          title: '添加条目',
          'x-component': 'ArrayItems.Addition',
        },
      },
    },
    array2: {
      type: 'array',
      'x-component': 'ArrayItems',
      'x-decorator': 'FormItem',
      'x-component-props': { style: { width: 300 } },
      title: '对象数组',
      items: {
        type: 'object',
        'x-decorator': 'ArrayItems.Card',
        properties: {
          sort: {
            type: 'void',
            'x-decorator': 'FormItem',
            'x-component': 'ArrayItems.SortHandle',
          },

          input: {
            type: 'string',
            title: '输入框',
            'x-decorator': 'Editable',
            'x-component': 'Input',
            'x-component-props': {
              bordered: false,
            },
          },
          config: {
            type: 'object',
            title: '配置复杂数据',
            'x-component': 'Editable.Popover',
            'x-component-props': {
              dataIndex: 'input',
            },
            properties: {
              date: {
                type: 'string',
                title: '日期',
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
                title: '输入框',
                'x-decorator': 'FormItem',
                'x-component': 'Input',
              },
              select: {
                type: 'string',
                title: '下拉框',
                enum: [
                  { label: '选项1', value: 1 },
                  { label: '选项2', value: 2 },
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
          title: '添加条目',
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
    </FormProvider>
  )
}
```

## Effects 联动案例

```tsx
import React from 'react'
import { FormItem, Input, ArrayItems, Editable } from '@formily/antd'
import {
  FormProvider,
  createForm,
  onFieldChange,
  onFieldReact,
} from '@formily/react'
import { createSchemaField } from '@formily/react-schema-field'
import { Space } from 'antd'

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
    //主动联动模式
    onFieldChange('array.*.aa', ['value'], (field, form) => {
      form.setFieldState(field.query('.bb'), (state) => {
        state.visible = field.value != '123'
      })
    })
    //被动联动模式
    onFieldReact('array.*.dd', (field) => {
      field.visible = field.query('.cc').value != '123'
    })
  },
})

export default () => {
  return (
    <FormProvider form={form}>
      <SchemaField>
        <SchemaField.Array
          name="array"
          title="对象数组"
          maxItems={3}
          x-decorator="FormItem"
          x-component="ArrayItems"
          x-component-props={{
            style: {
              width: 300,
            },
          }}
        >
          <SchemaField.Object x-decorator="ArrayItems.Card">
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
            <SchemaField.Void x-component="Editable.Popover" title="配置数据">
              <SchemaField.String
                name="aa"
                x-decorator="FormItem"
                title="AA"
                required
                description="AA输入123时隐藏BB"
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
                description="CC输入123时隐藏BB"
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
            title="添加条目"
          />
        </SchemaField.Array>
      </SchemaField>
    </FormProvider>
  )
}
```

## JSON Schema 联动案例

```tsx
import React from 'react'
import { FormItem, Input, ArrayItems, Editable } from '@formily/antd'
import {
  FormProvider,
  createForm,
  onFieldChange,
  onFieldReact,
} from '@formily/react'
import { createSchemaField } from '@formily/react-schema-field'
import { Space } from 'antd'

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
      title: '对象数组',
      'x-component-props': { style: { width: 300 } },
      items: {
        type: 'object',
        'x-decorator': 'ArrayItems.Card',
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
            title: '配置数据',
            properties: {
              aa: {
                type: 'string',
                'x-decorator': 'FormItem',
                title: 'AA',
                required: true,
                'x-component': 'Input',
                description: '输入123',
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
                    fullfill: {
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
          title: '添加条目',
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
    </FormProvider>
  )
}
```

## API

### ArrayItems

### ArrayItems.Card

### ArrayItems.SortHandle

### ArrayItems.Addition

### ArrayItems.Remove

### ArrayItems.MoveDown

### ArrayItems.MoveUp

### ArrayItems.Index
