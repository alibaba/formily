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
        <SchemaField.Markup
          type="void"
          x-component="FormStep"
          x-component-props={{ formStep }}
        >
          <SchemaField.Markup
            type="void"
            x-component="FormStep.StepPane"
            x-component-props={{ title: '第一步' }}
          >
            <SchemaField.Markup
              name="aaa"
              x-decorator="FormItem"
              required
              type="string"
              x-component="Input"
            />
          </SchemaField.Markup>
          <SchemaField.Markup
            type="void"
            x-component="FormStep.StepPane"
            x-component-props={{ title: '第二步' }}
          >
            <SchemaField.Markup
              name="bbb"
              x-decorator="FormItem"
              required
              type="string"
              x-component="Input"
            />
          </SchemaField.Markup>
          <SchemaField.Markup
            type="void"
            x-component="FormStep.StepPane"
            x-component-props={{ title: '第三步' }}
          >
            <SchemaField.Markup
              name="ccc"
              x-decorator="FormItem"
              required
              type="string"
              x-component="Input"
            />
          </SchemaField.Markup>
        </SchemaField.Markup>
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
