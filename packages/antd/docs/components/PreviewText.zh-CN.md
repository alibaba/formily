# PreviewText

> 阅读态组件，主要用来实现类 Input，类 DatePicker 这些组件的阅读态

## 简单用例

```tsx
import React from 'react'
import { PreviewText, FormItem, FormLayout } from '@formily/antd'
import { createForm } from '@formily/core'
import { FormProvider, createSchemaField } from '@formily/react'

const SchemaField = createSchemaField({
  components: {
    FormItem,
    PreviewText,
  },
})

const form = createForm()

export default () => {
  return (
    <FormLayout labelCol={6} wrapperCol={10}>
      <FormProvider form={form}>
        <SchemaField>
          <SchemaField.String
            x-decorator="FormItem"
            title="文本预览"
            x-component="PreviewText.Input"
            default={'Hello world'}
          />
          <SchemaField.String
            x-decorator="FormItem"
            title="选择项预览"
            x-component="PreviewText.Select"
            x-component-props={{
              mode: 'multiple',
            }}
            default={['123', '222']}
            enum={[
              { label: 'A111', value: '123' },
              { label: 'A222', value: '222' },
            ]}
          />
          <SchemaField.String
            x-decorator="FormItem"
            title="日期预览"
            x-component="PreviewText.DatePicker"
            default={'2020-11-23 22:15:20'}
          />
          <SchemaField.String
            x-decorator="FormItem"
            title="Cascader预览"
            x-component="PreviewText.Cascader"
            default={['hangzhou', 'yuhang']}
            enum={[
              {
                label: '杭州',
                value: 'hangzhou',
              },
              {
                label: '余杭',
                value: 'yuhang',
              },
            ]}
          />
        </SchemaField>
      </FormProvider>
    </FormLayout>
  )
}
```

## 扩展阅读态

```tsx
import React from 'react'
import {
  PreviewText,
  FormItem,
  FormLayout,
  FormButtonGroup,
} from '@formily/antd'
import { createForm } from '@formily/core'
import {
  FormProvider,
  mapReadPretty,
  connect,
  createSchemaField,
} from '@formily/react'
import { Button, Input as AntdInput } from 'antd'

const Input = connect(AntdInput, mapReadPretty(PreviewText.Input))

const SchemaField = createSchemaField({
  components: {
    Input,
    FormItem,
    PreviewText,
  },
})

const form = createForm()

export default () => {
  return (
    <PreviewText.Placeholder value="暂无数据">
      <FormLayout labelCol={6} wrapperCol={10}>
        <FormProvider form={form}>
          <SchemaField>
            <SchemaField.Markup
              type="string"
              x-decorator="FormItem"
              title="文本预览"
              required
              x-component="Input"
              default={'Hello world'}
            />
            <SchemaField.Markup
              type="string"
              x-decorator="FormItem"
              title="选择项预览"
              x-component="PreviewText.Select"
              x-component-props={{
                mode: 'multiple',
              }}
              default={['123', '222']}
              enum={[
                { label: 'A111', value: '123' },
                { label: 'A222', value: '222' },
              ]}
            />
            <SchemaField.Markup
              type="string"
              x-decorator="FormItem"
              title="日期预览"
              x-component="PreviewText.DatePicker"
            />
            <SchemaField.Markup
              type="string"
              x-decorator="FormItem"
              title="Cascader预览"
              x-component="PreviewText.Cascader"
              default={['hangzhou', 'yuhang']}
              enum={[
                {
                  label: '杭州',
                  value: 'hangzhou',
                },
                {
                  label: '余杭',
                  value: 'yuhang',
                },
              ]}
            />
          </SchemaField>
          <FormButtonGroup.FormItem>
            <Button
              onClick={() => {
                form.setState((state) => {
                  state.editable = !state.editable
                })
              }}
            >
              切换阅读态
            </Button>
          </FormButtonGroup.FormItem>
        </FormProvider>
      </FormLayout>
    </PreviewText.Placeholder>
  )
}
```

## API

### PreviewText.Input

参考 https://ant.design/components/input-cn/

### PreviewText.Select

参考 https://ant.design/components/select-cn/

### PreviewText.TreeSelect

参考 https://ant.design/components/tree-select-cn/

### PreviewText.Cascader

参考 https://ant.design/components/cascader-cn/

### PreviewText.DatePicker

参考 https://ant.design/components/date-picker-cn/

### PreviewText.DateRangePicker

参考 https://ant.design/components/date-picker-cn/

### PreviewText.TimePicker

参考 https://ant.design/components/time-picker-cn/

### PreviewText.TimeRangePicker

参考 https://ant.design/components/time-picker-cn/

### PreviewText.Placeholder

| 属性名 | 类型   | 描述       | 默认值 |
| ------ | ------ | ---------- | ------ |
| value  | stirng | 缺省占位符 | N/A    |

### PreviewText.usePlaceholder

```ts pure
interface usePlaceholder {
  (): string
}
```
