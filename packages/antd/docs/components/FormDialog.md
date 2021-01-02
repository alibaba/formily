```tsx
import React from 'react'
import { FormDialog, FormItem, Input, DialogFooter } from '@formily/antd'
import { Field, useForm } from '@formily/react'
import { Button } from 'antd'

export default () => {
  return (
    <Button
      onClick={() => {
        FormDialog('弹窗表单', () => {
          return (
            <>
              <Field
                name="xxx"
                required
                decorator={[FormItem]}
                component={[Input]}
              />
            </>
          )
        })
          .open()
          .then(console.log)
      }}
    >
      Click
    </Button>
  )
}
```
