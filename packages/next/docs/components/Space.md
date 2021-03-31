# Space

> 超级便捷的 Flex 布局组件，可以帮助用户快速实现任何元素的并排紧挨布局

## Markup Schema 案例

```tsx
import React from 'react'
import {
  Input,
  FormItem,
  FormLayout,
  FormButtonGroup,
  Submit,
  Space,
} from '@formily/next'
import { createForm } from '@formily/core'
import { FormProvider, createSchemaField } from '@formily/react'

const SchemaField = createSchemaField({
  components: {
    Input,
    FormItem,
    Space,
  },
})

const form = createForm()

export default () => (
  <FormProvider form={form}>
    <FormLayout labelCol={6} wrapperCol={16}>
      <SchemaField>
        <SchemaField.Void
          title="姓名"
          x-decorator="FormItem"
          x-decorator-props={{
            asterisk: true,
            feedbackLayout: 'none',
          }}
          x-component="Space"
        >
          <SchemaField.String
            name="firstName"
            x-decorator="FormItem"
            x-component="Input"
            required
          />
          <SchemaField.String
            name="lastName"
            x-decorator="FormItem"
            x-component="Input"
            required
          />
        </SchemaField.Void>
        <SchemaField.Void
          title="文本串联"
          x-decorator="FormItem"
          x-decorator-props={{
            asterisk: true,
            feedbackLayout: 'none',
          }}
          x-component="Space"
        >
          <SchemaField.String
            name="aa"
            x-decorator="FormItem"
            x-component="Input"
            x-decorator-props={{
              addonAfter: '单位',
            }}
            required
          />
          <SchemaField.String
            name="bb"
            x-decorator="FormItem"
            x-component="Input"
            x-decorator-props={{
              addonAfter: '单位',
            }}
            required
          />
          <SchemaField.String
            name="cc"
            x-decorator="FormItem"
            x-component="Input"
            x-decorator-props={{
              addonAfter: '单位',
            }}
            required
          />
        </SchemaField.Void>
        <SchemaField.String
          name="textarea"
          title="文本框"
          x-decorator="FormItem"
          required
          x-component="Input.TextArea"
          x-component-props={{
            style: {
              width: 400,
            },
          }}
        />
      </SchemaField>
      <FormButtonGroup.FormItem>
        <Submit onSubmit={console.log}>提交</Submit>
      </FormButtonGroup.FormItem>
    </FormLayout>
  </FormProvider>
)
```

## JSON Schema 案例

```tsx
import React from 'react'
import {
  Input,
  FormItem,
  FormLayout,
  FormButtonGroup,
  Submit,
  Space,
} from '@formily/next'
import { createForm } from '@formily/core'
import { FormProvider, createSchemaField } from '@formily/react'

const SchemaField = createSchemaField({
  components: {
    Input,
    FormItem,
    Space,
  },
})

const form = createForm()

const schema = {
  type: 'object',
  properties: {
    name: {
      type: 'void',
      title: '姓名',
      'x-decorator': 'FormItem',
      'x-decorator-props': {
        asterisk: true,
        feedbackLayout: 'none',
      },
      'x-component': 'Space',
      properties: {
        firstName: {
          type: 'string',
          'x-decorator': 'FormItem',
          'x-component': 'Input',
          required: true,
        },
        lastName: {
          type: 'string',
          'x-decorator': 'FormItem',
          'x-component': 'Input',
          required: true,
        },
      },
    },
    texts: {
      type: 'void',
      title: '文本串联',
      'x-decorator': 'FormItem',
      'x-decorator-props': {
        asterisk: true,
        feedbackLayout: 'none',
      },
      'x-component': 'Space',
      properties: {
        aa: {
          type: 'string',
          'x-decorator': 'FormItem',
          'x-decorator-props': {
            addonAfter: '单位',
          },
          'x-component': 'Input',
          required: true,
        },
        bb: {
          type: 'string',
          'x-decorator': 'FormItem',
          'x-decorator-props': {
            addonAfter: '单位',
          },
          'x-component': 'Input',
          required: true,
        },
        cc: {
          type: 'string',
          'x-decorator': 'FormItem',
          'x-decorator-props': {
            addonAfter: '单位',
          },
          'x-component': 'Input',
          required: true,
        },
      },
    },

    textarea: {
      type: 'string',
      title: '文本框',
      'x-decorator': 'FormItem',
      'x-component': 'Input.TextArea',
      'x-component-props': {
        style: {
          width: 400,
        },
      },
      required: true,
    },
  },
}

export default () => (
  <FormProvider form={form}>
    <FormLayout labelCol={6} wrapperCol={16}>
      <SchemaField schema={schema} />
      <FormButtonGroup.FormItem>
        <Submit onSubmit={console.log}>提交</Submit>
      </FormButtonGroup.FormItem>
    </FormLayout>
  </FormProvider>
)
```

## 纯 JSX 案例

```tsx
import React from 'react'
import {
  Input,
  FormItem,
  FormLayout,
  FormButtonGroup,
  Submit,
  Space,
} from '@formily/next'
import { createForm } from '@formily/core'
import { FormProvider, Field, VoidField } from '@formily/react'

const form = createForm()

export default () => (
  <FormProvider form={form}>
    <FormLayout labelCol={6} wrapperCol={16}>
      <VoidField
        name="name"
        title="姓名"
        decorator={[
          FormItem,
          {
            asterisk: true,
            feedbackLayout: 'none',
          },
        ]}
        component={[Space]}
      >
        <Field
          name="firstName"
          decorator={[FormItem]}
          component={[Input]}
          required
        />
        <Field
          name="lastName"
          decorator={[FormItem]}
          component={[Input]}
          required
        />
      </VoidField>
      <VoidField
        name="texts"
        title="文本串联"
        decorator={[
          FormItem,
          {
            asterisk: true,
            feedbackLayout: 'none',
          },
        ]}
        component={[Space]}
      >
        <Field
          name="aa"
          decorator={[
            FormItem,
            {
              addonAfter: '单位',
            },
          ]}
          component={[Input]}
          required
        />
        <Field
          name="bb"
          decorator={[
            FormItem,
            {
              addonAfter: '单位',
            },
          ]}
          component={[Input]}
          required
        />
        <Field
          name="cc"
          decorator={[
            FormItem,
            {
              addonAfter: '单位',
            },
          ]}
          component={[Input]}
          required
        />
      </VoidField>
      <Field
        name="textarea"
        title="文本框"
        decorator={[FormItem]}
        component={[
          Input.TextArea,
          {
            style: {
              width: 400,
            },
          },
        ]}
        required
      />
      <FormButtonGroup.FormItem>
        <Submit onSubmit={console.log}>提交</Submit>
      </FormButtonGroup.FormItem>
    </FormLayout>
  </FormProvider>
)
```

## API

| 属性名    | 类型                                         | 描述     | 默认值    |
| --------- | -------------------------------------------- | -------- | --------- |
| style     | CSSProperties                                | 样式     | -         |
| className | string                                       | 类名     | -         |
| prefix    | string                                       | 样式前缀 | true      |
| size      | `number \| 'small' \| 'large' \| 'middle'`   | 间隔尺寸 | 8px       |
| direction | `'horizontal' \| 'vertical'`                 | 方向     | -         |
| align     | `'start' \| 'end' \| 'center' \| 'baseline'` | 对齐     | `'start'` |
| wrap      | boolean                                      | 是否换行 | false     |
