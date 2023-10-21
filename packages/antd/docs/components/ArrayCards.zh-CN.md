# ArrayCards

> 卡片列表，对于每行字段数量较多，联动较多的场景比较适合使用 ArrayCards
>
> 注意：该组件只适用于 Schema 场景

## Markup Schema 案例

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
            title: '字符串数组',
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
            <SchemaField.Void x-component="ArrayCards.Copy" />
            <SchemaField.Void x-component="ArrayCards.MoveUp" />
            <SchemaField.Void x-component="ArrayCards.MoveDown" />
          </SchemaField.Void>
          <SchemaField.Void
            x-component="ArrayCards.Addition"
            title="添加条目"
          />
        </SchemaField.Array>
        <SchemaField.Array
          name="array"
          maxItems={3}
          x-decorator="FormItem"
          x-component="ArrayCards"
          x-component-props={{
            title: '对象数组',
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
        title: '字符串数组',
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
          title: '添加条目',
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
        title: '对象数组',
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
          title: '添加条目',
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
          x-component="ArrayCards"
          x-decorator="FormItem"
          x-component-props={{
            title: '对象数组',
          }}
        >
          <SchemaField.Object>
            <SchemaField.Void x-component="ArrayCards.Index" />
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
            <SchemaField.Void x-component="ArrayCards.Remove" />
            <SchemaField.Void x-component="ArrayCards.MoveUp" />
            <SchemaField.Void x-component="ArrayCards.MoveDown" />
          </SchemaField.Object>
          <SchemaField.Void
            x-component="ArrayCards.Addition"
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
      title: '对象数组',
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
          title: '添加条目',
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
        <Submit onSubmit={console.log}>提交</Submit>
      </FormButtonGroup>
    </FormProvider>
  )
}
```

## API

### ArrayCards

扩展属性

| 属性名     | 类型                      | 描述         | 默认值 |
| ---------- | ------------------------- | ------------ | ------ |
| onAdd      | `(index: number) => void` | 增加方法     |        |
| onRemove   | `(index: number) => void` | 删除方法     |        |
| onCopy     | `(index: number) => void` | 复制方法     |        |
| onMoveUp   | `(index: number) => void` | 向上移动方法 |        |
| onMoveDown | `(index: number) => void` | 向下移动方法 |        |

其余参考 https://ant.design/components/card-cn/

### ArrayCards.Addition

> 添加按钮

扩展属性

| 属性名       | 类型                  | 描述     | 默认值   |
| ------------ | --------------------- | -------- | -------- |
| title        | ReactText             | 文案     |          |
| method       | `'push' \| 'unshift'` | 添加方式 | `'push'` |
| defaultValue | `any`                 | 默认值   |          |

其余参考 https://ant.design/components/button-cn/

注意：title 属性可以接收 Field 模型中的 title 映射，也就是在 Field 上传 title 也是生效的

注意：使用`onClick={e => e.preventDefault()}`可禁用默认行为。

### ArrayCards.Copy

> 复制按钮

扩展属性

| 属性名 | 类型                  | 描述     | 默认值   |
| ------ | --------------------- | -------- | -------- |
| title  | ReactText             | 文案     |          |
| method | `'push' \| 'unshift'` | 添加方式 | `'push'` |

其余参考 https://ant.design/components/button-cn/

注意：title 属性可以接收 Field 模型中的 title 映射，也就是在 Field 上传 title 也是生效的

注意：使用`onClick={e => e.preventDefault()}`可禁用默认行为。

### ArrayCards.Remove

> 删除按钮

| 属性名 | 类型      | 描述 | 默认值 |
| ------ | --------- | ---- | ------ |
| title  | ReactText | 文案 |        |

其余参考 https://ant.design/components/icon-cn/

注意：title 属性可以接收 Field 模型中的 title 映射，也就是在 Field 上传 title 也是生效的

注意：使用`onClick={e => e.preventDefault()}`可禁用默认行为。

### ArrayCards.MoveDown

> 下移按钮

| 属性名 | 类型      | 描述 | 默认值 |
| ------ | --------- | ---- | ------ |
| title  | ReactText | 文案 |        |

其余参考 https://ant.design/components/icon-cn/

注意：title 属性可以接收 Field 模型中的 title 映射，也就是在 Field 上传 title 也是生效的

注意：使用`onClick={e => e.preventDefault()}`可禁用默认行为。

### ArrayCards.MoveUp

> 上移按钮

| 属性名 | 类型      | 描述 | 默认值 |
| ------ | --------- | ---- | ------ |
| title  | ReactText | 文案 |        |

其余参考 https://ant.design/components/icon-cn/

注意：title 属性可以接收 Field 模型中的 title 映射，也就是在 Field 上传 title 也是生效的

注意：使用`onClick={e => e.preventDefault()}`可禁用默认行为。

### ArrayCards.Index

> 索引渲染器

无属性

### ArrayCards.useIndex

> 读取当前渲染行索引的 React Hook

### ArrayCards.useRecord

> 读取当前渲染记录的 React Hook
