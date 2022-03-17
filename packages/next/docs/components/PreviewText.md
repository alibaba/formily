# PreviewText

> Reading state components, mainly used to implement the reading state of these components of class Input and DatePicker

## Simple use case

```tsx
import React from 'react'
import { PreviewText, FormItem, FormLayout } from '@formily/next'
import { createForm } from '@formily/core'
import { FormProvider, createSchemaField } from '@formily/react'

const SchemaField = createSchemaField({
  components: {
    FormItem,
    PreviewText,
  },
})

const form = createForm()

export default () => {
  return (
    <FormLayout labelCol={8} wrapperCol={16}>
      <FormProvider form={form}>
        <SchemaField>
          <SchemaField.String
            x-decorator="FormItem"
            title="text preview"
            x-component="PreviewText.Input"
            default={'Hello world'}
          />
          <SchemaField.String
            x-decorator="FormItem"
            title="Select item preview"
            x-component="PreviewText.Select"
            x-component-props={{
              mode: 'multiple',
            }}
            default={['123', '222']}
            enum={[
              { label: 'A111', value: '123' },
              { label: 'A222', value: '222' },
            ]}
          />
          <SchemaField.String
            x-decorator="FormItem"
            title="date preview"
            x-component="PreviewText.DatePicker"
            default={'2020-11-23 22:15:20'}
          />
          <SchemaField.String
            x-decorator="FormItem"
            title="Cascader Preview"
            x-component="PreviewText.Cascader"
            default={'yuhang'}
            enum={[
              {
                label: 'Hangzhou',
                value: 'hangzhou',
                children: [
                  {
                    label: 'Yuhang',
                    value: 'yuhang',
                  },
                ],
              },
            ]}
          />
        </SchemaField>
      </FormProvider>
    </FormLayout>
  )
}
```

## Extended reading mode

```tsx
import React from 'react'
import {
  PreviewText,
  FormItem,
  FormButtonGroup,
  FormLayout,
} from '@formily/next'
import { createForm } from '@formily/core'
import {
  FormProvider,
  mapReadPretty,
  connect,
  createSchemaField,
} from '@formily/react'
import { Button, Input as NextInput } from '@alifd/next'

const Input = connect(NextInput, mapReadPretty(PreviewText.Input))

const SchemaField = createSchemaField({
  components: {
    Input,
    FormItem,
    PreviewText,
  },
})

const form = createForm()

export default () => {
  return (
    <PreviewText.Placeholder value="No data currently available">
      <FormLayout labelCol={8} wrapperCol={16}>
        <FormProvider form={form}>
          <SchemaField>
            <SchemaField.Markup
              type="string"
              x-decorator="FormItem"
              title="text preview"
              required
              x-component="Input"
              default={'Hello world'}
            />
            <SchemaField.Markup
              type="string"
              x-decorator="FormItem"
              title="Select item preview"
              x-component="PreviewText.Select"
              x-component-props={{
                mode: 'multiple',
              }}
              default={['123']}
              enum={[
                { label: 'A111', value: '123' },
                { label: 'A222', value: '222' },
              ]}
            />
            <SchemaField.Markup
              type="string"
              x-decorator="FormItem"
              title="date preview"
              x-component="PreviewText.DatePicker"
            />
            <SchemaField.Markup
              type="string"
              x-decorator="FormItem"
              title="Cascader Preview"
              x-component="PreviewText.Cascader"
              default={'yuhang'}
              enum={[
                {
                  label: 'Hangzhou',
                  value: 'hangzhou',
                  children: [
                    {
                      label: 'Yuhang',
                      value: 'yuhang',
                    },
                  ],
                },
              ]}
            />
          </SchemaField>
          <FormButtonGroup.FormItem>
            <Button
              onClick={() => {
                form.setState((state) => {
                  state.editable = !state.editable
                })
              }}
            >
              Switch reading mode
            </Button>
          </FormButtonGroup.FormItem>
        </FormProvider>
      </FormLayout>
    </PreviewText.Placeholder>
  )
}
```

## API

### PreviewText.Input

Reference https://fusion.design/pc/component/basic/input

### PreviewText.Select

Reference https://fusion.design/pc/component/basic/select

### PreviewText.TreeSelect

Reference https://fusion.design/pc/component/basic/tree-select

### PreviewText.Cascader

Reference https://fusion.design/pc/component/basic/cascader-select

### PreviewText.DatePicker

Reference https://fusion.design/pc/component/basic/date-picker

### PreviewText.DateRangePicker

Reference https://fusion.design/pc/component/basic/date-picker

### PreviewText.TimePicker

Reference https://fusion.design/pc/component/basic/time-picker

### PreviewText.Placeholder

| Property name | Type   | Description         | Default value |
| ------------- | ------ | ------------------- | ------------- |
| value         | stirng | Default placeholder | N/A           |

### PreviewText.usePlaceholder

```ts pure
interface usePlaceholder {
  (): string
}
```
