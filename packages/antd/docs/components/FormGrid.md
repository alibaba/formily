# FormGrid

> FormGrid 组件

## Markup Schema 案例

```tsx
import React from 'react'
import { FormItem, Input, FormGrid } from '@formily/antd'
import { FormProvider, createSchemaField } from '@formily/react'
import { createForm } from '@formily/core'

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
            maxColumns: 3,
            minColumns: 2,
          }}
        >
          <SchemaField.String
            name="aaa"
            title="aaa"
            x-decorator="FormItem"
            x-decorator-props={{ gridSpan: 2 }}
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
          <SchemaField.String
            name="ggg"
            title="ggg"
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
import { FormProvider, createSchemaField } from '@formily/react'
import { createForm } from '@formily/core'

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
        ggg: {
          type: 'string',
          title: 'GGG',
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

## 原生 案例

```tsx
import React from 'react'
import { FormGrid } from '@formily/antd'

const { GridColumn } = FormGrid
const Cell = ({ children }) => {
  return (
    <div
      style={{
        backgroundColor: '#AAA',
        color: '#FFF',
        height: 30,
        display: 'flex',
        alignItems: 'center',
        padding: '0 10px',
      }}
    >
      {children}
    </div>
  )
}
export default () => {
  return (
    <React.Fragment>
      <p>maxColumns 3 + minColumns 2</p>
      <FormGrid maxColumns={3} minColumns={2}>
        <GridColumn gridSpan={4}>
          <Cell>1</Cell>
        </GridColumn>
        <GridColumn>
          <Cell>2</Cell>
        </GridColumn>
        <GridColumn>
          <Cell>3</Cell>
        </GridColumn>
        <GridColumn>
          <Cell>4</Cell>
        </GridColumn>
        <GridColumn>
          <Cell>5</Cell>
        </GridColumn>
        <GridColumn>
          <Cell>6</Cell>
        </GridColumn>
      </FormGrid>
      <p>maxColumns 3</p>
      <FormGrid maxColumns={3}>
        <GridColumn gridSpan={2}>
          <Cell>1</Cell>
        </GridColumn>
        <GridColumn>
          <Cell>2</Cell>
        </GridColumn>
        <GridColumn>
          <Cell>3</Cell>
        </GridColumn>
        <GridColumn>
          <Cell>4</Cell>
        </GridColumn>
        <GridColumn>
          <Cell>5</Cell>
        </GridColumn>
        <GridColumn>
          <Cell>6</Cell>
        </GridColumn>
      </FormGrid>
      <p>minColumns 2</p>
      <FormGrid minColumns={2}>
        <GridColumn gridSpan={2}>
          <Cell>1</Cell>
        </GridColumn>
        <GridColumn>
          <Cell>2</Cell>
        </GridColumn>
        <GridColumn>
          <Cell>3</Cell>
        </GridColumn>
        <GridColumn>
          <Cell>4</Cell>
        </GridColumn>
        <GridColumn>
          <Cell>5</Cell>
        </GridColumn>
        <GridColumn>
          <Cell>6</Cell>
        </GridColumn>
      </FormGrid>
      <p>Null</p>
      <FormGrid>
        <GridColumn gridSpan={2}>
          <Cell>1</Cell>
        </GridColumn>
        <GridColumn>
          <Cell>2</Cell>
        </GridColumn>
        <GridColumn>
          <Cell>3</Cell>
        </GridColumn>
        <GridColumn>
          <Cell>4</Cell>
        </GridColumn>
        <GridColumn>
          <Cell>5</Cell>
        </GridColumn>
        <GridColumn>
          <Cell>6</Cell>
        </GridColumn>
      </FormGrid>
      <p>minWidth 150 +maxColumns 3</p>
      <FormGrid minWidth={150} maxColumns={3}>
        <GridColumn gridSpan={2}>
          <Cell>1</Cell>
        </GridColumn>
        <GridColumn>
          <Cell>2</Cell>
        </GridColumn>
        <GridColumn>
          <Cell>3</Cell>
        </GridColumn>
        <GridColumn>
          <Cell>4</Cell>
        </GridColumn>
        <GridColumn>
          <Cell>5</Cell>
        </GridColumn>
        <GridColumn>
          <Cell>6</Cell>
        </GridColumn>
      </FormGrid>
      <p>maxWidth 120+minColumns 2</p>
      <FormGrid maxWidth={120} minColumns={2}>
        <GridColumn gridSpan={2}>
          <Cell>1</Cell>
        </GridColumn>
        <GridColumn>
          <Cell>2</Cell>
        </GridColumn>
        <GridColumn>
          <Cell>3</Cell>
        </GridColumn>
        <GridColumn>
          <Cell>4</Cell>
        </GridColumn>
        <GridColumn>
          <Cell>5</Cell>
        </GridColumn>
        <GridColumn>
          <Cell>6</Cell>
        </GridColumn>
      </FormGrid>
    </React.Fragment>
  )
}
```

## API

### FormGrid

| 属性名      | 类型                 | 描述         | 默认值            |
| ----------- | -------------------- | ------------ | ----------------- |
| minWidth    | `number \| number[]` | 元素最小宽度 | 100               |
| maxWidth    | `number \| number[]` | 元素最大宽度 | -                 |
| minColumns  | `number \| number[]` | 最小列数     | 0                 |
| maxColumns  | `number \| number[]` | 最大列数     | -                 |
| breakpoints | number[]             | 容器尺寸断点 | `[720,1280,1920]` |
| columnGap   | number               | 列间距       | 10                |
| rowGap      | number               | 行间距       | 5                 |
| colWrap     | boolean              | 自动换行     | true              |

注意：

- minWidth 生效优先级高于 minColumn
- maxWidth 优先级高于 maxColumn
- minWidth/maxWidth/minColumns/maxColumns 的数组格式代表与断点数组映射

### FormGrid.GridColumn

| 属性名   | 类型   | 描述         | 默认值 |
| -------- | ------ | ------------ | ------ |
| gridSpan | number | 元素所跨列数 | 1      |

### FormGrid.useGridSpan

#### 描述

根据容器宽度计算出正确的 span，防止元素溢出

#### 签名

```ts
interface uesGridSpan {
  (gridSpan: number): number
}
```
