# PreviewText

> 阅读态组件，主要用来实现类 Input，类 DatePicker 这些组件的阅读态

## 简单用例

```tsx
import React from 'react'
import { PreviewText, FormItem, FormLayout } from '@formily/next'
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
    <FormLayout labelCol={8} wrapperCol={16}>
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
  FormButtonGroup,
  FormLayout,
} from '@formily/next'
import { createForm } from '@formily/core'
import {
  FormProvider,
  mapReadPretty,
  connect,
  createSchemaField,
} from '@formily/react'
import { Button, Input as NextInput } from '@alifd/next'

const Input = connect(NextInput, mapReadPretty(PreviewText.Input))

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
      <FormLayout labelCol={8} wrapperCol={16}>
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

参考 https://fusion.design/pc/component/basic/input

### PreviewText.Select

参考 https://fusion.design/pc/component/basic/select

### PreviewText.TreeSelect

参考 https://fusion.design/pc/component/basic/tree-select

### PreviewText.Cascader

参考 https://fusion.design/pc/component/basic/cascader-select

### PreviewText.DatePicker

参考 https://fusion.design/pc/component/basic/date-picker

### PreviewText.DateRangePicker

参考 https://fusion.design/pc/component/basic/date-picker

### PreviewText.TimePicker

参考 https://fusion.design/pc/component/basic/time-picker

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
