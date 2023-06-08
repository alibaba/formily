# Popup

> The pop-up window series is to solve the problem of editing the sub-form template code of the common Popover/Popconfirm/Modal/Drawer pop-up window, which is more commonly used for row operations with tables.
>
> Note: This component is only applicable to Schema scenarios

## Why not [FormModal](https://antd.formilyjs.org/zh-CN/components/form-modal#formmodal-1)/[FormDrawer](https://antd.formilyjs.org/zh-CN/components/form-drawer#formdrawer-1)?

- Both are method calls and cannot be described with json so FormModal/FormDrawer is suitable for more flexible scenarios;
- In addition, 'FormModal/FormDrawer' internally uses [document.body.appendChild](https://github.com/alibaba/formily/blob/formily_next/packages/antd/src/form-drawer/index.tsx#L122) to create a new dom node out of thin air to host the form, which is separated from the root node, so it needs to be patched with [Portals](https://zh-hans.reactjs.org/docs/portals.html), may encounter some strange problems
- The purpose is to reduce the processing of template code, which does not need to be as flexible as programming, and live to say that flexibility is converted to processing in'actions';

So for common pop-up form processing logic, try to summarize it into three fixed actions

```
- open    // preload? -> open
- cancel  // cancel -> close
- confirm // yes -> close
```

> In the specific implementation, the void node where Popup is located creates a new **subform**, and handles the verification logic in the pop-up window through the'reset/submit 'of the subform
>
> Why might'load 'return a new value? Simple example: query details based on list item id

All terms converted to form domain, wrapped with `Promise`, can be represented like this

```ts | pure
export interface IPopupActions<Record = any, Data = any> {
  load?: (
    record: Record,
    field: GeneralField,
    rootForm: Form,
    popForm: Form
  ) => Promise<Data>
  cancel?: (
    record: Record,
    field: GeneralField,
    rootFform: Form,
    popForm: Form
  ) => Promise<any>
  submit?: (
    data: Data,
    field: GeneralField,
    rootForm: Form,
    popForm: Form
  ) => Promise<any>
}
```

## Markup Schema case

```tsx
import React from 'react'
import { Popup, FormItem, Input } from '@formily/antd'
import { createForm } from '@formily/core'
import { createSchemaField, FormProvider, IPopupActions } from '@formily/react'

const actions: IPopupActions = {
  load(record, field, form, popupForm) {
    console.log('load', { record, field, form, popupForm })
    return Promise.resolve({ ...record })
  },
  cancel(record, field, form, popupForm) {
    console.log('cancel', { record, field, form, popupForm })
    return Promise.resolve()
  },
  submit(data, field, form, popupForm) {
    console.log('submit', { data, field, form, popupForm })
    return Promise.resolve()
  },
}

const form = createForm()

const SchemaField = createSchemaField({
  components: {
    FormItem,
    Input,
    Popup,
  },
  scope: {
    actions,
  },
})

export default () => {
  return (
    <FormProvider form={form}>
      <SchemaField>
        <SchemaField.String
          name="aaa"
          title="input box 1"
          x-decorator="FormItem"
          x-component="Input"
          required
        />
        <SchemaField.String
          name="bbb"
          title="input box 2"
          x-decorator="FormItem"
          x-component="Input"
          required
        />
        <SchemaField.Void
          name="popupmodal"
          title="Popup Modal"
          x-component="Popup.Modal"
          x-component-props={{
            actions: '{{actions}}',
            openButton: {
              type: 'primary',
            },
          }}
        >
          <SchemaField.String
            name="aaa"
            title="input box 1"
            x-decorator="FormItem"
            x-component="Input"
            required
          />
          <SchemaField.String
            name="bbb"
            title="input box 2"
            x-decorator="FormItem"
            x-component="Input"
            required
          />
        </SchemaField.Void>
      </SchemaField>
    </FormProvider>
  )
}
```

## JSON Schema case

```tsx
import React from 'react'
import { Popup, FormItem, Input } from '@formily/antd'
import { createForm } from '@formily/core'
import { createSchemaField, FormProvider, IPopupActions } from '@formily/react'

const actions: IPopupActions = {
  load(record, field, form, popupForm) {
    console.log('load', { record, field, form, popupForm })
    return Promise.resolve({ ...record })
  },
  cancel(record, field, form, popupForm) {
    console.log('cancel', { record, field, form, popupForm })
    return Promise.resolve()
  },
  submit(data, field, form, popupForm) {
    console.log('submit', { data, field, form, popupForm })
    return Promise.resolve()
  },
}

const form = createForm()

const SchemaField = createSchemaField({
  components: {
    FormItem,
    Input,
    Popup,
  },
  scope: {
    actions,
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
    popupmodal: {
      type: 'void',
      title: 'Popup Modal',
      'x-component': 'Popup.Modal',
      'x-component-props': {
        actions: '{{actions}}',
        openButton: {
          type: 'primary',
        },
      },
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
      },
    },
  },
}

export default () => {
  return (
    <FormProvider form={form}>
      <SchemaField schema={schema} />
    </FormProvider>
  )
}
```

## Work With ArrayTable Markup Schema example

```tsx
import React from 'react'
import {
  FormItem,
  Input,
  ArrayTable,
  FormButtonGroup,
  Submit,
  Popup,
  IPopupActions,
} from '@formily/antd'
import { createForm } from '@formily/core'
import { FormProvider, createSchemaField } from '@formily/react'

const actions: {
  modal: IPopupActions
  popconfirm: IPopupActions
} = {
  modal: {
    load(record, field, form, popupForm) {
      console.log('modal load', { record, field, form, popupForm })
      return Promise.resolve({ ...record })
    },
    cancel(record, field, form, popupForm) {
      console.log('modal cancel', { record, field, form, popupForm })
      return Promise.resolve()
    },
    submit(data, field, form, popupForm) {
      console.log('modal submit', { data, field, form, popupForm })
      return Promise.resolve()
    },
  },
  popconfirm: {
    load(record, field, form, popupForm) {
      console.log('popconfirm load', { record, field, form, popupForm })
      return Promise.resolve({ ...record })
    },
    cancel(record, field, form, popupForm) {
      console.log('popconfirm cancel', { record, field, form, popupForm })
      return Promise.resolve()
    },
    submit(data, field, form, popupForm) {
      console.log('popconfirm submit', { data, field, form, popupForm })
      return Promise.resolve()
    },
  },
}

const SchemaField = createSchemaField({
  components: {
    FormItem,
    Input,
    ArrayTable,
    Popup,
  },
  scope: {
    actions,
  },
})
const form = createForm({
  initialValues: {
    array: [{ a1: 'try right' }],
  },
})

export default () => {
  return (
    <FormProvider form={form}>
      <SchemaField>
        <SchemaField.Array
          name="array"
          x-decorator="FormItem"
          x-component="ArrayTable"
          x-component-props={{
            pagination: { pageSize: 10 },
            scroll: { x: '100%' },
          }}
        >
          <SchemaField.Object>
            <SchemaField.Void
              x-component="ArrayTable.Column"
              x-component-props={{ width: 80, title: 'Index', align: 'center' }}
            >
              <SchemaField.Void
                x-decorator="FormItem"
                required
                x-component="ArrayTable.Index"
              />
            </SchemaField.Void>
            <SchemaField.Void
              x-component="ArrayTable.Column"
              x-component-props={{ title: 'A1', dataIndex: 'a1', width: 200 }}
            >
              <SchemaField.String
                name="a1"
                x-decorator="FormItem"
                required
                x-component="Input"
              />
            </SchemaField.Void>
            <SchemaField.Void
              x-component="ArrayTable.Column"
              x-component-props={{
                title: 'Operations',
                dataIndex: 'operations',
                width: 200,
                fixed: 'right',
              }}
            >
              <SchemaField.Void x-component="FormItem">
                <SchemaField.Void x-component="ArrayTable.Remove" />
                <SchemaField.Void x-component="ArrayTable.MoveDown" />
                <SchemaField.Void x-component="ArrayTable.MoveUp" />
              </SchemaField.Void>
              <SchemaField.Void
                title="Popup Modal"
                x-component="Popup.Modal"
                x-component-props={{
                  actions: '{{actions.modal}}',
                  title: "I'm Popup Modal",
                  openButton: {
                    type: 'primary',
                  },
                }}
              >
                <SchemaField.String
                  name="a1"
                  x-decorator="FormItem"
                  required
                  x-component="Input"
                />
              </SchemaField.Void>
              <SchemaField.Void
                title="Popup Popconfirm"
                x-component="Popup.Popconfirm"
                x-component-props={{
                  actions: '{{actions.popconfirm}}',
                  showCancel: false,
                  title: "I'm Popup Popconfirm",
                }}
              >
                <SchemaField.String
                  name="a1"
                  x-decorator="FormItem"
                  required
                  x-component="Input"
                />
              </SchemaField.Void>
            </SchemaField.Void>
          </SchemaField.Object>
          <SchemaField.Void
            x-component="ArrayTable.Addition"
            title="Add entry"
          />
        </SchemaField.Array>
      </SchemaField>
      <FormButtonGroup>
        <Submit onSubmit={console.log}>Submit</Submit>
      </FormButtonGroup>
    </FormProvider>
  )
}
```

## Work With ArrayTable JSON Schema case

```tsx
import React from 'react'
import {
  FormItem,
  Input,
  ArrayTable,
  FormButtonGroup,
  Submit,
  Popup,
  IPopupActions,
} from '@formily/antd'
import { createForm } from '@formily/core'
import { FormProvider, createSchemaField } from '@formily/react'

const actions: {
  modal: IPopupActions
  popconfirm: IPopupActions
} = {
  modal: {
    load(record, field, form, popupForm) {
      console.log('modal2 load', { record, field, form, popupForm })
      return Promise.resolve({ ...record })
    },
    cancel(record, field, form, popupForm) {
      console.log('modal2 cancel', { record, field, form, popupForm })
      return Promise.resolve()
    },
    submit(data, field, form, popupForm) {
      console.log('modal2 submit', { data, field, form, popupForm })
      return Promise.resolve()
    },
  },
  popconfirm: {
    load(record, field, form, popupForm) {
      console.log('popconfirm2 load', { record, field, form, popupForm })
      return Promise.resolve({ ...record })
    },
    cancel(record, field, form, popupForm) {
      console.log('popconfirm2 cancel', { record, field, form, popupForm })
      return Promise.resolve()
    },
    submit(data, field, form, popupForm) {
      console.log('popconfirm2 submit', { data, field, form, popupForm })
      return Promise.resolve()
    },
  },
}

const SchemaField = createSchemaField({
  components: {
    FormItem,
    Input,
    ArrayTable,
    Popup,
  },
  scope: {
    actions,
  },
})
const form = createForm({
  initialValues: {
    array: [{ a1: 'try right' }],
  },
})
const schema = {
  type: 'object',
  properties: {
    array: {
      type: 'array',
      'x-decorator': 'FormItem',
      'x-component': 'ArrayTable',
      'x-component-props': {
        pagination: { pageSize: 10 },
        scroll: { x: '100%' },
      },
      items: {
        type: 'object',
        properties: {
          column2: {
            type: 'void',
            'x-component': 'ArrayTable.Column',
            'x-component-props': { width: 80, title: 'Index', align: 'center' },
            properties: {
              index: {
                type: 'void',
                'x-component': 'ArrayTable.Index',
              },
            },
          },
          column3: {
            type: 'void',
            'x-component': 'ArrayTable.Column',
            'x-component-props': { width: 200, title: 'A1' },
            properties: {
              a1: {
                type: 'string',
                'x-decorator': 'FormItem',
                'x-component': 'Input',
              },
            },
          },
          column6: {
            type: 'void',
            'x-component': 'ArrayTable.Column',
            'x-component-props': {
              title: 'Operations',
              dataIndex: 'operations',
              width: 200,
              fixed: 'right',
            },
            properties: {
              item: {
                type: 'void',
                'x-component': 'FormItem',
                properties: {
                  remove: {
                    type: 'void',
                    'x-component': 'ArrayTable.Remove',
                  },
                  moveDown: {
                    type: 'void',
                    'x-component': 'ArrayTable.MoveDown',
                  },
                  moveUp: {
                    type: 'void',
                    'x-component': 'ArrayTable.MoveUp',
                  },
                  popupmodal: {
                    type: 'void',
                    title: 'Popup Modal',
                    'x-component': 'Popup.Modal',
                    'x-component-props': {
                      actions: '{{actions.modal}}',
                      title: "I'm Popup Popconfirm",
                      openButton: {
                        type: 'primary',
                      },
                    },
                    properties: {
                      a1: {
                        type: 'string',
                        'x-decorator': 'FormItem',
                        'x-component': 'Input',
                      },
                    },
                  },
                  popupconfirm: {
                    type: 'void',
                    title: 'Popup Popconfirm',
                    'x-component': 'Popup.Popconfirm',
                    'x-component-props': {
                      actions: '{{actions.popconfirm}}',
                      showCancel: false,
                      title: "I'm Popup Popconfirm",
                    },
                    properties: {
                      a1: {
                        type: 'string',
                        'x-decorator': 'FormItem',
                        'x-component': 'Input',
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
      properties: {
        add: {
          type: 'void',
          'x-component': 'ArrayTable.Addition',
          title: 'Add entry',
        },
      },
    },
  },
}

export default () => {
  return (
    <FormProvider form={form}>
      <SchemaField schema={schema} />
      <FormButtonGroup>
        <Submit onSubmit={console.log}>Submit</Submit>
      </FormButtonGroup>
    </FormProvider>
  )
}
```

## API

### Popup

The default is `Popup.Modal`
the title attribute is used as the button display name, and the title attribute in `x-components-props` is used as the pop-up title. If there is no such thing, the title attribute is used by default

> Pop-up subform component

Common attribute

```ts | pure
export interface IPopupActions<Record = any, Data = any> {
  load?: (
    record: Record,
    field: GeneralField,
    rootForm: Form,
    popForm: Form
  ) => Promise<Data>
  cancel?: (
    record: Record,
    field: GeneralField,
    rootFform: Form,
    popForm: Form
  ) => Promise<any>
  submit?: (
    data: Data,
    field: GeneralField,
    rootForm: Form,
    popForm: Form
  ) => Promise<any>
}
```

| Property name | Type            | Description                                   | Default value |
| ------------- | --------------- | --------------------------------------------- | ------------- |
| actions       | `IPopupActions` | form action                                   |               |
| showCancel    | `boolean`       | Whether to display the cancel button          |               |
| cancelText    | `string`        | Cancel button copywriting                     |               |
| okText        | `string`        | Confirm button copywriting                    |               |
| openButton    | `ButtonProps`   | Trigger popup button attribute                |               |
| formOptions   | `IFormProps`    | 'options' used by pop-up subform `createForm` |               |

### Popup.Modal

Reference https://4x.ant.design/components/modal/

### Popup.Drawer

Reference https://4x.ant.design/components/drawer/

### Popup.Popconfirm

Reference https://4x.ant.design/components/popconfirm/

### Popup.Popover

Reference https://4x.ant.design/components/popover/
