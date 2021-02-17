# FormItem

> 表单字段组件，用于展示布局。

## Markup Schema 案例

```tsx
import React from 'react'
import { Form, Input as NextInput, Select } from 'antd'
import { Input, FormItem, FormButtonGroup, Submit } from '@formily/antd'
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
        title="输入框"
        x-decorator="FormItem"
        x-component="Input"
        required
      />
    </SchemaField>
    <FormButtonGroup>
      <Submit onSubmit={console.log}>提交</Submit>
    </FormButtonGroup>
  </FormProvider>
)
```

## JOSN Schema 案例

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
      title: '输入框',
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
      <Submit onSubmit={console.log}>提交</Submit>
    </FormButtonGroup>
  </FormProvider>
)
```

## 纯 JSX 案例

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
      title="输入框"
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
      <Submit onSubmit={console.log}>提交</Submit>
    </FormButtonGroup>
  </FormProvider>
)
```

## 常用属性展示

```tsx
import React, { useState } from 'react'
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
  FormButtonGroup,
  Submit,
} from '@formily/antd'
import { createForm, onFieldChange } from '@formily/core'
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
          x-component-props={{ text: 'label为空时的展示' }}
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
          x-component-props={{ text: '冒号' }}
        />
        <SchemaField.String
          title="默认"
          x-decorator="FormItem"
          x-component="Input"
        />        
        <SchemaField.String
          title="无冒号(colon=false)"
          x-decorator="FormItem"
          x-component="Input"
          x-decorator-props={{
            colon: false,
          }}
        />

        <SchemaField.Void
          x-component="Title"
          x-component-props={{ text: '固定宽度设置' }}
        />
        <SchemaField.String
          title="固定label宽度(labelWidth)"
          x-decorator="FormItem"
          x-component="Input"
          x-decorator-props={{
            labelWidth: 300,
          }}
        />
        <SchemaField.String
          title="固定内容宽度(wraperWidth)"
          x-decorator="FormItem"
          x-component="Input"
          x-decorator-props={{
            labelWidth: 300,
            wrapperWidth: 300,
          }}
        />

        <SchemaField.Void
          x-component="Title"
          x-component-props={{ text: '对齐方式设置' }}
        />
        <SchemaField.String
          title="label左对齐(labelAlign=left)"
          x-decorator="FormItem"
          x-component="Input"
          x-decorator-props={{
            labelWidth: 300,
            labelAlign: 'left',
          }}
        />
        <SchemaField.String
          title="label右对齐(labelAlign=right默认)"
          x-decorator="FormItem"
          x-component="Input"
          x-decorator-props={{
            labelWidth: 300,
            labelAlign: 'right',
          }}
        />

        <SchemaField.String
          title="内容左对齐(wrapperAlign=left默认)"
          x-decorator="FormItem"
          x-component="Input"
          x-decorator-props={{
            labelWidth: 300,
            wrapperWidth: 240,
            wrapperAlign: 'left',
          }}
        />
        <SchemaField.String
          title="内容右对齐(wrapperAlign=right)"
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
          x-component-props={{ text: '是否撑满' }}
        />

        <SchemaField.String
          title="默认不撑满(fullness=false)"
          x-decorator="FormItem"
          x-component="Select"
        />
        <SchemaField.String
          title="撑满(fullness=true)"
          x-decorator="FormItem"
          x-component="Select"
          x-decorator-props={{
            fullness: true,
          }}
        />

        <SchemaField.Void
          x-component="Title"
          x-component-props={{ text: '辅助信息' }}
        />

        <SchemaField.String
          title="必填星号"
          x-decorator="FormItem"
          x-component="Input"
          x-decorator-props={{
            asterisk: true,
          }}
        />

        <SchemaField.String
          title="前缀"
          x-decorator="FormItem"
          x-component="Input"
          x-decorator-props={{
            addonBefore: 'addonBefore',
          }}
        />
        <SchemaField.String
          title="后缀"
          x-decorator="FormItem"
          x-component="Input"
          x-decorator-props={{
            addonAfter: 'addonAfter',
          }}
        />

        <SchemaField.String
          title="帮助信息feedbackText"
          x-decorator="FormItem"
          x-component="Input"
          x-decorator-props={{
            feedbackText: 'feedbackText',
          }}
        />

        <SchemaField.String
          title="额外信息extra"
          x-decorator="FormItem"
          x-component="Input"
          x-decorator-props={{
            feedbackText: 'feedbackText',
            extra: 'extra',
          }}
        />
      </SchemaField>
    </FormProvider>
  )
}
```

## bordered

设置去除组件边框，仅限 antd 表单组件

```tsx
import React, { useState } from 'react'
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
  FormButtonGroup,
  Submit,
} from '@formily/antd'
import { createForm, onFieldChange } from '@formily/core'
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
        <SchemaField.String
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

## inset

设置表单组件为内嵌模式，仅限 antd 表单组件

```tsx
import React, { useState } from 'react'
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
  FormButtonGroup,
  Submit,
} from '@formily/antd'
import { createForm, onFieldChange } from '@formily/core'
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
        <SchemaField.String
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

## 反馈信息

可通过 `feedbackIcon` 传入指定反馈的按钮, 仅限于 antd 表单组件

```tsx
import React, { useState } from 'react'
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
  FormButtonGroup,
  Submit,
} from '@formily/antd'
import { createForm, onFieldChange } from '@formily/core'
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
          title="错误状态(feedbackStatus=error)"
          x-decorator="FormItem"
          x-component="Input"
          description="description"
          x-decorator-props={{
            feedbackStatus: 'error',
          }}
        />

        <SchemaField.String
          title="警告状态(feedbackStatus=warning)"
          x-decorator="FormItem"
          x-component="Input"
          description="description"
          x-decorator-props={{
            feedbackStatus: 'warning',
          }}
        />

        <SchemaField.String
          title="成功状态(feedbackStatus=success)"
          x-decorator="FormItem"
          x-component="Input"
          description="description"
          x-decorator-props={{
            feedbackStatus: 'success',
            feedbackIcon: <CheckCircleFilled style={{ color: '#52c41a' }} />,
          }}
        />

        <SchemaField.String
          title="加载状态(feedbackStatus=pending)"
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
          x-component-props={{ text: '反馈信息的布局' }}
        />

        <SchemaField.String
          title="紧凑模式有feedback(feedbackLayout=terse)"
          x-decorator="FormItem"
          x-component="Input"
          x-decorator-props={{
            feedbackStatus: 'error',
            feedbackText: 'error message',
            feedbackLayout: 'terse'
          }}
        />

        <SchemaField.String
          title="紧凑模式无feedback(feedbackLayout=terse)"
          x-decorator="FormItem"
          x-component="Input"
          x-decorator-props={{
            feedbackLayout: 'terse'
          }}
        />

        <SchemaField.String
          title="松散模式(feedbackLayout=loose)"
          x-decorator="FormItem"
          x-component="Input"
          x-decorator-props={{
            feedbackStatus: 'error',
            feedbackText: 'error message',
            feedbackLayout: 'loose'
          }}
        />

        <SchemaField.String
          title="弹出模式(feedbackLayout=popover)"
          x-decorator="FormItem"
          x-component="Input"
          x-decorator-props={{
            feedbackStatus: 'error',
            feedbackText: 'error message',
            feedbackLayout: 'popover'
          }}
        />

        <SchemaField.Void
          x-component="Title"
          x-component-props={{ text: '组件的适配情况' }}
        />

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
      </SchemaField>
    </FormProvider>
  )
}
```

## Size

```tsx
import React, { useState } from 'react'
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
  FormButtonGroup,
  Submit,
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
            name="Select"
            title="Select"
            x-decorator="FormItem"
            x-component="Select"
            required
          />
          <SchemaField.String
            name="Select"
            title="Select"
            x-decorator="FormItem"
            x-component="Select"
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
          <SchemaField.String
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

| 属性名         | 类型                                                   | 描述                                        | 默认值    |
| -------------- | ------------------------------------------------------ | ------------------------------------------- | --------- |
| colon          | boolean                                                | 冒号                                        | true      |
| tooltip        | ReactNode                                              | 问号提示                                    | -         |
| labelAlign     | `"left"` \| `"right"`                                  | 标签文本对齐方式                            | `"right"` |
| labelWrap      | boolean                                                | 标签换⾏，否则出现省略号，hover 有 tooltip  | false     |
| labelWidth     | number                                                 | 标签固定宽度                                | -         |
| wrapperWidth   | number                                                 | 内容固定宽度                                | -         |
| labelCol       | number                                                 | 标签⽹格所占列数，和内容列数加起来总和为 24 | -         |
| wrapperCol     | number                                                 | 内容⽹格所占列数，和标签列数加起来总和为 24 | -         |
| wrapperAlign   | `"left"` \| `"right"`                                  | 内容文本对齐方式⻬                          | `"left"`  |
| wrapperWrap    | boolean                                                | 内容换⾏，否则出现省略号，hover 有 tooltip  | false     |
| fullness       | boolean                                                | 内容撑满                                    | false     |
| addonBefore    | ReactNode                                              | 前缀内容                                    | -         |
| addonAfter     | ReactNode                                              | 后缀内容                                    | -         |
| size           | `"small"` \| `"default"` \| `"large"`                  | 尺⼨                                        | -         |
| inset          | boolean                                                | 是否是内嵌布局                              | false     |
| extra          | ReactNode                                              | 扩展描述⽂案                                | -         |
| feedbackText   | ReactNode                                              | 反馈⽂案                                    | -         |
| feedbackLayout | `"loose"` \| `"terse"` \| `"popover"`                  | 反馈布局                                    | -         |
| feedbackStatus | `"error"` \| `"warning"` \| `"success"` \| `"pending"` | 反馈布局                                    | -         |
| feedbackIcon   | ReactNode                                              | 反馈图标                                    | -         |
| asterisk       | boolean                                                | 星号提醒                                    | -         |
| gridSpan       | number                                                 | ⽹格布局占宽                                | -         |
| bordered       | boolean                                                | 是否有边框                                  | -         |
