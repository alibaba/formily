# Reset

> 重置按钮

## 普通重置

> 有默认值的控件无法被清空

```tsx
import React from 'react'
import { Input, FormItem, FormButtonGroup, Reset } from '@formily/antd'
import { createForm } from '@formily/core'
import { FormProvider, createSchemaField } from '@formily/react'

const SchemaField = createSchemaField({
  components: {
    Input,
    FormItem,
  },
})

const form = createForm()

export default () => (
  <FormProvider form={form}>
    <SchemaField>
      <SchemaField.String
        name="input"
        title="输入框"
        required
        x-decorator="FormItem"
        x-component="Input"
      />
      <SchemaField.String
        name="input2"
        title="输入框"
        default="123"
        required
        x-decorator="FormItem"
        x-component="Input"
      />
    </SchemaField>
    <FormButtonGroup>
      <Reset>重置</Reset>
    </FormButtonGroup>
  </FormProvider>
)
```

## 强制清空重置

```tsx
import React from 'react'
import { Input, FormItem, FormButtonGroup, Reset } from '@formily/antd'
import { createForm } from '@formily/core'
import { FormProvider, createSchemaField } from '@formily/react'

const SchemaField = createSchemaField({
  components: {
    Input,
    FormItem,
  },
})

const form = createForm()

export default () => (
  <FormProvider form={form}>
    <SchemaField>
      <SchemaField.String
        name="input"
        title="输入框"
        required
        x-decorator="FormItem"
        x-component="Input"
      />
      <SchemaField.String
        name="input2"
        title="输入框"
        default="123"
        required
        x-decorator="FormItem"
        x-component="Input"
      />
    </SchemaField>
    <FormButtonGroup>
      <Reset forceClear>重置</Reset>
    </FormButtonGroup>
  </FormProvider>
)
```

## 重置并校验

```tsx
import React from 'react'
import { Input, FormItem, FormButtonGroup, Reset } from '@formily/antd'
import { createForm } from '@formily/core'
import { FormProvider, createSchemaField } from '@formily/react'

const SchemaField = createSchemaField({
  components: {
    Input,
    FormItem,
  },
})

const form = createForm()

export default () => (
  <FormProvider form={form}>
    <SchemaField>
      <SchemaField.String
        name="input"
        title="输入框"
        required
        x-decorator="FormItem"
        x-component="Input"
      />
      <SchemaField.String
        name="input2"
        title="输入框"
        default="123"
        required
        x-decorator="FormItem"
        x-component="Input"
      />
    </SchemaField>
    <FormButtonGroup>
      <Reset validate>重置</Reset>
    </FormButtonGroup>
  </FormProvider>
)
```

## 强制清空重置并校验

```tsx
import React from 'react'
import { Input, FormItem, FormButtonGroup, Reset } from '@formily/antd'
import { createForm } from '@formily/core'
import { FormProvider, createSchemaField } from '@formily/react'

const SchemaField = createSchemaField({
  components: {
    Input,
    FormItem,
  },
})

const form = createForm()

export default () => (
  <FormProvider form={form}>
    <SchemaField>
      <SchemaField.String
        name="input"
        title="输入框"
        required
        x-decorator="FormItem"
        x-component="Input"
      />
      <SchemaField.String
        name="input2"
        title="输入框"
        default="123"
        required
        x-decorator="FormItem"
        x-component="Input"
      />
    </SchemaField>
    <FormButtonGroup>
      <Reset forceClear validate>
        重置
      </Reset>
    </FormButtonGroup>
  </FormProvider>
)
```

## API

### Reset

其余 API 参考 https://ant.design/components/button-cn/
