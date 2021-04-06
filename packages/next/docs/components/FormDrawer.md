# FormDrawer

> 抽屉表单，主要用在简单的事件打开表单场景

## Markup Schema 案例

```tsx
import React from 'react'
import {
  FormDrawer,
  FormItem,
  Input,
  Submit,
  Reset,
  FormButtonGroup,
} from '@formily/next'
import { createSchemaField } from '@formily/react'
import { Button, Form } from '@alifd/next'

const SchemaField = createSchemaField({
  components: {
    FormItem,
    Input,
  },
})

export default () => {
  return (
    <Button
      onClick={() => {
        FormDrawer('抽屉表单', (resolve) => {
          return (
            <Form labelCol={{ span: 6 }} wrapperCol={{ span: 14 }}>
              <SchemaField>
                <SchemaField.String
                  name="aaa"
                  required
                  title="输入框1"
                  x-decorator="FormItem"
                  x-component="Input"
                />
                <SchemaField.String
                  name="bbb"
                  required
                  title="输入框2"
                  x-decorator="FormItem"
                  x-component="Input"
                />
                <SchemaField.String
                  name="ccc"
                  required
                  title="输入框3"
                  x-decorator="FormItem"
                  x-component="Input"
                />
                <SchemaField.String
                  name="ddd"
                  required
                  title="输入框4"
                  x-decorator="FormItem"
                  x-component="Input"
                />
              </SchemaField>
              <FormDrawer.Footer>
                <FormButtonGroup align="right">
                  <Submit onClick={resolve}>提交</Submit>
                  <Reset>重置</Reset>
                </FormButtonGroup>
              </FormDrawer.Footer>
            </Form>
          )
        })
          .open({
            initialValues: {
              aaa: '123',
            },
          })
          .then(console.log)
      }}
    >
      点我打开表单
    </Button>
  )
}
```

## JSON Schema 案例

```tsx
import React from 'react'
import {
  FormDrawer,
  FormItem,
  Input,
  Submit,
  Reset,
  FormButtonGroup,
} from '@formily/next'
import { createSchemaField } from '@formily/react'
import { Button, Form } from '@alifd/next'

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
    bbb: {
      type: 'string',
      title: '输入框2',
      required: true,
      'x-decorator': 'FormItem',
      'x-component': 'Input',
    },
    ccc: {
      type: 'string',
      title: '输入框3',
      required: true,
      'x-decorator': 'FormItem',
      'x-component': 'Input',
    },
    ddd: {
      type: 'string',
      title: '输入框4',
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
        FormDrawer('弹窗表单', (resolve) => {
          return (
            <Form labelCol={{ span: 6 }} wrapperCol={{ span: 14 }}>
              <SchemaField schema={schema} />
              <FormDrawer.Footer>
                <FormButtonGroup align="right">
                  <Submit onClick={resolve}>提交</Submit>
                  <Reset>重置</Reset>
                </FormButtonGroup>
              </FormDrawer.Footer>
            </Form>
          )
        })
          .open({
            initialValues: {
              aaa: '123',
            },
          })
          .then(console.log)
      }}
    >
      点我打开表单
    </Button>
  )
}
```

## 纯 JSX 案例

```tsx
import React from 'react'
import {
  FormDrawer,
  FormItem,
  Input,
  Submit,
  Reset,
  FormButtonGroup,
} from '@formily/next'
import { Field } from '@formily/react'
import { Button, Form } from '@alifd/next'

export default () => {
  return (
    <Button
      onClick={() => {
        FormDrawer('弹窗表单', (resolve) => {
          return (
            <Form labelCol={{ span: 6 }} wrapperCol={{ span: 14 }}>
              <Field
                name="aaa"
                required
                title="输入框1"
                decorator={[FormItem]}
                component={[Input]}
              />
              <Field
                name="bbb"
                required
                title="输入框2"
                decorator={[FormItem]}
                component={[Input]}
              />
              <Field
                name="ccc"
                required
                title="输入框3"
                decorator={[FormItem]}
                component={[Input]}
              />
              <Field
                name="ddd"
                required
                title="输入框4"
                decorator={[FormItem]}
                component={[Input]}
              />
              <FormDrawer.Footer>
                <FormButtonGroup align="right">
                  <Submit onClick={resolve}>提交</Submit>
                  <Reset>重置</Reset>
                </FormButtonGroup>
              </FormDrawer.Footer>
            </Form>
          )
        })
          .open({
            initialValues: {
              aaa: '123',
            },
          })
          .then(console.log)
      }}
    >
      点我打开表单
    </Button>
  )
}
```

## API

### FormDrawer

```ts pure
type FormDrawerHandler = {
  //打开弹窗，接收表单属性，可以传入initialValues/values/effects etc.
  open(props: Formily.Core.Types.IFormProps): Promise<any> //返回表单数据
  //关闭弹窗
  close(): void
}

interface IFormDrawer {
  (
    title: React.ReactNode, //如果是ReactNode，则作为弹窗title传入
    renderer: (resolve: () => void, reject: () => void) => React.ReactElement
  ): FormDrawerHandler
  (
    title: ModalProps, //如果是对象，则作为DrawerProps传入
    renderer: (resolve: () => void, reject: () => void) => React.ReactElement
  ): FormDrawerHandler
}
```

### FormDrawer.Footer

无属性，只接收子节点
