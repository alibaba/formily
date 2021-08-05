# 更多场景

因为 Formily 在表单层面上是一个非常完备的方案，而且还很灵活，支持的场景非常多，但是场景案例，我们无法一一列举。

所以，还是希望社区能帮助 Formily 完善更多场景案例！我们会不胜感激！😀

```tsx
import React from 'react'
import { FormDialog, FormItem, FormLayout, Input, Submit } from '@formily/antd'
import { createSchemaField } from '@formily/react'
import { Button, message } from 'antd'

const SchemaField = createSchemaField({
  components: {
    FormItem,
    Input,
  },
})

const schema = {
  type: 'object',
  properties: {
    aaa: {
      type: 'string',
      title: '输入框1',
      required: true,
      'x-decorator': 'FormItem',
      'x-component': 'Input',
    },
  },
}

export default () => {
  return (
    <Button
      onClick={() => {
        FormDialog(
          {
            title: '弹窗表单',
          },
          (form) => {
            return (
              <>
                <FormLayout labelCol={6} wrapperCol={10}>
                  <SchemaField schema={schema} />
                </FormLayout>
              </>
            )
          }
        )
          .forConfirm(async (payload, next) => {
            await new Promise((resolve) => setTimeout(resolve, 1000))

            try {
              throw 'too high'
            } catch (e) {
              message.error('error')
              throw e
            }
            next(payload)

            // setTimeout(() => {
            //   throw "too high";
            //   next(payload);
            // }, 1000);
          })
          .open({
            initialValues: {
              aaa: '123',
            },
          })
      }}
    >
      点我打开表单
    </Button>
  )
}
```
