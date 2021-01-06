# FormStep

> 分步表单组件
>
> 注意：该组件只能用在 Schema 场景

## Markup Schema 案例

```tsx
import React from 'react'
import { FormStep, FormItem, Input } from '@formily/antd'
import { FormProvider, createForm, FormConsumer } from '@formily/react'
import { createSchemaField } from '@formily/react-schema-field'
import { Button, Space } from 'antd'

const SchemaField = createSchemaField({
  components: {
    FormItem,
    FormStep,
    Input,
  },
})

const form = createForm()

export default () => {
  const formStep = FormStep.useFormStep()
  return (
    <FormProvider form={form}>
      <SchemaField>
        <SchemaField.Void
          x-component="FormStep"
          x-component-props={{ formStep }}
        >
          <SchemaField.Void
            x-component="FormStep.StepPane"
            x-component-props={{ title: '第一步' }}
          >
            <SchemaField.String
              name="aaa"
              x-decorator="FormItem"
              required
              x-component="Input"
            />
          </SchemaField.Void>
          <SchemaField.Void
            x-component="FormStep.StepPane"
            x-component-props={{ title: '第二步' }}
          >
            <SchemaField.String
              name="bbb"
              x-decorator="FormItem"
              required
              x-component="Input"
            />
          </SchemaField.Void>
          <SchemaField.Void
            type="void"
            x-component="FormStep.StepPane"
            x-component-props={{ title: '第三步' }}
          >
            <SchemaField.String
              name="ccc"
              x-decorator="FormItem"
              required
              x-component="Input"
            />
          </SchemaField.Void>
        </SchemaField.Void>
      </SchemaField>
      <FormConsumer>
        {() => (
          <Space>
            <Button
              disabled={!formStep.allowBack}
              onClick={() => {
                formStep.back()
              }}
            >
              上一步
            </Button>
            <Button
              disabled={!formStep.allowNext}
              onClick={() => {
                formStep.next()
              }}
            >
              下一步
            </Button>
            <Button
              disabled={formStep.allowNext}
              onClick={() => {
                formStep.submit(console.log)
              }}
            >
              提交
            </Button>
          </Space>
        )}
      </FormConsumer>
    </FormProvider>
  )
}
```

## JSON Schema 案例

```tsx
import React from 'react'
import { FormStep, FormItem, Input } from '@formily/antd'
import { FormProvider, createForm, FormConsumer } from '@formily/react'
import { createSchemaField } from '@formily/react-schema-field'
import { Button, Space } from 'antd'

const SchemaField = createSchemaField({
  components: {
    FormItem,
    FormStep,
    Input,
  },
})

const form = createForm()

const schema = {
  type: 'object',
  properties: {
    step: {
      type: 'void',
      'x-component': 'FormStep',
      'x-component-props': {
        formStep: '{{formStep}}',
      },
      properties: {
        step1: {
          type: 'void',
          'x-component': 'FormStep.StepPane',
          'x-component-props': {
            title: '第一步',
          },
          properties: {
            aaa: {
              type: 'string',
              title: 'AAA',
              required: true,
              'x-decorator': 'FormItem',
              'x-component': 'Input',
            },
          },
        },
        step2: {
          type: 'void',
          'x-component': 'FormStep.StepPane',
          'x-component-props': {
            title: '第二步',
          },
          properties: {
            bbb: {
              type: 'string',
              title: 'AAA',
              required: true,
              'x-decorator': 'FormItem',
              'x-component': 'Input',
            },
          },
        },
        step3: {
          type: 'void',
          'x-component': 'FormStep.StepPane',
          'x-component-props': {
            title: '第三步',
          },
          properties: {
            ccc: {
              type: 'string',
              title: 'AAA',
              required: true,
              'x-decorator': 'FormItem',
              'x-component': 'Input',
            },
          },
        },
      },
    },
  },
}

export default () => {
  const formStep = FormStep.useFormStep()
  return (
    <FormProvider form={form}>
      <SchemaField schema={schema} scope={{ formStep }} />
      <FormConsumer>
        {() => (
          <Space>
            <Button
              disabled={!formStep.allowBack}
              onClick={() => {
                formStep.back()
              }}
            >
              上一步
            </Button>
            <Button
              disabled={!formStep.allowNext}
              onClick={() => {
                formStep.next()
              }}
            >
              下一步
            </Button>
            <Button
              disabled={formStep.allowNext}
              onClick={() => {
                formStep.submit(console.log)
              }}
            >
              提交
            </Button>
          </Space>
        )}
      </FormConsumer>
    </FormProvider>
  )
}
```

## API

### FormStep

### FormStep.StepPane

### FormStep.createFormStep

### FormStep.useFormStep
