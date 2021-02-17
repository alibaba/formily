# FormGrid

> FormGrid 组件

## Markup Schema 案例

```tsx
import React from 'react'
import { FormItem, Input, FormGrid } from '@formily/antd'

import { FormProvider, createForm, createSchemaField } from '@formily/react'

const SchemaField = createSchemaField({
  components: {
    FormItem,
    Input,
    FormGrid,
  },
})

const form = createForm()

export default () => {
  return (
    <FormProvider form={form}>
      <SchemaField>
        <SchemaField.Void
          x-component="FormGrid"
          x-component-props={{
            minColumns: [4, 6, 10],
            colWrap: true,
          }}
        >
          <SchemaField.String
            name="aaa"
            title="aaa"
            x-decorator="FormItem"
            x-component="Input"
          />
          <SchemaField.String
            name="bbb"
            title="bbb"
            x-decorator="FormItem"
            x-component="Input"
          />
          <SchemaField.String
            name="ccc"
            title="ccc"
            x-decorator="FormItem"
            x-component="Input"
          />
          <SchemaField.String
            name="ddd"
            title="ddd"
            x-decorator="FormItem"
            x-component="Input"
          />
          <SchemaField.String
            name="eee"
            title="eee"
            x-decorator="FormItem"
            x-component="Input"
          />
          <SchemaField.String
            name="fff"
            title="fff"
            x-decorator="FormItem"
            x-component="Input"
          />
        </SchemaField.Void>
      </SchemaField>
    </FormProvider>
  )
}
```

## JSON Schema 案例

```tsx
import React from 'react'
import { FormItem, Input, FormGrid } from '@formily/antd'

import { FormProvider, createForm, createSchemaField } from '@formily/react'

const SchemaField = createSchemaField({
  components: {
    FormItem,
    Input,
    FormGrid,
  },
})

const form = createForm()

const schema = {
  type: 'object',
  properties: {
    grid: {
      type: 'void',
      'x-component': 'FormGrid',
      'x-component-props': {
        minColumns: [4, 6, 10],
        colWrap: true,
      },
      properties: {
        aaa: {
          type: 'string',
          title: 'AAA',
          'x-decorator': 'FormItem',
          'x-component': 'Input',
        },
        bbb: {
          type: 'string',
          title: 'BBB',
          'x-decorator': 'FormItem',
          'x-component': 'Input',
        },
        ccc: {
          type: 'string',
          title: 'CCC',
          'x-decorator': 'FormItem',
          'x-component': 'Input',
        },
        ddd: {
          type: 'string',
          title: 'DDD',
          'x-decorator': 'FormItem',
          'x-component': 'Input',
        },
        eee: {
          type: 'string',
          title: 'EEE',
          'x-decorator': 'FormItem',
          'x-component': 'Input',
        },
        fff: {
          type: 'string',
          title: 'FFF',
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

## API

| 属性名      | 类型     | 描述                                                                                                             | 默认值                                          |
| ----------- | -------- | ---------------------------------------------------------------------------------------------------------------- | ----------------------------------------------- | ----- |
| minWidth    | number   | number[]                                                                                                         | 元素最小宽度, minWidth 生效优先级高于 minColumn |       |
| maxWidth    | number   | number[]                                                                                                         | 元素最大宽度, maxWidth 优先级高于 maxColumn     |       |
| minColumns  | number   | number[]                                                                                                         | 最小列数                                        | 0     |
| maxColumns  | number   | number[]                                                                                                         | 最大列数                                        |       |
| colWrap     | boolean  | boolean[]                                                                                                        | 是否换行                                        | false |
| breakpoints | number[] | 容器尺寸断点, minWidth/maxWidth/minColumns/maxColumns 可根据断点分别设置，若无设置，自动向后兼容上一断点的默认值 | [720,1280,1920]                                 |
| columnGap   | number   | 列间距                                                                                                           | 10                                              |
| rowGap      | number   | 行间距                                                                                                           | 5                                               |
