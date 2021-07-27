# FormDrawer

> Drawer form, mainly used in simple event to open form scene

## Markup Schema example

```tsx
import React from 'react'
import {
  FormDrawer,
  FormItem,
  Input,
  Submit,
  Reset,
  FormButtonGroup,
  FormLayout,
} from '@formily/next'
import { createSchemaField } from '@formily/react'
import { Button } from '@alifd/next'

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
        FormDrawer('Drawer Form', (resolve) => {
          return (
            <FormLayout labelCol={6} wrapperCol={14}>
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
              <FormDrawer.Footer>
                <FormButtonGroup align="right">
                  <Submit onClick={resolve}>Submit</Submit>
                  <Reset>Reset</Reset>
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
      Click me to open the form
    </Button>
  )
}
```

## JSON Schema case

```tsx
import React from 'react'
import {
  FormDrawer,
  FormItem,
  Input,
  Submit,
  Reset,
  FormButtonGroup,
  FormLayout,
} from '@formily/next'
import { createSchemaField } from '@formily/react'
import { Button } from '@alifd/next'

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
        FormDrawer('Pop-up form', (resolve) => {
          return (
            <FormLayout labelCol={6} wrapperCol={14}>
              <SchemaField schema={schema} />
              <FormDrawer.Footer>
                <FormButtonGroup align="right">
                  <Submit onClick={resolve}>Submit</Submit>
                  <Reset>Reset</Reset>
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
      Click me to open the form
    </Button>
  )
}
```

## Pure JSX case

```tsx
import React from 'react'
import {
  FormDrawer,
  FormItem,
  Input,
  Submit,
  Reset,
  FormButtonGroup,
  FormLayout,
} from '@formily/next'
import { Field } from '@formily/react'
import { Button } from '@alifd/next'

export default () => {
  return (
    <Button
      onClick={() => {
        FormDrawer('Pop-up form', (resolve) => {
          return (
            <FormLayout labelCol={6} wrapperCol={14}>
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
              <FormDrawer.Footer>
                <FormButtonGroup align="right">
                  <Submit onClick={resolve}>Submit</Submit>
                  <Reset>Reset</Reset>
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
      Click me to open the form
    </Button>
  )
}
```

## Use Fusion Context

```tsx
import React from 'react'
import {
  FormDrawer,
  FormItem,
  Input,
  Submit,
  Reset,
  FormButtonGroup,
  FormLayout,
} from '@formily/next'
import { Field } from '@formily/react'
import { Button, ConfigProvider } from '@alifd/next'

export default () => {
  return (
    <ConfigProvider
      defaultPropsConfig={{
        Drawer: {},
      }}
    >
      <Button
        onClick={() => {
          FormDrawer('Pop-up form', (resolve) => {
            return (
              <FormLayout labelCol={6} wrapperCol={14}>
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
                <FormDrawer.Footer>
                  <FormButtonGroup align="right">
                    <Submit onClick={resolve}>Submit</Submit>
                    <Reset>Reset</Reset>
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
        Click me to open the form
      </Button>
    </ConfigProvider>
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
  ): any //Middleware interceptor, can intercept Drawer to open
  //Open the pop-up window to receive form attributes, you can pass in initialValues/values/effects etc.
  open(props: IFormProps): Promise<any> //return form data
  //Close the pop-up window
  close(): void
}

interface IDrawerProps extends DrawerProps {
  onClose?: (reason: string, e: React.MouseEvent) => void | boolean // return false can prevent onClose
  loadingText?: React.ReactNode
}

interface FormDrawer {
  (title: IDrawerProps, id: string, renderer: FormDrawerRenderer): IFormDrawer
  (title: IDrawerProps, renderer: FormDrawerRenderer): IFormDrawer
  (title: ModalTitle, id: string, renderer: FormDrawerRenderer): IFormDrawer
  (title: ModalTitle, renderer: FormDrawerRenderer): IFormDrawer
}
```

`DrawerProps` type definition reference ant design [Drawer API](https://fusion.design/pc/component/drawer?themeid=2#API)

### FormDrawer.Footer

No attributes, only child nodes are received

### FormDrawer.Portal

Receive an optional id attribute, the default value is `form-drawer`, if there are multiple prefixCls in an application, and the prefixCls in the pop-up window of different regions are different, then it is recommended to specify the id as the region-level id
