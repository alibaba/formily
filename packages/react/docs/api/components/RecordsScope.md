---
order: 10
---

# RecordsScope

## Description

Standard scoped injection component for injecting the following built-in variables:

- `$records` current record list data

## Signature

```ts
interface IRecordsScopeProps {
  getRecords(): any[]
}

type RecordsScope = React.FC<React.PropsWithChildren<IRecordsScopeProps>>
```

## Usage

Any auto-incrementing list extension component should use RecordsScope internally to pass record scope variables. Components that have implemented this convention include:
All components of the ArrayX family in @formily/antd and @formily/next

## Custom component extension use case

```tsx
import React from 'react'
import { createForm } from '@formily/core'
import { FormProvider, createSchemaField, RecordsScope } from '@formily/react'
import { Input } from 'antd'

const form = createForm()

const MyCustomComponent = (props) => {
  return (
    <RecordsScope getRecords={() => props.records}>
      {props.children}
    </RecordsScope>
  )
}

const SchemaField = createSchemaField({
  components: {
    Input,
    MyCustomComponent,
  },
})

export default () => (
  <FormProvider form={form}>
    <SchemaField
      schema={{
        type: 'object',
        properties: {
          records: {
            type: 'void',
            'x-component': 'MyCustomComponent',
            'x-component-props': {
              records: [
                {
                  name: 'Name',
                  code: 'Code',
                },
              ],
            },
            properties: {
              input: {
                type: 'string',
                'x-component': 'Input',
                'x-value':
                  '{{`' +
                  '${$records[0].name} ' +
                  '${$records[0].code}' +
                  '`}}',
              },
            },
          },
        },
      }}
    ></SchemaField>
  </FormProvider>
)
```
