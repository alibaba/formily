# FormDialog

> Pop-up form, mainly used in simple event to open the form scene

## Markup Schema example

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

export default () => {
  return (
    <Button
      onClick={() => {
        FormDialog('Pop-up form', () => {
          return (
            <FormLayout labelCol={6} wrapperCol={10}>
              <SchemaField>
                <SchemaField.String
                  name="aaa"
                  required
                  title="input box 1"
                  x-decorator="FormItem"
                  x-component="Input"
                />
                <SchemaField.String
                  name="bbb"
                  required
                  title="input box 2"
                  x-decorator="FormItem"
                  x-component="Input"
                />
                <SchemaField.String
                  name="ccc"
                  required
                  title="input box 3"
                  x-decorator="FormItem"
                  x-component="Input"
                />
                <SchemaField.String
                  name="ddd"
                  required
                  title="input box 4"
                  x-decorator="FormItem"
                  x-component="Input"
                />
              </SchemaField>
              <FormDialog.Footer>
                <span style={{ marginLeft: 4 }}>Extended copywriting</span>
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
          .open({
            initialValues: {
              aaa: '123',
            },
          })
          .then(console.log)
      }}
    >
      Click me to open the form
    </Button>
  )
}
```

## JSON Schema case

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
      title: 'input box 1',
      required: true,
      'x-decorator': 'FormItem',
      'x-component': 'Input',
    },
    bbb: {
      type: 'string',
      title: 'input box 2',
      required: true,
      'x-decorator': 'FormItem',
      'x-component': 'Input',
    },
    ccc: {
      type: 'string',
      title: 'input box 3',
      required: true,
      'x-decorator': 'FormItem',
      'x-component': 'Input',
    },
    ddd: {
      type: 'string',
      title: 'input box 4',
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
        FormDialog('Pop-up form', () => {
          return (
            <FormLayout labelCol={6} wrapperCol={10}>
              <SchemaField schema={schema} />
              <FormDialog.Footer>
                <span style={{ marginLeft: 4 }}>Extended copywriting</span>
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
          .open({
            initialValues: {
              aaa: '123',
            },
          })
          .then(console.log)
      }}
    >
      Click me to open the form
    </Button>
  )
}
```

## Pure JSX case

```tsx
import React from 'react'
import { FormDialog, FormItem, FormLayout, Input } from '@formily/antd'
import { Field } from '@formily/react'
import { Button } from 'antd'

export default () => {
  return (
    <Button
      onClick={() => {
        FormDialog('Pop-up form', () => {
          return (
            <FormLayout labelCol={6} wrapperCol={10}>
              <Field
                name="aaa"
                required
                title="input box 1"
                decorator={[FormItem]}
                component={[Input]}
              />
              <Field
                name="bbb"
                required
                title="input box 2"
                decorator={[FormItem]}
                component={[Input]}
              />
              <Field
                name="ccc"
                required
                title="input box 3"
                decorator={[FormItem]}
                component={[Input]}
              />
              <Field
                name="ddd"
                required
                title="input box 4"
                decorator={[FormItem]}
                component={[Input]}
              />
              <FormDialog.Footer>
                <span style={{ marginLeft: 4 }}>Extended copywriting</span>
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
          .open({
            initialValues: {
              aaa: '123',
            },
          })
          .then(console.log)
      }}
    >
      Click me to open the form
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
  ): any //Middleware interceptor, can intercept Dialog to open
  forConfirm(
    middleware: (props: Form, next: (props?: Form) => Promise<any>) => any
  ): any //Middleware interceptor, which can intercept Dialog confirmation
  forCancel(
    middleware: (props: Form, next: (props?: Form) => Promise<any>) => any
  ): any //Middleware interceptor, can intercept Dialog to cancel
  //Open the pop-up window to receive form attributes, you can pass in initialValues/values/effects etc.
  open(props: IFormProps): Promise<any> //return form data
  //Close the pop-up window
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

`ModalProps` type definition reference ant design [Modal API](https://ant.design/components/modal-cn/#API)

### FormDialog.Footer

No attributes, only child nodes are received

### FormDialog.Portal

Receive the optional id attribute, the default value is `form-dialog`, if there are multiple prefixCls in an application, and the prefixCls in the pop-up window of different regions are different, then it is recommended to specify the id as the region-level id
