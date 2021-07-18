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
  FormButtonGroup,
  Submit,
  Space,
} from '@formily/antd'
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
          <SchemaField.Object x-decorator="ArrayItems.Item">
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
              x-reactions={(field) => {
                field.title = field.value?.input || field.title
              }}
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
      <FormButtonGroup>
        <Submit onSubmit={console.log}>提交</Submit>
      </FormButtonGroup>
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
  FormButtonGroup,
  Submit,
  Space,
} from '@formily/antd'
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
        'x-decorator': 'ArrayItems.Item',
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
            'x-reactions':
              '{{(field)=>field.title = field.value && field.value.input || field.title}}',
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
      <FormButtonGroup>
        <Submit onSubmit={console.log}>提交</Submit>
      </FormButtonGroup>
    </FormProvider>
  )
}
```

## Effects 联动案例

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
} from '@formily/antd'
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
    //主动联动模式
    onFieldChange('array.*.aa', ['value'], (field, form) => {
      form.setFieldState(field.query('.bb'), (state) => {
        state.visible = field.value != '123'
      })
    })
    //被动联动模式
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
                description="CC输入123时隐藏DD"
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
      <FormButtonGroup>
        <Submit onSubmit={console.log}>提交</Submit>
      </FormButtonGroup>
    </FormProvider>
  )
}
```

## JSON Schema 联动案例

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
} from '@formily/antd'
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
      title: '对象数组',
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
      <FormButtonGroup>
        <Submit onSubmit={console.log}>提交</Submit>
      </FormButtonGroup>
    </FormProvider>
  )
}
```

## API

### ArrayItems

继承 HTMLDivElement Props

### ArrayItems.Item

> 列表区块

继承 HTMLDivElement Props

扩展属性

| 属性名 | 类型                 | 描述           | 默认值 |
| ------ | -------------------- | -------------- | ------ |
| type   | `'card' \| 'divide'` | 卡片或者分割线 |        |

### ArrayItems.SortHandle

> 拖拽手柄

参考 https://ant.design/components/icon-cn/

### ArrayItems.Addition

> 添加按钮

扩展属性

| 属性名       | 类型                  | 描述     | 默认值   |
| ------------ | --------------------- | -------- | -------- |
| title        | ReactText             | 文案     |          |
| method       | `'push' \| 'unshift'` | 添加方式 | `'push'` |
| defaultValue | `any`                 | 默认值   |          |

其余参考 https://ant.design/components/button-cn/

注意：title 属性可以接收 Field 模型中的 title 映射，也就是在 Field 上传 title 也是生效的

### ArrayItems.Remove

> 删除按钮

| 属性名 | 类型      | 描述 | 默认值 |
| ------ | --------- | ---- | ------ |
| title  | ReactText | 文案 |        |

其余参考 https://ant.design/components/icon-cn/

注意：title 属性可以接收 Field 模型中的 title 映射，也就是在 Field 上传 title 也是生效的

### ArrayItems.MoveDown

> 下移按钮

| 属性名 | 类型      | 描述 | 默认值 |
| ------ | --------- | ---- | ------ |
| title  | ReactText | 文案 |        |

其余参考 https://ant.design/components/icon-cn/

注意：title 属性可以接收 Field 模型中的 title 映射，也就是在 Field 上传 title 也是生效的

### ArrayItems.MoveUp

> 上移按钮

| 属性名 | 类型      | 描述 | 默认值 |
| ------ | --------- | ---- | ------ |
| title  | ReactText | 文案 |        |

其余参考 https://ant.design/components/icon-cn/

注意：title 属性可以接收 Field 模型中的 title 映射，也就是在 Field 上传 title 也是生效的

### ArrayItems.Index

> 索引渲染器

无属性

### ArrayItems.useIndex

> 读取当前渲染行索引的 React Hook
