# FormDialog

> 弹窗表单，主要用在简单的事件打开表单场景

## Markup Schema 案例

以下例子演示了 FormDialog 的几个能力：

- 快速打开，关闭能力
- 中间件能力，自动出现加载态
- 渲染函数内可以响应式能力
- 上下文共享能力

```tsx
import React, { createContext, useContext } from 'react'
import { FormDialog, FormItem, FormLayout, Input } from '@formily/antd'
import { createSchemaField } from '@formily/react'
import { Button } from 'antd'

const SchemaField = createSchemaField({
  components: {
    FormItem,
    Input,
  },
})

const Context = createContext()

const PortalId = '可以传，也可以不传的ID，默认是form-dialog'

export default () => {
  return (
    <Context.Provider value="自定义上下文可以直接传到弹窗内部，只需要ID一致即可">
      <FormDialog.Portal id={PortalId}>
        <Button
          onClick={() => {
            FormDialog('弹窗表单', PortalId, (form) => {
              console.log(useContext(Context))
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
                  <FormDialog.Footer>
                    <span style={{ marginLeft: 4 }}>
                      扩展文案：{form.values.aaa}
                    </span>
                  </FormDialog.Footer>
                </FormLayout>
              )
            })
              .forOpen((payload, next) => {
                setTimeout(() => {
                  next({
                    initialValues: {
                      aaa: '123',
                    },
                  })
                }, 1000)
              })
              .forConfirm((payload, next) => {
                setTimeout(() => {
                  console.log(payload)
                  next(payload)
                }, 1000)
              })
              .forCancel((payload, next) => {
                setTimeout(() => {
                  console.log(payload)
                  next(payload)
                }, 1000)
              })
              .open()
              .then(console.log)
              .catch(console.error)
          }}
        >
          点我打开表单
        </Button>
      </FormDialog.Portal>
    </Context.Provider>
  )
}
```

## JSON Schema 案例

```tsx
import React from 'react'
import { FormDialog, FormItem, FormLayout, Input } from '@formily/antd'
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
    <FormDialog.Portal>
      <Button
        onClick={() => {
          FormDialog('弹窗表单', () => {
            return (
              <FormLayout labelCol={6} wrapperCol={10}>
                <SchemaField schema={schema} />
                <FormDialog.Footer>
                  <span style={{ marginLeft: 4 }}>扩展文案</span>
                </FormDialog.Footer>
              </FormLayout>
            )
          })
            .forOpen((payload, next) => {
              setTimeout(() => {
                next({
                  initialValues: {
                    aaa: '123',
                  },
                })
              }, 1000)
            })
            .forConfirm((payload, next) => {
              setTimeout(() => {
                console.log(payload)
                next(payload)
              }, 1000)
            })
            .forCancel((payload, next) => {
              setTimeout(() => {
                console.log(payload)
                next(payload)
              }, 1000)
            })
            .open()
            .then(console.log)
        }}
      >
        点我打开表单
      </Button>
    </FormDialog.Portal>
  )
}
```

## 纯 JSX 案例

```tsx
import React from 'react'
import { FormDialog, FormItem, FormLayout, Input } from '@formily/antd'
import { Field } from '@formily/react'
import { Button } from 'antd'

export default () => {
  return (
    <Button
      onClick={() => {
        FormDialog('弹窗表单', () => {
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
              <FormDialog.Footer>
                <span style={{ marginLeft: 4 }}>扩展文案</span>
              </FormDialog.Footer>
            </FormLayout>
          )
        })
          .forOpen((payload, next) => {
            setTimeout(() => {
              next({
                initialValues: {
                  aaa: '123',
                },
              })
            }, 1000)
          })
          .forConfirm((payload, next) => {
            setTimeout(() => {
              console.log(payload)
              next(payload)
            }, 1000)
          })
          .forCancel((payload, next) => {
            setTimeout(() => {
              console.log(payload)
              next(payload)
            }, 1000)
          })
          .open()
          .then(console.log)
      }}
    >
      点我打开表单
    </Button>
  )
}
```

## API

### FormDialog

```ts pure
import { IFormProps, Form } from '@formily/core'

type FormDialogRenderer =
  | React.ReactElement
  | ((form: Form) => React.ReactElement)

type ModalTitle = string | number | React.ReactElement

interface IFormDialog {
  forOpen(
    middleware: (
      props: IFormProps,
      next: (props?: IFormProps) => Promise<any>
    ) => any
  ): any //中间件拦截器，可以拦截Dialog打开
  forConfirm(
    middleware: (props: Form, next: (props?: Form) => Promise<any>) => any
  ): any //中间件拦截器，可以拦截Dialog确认
  forCancel(
    middleware: (props: Form, next: (props?: Form) => Promise<any>) => any
  ): any //中间件拦截器，可以拦截Dialog取消
  //打开弹窗，接收表单属性，可以传入initialValues/values/effects etc.
  open(props: IFormProps): Promise<any> //返回表单数据
  //关闭弹窗
  close(): void
}

interface IModalProps extends ModalProps {
  onOk?: (event: React.MouseEvent<HTMLElement>) => void | boolean // return false can prevent onOk
  onCancel?: (event: React.MouseEvent<HTMLElement>) => void | boolean // return false can prevent onCancel
  loadingText?: React.ReactNode
}

interface FormDialog {
  (title: IModalProps, id: string, renderer: FormDialogRenderer): IFormDialog
  (title: IModalProps, renderer: FormDialogRenderer): IFormDialog
  (title: ModalTitle, id: string, renderer: FormDialogRenderer): IFormDialog
  (title: ModalTitle, renderer: FormDialogRenderer): IFormDialog
}
```

`ModalProps`类型定义参考 ant design [Modal API](https://ant.design/components/modal-cn/#API)

### FormDialog.Footer

无属性，只接收子节点

### FormDialog.Portal

接收可选的 id 属性，默认值为`form-dialog`，如果一个应用存在多个 prefixCls，不同区域的弹窗内部 prefixCls 不一样，那推荐指定 id 为区域级 id
