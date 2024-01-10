# useExpressionScope

## Description

The expression scope is mainly read in the custom component. The sources of the expression scope are:

- createSchemaField top-level delivery
- SchemaField component attribute delivery
- ExpressionScope/RecordScope/RecordsScope are issued inside custom components

## Signature

```ts
interface useExpressionScope {
  (): any
}
```

## Example

```tsx
import React from 'react'
import { createForm } from '@formily/core'
import {
  FormProvider,
  createSchemaField,
  useExpressionScope,
  RecordScope,
} from '@formily/react'

const form = createForm()

const Custom = () => {
  const scope = useExpressionScope()
  return (
    <code>
      <pre>{JSON.stringify(scope, null, 2)}</pre>
    </code>
  )
}

const SchemaField = createSchemaField({
  components: {
    Custom,
  },
  scope: {
    topScope: {
      aa: 123,
    },
  },
})

export default () => (
  <FormProvider form={form}>
    <RecordScope
      getRecord={() => ({ name: 'Record Name', code: 'Record Code' })}
      getIndex={() => 2}
    >
      <SchemaField scope={{ propsScope: { bb: 321 } }}>
        <SchemaField.String name="custom" x-component="Custom" />
      </SchemaField>
    </RecordScope>
  </FormProvider>
)
```
