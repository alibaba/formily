# FormStep

> 分步表单组件
>
> 注意：该组件只能用在 Schema 场景

## Markup Schema 案例

```tsx
import React from 'react'
import { FormStep, FormItem, Input, FormButtonGroup } from '@formily/next'
import { createForm } from '@formily/core'
import { FormProvider, FormConsumer, createSchemaField } from '@formily/react'
import { Button } from '@alifd/next'

const SchemaField = createSchemaField({
  components: {
    FormItem,
    FormStep,
    Input,
  },
})

const form = createForm()
const formStep = FormStep.createFormStep()

export default () => {
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
          <FormButtonGroup>
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
          </FormButtonGroup>
        )}
      </FormConsumer>
    </FormProvider>
  )
}
```

## JSON Schema 案例

```tsx
import React from 'react'
import { FormStep, FormItem, Input, FormButtonGroup } from '@formily/next'
import { createForm } from '@formily/core'
import { FormProvider, FormConsumer, createSchemaField } from '@formily/react'
import { Button } from '@alifd/next'

const SchemaField = createSchemaField({
  components: {
    FormItem,
    FormStep,
    Input,
  },
})

const form = createForm()
const formStep = FormStep.createFormStep()

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
  return (
    <FormProvider form={form}>
      <SchemaField schema={schema} scope={{ formStep }} />
      <FormConsumer>
        {() => (
          <FormButtonGroup>
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
          </FormButtonGroup>
        )}
      </FormConsumer>
    </FormProvider>
  )
}
```

## API

### FormStep

| 属性名   | 类型      | 描述                                               | 默认值 |
| -------- | --------- | -------------------------------------------------- | ------ |
| formStep | IFormStep | 传入通过 createFormStep/useFormStep 创建出来的模型 |        |

其余参考 https://fusion.design/pc/component/basic/step

### FormStep.StepPane

参考 https://fusion.design/pc/component/basic/step Steps.Step 属性

### FormStep.createFormStep

```ts pure
import { Form } from '@formily/core'

interface createFormStep {
  (current?: number): IFormStep
}

interface IFormTab {
  //当前索引
  current: number
  //是否允许向后
  allowNext: boolean
  //是否允许向前
  allowBack: boolean
  //设置当前索引
  setCurrent(key: number): void
  //提交表单
  submit: Form['submit']
  //向后
  next(): void
  //向前
  back(): void
}
```
