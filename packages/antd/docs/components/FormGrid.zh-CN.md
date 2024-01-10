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
import React, { useMemo, Fragment } from 'react'
import { createForm } from '@formily/core'
import { createSchemaField, FormProvider, observer } from '@formily/react'
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
} from '@formily/antd'

const useCollapseGrid = (maxRows: number) => {
  const grid = useMemo(
    () =>
      FormGrid.createFormGrid({
        maxColumns: 4,
        maxWidth: 240,
        maxRows: maxRows,
        shouldVisible: (node, grid) => {
          if (node.index === grid.childSize - 1) return true
          if (grid.maxRows === Infinity) return true
          return node.shadowRow < maxRows + 1
        },
      }),
    []
  )
  const expanded = grid.maxRows === Infinity
  const realRows = grid.shadowRows
  const computeRows = grid.fullnessLastColumn
    ? grid.shadowRows - 1
    : grid.shadowRows

  const toggle = () => {
    if (grid.maxRows === Infinity) {
      grid.maxRows = maxRows
    } else {
      grid.maxRows = Infinity
    }
  }
  const takeType = () => {
    if (realRows < maxRows + 1) return 'incomplete-wrap'
    if (computeRows > maxRows) return 'collapsible'
    return 'complete-wrap'
  }
  return {
    grid,
    expanded,
    toggle,
    type: takeType(),
  }
}

const QueryForm: React.FC = observer((props) => {
  const { grid, expanded, toggle, type } = useCollapseGrid(1)

  const renderActions = () => {
    return (
      <Fragment>
        <Submit onSubmit={console.log}>查询</Submit>
        <Reset>重置</Reset>
      </Fragment>
    )
  }

  const renderButtonGroup = () => {
    if (type === 'incomplete-wrap') {
      return (
        <FormButtonGroup.FormItem>
          <FormButtonGroup>{renderActions()}</FormButtonGroup>
        </FormButtonGroup.FormItem>
      )
    }
    if (type === 'collapsible') {
      return (
        <Fragment>
          <FormButtonGroup>
            <a
              href=""
              onClick={(e) => {
                e.preventDefault()
                toggle()
              }}
            >
              {expanded ? '收起' : '展开'}
            </a>
          </FormButtonGroup>
          <FormButtonGroup align="right">{renderActions()}</FormButtonGroup>
        </Fragment>
      )
    }
    return (
      <FormButtonGroup align="right" style={{ display: 'flex', width: '100%' }}>
        {renderActions()}
      </FormButtonGroup>
    )
  }

  return (
    <Form {...props} layout="vertical" feedbackLayout="terse">
      <FormGrid grid={grid}>
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
})

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

| 属性名        | 类型                   | 描述                                                           | 默认值            |
| ------------- | ---------------------- | -------------------------------------------------------------- | ----------------- |
| minWidth      | `number \| number[]`   | 元素最小宽度                                                   | 100               |
| maxWidth      | `number \| number[]`   | 元素最大宽度                                                   | -                 |
| minColumns    | `number \| number[]`   | 最小列数                                                       | 0                 |
| maxColumns    | `number \| number[]`   | 最大列数                                                       | -                 |
| breakpoints   | number[]               | 容器尺寸断点                                                   | `[720,1280,1920]` |
| columnGap     | number                 | 列间距                                                         | 8                 |
| rowGap        | number                 | 行间距                                                         | 4                 |
| colWrap       | boolean                | 自动换行                                                       | true              |
| strictAutoFit | boolean                | GridItem 宽度是否严格受限于 maxWidth，不受限的话会自动占满容器 | false             |
| shouldVisible | `(node,grid)=>boolean` | 是否需要显示当前节点                                           | `()=>true`        |
| grid          | `Grid`                 | 外部传入 Grid 实例，用于实现更复杂的布局逻辑                   | -                 |

注意：

- minWidth 生效优先级高于 minColumn
- maxWidth 优先级高于 maxColumn
- minWidth/maxWidth/minColumns/maxColumns 的数组格式代表与断点数组映射

### FormGrid.GridColumn

| 属性名   | 类型   | 描述                                                 | 默认值 |
| -------- | ------ | ---------------------------------------------------- | ------ |
| gridSpan | number | 元素所跨列数，如果为-1，那么会自动反向跨列填补单元格 | 1      |

### FormGrid.createFormGrid

从上下文中读取 Grid 实例

```ts
interface createFormGrid {
  (props: IGridProps): Grid
}
```

- IGridProps 参考 FormGrid 属性
- Grid 实例属性方法参考 https://github.com/alibaba/formily/tree/formily_next/packages/grid

### FormGrid.useFormGrid

从上下文中读取 Grid 实例

```ts
interface useFormGrid {
  (): Grid
}
```

- Grid 实例属性方法参考 https://github.com/alibaba/formily/tree/formily_next/packages/grid
