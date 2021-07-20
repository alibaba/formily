# Editable

> 局部编辑器，对于一些空间要求较高的表单区域可以使用该组件
>
> Editable 组件相当于是 FormItem 组件的变体，所以通常放在 decorator 中

## Markup Schema 案例

```tsx
import React from 'react'
import {
  Input,
  DatePicker,
  Editable,
  FormItem,
  FormButtonGroup,
  Submit,
} from '@formily/next'
import { createForm } from '@formily/core'
import { FormProvider, createSchemaField } from '@formily/react'

const SchemaField = createSchemaField({
  components: {
    DatePicker,
    Editable,
    Input,
    FormItem,
  },
})

const form = createForm()

export default () => (
  <FormProvider form={form}>
    <SchemaField>
      <SchemaField.String
        name="date"
        title="日期"
        x-decorator="Editable"
        x-component="DatePicker"
      />
      <SchemaField.String
        name="input"
        title="输入框"
        x-decorator="Editable"
        x-component="Input"
      />
      <SchemaField.Void
        name="void"
        title="虚拟节点容器"
        x-component="Editable.Popover"
        x-reactions={(field) => {
          field.title = field.query('.void.date2').get('value') || field.title
        }}
      >
        <SchemaField.String
          name="date2"
          title="日期"
          x-decorator="FormItem"
          x-component="DatePicker"
          x-component-props={{
            followTrigger: true,
          }}
        />
        <SchemaField.String
          name="input2"
          title="输入框"
          x-decorator="FormItem"
          x-component="Input"
        />
      </SchemaField.Void>
      <SchemaField.Object
        name="iobject"
        title="对象节点容器"
        x-component="Editable.Popover"
        x-reactions={(field) => {
          field.title = field.value?.date || field.title
        }}
      >
        <SchemaField.String
          name="date"
          title="日期"
          x-decorator="FormItem"
          x-component="DatePicker"
          x-component-props={{
            followTrigger: true,
          }}
        />
        <SchemaField.String
          name="input"
          title="输入框"
          x-decorator="FormItem"
          x-component="Input"
        />
      </SchemaField.Object>
    </SchemaField>
    <FormButtonGroup>
      <Submit onSubmit={console.log}>提交</Submit>
    </FormButtonGroup>
  </FormProvider>
)
```

## JSON Schema 案例

```tsx
import React from 'react'
import {
  Input,
  DatePicker,
  Editable,
  FormItem,
  FormButtonGroup,
  Submit,
} from '@formily/next'
import { createForm } from '@formily/core'
import { FormProvider, createSchemaField } from '@formily/react'

const SchemaField = createSchemaField({
  components: {
    DatePicker,
    Editable,
    Input,
    FormItem,
  },
})

const form = createForm()

const schema = {
  type: 'object',
  properties: {
    date: {
      type: 'string',
      title: '日期',
      'x-decorator': 'Editable',
      'x-component': 'DatePicker',
    },
    input: {
      type: 'string',
      title: '输入框',
      'x-decorator': 'Editable',
      'x-component': 'Input',
    },
    void: {
      type: 'void',
      title: '虚拟节点容器',
      'x-component': 'Editable.Popover',
      'x-reactions':
        "{{(field) => field.title = field.query('.void.date2').get('value') || field.title}}",
      properties: {
        date2: {
          type: 'string',
          title: '日期',
          'x-decorator': 'FormItem',
          'x-component': 'DatePicker',
          'x-component-props': {
            followTrigger: true,
          },
        },
        input2: {
          type: 'string',
          title: '输入框',
          'x-decorator': 'FormItem',
          'x-component': 'Input',
        },
      },
    },
    iobject: {
      type: 'object',
      title: '对象节点容器',
      'x-component': 'Editable.Popover',
      'x-reactions':
        '{{(field) => field.title = field.value && field.value.date || field.title}}',
      properties: {
        date: {
          type: 'string',
          title: '日期',
          'x-decorator': 'FormItem',
          'x-component': 'DatePicker',
          'x-component-props': {
            followTrigger: true,
          },
        },
        input: {
          type: 'string',
          title: '输入框',
          'x-decorator': 'FormItem',
          'x-component': 'Input',
        },
      },
    },
  },
}

export default () => (
  <FormProvider form={form}>
    <SchemaField schema={schema} />
    <FormButtonGroup>
      <Submit onSubmit={console.log}>提交</Submit>
    </FormButtonGroup>
  </FormProvider>
)
```

## 纯 JSX 案例

```tsx
import React from 'react'
import {
  Input,
  DatePicker,
  Editable,
  FormItem,
  FormButtonGroup,
  Submit,
} from '@formily/next'
import { createForm } from '@formily/core'
import { FormProvider, Field, VoidField, ObjectField } from '@formily/react'

const form = createForm()

export default () => (
  <FormProvider form={form}>
    <Field
      name="date"
      title="日期"
      decorator={[Editable]}
      component={[DatePicker]}
    />
    <Field
      name="input"
      title="输入框"
      decorator={[Editable]}
      component={[Input]}
    />
    <VoidField
      name="void"
      title="虚拟节点容器"
      reactions={(field) => {
        field.title = field.query('.void.date2').get('value') || field.title
      }}
      component={[Editable.Popover]}
    >
      <Field
        name="date2"
        title="日期"
        decorator={[FormItem]}
        component={[
          DatePicker,
          {
            followTrigger: true,
          },
        ]}
      />
      <Field
        name="input2"
        title="输入框"
        decorator={[FormItem]}
        component={[Input]}
      />
    </VoidField>
    <ObjectField
      name="iobject"
      title="对象节点容器"
      component={[
        Editable.Popover,
        {
          renderPreview: (field) => {
            return field.value?.date
          },
        },
      ]}
    >
      <Field
        name="date"
        title="日期"
        decorator={[FormItem]}
        component={[
          DatePicker,
          {
            followTrigger: true,
          },
        ]}
      />
      <Field
        name="input"
        title="输入框"
        decorator={[FormItem]}
        component={[Input]}
      />
    </ObjectField>

    <FormButtonGroup>
      <Submit onSubmit={console.log}>提交</Submit>
    </FormButtonGroup>
  </FormProvider>
)
```

## API

### Editable

> 内联编辑

参考 https://fusion.design/pc/component/basic/form 中的 FormItem 属性

### Editable.Popover

> 浮层编辑

| 属性名        | 类型                              | 描述       | 默认值 |
| ------------- | --------------------------------- | ---------- | ------ |
| renderPreview | `(field:GeneralField)=>ReactNode` | 预览渲染器 |        |

注意：如果在 Popover 内部有 Select/DatePicker 之类的浮层组件，需要在浮层组件上配置 followTrigger=true

其余参考 https://fusion.design/pc/component/basic/balloon
