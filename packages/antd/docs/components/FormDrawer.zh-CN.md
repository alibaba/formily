# FormDrawer

> 抽屉表单，主要用在简单的事件打开表单场景

## Markup Schema 案例

```tsx
import React from 'react'
import {
  FormDrawer,
  FormItem,
  FormLayout,
  Input,
  Submit,
  Reset,
  FormButtonGroup,
} from '@formily/antd'
import { createSchemaField } from '@formily/react'
import { Button } from 'antd'

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
        FormDrawer('抽屉表单', () => {
          return (
            <FormLayout labelCol={6} wrapperCol={10}>
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
                  <Submit
                    onSubmit={() => {
                      return new Promise((resolve) => {
                        setTimeout(resolve, 1000)
                      })
                    }}
                  >
                    提交
                  </Submit>
                  <Reset>重置</Reset>
                </FormButtonGroup>
              </FormDrawer.Footer>
            </FormLayout>
          )
        })
          .forOpen((props, next) => {
            setTimeout(() => {
              next()
            }, 1000)
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
  FormLayout,
  Input,
  Submit,
  Reset,
  FormButtonGroup,
} from '@formily/antd'
import { createSchemaField } from '@formily/react'
import { Button } from 'antd'

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
        FormDrawer('弹窗表单', () => {
          return (
            <FormLayout labelCol={6} wrapperCol={10}>
              <SchemaField schema={schema} />
              <FormDrawer.Footer>
                <FormButtonGroup align="right">
                  <Submit
                    onSubmit={() => {
                      return new Promise((resolve) => {
                        setTimeout(resolve, 1000)
                      })
                    }}
                  >
                    提交
                  </Submit>
                  <Reset>重置</Reset>
                </FormButtonGroup>
              </FormDrawer.Footer>
            </FormLayout>
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
  FormLayout,
  Input,
  Submit,
  Reset,
  FormButtonGroup,
} from '@formily/antd'
import { Field } from '@formily/react'
import { Button } from 'antd'

export default () => {
  return (
    <Button
      onClick={() => {
        FormDrawer('弹窗表单', () => {
          return (
            <FormLayout labelCol={6} wrapperCol={10}>
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
                  <Submit
                    onSubmit={() => {
                      return new Promise((resolve) => {
                        setTimeout(resolve, 1000)
                      })
                    }}
                  >
                    提交
                  </Submit>
                  <Reset>重置</Reset>
                </FormButtonGroup>
              </FormDrawer.Footer>
            </FormLayout>
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
import { IFormProps, Form } from '@formily/core'

type FormDrawerRenderer =
  | React.ReactElement
  | ((form: Form) => React.ReactElement)

interface IFormDrawer {
  forOpen(
    middleware: (
      props: IFormProps,
      next: (props?: IFormProps) => Promise<any>
    ) => any
  ): any //中间件拦截器，可以拦截Drawer打开
  //打开弹窗，接收表单属性，可以传入initialValues/values/effects etc.
  open(props: IFormProps): Promise<any> //返回表单数据
  //关闭弹窗
  close(): void
}

export interface IDrawerProps extends DrawerProps {
  onClose?: (e: EventType) => void | boolean // return false can prevent onClose
  loadingText?: React.ReactNode
}

interface FormDrawer {
  (title: IDrawerProps, id: string, renderer: FormDrawerRenderer): IFormDrawer
  (title: IDrawerProps, renderer: FormDrawerRenderer): IFormDrawer
  (title: ModalTitle, id: string, renderer: FormDrawerRenderer): IFormDrawer
  (title: ModalTitle, renderer: FormDrawerRenderer): IFormDrawer
}
```

`DrawerProps`类型定义参考 ant design [Drawer API](https://ant.design/components/drawer-cn/#API)

### FormDrawer.Footer

无属性，只接收子节点

### FormDrawer.Portal

接收可选的 id 属性，默认值为`form-drawer`，如果一个应用存在多个 prefixCls，不同区域的弹窗内部 prefixCls 不一样，那推荐指定 id 为区域级 id
