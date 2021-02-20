# FormCollapse

> 折叠面板，通常用在布局空间要求较高的表单场景
>
> 注意：只能用在 Schema 场景

## Markup Schema 案例

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
            title="折叠面板"
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
            显示/隐藏最后一个Tab
          </Button>
          <Button
            onClick={() => {
              formCollapse.toggleActiveKey('panel2')
            }}
          >
            切换第二个Tab
          </Button>
          <Submit onSubmit={console.log}>提交</Submit>
        </FormButtonGroup.FormItem>
      </FormLayout>
    </FormProvider>
  )
}
```

## JSON Schema 案例

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
      title: '折叠面板',
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
            显示/隐藏最后一个Tab
          </Button>
          <Button
            onClick={() => {
              formCollapse.toggleActiveKey('panel2')
            }}
          >
            切换第二个Tab
          </Button>
          <Submit onSubmit={console.log}>提交</Submit>
        </FormButtonGroup.FormItem>
      </FormLayout>
    </FormProvider>
  )
}
```

## API

### FormCollapse

| 属性名       | 类型          | 描述                                                       | 默认值 |
| ------------ | ------------- | ---------------------------------------------------------- | ------ |
| formCollapse | IFormCollapse | 传入通过 createFormCollapse/useFormCollapse 创建出来的模型 |        |

其余参考 https://ant.design/components/collapse-cn/

### FormCollapse.CollapsePanel

参考 https://ant.design/components/collapse-cn/

### FormCollapse.createFormCollapse

```ts pure
type ActiveKey = string | number
type ActiveKeys = string | number | Array<string | number>

interface createFormCollapse {
  (defaultActiveKeys?: ActiveKeys): IFormCollpase
}

interface IFormCollapse {
  //激活主键列表
  activeKeys: ActiveKeys
  //是否存在该激活主键
  hasActiveKey(key: ActiveKey): boolean
  //设置激活主键列表
  setActiveKeys(keys: ActiveKeys): void
  //添加激活主键
  addActiveKey(key: ActiveKey): void
  //删除激活主键
  removeActiveKey(key: ActiveKey): void
  //开关切换激活主键
  toggleActiveKey(key: ActiveKey): void
}
```
