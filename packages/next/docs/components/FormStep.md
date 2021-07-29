# FormStep

> Step-by-step form components
>
> Note: This component can only be used in Schema scenarios

## Markup Schema example

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
            x-component-props={{ title: 'First Step' }}
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
            x-component-props={{ title: 'Second Step' }}
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
            x-component-props={{ title: 'Step 3' }}
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
              Previous
            </Button>
            <Button
              disabled={!formStep.allowNext}
              onClick={() => {
                formStep.next()
              }}
            >
              Next step
            </Button>
            <Button
              disabled={formStep.allowNext}
              onClick={() => {
                formStep.submit(console.log)
              }}
            >
              submit
            </Button>
          </FormButtonGroup>
        )}
      </FormConsumer>
    </FormProvider>
  )
}
```

## JSON Schema case

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
            title: 'First Step',
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
            title: 'Second Step',
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
            title: 'The third step',
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
              Previous
            </Button>
            <Button
              disabled={!formStep.allowNext}
              onClick={() => {
                formStep.next()
              }}
            >
              Next step
            </Button>
            <Button
              disabled={formStep.allowNext}
              onClick={() => {
                formStep.submit(console.log)
              }}
            >
              submit
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

| Property name | Type      | Description                                             | Default value |
| ------------- | --------- | ------------------------------------------------------- | ------------- |
| formStep      | IFormStep | Pass in the model created by createFormStep/useFormStep |               |

Other references https://fusion.design/pc/component/basic/step

### FormStep.StepPane

Refer to https://fusion.design/pc/component/basic/step Steps.Step properties

### FormStep.createFormStep

```ts pure
import { Form } from '@formily/core'

interface createFormStep {
  (current?: number): IFormStep
}

interface IFormTab {
  //Current index
  current: number
  //Whether to allow backwards
  allowNext: boolean
  //Whether to allow forward
  allowBack: boolean
  //Set the current index
  setCurrent(key: number): void
  //submit Form
  submit: Form['submit']
  //backward
  next(): void
  //forward
  back(): void
}
```
