# FormGrid

> FormGrid 组件

## Markup Schema 案例

```tsx
import React from 'react'
import { FormItem, Input, FormGrid } from '@formily/next'
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
import { FormItem, Input, FormGrid } from '@formily/next'
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
import { FormGrid } from '@formily/next'

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
      <FormGrid maxColumns={3} minColumns={2} columnGap={4}>
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
      <FormGrid maxColumns={3} columnGap={4}>
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
      <FormGrid minColumns={2} columnGap={4}>
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
      <FormGrid columnGap={4}>
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
      <FormGrid minWidth={150} maxColumns={3} columnGap={4}>
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
      <FormGrid maxWidth={120} minColumns={2} columnGap={4}>
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
      <p>maxWidth 120 + gridSpan -1</p>
      <FormGrid maxWidth={120} columnGap={4}>
        <GridColumn gridSpan={2}>
          <Cell>1</Cell>
        </GridColumn>
        <GridColumn>
          <Cell>2</Cell>
        </GridColumn>
        <GridColumn gridSpan={-1}>
          <Cell>3</Cell>
        </GridColumn>
      </FormGrid>
    </React.Fragment>
  )
}
```

## 查询表单实现案例

```tsx
import React, { useMemo, useState, useEffect, Fragment } from 'react'
import { createForm } from '@formily/core'
import { createSchemaField, FormProvider } from '@formily/react'
import {
  Form,
  Input,
  Select,
  DatePicker,
  FormItem,
  FormGrid,
  Submit,
  Reset,
  FormButtonGroup,
} from '@formily/next'

const QueryForm: React.FC = (props) => {
  const [expanded, setExpanded] = useState(false)
  const [grid, setGrid] = useState()
  const updateChildren = () => {
    if (grid) {
      grid.children.forEach((node, index) => {
        if (index === grid.childSize - 1) return
        node.element.style.display = !expanded && node.row > 1 ? 'none' : ''
      })
    }
  }

  const renderActions = () => {
    return (
      <Fragment>
        <Submit onSubmit={console.log}>查询</Submit>
        <Reset>重置</Reset>
      </Fragment>
    )
  }

  const renderButtonGroup = () => {
    if (grid?.rows < 2) {
      return (
        <FormButtonGroup.FormItem>
          <FormButtonGroup>{renderActions()}</FormButtonGroup>
        </FormButtonGroup.FormItem>
      )
    }

    return (
      <Fragment>
        {grid?.rows > 1 ? (
          <FormButtonGroup>
            <a
              href=""
              onClick={(e) => {
                e.preventDefault()
                setExpanded(!expanded)
              }}
            >
              {expanded ? '收起' : '展开'}
            </a>
          </FormButtonGroup>
        ) : null}
        <FormButtonGroup align="right">{renderActions()}</FormButtonGroup>
      </Fragment>
    )
  }
  useEffect(() => {
    updateChildren()
  }, [expanded, grid])
  return (
    <Form {...props} layout="vertical" feedbackLayout="terse">
      <FormGrid
        maxColumns={4}
        maxWidth={240}
        onInitialized={(grid) => {
          setGrid(grid)
          updateChildren()
        }}
      >
        {props.children}
        <FormGrid.GridColumn
          gridSpan={-1}
          style={{ display: 'flex', justifyContent: 'space-between' }}
        >
          {renderButtonGroup()}
        </FormGrid.GridColumn>
      </FormGrid>
    </Form>
  )
}

const SchemaField = createSchemaField({
  components: {
    QueryForm,
    Input,
    Select,
    DatePicker,
    FormItem,
  },
})

export default () => {
  const form = useMemo(() => createForm(), [])
  return (
    <FormProvider form={form}>
      <SchemaField>
        <SchemaField.Object x-component="QueryForm">
          <SchemaField.String
            name="input1"
            title="Input 1"
            x-component="Input"
            x-decorator="FormItem"
          />
          <SchemaField.String
            name="input2"
            title="Input 2"
            x-component="Input"
            x-decorator="FormItem"
          />

          <SchemaField.String
            name="select1"
            title="Select 1"
            x-component="Select"
            x-decorator="FormItem"
          />
          <SchemaField.String
            name="select2"
            title="Select 2"
            x-component="Select"
            x-decorator="FormItem"
          />
          <SchemaField.String
            name="date"
            title="DatePicker"
            x-component="DatePicker"
            x-decorator="FormItem"
          />
          <SchemaField.String
            name="dateRange"
            title="DatePicker.RangePicker"
            x-component="DatePicker.RangePicker"
            x-decorator="FormItem"
            x-decorator-props={{
              gridSpan: 2,
            }}
          />
          <SchemaField.String
            name="select3"
            title="Select 3"
            x-component="Select"
            x-decorator="FormItem"
          />
        </SchemaField.Object>
      </SchemaField>
    </FormProvider>
  )
}
```

## API

### FormGrid

| 属性名        | 类型                 | 描述                                                           | 默认值            |
| ------------- | -------------------- | -------------------------------------------------------------- | ----------------- |
| minWidth      | `number \| number[]` | 元素最小宽度                                                   | 100               |
| maxWidth      | `number \| number[]` | 元素最大宽度                                                   | -                 |
| minColumns    | `number \| number[]` | 最小列数                                                       | 0                 |
| maxColumns    | `number \| number[]` | 最大列数                                                       | -                 |
| breakpoints   | number[]             | 容器尺寸断点                                                   | `[720,1280,1920]` |
| columnGap     | number               | 列间距                                                         | 10                |
| rowGap        | number               | 行间距                                                         | 5                 |
| colWrap       | boolean              | 自动换行                                                       | true              |
| strictAutoFit | boolean              | GridItem 宽度是否严格受限于 maxWidth，不受限的话会自动占满容器 | false             |

注意：

- minWidth 生效优先级高于 minColumn
- maxWidth 优先级高于 maxColumn
- minWidth/maxWidth/minColumns/maxColumns 的数组格式代表与断点数组映射

### FormGrid.GridColumn

| 属性名   | 类型   | 描述                                                  | 默认值 |
| -------- | ------ | ----------------------------------------------------- | ------ |
| gridSpan | number | 元素所跨列数 ，如果为-1，那么会自动反向跨列填补单元格 | 1      |
