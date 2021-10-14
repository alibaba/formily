# ArrayCollapse

> 折叠面板，对于每行字段数量较多，联动较多的场景比较适合使用 ArrayCollapse
>
> 注意：该组件只适用于 Schema 场景

## Markup Schema 案例

```tsx
import React from 'react'
import {
  FormItem,
  Input,
  ArrayCollapse,
  FormButtonGroup,
  Submit,
} from '@formily/antd'
import { createForm } from '@formily/core'
import { FormProvider, createSchemaField } from '@formily/react'
import { Button } from 'antd'

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
              header: '字符串数组',
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
            title="添加条目"
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
              header: '对象数组',
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
            title="添加条目"
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
              header: '字符串数组',
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
            title="添加条目（unshift）"
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
          加载默认数据
        </Button>
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
  Input,
  ArrayCollapse,
  FormButtonGroup,
  Submit,
} from '@formily/antd'
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
          header: '字符串数组',
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
          title: '添加条目',
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
          header: '对象数组',
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
          title: '添加条目',
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
          header: '对象数组',
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
          title: '添加条目(unshift)',
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
  ArrayCollapse,
  FormButtonGroup,
  Submit,
} from '@formily/antd'
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
          maxItems={3}
          x-component="ArrayCollapse"
          x-decorator="FormItem"
          x-component-props={{
            title: '对象数组',
          }}
        >
          <SchemaField.Object
            x-component="ArrayCollapse.CollapsePanel"
            x-component-props={{
              header: '对象数组',
            }}
          >
            <SchemaField.Void x-component="ArrayCollapse.Index" />
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
            <SchemaField.Void x-component="ArrayCollapse.Remove" />
            <SchemaField.Void x-component="ArrayCollapse.MoveUp" />
            <SchemaField.Void x-component="ArrayCollapse.MoveDown" />
          </SchemaField.Object>
          <SchemaField.Void
            x-component="ArrayCollapse.Addition"
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
  ArrayCollapse,
  FormButtonGroup,
  Submit,
} from '@formily/antd'
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
      title: '对象数组',
      items: {
        type: 'object',
        'x-component': 'ArrayCollapse.CollapsePanel',
        'x-component-props': {
          header: '对象数组',
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
          title: '添加条目',
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
        <Submit onSubmit={console.log}>提交</Submit>
      </FormButtonGroup>
    </FormProvider>
  )
}
```

## API

### ArrayCollapse

参考 https://ant.design/components/collapse-cn/

### ArrayCollapse.CollapsePanel

参考 https://ant.design/components/collapse-cn/

### ArrayCollapse.Addition

> 添加按钮

扩展属性

| 属性名       | 类型                  | 描述     | 默认值   |
| ------------ | --------------------- | -------- | -------- |
| title        | ReactText             | 文案     |          |
| method       | `'push' \| 'unshift'` | 添加方式 | `'push'` |
| defaultValue | `any`                 | 默认值   |          |

其余参考 https://ant.design/components/button-cn/

注意：title 属性可以接收 Field 模型中的 title 映射，也就是在 Field 上传 title 也是生效的

### ArrayCollapse.Remove

> 删除按钮

| 属性名 | 类型      | 描述 | 默认值 |
| ------ | --------- | ---- | ------ |
| title  | ReactText | 文案 |        |

其余参考 https://ant.design/components/icon-cn/

注意：title 属性可以接收 Field 模型中的 title 映射，也就是在 Field 上传 title 也是生效的

### ArrayCollapse.MoveDown

> 下移按钮

| 属性名 | 类型      | 描述 | 默认值 |
| ------ | --------- | ---- | ------ |
| title  | ReactText | 文案 |        |

其余参考 https://ant.design/components/icon-cn/

注意：title 属性可以接收 Field 模型中的 title 映射，也就是在 Field 上传 title 也是生效的

### ArrayCollapse.MoveUp

> 上移按钮

| 属性名 | 类型      | 描述 | 默认值 |
| ------ | --------- | ---- | ------ |
| title  | ReactText | 文案 |        |

其余参考 https://ant.design/components/icon-cn/

注意：title 属性可以接收 Field 模型中的 title 映射，也就是在 Field 上传 title 也是生效的

### ArrayCollapse.Index

> 索引渲染器

无属性

### ArrayCollapse.useIndex

> 读取当前渲染行索引的 React Hook

### ArrayCollapse.useRecord

> 读取当前渲染记录的 React Hook
