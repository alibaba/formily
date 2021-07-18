# FormTab

> Tab form
>
> Note: This component is only applicable to Schema scenarios

## Markup Schema example

```tsx
import React from 'react'
import {
  FormTab,
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
    FormTab,
    Input,
  },
})

const form = createForm()
const formTab = FormTab.createFormTab()

export default () => {
  return (
    <FormProvider form={form}>
      <SchemaField>
        <SchemaField.Void
          type="void"
          x-component="FormTab"
          x-component-props={{ formTab }}
        >
          <SchemaField.Void
            type="void"
            name="tab1"
            x-component="FormTab.TabPane"
            x-component-props={{ tab: 'A1' }}
          >
            <SchemaField.String
              name="aaa"
              x-decorator="FormItem"
              title="AAA"
              required
              x-component="Input"
            />
          </SchemaField.Void>
          <SchemaField.Void
            name="tab2"
            x-component="FormTab.TabPane"
            x-component-props={{ tab: 'A2' }}
          >
            <SchemaField.String
              name="bbb"
              x-decorator="FormItem"
              title="BBB"
              required
              x-component="Input"
            />
          </SchemaField.Void>
          <SchemaField.Void
            name="tab3"
            x-component="FormTab.TabPane"
            x-component-props={{ tab: 'A3' }}
          >
            <SchemaField.String
              name="ccc"
              x-decorator="FormItem"
              title="CCC"
              required
              x-component="Input"
            />
          </SchemaField.Void>
        </SchemaField.Void>
      </SchemaField>
      <FormButtonGroup.FormItem>
        <Button
          onClick={() => {
            form.query('tab3').take((field) => {
              field.visible = !field.visible
            })
          }}
        >
          Show/hide the last tab
        </Button>
        <Button
          onClick={() => {
            formTab.setActiveKey('tab2')
          }}
        >
          Switch to the second Tab
        </Button>
        <Submit onSubmit={console.log}>Submit</Submit>
      </FormButtonGroup.FormItem>
    </FormProvider>
  )
}
```

## JSON Schema case

```tsx
import React from 'react'
import {
  FormTab,
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
    FormTab,
    Input,
  },
})

const form = createForm()
const formTab = FormTab.createFormTab()

const schema = {
  type: 'object',
  properties: {
    collapse: {
      type: 'void',
      'x-component': 'FormTab',
      'x-component-props': {
        formTab: '{{formTab}}',
      },
      properties: {
        tab1: {
          type: 'void',
          'x-component': 'FormTab.TabPane',
          'x-component-props': {
            tab: 'A1',
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
        tab2: {
          type: 'void',
          'x-component': 'FormTab.TabPane',
          'x-component-props': {
            tab: 'A2',
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
        tab3: {
          type: 'void',
          'x-component': 'FormTab.TabPane',
          'x-component-props': {
            tab: 'A3',
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
      <SchemaField schema={schema} scope={{ formTab }} />
      <FormButtonGroup.FormItem>
        <Button
          onClick={() => {
            form.query('tab3').take((field) => {
              field.visible = !field.visible
            })
          }}
        >
          Show/hide the last tab
        </Button>
        <Button
          onClick={() => {
            formTab.setActiveKey('tab2')
          }}
        >
          Switch to the second Tab
        </Button>
        <Submit onSubmit={console.log}>Submit</Submit>
      </FormButtonGroup.FormItem>
    </FormProvider>
  )
}
```

## API

### FormTab

| Property name | Type     | Description                                           | Default value |
| ------------- | -------- | ----------------------------------------------------- | ------------- |
| formTab       | IFormTab | Pass in the model created by createFormTab/useFormTab |               |

Other references https://ant.design/components/tabs-cn/

### FormTab.TabPane

Reference https://ant.design/components/tabs-cn/

### FormTab.createFormTab

```ts pure
type ActiveKey = string | number

interface createFormTab {
  (defaultActiveKey?: ActiveKey): IFormTab
}

interface IFormTab {
  //Activate the primary key
  activeKey: ActiveKey
  //Set the activation key
  setActiveKey(key: ActiveKey): void
}
```
