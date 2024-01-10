# FormButtonGroup

> Form button group layout component

## Common case

```tsx
import React from 'react'
import {
  FormButtonGroup,
  Submit,
  Reset,
  FormItem,
  Input,
  FormLayout,
} from '@formily/antd'
import { createForm } from '@formily/core'
import { FormProvider, createSchemaField } from '@formily/react'
const SchemaField = createSchemaField({
  components: {
    FormItem,
    Input,
  },
})

const form = createForm()

export default () => {
  return (
    <FormProvider form={form}>
      <FormLayout labelCol={6} wrapperCol={10}>
        <SchemaField>
          <SchemaField.String
            title="input box"
            x-decorator="FormItem"
            required
            x-component="Input"
          />
          <SchemaField.String
            title="input box"
            x-decorator="FormItem"
            required
            x-component="Input"
          />
          <SchemaField.String
            title="input box"
            x-decorator="FormItem"
            required
            x-component="Input"
          />
          <SchemaField.String
            title="input box"
            x-decorator="FormItem"
            required
            x-component="Input"
          />
          <SchemaField.String
            title="input box"
            x-decorator="FormItem"
            required
            x-component="Input"
          />
          <SchemaField.String
            title="input box"
            x-decorator="FormItem"
            required
            x-component="Input"
          />
          <SchemaField.String
            title="input box"
            x-decorator="FormItem"
            required
            x-component="Input"
          />
          <SchemaField.String
            title="input box"
            x-decorator="FormItem"
            required
            x-component="Input"
          />
          <SchemaField.String
            title="input box"
            x-decorator="FormItem"
            required
            x-component="Input"
          />
        </SchemaField>
        <FormButtonGroup.FormItem>
          <Submit onSubmit={console.log}>Submit</Submit>
          <Reset>Reset</Reset>
        </FormButtonGroup.FormItem>
      </FormLayout>
    </FormProvider>
  )
}
```

## Suction bottom case

```tsx
import React from 'react'
import {
  FormButtonGroup,
  Submit,
  Reset,
  FormItem,
  FormLayout,
  Input,
} from '@formily/antd'
import { createForm } from '@formily/core'
import { FormProvider, createSchemaField } from '@formily/react'

const SchemaField = createSchemaField({
  components: {
    FormItem,
    Input,
  },
})

const form = createForm()

export default () => {
  return (
    <FormProvider form={form}>
      <FormLayout labelCol={6} wrapperCol={10}>
        <SchemaField>
          <SchemaField.String
            title="input box"
            x-decorator="FormItem"
            required
            x-component="Input"
          />
          <SchemaField.String
            title="input box"
            x-decorator="FormItem"
            required
            x-component="Input"
          />
          <SchemaField.String
            title="input box"
            x-decorator="FormItem"
            required
            x-component="Input"
          />
          <SchemaField.String
            title="input box"
            x-decorator="FormItem"
            required
            x-component="Input"
          />
          <SchemaField.String
            title="input box"
            x-decorator="FormItem"
            required
            x-component="Input"
          />
          <SchemaField.String
            title="input box"
            x-decorator="FormItem"
            required
            x-component="Input"
          />
          <SchemaField.String
            title="input box"
            x-decorator="FormItem"
            required
            x-component="Input"
          />
          <SchemaField.String
            title="input box"
            x-decorator="FormItem"
            required
            x-component="Input"
          />
          <SchemaField.String
            title="input box"
            x-decorator="FormItem"
            required
            x-component="Input"
          />
        </SchemaField>
        <FormButtonGroup.Sticky>
          <FormButtonGroup.FormItem>
            <Submit onSubmit={console.log}>Submit</Submit>
            <Reset>Reset</Reset>
          </FormButtonGroup.FormItem>
        </FormButtonGroup.Sticky>
      </FormLayout>
    </FormProvider>
  )
}
```

## Suction bottom centering case

```tsx
import React from 'react'
import {
  FormButtonGroup,
  Submit,
  Reset,
  FormItem,
  FormLayout,
  Input,
} from '@formily/antd'
import { createForm } from '@formily/core'
import { FormProvider, createSchemaField } from '@formily/react'

const SchemaField = createSchemaField({
  components: {
    FormItem,
    Input,
  },
})

const form = createForm()

export default () => {
  return (
    <FormProvider form={form}>
      <FormLayout labelCol={6} wrapperCol={10}>
        <SchemaField>
          <SchemaField.String
            title="input box"
            x-decorator="FormItem"
            required
            x-component="Input"
          />
          <SchemaField.String
            title="input box"
            x-decorator="FormItem"
            required
            x-component="Input"
          />
          <SchemaField.String
            title="input box"
            x-decorator="FormItem"
            required
            x-component="Input"
          />
          <SchemaField.String
            title="input box"
            x-decorator="FormItem"
            required
            x-component="Input"
          />
          <SchemaField.String
            title="input box"
            x-decorator="FormItem"
            required
            x-component="Input"
          />
          <SchemaField.String
            title="input box"
            x-decorator="FormItem"
            required
            x-component="Input"
          />
          <SchemaField.String
            title="input box"
            x-decorator="FormItem"
            required
            x-component="Input"
          />
          <SchemaField.String
            title="input box"
            x-decorator="FormItem"
            required
            x-component="Input"
          />
          <SchemaField.String
            title="input box"
            x-decorator="FormItem"
            required
            x-component="Input"
          />
        </SchemaField>
        <FormButtonGroup.Sticky align="center">
          <FormButtonGroup>
            <Submit onSubmit={console.log}>Submit</Submit>
            <Reset>Reset</Reset>
          </FormButtonGroup>
        </FormButtonGroup.Sticky>
      </FormLayout>
    </FormProvider>
  )
}
```

## API

### FormButtonGroup

> This component is mainly used to handle the button group gap

| Property name | Type                        | Description | Default value |
| ------------- | --------------------------- | ----------- | ------------- |
| gutter        | number                      | Gap size    | 8px           |
| align         | `'left'\|'center'\|'right'` | Alignment   | `'left'`      |

### FormButtonGroup.FormItem

> This component is mainly used to deal with the alignment of the button group and the main form FormItem

Refer to [FormItem](/components/form-item) property

### FormButtonGroup.Sticky

> This component is mainly used to deal with the floating positioning problem of the button group

| Property name | Type                        | Description | Default value |
| ------------- | --------------------------- | ----------- | ------------- |
| align         | `'left'\|'center'\|'right'` | Alignment   | `'left'`      |
