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
import { IFormProps } from '@formily/core'

type FormDialogHandler = {
  //Open the pop-up window and receive the form attributes, you can pass in initialValues/values/effects etc.
  open(props: IFormProps): Promise<any> //return form data
  //Close the pop-up window
  close(): void
}

interface IFormDialog {
  (
    title: React.ReactNode, //If it is ReactNode, it will be passed in as a pop-up window title
    renderer: (resolve: () => void, reject: () => void) => React.ReactElement
  ): FormDialogHandler
  (
    title: IFormModalProps, //If it is an object, it is passed in as IFormModalProps
    renderer: (resolve: () => void, reject: () => void) => React.ReactElement
  ): FormDialogHandler
}
```

### IFormModalProps

```ts pure
interface IFormModalProps extends ModalProps {
  // If the return value is true, the dialog will not be closed after clicking Cancel or OK. At this time, you need to manually call FormDialogHandler.close() to close the dialog.
  onCancel?: (e: React.MouseEvent<HTMLElement>) => boolean | void
}
```

`ModalProps` type definition reference ant design [Modal API](https://ant.design/components/modal-cn/#API)

### FormDialog.Footer

No attributes, only child nodes are received
