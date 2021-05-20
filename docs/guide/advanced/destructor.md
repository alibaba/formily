# Compatible solution for front-end and back-end data differences

Many times, we always encounter scenarios where the front-end data structure does not match the back-end data structure. The seemingly simple problem is actually very uncomfortable to solve. The most common problems are: 

The output of the front-end date range component is an array structure, but the format required by the back-end is to split a flat data structure. This problem is largely limited by the back-end domain model. Because from the perspective of back-end model design, splitting the flat structure is the best solution;

But from the perspective of front-end componentization, the array structure is the best;

So each side has its truth, but unfortunately, it can only cancel such an unequal treaty at the front end every time. However, with Formily, you don’t need to feel uncomfortable for such an embarrassing situation. **Formily provides the ability to deconstruct the path, which can help users quickly solve such problems.** Let's take a look at an example

## Markup Schema Case

```tsx
import React from 'react'
import {
  Form,
  FormItem,
  DatePicker,
  FormButtonGroup,
  Radio,
  Submit,
} from '@formily/antd'
import { createForm, onFieldValueChange } from '@formily/core'
import { createSchemaField, FormConsumer } from '@formily/react'
import 'antd/lib/alert/style'

const SchemaField = createSchemaField({
  components: {
    FormItem,
    DatePicker,
    Radio,
  },
})

const form = createForm({
  effects() {
    onFieldValueChange('visible_destructor', (field) => {
      form.setFieldState('[startDate,endDate]', (state) => {
        state.visible = !!field.value
      })
    })
  },
})

export default () => {
  return (
    <Form form={form} layout="vertical">
      <SchemaField>
        <SchemaField.Boolean
          name="visible_destructor"
          title="Whether to display deconstructed fields"
          default={true}
          enum={[
            { label: 'yes', value: true },
            { label: 'no', value: false },
          ]}
          x-decorator="FormItem"
          x-component="Radio.Group"
        />
        <SchemaField.String
          name="undestructor"
          title="before deconstruction"
          x-decorator="FormItem"
          x-component="DatePicker.RangePicker"
        />
        <SchemaField.String
          name="[startDate,endDate]"
          title="after deconstruction"
          default={['2020-11-20', '2021-12-30']}
          x-decorator="FormItem"
          x-component="DatePicker.RangePicker"
        />
      </SchemaField>
      <code>
        <pre>
          <FormConsumer>
            {(form) => JSON.stringify(form.values, null, 2)}
          </FormConsumer>
        </pre>
      </code>
      <FormButtonGroup>
        <Submit onSubmit={console.log}>submit</Submit>
      </FormButtonGroup>
    </Form>
  )
}
```

## JSON Schema Cases

```tsx
import React from 'react'
import {
  Form,
  FormItem,
  DatePicker,
  FormButtonGroup,
  Radio,
  Submit,
} from '@formily/antd'
import { createForm } from '@formily/core'
import { createSchemaField, FormConsumer } from '@formily/react'
import 'antd/lib/alert/style'

const SchemaField = createSchemaField({
  components: {
    FormItem,
    DatePicker,
    Radio,
  },
})

const form = createForm()

const schema = {
  type: 'object',
  properties: {
    visible_destructor: {
      type: 'boolean',
      title: 'Whether to display deconstructed fields',
      default: true,
      enum: [
        { label: 'yes', value: true },
        { label: 'no', value: false },
      ],
      'x-decorator': 'FormItem',
      'x-component': 'Radio.Group',
    },
    undestructor: {
      type: 'string',
      title: 'before deconstruction',
      'x-decorator': 'FormItem',
      'x-component': 'DatePicker.RangePicker',
    },
    '[startDate,endDate]': {
      type: 'string',
      title: 'after deconstruction',
      default: ['2020-11-20', '2021-12-30'],
      'x-decorator': 'FormItem',
      'x-component': 'DatePicker.RangePicker',
      'x-reactions': {
        dependencies: ['visible_destructor'],
        fulfill: {
          state: {
            visible: '{{!!$deps[0]}}',
          },
        },
      },
    },
  },
}

export default () => {
  return (
    <Form form={form} layout="vertical">
      <SchemaField schema={schema} />
      <code>
        <pre>
          <FormConsumer>
            {(form) => JSON.stringify(form.values, null, 2)}
          </FormConsumer>
        </pre>
      </code>
      <FormButtonGroup>
        <Submit onSubmit={console.log}>submit</Submit>
      </FormButtonGroup>
    </Form>
  )
}
```

## Pure JSX Case

```tsx
import React from 'react'
import {
  Form,
  FormItem,
  DatePicker,
  FormButtonGroup,
  Radio,
  Submit,
} from '@formily/antd'
import { createForm } from '@formily/core'
import { Field, FormConsumer } from '@formily/react'
import 'antd/lib/alert/style'

const form = createForm()

export default () => {
  return (
    <Form form={form} layout="vertical">
      <Field
        name="visible_destructor"
        title="Whether to display deconstructed fields"
        initialValue={true}
        dataSource={[
          { label: 'yes', value: true },
          { label: 'no', value: false },
        ]}
        decorator={[FormItem]}
        component={[Radio.Group]}
      />
      <Field
        name="undestructor"
        title="before deconstruction"
        decorator={[FormItem]}
        component={[DatePicker.RangePicker]}
      />
      <Field
        name="[startDate,endDate]"
        title="after deconstruction"
        initialValue={['2020-11-20', '2021-12-30']}
        decorator={[FormItem]}
        component={[DatePicker.RangePicker]}
        reactions={(field)=>{
          field.visible = !!field.query('visible_destructor').value()
        }}
      />
      <code>
        <pre>
          <FormConsumer>
            {(form) => JSON.stringify(form.values, null, 2)}
          </FormConsumer>
        </pre>
      </code>
      <FormButtonGroup>
        <Submit onSubmit={console.log}>submit</Submit>
      </FormButtonGroup>
    </Form>
  )
}
```
