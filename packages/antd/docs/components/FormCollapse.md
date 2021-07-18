# FormCollapse

> Folding panel, usually used in form scenes with high layout space requirements
>
> Note: Can only be used in Schema scenarios

## Markup Schema example

```tsx
import React from 'react'
import {
  FormCollapse,
  FormLayout,
  FormItem,
  Input,
  FormButtonGroup,
  Submit,
} from '@formily/antd'
import { createForm } from '@formily/core'
import { FormProvider, createSchemaField } from '@formily/react'
import { Button } from 'antd'

const SchemaField = createSchemaField({
  components: {
    FormItem,
    FormCollapse,
    Input,
  },
})

const form = createForm()
const formCollapse = FormCollapse.createFormCollapse()
export default () => {
  return (
    <FormProvider form={form}>
      <FormLayout labelCol={6} wrapperCol={10}>
        <SchemaField>
          <SchemaField.Void
            title="Folding Panel"
            x-decorator="FormItem"
            x-component="FormCollapse"
            x-component-props={{
              formCollapse,
            }}
          >
            <SchemaField.Void
              name="panel1"
              x-component="FormCollapse.CollapsePanel"
              x-component-props={{ header: 'A1' }}
            >
              <SchemaField.String
                name="aaa"
                title="AAA"
                x-decorator="FormItem"
                required
                x-component="Input"
              />
            </SchemaField.Void>
            <SchemaField.Void
              name="panel2"
              x-component="FormCollapse.CollapsePanel"
              x-component-props={{ header: 'A2' }}
            >
              <SchemaField.String
                name="bbb"
                title="BBB"
                x-decorator="FormItem"
                required
                x-component="Input"
              />
            </SchemaField.Void>
            <SchemaField.Void
              name="panel3"
              x-component="FormCollapse.CollapsePanel"
              x-component-props={{ header: 'A3' }}
            >
              <SchemaField.String
                name="ccc"
                title="CCC"
                x-decorator="FormItem"
                required
                x-component="Input"
              />
            </SchemaField.Void>
          </SchemaField.Void>
        </SchemaField>
        <FormButtonGroup.FormItem>
          <Button
            onClick={() => {
              form.query('panel3').take((field) => {
                field.visible = !field.visible
              })
            }}
          >
            Show/hide the last tab
          </Button>
          <Button
            onClick={() => {
              formCollapse.toggleActiveKey('panel2')
            }}
          >
            Switch to the second Tab
          </Button>
          <Submit onSubmit={console.log}>Submit</Submit>
        </FormButtonGroup.FormItem>
      </FormLayout>
    </FormProvider>
  )
}
```

## JSON Schema case

```tsx
import React from 'react'
import {
  FormCollapse,
  FormItem,
  FormLayout,
  Input,
  FormButtonGroup,
  Submit,
} from '@formily/antd'
import { createForm } from '@formily/core'
import { FormProvider, createSchemaField } from '@formily/react'
import { Button } from 'antd'

const SchemaField = createSchemaField({
  components: {
    FormItem,
    FormCollapse,
    Input,
  },
})

const form = createForm()
const formCollapse = FormCollapse.createFormCollapse()
const schema = {
  type: 'object',
  properties: {
    collapse: {
      type: 'void',
      title: 'Folding Panel',
      'x-decorator': 'FormItem',
      'x-component': 'FormCollapse',
      'x-component-props': {
        formCollapse: '{{formCollapse}}',
      },
      properties: {
        panel1: {
          type: 'void',
          'x-component': 'FormCollapse.CollapsePanel',
          'x-component-props': {
            header: 'A1',
          },
          properties: {
            aaa: {
              type: 'string',
              title: 'AAA',
              'x-decorator': 'FormItem',
              required: true,
              'x-component': 'Input',
            },
          },
        },
        panel2: {
          type: 'void',
          'x-component': 'FormCollapse.CollapsePanel',
          'x-component-props': {
            header: 'A2',
          },
          properties: {
            bbb: {
              type: 'string',
              title: 'BBB',
              'x-decorator': 'FormItem',
              required: true,
              'x-component': 'Input',
            },
          },
        },
        panel3: {
          type: 'void',
          'x-component': 'FormCollapse.CollapsePanel',
          'x-component-props': {
            header: 'A3',
          },
          properties: {
            ccc: {
              type: 'string',
              title: 'CCC',
              'x-decorator': 'FormItem',
              required: true,
              'x-component': 'Input',
            },
          },
        },
      },
    },
  },
}

export default () => {
  return (
    <FormProvider form={form}>
      <FormLayout labelCol={6} wrapperCol={10}>
        <SchemaField schema={schema} scope={{ formCollapse }} />
        <FormButtonGroup.FormItem>
          <Button
            onClick={() => {
              form.query('panel3').take((field) => {
                field.visible = !field.visible
              })
            }}
          >
            Show/hide the last tab
          </Button>
          <Button
            onClick={() => {
              formCollapse.toggleActiveKey('panel2')
            }}
          >
            Switch to the second Tab
          </Button>
          <Submit onSubmit={console.log}>Submit</Submit>
        </FormButtonGroup.FormItem>
      </FormLayout>
    </FormProvider>
  )
}
```

## API

### FormCollapse

| Property name | Type          | Description                                                     | Default value |
| ------------- | ------------- | --------------------------------------------------------------- | ------------- |
| formCollapse  | IFormCollapse | Pass in the model created by createFormCollapse/useFormCollapse |               |

Other references https://ant.design/components/collapse-cn/

### FormCollapse.CollapsePanel

Reference https://ant.design/components/collapse-cn/

### FormCollapse.createFormCollapse

```ts pure
type ActiveKey = string | number
type ActiveKeys = string | number | Array<string | number>

interface createFormCollapse {
  (defaultActiveKeys?: ActiveKeys): IFormCollpase
}

interface IFormCollapse {
  //Activate the primary key list
  activeKeys: ActiveKeys
  //Does the activation key exist?
  hasActiveKey(key: ActiveKey): boolean
  //Set the list of active primary keys
  setActiveKeys(keys: ActiveKeys): void
  //Add activation key
  addActiveKey(key: ActiveKey): void
  //Delete the active primary key
  removeActiveKey(key: ActiveKey): void
  //Switch to activate the main key
  toggleActiveKey(key: ActiveKey): void
}
```
