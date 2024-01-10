---
order: 9
---

# RecordScope

## Description

Standard scoped injection component for injecting the following built-in variables:

- `$record` current record data
- `$record.$lookup` The parent record of the current record, you can always look up
- `$record.$index` the index of the current record
- `$index` The current record index, equivalent to `$record.$index`, considering that if the record data is not an object, it needs to be read independently
- `$lookup` The parent record of the current record, equivalent to `$record.$lookup`, considering that if the record data is not an object, it needs to be read independently

## Signature

```ts
interface IRecordScopeProps {
  getRecord(): any
  getIndex?(): number
}

type RecordScope = React.FC<React.PropsWithChildren<IRecordScopeProps>>
```

## Usage

Any auto-increment list extension component should use RecordScope internally to pass record scope variables. Components that have implemented this convention include:
All components of the ArrayX family in @formily/antd and @formily/next

## Custom component extension use case

```tsx
import React from 'react'
import { createForm } from '@formily/core'
import { FormProvider, createSchemaField, RecordScope } from '@formily/react'
import { Input } from 'antd'

const form = createForm()

const MyCustomComponent = (props) => {
  return (
    <RecordScope getRecord={() => props.record} getIndex={() => props.index}>
      {props.children}
    </RecordScope>
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
          lookup: {
            type: 'void',
            'x-component': 'MyCustomComponent',
            'x-component-props': {
              record: {
                name: 'Lookup Name',
                code: 'Lookup Code',
              },
              index: 1,
            },
            properties: {
              record: {
                type: 'void',
                'x-component': 'MyCustomComponent',
                'x-component-props': {
                  record: {
                    name: 'Name',
                    code: 'Code',
                  },
                  index: 0,
                },
                properties: {
                  input: {
                    type: 'string',
                    'x-component': 'Input',
                    'x-value':
                      '{{`' +
                      '${$record.name} ' +
                      '${$record.code} ' +
                      '${$record.$index} ' +
                      '${$record.$lookup.name} ' +
                      '${$record.$lookup.code} ' +
                      '${$index} ' +
                      '${$lookup.name} ' +
                      '${$lookup.code} ' +
                      '`}}',
                  },
                },
              },
            },
          },
        },
      }}
    ></SchemaField>
  </FormProvider>
)
```
