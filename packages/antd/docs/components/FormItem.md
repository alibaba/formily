# FormItem

> The brand-new FormItem component, compared to Antd's FormItem, it supports more functions. At the same time, it is positioned as a pure style component and does not manage the state of the form, so it will be lighter and more convenient for customization

## Markup Schema example

```tsx
import React from 'react'
import { Input, Select, FormItem, FormButtonGroup, Submit } from '@formily/antd'
import { createForm } from '@formily/core'
import { FormProvider, createSchemaField } from '@formily/react'

const SchemaField = createSchemaField({
  components: {
    Input,
    Select,
    FormItem,
  },
})

const form = createForm()

export default () => (
  <FormProvider form={form}>
    <SchemaField>
      <SchemaField.String
        name="input"
        title="input box"
        x-decorator="FormItem"
        x-component="Input"
        required
      />
    </SchemaField>
    <FormButtonGroup>
      <Submit onSubmit={console.log}>Submit</Submit>
    </FormButtonGroup>
  </FormProvider>
)
```

## JSON Schema case

```tsx
import React from 'react'
import { Input, FormItem, FormButtonGroup, Submit } from '@formily/antd'
import { createForm } from '@formily/core'
import { FormProvider, createSchemaField } from '@formily/react'

const SchemaField = createSchemaField({
  components: {
    Input,
    FormItem,
  },
})

const form = createForm()

const schema = {
  type: 'object',
  properties: {
    input: {
      type: 'string',
      title: 'input box',
      'x-decorator': 'FormItem',
      'x-component': 'Input',
      'x-component-props': {
        style: {
          width: 240,
        },
      },
    },
  },
}

export default () => (
  <FormProvider form={form}>
    <SchemaField schema={schema} />
    <FormButtonGroup>
      <Submit onSubmit={console.log}>Submit</Submit>
    </FormButtonGroup>
  </FormProvider>
)
```

## Pure JSX case

```tsx
import React from 'react'
import { Input, FormItem, FormButtonGroup, Submit } from '@formily/antd'
import { createForm } from '@formily/core'
import { FormProvider, Field } from '@formily/react'

const form = createForm()

export default () => (
  <FormProvider form={form}>
    <Field
      name="input"
      title="input box"
      required
      decorator={[FormItem]}
      component={[
        Input,
        {
          style: {
            width: 240,
          },
        },
      ]}
    />
    <FormButtonGroup>
      <Submit onSubmit={console.log}>Submit</Submit>
    </FormButtonGroup>
  </FormProvider>
)
```

## Commonly used attribute cases

```tsx
import React from 'react'
import {
  Input,
  Radio,
  TreeSelect,
  Cascader,
  Select,
  DatePicker,
  FormItem,
  NumberPicker,
  Switch,
} from '@formily/antd'
import { createForm } from '@formily/core'
import { FormProvider, createSchemaField } from '@formily/react'

const Title = (props) => <h3>{props.text}</h3>

const SchemaField = createSchemaField({
  components: {
    Input,
    Select,
    Cascader,
    TreeSelect,
    DatePicker,
    NumberPicker,
    Switch,
    Radio,
    FormItem,
    Title,
  },
})

const form = createForm()

export default () => {
  return (
    <FormProvider form={form}>
      <SchemaField>
        <SchemaField.Void
          x-component="Title"
          x-component-props={{ text: 'Display when label is empty' }}
        />
        <SchemaField.String
          x-decorator="FormItem"
          x-component="Input"
          x-decorator-props={{
            labelWidth: 300,
          }}
        />
        <SchemaField.String
          title=""
          x-decorator="FormItem"
          x-component="Input"
          x-decorator-props={{
            labelWidth: 300,
          }}
        />
        <SchemaField.Void
          x-component="Title"
          x-component-props={{ text: 'colon' }}
        />
        <SchemaField.String
          title="default"
          x-decorator="FormItem"
          x-component="Input"
        />
        <SchemaField.String
          title="no colon (colon=false)"
          x-decorator="FormItem"
          x-component="Input"
          x-decorator-props={{
            colon: false,
          }}
        />

        <SchemaField.Void
          x-component="Title"
          x-component-props={{ text: 'Fixed width settings' }}
        />
        <SchemaField.String
          title="Fixed label width (labelWidth)"
          x-decorator="FormItem"
          x-component="Input"
          x-decorator-props={{
            labelWidth: 300,
          }}
        />
        <SchemaField.String
          title="Fixed label width (labelWidth) overflow overflow overflow overflow overflow overflow overflow overflow overflow overflow overflow overflow overflow overflow overflow overflow overflow overflow overflow overflow overflow overflow overflow overflow overflow overflow overflow overflow overflow overflow overflow overflow overflow overflow overflow overflow overflow overflow overflow overflow overflow overflow overflow overflow overflow overflow overflow overflow overflow overflow overflow overflow overflow overflow overflow overflow overflow overflow overflow overflow overflow overflow overflow overflow overflow overflow overflow overflow overflow overflow overflow overflow overflow overflow overflow overflow overflow overflow overflow overflow overflow overflow overflow overflow overflow overflow overflow overflow overflow overflow overflow overflow overflow overflow overflow overflow overflow overflow overflow overflow overflow overflow overflow overflow overflow overflow overflow overflow overflow overflow overflow overflow overflow overflow overflow overflow overflow overflow overflow overflow overflow overflow overflow overflow overflow overflow overflow overflow overflow overflow overflow overflow overflow overflow overflow overflow overflow overflow overflow overflow overflow overflow overflow overflow overflow overflow overflow overflow overflow overflow overflow overflow overflow overflow overflow overflow overflow overflow overflow overflow overflow overflow overflow overflow overflow overflow overflow overflow overflow overflow overflow overflow overflow overflow overflow overflow overflow overflow overflow overflow overflow overflow overflow overflow overflow overflow overflow overflow overflow overflow overflow overflow overflow overflow overflow overflow overflow overflow overflow overflow overflow overflow overflow overflow overflow overflow overflow overflow overflow overflow overflow overflow overflow overflow overflow overflow overflow overflow overflow overflow overflow overflow overflow overflow overflow overflow overflow"
          description="description description"
          x-decorator="FormItem"
          x-component="Input"
          x-decorator-props={{
            labelWidth: 300,
            tooltip: 'Prompt Tip',
            tooltipLayout: 'text',
          }}
        />
        <SchemaField.String
          title="Fixed label width (labelWidth) newline newline newline newline newline newline newline newline newline newline newline newline newline newline newline newline newline newline newline newline newline newline newline newline newline"
          description="description description"
          x-decorator="FormItem"
          x-component="Input"
          x-decorator-props={{
            labelWidth: 300,
            labelWrap: true,
            tooltip: 'Prompt Tip',
          }}
        />
        <SchemaField.String
          title="fixed content width (wrapperWidth)"
          x-decorator="FormItem"
          x-component="Input"
          x-decorator-props={{
            labelWidth: 300,
            wrapperWidth: 300,
          }}
        />

        <SchemaField.Void
          x-component="Title"
          x-component-props={{ text: 'Alignment settings' }}
        />
        <SchemaField.String
          title="labelLeft Alignment(labelAlign=left)"
          x-decorator="FormItem"
          x-component="Input"
          x-decorator-props={{
            labelWidth: 300,
            labelAlign: 'left',
          }}
        />
        <SchemaField.String
          title="label right alignment (labelAlign=right default)"
          x-decorator="FormItem"
          x-component="Input"
          x-decorator-props={{
            labelWidth: 300,
            labelAlign: 'right',
          }}
        />

        <SchemaField.String
          title="Content left aligned (wrapperAlign=left default)"
          x-decorator="FormItem"
          x-component="Input"
          x-decorator-props={{
            labelWidth: 300,
            wrapperWidth: 240,
            wrapperAlign: 'left',
          }}
        />
        <SchemaField.String
          title="Content align right (wrapperAlign=right)"
          x-decorator="FormItem"
          x-component="Input"
          x-decorator-props={{
            labelWidth: 300,
            wrapperWidth: 240,
            wrapperAlign: 'right',
          }}
        />

        <SchemaField.String
          title="tooltip"
          x-decorator="FormItem"
          x-component="Input"
          x-decorator-props={{
            tooltip: 'tooltip',
          }}
        />

        <SchemaField.Void
          x-component="Title"
          x-component-props={{ text: 'Is it full?' }}
        />

        <SchemaField.String
          title="The default is not full (fullness=false)"
          x-decorator="FormItem"
          x-component="Select"
        />
        <SchemaField.String
          title="Fullness(fullness=true)"
          x-decorator="FormItem"
          x-component="Select"
          x-decorator-props={{
            fullness: true,
          }}
        />

        <SchemaField.Void
          x-component="Title"
          x-component-props={{ text: 'auxiliary information' }}
        />

        <SchemaField.String
          title="Required asterisk"
          x-decorator="FormItem"
          x-component="Input"
          x-decorator-props={{
            asterisk: true,
            labelCol: 6,
            wrapperCol: 10,
          }}
        />

        <SchemaField.String
          title="prefix"
          x-decorator="FormItem"
          x-component="Input"
          x-decorator-props={{
            addonBefore: 'addonBefore',
            labelCol: 6,
            wrapperCol: 10,
          }}
        />
        <SchemaField.String
          title="suffix"
          x-decorator="FormItem"
          x-component="Input"
          x-decorator-props={{
            addonAfter: 'addonAfter',
            labelCol: 6,
            wrapperCol: 10,
          }}
        />

        <SchemaField.String
          title="Help information feedbackText"
          x-decorator="FormItem"
          x-component="Input"
          x-decorator-props={{
            feedbackText: 'feedbackText',
            labelCol: 6,
            wrapperCol: 10,
          }}
        />

        <SchemaField.String
          title="extra information extra"
          x-decorator="FormItem"
          x-component="Input"
          x-decorator-props={{
            feedbackText: 'feedbackText',
            extra: 'extra',
            labelCol: 6,
            wrapperCol: 10,
          }}
        />
      </SchemaField>
    </FormProvider>
  )
}
```

## Borderless case

Set to remove the component border

```tsx
import React from 'react'
import {
  Input,
  Radio,
  TreeSelect,
  Cascader,
  Select,
  DatePicker,
  FormItem,
  NumberPicker,
  Switch,
} from '@formily/antd'
import { createForm } from '@formily/core'
import { FormProvider, createSchemaField } from '@formily/react'

const Title = (props) => <h3>{props.text}</h3>

const SchemaField = createSchemaField({
  components: {
    Input,
    Select,
    Cascader,
    TreeSelect,
    DatePicker,
    NumberPicker,
    Switch,
    Radio,
    FormItem,
    Title,
  },
})

const form = createForm()

export default () => {
  return (
    <FormProvider form={form}>
      <SchemaField>
        <SchemaField.String
          name="input"
          title="Input"
          x-decorator="FormItem"
          x-component="Input"
          required
          x-decorator-props={{
            bordered: false,
          }}
        />
        <SchemaField.String
          name="Select"
          title="Select"
          x-decorator="FormItem"
          x-component="Select"
          required
          x-decorator-props={{
            bordered: false,
          }}
        />
        <SchemaField.String
          name="Select"
          title="Select"
          x-decorator="FormItem"
          x-component="Select"
          required
          x-decorator-props={{
            bordered: false,
          }}
        />
        <SchemaField.String
          name="Cascader"
          title="Cascader"
          x-decorator="FormItem"
          x-component="Cascader"
          required
          x-decorator-props={{
            bordered: false,
          }}
        />
        <SchemaField.String
          name="DatePicker"
          title="DatePicker"
          x-decorator="FormItem"
          x-component="DatePicker"
          required
          x-decorator-props={{
            bordered: false,
          }}
        />
        <SchemaField.String
          name="NumberPicker"
          title="NumberPicker"
          x-decorator="FormItem"
          x-component="NumberPicker"
          required
          x-decorator-props={{
            bordered: false,
          }}
        />
        <SchemaField.String
          name="TreeSelect"
          title="TreeSelect"
          x-decorator="FormItem"
          x-component="TreeSelect"
          required
          x-decorator-props={{
            bordered: false,
          }}
        />
        <SchemaField.Boolean
          name="Switch"
          title="Switch"
          x-decorator="FormItem"
          x-component="Switch"
          required
          x-decorator-props={{
            bordered: false,
          }}
        />
      </SchemaField>
    </FormProvider>
  )
}
```

## Embedded mode case

Set the form component to inline mode

```tsx
import React from 'react'
import {
  Input,
  Radio,
  TreeSelect,
  Cascader,
  Select,
  DatePicker,
  FormItem,
  NumberPicker,
  Switch,
} from '@formily/antd'
import { createForm } from '@formily/core'
import { FormProvider, createSchemaField } from '@formily/react'

const Title = (props) => <h3>{props.text}</h3>

const SchemaField = createSchemaField({
  components: {
    Input,
    Select,
    Cascader,
    TreeSelect,
    DatePicker,
    NumberPicker,
    Switch,
    Radio,
    FormItem,
    Title,
  },
})

const form = createForm()

export default () => {
  return (
    <FormProvider form={form}>
      <SchemaField>
        <SchemaField.String
          name="input"
          title="Input"
          x-decorator="FormItem"
          x-component="Input"
          required
          x-decorator-props={{
            inset: true,
          }}
        />
        <SchemaField.String
          name="Select"
          title="Select"
          x-decorator="FormItem"
          x-component="Select"
          required
          x-decorator-props={{
            inset: true,
          }}
        />
        <SchemaField.String
          name="Select"
          title="Select"
          x-decorator="FormItem"
          x-component="Select"
          required
          x-decorator-props={{
            inset: true,
          }}
        />
        <SchemaField.String
          name="Cascader"
          title="Cascader"
          x-decorator="FormItem"
          x-component="Cascader"
          required
          x-decorator-props={{
            inset: true,
          }}
        />
        <SchemaField.String
          name="DatePicker"
          title="DatePicker"
          x-decorator="FormItem"
          x-component="DatePicker"
          required
          x-decorator-props={{
            inset: true,
          }}
        />
        <SchemaField.String
          name="NumberPicker"
          title="NumberPicker"
          x-decorator="FormItem"
          x-component="NumberPicker"
          required
          x-decorator-props={{
            inset: true,
          }}
        />
        <SchemaField.String
          name="TreeSelect"
          title="TreeSelect"
          x-decorator="FormItem"
          x-component="TreeSelect"
          required
          x-decorator-props={{
            inset: true,
          }}
        />
        <SchemaField.Boolean
          name="Switch"
          title="Switch"
          x-decorator="FormItem"
          x-component="Switch"
          required
          x-decorator-props={{
            inset: false,
          }}
        />
      </SchemaField>
    </FormProvider>
  )
}
```

## Feedback Customization Case

The button for specifying feedback can be passed in through `feedbackIcon`

```tsx
import React from 'react'
import {
  Input,
  Radio,
  TreeSelect,
  Cascader,
  Select,
  DatePicker,
  TimePicker,
  FormItem,
  FormLayout,
  NumberPicker,
  Switch,
} from '@formily/antd'
import { createForm } from '@formily/core'
import { FormProvider, createSchemaField } from '@formily/react'
import { CheckCircleFilled, LoadingOutlined } from '@ant-design/icons'
const Title = (props) => <h3>{props.text}</h3>

const SchemaField = createSchemaField({
  components: {
    Input,
    Select,
    Cascader,
    TreeSelect,
    DatePicker,
    TimePicker,
    NumberPicker,
    Switch,
    Radio,
    FormItem,
    Title,
    FormLayout,
  },
})

const form = createForm()

export default () => {
  return (
    <FormProvider form={form}>
      <SchemaField>
        <SchemaField.String
          title="error status (feedbackStatus=error)"
          x-decorator="FormItem"
          x-component="Input"
          description="description"
          x-decorator-props={{
            feedbackStatus: 'error',
          }}
        />

        <SchemaField.String
          title="Warning Status(feedbackStatus=warning)"
          x-decorator="FormItem"
          x-component="Input"
          description="description"
          x-decorator-props={{
            feedbackStatus: 'warning',
          }}
        />

        <SchemaField.String
          title="Success Status (feedbackStatus=success)"
          x-decorator="FormItem"
          x-component="Input"
          description="description"
          x-decorator-props={{
            feedbackStatus: 'success',
            feedbackIcon: <CheckCircleFilled style={{ color: '#52c41a' }} />,
          }}
        />

        <SchemaField.String
          title="Loading Status(feedbackStatus=pending)"
          x-decorator="FormItem"
          x-component="Input"
          description="description"
          x-decorator-props={{
            feedbackStatus: 'pending',
            feedbackIcon: <LoadingOutlined style={{ color: '#1890ff' }} />,
          }}
        />

        <SchemaField.Void
          x-component="Title"
          x-component-props={{ text: 'Layout of feedback information' }}
        />

        <SchemaField.String
          title="Compact mode required"
          x-decorator="FormItem"
          x-component="Input"
          required
          x-decorator-props={{
            feedbackLayout: 'terse',
          }}
        />

        <SchemaField.String
          title="Compact mode has feedback(feedbackLayout=terse)"
          x-decorator="FormItem"
          x-component="Input"
          x-decorator-props={{
            feedbackStatus: 'error',
            feedbackText: 'error message',
            feedbackLayout: 'terse',
          }}
        />

        <SchemaField.String
          title="Compact mode without feedback(feedbackLayout=terse)"
          x-decorator="FormItem"
          x-component="Input"
          x-decorator-props={{
            feedbackLayout: 'terse',
          }}
        />

        <SchemaField.String
          title="loose mode (feedbackLayout=loose)"
          x-decorator="FormItem"
          x-component="Input"
          x-decorator-props={{
            feedbackStatus: 'error',
            feedbackText: 'error message',
            feedbackLayout: 'loose',
          }}
        />

        <SchemaField.String
          title="Popup Mode (feedbackLayout=popover)"
          x-decorator="FormItem"
          x-component="Input"
          x-decorator-props={{
            feedbackStatus: 'warning',
            feedbackText: 'warning message',
            feedbackLayout: 'popover',
          }}
        />

        <SchemaField.String
          title="Popup Mode (feedbackLayout=popover)"
          x-decorator="FormItem"
          x-component="Input"
          x-decorator-props={{
            feedbackStatus: 'error',
            feedbackText: 'error message',
            feedbackLayout: 'popover',
          }}
        />
        <SchemaField.String
          title="Popup Mode (feedbackLayout=popover)"
          x-decorator="FormItem"
          x-component="Input"
          x-decorator-props={{
            feedbackStatus: 'success',
            feedbackText: 'success message',
            feedbackLayout: 'popover',
          }}
        />

        <SchemaField.Void
          x-component="Title"
          x-component-props={{ text: 'Component adaptation' }}
        />
        <SchemaField.Void
          x-component="FormLayout"
          x-component-props={{ layout: 'vertical' }}
        >
          <SchemaField.String
            title="Select"
            x-decorator="FormItem"
            x-component="Select"
            x-decorator-props={{
              feedbackStatus: 'success',
              feedbackIcon: <CheckCircleFilled style={{ color: '#52c41a' }} />,
            }}
          />

          <SchemaField.String
            title="DatePicker"
            x-decorator="FormItem"
            x-component="DatePicker"
            x-decorator-props={{
              feedbackStatus: 'success',
              feedbackIcon: <CheckCircleFilled style={{ color: '#52c41a' }} />,
            }}
          />
          <SchemaField.String
            title="DatePicker.RangePicker"
            x-decorator="FormItem"
            x-component="DatePicker.RangePicker"
            x-decorator-props={{
              feedbackStatus: 'success',
              feedbackIcon: <CheckCircleFilled style={{ color: '#52c41a' }} />,
            }}
          />
          <SchemaField.String
            title="DatePicker.YearPicker"
            x-decorator="FormItem"
            x-component="DatePicker.YearPicker"
            x-decorator-props={{
              feedbackStatus: 'success',
              feedbackIcon: <CheckCircleFilled style={{ color: '#52c41a' }} />,
            }}
          />
          <SchemaField.String
            title="DatePicker.MonthPicker"
            x-decorator="FormItem"
            x-component="DatePicker.MonthPicker"
            x-decorator-props={{
              feedbackStatus: 'success',
              feedbackIcon: <CheckCircleFilled style={{ color: '#52c41a' }} />,
            }}
          />
          <SchemaField.String
            title="DatePicker.TimePicker"
            x-decorator="FormItem"
            x-component="TimePicker"
            x-decorator-props={{
              feedbackStatus: 'success',
              feedbackIcon: <CheckCircleFilled style={{ color: '#52c41a' }} />,
            }}
          />
          <SchemaField.String
            title="NumberPicker"
            x-decorator="FormItem"
            x-component="NumberPicker"
            x-decorator-props={{
              feedbackStatus: 'success',
              feedbackIcon: <CheckCircleFilled style={{ color: '#52c41a' }} />,
            }}
          />

          <SchemaField.String
            title="TreeSelect"
            x-decorator="FormItem"
            x-component="TreeSelect"
            x-decorator-props={{
              feedbackStatus: 'success',
              feedbackIcon: <CheckCircleFilled style={{ color: '#52c41a' }} />,
            }}
          />

          <SchemaField.String
            title="Cascader"
            x-decorator="FormItem"
            x-component="Cascader"
            x-decorator-props={{
              feedbackStatus: 'success',
              feedbackIcon: <CheckCircleFilled style={{ color: '#52c41a' }} />,
            }}
          />
        </SchemaField.Void>
      </SchemaField>
    </FormProvider>
  )
}
```

## Size control case

```tsx
import React from 'react'
import {
  Input,
  Radio,
  TreeSelect,
  Cascader,
  Select,
  DatePicker,
  FormItem,
  NumberPicker,
  Switch,
} from '@formily/antd'
import { createForm, onFieldChange } from '@formily/core'
import { FormProvider, createSchemaField } from '@formily/react'

const Div = (props) => <div {...props} />

const SchemaField = createSchemaField({
  components: {
    Input,
    Select,
    Cascader,
    TreeSelect,
    DatePicker,
    NumberPicker,
    Switch,
    Radio,
    FormItem,
    Div,
  },
})

const form = createForm({
  values: {
    size: 'default',
  },
  effects: () => {
    onFieldChange('size', ['value'], (field, form) => {
      form.setFieldState('sizeWrap.*', (state) => {
        if (state.decorator[1]) {
          state.decorator[1].size = field.value
        }
      })
    })
  },
})

export default () => {
  return (
    <FormProvider form={form}>
      <SchemaField>
        <SchemaField.String
          name="size"
          title="Radio.Group"
          x-decorator="FormItem"
          x-component="Radio.Group"
          enum={[
            { value: 'small', label: 'Small' },
            { value: 'default', label: 'Default' },
            { value: 'large', label: 'Large' },
          ]}
        />
        <SchemaField.Void name="sizeWrap" x-component="Div">
          <SchemaField.String
            name="input"
            title="Input"
            x-decorator="FormItem"
            x-component="Input"
            required
          />
          <SchemaField.String
            name="select1"
            title="Multiple Select"
            x-decorator="FormItem"
            x-component="Select"
            enum={[
              {
                label: 'Option 1',
                value: 1,
              },
              {
                label: 'Option 2',
                value: 2,
              },
            ]}
            x-component-props={{
              mode: 'multiple',
              placeholder: 'Please choose',
            }}
            required
          />
          <SchemaField.String
            name="select2"
            title="Select"
            x-decorator="FormItem"
            x-component="Select"
            enum={[
              {
                label: 'Option 1',
                value: 1,
              },
              {
                label: 'Option 2',
                value: 2,
              },
            ]}
            x-component-props={{
              placeholder: 'Please choose',
            }}
            required
          />
          <SchemaField.String
            name="Cascader"
            title="Cascader"
            x-decorator="FormItem"
            x-component="Cascader"
            required
          />
          <SchemaField.String
            name="DatePicker"
            title="DatePicker"
            x-decorator="FormItem"
            x-component="DatePicker"
            required
          />
          <SchemaField.String
            name="NumberPicker"
            title="NumberPicker"
            x-decorator="FormItem"
            x-component="NumberPicker"
            required
          />
          <SchemaField.String
            name="TreeSelect"
            title="TreeSelect"
            x-decorator="FormItem"
            x-component="TreeSelect"
            required
          />
          <SchemaField.Boolean
            name="Switch"
            title="Switch"
            x-decorator="FormItem"
            x-component="Switch"
            required
          />
        </SchemaField.Void>
      </SchemaField>
    </FormProvider>
  )
}
```

## API

### FormItem

| Property name     | Type                                                   | Description                                                                                                              | Default value       |
| ----------------- | ------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------ | ------------------- |
| label             | ReactNode                                              | label                                                                                                                    | -                   |
| style             | CSSProperties                                          | Style                                                                                                                    | -                   |
| labelStyle        | CSSProperties                                          | Label style                                                                                                              | -                   |
| wrapperStyle      | CSSProperties                                          | Component container style                                                                                                | -                   |
| className         | string                                                 | Component style class name                                                                                               | -                   |
| colon             | boolean                                                | colon                                                                                                                    | true                |
| tooltip           | ReactNode                                              | Question mark prompt                                                                                                     | -                   |
| tooltipLayout     | `"icon" \| "text"`                                     | Ask the prompt layout                                                                                                    | `"icon"`            |
| tooltipIcon       | ReactNode                                              | Ask the prompt icon                                                                                                      | `?`                 |
| labelAlign        | `"left"` \| `"right"`                                  | Label text alignment                                                                                                     | `"right"`           |
| labelWrap         | boolean                                                | Label change, otherwise an ellipsis appears, hover has tooltip                                                           | false               |
| labelWidth        | `number \| string`                                     | Label fixed width                                                                                                        | -                   |
| wrapperWidth      | `number \| string`                                     | Content fixed width                                                                                                      | -                   |
| labelCol          | number                                                 | The number of columns occupied by the label grid, and the number of content columns add up to 24                         | -                   |
| wrapperCol        | number                                                 | The number of columns occupied by the content grid, and the number of label columns add up to 24                         | -                   |
| wrapperAlign      | `"left"` \| `"right"`                                  | Content text alignment                                                                                                   | `"left"`            |
| wrapperWrap       | boolean                                                | Change the content, otherwise an ellipsis appears, and hover has tooltip                                                 | false               |
| fullness          | boolean                                                | fullness                                                                                                                 | false               |
| addonBefore       | ReactNode                                              | Prefix content                                                                                                           | -                   |
| addonAfter        | ReactNode                                              | Suffix content                                                                                                           | -                   |
| size              | `"small"` \| `"default"` \| `"large"`                  | size                                                                                                                     | -                   |
| inset             | boolean                                                | Is it an inline layout                                                                                                   | false               |
| extra             | ReactNode                                              | Extended description script                                                                                              | -                   |
| feedbackText      | ReactNode                                              | Feedback Case                                                                                                            | -                   |
| feedbackLayout    | `"loose"` \| `"terse"` \| `"popover" \| "none"`        | Feedback layout                                                                                                          | -                   |
| feedbackStatus    | `"error"` \| `"warning"` \| `"success"` \| `"pending"` | Feedback layout                                                                                                          | -                   |
| feedbackIcon      | ReactNode                                              | Feedback icon                                                                                                            | -                   |
| getPopupContainer | function(triggerNode)                                  | when `feedbackLayout` is popover， The DOM container of the tip, the default behavior is to create a div element in body | () => document.body |
| asterisk          | boolean                                                | Asterisk reminder                                                                                                        | -                   |
| gridSpan          | number                                                 | Grid layout occupies width                                                                                               | -                   |
| bordered          | boolean                                                | Is there a border                                                                                                        | -                   |

### FormItem.BaseItem

Pure style components, the properties are the same as FormItem, and Formily Core does not do state bridging. It is mainly used for scenarios that need to rely on the style layout capabilities of FormItem but do not want to access the Field state.
