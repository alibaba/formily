# FormTab

> 选项卡表单
>
> 注意：该组件只适用于 Schema 场景

## Markup Schema 案例

```tsx
import React from 'react'
import {
  FormTab,
  FormItem,
  Input,
  FormButtonGroup,
  Submit,
} from '@formily/next'
import { createForm } from '@formily/core'
import { FormProvider, createSchemaField } from '@formily/react'
import { Button } from '@alifd/next'

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
          显示/隐藏最后一个Tab
        </Button>
        <Button
          onClick={() => {
            formTab.setActiveKey('tab2')
          }}
        >
          切换第二个Tab
        </Button>
        <Submit onSubmit={console.log}>提交</Submit>
      </FormButtonGroup.FormItem>
    </FormProvider>
  )
}
```

## JSON Schema 案例

```tsx
import React from 'react'
import {
  FormTab,
  FormItem,
  Input,
  FormButtonGroup,
  Submit,
} from '@formily/next'
import { createForm } from '@formily/core'
import { FormProvider, createSchemaField } from '@formily/react'
import { Button } from '@alifd/next'

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
          显示/隐藏最后一个Tab
        </Button>
        <Button
          onClick={() => {
            formTab.setActiveKey('tab2')
          }}
        >
          切换第二个Tab
        </Button>
        <Submit onSubmit={console.log}>提交</Submit>
      </FormButtonGroup.FormItem>
    </FormProvider>
  )
}
```

## API

### FormTab

| 属性名  | 类型     | 描述                                             | 默认值 |
| ------- | -------- | ------------------------------------------------ | ------ |
| formTab | IFormTab | 传入通过 createFormTab/useFormTab 创建出来的模型 |        |

其余参考 https://fusion.design/pc/component/basic/tab

### FormTab.TabPane

参考 https://fusion.design/pc/component/basic/tab 的 Item 属性

### FormTab.createFormTab

```ts pure
type ActiveKey = string | number

interface createFormTab {
  (defaultActiveKey?: ActiveKey): IFormTab
}

interface IFormTab {
  //激活主键
  activeKey: ActiveKey
  //设置激活主键
  setActiveKey(key: ActiveKey): void
}
```
