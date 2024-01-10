# Editable

> Partial editor, you can use this component for some form areas with high space requirements
>
> Editable component is equivalent to a variant of FormItem component, so it is usually placed in decorator

## Markup Schema example

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
        title="date"
        x-decorator="Editable"
        x-component="DatePicker"
      />
      <SchemaField.String
        name="input"
        title="input box"
        x-decorator="Editable"
        x-component="Input"
      />
      <SchemaField.Void
        name="void"
        title="Virtual Node Container"
        x-component="Editable.Popover"
        x-reactions={(field) => {
          field.title = field.query('.void.date2').get('value') || field.title
        }}
      >
        <SchemaField.String
          name="date2"
          title="date"
          x-decorator="FormItem"
          x-component="DatePicker"
          x-component-props={{
            followTrigger: true,
          }}
        />
        <SchemaField.String
          name="input2"
          title="input box"
          x-decorator="FormItem"
          x-component="Input"
        />
      </SchemaField.Void>
      <SchemaField.Object
        name="iobject"
        title="Object node container"
        x-component="Editable.Popover"
        x-reactions={(field) => {
          field.title = field.value?.date || field.title
        }}
      >
        <SchemaField.String
          name="date"
          title="date"
          x-decorator="FormItem"
          x-component="DatePicker"
          x-component-props={{
            followTrigger: true,
          }}
        />
        <SchemaField.String
          name="input"
          title="input box"
          x-decorator="FormItem"
          x-component="Input"
        />
      </SchemaField.Object>
    </SchemaField>
    <FormButtonGroup>
      <Submit onSubmit={console.log}>Submit</Submit>
    </FormButtonGroup>
  </FormProvider>
)
```

## JSON Schema case

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
      title: 'Date',
      'x-decorator': 'Editable',
      'x-component': 'DatePicker',
    },
    input: {
      type: 'string',
      title: 'input box',
      'x-decorator': 'Editable',
      'x-component': 'Input',
    },
    void: {
      type: 'void',
      title: 'Virtual Node Container',
      'x-component': 'Editable.Popover',
      'x-reactions':
        "{{(field) => field.title = field.query('.void.date2').get('value') || field.title}}",
      properties: {
        date2: {
          type: 'string',
          title: 'Date',
          'x-decorator': 'FormItem',
          'x-component': 'DatePicker',
          'x-component-props': {
            followTrigger: true,
          },
        },
        input2: {
          type: 'string',
          title: 'input box',
          'x-decorator': 'FormItem',
          'x-component': 'Input',
        },
      },
    },
    iobject: {
      type: 'object',
      title: 'Object node container',
      'x-component': 'Editable.Popover',
      'x-reactions':
        '{{(field) => field.title = field.value && field.value.date || field.title}}',
      properties: {
        date: {
          type: 'string',
          title: 'Date',
          'x-decorator': 'FormItem',
          'x-component': 'DatePicker',
          'x-component-props': {
            followTrigger: true,
          },
        },
        input: {
          type: 'string',
          title: 'input box',
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
      <Submit onSubmit={console.log}>Submit</Submit>
    </FormButtonGroup>
  </FormProvider>
)
```

## Pure JSX case

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
      title="date"
      decorator={[Editable]}
      component={[DatePicker]}
    />
    <Field
      name="input"
      title="input box"
      decorator={[Editable]}
      component={[Input]}
    />
    <VoidField
      name="void"
      title="Virtual Node Container"
      reactions={(field) => {
        field.title = field.query('.void.date2').get('value') || field.title
      }}
      component={[Editable.Popover]}
    >
      <Field
        name="date2"
        title="date"
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
        title="input box"
        decorator={[FormItem]}
        component={[Input]}
      />
    </VoidField>
    <ObjectField
      name="iobject"
      title="Object node container"
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
        title="date"
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
        title="input box"
        decorator={[FormItem]}
        component={[Input]}
      />
    </ObjectField>

    <FormButtonGroup>
      <Submit onSubmit={console.log}>Submit</Submit>
    </FormButtonGroup>
  </FormProvider>
)
```

## API

### Editable

> Inline editing

Refer to the FormItem property in https://fusion.design/pc/component/basic/form

### Editable.Popover

> Floating layer editing

| Property name | Type                              | Description      | Default value |
| ------------- | --------------------------------- | ---------------- | ------------- |
| renderPreview | `(field:GeneralField)=>ReactNode` | Preview renderer |               |

Note: If there is a floating layer component such as Select/DatePicker inside the Popover, followTrigger=true needs to be configured on the floating layer component

Other references https://fusion.design/pc/component/basic/balloon
