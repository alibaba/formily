# Form Validation

Formily's form validation uses the extremely powerful and flexible @formily/validator validation engine. There are two main scenarios for validation:

- Markup(JSON) Schema scene protocol verification property verification, using JSON Schema's own verification property and x-validator property to achieve verification
- Pure JSX scene verification properties, use validator property to achieve verification

At the same time, we can also implement linkage verification in effects or x-reactions/reactions

Specific rule verification document reference [FieldValidator](https://core.formilyjs.org/api/models/field#fieldvalidator)

## Built-in rule check

#### Markup Schema Use Cases

```tsx
import React from 'react'
import { createForm } from '@formily/core'
import { createSchemaField } from '@formily/react'
import { Form, FormItem, Input, NumberPicker } from '@formily/antd'

const form = createForm()

const SchemaField = createSchemaField({
  components: {
    Input,
    FormItem,
    NumberPicker,
  },
})

export default () => (
  <Form form={form} labelCol={6} wrapperCol={10}>
    <SchemaField>
      <SchemaField.String
        name="required_1"
        title="Required"
        required
        x-component="Input"
        x-decorator="FormItem"
      />
      <SchemaField.String
        name="required_2"
        title="Required"
        x-validator={{ required: true }}
        x-component="Input"
        x-decorator="FormItem"
      />
      <SchemaField.String
        name="required_3"
        title="Required"
        x-validator={[{ required: true }]}
        x-component="Input"
        x-decorator="FormItem"
      />
      <SchemaField.Number
        name="max_1"
        title="Maximum value (>5 error)"
        maximum={5}
        x-component="NumberPicker"
        x-decorator="FormItem"
      />
      <SchemaField.Number
        name="max_2"
        title="Maximum value (>5 error)"
        x-validator={{ maximum: 5 }}
        x-component="NumberPicker"
        x-decorator="FormItem"
      />
      <SchemaField.Number
        name="max_3"
        title="Maximum value (>5 error)"
        x-validator={[{ maximum: 5 }]}
        x-component="NumberPicker"
        x-decorator="FormItem"
      />
      <SchemaField.Number
        name="max_4"
        title="Maximum value (>=5 error)"
        exclusiveMaximum={5}
        x-component="NumberPicker"
        x-decorator="FormItem"
      />
      <SchemaField.Number
        name="max_5"
        title="Maximum value (>=5 error)"
        x-validator={{ exclusiveMaximum: 5 }}
        x-component="NumberPicker"
        x-decorator="FormItem"
      />
      <SchemaField.Number
        name="max_6"
        title="Maximum value (>=5 error)"
        x-validator={[{ exclusiveMaximum: 5 }]}
        x-component="NumberPicker"
        x-decorator="FormItem"
      />

      <SchemaField.Number
        name="min_1"
        title="Minimum value (<5 error)"
        minimum={5}
        x-component="NumberPicker"
        x-decorator="FormItem"
      />
      <SchemaField.Number
        name="min_2"
        title="Minimum value (<5 error)"
        x-validator={{ minimum: 5 }}
        x-component="NumberPicker"
        x-decorator="FormItem"
      />
      <SchemaField.Number
        name="min_3"
        title="Minimum value (<5 error)"
        x-validator={[{ minimum: 5 }]}
        x-component="NumberPicker"
        x-decorator="FormItem"
      />
      <SchemaField.Number
        name="min_4"
        title="Minimum value (<=5 error)"
        exclusiveMinimum={5}
        x-component="NumberPicker"
        x-decorator="FormItem"
      />
      <SchemaField.Number
        name="min_5"
        title="Minimum value (<=5 error)"
        x-validator={{ exclusiveMinimum: 5 }}
        x-component="NumberPicker"
        x-decorator="FormItem"
      />
      <SchemaField.Number
        name="min_6"
        title="Minimum value (<=5 error)"
        x-validator={[{ exclusiveMinimum: 5 }]}
        x-component="NumberPicker"
        x-decorator="FormItem"
      />

      <SchemaField.String
        name="length_1"
        title="Length is 5"
        x-validator={{ len: 5 }}
        x-component="Input"
        x-decorator="FormItem"
      />
      <SchemaField.String
        name="length_2"
        title="Length is 5"
        x-validator={[{ len: 5 }]}
        x-component="Input"
        x-decorator="FormItem"
      />

      <SchemaField.String
        name="maxlength_1"
        title="Maximum length is 5"
        maxLength={5}
        x-component="Input"
        x-decorator="FormItem"
      />
      <SchemaField.String
        name="maxlength_2"
        title="Maximum length is 5"
        x-validator={{ max: 5 }}
        x-component="Input"
        x-decorator="FormItem"
      />
      <SchemaField.String
        name="maxlength_3"
        title="Maximum length is 5"
        x-validator={[{ max: 5 }]}
        x-component="Input"
        x-decorator="FormItem"
      />

      <SchemaField.String
        name="maxlength_4"
        title="Minimum length is 5"
        minLength={5}
        x-component="Input"
        x-decorator="FormItem"
      />
      <SchemaField.String
        name="maxlength_5"
        title="Minimum length is 5"
        x-validator={{ min: 5 }}
        x-component="Input"
        x-decorator="FormItem"
      />
      <SchemaField.String
        name="maxlength_6"
        title="Minimum length is 5"
        x-validator={[{ min: 5 }]}
        x-component="Input"
        x-decorator="FormItem"
      />

      <SchemaField.String
        name="whitespace"
        title="Exclude pure whitespace characters"
        x-validator={[{ whitespace: true }]}
        x-component="Input"
        x-decorator="FormItem"
      />

      <SchemaField.String
        name="enum"
        title="Enumeration match"
        x-validator={[{ enum: ['1', '2', '3'] }]}
        x-component="Input"
        x-decorator="FormItem"
      />

      <SchemaField.String
        name="const"
        title="Constant match"
        const="123"
        x-component="Input"
        x-decorator="FormItem"
      />

      <SchemaField.String
        name="multipleOf"
        title="Divisible match"
        multipleOf={2}
        x-component="NumberPicker"
        x-decorator="FormItem"
      />
    </SchemaField>
  </Form>
)
```

#### JSON Schema Use Cases

```tsx
import React from 'react'
import { createForm } from '@formily/core'
import { createSchemaField } from '@formily/react'
import { Form, FormItem, Input, NumberPicker } from '@formily/antd'

const form = createForm()

const SchemaField = createSchemaField({
  components: {
    Input,
    FormItem,
    NumberPicker,
  },
})

const schema = {
  type: 'object',
  properties: {
    required_1: {
      name: 'required_1',
      title: 'Required',
      type: 'string',
      required: true,
      'x-decorator': 'FormItem',
      'x-component': 'Input',
    },
    required_2: {
      name: 'required_2',
      title: 'Required',
      type: 'string',
      'x-validator': {
        required: true,
      },
      'x-decorator': 'FormItem',
      'x-component': 'Input',
    },
    required_3: {
      name: 'required_3',
      title: 'Required',
      type: 'string',
      'x-validator': [
        {
          required: true,
        },
      ],
      'x-decorator': 'FormItem',
      'x-component': 'Input',
    },
    max_1: {
      name: 'max_1',
      title: 'Maximum value (>5 error)',
      type: 'number',
      maximum: 5,
      'x-decorator': 'FormItem',
      'x-component': 'NumberPicker',
    },
    max_2: {
      name: 'max_2',
      title: 'Maximum value (>5 error)',
      type: 'number',
      'x-validator': {
        maximum: 5,
      },
      'x-decorator': 'FormItem',
      'x-component': 'NumberPicker',
    },
    max_3: {
      name: 'max_3',
      title: 'Maximum value (>5 error)',
      type: 'number',
      'x-validator': [
        {
          maximum: 5,
        },
      ],
      'x-decorator': 'FormItem',
      'x-component': 'NumberPicker',
    },
    max_4: {
      name: 'max_4',
      title: 'Maximum value (>=5 error))',
      type: 'number',
      exclusiveMaximum: 5,
      'x-decorator': 'FormItem',
      'x-component': 'NumberPicker',
    },
    max_5: {
      name: 'max_5',
      title: 'Maximum value (>=5 error))',
      type: 'number',
      'x-validator': {
        exclusiveMaximum: 5,
      },
      'x-decorator': 'FormItem',
      'x-component': 'NumberPicker',
    },
    max_6: {
      name: 'max_6',
      title: 'Maximum value (>=5 error))',
      type: 'number',
      'x-validator': [
        {
          exclusiveMaximum: 5,
        },
      ],
      'x-decorator': 'FormItem',
      'x-component': 'NumberPicker',
    },
    min_1: {
      name: 'min_1',
      title: 'Minimum value (<5 error))',
      type: 'number',
      minimum: 5,
      'x-decorator': 'FormItem',
      'x-component': 'NumberPicker',
    },
    min_2: {
      name: 'min_2',
      title: 'Minimum value (<5 error))',
      type: 'number',
      'x-validator': {
        minimum: 5,
      },
      'x-decorator': 'FormItem',
      'x-component': 'NumberPicker',
    },
    min_3: {
      name: 'min_3',
      title: 'Minimum value (<5 error))',
      type: 'string',
      'x-validator': [
        {
          minimum: 5,
        },
      ],
      'x-decorator': 'FormItem',
      'x-component': 'NumberPicker',
    },
    min_4: {
      name: 'min_4',
      title: 'Minimum value (<=5 error))',
      type: 'number',
      exclusiveMinimum: 5,
      'x-decorator': 'FormItem',
      'x-component': 'NumberPicker',
    },
    min_5: {
      name: 'min_5',
      title: 'Minimum value (<=5 error))',
      type: 'number',
      'x-validator': {
        exclusiveMinimum: 5,
      },
      'x-decorator': 'FormItem',
      'x-component': 'NumberPicker',
    },
    min_6: {
      name: 'min_6',
      title: 'Minimum value (<=5 error))',
      type: 'number',
      'x-validator': [
        {
          exclusiveMinimum: 5,
        },
      ],
      'x-decorator': 'FormItem',
      'x-component': 'NumberPicker',
    },
    length_1: {
      name: 'length_1',
      title: 'Length is 5',
      type: 'string',
      'x-validator': {
        len: 5,
      },
      'x-decorator': 'FormItem',
      'x-component': 'Input',
    },
    length_2: {
      name: 'length_2',
      title: 'Length is 5',
      type: 'string',
      'x-validator': [
        {
          len: 5,
        },
      ],
      'x-decorator': 'FormItem',
      'x-component': 'Input',
    },
    maxlength_1: {
      name: 'maxlength_1',
      title: 'Maximum length is 5',
      type: 'string',
      maxLength: 5,
      'x-decorator': 'FormItem',
      'x-component': 'Input',
    },
    maxlength_2: {
      name: 'maxlength_2',
      title: 'Maximum length is 5',
      type: 'string',
      'x-validator': {
        max: 5,
      },
      'x-decorator': 'FormItem',
      'x-component': 'Input',
    },
    maxlength_3: {
      name: 'maxlength_3',
      title: 'Maximum length is 5',
      type: 'string',
      'x-validator': [
        {
          max: 5,
        },
      ],
      'x-decorator': 'FormItem',
      'x-component': 'Input',
    },
    minlength_1: {
      name: 'minlength_1',
      title: 'Minimum length is 5',
      type: 'string',
      minLength: 5,
      'x-decorator': 'FormItem',
      'x-component': 'Input',
    },
    minlength_2: {
      name: 'minlength_2',
      title: 'Minimum length is 5',
      type: 'string',
      'x-validator': {
        min: 5,
      },
      'x-decorator': 'FormItem',
      'x-component': 'Input',
    },
    minlength_3: {
      name: 'minlength_3',
      title: 'Minimum length is 5',
      type: 'string',
      'x-validator': [
        {
          min: 5,
        },
      ],
      'x-decorator': 'FormItem',
      'x-component': 'Input',
    },
    whitespace: {
      name: 'whitespace',
      title: 'Exclude pure whitespace characters',
      type: 'string',
      'x-validator': [
        {
          whitespace: true,
        },
      ],
      'x-decorator': 'FormItem',
      'x-component': 'Input',
    },
    enum: {
      name: 'enum',
      title: 'Enumeration match',
      type: 'string',
      'x-validator': [
        {
          enum: ['1', '2', '3'],
        },
      ],
      'x-decorator': 'FormItem',
      'x-component': 'Input',
    },
    const: {
      name: 'const',
      title: 'Constant match',
      type: 'string',
      const: '123',
      'x-decorator': 'FormItem',
      'x-component': 'Input',
    },
    multipleOf: {
      name: 'multipleOf',
      title: 'Divisible match',
      type: 'string',
      multipleOf: 2,
      'x-decorator': 'FormItem',
      'x-component': 'NumberPicker',
    },
  },
}

export default () => (
  <Form form={form} labelCol={6} wrapperCol={10}>
    <SchemaField schema={schema} />
  </Form>
)
```

#### Pure JSX Case

```tsx
import React from 'react'
import { createForm } from '@formily/core'
import { Field } from '@formily/react'
import { Form, FormItem, Input, NumberPicker } from '@formily/antd'

const form = createForm()

export default () => (
  <Form form={form} labelCol={6} wrapperCol={10}>
    <Field
      name="required_1"
      title="Required"
      required
      component={[Input]}
      decorator={[FormItem]}
    />
    <Field
      name="required_2"
      title="Required"
      validator={{ required: true }}
      component={[Input]}
      decorator={[FormItem]}
    />
    <Field
      name="required_3"
      title="Required"
      validator={[{ required: true }]}
      component={[Input]}
      decorator={[FormItem]}
    />
    <Field
      name="max_1"
      title="Maximum value (>5 error)"
      validator={{ maximum: 5 }}
      component={[NumberPicker]}
      decorator={[FormItem]}
    />
    <Field
      name="max_2"
      title="Maximum value (>5 error)"
      validator={[{ maximum: 5 }]}
      component={[NumberPicker]}
      decorator={[FormItem]}
    />
    <Field
      name="max_3"
      title="Maximum value (>=5 error)"
      validator={{ exclusiveMaximum: 5 }}
      component={[NumberPicker]}
      decorator={[FormItem]}
    />
    <Field
      name="max_4"
      title="Maximum value (>=5 error)"
      validator={[{ exclusiveMaximum: 5 }]}
      component={[NumberPicker]}
      decorator={[FormItem]}
    />
    <Field
      name="min_1"
      title="Minimum value (<5 error)"
      validator={{ minimum: 5 }}
      component={[NumberPicker]}
      decorator={[FormItem]}
    />
    <Field
      name="min_2"
      title="Minimum value (<5 error)"
      validator={[{ minimum: 5 }]}
      component={[NumberPicker]}
      decorator={[FormItem]}
    />
    <Field
      name="min_3"
      title="Minimum value (<=5 error)"
      validator={{ exclusiveMinimum: 5 }}
      component={[NumberPicker]}
      decorator={[FormItem]}
    />
    <Field
      name="min_4"
      title="Minimum value (<=5 error)"
      validator={[{ exclusiveMinimum: 5 }]}
      component={[NumberPicker]}
      decorator={[FormItem]}
    />

    <Field
      name="length_1"
      title="Length is 5"
      validator={{ len: 5 }}
      component={[Input]}
      decorator={[FormItem]}
    />
    <Field
      name="length_2"
      title="Length is 5"
      validator={[{ len: 5 }]}
      component={[Input]}
      decorator={[FormItem]}
    />
    <Field
      name="maxlength_1"
      title="Maximum length is 5"
      validator={{ max: 5 }}
      component={[Input]}
      decorator={[FormItem]}
    />
    <Field
      name="maxlength_2"
      title="Maximum length is 5"
      validator={[{ max: 5 }]}
      component={[Input]}
      decorator={[FormItem]}
    />
    <Field
      name="minlength_1"
      title="Minimum length is 5"
      validator={{ min: 5 }}
      component={[Input]}
      decorator={[FormItem]}
    />
    <Field
      name="minlength_2"
      title="Minimum length is 5"
      validator={[{ min: 5 }]}
      component={[Input]}
      decorator={[FormItem]}
    />

    <Field
      name="whitespace"
      title="Exclude pure whitespace characters"
      validator={[{ whitespace: true }]}
      component={[Input]}
      decorator={[FormItem]}
    />
  </Form>
)
```

## Built-in Format Verification

#### Markup Schema Cases

```tsx
import React, { Fragment } from 'react'
import { createForm } from '@formily/core'
import { createSchemaField } from '@formily/react'
import { Form, FormItem, Input } from '@formily/antd'

const form = createForm()

const SchemaField = createSchemaField({
  components: {
    Input,
    FormItem,
  },
})

const renderFormat = (format: string, key: number) => {
  return (
    <Fragment key={key}>
      <SchemaField.String
        name={`${format}_1`}
        title={`${format} format`}
        format={format}
        required
        x-component="Input"
        x-decorator="FormItem"
      />
      <SchemaField.String
        name={`${format}_2`}
        title={`${format} format`}
        required
        x-validator={format}
        x-component="Input"
        x-decorator="FormItem"
      />
      <SchemaField.String
        name={`${format}_3`}
        title={`${format} format`}
        required
        x-validator={{ format }}
        x-component="Input"
        x-decorator="FormItem"
      />
      <SchemaField.String
        name={`${format}_4`}
        title={`${format} format`}
        required
        x-validator={[format]}
        x-component="Input"
        x-decorator="FormItem"
      />
      <SchemaField.String
        name={`${format}_5`}
        title={`${format} format`}
        required
        x-validator={[{ format }]}
        x-component="Input"
        x-decorator="FormItem"
      />
    </Fragment>
  )
}

const FORMATS = [
  'url',
  'email',
  'phone',
  'ipv6',
  'ipv4',
  'number',
  'integer',
  'qq',
  'idcard',
  'money',
  'zh',
  'date',
  'zip',
]

export default () => (
  <Form form={form} labelCol={6} wrapperCol={10}>
    <SchemaField>{FORMATS.map(renderFormat)}</SchemaField>
  </Form>
)
```

#### JSON Schema Cases

```tsx
import React from 'react'
import { createForm } from '@formily/core'
import { createSchemaField } from '@formily/react'
import { Form, FormItem, Input } from '@formily/antd'

const form = createForm()

const schema = {
  type: 'object',
  properties: {},
}

const FORMATS = [
  'url',
  'email',
  'phone',
  'ipv6',
  'ipv4',
  'number',
  'integer',
  'qq',
  'idcard',
  'money',
  'zh',
  'date',
  'zip',
]

FORMATS.forEach((key) => {
  Object.assign(schema.properties, {
    [`${key}_1`]: {
      title: `${key} format`,
      type: 'string',
      required: true,
      format: key,
      'x-decorator': 'FormItem',
      'x-component': 'Input',
    },
    [`${key}_2`]: {
      title: `${key} format`,
      type: 'string',
      required: true,
      'x-validator': key,
      'x-decorator': 'FormItem',
      'x-component': 'Input',
    },
    [`${key}_3`]: {
      title: `${key} format`,
      type: 'string',
      required: true,
      'x-validator': {
        format: key,
      },
      'x-decorator': 'FormItem',
      'x-component': 'Input',
    },
    [`${key}_4`]: {
      title: `${key} format`,
      type: 'string',
      required: true,
      'x-validator': [key],
      'x-decorator': 'FormItem',
      'x-component': 'Input',
    },

    [`${key}_5`]: {
      title: `${key} format`,
      type: 'string',
      required: true,
      'x-validator': [
        {
          format: key,
        },
      ],
      'x-decorator': 'FormItem',
      'x-component': 'Input',
    },
  })
})

const SchemaField = createSchemaField({
  components: {
    Input,
    FormItem,
  },
})

export default () => (
  <Form form={form} labelCol={6} wrapperCol={10}>
    <SchemaField schema={schema} />
  </Form>
)
```

#### Pure JSX Cases

```tsx
import React, { Fragment } from 'react'
import { createForm } from '@formily/core'
import { Field } from '@formily/react'
import { Form, FormItem, Input } from '@formily/antd'

const form = createForm()

const renderFormat = (format: string, key: number) => {
  return (
    <Fragment key={key}>
      <Field
        name={`${format}_1`}
        title={`${format} format`}
        required
        validator={format}
        component={[Input]}
        decorator={[FormItem]}
      />
      <Field
        name={`${format}_2`}
        title={`${format} format`}
        required
        validator={{ format }}
        component={[Input]}
        decorator={[FormItem]}
      />
      <Field
        name={`${format}_3`}
        title={`${format} format`}
        required
        validator={[format]}
        component={[Input]}
        decorator={[FormItem]}
      />
      <Field
        name={`${format}_4`}
        title={`${format} format`}
        required
        validator={[{ format }]}
        component={[Input]}
        decorator={[FormItem]}
      />
    </Fragment>
  )
}

const FORMATS = [
  'url',
  'email',
  'phone',
  'ipv6',
  'ipv4',
  'number',
  'integer',
  'qq',
  'idcard',
  'money',
  'zh',
  'date',
  'zip',
]

export default () => (
  <Form form={form} labelCol={6} wrapperCol={10}>
    {FORMATS.map(renderFormat)}
  </Form>
)
```

## Custom Rule Verification

#### Markup Schema Cases

```tsx
import React from 'react'
import { createForm, registerValidateRules } from '@formily/core'
import { createSchemaField } from '@formily/react'
import { Form, FormItem, Input, NumberPicker } from '@formily/antd'

const form = createForm()

const SchemaField = createSchemaField({
  components: {
    Input,
    FormItem,
    NumberPicker,
  },
})

registerValidateRules({
  global_1(value) {
    if (!value) return ''
    return value !== '123' ? 'error❎' : ''
  },
  global_2(value, rule) {
    if (!value) return ''
    return value !== '123' ? rule.message : ''
  },
  global_3(value) {
    if (!value) return ''
    return value === '123'
  },
  global_4(value) {
    if (!value) return ''
    if (value < 10) {
      return {
        type: 'error',
        message: 'The value cannot be less than 10',
      }
    } else if (value < 100) {
      return {
        type: 'warning',
        message: 'The value is within 100',
      }
    } else if (value < 1000) {
      return {
        type: 'success',
        message: 'The value is greater than 100 and less than 1000',
      }
    }
  },
})

export default () => (
  <Form form={form} labelCol={6} wrapperCol={10}>
    <SchemaField>
      <SchemaField.String
        name="global_style_1"
        title="Global registration style"
        required
        x-validator={{
          global_1: true,
        }}
        x-component="Input"
        x-decorator="FormItem"
      />
      <SchemaField.String
        name="global_style_2"
        title="Global registration style"
        required
        x-validator={{
          global_2: true,
          message: 'error❎',
        }}
        x-component="Input"
        x-decorator="FormItem"
      />
      <SchemaField.String
        name="global_style_3"
        title="Global registration style"
        required
        x-validator={{
          global_3: true,
          message: 'error❎',
        }}
        x-component="Input"
        x-decorator="FormItem"
      />
      <SchemaField.Number
        name="global_style_4"
        title="Global registration style"
        required
        x-validator={{
          global_4: true,
        }}
        x-component="NumberPicker"
        x-decorator="FormItem"
      />

      <SchemaField.String
        name="validator_style_1"
        title="Locally defined style"
        required
        x-validator={(value) => {
          if (!value) return ''
          return value !== '123' ? 'error❎' : ''
        }}
        x-component="Input"
        x-decorator="FormItem"
      />
      <SchemaField.String
        name="validator_style_2"
        title="Locally defined style"
        required
        x-validator={{
          validator(value, rule) {
            if (!value) return ''
            return value !== '123' ? rule.message : ''
          },
          message: 'error❎',
        }}
        x-component="Input"
        x-decorator="FormItem"
      />
      <SchemaField.String
        name="validator_style_3"
        title="Locally defined style"
        required
        x-validator={{
          validator(value) {
            if (!value) return ''
            return value === '123'
          },
          message: 'error❎',
        }}
        x-component="Input"
        x-decorator="FormItem"
      />
      <SchemaField.Number
        name="validator_style_4"
        title="Locally defined style"
        required
        x-validator={(value) => {
          if (!value) return ''
          if (value < 10) {
            return {
              type: 'error',
              message: 'The value cannot be less than 10',
            }
          } else if (value < 100) {
            return {
              type: 'warning',
              message: 'The value is within 100',
            }
          } else if (value < 1000) {
            return {
              type: 'success',
              message: 'The value is greater than 100 and less than 1000',
            }
          }
        }}
        x-component="NumberPicker"
        x-decorator="FormItem"
      />
    </SchemaField>
  </Form>
)
```

#### JSON Schema Cases

```tsx
import React from 'react'
import { createForm, registerValidateRules } from '@formily/core'
import { createSchemaField } from '@formily/react'
import { Form, FormItem, Input, NumberPicker } from '@formily/antd'

const form = createForm()

const SchemaField = createSchemaField({
  components: {
    Input,
    FormItem,
    NumberPicker,
  },
})

registerValidateRules({
  global_1(value) {
    if (!value) return ''
    return value !== '123' ? 'error❎' : ''
  },
  global_2(value, rule) {
    if (!value) return ''
    return value !== '123' ? rule.message : ''
  },
  global_3(value) {
    if (!value) return ''
    return value === '123'
  },
  global_4(value) {
    if (!value) return ''
    if (value < 10) {
      return {
        type: 'error',
        message: 'The value cannot be less than 10',
      }
    } else if (value < 100) {
      return {
        type: 'warning',
        message: 'The value is within 100',
      }
    } else if (value < 1000) {
      return {
        type: 'success',
        message: 'The value is greater than 100 and less than 1000',
      }
    }
  },
})

const schema = {
  type: 'object',
  properties: {
    global_style_1: {
      title: 'Global registration style',
      required: true,
      'x-validator': {
        global_1: true,
      },
      'x-component': 'Input',
      'x-decorator': 'FormItem',
    },
    global_style_2: {
      title: 'Global registration style',
      required: true,
      'x-validator': {
        global_2: true,
        message: 'error❎',
      },
      'x-component': 'Input',
      'x-decorator': 'FormItem',
    },
    global_style_3: {
      title: 'Global registration style',
      required: true,
      'x-validator': {
        global_3: true,
        message: 'error❎',
      },
      'x-component': 'Input',
      'x-decorator': 'FormItem',
    },
    global_style_4: {
      title: 'Global registration style',
      required: true,
      'x-validator': {
        global_4: true,
      },
      'x-component': 'Input',
      'x-decorator': 'FormItem',
    },

    validator_style_1: {
      title: 'Locally defined style',
      required: true,
      'x-validator': `{{(value)=> {
            if (!value) return ''
            return value !== '123' ? 'error❎' : ''
          }}}`,
      'x-component': 'Input',
      'x-decorator': 'FormItem',
    },
    validator_style_2: {
      title: 'Locally defined style',
      required: true,
      'x-validator': {
        validator: `{{(value, rule)=> {
            if (!value) return ''
            return value !== '123' ? rule.message : ''
          }}}`,
        message: 'error❎',
      },
      'x-component': 'Input',
      'x-decorator': 'FormItem',
    },
    validator_style_3: {
      title: 'Locally defined style',
      required: true,
      'x-validator': {
        validator: `{{(value, rule)=> {
          if (!value) return ''
          return value === '123'
        }}}`,
        message: 'error❎',
      },
      'x-component': 'Input',
      'x-decorator': 'FormItem',
    },
    validator_style_4: {
      title: 'Locally defined style',
      required: true,
      'x-validator': `{{(value, rule)=> {
          if (!value) return ''
          if (value < 10) {
            return {
              type: 'error',
              message: 'The value cannot be less than 10',
            }
          } else if (value < 100) {
            return {
              type: 'warning',
              message: 'The value is within 100',
            }
          } else if (value < 1000) {
            return {
              type: 'success',
              message: 'The value is greater than 100 and less than 1000',
            }
          }
        }}}`,
      'x-component': 'Input',
      'x-decorator': 'FormItem',
    },
  },
}

export default () => (
  <Form form={form} labelCol={6} wrapperCol={10}>
    <SchemaField schema={schema} />
  </Form>
)
```

#### Pure JSX Cases

```tsx
import React from 'react'
import { createForm, registerValidateRules } from '@formily/core'
import { Field } from '@formily/react'
import { Form, FormItem, Input, NumberPicker } from '@formily/antd'

const form = createForm()

registerValidateRules({
  global_1(value) {
    if (!value) return ''
    return value !== '123' ? 'error❎' : ''
  },
  global_2(value, rule) {
    if (!value) return ''
    return value !== '123' ? rule.message : ''
  },
  global_3(value) {
    if (!value) return ''
    return value === '123'
  },
  global_4(value) {
    if (!value) return ''
    if (value < 10) {
      return {
        type: 'error',
        message: 'The value cannot be less than 10',
      }
    } else if (value < 100) {
      return {
        type: 'warning',
        message: 'The value is within 100',
      }
    } else if (value < 1000) {
      return {
        type: 'success',
        message: 'The value is greater than 100 and less than 1000',
      }
    }
  },
})

export default () => (
  <Form form={form} labelCol={6} wrapperCol={10}>
    <Field
      name="global_style_1"
      title="Global registration style"
      required
      validator={{
        global_1: true,
      }}
      component={[Input]}
      decorator={[FormItem]}
    />
    <Field
      name="global_style_2"
      title="Global registration style"
      required
      validator={{
        global_2: true,
        message: 'error❎',
      }}
      component={[Input]}
      decorator={[FormItem]}
    />
    <Field
      name="global_style_3"
      title="Global registration style"
      required
      validator={{
        global_3: true,
        message: 'error❎',
      }}
      component={[Input]}
      decorator={[FormItem]}
    />
    <Field
      name="global_style_4"
      title="Global registration style"
      required
      validator={{
        global_4: true,
      }}
      component={[NumberPicker]}
      decorator={[FormItem]}
    />

    <Field
      name="validator_style_1"
      title="Locally defined style"
      required
      validator={(value) => {
        if (!value) return ''
        return value !== '123' ? 'error❎' : ''
      }}
      component={[Input]}
      decorator={[FormItem]}
    />
    <Field
      name="validator_style_2"
      title="Locally defined style"
      required
      validator={{
        validator(value, rule) {
          if (!value) return ''
          return value !== '123' ? rule.message : ''
        },
        message: 'error❎',
      }}
      component={[Input]}
      decorator={[FormItem]}
    />
    <Field
      name="validator_style_3"
      title="Locally defined style"
      required
      validator={{
        validator(value) {
          if (!value) return ''
          return value === '123'
        },
        message: 'error❎',
      }}
      component={[Input]}
      decorator={[FormItem]}
    />
    <Field
      name="validator_style_4"
      title="Locally defined style"
      required
      validator={(value) => {
        if (!value) return ''
        if (value < 10) {
          return {
            type: 'error',
            message: 'The value cannot be less than 10',
          }
        } else if (value < 100) {
          return {
            type: 'warning',
            message: 'The value is within 100',
          }
        } else if (value < 1000) {
          return {
            type: 'success',
            message: 'The value is greater than 100 and less than 1000',
          }
        }
      }}
      component={[NumberPicker]}
      decorator={[FormItem]}
    />
  </Form>
)
```

## Custom Format Verification

#### Markup Schema Cases

```tsx
import React from 'react'
import { createForm, registerValidateFormats } from '@formily/core'
import { createSchemaField } from '@formily/react'
import { Form, FormItem, Input } from '@formily/antd'

const form = createForm()

const SchemaField = createSchemaField({
  components: {
    Input,
    FormItem,
  },
})

registerValidateFormats({
  custom_format: /123/,
})

export default () => (
  <Form form={form} labelCol={6} wrapperCol={10}>
    <SchemaField>
      <SchemaField.String
        name="global_style_1"
        title="Global registration style"
        required
        x-validator={{
          format: 'custom_format',
          message: 'error❎',
        }}
        x-component="Input"
        x-decorator="FormItem"
      />
      <SchemaField.String
        name="global_style_2"
        title="Global registration style"
        required
        x-validator={'custom_format'}
        x-component="Input"
        x-decorator="FormItem"
      />
      <SchemaField.String
        name="global_style_3"
        title="Global registration style"
        required
        x-validator={['custom_format']}
        x-component="Input"
        x-decorator="FormItem"
      />
      <SchemaField.Number
        name="global_style_4"
        title="Global registration style"
        required
        x-validator={{
          format: 'custom_format',
          message: 'error❎',
        }}
        x-component="Input"
        x-decorator="FormItem"
      />

      <SchemaField.String
        name="validator_style_1"
        title="Locally defined style"
        required
        pattern={/123/}
        x-component="Input"
        x-decorator="FormItem"
      />
      <SchemaField.String
        name="validator_style_2"
        title="Locally defined style"
        required
        pattern="123"
        x-component="Input"
        x-decorator="FormItem"
      />
      <SchemaField.String
        name="validator_style_3"
        title="Locally defined style"
        required
        x-validator={{
          pattern: /123/,
          message: 'error❎',
        }}
        x-component="Input"
        x-decorator="FormItem"
      />
      <SchemaField.String
        name="validator_style_4"
        title="Locally defined style"
        required
        x-validator={{
          pattern: '123',
          message: 'error❎',
        }}
        x-component="Input"
        x-decorator="FormItem"
      />
    </SchemaField>
  </Form>
)
```

#### JSON Schema Cases

```tsx
import React from 'react'
import { createForm, registerValidateFormats } from '@formily/core'
import { createSchemaField } from '@formily/react'
import { Form, FormItem, Input } from '@formily/antd'

const form = createForm()

const SchemaField = createSchemaField({
  components: {
    Input,
    FormItem,
  },
})

registerValidateFormats({
  custom_format: /123/,
})

const schema = {
  type: 'object',
  properties: {
    global_style_1: {
      title: 'Global registration style',
      required: true,
      'x-validator': {
        format: 'custom_format',
        message: 'error❎',
      },
      'x-component': 'Input',
      'x-decorator': 'FormItem',
    },
    global_style_2: {
      title: 'Global registration style',
      required: true,
      'x-validator': 'custom_format',
      'x-component': 'Input',
      'x-decorator': 'FormItem',
    },
    global_style_3: {
      title: 'Global registration style',
      required: true,
      'x-validator': ['custom_format'],
      'x-component': 'Input',
      'x-decorator': 'FormItem',
    },
    global_style_4: {
      title: 'Global registration style',
      required: true,
      'x-validator': {
        format: 'custom_format',
        message: 'error❎',
      },
      'x-component': 'Input',
      'x-decorator': 'FormItem',
    },
    validator_style_1: {
      title: 'Locally defined style',
      required: true,
      pattern: /123/,
      'x-component': 'Input',
      'x-decorator': 'FormItem',
    },
    validator_style_2: {
      title: 'Locally defined style',
      required: true,
      pattern: '123',
      'x-component': 'Input',
      'x-decorator': 'FormItem',
    },
    validator_style_3: {
      title: 'Locally defined style',
      required: true,
      'x-validator': {
        pattern: /123/,
        message: 'error❎',
      },
      'x-component': 'Input',
      'x-decorator': 'FormItem',
    },
    validator_style_4: {
      title: 'Locally defined style',
      required: true,
      'x-validator': {
        pattern: '123',
        message: 'error❎',
      },
      'x-component': 'Input',
      'x-decorator': 'FormItem',
    },
  },
}

export default () => (
  <Form form={form} labelCol={6} wrapperCol={10}>
    <SchemaField schema={schema} />
  </Form>
)
```

#### Pure JSX Cases

```tsx
import React from 'react'
import { createForm, registerValidateFormats } from '@formily/core'
import { Field } from '@formily/react'
import { Form, FormItem, Input } from '@formily/antd'

const form = createForm()

registerValidateFormats({
  custom_format: /123/,
})

export default () => (
  <Form form={form} labelCol={6} wrapperCol={10}>
    <Field
      name="global_style_1"
      title="Global registration style"
      required
      validator={{
        format: 'custom_format',
        message: 'error❎',
      }}
      component={[Input]}
      decorator={[FormItem]}
    />
    <Field
      name="global_style_2"
      title="Global registration style"
      required
      validator={'custom_format'}
      component={[Input]}
      decorator={[FormItem]}
    />
    <Field
      name="global_style_3"
      title="Global registration style"
      required
      validator={['custom_format']}
      component={[Input]}
      decorator={[FormItem]}
    />
    <Field
      name="global_style_4"
      title="Global registration style"
      required
      validator={{
        format: 'custom_format',
        message: 'error❎',
      }}
      component={[Input]}
      decorator={[FormItem]}
    />
    <Field
      name="validator_style_1"
      title="Locally defined style"
      required
      validator={{
        pattern: /123/,
        message: 'error❎',
      }}
      component={[Input]}
      decorator={[FormItem]}
    />
    <Field
      name="validator_style_2"
      title="Locally defined style"
      required
      validator={{
        pattern: '123',
        message: 'error❎',
      }}
      component={[Input]}
      decorator={[FormItem]}
    />
  </Form>
)
```

## Asynchronous Verification

#### Markup Schema Cases

```tsx
import React from 'react'
import { createForm } from '@formily/core'
import { createSchemaField } from '@formily/react'
import { Form, FormItem, Input } from '@formily/antd'

const form = createForm()

const SchemaField = createSchemaField({
  components: {
    Input,
    FormItem,
  },
})

export default () => (
  <Form form={form} labelCol={6} wrapperCol={10}>
    <SchemaField>
      <SchemaField.String
        name="async_validate"
        title="Asynchronous verification"
        required
        x-validator={(value) => {
          return new Promise((resolve) => {
            setTimeout(() => {
              if (!value) {
                resolve('')
              }
              if (value === '123') {
                resolve('')
              } else {
                resolve('error❎')
              }
            }, 1000)
          })
        }}
        x-component="Input"
        x-decorator="FormItem"
      />
      <SchemaField.String
        name="async_validate_2"
        title="Asynchronous verification (onBlur trigger)"
        required
        x-validator={{
          triggerType: 'onBlur',
          validator: (value) => {
            return new Promise((resolve) => {
              setTimeout(() => {
                if (!value) {
                  resolve('')
                }
                if (value === '123') {
                  resolve('')
                } else {
                  resolve('error❎')
                }
              }, 1000)
            })
          },
        }}
        x-component="Input"
        x-decorator="FormItem"
      />
    </SchemaField>
  </Form>
)
```

#### JSON Schema Cases

```tsx
import React from 'react'
import { createForm } from '@formily/core'
import { createSchemaField } from '@formily/react'
import { Form, FormItem, Input } from '@formily/antd'

const form = createForm()

const SchemaField = createSchemaField({
  components: {
    Input,
    FormItem,
  },
})

const schema = {
  type: 'object',
  properties: {
    async_validate: {
      title: 'Asynchronous verification',
      required: true,
      'x-validator': `{{(value) => {
        return new Promise((resolve) => {
          setTimeout(() => {
            if (!value) {
              resolve('')
            }
            if (value === '123') {
              resolve('')
            } else {
              resolve('error❎')
            }
          }, 1000)
        })
      }}}`,
      'x-component': 'Input',
      'x-decorator': 'FormItem',
    },
    async_validate_2: {
      title: 'Asynchronous verification (onBlur trigger)',
      required: true,
      'x-validator': {
        triggerType: 'onBlur',
        validator: `{{(value) => {
        return new Promise((resolve) => {
          setTimeout(() => {
            if (!value) {
              resolve('')
            }
            if (value === '123') {
              resolve('')
            } else {
              resolve('错误❎')
            }
          }, 1000)
        })
      }}}`,
      },
      'x-component': 'Input',
      'x-decorator': 'FormItem',
    },
  },
}

export default () => (
  <Form form={form} labelCol={6} wrapperCol={10}>
    <SchemaField schema={schema} />
  </Form>
)
```

#### Pure JSX Cases

```tsx
import React from 'react'
import { createForm } from '@formily/core'
import { Field } from '@formily/react'
import { Form, FormItem, Input } from '@formily/antd'

const form = createForm()

export default () => (
  <Form form={form} labelCol={6} wrapperCol={10}>
    <Field
      name="async_validate"
      title="Asynchronous verification"
      required
      validator={(value) => {
        return new Promise((resolve) => {
          setTimeout(() => {
            if (!value) {
              resolve('')
            }
            if (value === '123') {
              resolve('')
            } else {
              resolve('error❎')
            }
          }, 1000)
        })
      }}
      component={[Input]}
      decorator={[FormItem]}
    />
    <Field
      name="async_validate_2"
      title="Asynchronous verification (onBlur trigger)"
      required
      validator={{
        triggerType: 'onBlur',
        validator: (value) => {
          return new Promise((resolve) => {
            setTimeout(() => {
              if (!value) {
                resolve('')
              }
              if (value === '123') {
                resolve('')
              } else {
                resolve('error ❎')
              }
            }, 1000)
          })
        },
      }}
      component={[Input]}
      decorator={[FormItem]}
    />
  </Form>
)
```

## Linkage Verification

#### Markup Schema Cases

```tsx
import React from 'react'
import { createForm } from '@formily/core'
import { createSchemaField } from '@formily/react'
import { Form, FormItem, NumberPicker } from '@formily/antd'

const form = createForm()

const SchemaField = createSchemaField({
  components: {
    NumberPicker,
    FormItem,
  },
})

export default () => (
  <Form form={form} labelCol={6} wrapperCol={10}>
    <SchemaField>
      <SchemaField.String
        name="aa"
        title="AA"
        required
        x-reactions={(field) => {
          field.selfErrors =
            field.query('bb').value() >= field.value
              ? 'AA must be greater than BB'
              : ''
        }}
        x-component="NumberPicker"
        x-decorator="FormItem"
      />
      <SchemaField.String
        name="bb"
        title="BB"
        required
        x-reactions={(field) => {
          field.selfErrors =
            field.query('aa').value() <= field.value
              ? 'AA must be greater than BB'
              : ''
        }}
        x-component="NumberPicker"
        x-decorator="FormItem"
      />
    </SchemaField>
  </Form>
)
```

#### JSON Schema Cases

```tsx
import React from 'react'
import { createForm } from '@formily/core'
import { createSchemaField } from '@formily/react'
import { Form, FormItem, NumberPicker } from '@formily/antd'

const form = createForm()

const SchemaField = createSchemaField({
  components: {
    NumberPicker,
    FormItem,
  },
})

const schema = {
  type: 'object',
  properties: {
    aa: {
      title: 'AA',
      required: true,
      'x-reactions': `{{(field) => {
          field.selfErrors =
            field.query('bb').value() >= field.value ? 'AA must be greater than BB' : ''
      }}}`,
      'x-component': 'NumberPicker',
      'x-decorator': 'FormItem',
    },
    bb: {
      title: 'BB',
      required: true,
      'x-reactions': {
        dependencies: ['aa'],
        fulfill: {
          state: {
            selfErrors:
              "{{$deps[0] <= $self.value ? 'AA must be greater than BB' : ''}}",
          },
        },
      },
      'x-component': 'NumberPicker',
      'x-decorator': 'FormItem',
    },
  },
}

export default () => (
  <Form form={form} labelCol={6} wrapperCol={10}>
    <SchemaField schema={schema} />
  </Form>
)
```

#### Pure JSX Cases

```tsx
import React from 'react'
import { createForm } from '@formily/core'
import { Field } from '@formily/react'
import { Form, FormItem, NumberPicker } from '@formily/antd'

const form = createForm()

export default () => (
  <Form form={form} labelCol={6} wrapperCol={10}>
    <Field
      name="aa"
      title="AA"
      required
      reactions={(field) => {
        field.selfErrors =
          field.query('bb').value() >= field.value
            ? 'AA must be greater than BB'
            : ''
      }}
      component={[NumberPicker]}
      decorator={[FormItem]}
    />
    <Field
      name="bb"
      title="BB"
      required
      reactions={(field) => {
        field.selfErrors =
          field.query('aa').value() <= field.value
            ? 'AA must be greater than BB'
            : ''
      }}
      component={[NumberPicker]}
      decorator={[FormItem]}
    />
  </Form>
)
```

## Custom Verification Messages

Mainly through [registerValidateLocale](https://core.formilyjs.org/api/entry/form-validator-registry#registervalidatelocale) to customize the built-in verification messages

```tsx
import React from 'react'
import {
  createForm,
  registerValidateLocale,
  setValidateLanguage,
} from '@formily/core'
import { createSchemaField } from '@formily/react'
import { Form, FormItem, Input } from '@formily/antd'

const form = createForm()

const SchemaField = createSchemaField({
  components: {
    FormItem,
    Input,
  },
})

setValidateLanguage('en-US')

registerValidateLocale({
  'en-US': {
    required: 'Custom required verification message',
  },
})

export default () => (
  <Form form={form} labelCol={6} wrapperCol={10}>
    <SchemaField>
      <SchemaField.String
        name="aa"
        title="AA"
        required
        x-component="Input"
        x-decorator="FormItem"
      />
    </SchemaField>
  </Form>
)
```
