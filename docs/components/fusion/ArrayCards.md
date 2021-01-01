```tsx
import React from 'react'
import { ArrayCards, FormItem, Input } from '@formily/next'
import { FormProvider, createForm } from '@formily/react'
import { createSchemaField } from '@formily/react-schema-field'
import { Button } from '@alifd/next'

const SchemaField = createSchemaField({
  components: {
    ArrayCards,
    FormItem,
    Input,
  },
})

const range = (count: number) =>
  Array.from(new Array(count)).map((_, key) => ({
    aaa: key,
  }))

const form = createForm()

export default () => {
  return (
    <FormProvider form={form}>
      <SchemaField>
        <SchemaField.Array
          name="array"
          title="数组项"
          maxItems={3}
          x-component="ArrayCards"
        >
          <SchemaField.Object>
            <SchemaField.Void x-component="ArrayCards.Index" />
            <SchemaField.String
              name="input"
              x-decorator="FormItem"
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
    </FormProvider>
  )
}
```
