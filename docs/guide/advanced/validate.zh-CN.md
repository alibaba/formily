# 表单校验

Formily 的表单校验使用了极其强大且灵活的@formily/validator 校验引擎，校验主要分两种场景：

- Markup(JSON) Schema 场景协议校验属性校验，使用 JSON Schema 本身的校验属性与 x-validator 属性实现校验
- 纯 JSX 场景校验属性，使用 validator 属性实现校验

同时我们还能在 effects 或者 x-reactions/reactions 中实现联动校验

具体规则校验文档参考 [FieldValidator](https://core.formilyjs.org/zh-CN/api/models/field#fieldvalidator)

## 内置规则校验

#### Markup Schema 案例

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
        title="必填"
        required
        x-component="Input"
        x-decorator="FormItem"
      />
      <SchemaField.String
        name="required_2"
        title="必填"
        x-validator={{ required: true }}
        x-component="Input"
        x-decorator="FormItem"
      />
      <SchemaField.String
        name="required_3"
        title="必填"
        x-validator={[{ required: true }]}
        x-component="Input"
        x-decorator="FormItem"
      />
      <SchemaField.Number
        name="max_1"
        title="最大值(>5报错)"
        maximum={5}
        x-component="NumberPicker"
        x-decorator="FormItem"
      />
      <SchemaField.Number
        name="max_2"
        title="最大值(>5报错)"
        x-validator={{ maximum: 5 }}
        x-component="NumberPicker"
        x-decorator="FormItem"
      />
      <SchemaField.Number
        name="max_3"
        title="最大值(>5报错)"
        x-validator={[{ maximum: 5 }]}
        x-component="NumberPicker"
        x-decorator="FormItem"
      />
      <SchemaField.Number
        name="max_4"
        title="最大值(>=5报错)"
        exclusiveMaximum={5}
        x-component="NumberPicker"
        x-decorator="FormItem"
      />
      <SchemaField.Number
        name="max_5"
        title="最大值(>=5报错)"
        x-validator={{ exclusiveMaximum: 5 }}
        x-component="NumberPicker"
        x-decorator="FormItem"
      />
      <SchemaField.Number
        name="max_6"
        title="最大值(>=5报错)"
        x-validator={[{ exclusiveMaximum: 5 }]}
        x-component="NumberPicker"
        x-decorator="FormItem"
      />

      <SchemaField.Number
        name="min_1"
        title="最小值(<5报错)"
        minimum={5}
        x-component="NumberPicker"
        x-decorator="FormItem"
      />
      <SchemaField.Number
        name="min_2"
        title="最小值(<5报错)"
        x-validator={{ minimum: 5 }}
        x-component="NumberPicker"
        x-decorator="FormItem"
      />
      <SchemaField.Number
        name="min_3"
        title="最小值(<5报错)"
        x-validator={[{ minimum: 5 }]}
        x-component="NumberPicker"
        x-decorator="FormItem"
      />
      <SchemaField.Number
        name="min_4"
        title="最小值(<=5报错)"
        exclusiveMinimum={5}
        x-component="NumberPicker"
        x-decorator="FormItem"
      />
      <SchemaField.Number
        name="min_5"
        title="最小值(<=5报错)"
        x-validator={{ exclusiveMinimum: 5 }}
        x-component="NumberPicker"
        x-decorator="FormItem"
      />
      <SchemaField.Number
        name="min_6"
        title="最小值(<=5报错)"
        x-validator={[{ exclusiveMinimum: 5 }]}
        x-component="NumberPicker"
        x-decorator="FormItem"
      />

      <SchemaField.String
        name="length_1"
        title="长度为5"
        x-validator={{ len: 5 }}
        x-component="Input"
        x-decorator="FormItem"
      />
      <SchemaField.String
        name="length_2"
        title="长度为5"
        x-validator={[{ len: 5 }]}
        x-component="Input"
        x-decorator="FormItem"
      />

      <SchemaField.String
        name="maxlength_1"
        title="最大长度为5"
        maxLength={5}
        x-component="Input"
        x-decorator="FormItem"
      />
      <SchemaField.String
        name="maxlength_2"
        title="最大长度为5"
        x-validator={{ max: 5 }}
        x-component="Input"
        x-decorator="FormItem"
      />
      <SchemaField.String
        name="maxlength_3"
        title="最大长度为5"
        x-validator={[{ max: 5 }]}
        x-component="Input"
        x-decorator="FormItem"
      />

      <SchemaField.String
        name="maxlength_4"
        title="最小长度为5"
        minLength={5}
        x-component="Input"
        x-decorator="FormItem"
      />
      <SchemaField.String
        name="maxlength_5"
        title="最小长度为5"
        x-validator={{ min: 5 }}
        x-component="Input"
        x-decorator="FormItem"
      />
      <SchemaField.String
        name="maxlength_6"
        title="最小长度为5"
        x-validator={[{ min: 5 }]}
        x-component="Input"
        x-decorator="FormItem"
      />

      <SchemaField.String
        name="whitespace"
        title="排除纯空白字符"
        x-validator={[{ whitespace: true }]}
        x-component="Input"
        x-decorator="FormItem"
      />

      <SchemaField.String
        name="enum"
        title="枚举匹配"
        x-validator={[{ enum: ['1', '2', '3'] }]}
        x-component="Input"
        x-decorator="FormItem"
      />

      <SchemaField.String
        name="const"
        title="常量匹配"
        const="123"
        x-component="Input"
        x-decorator="FormItem"
      />

      <SchemaField.String
        name="multipleOf"
        title="整除匹配"
        multipleOf={2}
        x-component="NumberPicker"
        x-decorator="FormItem"
      />
    </SchemaField>
  </Form>
)
```

#### JSON Schema 案例

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
      title: '必填',
      type: 'string',
      required: true,
      'x-decorator': 'FormItem',
      'x-component': 'Input',
    },
    required_2: {
      name: 'required_2',
      title: '必填',
      type: 'string',
      'x-validator': {
        required: true,
      },
      'x-decorator': 'FormItem',
      'x-component': 'Input',
    },
    required_3: {
      name: 'required_3',
      title: '必填',
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
      title: '最大值(>5报错)',
      type: 'number',
      maximum: 5,
      'x-decorator': 'FormItem',
      'x-component': 'NumberPicker',
    },
    max_2: {
      name: 'max_2',
      title: '最大值(>5报错)',
      type: 'number',
      'x-validator': {
        maximum: 5,
      },
      'x-decorator': 'FormItem',
      'x-component': 'NumberPicker',
    },
    max_3: {
      name: 'max_3',
      title: '最大值(>5报错)',
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
      title: '最大值(>=5报错)',
      type: 'number',
      exclusiveMaximum: 5,
      'x-decorator': 'FormItem',
      'x-component': 'NumberPicker',
    },
    max_5: {
      name: 'max_5',
      title: '最大值(>=5报错)',
      type: 'number',
      'x-validator': {
        exclusiveMaximum: 5,
      },
      'x-decorator': 'FormItem',
      'x-component': 'NumberPicker',
    },
    max_6: {
      name: 'max_6',
      title: '最大值(>=5报错)',
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
      title: '最小值(<5报错)',
      type: 'number',
      minimum: 5,
      'x-decorator': 'FormItem',
      'x-component': 'NumberPicker',
    },
    min_2: {
      name: 'min_2',
      title: '最小值(<5报错)',
      type: 'number',
      'x-validator': {
        minimum: 5,
      },
      'x-decorator': 'FormItem',
      'x-component': 'NumberPicker',
    },
    min_3: {
      name: 'min_3',
      title: '最小值(<5报错)',
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
      title: '最小值(<=5报错)',
      type: 'number',
      exclusiveMinimum: 5,
      'x-decorator': 'FormItem',
      'x-component': 'NumberPicker',
    },
    min_5: {
      name: 'min_5',
      title: '最小值(<=5报错)',
      type: 'number',
      'x-validator': {
        exclusiveMinimum: 5,
      },
      'x-decorator': 'FormItem',
      'x-component': 'NumberPicker',
    },
    min_6: {
      name: 'min_6',
      title: '最小值(<=5报错)',
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
      title: '长度为5',
      type: 'string',
      'x-validator': {
        len: 5,
      },
      'x-decorator': 'FormItem',
      'x-component': 'Input',
    },
    length_2: {
      name: 'length_2',
      title: '长度为5',
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
      title: '最大长度为5',
      type: 'string',
      maxLength: 5,
      'x-decorator': 'FormItem',
      'x-component': 'Input',
    },
    maxlength_2: {
      name: 'maxlength_2',
      title: '最大长度为5',
      type: 'string',
      'x-validator': {
        max: 5,
      },
      'x-decorator': 'FormItem',
      'x-component': 'Input',
    },
    maxlength_3: {
      name: 'maxlength_3',
      title: '最大长度为5',
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
      title: '最小长度为5',
      type: 'string',
      minLength: 5,
      'x-decorator': 'FormItem',
      'x-component': 'Input',
    },
    minlength_2: {
      name: 'minlength_2',
      title: '最小长度为5',
      type: 'string',
      'x-validator': {
        min: 5,
      },
      'x-decorator': 'FormItem',
      'x-component': 'Input',
    },
    minlength_3: {
      name: 'minlength_3',
      title: '最小长度为5',
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
      title: '排除纯空白字符',
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
      title: '枚举匹配',
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
      title: '常量匹配',
      type: 'string',
      const: '123',
      'x-decorator': 'FormItem',
      'x-component': 'Input',
    },
    multipleOf: {
      name: 'multipleOf',
      title: '整除匹配',
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

#### 纯 JSX 案例

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
      title="必填"
      required
      component={[Input]}
      decorator={[FormItem]}
    />
    <Field
      name="required_2"
      title="必填"
      validator={{ required: true }}
      component={[Input]}
      decorator={[FormItem]}
    />
    <Field
      name="required_3"
      title="必填"
      validator={[{ required: true }]}
      component={[Input]}
      decorator={[FormItem]}
    />
    <Field
      name="max_1"
      title="最大值(>5报错)"
      validator={{ maximum: 5 }}
      component={[NumberPicker]}
      decorator={[FormItem]}
    />
    <Field
      name="max_2"
      title="最大值(>5报错)"
      validator={[{ maximum: 5 }]}
      component={[NumberPicker]}
      decorator={[FormItem]}
    />
    <Field
      name="max_3"
      title="最大值(>=5报错)"
      validator={{ exclusiveMaximum: 5 }}
      component={[NumberPicker]}
      decorator={[FormItem]}
    />
    <Field
      name="max_4"
      title="最大值(>=5报错)"
      validator={[{ exclusiveMaximum: 5 }]}
      component={[NumberPicker]}
      decorator={[FormItem]}
    />
    <Field
      name="min_1"
      title="最小值(<5报错)"
      validator={{ minimum: 5 }}
      component={[NumberPicker]}
      decorator={[FormItem]}
    />
    <Field
      name="min_2"
      title="最小值(<5报错)"
      validator={[{ minimum: 5 }]}
      component={[NumberPicker]}
      decorator={[FormItem]}
    />
    <Field
      name="min_3"
      title="最小值(<=5报错)"
      validator={{ exclusiveMinimum: 5 }}
      component={[NumberPicker]}
      decorator={[FormItem]}
    />
    <Field
      name="min_4"
      title="最小值(<=5报错)"
      validator={[{ exclusiveMinimum: 5 }]}
      component={[NumberPicker]}
      decorator={[FormItem]}
    />

    <Field
      name="length_1"
      title="长度为5"
      validator={{ len: 5 }}
      component={[Input]}
      decorator={[FormItem]}
    />
    <Field
      name="length_2"
      title="长度为5"
      validator={[{ len: 5 }]}
      component={[Input]}
      decorator={[FormItem]}
    />
    <Field
      name="maxlength_1"
      title="最大长度为5"
      validator={{ max: 5 }}
      component={[Input]}
      decorator={[FormItem]}
    />
    <Field
      name="maxlength_2"
      title="最大长度为5"
      validator={[{ max: 5 }]}
      component={[Input]}
      decorator={[FormItem]}
    />
    <Field
      name="minlength_1"
      title="最小长度为5"
      validator={{ min: 5 }}
      component={[Input]}
      decorator={[FormItem]}
    />
    <Field
      name="minlength_2"
      title="最小长度为5"
      validator={[{ min: 5 }]}
      component={[Input]}
      decorator={[FormItem]}
    />

    <Field
      name="whitespace"
      title="排除纯空白字符"
      validator={[{ whitespace: true }]}
      component={[Input]}
      decorator={[FormItem]}
    />
  </Form>
)
```

## 内置格式校验

#### Markup Schema 案例

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
        title={`${format}格式`}
        format={format}
        required
        x-component="Input"
        x-decorator="FormItem"
      />
      <SchemaField.String
        name={`${format}_2`}
        title={`${format}格式`}
        required
        x-validator={format}
        x-component="Input"
        x-decorator="FormItem"
      />
      <SchemaField.String
        name={`${format}_3`}
        title={`${format}格式`}
        required
        x-validator={{ format }}
        x-component="Input"
        x-decorator="FormItem"
      />
      <SchemaField.String
        name={`${format}_4`}
        title={`${format}格式`}
        required
        x-validator={[format]}
        x-component="Input"
        x-decorator="FormItem"
      />
      <SchemaField.String
        name={`${format}_5`}
        title={`${format}格式`}
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

#### JSON Schema 案例

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
      title: `${key}格式`,
      type: 'string',
      required: true,
      format: key,
      'x-decorator': 'FormItem',
      'x-component': 'Input',
    },
    [`${key}_2`]: {
      title: `${key}格式`,
      type: 'string',
      required: true,
      'x-validator': key,
      'x-decorator': 'FormItem',
      'x-component': 'Input',
    },
    [`${key}_3`]: {
      title: `${key}格式`,
      type: 'string',
      required: true,
      'x-validator': {
        format: key,
      },
      'x-decorator': 'FormItem',
      'x-component': 'Input',
    },
    [`${key}_4`]: {
      title: `${key}格式`,
      type: 'string',
      required: true,
      'x-validator': [key],
      'x-decorator': 'FormItem',
      'x-component': 'Input',
    },

    [`${key}_5`]: {
      title: `${key}格式`,
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

#### 纯 JSX 案例

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
        title={`${format}格式`}
        required
        validator={format}
        component={[Input]}
        decorator={[FormItem]}
      />
      <Field
        name={`${format}_2`}
        title={`${format}格式`}
        required
        validator={{ format }}
        component={[Input]}
        decorator={[FormItem]}
      />
      <Field
        name={`${format}_3`}
        title={`${format}格式`}
        required
        validator={[format]}
        component={[Input]}
        decorator={[FormItem]}
      />
      <Field
        name={`${format}_4`}
        title={`${format}格式`}
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

## 自定义规则校验

#### Markup Schema 案例

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
    return value !== '123' ? '错误了❎' : ''
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
        message: '数值不能小于10',
      }
    } else if (value < 100) {
      return {
        type: 'warning',
        message: '数值在100以内',
      }
    } else if (value < 1000) {
      return {
        type: 'success',
        message: '数值大于100小于1000',
      }
    }
  },
})

export default () => (
  <Form form={form} labelCol={6} wrapperCol={10}>
    <SchemaField>
      <SchemaField.String
        name="global_style_1"
        title="全局注册风格"
        required
        x-validator={{
          global_1: true,
        }}
        x-component="Input"
        x-decorator="FormItem"
      />
      <SchemaField.String
        name="global_style_2"
        title="全局注册风格"
        required
        x-validator={{
          global_2: true,
          message: '错误了❎',
        }}
        x-component="Input"
        x-decorator="FormItem"
      />
      <SchemaField.String
        name="global_style_3"
        title="全局注册风格"
        required
        x-validator={{
          global_3: true,
          message: '错误了❎',
        }}
        x-component="Input"
        x-decorator="FormItem"
      />
      <SchemaField.Number
        name="global_style_4"
        title="全局注册风格"
        required
        x-validator={{
          global_4: true,
        }}
        x-component="NumberPicker"
        x-decorator="FormItem"
      />

      <SchemaField.String
        name="validator_style_1"
        title="局部定义风格"
        required
        x-validator={(value) => {
          if (!value) return ''
          return value !== '123' ? '错误了❎' : ''
        }}
        x-component="Input"
        x-decorator="FormItem"
      />
      <SchemaField.String
        name="validator_style_2"
        title="局部定义风格"
        required
        x-validator={{
          validator(value, rule) {
            if (!value) return ''
            return value !== '123' ? rule.message : ''
          },
          message: '错误了❎',
        }}
        x-component="Input"
        x-decorator="FormItem"
      />
      <SchemaField.String
        name="validator_style_3"
        title="局部定义风格"
        required
        x-validator={{
          validator(value) {
            if (!value) return ''
            return value === '123'
          },
          message: '错误了❎',
        }}
        x-component="Input"
        x-decorator="FormItem"
      />
      <SchemaField.Number
        name="validator_style_4"
        title="局部定义风格"
        required
        x-validator={(value) => {
          if (!value) return ''
          if (value < 10) {
            return {
              type: 'error',
              message: '数值不能小于10',
            }
          } else if (value < 100) {
            return {
              type: 'warning',
              message: '数值在100以内',
            }
          } else if (value < 1000) {
            return {
              type: 'success',
              message: '数值大于100小于1000',
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

#### JSON Schema 案例

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
    return value !== '123' ? '错误了❎' : ''
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
        message: '数值不能小于10',
      }
    } else if (value < 100) {
      return {
        type: 'warning',
        message: '数值在100以内',
      }
    } else if (value < 1000) {
      return {
        type: 'success',
        message: '数值大于100小于1000',
      }
    }
  },
})

const schema = {
  type: 'object',
  properties: {
    global_style_1: {
      title: '全局注册风格',
      required: true,
      'x-validator': {
        global_1: true,
      },
      'x-component': 'Input',
      'x-decorator': 'FormItem',
    },
    global_style_2: {
      title: '全局注册风格',
      required: true,
      'x-validator': {
        global_2: true,
        message: '错误了❎',
      },
      'x-component': 'Input',
      'x-decorator': 'FormItem',
    },
    global_style_3: {
      title: '全局注册风格',
      required: true,
      'x-validator': {
        global_3: true,
        message: '错误了❎',
      },
      'x-component': 'Input',
      'x-decorator': 'FormItem',
    },
    global_style_4: {
      title: '全局注册风格',
      required: true,
      'x-validator': {
        global_4: true,
      },
      'x-component': 'Input',
      'x-decorator': 'FormItem',
    },

    validator_style_1: {
      title: '局部定义风格',
      required: true,
      'x-validator': `{{(value)=> {
            if (!value) return ''
            return value !== '123' ? '错误了❎' : ''
          }}}`,
      'x-component': 'Input',
      'x-decorator': 'FormItem',
    },
    validator_style_2: {
      title: '局部定义风格',
      required: true,
      'x-validator': {
        validator: `{{(value, rule)=> {
            if (!value) return ''
            return value !== '123' ? rule.message : ''
          }}}`,
        message: '错误了❎',
      },
      'x-component': 'Input',
      'x-decorator': 'FormItem',
    },
    validator_style_3: {
      title: '局部定义风格',
      required: true,
      'x-validator': {
        validator: `{{(value, rule)=> {
          if (!value) return ''
          return value === '123'
        }}}`,
        message: '错误了❎',
      },
      'x-component': 'Input',
      'x-decorator': 'FormItem',
    },
    validator_style_4: {
      title: '局部定义风格',
      required: true,
      'x-validator': `{{(value, rule)=> {
          if (!value) return ''
          if (value < 10) {
            return {
              type: 'error',
              message: '数值不能小于10',
            }
          } else if (value < 100) {
            return {
              type: 'warning',
              message: '数值在100以内',
            }
          } else if (value < 1000) {
            return {
              type: 'success',
              message: '数值大于100小于1000',
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

#### 纯 JSX 案例

```tsx
import React from 'react'
import { createForm, registerValidateRules } from '@formily/core'
import { Field } from '@formily/react'
import { Form, FormItem, Input, NumberPicker } from '@formily/antd'

const form = createForm()

registerValidateRules({
  global_1(value) {
    if (!value) return ''
    return value !== '123' ? '错误了❎' : ''
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
        message: '数值不能小于10',
      }
    } else if (value < 100) {
      return {
        type: 'warning',
        message: '数值在100以内',
      }
    } else if (value < 1000) {
      return {
        type: 'success',
        message: '数值大于100小于1000',
      }
    }
  },
})

export default () => (
  <Form form={form} labelCol={6} wrapperCol={10}>
    <Field
      name="global_style_1"
      title="全局注册风格"
      required
      validator={{
        global_1: true,
      }}
      component={[Input]}
      decorator={[FormItem]}
    />
    <Field
      name="global_style_2"
      title="全局注册风格"
      required
      validator={{
        global_2: true,
        message: '错误了❎',
      }}
      component={[Input]}
      decorator={[FormItem]}
    />
    <Field
      name="global_style_3"
      title="全局注册风格"
      required
      validator={{
        global_3: true,
        message: '错误了❎',
      }}
      component={[Input]}
      decorator={[FormItem]}
    />
    <Field
      name="global_style_4"
      title="全局注册风格"
      required
      validator={{
        global_4: true,
      }}
      component={[NumberPicker]}
      decorator={[FormItem]}
    />

    <Field
      name="validator_style_1"
      title="局部定义风格"
      required
      validator={(value) => {
        if (!value) return ''
        return value !== '123' ? '错误了❎' : ''
      }}
      component={[Input]}
      decorator={[FormItem]}
    />
    <Field
      name="validator_style_2"
      title="局部定义风格"
      required
      validator={{
        validator(value, rule) {
          if (!value) return ''
          return value !== '123' ? rule.message : ''
        },
        message: '错误了❎',
      }}
      component={[Input]}
      decorator={[FormItem]}
    />
    <Field
      name="validator_style_3"
      title="局部定义风格"
      required
      validator={{
        validator(value) {
          if (!value) return ''
          return value === '123'
        },
        message: '错误了❎',
      }}
      component={[Input]}
      decorator={[FormItem]}
    />
    <Field
      name="validator_style_4"
      title="局部定义风格"
      required
      validator={(value) => {
        if (!value) return ''
        if (value < 10) {
          return {
            type: 'error',
            message: '数值不能小于10',
          }
        } else if (value < 100) {
          return {
            type: 'warning',
            message: '数值在100以内',
          }
        } else if (value < 1000) {
          return {
            type: 'success',
            message: '数值大于100小于1000',
          }
        }
      }}
      component={[NumberPicker]}
      decorator={[FormItem]}
    />
  </Form>
)
```

## 自定义格式校验

#### Markup Schema 案例

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
        title="全局注册风格"
        required
        x-validator={{
          format: 'custom_format',
          message: '错误❎',
        }}
        x-component="Input"
        x-decorator="FormItem"
      />
      <SchemaField.String
        name="global_style_2"
        title="全局注册风格"
        required
        x-validator={'custom_format'}
        x-component="Input"
        x-decorator="FormItem"
      />
      <SchemaField.String
        name="global_style_3"
        title="全局注册风格"
        required
        x-validator={['custom_format']}
        x-component="Input"
        x-decorator="FormItem"
      />
      <SchemaField.Number
        name="global_style_4"
        title="全局注册风格"
        required
        x-validator={{
          format: 'custom_format',
          message: '错误❎',
        }}
        x-component="Input"
        x-decorator="FormItem"
      />

      <SchemaField.String
        name="validator_style_1"
        title="局部定义风格"
        required
        pattern={/123/}
        x-component="Input"
        x-decorator="FormItem"
      />
      <SchemaField.String
        name="validator_style_2"
        title="局部定义风格"
        required
        pattern="123"
        x-component="Input"
        x-decorator="FormItem"
      />
      <SchemaField.String
        name="validator_style_3"
        title="局部定义风格"
        required
        x-validator={{
          pattern: /123/,
          message: '错误了❎',
        }}
        x-component="Input"
        x-decorator="FormItem"
      />
      <SchemaField.String
        name="validator_style_4"
        title="局部定义风格"
        required
        x-validator={{
          pattern: '123',
          message: '错误了❎',
        }}
        x-component="Input"
        x-decorator="FormItem"
      />
    </SchemaField>
  </Form>
)
```

#### JSON Schema 案例

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
      title: '全局注册风格',
      required: true,
      'x-validator': {
        format: 'custom_format',
        message: '错误❎',
      },
      'x-component': 'Input',
      'x-decorator': 'FormItem',
    },
    global_style_2: {
      title: '全局注册风格',
      required: true,
      'x-validator': 'custom_format',
      'x-component': 'Input',
      'x-decorator': 'FormItem',
    },
    global_style_3: {
      title: '全局注册风格',
      required: true,
      'x-validator': ['custom_format'],
      'x-component': 'Input',
      'x-decorator': 'FormItem',
    },
    global_style_4: {
      title: '全局注册风格',
      required: true,
      'x-validator': {
        format: 'custom_format',
        message: '错误❎',
      },
      'x-component': 'Input',
      'x-decorator': 'FormItem',
    },
    validator_style_1: {
      title: '局部定义风格',
      required: true,
      pattern: /123/,
      'x-component': 'Input',
      'x-decorator': 'FormItem',
    },
    validator_style_2: {
      title: '局部定义风格',
      required: true,
      pattern: '123',
      'x-component': 'Input',
      'x-decorator': 'FormItem',
    },
    validator_style_3: {
      title: '局部定义风格',
      required: true,
      'x-validator': {
        pattern: /123/,
        message: '错误了❎',
      },
      'x-component': 'Input',
      'x-decorator': 'FormItem',
    },
    validator_style_4: {
      title: '局部定义风格',
      required: true,
      'x-validator': {
        pattern: '123',
        message: '错误了❎',
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

#### 纯 JSX 案例

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
      title="全局注册风格"
      required
      validator={{
        format: 'custom_format',
        message: '错误❎',
      }}
      component={[Input]}
      decorator={[FormItem]}
    />
    <Field
      name="global_style_2"
      title="全局注册风格"
      required
      validator={'custom_format'}
      component={[Input]}
      decorator={[FormItem]}
    />
    <Field
      name="global_style_3"
      title="全局注册风格"
      required
      validator={['custom_format']}
      component={[Input]}
      decorator={[FormItem]}
    />
    <Field
      name="global_style_4"
      title="全局注册风格"
      required
      validator={{
        format: 'custom_format',
        message: '错误❎',
      }}
      component={[Input]}
      decorator={[FormItem]}
    />
    <Field
      name="validator_style_1"
      title="局部定义风格"
      required
      validator={{
        pattern: /123/,
        message: '错误了❎',
      }}
      component={[Input]}
      decorator={[FormItem]}
    />
    <Field
      name="validator_style_2"
      title="局部定义风格"
      required
      validator={{
        pattern: '123',
        message: '错误了❎',
      }}
      component={[Input]}
      decorator={[FormItem]}
    />
  </Form>
)
```

## 异步校验

#### Markup Schema 案例

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
        title="异步校验"
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
                resolve('错误❎')
              }
            }, 1000)
          })
        }}
        x-component="Input"
        x-decorator="FormItem"
      />
      <SchemaField.String
        name="async_validate_2"
        title="异步校验(onBlur触发)"
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
                  resolve('错误❎')
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

#### JSON Schema 案例

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
      title: '异步校验',
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
              resolve('错误❎')
            }
          }, 1000)
        })
      }}}`,
      'x-component': 'Input',
      'x-decorator': 'FormItem',
    },
    async_validate_2: {
      title: '异步校验(onBlur触发)',
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

#### 纯 JSX 案例

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
      title="异步校验"
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
              resolve('错误❎')
            }
          }, 1000)
        })
      }}
      component={[Input]}
      decorator={[FormItem]}
    />
    <Field
      name="async_validate_2"
      title="异步校验(onBlur触发)"
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
                resolve('错误❎')
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

## 联动校验

#### Markup Schema 案例

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
            field.query('bb').value() >= field.value ? 'AA必须大于BB' : ''
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
            field.query('aa').value() <= field.value ? 'AA必须大于BB' : ''
        }}
        x-component="NumberPicker"
        x-decorator="FormItem"
      />
    </SchemaField>
  </Form>
)
```

#### JSON Schema 案例

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
            field.query('bb').value() >= field.value ? 'AA必须大于BB' : ''
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
            selfErrors: "{{$deps[0] <= $self.value ? 'AA必须大于BB' : ''}}",
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

#### 纯 JSX 案例

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
          field.query('bb').value() >= field.value ? 'AA必须大于BB' : ''
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
          field.query('aa').value() <= field.value ? 'AA必须大于BB' : ''
      }}
      component={[NumberPicker]}
      decorator={[FormItem]}
    />
  </Form>
)
```

## 定制校验文案

主要通过[registerValidateLocale](https://core.formilyjs.org/zh-CN/api/entry/form-validator-registry#registervalidatelocale)来定制内置校验文案

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

setValidateLanguage('zh-CN')

registerValidateLocale({
  'zh-CN': {
    required: '定制的必填校验文案',
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
