---
order: 1
---

# ArrayField

## 描述

作为@formily/core 的 [createArrayField](https://core.formilyjs.org/zh-CN/api/models/form#createarrayfield) React 实现，它是专门用于将 ViewModel 与输入控件做绑定的桥接组件，ArrayField 组件属性参考[IFieldFactoryProps](https://core.formilyjs.org/zh-CN/api/models/form#ifieldfactoryprops)

<Alert>
我们在使用 ArrayField 组件的时候，一定要记得传name属性。同时要使用render props形式来组织子组件
</Alert>

## 签名

```ts
type ArrayField = React.FC<React.PropsWithChildren<IFieldFactoryProps>>
```

## 自定义组件用例

```tsx
import React from 'react'
import { createForm, ArrayField as ArrayFieldType } from '@formily/core'
import {
  FormProvider,
  Field,
  ArrayField,
  useField,
  observer,
} from '@formily/react'
import { Input, Button, Space } from 'antd'

const form = createForm()

const ArrayComponent = observer(() => {
  const field = useField<ArrayFieldType>()
  return (
    <>
      <div>
        {field.value?.map((item, index) => (
          <div key={index} style={{ display: 'flex-block', marginBottom: 10 }}>
            <Space>
              <Field name={index} component={[Input]} />
              <Button
                onClick={() => {
                  field.remove(index)
                }}
              >
                Remove
              </Button>
              <Button
                onClick={() => {
                  field.moveUp(index)
                }}
              >
                Move Up
              </Button>
              <Button
                onClick={() => {
                  field.moveDown(index)
                }}
              >
                Move Down
              </Button>
            </Space>
          </div>
        ))}
      </div>
      <Button
        onClick={() => {
          field.push('')
        }}
      >
        Add
      </Button>
    </>
  )
})

export default () => (
  <FormProvider form={form}>
    <ArrayField name="array" component={[ArrayComponent]} />
  </FormProvider>
)
```

## RenderProps 用例

```tsx
import React from 'react'
import { createForm } from '@formily/core'
import { FormProvider, Field, ArrayField } from '@formily/react'
import { Input, Button, Space } from 'antd'

const form = createForm()

export default () => (
  <FormProvider form={form}>
    <ArrayField name="array">
      {(field) => {
        return (
          <>
            <div>
              {field.value?.map((item, index) => (
                <div
                  key={index}
                  style={{ display: 'flex-block', marginBottom: 10 }}
                >
                  <Space>
                    <Field name={index} component={[Input]} />
                    <Button
                      onClick={() => {
                        field.remove(index)
                      }}
                    >
                      Remove
                    </Button>
                    <Button
                      onClick={() => {
                        field.moveUp(index)
                      }}
                    >
                      Move Up
                    </Button>
                    <Button
                      onClick={() => {
                        field.moveDown(index)
                      }}
                    >
                      Move Down
                    </Button>
                  </Space>
                </div>
              ))}
            </div>
            <Button onClick={() => field.push('')}>Add</Button>
          </>
        )
      }}
    </ArrayField>
  </FormProvider>
)
```
