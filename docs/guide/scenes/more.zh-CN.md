# 更多场景

因为 Formily 在表单层面上是一个非常完备的方案，而且还很灵活，支持的场景非常多，但是场景案例，我们无法一一列举。

所以，还是希望社区能帮助 Formily 完善更多场景案例！我们会不胜感激！😀

```tsx
import React from 'react'
import { Input, FormItem, FormButtonGroup, Submit } from '@formily/antd'
import { createForm } from '@formily/core'
import { FormProvider, Field, VoidField, FormConsumer } from '@formily/react'
const form = createForm()

export default () => (
  <FormProvider form={form}>
    <VoidField name="aa">
      <Field
        name="bb"
        title="bb"
        decorator={[FormItem]}
        component={[
          Input,
          {
            style: {
              width: 240,
            },
          },
        ]}
      />
      <Field
        name="cc"
        title="cc"
        decorator={[FormItem]}
        component={[
          Input,
          {
            style: {
              width: 240,
            },
          },
        ]}
        reactions={(field) => {
          // const display = field.display;
          if (form.values.bb === '1') {
            field.display = 'visible'
          } else if (field.modified) {
            field.display = 'none'
          }
        }}
      />
    </VoidField>
    <button
      onClick={() => form.setFieldState('aa', (s) => (s.display = 'none'))}
    >
      hide
    </button>
    <button
      onClick={() => {
        const cc = form.query('cc')
        console.log(cc.get('display'), cc.get('value'))
      }}
    >
      get
    </button>
  </FormProvider>
)
```
