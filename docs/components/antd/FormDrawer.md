```tsx
import React from 'react'
import { FormDrawer, FormItem, Input, DrawerFooter } from '@formily/antd'
import { Field, useForm } from '@formily/react'
import { Button } from 'antd'
import 'antd/dist/antd.css'

export default () => {
  return (
    <Button
      onClick={() => {
        FormDrawer('抽屉表单', (resolve, reject) => {
          return (
            <>
              <Field
                name="xxx"
                required
                decorator={[FormItem]}
                component={[Input]}
              />
              <DrawerFooter>
                <Button
                  onClick={() => {
                    resolve()
                  }}
                >
                  提交
                </Button>
              </DrawerFooter>
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
